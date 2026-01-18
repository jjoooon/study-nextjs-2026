# 라우트 보호 구현 가이드

## 개요

Layout-based Route Protection을 사용하여 인증되지 않은 사용자의 접근을 제어합니다.

---

## 아키텍처

### 구성 요소

```
┌─────────────────────────────────────────────────────────────┐
│                        Root Layout                          │
│  (src/app/layout.tsx)                                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Providers (Redux, PersistGate, MSW)                │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │  AuthGuard (Route Protection)                 │  │   │
│  │  │  - Check isAuthenticated from Redux          │  │   │
│  │  │  - Redirect to /login if not authenticated   │  │   │
│  │  │  ┌─────────────────────────────────────────┐  │  │   │
│  │  │  │  Page Content                           │  │  │   │
│  │  │  │  - /, /dashboard, /products, etc.      │  │  │   │
│  │  │  └─────────────────────────────────────────┘  │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 흐름도

```
┌──────────────────┐
│  User Request    │
│  (e.g., /dashboard) │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Root Layout     │
│  Render          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Providers       │
│  - Redux Store   │
│  - PersistGate   │
│  - MSW (dev)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌─────────────────┐
│  AuthGuard       │────▶│  Public Path?   │
│  - isAuthenticated│     │  (/login only)  │
└────────┬─────────┘     └───────┬─────────┘
         │                       │
         │               ┌───────┴───────┐
         │               │              │
         │           YES │              │ NO
         │               │              │
         │               ▼              ▼
         │        ┌──────────┐   ┌─────────────┐
         │        │  Render  │   │ Auth Check  │
         │        │  Content │   └──────┬──────┘
         │        └──────────┘          │
         │                              ▼
         │                      ┌───────────────┐
         │                      │ Authenticated?│
         │                      └───────┬───────┘
         │                      │       │
         │                  ┌───┘       └───┐
         │              NO │               │ YES
         │                  ▼               ▼
         │          ┌───────────┐    ┌───────────┐
         │          │ Redirect  │    │  Render   │
         │          │ to /login │    │  Content  │
         │          └───────────┘    └───────────┘
         │
         ▼
┌──────────────────┐
│  Response        │
└──────────────────┘
```

---

## 파일 구조

```
src/
├── app/
│   ├── layout.tsx                    # Root Layout (AuthGuard 통합)
│   └── login/
│       └── page.tsx                  # Login Page (returnUrl 처리)
├── shared/
│   └── components/
│       └── auth/
│           └── AuthGuard.tsx         # 인증 가드 컴포넌트
└── features/
    └── auth/
        ├── services/
        │   └── authService.ts        # RTK Query API
        └── store/
            └── authSlice.ts          # Redux Auth State
```

---

## 사용 방법

### 1. 기본 동작

```typescript
// src/app/layout.tsx
import { AuthGuard } from '@/shared/components/auth/AuthGuard';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
```

### 2. 공개 경로 설정

```typescript
// src/shared/components/auth/AuthGuard.tsx
const PUBLIC_PATHS = ['/login'] as const;

// 다른 경로 추가:
const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'] as const;
```

### 3. 로그인 후 리다이렉트

```typescript
// src/app/login/page.tsx
const searchParams = useSearchParams();
const returnUrl = searchParams.get('returnUrl');

