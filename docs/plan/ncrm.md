# iframe 크로스도메인 인증 통신 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** iframe에서 부모 사이트로부터 postMessage를 통해 인증 정보를 안전하게 수신하고 Redux에 저장하는 시스템 구현

**Architecture:** 3계층 구조 (통신 서비스 → React Hook → Provider), Zod 런타임 검증, 4단계 보안 검증 (origin, nonce, 스키마, timestamp)

**Tech Stack:** Next.js 16, React 19, Redux Toolkit, Zod, TypeScript, postMessage API

---

## 선행 조건 확인

### Task 0: 의존성 확인

**Files:**
- Check: `package.json`

**Step 1: Zod 설치 확인**

```bash
cat package.json | grep -A 5 '"zod"'
```

Expected: `"zod": "^4.3.5"` (이미 설치됨)

**Step 2: loglevel 확인**

```bash
cat package.json | grep '"loglevel"'
```

Expected: `"loglevel": "^1.9.2"` (이미 설치됨)

**Step 3: Redux Toolkit 확인**

```bash
cat package.json | grep '"@reduxjs/toolkit"'
```

Expected: `"@reduxjs/toolkit": "^2.5.0"` (이미 설치됨)

모든 의존성이 확인되면 다음 단계로 진행합니다.

---

## 1단계: 기본 타입 및 스키마 정의

### Task 1: 에러 타입 정의

**Files:**
- Create: `src/shared/services/iframe/types.ts`

**Step 1: 에러 타입 파일 생성**

```bash
mkdir -p src/shared/services/iframe
```

**Step 2: AuthError 클래스와 AuthErrorType enum 작성**

```typescript
// src/shared/services/iframe/types.ts

/**
 * iframe 인증 에러 타입
 */
export enum AuthErrorType {
  // 기본 에러
  TIMEOUT = 'TIMEOUT',
  INVALID_ORIGIN = 'INVALID_ORIGIN',
  INVALID_MESSAGE = 'INVALID_MESSAGE',
  MISSING_DATA = 'MISSING_DATA',
  PARENT_UNAVAILABLE = 'PARENT_UNAVAILABLE',

  // 확장 에러
  STALE_DATA = 'STALE_DATA',
  VERSION_MISMATCH = 'VERSION_MISMATCH',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  BROWSER_UNSUPPORTED = 'BROWSER_UNSUPPORTED',
  DUPLICATE_NONCE = 'DUPLICATE_NONCE',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

/**
 * iframe 인증 에러 클래스
 */
export class AuthError extends Error {
  constructor(
    public type: AuthErrorType,
    message: string,
    public recoverable: boolean
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * 인증 데이터 타입
 */
export interface AuthData {
  pfmTxCode: string;
  pfmGlobalNo: string;
  pfmStfno: string;
}
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 4: 커밋**

```bash
git add src/shared/services/iframe/types.ts
git commit -m "feat: iframe auth error types and interfaces

- Add AuthErrorType enum with 11 error types
- Add AuthError class with recoverable flag
- Add AuthData interface for auth payload
```

---

### Task 2: Zod 스키마 정의

**Files:**
- Create: `src/shared/services/iframe/schemas.ts`

**Step 1: Zod 스키마 파일 생성**

```typescript
// src/shared/services/iframe/schemas.ts
import { z } from 'zod';

/**
 * 부모 → iframe 인증 메시지 Zod 스키마
 * 런타임 타입 검증을 위한 스키마
 */
export const AuthMessageSchema = z.object({
  version: z.literal('1.0'),
  type: z.literal('AUTH_INIT'),
  nonce: z.string().min(20, 'Nonce must be at least 20 characters'),
  timestamp: z.number().int().positive('Timestamp must be a positive integer'),
  payload: z.object({
    pfmTxCode: z.string().min(1, 'pfmTxCode is required'),
    pfmGlobalNo: z.string().min(1, 'pfmGlobalNo is required'),
    pfmStfno: z.string().min(1, 'pfmStfno is required'),
  }),
});

/**
 * 타입 추론
 */
export type AuthMessage = z.infer<typeof AuthMessageSchema>;

/**
 * iframe → 부모 응답 메시지 타입
 */
export type IframeToParentMessage =
  | {
      version: '1.0';
      type: 'AUTH_ACK';
      nonce: string;
      timestamp: number;
    }
  | {
      version: '1.0';
      type: 'AUTH_ERROR';
      nonce: string;
      timestamp: number;
      payload: {
        error: string;
        type: string;
      };
    };
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 3: 커밋**

```bash
git add src/shared/services/iframe/schemas.ts
git commit -m "feat: add Zod schema for runtime validation

- Add AuthMessageSchema for parent→iframe messages
- Include version, type, nonce, timestamp validation
- Add payload validation for pfmTxCode, pfmGlobalNo, pfmStfno
- Add IframeToParentMessage type for responses
```

