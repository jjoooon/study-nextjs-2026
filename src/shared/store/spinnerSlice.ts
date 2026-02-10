/**
 * Global Spinner Slice
 *
 * @description
 * 전역 spinner 상태 관리를 위한 Redux Slice
 * - Axios interceptor와 연동하여 API 요청 시 자동 표시
 * - 특정 요청에 대해서만 spinner 표시 가능
 * - 전역 수동 모드: API 요청 완료와 무관하게 수동으로 제어
 *
 * @features
 * - 요청 카운트 기반 중첩 요청 처리
 * - 전역 수동 모드 (globalManual): 수동 끄기 전까지 계속 표시
 * - 메시지 커스터마이징
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
  /** spinner를 표시할지 여부를 결정하는 키 */
  showSpinner?: boolean;
  /** 배경색을 투명하게 할지 여부 */
  transparentBackground?: boolean;
  /** 로딩 이미지(스피너)를 숨길지 여부 */
  hideLoadingIndicator?: boolean;
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
  /** 전역 수동 모드: true이면 API 요청 완료와 무관하게 계속 표시 */
  globalManual: boolean;
  /** 배경색 투명 여부 */
  transparentBackground: boolean;
  /** 로딩 이미지 숨김 여부 */
  hideLoadingIndicator: boolean;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: SpinnerState = {
  count: 0,
  isVisible: false,
  message: null,
  startTime: null,
  globalManual: false, // 전역 수동 모드 비활성화
  transparentBackground: false, // 기본: 불투명 배경
  hideLoadingIndicator: false, // 기본: 로딩 이미지 표시
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
        state.transparentBackground = action.payload.transparentBackground ?? false;
        state.hideLoadingIndicator = action.payload.hideLoadingIndicator ?? false;
        state.startTime = Date.now();
      }
    },

    /**
     * Spinner 숨김
     */
    hideSpinner: (state) => {
      // 전역 수동 모드가 활성화되어 있으면 숨기지 않음
      if (state.globalManual) {
        return;
      }

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
     * 전역 spinner 강제 표시
     * - API 요청 완료와 무관하게 계속 spinner 표시
     * - 수동으로 끄기 전까지 유지
     */
    forceShowSpinner: (state, action: PayloadAction<{ message?: string } | undefined>) => {
      state.globalManual = true;
      state.isVisible = true;
      state.message = action.payload?.message ?? null;
      state.count = 0; // API 요청 count와 무관하게 동작하도록 초기화
    },

    /**
     * 전역 spinner 강제 숨김
     */
    forceHideSpinner: (state) => {
      state.globalManual = false;
      state.isVisible = false;
      state.message = null;
      state.count = 0;
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

export const {
  // API 요청 기반 spinner
  showSpinner,
  hideSpinner,
  // 전역 spinner (강제 모드)
  forceShowSpinner,
  forceHideSpinner,
  // 기타
  resetSpinner,
  updateMessage,
} = spinnerSlice.actions;
export default spinnerSlice.reducer;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { SpinnerState };

// ============================================================================
// SELECTOR RE-EXPORTS
// ============================================================================

/**
 * Spinner Selectors
 *
 * @description
 * Selector는 별도 파일로 분리되어 있습니다.
 * @see spinnerSelectors.ts
 */
export * from './spinnerSelectors';
