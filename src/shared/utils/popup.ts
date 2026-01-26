/**
 * Popup Utility API
 *
 * @description
 * - 팝업을 열고 닫는 유틸리티 함수
 * - Promise-based API로 결과 값 반환
 * - Redux Store를 통해 상태 관리
 *
 * @usage
 * import { popup } from '@/shared/utils/popup';
 *
 * // 1. Confirm dialog
 * const confirmed = await popup.confirm({
 *   title: '삭제 확인',
 *   message: '정말 삭제하시겠습니까?'
 * });
 *
 * if (confirmed) {
 *   await deleteItem();
 * }
 *
 * // 2. Custom dialog
 * const result = await popup.open('products/detail', {
 *   productId: 123,
 *   mode: 'edit'
 * });
 *
 * // 3. Alert dialog
 * await popup.alert({
 *   title: '알림',
 *   message: '작업이 완료되었습니다'
 * });
 */

import { store } from '@/redux';
import { addPopup, registerPopupCallbacks } from '@/shared/store/popupSlice';

// ============================================================================
// CORE API
// ============================================================================

/**
 * 팝업 열기 (일반)
 *
 * @param popupType - 팝업 타입 (예: 'products/detail', 'confirm')
 * @param props - 팝업 컴포넌트에 전달할 props
 * @returns Promise<결과 값>
 *
 * @example
 * const result = await popup.open('products/detail', { productId: 123 });
 */
export async function open<T = unknown>(popupType: string, props: Record<string, unknown> = {}): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // 1. 고유 ID 생성
    const id = `popup-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // 2. 콜백을 Map에 등록 (Redux state 외부로 분리)
    registerPopupCallbacks(id, {
      resolve: resolve as (value: unknown) => void,
      reject: reject as (error: unknown) => void,
    });

    // 3. Redux에는 직렬화 가능한 데이터만 저장
    store.dispatch(
      addPopup({
        id,
        popupType,
        props,
      })
    );
  });
}

// ============================================================================
// CONVENIENCE APIs
// ============================================================================

/**
 * Confirm Dialog (확인/취소)
 *
 * @param props - Confirm Dialog props
 * @returns Promise<boolean> - 확인(true) 또는 취소(false)
 *
 * @example
 * const confirmed = await popup.confirm({
 *   title: '삭제 확인',
 *   message: '정말 삭제하시겠습니까?',
 *   confirmText: '삭제',
 *   cancelText: '취소'
 * });
 *
 * if (confirmed) {
 *   await deleteItem();
 * }
 */
export async function confirm(
  props: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
  } = {}
): Promise<boolean> {
  return open<boolean>('confirm', props);
}

/**
 * Alert Dialog (알림)
 *
 * @param props - Alert Dialog props
 * @returns Promise<void>
 *
 * @example
 * await popup.alert({
 *   title: '완료',
 *   message: '작업이 완료되었습니다'
 * });
 */
export async function alert(props: {
  title?: string;
  message?: string;
  buttonText?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}): Promise<void> {
  return open<void>('alert', props);
}

// ============================================================================
// UTILITY OBJECT
// ============================================================================

/**
 * Popup Utility Object
 *
 * @description
 * 모든 팝업 관련 함수를 하나의 객체로 제공
 *
 * @example
 * import { popup } from '@/shared/utils/popup';
 *
 * // 모두 같은 기능
 * await popup.open('confirm', { ... });
 * await popup.confirm({ ... });
 */
export const popup = {
  open,
  confirm,
  alert,
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default popup;
