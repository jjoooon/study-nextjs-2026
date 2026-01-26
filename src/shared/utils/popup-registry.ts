/**
 * Popup Registry (팝업 등록 시스템)
 *
 * @description
 * - 팝업 타입과 실제 컴포넌트의 매핑 관리
 * - 동적 import를 지원하는 로더 함수 저장
 * - 공통 팝업과 Feature 팝업 모두 등록 가능
 *
 * @usage
 * // 1. 공통 팝업 등록
 * registerDialog('confirm', () => import('@/shared/components/popups/confirm-dialog'));
 *
 * // 2. Feature 팝업 등록
 * registerDialog('products/detail', () =>
 *   import('@/features/products/components/popups/product-detail-dialog')
 * );
 *
 * // 3. 팝업 사용
 * const result = await openPopup('products/detail', { productId: 123 });
 */

import type { ComponentType } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Dialog Loader 함수
 *
 * @description
 * Promise<{ default: ComponentType }>를 반환하는 함수
 * React.lazy의 인자로 사용됩니다
 */
export type DialogLoader = () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

/**
 * Dialog Registry 타입
 */
type DialogRegistry = Record<string, DialogLoader>;

// ============================================================================
// REGISTRY
// ============================================================================

/**
 * 전역 Dialog Registry
 *
 * @description
 * - 모든 팝업 타입과 해당 로더 함수를 저장
 * - 초기에 공통 팝업 등록
 * - Feature에서 추가 등록 가능
 */
const dialogRegistry: DialogRegistry = {
  // 공통 팝업 (기본 등록)
  confirm: () =>
    import('@/shared/components/popups/confirm-dialog') as unknown as Promise<{
      default: ComponentType<Record<string, unknown>>;
    }>,
  alert: () =>
    import('@/shared/components/popups/alert-dialog') as unknown as Promise<{
      default: ComponentType<Record<string, unknown>>;
    }>,
  'shared/table': () =>
    import('@/shared/components/popups/table-dialog') as unknown as Promise<{
      default: ComponentType<Record<string, unknown>>;
    }>,

  // Feature 팝업은 각 feature에서 등록
  // 예: 'products/detail', 'products/delete', etc.
};

// ============================================================================
// REGISTRATION API
// ============================================================================

/**
 * 팝업 등록 함수
 *
 * @param popupType - 팝업 타입 식별자 (예: 'products/detail')
 * @param loader - 동적 import 함수
 *
 * @example
 * registerDialog('products/detail', () =>
 *   import('@/features/products/components/popups/product-detail-dialog')
 * );
 */
export function registerDialog(popupType: string, loader: DialogLoader) {
  if (dialogRegistry[popupType]) {
    console.warn(`[DialogRegistry] Overriding dialog: ${popupType}`);
  }

  dialogRegistry[popupType] = loader;
}

/**
 * 팝업 로더 조회 함수
 *
 * @param popupType - 팝업 타입 식별자
 * @returns DialogLoader 또는 undefined
 *
 * @internal DialogRenderer 컴포넌트에서만 사용
 */
export function getDialogLoader(popupType: string): DialogLoader | undefined {
  return dialogRegistry[popupType];
}

/**
 * 등록된 모든 팝업 타입 목록 반환
 *
 * @description
 * 디버깅 및 개발용 유틸리티
 */
export function getRegisteredDialogTypes(): string[] {
  return Object.keys(dialogRegistry);
}

// ============================================================================
// DEVELOPMENT UTILITIES
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  // 개발 모드에서 등록된 팝업 목록 출력
  console.log('[DialogRegistry] Registered dialogs:', getRegisteredDialogTypes());
}

// ============================================================================
// EXPORTS
// ============================================================================

export default dialogRegistry;
