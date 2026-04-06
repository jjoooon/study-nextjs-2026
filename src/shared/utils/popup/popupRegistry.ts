/**
 * Popup Registry (팝업 등록 시스템)
 *
 * @description
 * - 팝업 타입과 실제 컴포넌트의 매핑 관리
 * - 동적 import를 지원하는 로더 함수 저장
 * - 공통 팝업만 미리 등록하고, Feature 팝업은 사용처에서 동적 등록
 *
 * @architecture
 * - 공통 팝업: popup-registry.ts에 기본 등록
 * - Feature 팝업: 각 feature 컴포넌트에서 registerDialog()로 동적 등록
 *
 * @usage
 * // 1. 공통 팝업 (이미 등록됨)
 * const confirmed = await popup.confirm({ message: '확인하시겠습니까?' });
 *
 * // 2. Feature 팝업 동적 등록
 * import { registerDialog } from '@/shared/utils/popup-registry';
 * import { popup } from '@/shared/utils/popup';
 *
 * // 컴포넌트 마운트 시 등록
 * useEffect(() => {
 *   registerDialog('products/detail', () =>
 *     import('@/features/products/components/popups/product-detail-dialog')
 *   );
 * }, []);
 *
 * // 팝업 사용
 * const result = await popup.open('products/detail', { productId: 123 });
 */

import type { ComponentType } from 'react';
import log from '@/shared/utils/logger';

const logger = log.getLogger('Global');

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
export type DialogLoader = () => Promise<{ default: ComponentType<Record<string, unknown>> } | unknown>;

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
 * - 공통 팝업만 기본 등록
 * - Feature 팝업은 각 feature에서 동적으로 등록
 * - confirm과 alert는 ConfirmDialog 하나로 통합 관리
 *
 * @guideline
 * - ✅ 등록: confirm, alert 등 전역적으로 사용하는 공통 팝업
 * - ❌ 미등록: products/detail, shared/table 등 feature-specific 팝업
 */
const dialogRegistry: DialogRegistry = {
  // 공통 팝업 (기본 등록)
  // confirm과 alert 모두 ConfirmDialog를 사용
  confirm: () =>
    import('@common/ConfirmDialog') as unknown as Promise<{
      default: ComponentType<Record<string, unknown>>;
    }>,
  alert: () =>
    import('@common/ConfirmDialog') as unknown as Promise<{
      default: ComponentType<Record<string, unknown>>;
    }>,

  // Feature 팝업은 각 feature에서 registerDialog()로 동적 등록
  // 예: 'products/detail', 'products/delete', 'shared/table' 등
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
    logger.warn(`[DialogRegistry] Overriding dialog: ${popupType}`);
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
  logger.log('[DialogRegistry] Registered dialogs:', getRegisteredDialogTypes());
}

// ============================================================================
// EXPORTS
// ============================================================================

export default dialogRegistry;
