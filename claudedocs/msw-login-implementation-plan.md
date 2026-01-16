# 💡 MSW로 로그인 기능 구현 방안

## 🎯 핵심 질문: MSW로 로그인 기능을 구현할 수 있을까?

**✅ 네,完全可以입니다!** MSW는 완전한 로그인 기능을 모킹할 수 있습니다.

---

## 🔍 MSW란 무엇인가?

### MSW (Mock Service Worker)
- **핵심 기능**: 네트워크 요청을 가로채서 가상의 응답 반환
- **동작 방식**: Service Worker 기술로 HTTP 요청/응답을 인터셉트
- **주요 용도**: API 없이 프론트엔드 개발, 테스트, 프로토타이핑

### 현재 프로젝트 상태
- ✅ MSW가 이미 설치됨 (package.json 확인)
- ✅ Redux, RTK Query 설정 완료
- ✅ auth 소스 삭제 (깨끗한 상태)

---

## 🏗️ 구현 아키텍처

### 전체 흐름
```
사용자 로그인 요청
  ↓
프론트엔드 (로그인 폼)
  ↓
RTK Query (API 호출)
  ↓
MSW (요청 인터셉트) ← 가짜 API 서버
  ↓
가짜 응답 반환
  ↓
Redux Store (토큰/유저 정보 저장)
  ↓
Redux Persist (로컬 스토리지 저장)
  ↓
로그인 완료! 🎉
```

---

## 📋 구현 단계별 가이드

### Phase 1: MSW 핸들러 작성 (1시간)

**파일**: `src/mocks/handlers/auth.ts`

```typescript
import { rest } from 'msw';

/**
 * 인증 관련 MSW 핸들러
 *
 * @description
 * - 로그인, 로그아웃, 토큰 검증 등 인증 API 모킹
 * - 다양한 시나리오 시뮬레이션 가능
 */
export const authHandlers = [
  /**
   * 로그인
   * POST /api/auth/login
   */
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    // ✅ 성공 시나리오
    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.delay(500), // 네트워크 지연 시뮬레이션
        ctx.json({
          token: 'mock-jwt-token-12345',
          refreshToken: 'mock-refresh-token-67890',
          expiresIn: 3600,
          user: {
            id: 1,
            email: 'test@example.com',
            name: '테스트 사용자',
            role: 'user',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
          },
        })
      );
    }

    // ❌ 실패 시나리오: 잘못된 자격증명
    return res(
      ctx.status(401),
      ctx.json({
        error: 'INVALID_CREDENTIALS',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      })
    );
  }),

  /**
   * 로그아웃
   * POST /api/auth/logout
   */
  rest.post('/api/auth/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: '로그아웃 되었습니다.',
      })
    );
  }),

  /**
   * 현재 사용자 정보 조회
   * GET /api/auth/me
   */
  rest.get('/api/auth/me', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');

    // 인증 헤더 검증
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'UNAUTHORIZED',
          message: '인증이 필요합니다.',
        })
      );
    }

    // 토큰 검증 (간단히)
    const token = authHeader.split(' ')[1];
    if (token !== 'mock-jwt-token-12345') {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'INVALID_TOKEN',
          message: '유효하지 않은 토큰입니다.',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 1,
          email: 'test@example.com',
          name: '테스트 사용자',
          role: 'user',
        },
      })
    );
  }),

  /**
   * 토큰 갱신
   * POST /api/auth/refresh
   */
  rest.post('/api/auth/refresh', (req, res, ctx) => {
    const { refreshToken } = req.body;

    if (refreshToken === 'mock-refresh-token-67890') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'new-mock-jwt-token-' + Date.now(),
          refreshToken: 'new-mock-refresh-token-' + Date.now(),
          expiresIn: 3600,
        })
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        error: 'INVALID_REFRESH_TOKEN',
        message: '유효하지 않은 리프레시 토큰입니다.',
      })
    );
  }),

  /**
   * 비밀번호 찾기
   * POST /api/auth/forgot-password
   */
  rest.post('/api/auth/forgot-password', (req, res, ctx) => {
    const { email } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        message: '비밀번호 재설정 이메일을 발송했습니다.',
      })
    );
  }),

  /**
   * 비밀번호 재설정
   * POST /api/auth/reset-password
   */
  rest.post('/api/auth/reset-password', (req, res, ctx) => {
    const { token, newPassword } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        message: '비밀번호가 재설정되었습니다.',
      })
    );
  }),
];
```

---

### Phase 2: RTK Query API 서비스 (1시간)

**파일**: `src/features/auth/services/authService.ts`

