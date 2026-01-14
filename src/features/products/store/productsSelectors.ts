import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

// ============================================================================
// PRODUCTS SELECTORS
// ============================================================================

/**
 * Products domain의 모든 selector
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */

// Base selectors
export const selectProductsState = (state: RootState) => state.products;

export const selectFilters = createSelector([selectProductsState], (products) => products.filters);

export const selectSort = createSelector([selectProductsState], (products) => products.sort);

export const selectSelectedProducts = createSelector([selectProductsState], (products) => products.selectedProducts);

export const selectViewMode = createSelector([selectProductsState], (products) => products.viewMode);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 필터링된 제품 개수
 */
export const selectSelectedProductsCount = createSelector(
  [selectSelectedProducts],
  (selectedProducts) => selectedProducts.length
);

/**
 * 현재 정렬 상태 요약
 */
export const selectSortSummary = createSelector([selectSort], (sort) => ({
  sortBy: sort.sortBy,
  sortOrder: sort.sortOrder,
  label: `${sort.sortBy} ${sort.sortOrder === 'asc' ? '오름차순' : '내림차순'}`,
}));

/**
 * 현재 필터 상태 요약
 */
export const selectFiltersSummary = createSelector([selectFilters], (filters) => ({
  hasSearch: !!filters.search,
  hasStatus: !!filters.status,
  hasCategory: !!filters.category,
  activeFilterCount: [filters.search, filters.status, filters.category].filter(Boolean).length,
}));

/**
 * Products 상태 요약
 */
export const selectProductsStatus = createSelector(
  [selectSelectedProductsCount, selectFiltersSummary, selectSortSummary],
  (selectedCount, filtersSummary, sortSummary) => ({
    selectedCount,
    activeFilterCount: filtersSummary.activeFilterCount,
    sortLabel: sortSummary.label,
  })
);
