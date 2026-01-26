import { RootState } from '@/redux';
import type { PopupInstance } from './popupSlice';

// ============================================================================
// SELECTORS
// ============================================================================

/**
 * 모든 팝업 목록 선택
 */
export const selectAllPopups = (state: RootState): PopupInstance[] => state.popup.popups;

/**
 * 열린 팝업 개수 선택
 */
export const selectPopupCount = (state: RootState): number => state.popup.popups.length;

/**
 * 특정 ID의 팝업 선택
 */
export const selectPopupById = (state: RootState, popupId: string): PopupInstance | undefined =>
  state.popup.popups.find((popup) => popup.id === popupId);

/**
 * 최상위 팝업 선택 (가장 최근에 열린 팝업)
 */
export const selectTopPopup = (state: RootState): PopupInstance | undefined => {
  const popups = state.popup.popups;
  return popups.length > 0 ? popups[popups.length - 1] : undefined;
};

/**
 * 특정 타입의 팝업들만 선택
 */
export const selectPopupsByType = (state: RootState, popupType: string): PopupInstance[] =>
  state.popup.popups.filter((popup) => popup.popupType === popupType);

/**
 * 팝업이 열려있는지 확인
 */
export const selectHasOpenPopups = (state: RootState): boolean => state.popup.popups.length > 0;

/**
 * 특정 타입의 팝업이 열려있는지 확인
 */
export const selectHasPopupType = (state: RootState, popupType: string): boolean =>
  state.popup.popups.some((popup) => popup.popupType === popupType);
