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
import { addPopup, registerPopupCallbacks, removePopup } from '@/shared/store/popupSlice';

// ============================================================================
// CORE API
// ============================================================================

/**
 * 팝업 열기 옵션
 */
export interface OpenPopupOptions {
  /** 타임아웃 (밀리초), 0이면 무제한 */
  timeout?: number;
}

/**
 * 팝업 열기 (일반)
 *
 * @param popupType - 팝업 타입 (예: 'products/detail', 'confirm')
 * @param props - 팝업 컴포넌트에 전달할 props
 * @param options - 팝업 열기 옵션
 * @returns Promise<결과 값>
 *
 * @example
 * // Basic usage
 * const result = await popup.open('products/detail', { productId: 123 });
 *
 * // With timeout (10 seconds)
 * const result = await popup.open('products/detail', { productId: 123 }, { timeout: 10000 });
 *
 * @type-safety
 * 제네릭 타입 파라미터로 props와 반환 타입을 지정하세요
 * const result = await popup.open<ProductDetailResult, ProductDetailProps>(
 *   'products/detail',
 *   { productId: 123, mode: 'edit' }
 * );
 */
export async function open<T = unknown, P = Record<string, unknown>>(
  popupType: string,
  props: P = {} as P,
  options: OpenPopupOptions = {}
): Promise<T> {
  const { timeout = 0 } = options;

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
        props: props as Record<string, unknown>,
      })
    );

    // 4. 타임아웃 설정 (옵션)
    if (timeout > 0) {
      setTimeout(() => {
        // 콜백이 여전히 존재하는지 확인 (이미 resolve/reject 되지 않았는지)
        const callbacks = (
          globalThis as unknown as { popupCallbacksMap?: Map<string, unknown> }
        ).popupCallbacksMap?.get(id);
        if (callbacks) {
          reject(new Error(`Popup timeout after ${timeout}ms`));
          store.dispatch(removePopup({ popupId: id }));
        }
      }, timeout);
    }
  });
}

// ============================================================================
// CONVENIENCE APIs
// ============================================================================

/**
 * Confirm Dialog Props 타입
 */
export interface ConfirmDialogProps {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

/**
 * Alert Dialog Props 타입
 */
export interface AlertDialogProps {
  title?: string;
  message?: string;
  buttonText?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

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
export async function confirm(props: ConfirmDialogProps = {}): Promise<boolean> {
  return open<boolean, ConfirmDialogProps>('confirm', props);
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
export async function alert(props: AlertDialogProps): Promise<void> {
  return open<void, AlertDialogProps>('alert', props);
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
