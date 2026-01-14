/**
 * Products UI Types
 */

import type { Product } from './api';

/**
 * 제품 필터 상태
 */
export interface ProductsFilters {
  search: string;
  status: string;
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
}

/**
 * 제품 정렬 상태
 */
export interface ProductsSort {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * 제품 UI 상태
 */
export interface ProductsUIState {
  filters: ProductsFilters;
  sort: ProductsSort;
  selectedProducts: number[];
  viewMode: 'table' | 'grid';
}

/**
 * ProductList Props
 */
export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
}

/**
 * ProductFilters Props
 */
export interface ProductFiltersProps {
  filters: ProductsFilters;
  onFilterChange: (filters: ProductsFilters) => void;
}