---

### Task 3: 환경 설정 정의

**Files:**
- Create: `src/shared/services/iframe/iframeAuthConfig.ts`

**Step 1: 환경 설정 파일 생성**

```typescript
// src/shared/services/iframe/iframeAuthConfig.ts
import { AuthData } from './types';

/**
 * 환경별 인증 설정
 */
interface AuthConfig {
  ALLOWED_ORIGINS: string[];
  TIMEOUT: number;
  RETRY_COUNT: number;
  MAX_AGE_MS: number;
}

/**
 * 환경별 설정
 * 와일드카드(*)는 사용하지 않음 (보안)
 */
const CONFIG: Record<string, AuthConfig> = {
  development: {
    // 개발 환경에서도 구체적 origin만 허용
    ALLOWED_ORIGINS: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://dev.parent-site.com',
    ],
    TIMEOUT: 10000,
    RETRY_COUNT: 3,
    MAX_AGE_MS: 60000, // 60초
  },

  production: {
    ALLOWED_ORIGINS: [
      'https://parent-site.example.com',
      'https://parent-site.example.co.kr',
    ],
    TIMEOUT: 5000,
    RETRY_COUNT: 1,
    MAX_AGE_MS: 30000, // 30초
  },
};

/**
 * 현재 환경 설정 조회
 * 환경 변수 NEXT_PUBLIC_ALLOWED_ORIGINS으로 오버라이드 가능
 */
export const getConfig = (): AuthConfig => {
  const env = process.env.NODE_ENV || 'development';
  const config = { ...CONFIG[env] };

  // 환경 변수로 origin 오버라이드
  const overrideOrigins = process.env.NEXT_PUBLIC_ALLOWED_ORIGINS;
  if (overrideOrigins) {
    config.ALLOWED_ORIGINS = overrideOrigins.split(',').map(origin => origin.trim());
  }

  return config;
};

/**
 * 디버그 모드인지 확인
 */
export const isDebugMode = (): boolean => {
  return process.env.NODE_ENV === 'development';
};
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 3: 커밋**

```bash
git add src/shared/services/iframe/iframeAuthConfig.ts
git commit -m "feat: add iframe auth configuration

- Add environment-specific config (dev/prod)
- Remove wildcard origins for security
- Support NEXT_PUBLIC_ALLOWED_ORIGINS override
- Add isDebugMode helper
```

---

## 2단계: Redux 통합

### Task 4: Redux persist 마이그레이션

**Files:**
- Create: `src/redux/migrations/authMigrations.ts`

**Step 1: migrations 디렉토리 생성**

```bash
mkdir -p src/redux/migrations
```

**Step 2: 마이그레이션 파일 생성**

```typescript
// src/redux/migrations/authMigrations.ts
import { PersistedState } from 'redux-persist';

/**
 * Redux persist 마이그레이션
 * v1 → v2: User 타입에 iframe 인증 필드 추가
 */
export const authMigrations = {
  2: (state: any) => {
    // v1 → v2: User 타입 확장
    return {
      ...state,
      auth: {
        ...state.auth,
        user: state.auth?.user
          ? {
              ...state.auth.user,
              // 새 필드 추가 (기존 코드 호환성)
              pfmTxCode: undefined,
              pfmGlobalNo: undefined,
            }
          : null,
        // 새로운 상태 필드
        status: state.auth?.status || 'idle',
        errorDetails: state.auth?.errorDetails || null,
      },
      _persist: {
        ...state._persist,
        version: 2,
      },
    } as PersistedState;
  },
};
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 4: 커밋**

```bash
git add src/redux/migrations/authMigrations.ts
git commit -m "feat: add Redux persist migration for auth v2

- Migrate v1 to v2 for User type extension
- Add pfmTxCode, pfmGlobalNo fields to existing users
- Add status and errorDetails fields to auth state
- Maintain backward compatibility
```

---

### Task 5: authSlice 확장

**Files:**
- Modify: `src/redux/slices/authSlice.ts` (기존 파일)

**Step 1: 기존 authSlice 확인**

```bash
find src -name "authSlice.ts" -type f
```

Expected: 파일 경로 확인

**Step 2: 기존 authSlice 읽기**

```bash
cat src/redux/slices/authSlice.ts
```

**Step 3: User 타입 확장 (기존 코드 유지하면서 필드 추가)**

기존 User 인터페이스에 선택적 필드 추가:

```typescript
// src/redux/slices/authSlice.ts

// 기존 User 인터페이스 찾아서 확장
interface User {
  id: number;
  employeeId: string;
  name: string;
  role: string;

  // NEW: iframe 인증 필드 (선택적, 호환성 유지)
  pfmTxCode?: string;
  pfmGlobalNo?: string;
}
```

