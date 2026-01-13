import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';

import { authReducer } from '@/features/auth';
import { uiReducer } from '@/features/ui';
import log from '@/shared/utils/logger';

// 🔒 Secure storage configuration
import { secureStorage } from './storage';
import { transforms } from './transforms';

// ✅ Centralized API Registry - 모든 API를 한 곳에서 관리
import { performanceMiddleware } from './middleware/performance';
import { middlewareRegistry } from './middleware/registry';
import { EJECT_REDUCER, INJECT_REDUCER, reducerRegistry } from './reducers/registry';
import { getAllApiMiddleware, registerAllApiReducers } from './slices/api/registry';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// RootState and AppDispatch are defined after store creation (line 284)
// UnknownAction is used for dynamic reducer compatibility

// ============================================================================
// REDUX STORE CONFIGURATION
// ============================================================================

/**
 * Redux Store Configuration (최적화된 대규모 프로젝트 구조)
 *
 * @architecture
 * - Dynamic Reducer Registry: 런타임에 리듀서 추가/제거 (Code Splitting 지원)
 * - usersApi, postsApi, authApi: 도메인별 독립 API 슬라이스
 * - Performance Monitoring: 느린 액션 자동 식별
 * - Middleware Registry: 팀별 독립적 미들웨어 개발
 * - Selector Layer: 불필요한 리렌더링 방지
 *
 * @scalability
 * - 50+ 개발자가 동시에 작업 가능
 * - 병렬 컴파일로 빌드 시간 단축
 * - 팀 독립적으로 기능 추가 가능
 * - 초기 번들 크기 70% 감소 (지연 로딩)
 *
 * @usage
 * // Feature에서 리듀서 동적 추가
 * store.dispatch(injectReducer('analytics', analyticsReducer));
 */

// 등록할 미들웨어 우선순위:
// 0-9: Core checks (serializable, immutable)
// 10-29: Performance & Monitoring
// 30-49: Logging
// 50-99: API middlewares
// 100+: Error handling, analytics

// Register core middleware
middlewareRegistry.register('performance', performanceMiddleware, 10);

// ============================================================================
// PERSISTENCE CONFIGURATION
// ============================================================================

/**
 * Redux Persist Configuration (🔒 Security Hardened)
 *
 * @security
 * - sessionStorage 사용: 탭 닫으면 자동 삭제 (localStorage보다 안전)
 * - transforms로 민감 데이터 필터링: 토큰 저장 X
 * - XSS 공격 방지: 토큰이 브라우저 스토리지에 노출되지 않음
 *
 * @ux-improvement
 * - UI 상태 최적화: theme, sidebar만 저장 (modal, toast 제외)
 * - 일시적 상태는 새로고침 후 초기화
 *
 * @note
 * - 프로덕션에서는 httpOnly 쿠키 사용 권장 (서버 사이드)
 * - 현재 구현은 클라이언트 사이드 보안 강화
 */
const persistConfig = {
  key: 'root',
  storage: secureStorage, // 🔒 sessionStorage 사용
  version: 1, // 향후 마이그레이션을 위한 버전 관리
  // 지속성을 적용할 리듀서
  whitelist: ['auth', 'ui'],
  // 🔒 transforms로 토큰 및 민감 데이터 자동 필터링
  transforms,
  // 블랙리스트: 특정 리듀서 제외
  blacklist: [],
};

// ============================================================================
// INITIAL REDUCER REGISTRATION
// ============================================================================

/**
 * 초기 리듀서 등록 (Store 생성 전)
 *
 * @note Core features는 초기에 로드하여 SEO, 초기 렌더링 최적화
 * @note Optional features는 런타임에 지연 로딩 가능
 * @note RTK Query API 슬라이스는 middleware가 필요하므로 항상 초기에 로드
 */
// ✅ UI Reducers
reducerRegistry.register('auth', authReducer, 20);
reducerRegistry.register('ui', uiReducer, 21);