```typescript
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/lib/axios/axiosBaseQuery';

/**
 * 인증 API 서비스 (MSW 기반)
 *
 * @description
 * - MSW로 모킹된 인증 API 호출
 * - 실제 백엔드 연동 시 코드 변경 불필요
 */
export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: axiosBaseQuery(),

  tagTypes: ['Auth'] as const,

  endpoints: (builder) => ({
    /**
     * 로그인
     */
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    /**
     * 로그아웃
     */
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    /**
     * 현재 사용자 정보 조회
     */
    getMe: builder.query({
      query: () => '/auth/me',
    }),

    /**
     * 토큰 갱신
     */
    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),

    /**
     * 비밀번호 찾기
     */
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    /**
     * 비밀번호 재설정
     */
    resetPassword: builder.mutation({
      query: (data: { token: string; newPassword: string }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// 생성된 훅 export
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authService;
```

---

### Phase 3: Redux Slice (1시간)

**파일**: `src/features/auth/store/authSlice.ts`

```typescript
import { createSlice } from '@reduxjs/toolkit';

/**
 * 인증 상태 타입
 */
export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: null | {
    id: number;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * 초기 상태
 */
const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * 인증 Slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * 자격증명 저장
     */
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },

    /**
     * 자격증명 제거 (로그아웃)
     */
    clearCredentials: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    /**
     * 로딩 시작
     */
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    /**
     * 에러 설정
     */
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
```

---

### Phase 4: MSW 설정 (30분)

**파일**: `src/mocks/browser.ts`

```typescript
import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth';

/**
 * MSW Browser Worker 설정
 *
 * @description
 * - 브라우저 환경에서 Service Worker로 동작
 * - 개발 모드에서만 활성화
 */
export const worker = setupWorker(...authHandlers);

/**
 * MSW Worker 시작
 */
export const startMSW = () => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    worker.start({
      onUnhandledRequest: 'bypass', // 처리하지 않은 요청은 통과
    });

    console.log('🔧 MSW (Mock Service Worker) started');
  }
};
```

**파일**: `src/mocks/server.ts` (선택사항 - Node.js 환경)

```typescript
import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/auth';

/**
 * MSW Node.js Server 설정
 *
 * @description
 * - SSR 환경에서 사용 (getServerSideProps 등)
 * - Node.js 서버에서 요청 인터셉트
 */
export const server = setupServer(...authHandlers);
```

---

### Phase 5: App Router 통합 (30분)

**파일**: `src/app/providers.tsx`

```typescript
'use client';

import { useEffect } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/store';

// MSW
const startMSW = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('@/mocks/browser');
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};

/**
 * 애플리케이션 Providers
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startMSW();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
```

---

### Phase 6: Redux Store 등록 (15분)

**파일**: `src/store/api/config.ts`

```typescript
import type { Reducer, Middleware } from '@reduxjs/toolkit';

import { authService } from '@/features/auth/services/authService';
import dashboardService from '@/features/dashboard/services/dashboardService';
import { productService } from '@/features/products/services/productService';

export const API_REGISTRY = [
  // Core APIs (우선순위 10-19)
  { api: authService, priority: 10, name: 'authService' },

  // Feature APIs (우선순위 50-59)
  { api: dashboardService, priority: 50, name: 'dashboardService' },
  { api: productService, priority: 50, name: 'productsService' },
] as const;
```

**파일**: `src/store/setup.ts`

```typescript
import authReducer from '@/features/auth/store/authSlice';

export const initializeReducers = () => {
  // ✅ Core UI Reducers - 항상 초기 로드
  reducerRegistry.register('auth', authReducer, 20);

  // ✅ API Reducers
  registerAllApiReducers(reducerRegistry);
};
```

**파일**: `src/store/index.ts`

```typescript
export type RootState = {
  auth: import('@/features/auth/store/authSlice').AuthState;
  dashboard: import('@/features/dashboard/store/dashboardSlice').DashboardState;
  dashboardApi: unknown;
  authApi: unknown;
  products: import('@/features/products/types/store').ProductsUIState;
  productsApi: unknown;
};
```

---

## 🎨 로그인 페이지 구현 (2시간)