**Step 4: AuthState에 새 필드 추가**

```typescript
// src/redux/slices/authSlice.ts

interface AuthState {
  user: User | null;

  // 기존 필드 유지 (호환성)
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // NEW: 추가 상태 필드
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  errorDetails: Error | null;
}

// 초기 상태
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  status: 'idle',
  errorDetails: null,
};
```

**Step 5: setIframeAuth 액션 추가**

```typescript
// src/redux/slices/authSlice.ts

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ... 기존 리듀서

    // NEW: iframe 인증 정보 설정
    setIframeAuth: (state, action: PayloadAction<{ pfmTxCode: string; pfmGlobalNo: string; pfmStfno: string }>) => {
      const { pfmTxCode, pfmGlobalNo, pfmStfno } = action.payload;

      // 기존 user가 있으면 확장, 없으면 새로 생성
      if (state.user) {
        state.user.pfmTxCode = pfmTxCode;
        state.user.pfmGlobalNo = pfmGlobalNo;
        state.user.employeeId = pfmStfno; // 기존 필드 업데이트
      } else {
        state.user = {
          id: 0, // 임시 값
          employeeId: pfmStfno,
          name: '',
          role: '',
          pfmTxCode,
          pfmGlobalNo,
        };
      }

      state.isAuthenticated = true;
      state.isLoading = false;
      state.status = 'authenticated';
      state.error = null;
      state.errorDetails = null;
    },

    // NEW: iframe 인증 상태 설정
    setIframeAuthStatus: (state, action: PayloadAction<'loading' | 'error'>) => {
      state.status = action.payload;
      state.isLoading = action.payload === 'loading';

      if (action.payload === 'error') {
        state.isAuthenticated = false;
      }
    },
  },
});

export const { setIframeAuth, setIframeAuthStatus } = authSlice.actions;
```

**Step 6: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 7: 커밋**

```bash
git add src/redux/slices/authSlice.ts
git commit -m "feat: extend authSlice for iframe authentication

- Add optional pfmTxCode, pfmGlobalNo fields to User interface
- Add status, errorDetails fields to AuthState
- Add setIframeAuth action for iframe auth data
- Add setIframeAuthStatus action for auth status
- Maintain backward compatibility with existing fields
```

---

## 3단계: 통신 서비스 구현

### Task 6: iframeAuthService 핵심 구현

**Files:**
- Create: `src/shared/services/iframe/iframeAuthService.ts`

**Step 1: 서비스 파일 생성**

