/**
 * Products Redux Store Types
 *
 * @description
 * Products feature의 Redux Store 타입 정의
 * - UI 상태는 productsUISlice에서 관리 (selectedProducts, viewMode)
 * - 필터/정렬 상태는 URL 쿼리 파라미터로 관리
 */

/**
 * Products UI Slice State Type
 *
 * @description
 * Redux에 저장되는 UI 상태 타입
 */
export type ProductsUIState = {
  selectedProducts: number[];
};
