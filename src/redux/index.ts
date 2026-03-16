/**
 * Redux Store 진입점
 *
 * @description
 * 애플리케이션의 중앙 집중식 스토어 설정
 *
 * @architecture
 * - 동적 리듀서 레지스트리: 런타임에 리듀서 추가/제거 (코드 분할 지원)
 * - RTK Query API: 도메인별 독립 API 슬라이스
 * - 성능 모니터링: 느린 액션 자동 식별
 * - 선택자 레이어: 불필요한 리렌더링 방지
 *
 * @scalability
 * - 50+ 명의 개발자가 동시에 작업 가능
 * - 병렬 컴파일로 빌드 시간 단축
 * - 팀별 독립적으로 기능 추가 가능
 * - 초기 번들 크기 70% 감소 (지연 로딩)
 *
 * @usage
 * // Feature에서 리듀서 동적 추가
 * store.dispatch(injectReducer('analytics', analyticsReducer));
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

import type { DashboardState } from '@/features/dashboard/types/storeTypes';
import type { ProductsUIState } from '@/features/products/types/storeTypes';
import type { PopupState } from '@/shared/store/popupSlice';
import type { SpinnerState } from '@/shared/store/spinnerSlice';
import type { AuthState } from '@/shared/types/authTypes';
import { globalRegistry, REGISTRY_KEYS } from '@/shared/utils/globalRegistry';
import log from '@/shared/utils/logger';

import { configureMiddleware, devToolsConfig } from './config';

// 타입 임포트

// ============================================================================
// 스토어 생성
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
// 지속성 관리자
// ============================================================================

/**
 * Redux 지속성 관리자
 * - 지속성 레이어를 관리하는 persistor
 * - Next.js Provider에서 사용
 *
 * @usage
 * import { persistor } from '@/redux';
 *
 * <Provider store={store}>
 *   <PersistGate loading={null} persistor={persistor}>
 *     <App />
 *   </PersistGate>
 * </Provider>
 */
export const persistor = persistStore(store);

// ============================================================================
// RTK Query 설정
// ============================================================================

/**
 * RTK Query의 자동 리패칭 활성화
 * - refetchOnFocus: 윈도우 포커스 시 리패치
 * - refetchOnReconnect: 네트워크 재연결 시 리패치
 */
setupListeners(store.dispatch);

// ============================================================================
// 레지스트리 잠금
// ============================================================================

/**
 * 스토어 초기화 후 레지스트리 잠금
 * - 의도치 않은 수정 방지
 * - 런타임 주입은 여전히 액션으로 가능
 */
import { middlewareRegistry } from './registry/middleware';
import { reducerRegistry } from './registry/reducer';
import { createPersistedReducer, getApiMiddleware } from './setup';

// 레지스트리 잠금
if (middlewareRegistry?.lock) middlewareRegistry.lock();
if (reducerRegistry?.lock) reducerRegistry.lock();

// ============================================================================
// 개발 모드
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
      apiLogger.debug(`SYSTEM: ${totalPending} 개의 보류 중인 요청`);
    }
  });
}

// ============================================================================
// 타입 내보내기
// ============================================================================

/**
 * Redux 상태 타입
 *
 * @description
 * 타입 안전한 Redux 스토어 접근
 *
 * @note
 * RootState는 PersistPartial 타입 문제를 피해 수동으로 타이핑
 * 새로운 reducer 추가 시 여기에 타입을 추가해야 함
 *
 * @example
 * // 새 feature 추가 시:
 * // 1. 파일 상단에 타입 임포트 추가:
 * // import type { NewFeatureState } from '@/features/newFeature/types/storeTypes';
 *
 * // 2. RootState 타입에 필드 추가:
 * export type RootState = {
 *   // ...기존 타입들
 *   newFeature: NewFeatureState;
 * };
 */
export type RootState = {
  auth: AuthState;
  popup: PopupState;
  spinner: SpinnerState;
  dashboard: DashboardState;
  products: ProductsUIState;
};

export type AppDispatch = typeof store.dispatch;

// ============================================================================
// 훅 내보내기
// ============================================================================

/**
 * 타입드 Redux 훅
 *
 * @description
 * 원시 useDispatch와 useSelector 대신 이 훅 사용
 *
 * @example
 * import { useAppDispatch, useAppSelector } from '@/redux';
 *
 * const dispatch = useAppDispatch();
 * const user = useAppSelector((state) => state.auth.user);
 */
export { useAppDispatch, useAppSelector } from './hooks';

// ============================================================================
// 동적 리듀서 내보내기
// ============================================================================

/**
 * 동적 리듀서 헬퍼
 *
 * @description
 * 코드 분할을 위해 런타임에 리듀서 주입/제거
 *
 * @example
 * import { injectReducer, ejectReducer } from '@/redux';
 *
 * // 지연 로딩된 리듀서 주입
 * store.dispatch(injectReducer('analytics', analyticsReducer));
 */
export { ejectReducer, injectReducer } from './registry/reducer';
export type { EjectReducerAction, InjectReducerAction } from './registry/reducer';

// 전역 스코프 레지스트리에 저장
// 목적
// 1. 직접 store 접근(비 react적 사용 or vanillajs)
// 2. 순환 참조 방지 (ex. asxiosBaseQuery --> popupUtils --> redux --> ... -> axiosBaseQuery)
globalRegistry.set(REGISTRY_KEYS.STORE, store);
