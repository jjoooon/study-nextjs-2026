import { useGetProductsQuery } from '@/features/products/services/productService';
import * as productsSelectors from '@/features/products/store/productsSelectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useProductsURLState } from './useProductsURLState';

// ============================================================================
// PRODUCTS HOOKS (RTK Query + URL-based State)
// ============================================================================

/**
 * Products 상태 관리 Hook
 *
 * @description
 * URL 기반 상태 관리 + RTK Query를 사용한 API 데이터 fetching
 *
 * @architecture
 * - URL 상태 (filters, sort): useProductsURLState
 * - API 데이터: useGetProductsQuery
 * - UI 상태 (selectedProducts, viewMode): Redux Store
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 * @note URL 파라미터를 RTK Query 쿼리 파라미터로 연결하여 자동 refetch
 */
export const useProducts = () => {
  const dispatch = useAppDispatch();

  // ✅ URL 기반 필터/정렬 상태 (useProductsURLState)
  const { filters, sort, updateFilters, updateSort, resetFilters, clearFilters } = useProductsURLState();

  // ✅ Redux 기반 UI 상태 (선택된 제품, 뷰 모드)
  const selectedProducts = useAppSelector(productsSelectors.selectSelectedProducts);
  const viewMode = useAppSelector(productsSelectors.selectViewMode);

  // ✅ RTK Query hook - URL 상태를 쿼리 파라미터로 전달하여 자동 refetch
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
    search: filters.search || undefined,
    status: filters.status || undefined,
    category: filters.category || undefined,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  });

  return {
    // API 데이터
    products: productsData?.products || [],
    total: productsData?.total || 0,
    isLoading,
    isError,
    error,

    // UI 상태
    filters: filters, // URL 기반 상태
    sort: sort, // URL 기반 상태
    selectedProducts, // Redux 상태
    viewMode, // Redux 상태

    // Actions (URL 상태 업데이트)
    updateFilters,
    updateSort,
    resetFilters,
    clearFilters,

    // Redux Actions (선택된 제품, 뷰 모드)
    toggleProductSelection: (id: number) => dispatch({ type: 'products/toggleProductSelection', payload: id }),
    selectAllProducts: (ids: number[]) => dispatch({ type: 'products/selectAllProducts', payload: ids }),
    clearProductSelection: () => dispatch({ type: 'products/clearProductSelection' }),
    setViewMode: (mode: 'table' | 'grid') => dispatch({ type: 'products/setViewMode', payload: mode }),

    // API Actions
    refetch,
  };
};
