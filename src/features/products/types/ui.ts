/**
 * Products UI Types
 *
 * UI 상태와 컴포넌트 Props 타입 정의
 */

import type { Product } from './apiTypes';

// ============================================================================
// UI STATE TYPES
// ============================================================================

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

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * ProductList Component Props
 */
export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
}

/**
 * ProductCard Component Props
 */
export interface ProductCardProps {
  product: Product;
  onViewDetails?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

/**
 * ProductFilters Component Props
 */
export interface ProductFiltersProps {
  filters: ProductsFilters;
  onFilterChange: (filters: ProductsFilters) => void;
}
