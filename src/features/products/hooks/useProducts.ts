import { useMemo } from 'react';

import { useGetProductsQuery } from '@/features/products/services/productService';
import * as productsSelectors from '@/features/products/store/productsSelectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { useProductsURLState } from './useProductsURLState';

// ============================================================================
// PRODUCTS HOOKS (RTK Query + URL-based State)
// ============================================================================

/**
 * Products 상태 관리 Hook
 *
 * Vercel React Best Practices - rerender-dependencies 규칙 적용
 *
 * @description
 * URL 기반 상태 관리 + RTK Query를 사용한 API 데이터 fetching
 *
 * @architecture
 * - URL 상태 (filters, sort, viewMode): useProductsURLState
 * - API 데이터: useGetProductsQuery
 * - UI 상태 (selectedProducts): Redux Store
 *
 * @optimization
 * - useMemo로 쿼리 파라미터 안정화
 * - filters, sort 변경 시에만 쿼리 파라미터 재생성
 * - 불필요한 refetch 방지
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 * @note URL 파라미터를 RTK Query 쿼리 파라미터로 연결하여 자동 refetch
 */
export const useProducts = () => {
  const dispatch = useAppDispatch();

  // ✅ URL 기반 필터/정렬/뷰모드 상태 (useProductsURLState)
  const { filters, sort, viewMode, updateFilters, updateSort, updateViewMode, resetFilters, clearFilters } =
    useProductsURLState();

  // ✅ Redux 기반 UI 상태 (선택된 제품)
  const selectedProducts = useAppSelector(productsSelectors.selectSelectedProducts);

  // ✅ Vercel Best Practices - rerender-dependencies
  // useMemo로 쿼리 파라미터 안정화 (매 렌더링마다 새로운 객체 생성 방지)
  const queryParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      search: filters.search || undefined,
      status: filters.status || undefined,
      category: filters.category || undefined,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    }),
    [filters, sort] // filters 또는 sort가 변경될 때만 재생성
  );

  // ✅ RTK Query hook - 안정화된 쿼리 파라미터 사용
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery(queryParams);

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
    viewMode, // URL 기반 상태
    selectedProducts, // Redux 상태

    // Actions (URL 상태 업데이트)
    updateFilters,
    updateSort,
    updateViewMode,
    resetFilters,
    clearFilters,

    // Redux Actions (선택된 제품만)
    toggleProductSelection: (id: number) => dispatch({ type: 'products/toggleProductSelection', payload: id }),
    selectAllProducts: (ids: number[]) => dispatch({ type: 'products/selectAllProducts', payload: ids }),
    clearProductSelection: () => dispatch({ type: 'products/clearProductSelection' }),

    // API Actions
    refetch,
  };
};