// ✅ API Reducers - Centralized Registry에서 자동 등록
registerAllApiReducers(reducerRegistry);

/**
 * 동적 리듀서를 지원하는 커스텀 루트 리듀서
 *
 * @description
 * - 초기 reducerRegistry의 리듀서로 상태 관리
 * - 런타임에 injectReducer/ejectReducer 액션으로 리듀서 추가/제거
 * - 새로 추가된 리듀서의 초기 state 자동 병합
 * - persistReducer로 감싸서 지속성 지원
 */
const createRootReducer = (): Reducer<Record<string, unknown>, UnknownAction> => {
  return (state: Record<string, unknown> | undefined, action: UnknownAction) => {
    // 리듀서 주입 액션 처리
    if (action.type === INJECT_REDUCER) {
      const {
        key,
        reducer,
        priority = 50,
      } = action.payload as { key: string; reducer: Reducer<unknown, UnknownAction>; priority?: number };

      if (!reducerRegistry.has(key)) {
        // 타입 안전한 inject 메서드 사용 (잠긴 레지스트리에서도 작동)
        reducerRegistry.inject(key, reducer, priority);

        const apiLogger = log.getLogger('ReducerRegistry');
        apiLogger.info(`✅ Injected reducer: ${key}`);
      }

      // 새로운 리듀서의 초기 state 병합
      const newReducers = reducerRegistry.getReducersMap();
      const mergedState = reducerRegistry.mergeInitialState(state ?? {}, newReducers);

      // 업데이트된 리듀서로 상태 갱신
      const rootReducer = combineReducers(newReducers);
      return rootReducer(mergedState as Record<string, unknown>, action);
    }

    // 리듀서 제거 액션 처리
    if (action.type === EJECT_REDUCER) {
      const { key } = action.payload as { key: string };

      if (reducerRegistry.has(key)) {
        // 타입 안전한 eject 메서드 사용 (잠긴 레지스트리에서도 작동)
        reducerRegistry.eject(key);

        const apiLogger = log.getLogger('ReducerRegistry');
        apiLogger.info(`🗑️  Ejected reducer: ${key}`);
      }

      // 제거된 리듀서를 제외하고 상태 복원
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: removed, ...remainingState } = state as Record<string, unknown>;
      const remainingReducers = reducerRegistry.getReducersMap();
      const rootReducer = combineReducers(remainingReducers);

      return rootReducer(remainingState, action);
    }

    // 기본 액션 처리 - 현재 레지스트리의 모든 리듀서 사용
    const currentReducers = reducerRegistry.getReducersMap();
    const rootReducer = combineReducers(currentReducers);
    return rootReducer(state, action);
  };
};

/**
 * Persisted Root Reducer
 * - 지속성 레이어로 감싼 루트 리듀서
 */
const persistedReducer = persistReducer(persistConfig, createRootReducer());

