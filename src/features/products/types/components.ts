/**
 * Products Component Props Types
 */

import type { Product } from './api';
import type { ProductsFilters } from './ui';

/**
 * ProductList Props
 */
export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
}

/**
 * ProductCard Props
 */
export interface ProductCardProps {
  product: Product;
  onViewDetails?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

/**
 * ProductFilters Props
 */
export interface ProductFiltersProps {
  filters: ProductsFilters;
  onFilterChange: (filters: ProductsFilters) => void;
}