```typescript
// src/shared/services/iframe/iframeAuthService.ts
import log from '@/shared/utils/logger';
import { AuthError, AuthErrorType, AuthData } from './types';
import { AuthMessageSchema } from './schemas';
import { getConfig, isDebugMode } from './iframeAuthConfig';

const logger = log.getLogger('IframeAuthService');

/**
 * iframe 인증 서비스
 * postMessage API를 통해 부모 사이트와 통신
 */
export class IframeAuthService {
  private processedNonces = new Set<string>();
  private readonly NONCE_EXPIRY_MS = 10000; // 10초
  private messageHandler: ((event: MessageEvent) => void) | null = null;
  private timeoutTimer: NodeJS.Timeout | null = null;

  /**
   * 인증 초기화
   * @returns Promise<AuthData> 인증 데이터
   */
  async init(): Promise<AuthData> {
    const config = getConfig();

    logger.info('[IframeAuthService] Initializing iframe auth', {
      timeout: config.TIMEOUT,
      retryCount: config.RETRY_COUNT,
    });

    // postMessage 지원 확인
    if (typeof window === 'undefined' || !window.postMessage) {
      throw new AuthError(
        AuthErrorType.BROWSER_UNSUPPORTED,
        'postMessage is not supported in this environment',
        false
      );
    }

    // 부모 윈도우 확인
    if (!window.parent || window.parent === window) {
      throw new AuthError(
        AuthErrorType.PARENT_UNAVAILABLE,
        'Parent window is not available',
        false
      );
    }

    // Exponential backoff로 재시도
    let lastError: Error;

    for (let attempt = 0; attempt < config.RETRY_COUNT; attempt++) {
      try {
        return await this.waitForAuth(config.TIMEOUT);
      } catch (error) {
        lastError = error as Error;

        // 회복 불가능한 에러면 즉시 중단
        if (!this.isRecoverable(lastError as AuthError)) {
          break;
        }

        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000;

        logger.warn(`[IframeAuthService] Retry ${attempt + 1}/${config.RETRY_COUNT} after ${delay}ms`);

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }

  /**
   * 인증 메시지 대기
   */
  private waitForAuth(timeout: number): Promise<AuthData> {
    return new Promise((resolve, reject) => {
      // 타이머 설정
      this.timeoutTimer = setTimeout(() => {
        this.cleanup();
        reject(new AuthError(
          AuthErrorType.TIMEOUT,
          `Auth timeout after ${timeout}ms`,
          true
        ));
      }, timeout);

      // 메시지 핸들러 등록
      this.messageHandler = (event: MessageEvent) => {
        try {
          const authData = this.handleMessage(event);

          // 성공 시 타이머 정리
          if (this.timeoutTimer) {
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = null;
          }

          resolve(authData);
        } catch (error) {
          if (error instanceof AuthError) {
            this.cleanup();
            reject(error);
          }
          // 무시한 에러는 계속 대기
        }
      };

      window.addEventListener('message', this.messageHandler);
      logger.info('[IframeAuthService] Message listener registered');
    });
  }

  /**
   * 메시지 처리 (4단계 검증)
   */
  private handleMessage(event: MessageEvent): AuthData {
    // 1단계: Origin 검증
    if (!this.validateOrigin(event.origin)) {
      logger.warn('[IframeAuthService] Invalid origin rejected', { origin: event.origin });
      throw new AuthError(
        AuthErrorType.INVALID_ORIGIN,
        `Invalid origin: ${event.origin}`,
        false
      );
    }

    // 2단계: Zod 스키마 검증
    const validatedMessage = this.validateMessage(event.data);

    // 3단계: Nonce 검증 (replay attack 방지)
    this.validateNonce(validatedMessage.nonce);

    // 4단계: Timestamp 검증
    this.validateTimestamp(validatedMessage.timestamp);

    // 모든 검증 통과
    logger.info('[IframeAuthService] Auth message validated successfully', {
      origin: event.origin,
      nonce: validatedMessage.nonce.substring(0, 8) + '...',
    });

    return {
      pfmTxCode: validatedMessage.payload.pfmTxCode,
      pfmGlobalNo: validatedMessage.payload.pfmGlobalNo,
      pfmStfno: validatedMessage.payload.pfmStfno,
    };
  }

  /**
   * Origin 검증 (1단계)
   */
  private validateOrigin(origin: string): boolean {
    const config = getConfig();

    return config.ALLOWED_ORIGINS.some(allowed => {
      // 와일드카드 지원 (패턴 매칭)
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '[^/]+');
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return origin === allowed;
    });
  }

  /**
   * Zod 스키마 검증 (2단계)
   */
  private validateMessage(data: unknown) {
    try {
      return AuthMessageSchema.parse(data);
    } catch (error) {
      logger.error('[IframeAuthService] Zod validation failed', { error });
      throw new AuthError(
        AuthErrorType.VALIDATION_ERROR,
        `Message validation failed: ${error instanceof Error ? error.message : String(error)}`,
        false
      );
    }
  }

  /**
   * Nonce 검증 (3단계, replay attack 방지)
   */
  private validateNonce(nonce: string): boolean {
    // 중복 nonce 체크
    if (this.processedNonces.has(nonce)) {
      logger.warn('[IframeAuthService] Duplicate nonce detected', { nonce });
      throw new AuthError(
        AuthErrorType.DUPLICATE_NONCE,
        'Replay attack detected: duplicate nonce',
        false
      );
    }

    this.processedNonces.add(nonce);

    // 자동 정리 (10초 후)
    setTimeout(() => {
      this.processedNonces.delete(nonce);
    }, this.NONCE_EXPIRY_MS);

    return true;
  }

  /**
   * Timestamp 검증 (4단계)
   */
  private validateTimestamp(timestamp: number): boolean {
    const config = getConfig();
    const now = Date.now();
    const age = Math.abs(now - timestamp);

    if (age > config.MAX_AGE_MS) {
      logger.warn('[IframeAuthService] Stale message detected', { timestamp, age });
      throw new AuthError(
        AuthErrorType.STALE_DATA,
        `Message too old: ${age}ms (max: ${config.MAX_AGE_MS}ms)`,
        true
      );
    }

    return true;
  }

  /**
   * 회복 가능한 에러 판별
   */
  private isRecoverable(error: AuthError): boolean {
    return error.recoverable && (
      error.type === AuthErrorType.TIMEOUT ||
      error.type === AuthErrorType.STALE_DATA ||
      error.type === AuthErrorType.RATE_LIMIT_EXCEEDED
    );
  }

  /**
   * 리소스 정리
   */
  cleanup(): void {
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler);
      this.messageHandler = null;
      logger.info('[IframeAuthService] Message listener removed');
    }

    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }

    this.processedNonces.clear();
  }
}

// 싱글톤 인스턴스
let authServiceInstance: IframeAuthService | null = null;

/**
 * IframeAuthService 싱글톤 인스턴스 조회
 */
export const getIframeAuthService = (): IframeAuthService => {
  if (!authServiceInstance) {
    authServiceInstance = new IframeAuthService();
  }
  return authServiceInstance;
};

/**
 * 개발 모드 디버깅 도구
 */
if (isDebugMode()) {
  if (typeof window !== 'undefined') {
    (window as any).__IFRAME_AUTH__ = {
      getInstance: () => getIframeAuthService(),
      getConfig,
      getServiceState: () => ({
        processedNonces: Array.from(getIframeAuthService()['processedNonces']),
        hasHandler: getIframeAuthService()['messageHandler'] !== null,
      }),
    };
    logger.info('[IframeAuthService] Debug tools exposed to window.__IFRAME_AUTH__');
  }
}
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 3: 커밋**

```bash
git add src/shared/services/iframe/iframeAuthService.ts
git commit -m "feat: implement iframeAuthService with 4-layer validation

