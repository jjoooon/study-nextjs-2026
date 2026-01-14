import { useGetProductsQuery } from '@/features/products/store/apiSlice';
import * as productsSelectors from '@/features/products/store/productsSelectors';
import { setFilters, setSort } from '@/features/products/store/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store';

// ============================================================================
// PRODUCTS HOOKS (RTK Query + Selector-based)
// ============================================================================

/**
 * Products 상태 관리 Hook
 *
 * RTK Query를 사용한 API 데이터 fetching + Redux Slice의 UI 상태 관리
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 * @note Redux Store의 filters, sort를 RTK Query 쿼리 파라미터로 연결하여 자동 refetch
 */
export const useProducts = () => {
  const dispatch = useAppDispatch();

  // ✅ Selector 기반 UI 상태 구독 (먼저 읽기)
  const filters = useAppSelector(productsSelectors.selectFilters);
  const sort = useAppSelector(productsSelectors.selectSort);
  const selectedProducts = useAppSelector(productsSelectors.selectSelectedProducts);
  const viewMode = useAppSelector(productsSelectors.selectViewMode);

  // ✅ RTK Query hook - filters, sort를 쿼리 파라미터로 전달하여 자동 refetch
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
    filters,
    sort,
    selectedProducts,
    viewMode,

    // Actions
    updateFilters: (newFilters: Partial<typeof filters>) => dispatch(setFilters(newFilters)),
    updateSort: (newSort: { sortBy: string; sortOrder: 'asc' | 'desc' }) => dispatch(setSort(newSort)),
    refetch,
  };
};

/**
 * Products 필터 상태만 가져오는 Hook
 */
export const useProductsFilters = () => {
  return useAppSelector(productsSelectors.selectFilters);
};

/**
 * Products 정렬 상태만 가져오는 Hook
 */
export const useProductsSort = () => {
  return useAppSelector(productsSelectors.selectSort);
};

/**
 * 선택된 제품 목록만 가져오는 Hook
 */
export const useSelectedProducts = () => {
  return useAppSelector(productsSelectors.selectSelectedProducts);
};

/**
 * 선택된 제품 개수
 */
export const useSelectedProductsCount = () => {
  return useAppSelector(productsSelectors.selectSelectedProductsCount);
};

/**
 * Products 뷰 모드
 */
export const useProductsViewMode = () => {
  return useAppSelector(productsSelectors.selectViewMode);
};

/**
 * Products 상태 요약
 */
export const useProductsStatus = () => {
  return useAppSelector(productsSelectors.selectProductsStatus);
};

/**
 * Products API 데이터 상태 요약
 */
export const useProductsApiStatus = () => {
  const { isLoading, isError, error, data } = useGetProductsQuery();

  return {
    isLoading,
    isError,
    error,
    hasData: !!data,
    productCount: data?.products.length || 0,
    totalCount: data?.total || 0,
  };
};
