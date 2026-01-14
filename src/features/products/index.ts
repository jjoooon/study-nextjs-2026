/**
 * Products Feature - 통합 내보내기
 *
 * 제품 관리 기능의 진입점
 *
 * @description
 * Products 도메인의 모든 기능을 내보내는 바럴 파일
 * - Store: RTK Query API, Redux Toolkit UI state
 * - Types: API, UI, Store, Components 타입
 * - Hooks: useProducts 통합 훅
 * - Components: ProductList, ProductFilters
 *
 * @architecture
 * Feature-based architecture로 products 도메인의 모든 계층을 통합 제공
 *
 * @usage
 * ```typescript
 * import { useProducts, ProductList, ProductFilters } from '@/features/products';
 * ```
 */

// ============================================================================
// STORE EXPORTS
// ============================================================================

// RTK Query API Slice
export { productsApiSlice } from './store/apiSlice';

// Redux Toolkit UI Slice
export { default as productsReducer } from './store/productsSlice';
export * from './store/productsSlice';

// ============================================================================
// TYPES EXPORTS
// ============================================================================

export * from './types';

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

export { useProducts } from './hooks/useProducts';
export { useProduct } from './hooks/useProduct';
export { useProductForm } from './hooks/useProductForm';

// ============================================================================
// COMPONENTS EXPORTS
// ============================================================================

export { ProductList } from './components/ProductList';
export { ProductFilters } from './components/ProductFilters';
export { ProductDetail } from './components/ProductDetail';
export { ProductForm } from './components/ProductForm';
