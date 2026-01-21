import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux';

// ============================================================================
// PRODUCTS UI SELECTORS
// ============================================================================

/**
 * Products UI domain의 selector
 *
 * @description
 * Redux에서 관리하는 UI 상태에 대한 selector
 * - filters, sort: URL 쿼리 파라미터로 관리 (이 파일 X)
 * - selectedProducts, viewMode: Redux에서 관리 (이 파일 O)
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */

// ============================================================================
// BASE SELECTORS
// ============================================================================

/**
 * Products UI State 선택자
 */
export const selectProductsState = (state: RootState) => state.products;

/**
 * 선택된 제품 목록 선택자
 */
export const selectSelectedProducts = createSelector([selectProductsState], (products) => products.selectedProducts);

/**
 * 뷰 모드 선택자
 */
export const selectViewMode = createSelector([selectProductsState], (products) => products.viewMode);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 선택된 제품 개수
 */
export const selectSelectedProductsCount = createSelector(
  [selectSelectedProducts],
  (selectedProducts) => selectedProducts.length
);

/**
 * Products UI 상태 요약
 */
export const selectProductsUIStatus = createSelector(
  [selectSelectedProductsCount, selectViewMode],
  (selectedCount, viewMode) => ({
    selectedCount,
    viewMode,
  })
);
