/**
 * Redux Store Setup
 *
 * @description
 * Reducer registration and root reducer creation
 *
 * @architecture
 * - Dynamic reducer support
 * - Initial reducer registration
 * - API reducer auto-registration
 */

import { combineReducers, Reducer } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import authReducer from '@/shared/store/authSlice';
import popupReducer from '@/shared/store/popupSlice';
import spinnerReducer from '@/shared/store/spinnerSlice';
import log from '@/shared/utils/logger';

import { getAllApiMiddleware, registerAllApiReducers } from './api/registry';
import { persistConfig } from './config';
import { EJECT_REDUCER, INJECT_REDUCER, reducerRegistry } from './registry/reducer';

// ============================================================================
// INITIAL REDUCER REGISTRATION
// ============================================================================

/**
 * 초기 리듀서 등록 (Store 생성 전)
 *
 * @note Core features (auth)는 초기에 로드하여 SEO, 초기 렌더링 최적화
 * @note Optional features (dashboard, products)는 런타임에 지연 로딩
 * @note RTK Query API 슬라이스는 middleware가 필요하므로 항상 초기에 로드
 */
export const initializeReducers = () => {
  // ✅ Core UI Reducers - 항상 초기 로드
  reducerRegistry.register('auth', authReducer, 20);

  // ✅ Popup System - 항상 초기 로드 (전역 팝업 관리)
  reducerRegistry.register('popup', popupReducer, 25);

  // ✅ Spinner - 항상 초기 로드 (전역 로딩 상태 관리)
  reducerRegistry.register('spinner', spinnerReducer, 26);

  // ⚠️ Optional UI Reducers - 페이지에서 지연 로딩
  // dashboard, products는 각 페이지에서 useInjectReducer로 주입

  // ✅ API Reducers - 중앙 집중식 레지스트리에서 자동 등록
  registerAllApiReducers(reducerRegistry);
};

// 리듀서 즉시 초기화
initializeReducers();

/**
 * Get API middleware array
 *
 * @returns Array of API middleware (priority-sorted)
 */
export const getApiMiddleware = () => {
  return getAllApiMiddleware();
};

// ============================================================================
// DYNAMIC ROOT REDUCER
// ============================================================================

const logger = log.getLogger('ReducerRegistry');

/**
 * 동적 리듀서를 지원하는 커스텀 루트 리듀서
 *
 * @description
 * - 초기 reducerRegistry의 리듀서로 상태 관리
 * - 런타임에 injectReducer/ejectReducer 액션으로 리듀서 추가/제거
 * - 새로 추가된 리듀서의 초기 state 자동 병합
 * - persistReducer로 감싸서 지속성 지원
 */
export const createRootReducer = (): Reducer<Record<string, unknown>, UnknownAction> => {
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

        logger.info(`✅ Injected reducer: ${key}`);
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

        logger.info(`🗑️  Ejected reducer: ${key}`);
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
 *
 * @note
 * - persist/REHYDRATE 액션은 serializableCheck에서 이미 무시됨
 */
export const createPersistedReducer = () => {
  return persistReducer(
    persistConfig as unknown as Parameters<typeof persistReducer>[0],
    createRootReducer() as Parameters<typeof persistReducer>[1]
  );
};
