/**
 * Products Redux Store Types
 *
 * @description
 * Products feature의 Redux Store 타입 정의
 * - UI 상태는 productsUISlice에서 관리 (selectedProducts, viewMode)
 * - 필터/정렬 상태는 URL 쿼리 파라미터로 관리
 */

import type { ProductsUIState } from '../store/productsUISlice';

/**
 * Products Store State
 *
 * @deprecated
 * 이 타입은 더 이상 사용되지 않습니다.
 * Redux store는 productsUISlice의 ProductsUIState 타입을 직접 사용하세요.
 *
 * @example
 * // Old way (deprecated)
 * import type { ProductsState } from '@/features/products/types/store';
 *
 * // New way
 * import type { ProductsUIState } from '@/features/products/store/productsUISlice';
 */
export type ProductsState = {
  ui: ProductsUIState;
  lastUpdated: string | null;
};

// Re-export UI types for convenience
export type { ProductsFilters, ProductsSort, ProductListProps, ProductFiltersProps, ProductCardProps } from './ui';
export type { ProductsUIState } from '../store/productsUISlice';
