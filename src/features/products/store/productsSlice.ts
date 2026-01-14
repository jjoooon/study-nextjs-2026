/**
 * Products UI Slice
 *
 * 제품 관련 UI 상태 관리 (필터, 정렬, 선택 등)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ProductsFilters, ProductsSort, ProductsUIState } from '../types';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: ProductsFilters = {
  search: '',
  status: '',
  category: '',
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
};

const initialSort: ProductsSort = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const initialState: ProductsUIState = {
  filters: initialFilters,
  sort: initialSort,
  selectedProducts: [],
  viewMode: 'table',
};

// ============================================================================
// PRODUCTS SLICE
// ============================================================================

/**
 * Products UI Slice
 */
export const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    /**
     * 필터 업데이트
     */
    setFilters: (state, action: PayloadAction<Partial<ProductsFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    /**
     * 필터 초기화
     */
    resetFilters: (state) => {
      state.filters = initialFilters;
    },

    /**
     * 정렬 업데이트
     */
    setSort: (state, action: PayloadAction<ProductsSort>) => {
      state.sort = action.payload;
    },

    /**
     * 제품 선택/해제
     */
    toggleProductSelection: (state, action: PayloadAction<number>) => {
      const index = state.selectedProducts.indexOf(action.payload);
      if (index === -1) {
        state.selectedProducts.push(action.payload);
      } else {
        state.selectedProducts.splice(index, 1);
      }
    },

    /**
     * 모든 제품 선택
     */
    selectAllProducts: (state, action: PayloadAction<number[]>) => {
      state.selectedProducts = action.payload;
    },

    /**
     * 모든 선택 해제
     */
    clearProductSelection: (state) => {
      state.selectedProducts = [];
    },

    /**
     * 뷰 모드 변경
     */
    setViewMode: (state, action: PayloadAction<'table' | 'grid'>) => {
      state.viewMode = action.payload;
    },
  },
});

// ============================================================================
// ACTIONS EXPORT
// ============================================================================

export const {
  setFilters,
  resetFilters,
  setSort,
  toggleProductSelection,
  selectAllProducts,
  clearProductSelection,
  setViewMode,
} = productsSlice.actions;

// ============================================================================
// REDUCER EXPORT
// ============================================================================

export default productsSlice.reducer;
