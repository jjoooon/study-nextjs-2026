/**
 * UI Selectors
 *
 * UI 개인화 상태 선택자 함수들
 *
 * @description
 * - 타입 안전한 상태 접근
 * - 메모이제이션된 선택자 (성능 최적화)
 * - 재사용 가능한 선택자 함수
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/redux';
import type { UIState } from '../types/uiTypes';

// ============================================================================
// BASIC SELECTORS
// ============================================================================

/**
 * UI 상태 선택자
 */
export const selectUIState = (state: RootState): UIState => state.ui as UIState;

/**
 * Zoom 배율 선택자
 */
export const selectZoom = (state: RootState): number => (state.ui as UIState).zoom;

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * Zoom 퍼센트 선택자
 *
 * @example
 * const zoomPercent = useAppSelector(selectZoomPercent);
 * // zoom: 1.0 → 100%
 * // zoom: 1.5 → 150%
 */
export const selectZoomPercent = createSelector([selectZoom], (zoom: number): number => {
  return Math.round(zoom * 100);
});

/**
 * Zoom CSS 값 선택자
 *
 * @example
 * const zoomValue = useAppSelector(selectZoomValue);
 * // <div style={{ transform: `scale(${zoomValue})` }}>
 */
export const selectZoomValue = createSelector([selectZoom], (zoom: number): number => {
  return zoom;
});

/**
 * Zoom 상태 정보 선택자
 *
 * @example
 * const zoomInfo = useAppSelector(selectZoomInfo);
 * // { current: 1.2, min: 0.5, max: 2.0, percent: 120, canZoomIn: true, canZoomOut: true }
 */
export const selectZoomInfo = createSelector([selectZoom], (zoom: number) => {
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 2.0;

  return {
    current: zoom,
    min: ZOOM_MIN,
    max: ZOOM_MAX,
    percent: Math.round(zoom * 100),
    canZoomIn: zoom < ZOOM_MAX,
    canZoomOut: zoom > ZOOM_MIN,
  };
});
