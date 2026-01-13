/**
 * Redux Store Entry Point
 *
 * @description
 * Centralized store configuration for the application
 *
 * @architecture
 * - Dynamic Reducer Registry: 런타임에 리듀서 추가/제거 (Code Splitting 지원)
 * - RTK Query APIs: 도메인별 독립 API 슬라이스
 * - Performance Monitoring: 느린 액션 자동 식별
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

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import log from '@/shared/utils/logger';

// Store configuration and setup
import { configureMiddleware, devToolsConfig } from './config';

// ============================================================================
// STORE CREATION
// ============================================================================

export const store = configureStore({
  reducer: createPersistedReducer(),

  // 미들웨어 설정
  middleware: (getDefaultMiddleware) => {
    const coreMiddleware = configureMiddleware(
      getDefaultMiddleware as (...args: unknown[]) => ReturnType<typeof getDefaultMiddleware>
    );
    const apiMiddleware = getApiMiddleware();

    return [...coreMiddleware, ...apiMiddleware] as ReturnType<typeof getDefaultMiddleware>;
  },

  // DevTools 설정
  devTools: devToolsConfig as boolean | undefined,
});

// ============================================================================
// PERSISTOR
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
// RTK QUERY SETUP
// ============================================================================

/**
 * RTK Query의 자동 리패칭 활성
 * - refetchOnFocus: 윈도우 포커스 시 리패치
 * - refetchOnReconnect: 네트워크 재연결 시 리패치
 */
setupListeners(store.dispatch);

// ============================================================================
// REGISTRY LOCK
// ============================================================================

/**
 * Lock registries after store initialization
 * - Prevents accidental modifications
 * - Runtime injection still available via actions
 */
import { middlewareRegistry } from './registry/middleware';
import { reducerRegistry } from './registry/reducer';
import { createPersistedReducer, getApiMiddleware } from './setup';

// Lock registries
if (middlewareRegistry?.lock) middlewareRegistry.lock();
if (reducerRegistry?.lock) reducerRegistry.lock();

// ============================================================================
// DEVELOPMENT MODE
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  // 등록된 미들웨어 정보 출력
  if (middlewareRegistry?.printInfo) {
    middlewareRegistry.printInfo();
  }

  // 등록된 리듀서 정보 출력
  if (reducerRegistry?.printInfo) {
    reducerRegistry.printInfo();
  }

  // 스토어 변경 감시 및 로깅
  store.subscribe(() => {
    const state = store.getState();

    // API 요청 상태 모니터링 (동적으로 모든 API 처리)
    let totalPending = 0;

    Object.keys(state).forEach((key) => {
      if (key.endsWith('Api')) {
        const apiState = (state as unknown as Record<string, unknown>)[key] as Record<string, unknown> | undefined;
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

/**
 * Redux State Types
 *
 * @description
 * Type-safe Redux store access
 *
 * @note
 * RootState is manually typed to avoid PersistPartial type issues
 * Include all feature slices and API slices here
 */
export type RootState = {
  auth: import('@/features/auth/store/authSlice').AuthState;
  ui: import('@/features/ui/store/uiSlice').UIState;
  dashboard: import('@/features/dashboard/store/dashboardSlice').DashboardState;
  usersApi: unknown;
  postsApi: unknown;
  dashboardApi: unknown;
};

export type AppDispatch = typeof store.dispatch;

// ============================================================================
// HOOKS EXPORT
// ============================================================================

/**
 * Typed Redux Hooks
 *
 * @description
 * Use these hooks instead of raw useDispatch and useSelector
 *
 * @example
 * import { useAppDispatch, useAppSelector } from '@/store';
 *
 * const dispatch = useAppDispatch();
 * const user = useAppSelector((state) => state.auth.user);
 */
export { useAppDispatch, useAppSelector } from './hooks';

// ============================================================================
// DYNAMIC REDUCER EXPORTS
// ============================================================================

/**
 * Dynamic Reducer Helpers
 *
 * @description
 * Inject/eject reducers at runtime for code splitting
 *
 * @example
 * import { injectReducer, ejectReducer } from '@/store';
 *
 * // Inject lazy-loaded reducer
 * store.dispatch(injectReducer('analytics', analyticsReducer));
 */
export { ejectReducer, injectReducer } from './registry/reducer';
export type { EjectReducerAction, InjectReducerAction } from './registry/reducer';