- Add init() with exponential backoff retry
- Implement 4-layer validation: origin, Zod schema, nonce, timestamp
- Add replay attack prevention with nonce tracking
- Add stale message detection with timestamp validation
- Add cleanup method for resource management
- Add singleton pattern with getIframeAuthService()
- Add debug tools for development mode
- Use loglevel for structured logging
```

---

## 4단계: React 통합

### Task 7: useIframeAuth Hook 구현

**Files:**
- Create: `src/shared/hooks/useIframeAuth.ts`

**Step 1: Hook 파일 생성**

```typescript
// src/shared/hooks/useIframeAuth.ts
'use client';

import { useState, use, useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setIframeAuth, setIframeAuthStatus } from '@/redux/slices/authSlice';
import { getIframeAuthService } from '@/shared/services/iframe/iframeAuthService';
import { AuthError, AuthData } from '@/shared/services/iframe/types';

/**
 * iframe 인증 Hook
 * React 19의 use() 훅을 활용하여 Promise 처리
 */
export function useIframeAuth() {
  const dispatch = useAppDispatch();
  const [authPromise] = useState(() => getIframeAuthService().init());
  const [isRetrying, setIsRetrying] = useState(false);

  // 인증 상태 업데이트
  useEffect(() => {
    dispatch(setIframeAuthStatus('loading'));
  }, [dispatch]);

  // 재시도 함수
  const retry = () => {
    setIsRetrying(true);
    const newPromise = getIframeAuthService().init();
    dispatch(setIframeAuthStatus('loading'));

    newPromise
      .then((authData) => {
        dispatch(setIframeAuth(authData));
        setIsRetrying(false);
      })
      .catch((error) => {
        dispatch(setIframeAuthStatus('error'));
        setIsRetrying(false);
      });
  };

  try {
    // React 19의 use() 훅으로 Promise 처리
    const authData = use(authPromise);

    // Redux store에 저장
    useEffect(() => {
      dispatch(setIframeAuth(authData));
    }, [authData, dispatch]);

    return {
      data: authData,
      isLoading: false,
      error: null,
      retry,
      isRetrying,
    };
  } catch (error) {
    dispatch(setIframeAuthStatus('error'));

    return {
      data: null,
      isLoading: false,
      error: error as Error,
      retry,
      isRetrying: false,
    };
  }
}
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 3: 커밋**

```bash
git add src/shared/hooks/useIframeAuth.ts
git commit -m "feat: implement useIframeAuth hook with React 19 use()

- Use React 19 use() hook for Promise handling
- Integrate with Redux store for auth state
- Add retry function for recoverable errors
- Add isRetrying state for UI feedback
- Dispatch setIframeAuth and setIframeAuthStatus actions
- Client-side only with 'use client' directive
```

---

### Task 8: AuthProvider 구현

**Files:**
- Create: `src/shared/providers/AuthProvider.tsx`

**Step 1: Provider 파일 생성**

```typescript
// src/shared/providers/AuthProvider.tsx
'use client';

import { ReactNode } from 'react';
import { useIframeAuth } from '@/shared/hooks/useIframeAuth';
import { AlertCircle } from 'lucide-react';

/**
 * AuthProvider 속성
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 로딩 스피너 컴포넌트
 */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm text-muted-foreground">인증 정보를 불러오는 중...</p>
      </div>
    </div>
  );
}

/**
 * 에러 Fallback 컴포넌트
 */
interface ErrorFallbackProps {
  error: Error;
  retry: () => void;
  isRetrying: boolean;
}

function ErrorFallback({ error, retry, isRetrying }: ErrorFallbackProps) {
  const isRecoverable = (error as any)?.recoverable === true;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md p-6">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">인증 오류</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {error.message || '인증 정보를 가져오지 못했습니다.'}
        </p>

        {isRecoverable && (
          <button
            onClick={retry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? '재시도 중...' : '재시도'}
          </button>
        )}

        <div className="mt-4 text-xs text-muted-foreground">
          에러 타입: {(error as any)?.type || 'UNKNOWN'}
        </div>
      </div>
    </div>
  );
}

/**
 * iframe 인증 Provider 컴포넌트
 * 인증 완료 시 children 렌더링
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const authState = useIframeAuth();

  // 로딩 중
  if (authState.isLoading) {
    return <LoadingSpinner />;
  }

  // 에러 발생
  if (authState.error) {
    return (
      <ErrorFallback
        error={authState.error}
        retry={authState.retry}
        isRetrying={authState.isRetrying}
      />
    );
  }

  // 인증 성공 → children 렌더링
  return <>{children}</>;
}
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 3: 커밋**

```bash
git add src/shared/providers/AuthProvider.tsx
git commit -m "feat: implement AuthProvider with loading and error states

