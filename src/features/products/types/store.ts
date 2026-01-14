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