// 로그인 성공 후
const redirectPath = returnUrl ? decodeURIComponent(returnUrl) : '/';
router.push(redirectPath);
```

---

## 동작 시나리오

### 시나리오 1: 인증되지 않은 사용자가 보호된 페이지 접근

```
1. 사용자: /dashboard 접근
2. AuthGuard: isAuthenticated = false 확인
3. AuthGuard: /login?returnUrl=%2Fdashboard 로 리다이렉트
4. 사용자: 로그인 성공
5. Login Page: returnUrl 확인 후 /dashboard로 리다이렉트
6. AuthGuard: isAuthenticated = true 확인
7. AuthGuard: /dashboard 컨텐츠 렌더링
```

### 시나리오 2: 인증된 사용자가 로그인 페이지 접근

```
1. 사용자: /login 접근 (이미 인증됨)
2. AuthGuard: isPublicPath('/login') = true 확인
3. AuthGuard: 바로 렌더링 (리다이렉트 없음)
4. 사용자: 로그인 페이지 표시
```

### 시나리오 3: 페이지 새로고침

```
1. 사용자: /dashboard에서 새로고침
2. Redux Persist: sessionStorage에서 상태 복원
3. AuthGuard: isAuthenticated = true 확인
4. AuthGuard: /dashboard 컨텐츠 렌더링
```

---

## Redux 상태

### Auth State

```typescript
interface AuthState {
  token: string | null;           // Access Token
  refreshToken: string | null;    // Refresh Token (쿠키에서 관리)
  user: User | null;              // 사용자 정보
  isAuthenticated: boolean;       // 인증 여부 (AuthGuard에서 사용)
  isLoading: boolean;             // 로딩 상태
  error: string | null;           // 에러 메시지
}
```

### Redux Persist

```typescript
// src/store/config.ts
export const persistConfig = {
  key: 'root',
  storage: secureStorage,          // sessionStorage 사용
  whitelist: ['auth'],             // auth 상태만 지속
};
```

---

## 보안 고려사항

### ✅ 장점

- **Redux 상태 신뢰**: `isAuthenticated`를 단일 출처로 사용
- **즉시 리다이렉트**: 보호된 컨텐츠가 HTML에 노출되지 않음
- **UX 개선**: 깜빡임 없는 부드러운 전환
- **Redux Persist**: 새로고침 후에도 인증 상태 유지

### ⚠️ 한계점

- **클라이언트 사이드**: 첫 렌더링 전까지는 차단 불가능
- **페이지 소스**: HTML 소스에 일부 컨텐츠가 포함될 수 있음 (개선 필요시 서버 사이드 체크 추가)

### 🔒 개선 방향 (선택 사항)

```typescript
// src/middleware.ts (추가 구현시)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  // 보호된 경로 + 쿠키 없음
  if (!pathname.startsWith('/login') && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

---

## 확장

### 권한 기반 접근 제어 (RBAC)

```typescript
// AuthGuard.tsx 확장
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/admin': ['admin'],
  '/dashboard': ['user', 'admin'],
};

const hasRequiredRole = (userRole: string, requiredRoles: string[]) => {
  return requiredRoles.includes(userRole);
};
```

### 조건부 렌더링

```typescript
// AuthGuard.tsx
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
const user = useAppSelector((state) => state.auth.user);

// 역할 체크 추가
if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
  router.push('/unauthorized');
  return null;
}
```

---

## 테스트

### 수동 테스트 시나리오

1. **인증되지 않은 상태에서 보호된 페이지 접근**
   - 브라우저 개발자 도구 → Application → Session Storage → Clear
   - `/dashboard` 접근
   - 예상: `/login?returnUrl=%2Fdashboard`로 리다이렉트

2. **로그인 후 returnUrl 복귀**
   - 로그인 페이지에서 로그인
   - 예상: `/dashboard`로 리다이렉트

3. **로그인 상태에서 페이지 새로고침**
   - `/dashboard`에서 F5
   - 예상: 인증 상태 유지, 페이지 정상 표시

4. **로그인 페이지 접근**
   - `/login` 직접 접근
   - 예상: 로그인 페이지 정상 표시

---

## 문제 해결

### 문제 1: 무한 리다이렉트

```typescript
// ❌ 잘못된 예
if (!isAuthenticated) {
  router.push('/login');  // /login도 보호된 경로면 무한 루프
}

// ✅ 올바른 예
if (!isAuthenticated && !isPublicPath(pathname)) {
  router.push('/login');
}
```

### 문제 2: 깜빡임 현상

```typescript
// ❌ 잘못된 예
if (!isAuthenticated) {
  return <div>Loading...</div>;  // 깜빡임 발생
}

// ✅ 올바른 예
if (!isAuthenticated && !isPublicPath(pathname)) {
  return null;  // 즉시 리다이렉트로 깜빡임 없음
}
```

### 문제 3: Hydration Mismatch

```typescript
// ✅ 해결: PersistGate 사용
<PersistGate loading={null} persistor={persistor}>
  <AuthGuard>{children}</AuthGuard>
</PersistGate>
```

---

## 참고 자료

- [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Next.js Navigation](https://nextjs.org/docs/app/api-reference/functions/use-router)
