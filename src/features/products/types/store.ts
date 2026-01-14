/**
 * Products Redux Store Types
 */

import type { ProductsUIState } from './ui';

/**
 * Products Store State
 */
export type ProductsState = {
  ui: ProductsUIState;
  lastUpdated: string | null;
};

// Re-export UI types for convenience
export type { ProductsFilters, ProductsSort, ProductsUIState, ProductListProps, ProductFiltersProps } from './ui';
