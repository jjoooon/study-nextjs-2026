import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux';

import type { SpinnerState } from './spinnerSlice';

// ============================================================================
// SPINNER SELECTORS
// ============================================================================

/**
 * Spinner domain의 모든 selector
 *
 * @description
 * 전역 spinner 상태에 대한 selector
 * - isVisible: spinner 표시 여부
 * - message: spinner 메시지
 * - count: 활성화된 요청 수
 * - globalManual: 전역 수동 모드 활성화 여부
 */

// ============================================================================
// BASE SELECTORS
// ============================================================================

/**
 * Spinner State 선택자
 */
export const selectSpinnerState = (state: RootState): SpinnerState => state.spinner;

/**
 * Spinner 표시 여부 선택자
 */
export const selectIsSpinnerVisible = createSelector([selectSpinnerState], (spinner) => spinner.isVisible);

/**
 * Spinner 메시지 선택자
 */
export const selectSpinnerMessage = createSelector([selectSpinnerState], (spinner) => spinner.message);

/**
 * Spinner 카운트 선택자
 */
export const selectSpinnerCount = createSelector([selectSpinnerState], (spinner) => spinner.count);

/**
 * 전역 수동 모드 활성화 여부 선택자
 */
export const selectIsGlobalManual = createSelector([selectSpinnerState], (spinner) => spinner.globalManual);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * Spinner 상태 요약
 */
export const selectSpinnerStatus = createSelector(
  [selectIsSpinnerVisible, selectSpinnerMessage, selectSpinnerCount, selectIsGlobalManual],
  (isVisible, message, count, globalManual) => ({
    isVisible,
    message,
    count,
    globalManual,
  })
);
