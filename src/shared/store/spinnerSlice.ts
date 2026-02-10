/**
 * Global Spinner Slice
 *
 * @description
 * 전역 spinner 상태 관리를 위한 Redux Slice
 * - Axios interceptor와 연동하여 API 요청 시 자동 표시
 * - 특정 요청에 대해서만 spinner 표시 가능
 * - 수동 제어를 위한 hook 제공
 *
 * @features
 * - 요청 카운트 기반 중첩 요청 처리
 * - 메시지 및 옵션 커스터마이징
 * - 타입 안전한 상태 관리
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Spinner 옵션
 */
export interface SpinnerOptions {
  /** 표시할 메시지 (선택) */
  message?: string;
  /** 최소 표시 시간 (ms) - 너무 빠른 요청의 경우 깜빡임 방지 */
  minDuration?: number;
  /** spinner를 표시할지 여부를 결정하는 키 */
  showSpinner?: boolean;
}

/**
 * Spinner 상태
 */
interface SpinnerState {
  /** 현재 표시 중인 spinner 수 */
  count: number;
  /** spinner 표시 여부 */
  isVisible: boolean;
  /** 현재 메시지 */
  message: string | null;
  /** spinner 시작 시간 */
  startTime: number | null;
  /** 최소 표시 시간 */
  minDuration: number;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: SpinnerState = {
  count: 0,
  isVisible: false,
  message: null,
  startTime: null,
  minDuration: 300, // 기본 300ms: 100ms 미만은 깜빡임, 500ms 이상은 지연감
};

// ============================================================================
// SLICE
// ============================================================================

/**
 * Global Spinner Slice
 */
const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    /**
     * Spinner 표시 시작
     */
    showSpinner: (state, action: PayloadAction<SpinnerOptions>) => {
      state.count += 1;

      // 최초 요청인 경우에만 상태 업데이트
      if (state.count === 1) {
        state.isVisible = true;
        state.message = action.payload.message ?? null;
        state.minDuration = action.payload.minDuration ?? 300;
        state.startTime = Date.now();
      }
    },

    /**
     * Spinner 숨김
     */
    hideSpinner: (state) => {
      if (state.count > 0) {
        state.count -= 1;
      }

      // 모든 요청이 완료된 경우에만 숨김
      if (state.count === 0) {
        state.isVisible = false;
        state.message = null;
        state.startTime = null;
      }
    },

    /**
     * Spinner 상태 강제 초기화
     * - 에러 발생 등异常 상황에서 사용
     */
    resetSpinner: () => initialState,

    /**
     * 메시지 업데이트
     * - spinner가 표시 중인 경우 메시지만 변경
     */
    updateMessage: (state, action: PayloadAction<string>) => {
      if (state.isVisible) {
        state.message = action.payload;
      }
    },
  },
});

// ============================================================================
// ACTIONS & REDUCER
// ============================================================================

export const { showSpinner, hideSpinner, resetSpinner, updateMessage } = spinnerSlice.actions;
export default spinnerSlice.reducer;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { SpinnerState };

// ============================================================================
// SELECTORS
// ============================================================================

/**
 * Spinner 표시 여부 selector
 */
export const selectIsSpinnerVisible = (state: { spinner: SpinnerState }) => state.spinner.isVisible;

/**
 * Spinner 메시지 selector
 */
export const selectSpinnerMessage = (state: { spinner: SpinnerState }) => state.spinner.message;

/**
 * Spinner 카운트 selector
 */
export const selectSpinnerCount = (state: { spinner: SpinnerState }) => state.spinner.count;
