/**
 * UI Slice
 *
 * 사용자 개인화 UI 상태 관리를 위한 Redux Slice
 *
 * @description
 * - 확대/축소 배율 관리
 * - localStorage에 자동 저장 (Redux Persist)
 * - 재접속 시 상태 자동 복원
 *
 * @features
 * - 타입 안전한 상태 관리
 * - Redux Persist 통합 (localStorage 지속성)
 * - 확장 가능한 구조
 */

import { createSlice } from '@reduxjs/toolkit';
import { local } from '@/shared/utils/storageUtils';
import type { UIState } from '../types/uiTypes';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Storage 키
 */
const STORAGE_KEY = {
  UI_SETTINGS: 'ui-settings',
} as const;

/**
 * Zoom 배율 범위
 */
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2.0;
const ZOOM_DEFAULT = 1.0;
const ZOOM_STEP = 0.1;

// ============================================================================
// INITIAL STATE
// ============================================================================

/**
 * 초기 상태
 * - localStorage에서 복원된 값이 없으면 기본값 사용
 */
const getInitialState = (): UIState => {
  const saved = local.get<{ zoom: number }>(STORAGE_KEY.UI_SETTINGS);
  if (saved?.zoom !== undefined) {
    return {
      zoom: validateZoom(saved.zoom),
    };
  }

  return {
    zoom: ZOOM_DEFAULT,
  };
};

/**
 * Zoom 배율 유효성 검증
 */
const validateZoom = (value: number): number => {
  const num = typeof value === 'number' ? value : ZOOM_DEFAULT;
  return Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, num));
};

/**
 * 초기 상태
 */
const initialState: UIState = getInitialState();

// ============================================================================
// SLICE
// ============================================================================

/**
 * UI Slice
 *
 * 사용자 개인화 UI 상태를 관리하는 Redux Slice
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Zoom 배율 설정
     *
     * 페이지 전체의 확대/축소 배율을 설정합니다.
     * 자동으로 localStorage에 저장됩니다.
     */
    setZoom: (state, action: { payload: number }) => {
      state.zoom = validateZoom(action.payload);
      local.set(STORAGE_KEY.UI_SETTINGS, { zoom: state.zoom });
    },

    /**
     * Zoom 배율 증가
     *
     * 현재 배율에서 ZOOM_STEP만큼 증가시킵니다.
     */
    zoomIn: (state) => {
      const newZoom = Math.min(ZOOM_MAX, state.zoom + ZOOM_STEP);
      state.zoom = newZoom;
      local.set(STORAGE_KEY.UI_SETTINGS, { zoom: state.zoom });
    },

    /**
     * Zoom 배율 감소
     *
     * 현재 배율에서 ZOOM_STEP만큼 감소시킵니다.
     */
    zoomOut: (state) => {
      const newZoom = Math.max(ZOOM_MIN, state.zoom - ZOOM_STEP);
      state.zoom = newZoom;
      local.set(STORAGE_KEY.UI_SETTINGS, { zoom: state.zoom });
    },

    /**
     * Zoom 배율 초기화
     *
     * 기본 배율(1.0)로 되돌립니다.
     */
    resetZoom: (state) => {
      state.zoom = ZOOM_DEFAULT;
      local.set(STORAGE_KEY.UI_SETTINGS, { zoom: state.zoom });
    },
  },
});

// ============================================================================
// ACTIONS & REDUCER
// ============================================================================

export const { setZoom, zoomIn, zoomOut, resetZoom } = uiSlice.actions;
export default uiSlice.reducer;

// 상수 export (선택자에서 사용)
export { ZOOM_MIN, ZOOM_MAX, ZOOM_DEFAULT, ZOOM_STEP };

// 타입 export (선택자에서 사용)
export type { UIState } from '../types/uiTypes';
