import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApiSlice } from '@/features/users';
import { postsApiSlice } from '@/features/posts';
import { authApiSlice } from '@/features/auth';
import { authReducer } from '@/features/auth';
import { uiReducer } from '@/features/ui';
import { dashboardReducer } from '@/features/dashboard';
import { performanceMiddleware } from './middleware/performance';
import { middlewareRegistry } from './middleware/registry';
import log from '@/shared/utils/logger';

// ============================================================================
// REDUX STORE CONFIGURATION
// ============================================================================

/**
 * Redux Store Configuration (최적화된 대규모 프로젝트 구조)
 *
 * @architecture
 * - usersApi, postsApi, authApi: 도메인별 독립 API 슬라이스
 * - Performance Monitoring: 느린 액션 자동 식별
 * - Middleware Registry: 팀별 독립적 미들웨어 개발
 * - Selector Layer: 불필요한 리렌더링 방지
 *
 * @scalability
 * - 50+ 개발자가 동시에 작업 가능
 * - 병렬 컴파일로 빌드 시간 단축
 * - 팀 독립적으로 기능 추가 가능
 */

// 등록할 미들웨어 우선순위:
// 0-9: Core checks (serializable, immutable)
// 10-29: Performance & Monitoring
// 30-49: Logging
// 50-99: API middlewares
// 100+: Error handling, analytics

// Register core middleware
middlewareRegistry.register('performance', performanceMiddleware, 10);

export const store = configureStore({
  reducer: {
    // Domain-specific API Slices (각각 독립적인 reducerPath)
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [postsApiSlice.reducerPath]: postsApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,

    // Feature-based slices for client state
    auth: authReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
  },

  // 미들웨어 설정 (Registry 사용)
  middleware: (getDefaultMiddleware) => {
    // Core middleware with optimizations
    const coreMiddleware = getDefaultMiddleware({
      // 직렬화 체크 최적화
      serializableCheck: {
        // 모든 RTK Query 내부 액션 무시 (자동 생성됨)
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'] as string[],
        ignoredPaths: ['usersApi', 'postsApi', 'authApi'],
        // warnAfter: 128, // milliseconds
      },

      // Immutable 체크: 개발 모드에서만 실행
      immutableCheck: process.env.NODE_ENV === 'development'
        ? {
            // RTK Query 캐시 무시
            ignoredPaths: ['usersApi', 'postsApi', 'authApi'],
          }
        : false,
    });

    // Registry에서 등록된 미들웨어 합체
    // RTK-Query API middleware를 포함해야 함
    const registryMiddleware = middlewareRegistry.getAll();

    return coreMiddleware
      .concat(usersApiSlice.middleware)  // usersApi middleware 추가
      .concat(postsApiSlice.middleware)  // postsApi middleware 추가
      .concat(authApiSlice.middleware)   // authApi middleware 추가
      .concat(...registryMiddleware);    // 그 외 등록된 미들웨어
  },

  // DevTools 설정
  devTools: process.env.NODE_ENV === 'development'
    ? {
        // DevTools의 액션 추적 기능 확장
        trace: true,
        traceLimit: 25,

        // 액션 이름을 더 읽기 쉽게 변환
        actionSanitizer: (action) => {
          // Users API 액션
          if (action.type.startsWith('usersApi/')) {
            return {
              ...action,
              type: action.type
                .replace('usersApi/', '[Users] ')
                .replace('/execute', '')
                .replace('/pending', '⏳')
                .replace('/fulfilled', '✅')
                .replace('/rejected', '❌'),
            };
          }
          // Posts API 액션
          if (action.type.startsWith('postsApi/')) {
            return {
              ...action,
              type: action.type
                .replace('postsApi/', '[Posts] ')
                .replace('/execute', '')
                .replace('/pending', '⏳')
                .replace('/fulfilled', '✅')
                .replace('/rejected', '❌'),
            };
          }
          // Auth API 액션
          if (action.type.startsWith('authApi/')) {
            return {
              ...action,
              type: action.type
                .replace('authApi/', '[Auth] ')
                .replace('/execute', '')
                .replace('/pending', '⏳')
                .replace('/fulfilled', '✅')
                .replace('/rejected', '❌'),
            };
          }
          return action;
        },

        // 상태를 더 읽기 쉽게 변환
        stateSanitizer: (state) => {
          const sanitized = { ...state } as Record<string, unknown>;
          // 불필요한 RTK Query 내부 상태 제거
          ['usersApi', 'postsApi', 'authApi'].forEach((api) => {
            const apiState = sanitized[api] as Record<string, unknown> | undefined;
            if (apiState?.subscriptions) {
              delete apiState.subscriptions;
            }
          });
          return sanitized as typeof state;
        },
      }
    : false, // 프로덕션에서는 비활성화
});

// Registry 잠금 (store 초기화 후 추가 등록 방지)
middlewareRegistry.lock();

// ============================================================================
// RTK QUERY SETUP LISTENERS
// ============================================================================

/**
 * RTK Query의 자동 리패칭 활성화
 * - refetchOnFocus: 윈도우 포커스 시 리패치
 * - refetchOnReconnect: 네트워크 재연결 시 리패치
 */
setupListeners(store.dispatch);

// ============================================================================
// DEVTOOLS ENHANCEMENTS (개발 모드 전용)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  // 등록된 미들웨어 정보 출력
  middlewareRegistry.printInfo();

  // 스토어 변경 감시 및 로깅
  store.subscribe(() => {
    const state = store.getState();

    // API 요청 상태 모니터링
    const apiStates = ['usersApi', 'postsApi', 'authApi'] as const;
    let totalPending = 0;

    apiStates.forEach((apiName) => {
      const apiState = (state as Record<string, unknown>)[apiName] as Record<string, unknown> | undefined;
      if (apiState?.queries) {
        const queries = apiState.queries as Record<string, { status: string }>;
        const pendingRequests = Object.values(queries)
          .filter((query) => query.status === 'pending')
          .length;
        totalPending += pendingRequests;
      }
    });

    if (totalPending > 0) {
      const apiLogger = log.getLogger('API');
      apiLogger.debug(`SYSTEM: ${totalPending} pending requests`);
    }
  });
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ============================================================================
// HOOKS EXPORT
// ============================================================================

export { useAppDispatch, useAppSelector } from './hooks';
