/**
 * Global Spinner Utils
 *
 * @description
 * 전역 spinner 강제 모드를 위한 유틸리티 함수
 * - React 컴포넌트 외부에서도 사용 가능
 * - Redux store를 직접 참조하여 dispatch 실행
 * - API 요청 완료과 무관하게 spinner 강제 표시
 *
 * @usage
 * import { forceShowSpinner, forceHideSpinner } from '@/shared/utils/spinnerUtils';
 *
 * // 일반 함수, 유틸리티, 클래스 메서드 등 어디서든 사용 가능
 * async function processData() {
 *   forceShowSpinner('처리 중입니다...');
 *   try {
 *     await someAsyncOperation();
 *   } finally {
 *     forceHideSpinner();
 *   }
 * }
 */

import { store } from '@/redux';
import {
  forceHideSpinner as forceHideSpinnerAction,
  forceShowSpinner as forceShowSpinnerAction,
} from '@/shared/store/spinnerSlice';

// ============================================================================
// FUNCTIONS
// ============================================================================

/**
 * 전역 spinner 강제 표시
 *
 * @description
 * API 요청 완료와 무관하게 spinner를 강제로 표시
 *
 * @param message - spinner에 표시할 메시지 (선택)
 *
 * @example
 * forceShowSpinner('데이터를 불러오는 중...');
 */
export function forceShowSpinner(message?: string): void {
  store.dispatch(forceShowSpinnerAction(message));
}

/**
 * 전역 spinner 강제 숨김
 *
 * @description
 * 강제로 표시된 spinner를 숨김
 *
 * @example
 * forceHideSpinner();
 */
export function forceHideSpinner(): void {
  store.dispatch(forceHideSpinnerAction());
}

// ============================================================================
// ASYNC WRAPPER
// ============================================================================

/**
 * 강제 spinner와 함께 비동기 작업 실행
 *
 * @description
 * 자동으로 spinner를 강제 표시하고 완료 후 숨김
 *
 * @param asyncFn - 실행할 비동기 함수
 * @param message - spinner 메시지 (선택)
 * @returns asyncFn의 반환값
 *
 * @example
 * const result = await withForceSpinner(
 *   () => fetchUserData(),
 *   '사용자 정보를 불러오는 중...'
 * );
 */
export async function withForceSpinner<T>(asyncFn: () => Promise<T>, message?: string): Promise<T> {
  forceShowSpinner(message);
  try {
    return await asyncFn();
  } finally {
    forceHideSpinner();
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  forceShowSpinner,
  forceHideSpinner,
  withForceSpinner,
};