- Add LoadingSpinner component for auth loading state
- Add ErrorFallback component with retry button
- Display error type and message for debugging
- Support recoverable errors with retry functionality
- Use lucide-react AlertCircle icon
- Apply Tailwind classes for styling
- Render children only when authenticated
```

---

## 5단계: 유틸리티 수정 및 통합

### Task 9: authUtils 수정

**Files:**
- Modify: `src/shared/utils/authUtils.ts`

**Step 1: 기존 authUtils 확인**

```bash
cat src/shared/utils/authUtils.ts
```

**Step 2: getHeader 함수에 새 필드 추가**

기존 코드를 수정하여 새 헤더 필드 지원:

```typescript
// src/shared/utils/authUtils.ts
import { RootState } from '@/redux';
import log from '@/shared/utils/logger';
import { getStore } from './globalRegistry';

const logger = log.getLogger('AuthUtils');

/**
 * 헤더 타입
 */
interface Header {
  pfmTxCode: string;
  pfmGlobalNo: string;
  pfmStfno: string;
}

/**
 * 인증 헤더 값 조회
 *
 * @param key - 헤더 키
 * @returns 요청한 헤더 값
 */
export function getHeader(key: keyof Header): string {
  logger.debug('[AuthUtils] getHeader called', { key });

  const store = getStore();
  const state = store.getState() as unknown as RootState;

  const user = state.auth.user;

  // 기존 필드 (호환성 유지)
  if (key === 'pfmStfno') {
    return user?.employeeId ?? '';
  }

  // 새 필드
  if (key === 'pfmTxCode') {
    return user?.pfmTxCode ?? '';
  }

  if (key === 'pfmGlobalNo') {
    return user?.pfmGlobalNo ?? '';
  }

  logger.warn('[AuthUtils] Unknown header key', { key });
  return '';
}
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 4: 커밋**

```bash
git add src/shared/utils/authUtils.ts
git commit -m "feat: extend authUtils getHeader for iframe auth fields

- Add support for pfmTxCode and pfmGlobalNo headers
- Maintain backward compatibility with pfmStfno field
- Add logging for unknown header keys
- Use optional chaining for null safety
```

---

### Task 10: layout.tsx에 AuthProvider 적용

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: 기존 layout 확인**

```bash
cat src/app/layout.tsx | head -50
```

**Step 2: AuthProvider 임포트 및 적용**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from '@/redux/provider';
import { AuthProvider } from '@/shared/providers/AuthProvider'; // NEW

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <AuthProvider> {/* NEW */}
            {children}
          </AuthProvider> {/* NEW */}
        </Provider>
      </body>
    </html>
  );
}
```

**Step 3: 빌드 테스트**

```bash
npm run build 2>&1 | head -50
```

Expected: No build errors

**Step 4: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 5: 커밋**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate AuthProvider in root layout

- Import and wrap children with AuthProvider
- Maintain existing Redux Provider structure
- Ensure AuthProvider runs after Redux Provider
- Enable iframe auth for entire app
```

---

## 6단계: Redux store 마이그레이션 설정

### Task 11: Redux persist에 마이그레이션 적용

**Files:**
- Modify: `src/redux/store.ts` (또는 persist 설정 파일)

**Step 1: 기존 store 파일 찾기**

```bash
find src -name "*store*" -type f | grep -v node_modules
```

**Step 2: persistConfig에 마이그레이션 추가**

```typescript
// src/redux/store.ts (또는 해당 파일)
import { createMigrate } from 'redux-persist';
import { authMigrations } from './migrations/authMigrations';

const persistConfig = {
  key: 'root',
  version: 2, // 버전 증가
  storage,
  migrate: createMigrate(authMigrations, { debug: process.env.NODE_ENV === 'development' }),
  // ... 기존 설정
};
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 4: 빌드 테스트**

```bash
npm run build 2>&1 | head -50
```

Expected: No build errors

**Step 5: 커밋**

```bash
git add src/redux/store.ts
git commit -m "feat: add Redux persist migration config