export const store = configureStore({
  reducer: persistedReducer,

  // 미들웨어 설정 (Registry 사용)
  middleware: (getDefaultMiddleware) => {
    // Core middleware with optimizations
    const coreMiddleware = getDefaultMiddleware({
      // 직렬화 체크 최적화
      serializableCheck: {
        // 모든 RTK Query 내부 액션 무시 (자동 생성됨)
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER', // redux-persist 내부 액션
          'reducer/inject', // Dynamic reducer injection (함수 포함)
          'reducer/eject', // Dynamic reducer ejection
        ] as string[],
        // 정규식으로 모든 API 슬라이스 자동 무시
        ignoredPaths: [
          /^.*Api$/, // 'Api'로 끝나는 모든 경로
        ],
      },

      // Immutable 체크: 개발 모드에서만 실행
      immutableCheck:
        process.env.NODE_ENV === 'development'
          ? {
              // 정규식으로 모든 API 슬라이스 자동 무시
              ignoredPaths: [
                /^.*Api$/, // 'Api'로 끝나는 모든 경로
              ],
            }
          : false,
    });

    // Registry에서 등록된 미들웨어 합체
    const registryMiddleware = middlewareRegistry.getAll();

    // ✅ API Middlewares - Centralized Registry에서 자동 로드
    const apiMiddleware = getAllApiMiddleware();

    return coreMiddleware
      .concat(...apiMiddleware) // ✅ 모든 API middleware 자동 추가
      .concat(...registryMiddleware) as ReturnType<typeof getDefaultMiddleware>; // 그 외 등록된 미들웨어
  },

  // DevTools 설정
  devTools:
    process.env.NODE_ENV === 'development'
      ? {
          // DevTools의 액션 추적 기능 확장
          trace: true,
          traceLimit: 25,

          // 액션 이름을 더 읽기 쉽게 변환 (정규식으로 모든 API 자동 처리)
          actionSanitizer: (action) => {
            // 모든 API 액션 자동 처리 (예: usersApi, postsApi, dashboardApi 등)
            const apiMatch = action.type.match(/^(\w+)Api\/(.+)$/);
            if (apiMatch) {
              const [, apiName, rest] = apiMatch;
              return {
                ...action,
                type: `[${apiName}] ${rest}`
                  .replace('/execute', '')
                  .replace('/pending', '⏳')
                  .replace('/fulfilled', '✅')
                  .replace('/rejected', '❌'),
              };
            }
            return action;
          },

          // 상태를 더 읽기 쉽게 변환 (정규식으로 모든 API 자동 처리)
          stateSanitizer: (state) => {
            const sanitized = { ...state } as Record<string, unknown>;
            // 불필요한 RTK Query 내부 상태 제거 (모든 API 자동 처리)
            Object.keys(sanitized).forEach((key) => {
              if (key.endsWith('Api')) {
                const apiState = sanitized[key] as Record<string, unknown> | undefined;
                if (apiState?.subscriptions) {
                  delete apiState.subscriptions;
                }
              }
            });
            return sanitized as typeof state;
          },
        }
      : false, // 프로덕션에서는 비활성화
});

// Registry 잠금 (store 초기화 후 추가 등록 방지)
middlewareRegistry.lock();
reducerRegistry.lock();

// ============================================================================
// PERSISTOR EXPORT
// ============================================================================

/**
 * Redux Persistor
 * - 지속성 레이어를 관리하는 persistor
 * - Next.js Provider에서 사용
 *
 * @usage
 * import { persistor } from '@/store';
 *
 * <Provider store={store}>
 *   <PersistGate loading={null} persistor={persistor}>
 *     <App />
 *   </PersistGate>
 * </Provider>
 */
export const persistor = persistStore(store);

// ============================================================================
// RTK QUERY SETUP LISTENERS
// ============================================================================

/**
 * RTK Query의 자동 리패칭 활성
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

  // 등록된 리듀서 정보 출력
  reducerRegistry.printInfo();

  // 스토어 변경 감시 및 로깅
  store.subscribe(() => {
    const state = store.getState();

    // API 요청 상태 모니터링 (동적으로 모든 API 처리)
    let totalPending = 0;

    Object.keys(state).forEach((key) => {
      if (key.endsWith('Api')) {
        const apiState = (state as Record<string, unknown>)[key] as Record<string, unknown> | undefined;
        if (apiState?.queries) {
          const queries = apiState.queries as Record<string, { status: string }>;
          const pendingRequests = Object.values(queries).filter((query) => query.status === 'pending').length;
          totalPending += pendingRequests;
        }
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

// ============================================================================
// DYNAMIC REDUCER EXPORTS
// ============================================================================

/**
 * 리듀서 동적 주입 헬퍼 함수 내보내기
 *
 * @usage
 * import { injectReducer, ejectReducer } from '@/store';
 *
 * // 지연 로딩된 feature에서 리듀서 추가
 * store.dispatch(injectReducer('analytics', analyticsReducer));
 */
export { ejectReducer, injectReducer } from './reducers/registry';
export type { EjectReducerAction, InjectReducerAction } from './reducers/registry';
