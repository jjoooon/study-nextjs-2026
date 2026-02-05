/**
 * Customer Search Hook
 *
 * 고객 검색 기능을 위한 커스텀 훅
 *
 * @description
 * - RTK Query를 사용한 고객 데이터 fetching
 * - 검색 필터 상태 관리
 * - 검색 실행 및 초기화 기능
 */

import { useMemo, useState } from 'react';

import { useGetCustomersQuery } from '@/features/poc/services/customerService';
import type { CustomerSearchFilters } from '@/features/poc/types/customerTypes';

// ============================================================================
// CUSTOMER SEARCH HOOK
// ============================================================================

/**
 * 고객 검색 Hook
 *
 * @description
 * 검색 필터 상태를 관리하고, RTK Query로 고객 데이터를 조회합니다.
 *
 * @usage
 * ```tsx
 * const { customers, total, isLoading, searchFilters, handleSearch, handleReset, updateFilter } = useCustomerSearch();
 *
 * <input value={searchFilters.name} onChange={(e) => updateFilter('name', e.target.value)} />
 * <button onClick={handleSearch}>조회</button>
 * ```
 */
export const useCustomerSearch = () => {
  // 검색 필터 상태
  const [searchFilters, setSearchFilters] = useState<CustomerSearchFilters>({
    customerType: '',
    customerNo: '',
    name: '',
    birthDate: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    recentCustomer: false,
    excludeTerminated: true,
  });

  // 검색 실행 상태 (초기 렌더링 시 자동 검색 방지)
  const [hasSearched, setHasSearched] = useState(false);

  // 쿼리 파라미터 안정화
  const queryParams = useMemo(
    () => ({
      filters: hasSearched ? searchFilters : undefined,
      sortBy: 'name' as const,
      sortOrder: 'asc' as const,
    }),
    [searchFilters, hasSearched]
  );

  // RTK Query hook
  const { data: customersData, isLoading, isError, error, refetch } = useGetCustomersQuery(queryParams);

  /**
   * 검색 필터 변경 핸들러
   */
  const updateFilter = <K extends keyof CustomerSearchFilters>(key: K, value: CustomerSearchFilters[K]) => {
    setSearchFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * 검색 실행 핸들러
   */
  const handleSearch = () => {
    setHasSearched(true);
  };

  /**
   * 초기화 핸들러
   */
  const handleReset = () => {
    setSearchFilters({
      customerType: '',
      customerNo: '',
      name: '',
      birthDate: '',
      phone1: '010',
      phone2: '',
      phone3: '',
      recentCustomer: false,
      excludeTerminated: true,
    });
    setHasSearched(false);
  };

  return {
    // API 데이터
    customers: customersData?.customers || [],
    total: customersData?.total || 0,
    isLoading,
    isError,
    error,

    // 검색 필터 상태
    searchFilters,

    // Actions
    updateFilter,
    handleSearch,
    handleReset,
    refetch,
  };
};
