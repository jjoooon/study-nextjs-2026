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
 *   message: '정말 삭제하시겠습니까?',
 *   confirmText: '삭제',
 *   cancelText: '취소'
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
import {
  addPopup,
  registerPopupCallbacks,
  removePopup,
  removePopupCallbacks,
  hasPopupCallbacks,
  type PopupCallbacksExtended,
} from '@/shared/store/popupSlice';

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

/**
 * 팝업 타입 상수
 */
export const POPUP_TYPES = {
  CONFIRM: 'confirm',
  ALERT: 'alert',
} as const;

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
  props?: P,
  options: OpenPopupOptions = {}
): Promise<T> {
  const { timeout = 0 } = options;

  return new Promise<T>((resolve, reject) => {
    // 1. 고유 ID 생성
    const id = `popup-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // 2. 타임아웃 설정 (옵션) - 콜백 등록 전에 설정
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        // 콜백이 여전히 존재하는지 확인 (이미 resolve/reject 되지 않았는지)
        if (hasPopupCallbacks(id)) {
          reject(new Error(`Popup timeout after ${timeout}ms`));
          store.dispatch(removePopup({ popupId: id }));
          removePopupCallbacks(id);
        }
      }, timeout);
    }

    // 3. 콜백 래핑 - cleanup을 resolve/reject에 통합
    const wrappedCallbacks: PopupCallbacksExtended<T> = {
      resolve: (value: T) => {
        if (timeoutId) clearTimeout(timeoutId);
        removePopupCallbacks(id);
        resolve(value);
      },
      reject: (error: Error) => {
        if (timeoutId) clearTimeout(timeoutId);
        removePopupCallbacks(id);
        reject(error);
      },
      timeoutId,
    };

    // 4. 콜백을 Redux Slice에 등록
    registerPopupCallbacks<T>(id, wrappedCallbacks);

    // 5. Redux에는 직렬화 가능한 데이터만 저장
    try {
      store.dispatch(
        addPopup({
          id,
          popupType,
          props: (props ?? {}) as Record<string, unknown>,
        })
      );
    } catch (dispatchError) {
      removePopupCallbacks(id);
      reject(dispatchError instanceof Error ? dispatchError : new Error('Failed to dispatch popup'));
    }
  });
}

// ============================================================================
// CONVENIENCE APIs
// ============================================================================

/**
 * Dialog 톤 타입 (컴포넌트의 실제 시각적 상태)
 *
 * @description
 * - danger: 적색 파괴적 버튼 (삭제 등 위험 작업)
 * - info: 기본 파란색 버튼 (일반 확인)
 */
export type DialogTone = 'danger' | 'info';

/**
 * Confirm Dialog Props 타입
 */
export interface ConfirmDialogProps {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: DialogTone;
}

/**
 * Alert Dialog Props 타입
 */
export interface AlertDialogProps {
  title?: string;
  message?: string;
  buttonText?: string;
  tone?: DialogTone;
}

/**
 * Confirm Dialog 공통 Props 타입
 */
interface ConfirmDialogInternalProps {
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone: DialogTone;
  alertMode?: boolean;
}

/**
 * Confirm/Alert 공통 Props 빌더
 */
function buildConfirmProps(
  title: string,
  confirmLabel: string,
  tone: DialogTone,
  message?: string,
  alertMode = false,
  cancelLabel?: string
): ConfirmDialogInternalProps {
  return {
    title,
    description: message,
    confirmLabel,
    ...(cancelLabel !== undefined && { cancelLabel }),
    tone,
    ...(alertMode && { alertMode: true }),
  };
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
 *   cancelText: '취소',
 *   tone: 'danger'
 * });
 *
 * if (confirmed) {
 *   await deleteItem();
 * }
 */
export async function confirm(props: ConfirmDialogProps = {}): Promise<boolean> {
  const confirmProps = buildConfirmProps(
    props.title || '확인',
    props.confirmText || '확인',
    props.tone ?? 'info',
    props.message,
    false,
    props.cancelText || '취소'
  );

  return open<boolean, ConfirmDialogInternalProps>(POPUP_TYPES.CONFIRM, confirmProps);
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
 *   message: '작업이 완료되었습니다',
 *   tone: 'info'
 * });
 */
export async function alert(props: AlertDialogProps = {}): Promise<void> {
  const confirmProps = buildConfirmProps(
    props.title || '알림',
    props.buttonText || '확인',
    props.tone ?? 'info',
    props.message,
    true
  );

  return open<void, ConfirmDialogInternalProps>(POPUP_TYPES.ALERT, confirmProps);
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
