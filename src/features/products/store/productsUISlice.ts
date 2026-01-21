/**
 * Products UI Slice
 *
 * 제품 관련 UI 상태 관리 (선택, 뷰 모드 등)
 *
 * @description
 * Redux에서 관리하는 UI 전용 상태
 * - filters, sort: URL 쿼리 파라미터로 관리 (useProductsURLState)
 * - selectedProducts: Redux에서 관리 (이 파일)
 *
 * @architecture
 * URL 상태 (영구적) + Redux 상태 (일시적)
 * - 필터/정렬: URL에 저장하여 페이지 새로고침에도 유지
 * - 선택/뷰모드: Redux에 저장하여 일시적 UI 상태 관리
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductsUIState } from '../types/storeTypes';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: ProductsUIState = {
  selectedProducts: [] as number[],
};

// ============================================================================
// PRODUCTS UI SLICE
// ============================================================================

/**
 * Products UI Slice
 *
 * UI 전용 상태만 관리하는 Redux Slice
 */
export const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    /**
     * 제품 선택/해제 토글
     *
     * @param state - 현재 상태
     * @param action - 선택/해제할 제품 ID
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
     *
     * @param state - 현재 상태
     * @param action - 선택할 제품 ID 배열
     */
    selectAllProducts: (state, action: PayloadAction<number[]>) => {
      state.selectedProducts = action.payload;
    },

    /**
     * 모든 제품 선택 해제
     *
     * @param state - 현재 상태
     */
    clearProductSelection: (state) => {
      state.selectedProducts = [];
    },
  },
});

// ============================================================================
// ACTIONS EXPORT
// ============================================================================

export const { toggleProductSelection, selectAllProducts, clearProductSelection } = productsSlice.actions;

// ============================================================================
// REDUCER EXPORT
// ============================================================================

export default productsSlice.reducer;