- Update persistConfig version to 2
- Integrate authMigrations with createMigrate
- Enable debug mode for development
- Support v1 to v2 state migration
```

---

## 7단계: 환경 변수 설정

### Task 12: .env.example 업데이트

**Files:**
- Create: `.env.example` (또는 수정)

**Step 1: 환경 변수 예제 추가**

```bash
# .env.example

# iframe 인증 설정
# 허용된 부모 사이트 origin들 (쉼표로 구분)
# 개발 환경에서도 와일드카드(*) 사용하지 않기
NEXT_PUBLIC_ALLOWED_ORIGINS=http://localhost:3000,https://dev.parent-site.com
```

**Step 2: 커밋**

```bash
git add .env.example
git commit -m "docs: add iframe auth environment variables

- Add NEXT_PUBLIC_ALLOWED_ORIGINS example
- Document wildcard (*) security restriction
- Provide development default values
```

---

## 8단계: 테스트 및 검증

### Task 13: 개발 서버 실행 및 기본 테스트

**Step 1: 개발 서버 시작**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000

**Step 2: 브라우저 콘솔 확인**

브라우저에서 http://localhost:3000 접속 후 콘솔 확인:

```javascript
// 개발 도구 노출 확인
window.__IFRAME_AUTH__
```

Expected:
```javascript
{
  getInstance: ƒ(),
  getConfig: ƒ(),
  getServiceState: ƒ()
}
```

**Step 3: 수동 테스트 (postMessage 시뮬레이션)**

브라우저 콘솔에서:

```javascript
// 부모 사이트에서 메시지 보내는 것 시뮬레이션
window.postMessage({
  version: '1.0',
  type: 'AUTH_INIT',
  nonce: 'test-nonce-' + Date.now(),
  timestamp: Date.now(),
  payload: {
    pfmTxCode: 'TEST_TX_001',
    pfmGlobalNo: 'TEST_GLOBAL_001',
    pfmStfno: 'TEST_STF_001'
  }
}, 'http://localhost:3000');
```

Expected:
- 인증이 성공하고 페이지가 정상적으로 렌더링
- Redux DevTools에서 auth.user 확인 가능

**Step 4: Redux DevTools 확인**

Redux DevTools Extension에서 state 확인:

```javascript
{
  auth: {
    user: {
      employeeId: "TEST_STF_001",
      pfmTxCode: "TEST_TX_001",
      pfmGlobalNo: "TEST_GLOBAL_001",
      // ... 기존 필드
    },
    status: "authenticated",
    isAuthenticated: true,
    isLoading: false
  }
}
```

**Step 5: authUtils 테스트**

콘솔에서:

```javascript
// 앱 어딘가에서 import해서 테스트
import { getHeader } from '@/shared/utils/authUtils';
console.log(getHeader('pfmTxCode'));    // "TEST_TX_001"
console.log(getHeader('pfmGlobalNo'));  // "TEST_GLOBAL_001"
console.log(getHeader('pfmStfno'));     // "TEST_STF_001"
```

---

## 9단계: 최종 검증 및 배포 준비

### Task 14: 린트 및 타입 체크

**Step 1: ESLint 실행**

```bash
npm run lint
```

Expected: No errors

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: No errors

**Step 3: 포맷 체크**

```bash
npm run format
```

**Step 4: 최종 커밋**

```bash
git add .
git commit -m "chore: final code quality checks passed

- ESLint: no errors
- TypeScript: no errors
- Prettier: formatted
```

---

### Task 15: 빌드 검증

**Step 1: 프로덕션 빌드**

```bash
npm run build
```

Expected: Build succeeds without errors

**Step 2: 빌드 출력 확인**

```bash
ls -lh .next/static/chunks/
```

Expected: 번들 파일 생성 확인

**Step 3: 커밋**

```bash
git add .next/package.json  # 빌드 아티팩트 무시하도록 .gitignore 확인
git commit -m "chore: verify production build succeeds
```

---

## 10단계: 문서화

### Task 16: README 업데이트

**Files:**
- Create: `docs/iframe-auth-usage.md`

**Step 1: 사용 가이드 작성**

```markdown
# iframe 인증 통신 사용 가이드

## 개요

이 앱은 iframe으로 삽입되어 부모 사이트로부터 postMessage를 통해 인증 정보를 수신합니다.

## 인증 절차

1. 부모 사이트가 iframe을 로드
2. iframe이 준비되면 이벤트 리스너 등록
3. 부모 사이트가 `onload` 시 인증 정보 전송
4. iframe이 4단계 검증 수행 (origin, nonce, 스키마, timestamp)
5. 검증 통공 시 Redux store에 저장
6. 앱 렌더링 시작

## 부모 사이트 구현 예제