**파일**: `src/app/(auth)/login/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/features/auth/services/authService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/features/auth/store/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ email, password }).unwrap();

      // Redux Store에 저장
      dispatch(setCredentials({
        token: result.token,
        refreshToken: result.refreshToken,
        user: result.user,
      }));

      // 메인 페이지로 이동
      router.push('/sample/products/List');
    } catch (err: any) {
      setError(err.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

        {/* MSW 테스트 계정 안내 */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded text-sm">
          <p className="font-semibold text-blue-900">📧 테스트 계정</p>
          <p className="text-blue-800">이메일: test@example.com</p>
          <p className="text-blue-800">비밀번호: password123</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## 🧪 테스트 시나리오

### 1. 성공적인 로그인
```
이메일: test@example.com
비밀번호: password123
↓
✅ 로그인 성공
✅ 토큰 저장
✅ 메인 페이지로 이동
```

### 2. 실패한 로그인
```
이메일: wrong@example.com
비밀번호: wrongpassword
↓
❌ 401 Unauthorized
❌ "이메일 또는 비밀번호가 올바르지 않습니다."
```

### 3. 네트워크 지연 (MSW ctx.delay)
```
로그인 요청
↓
⏳ 500ms 지연 (실제 네트워크 시뮬레이션)
↓
✅ 응답 반환
```

### 4. 인증된 요청
```
GET /api/auth/me
Headers: Authorization: Bearer mock-jwt-token-12345
↓
✅ 사용자 정보 반환
```

---

## 🚀 장점

### 1. 프론트엔드 독립적 개발
- ✅ 백엔드 API 없이 개발 가능
- ✅ 팀 병렬 작업 (프론트엔드 + 백엔드 동시 진행)
- ✅ 기능 구현과 UI 개발 집중 가능

### 2. 빠른 프로토타이핑
- ✅ 실제 사용자 경험 시뮬레이션
- ✅ 다양한 시나리오 테스트
- ✅ 빠른 피드백 및 수정

### 3. 테스트 용이성
- ✅ 성공/실패 케이스 쉽게 테스트
- ✅ 에러 핸들링 검증
- ✅ 오프라인에서도 테스트 가능

### 4. 백엔드 전환 용이
- ✅ MSW 핸들러 제거만 하면 됨
- ✅ 프론트엔드 코드 변경 불필요
- ✅ 기존 로직 그대로 사용

### 5. 개발 경험 향상
- ✅ 오프라인 개발 가능
- ✅ API 연동 없이 기능 테스트
- ✅ 네트워크 에러 시뮬레이션

---

## 📊 실제 백엔드로 전환 시

### MSW 핸들러 제거
```typescript
// src/mocks/handlers/auth.ts
export const authHandlers = [
  // ❌ 이 코드 제거
  // rest.post('/api/auth/login', (req, res, ctx) => { ... }),
];
```

### baseURL 변경만 하면 완료!
```typescript
// src/shared/lib/axios/axiosBaseQuery.ts
const axiosBaseQuery = () => {
  return axios.create({
    // baseURL: 'http://localhost:3000/mock', // MSW 사용 시
    baseURL: process.env.NEXT_PUBLIC_API_URL, // 실제 API
  });
};
```

---

## ⏱️ 예상 소요 시간

| 단계 | 작업 | 시간 |
|------|------|------|
| 1 | MSW 핸들러 작성 | 1시간 |
| 2 | RTK Query 서비스 | 1시간 |
| 3 | Redux Slice | 1시간 |
| 4 | MSW 설정 | 30분 |
| 5 | App Router 통합 | 30분 |
| 6 | Redux Store 등록 | 15분 |
| 7 | 로그인 페이지 구현 | 2시간 |
| 8 | 테스트 및 검증 | 1시간 |
| **합계** | | **7-8시간** |

---

## 🎁 추가로 구현할 수 있는 기능

### 1. 권한 기반 라우팅
```typescript
// 미들웨어로 보호된 페이지
export default function ProtectedPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (user.role !== 'admin') {
    return <UnauthorizedPage />;
  }

  return <AdminDashboard />;
}
```

### 2. 자동 로그인
```typescript
// 앱 시작 시 토큰 검증
useEffect(() => {
  const checkAuth = async () => {
    const { data } = await getMe();
    if (data) {
      dispatch(setCredentials(data));
    }
  };
  checkAuth();
}, []);
```

### 3. 토큰 자동 갱신
```typescript
// 401 에러 시 리프레시 토큰으로 재시도
baseQuery: async (args, api, extraOptions) => {
  let result = await axiosBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const { data } = await api.dispatch(authService.endpoints.refreshToken.initiate(refreshToken)).unwrap();
    // 재시도
    result = await axiosBaseQuery(args, api, extraOptions);
  }

  return result;
}
```

---

## ✅ 결론

### MSW로 로그인 구현: **강력 추천!** ⭐⭐⭐⭐⭐

**추천하는 이유:**
1. ✅ 기술적으로 완벽하게 구현 가능
2. ✅ 백엔드 없이 프론트엔드 독립 개발
3. ✅ 실제 백엔드 연동 시 코드 변경 최소화
4. ✅ 다양한 테스트 시나리오 쉽게 구현
5. ✅ 빠른 프로토타이핑 및 MVP 개발 가능

**바로 시작하면:**
- 오늘: MSW 핸들러 + RTK Query + Redux (3시간)
- 내일: 로그인 페이지 + 통합 (4시간)
- 모레: 테스트 및 다듬질 (1시간)

**7-8시간이면 완전한 로그인 기능 구현 가능!** 🚀