\`\`\`html
<iframe
  src="https://your-app.com"
  onload="sendAuthData()"
></iframe>

<script>
function sendAuthData() {
  const iframe = document.querySelector('iframe');
  const nonce = generateNonce(); // 20자 이상 랜덤 문자열

  iframe.contentWindow.postMessage({
    version: '1.0',
    type: 'AUTH_INIT',
    nonce: nonce,
    timestamp: Date.now(),
    payload: {
      pfmTxCode: 'TX001',
      pfmGlobalNo: 'GLOBAL001',
      pfmStfno: 'EMP001'
    }
  }, 'https://your-app.com');
}

function generateNonce() {
  return Array.from(crypto.getRandomValues(new Uint8Array(20)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
</script>
\`\`\`

## 환경 설정

\`\`\`bash
# .env.local
NEXT_PUBLIC_ALLOWED_ORIGINS=https://parent-site.com,https://parent-site.co.kr
\`\`\`

## 개발 도구

개발 모드에서는 \`window.__IFRAME_AUTH__\`로 디버깅 도구에 접근 가능:

\`\`\`javascript
// 설정 확인
window.__IFRAME_AUTH__.getConfig()

// 서비스 상태 확인
window.__IFRAME_AUTH__.getServiceState()

// 메시지 시뮬레이션
window.__IFRAME_AUTH__.getInstance().simulateMessage({
  version: '1.0',
  type: 'AUTH_INIT',
  nonce: 'test-nonce',
  timestamp: Date.now(),
  payload: { pfmTxCode: 'TEST', pfmGlobalNo: 'TEST', pfmStfno: 'TEST' }
});
\`\`\`

## 에러 처리

| 에러 타입 | 재시도 가능 | 설명 |
|-----------|-----------|------|
| TIMEOUT | 예 | 타임아웃 초과 |
| INVALID_ORIGIN | 아니오 | 허용되지 않은 도메인 |
| VALIDATION_ERROR | 아니오 | 메시지 형식 오류 |
| DUPLICATE_NONCE | 아니오 | Replay attack 감지 |
| STALE_DATA | 예 | 메시지 너무 오래됨 |
| VERSION_MISMATCH | 아니오 | 프로토콜 버전 불일치 |
| BROWSER_UNSUPPORTED | 아니오 | postMessage 미지원 |
\`\`\`

## 보안 고려사항

1. **Origin 검증**: 와일드카드(*) 사용하지 않기
2. **Nonce**: 매번 고유한 20자 이상 nonce 생성
3. **Timestamp**: 메시지 생성 시점 타임스탬프 포함
4. **HTTPS**: 프로덕션에서는 반드시 HTTPS 사용
\`\`\`
```

**Step 2: 커밋**

```bash
git add docs/iframe-auth-usage.md
git commit -m "docs: add iframe authentication usage guide

- Add parent site implementation example
- Document environment configuration
- Add development tools reference
- Add error handling matrix
- Add security considerations
"
```

---

## 완료 체크리스트

### 구현 완료 항목

- [ ] ✅ Task 1: 에러 타입 정의
- [ ] ✅ Task 2: Zod 스키마 정의
- [ ] ✅ Task 3: 환경 설정 정의
- [ ] ✅ Task 4: Redux persist 마이그레이션
- [ ] ✅ Task 5: authSlice 확장
- [ ] ✅ Task 6: iframeAuthService 구현
- [ ] ✅ Task 7: useIframeAuth Hook 구현
- [ ] ✅ Task 8: AuthProvider 구현
- [ ] ✅ Task 9: authUtils 수정
- [ ] ✅ Task 10: layout.tsx에 AuthProvider 적용
- [ ] ✅ Task 11: Redux store 마이그레이션 설정
- [ ] ✅ Task 12: 환경 변수 설정
- [ ] ✅ Task 13: 개발 서버 테스트
- [ ] ✅ Task 14: 린트 및 타입 체크
- [ ] ✅ Task 15: 빌드 검증
- [ ] ✅ Task 16: 문서화

### 최종 검증

- [ ] 빌드 성공: `npm run build`
- [ ] 타입 체크 통과: `npm run type-check`
- [ ] 린트 통과: `npm run lint`
- [ ] 개발 서버 정상 작동: `npm run dev`
- [ ] Redux DevTools에서 인증 상태 확인
- [ ] postMessage 시뮬레이션 테스트 통과
- [ ] getHeader() 함수 정상 작동

---

## 다음 단계

구현이 완료되면:

1. **부모 사이트 연동**: 부모 사이트 팀에 postMessage 스펙 전달
2. **통합 테스트**: 실제 부모 사이트와의 iframe 통신 테스트
3. **모니터링**: 프로덕션 배포 후 에러 로그 모니터링
4. **문서 공유**: 부모 사이트 팀에 사용 가이드 공유

---

## 참조

- 설계 문서: `docs/plans/2026-03-16-iframe-auth-design.md`
- Zod 문서: https://zod.dev/
- postMessage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
- Redux Persist: https://github.com/rt2zz/redux-persist

