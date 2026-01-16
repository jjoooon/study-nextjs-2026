/**
 * Products URL-based State Management Hook
 *
 * Query Parameters를 사용한 상태 관리 Hook
 *
 * @description
 * Redux 대신 URL 파라미터를 사용하여 상태를 관리합니다.
 * 이로 인해 다음 이점을 얻을 수 있습니다:
 * - URL 공유 가능
 * - 북마크/즐겨찾기 가능
 * - 새로고침해도 상태 유지
 * - 브라우저 뒤로/앞으로 가기 지원
 * - 페이지 간 이동 시 상태 자동 유지
 *
 * @architecture
 * URL 상태 → useSearchParams → Hook → Components
 *
 * @example
 * const { filters, sort, updateFilters, updateSort } = useProductsURLState();
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { ProductsFilters, ProductsSort } from '../types/ui';
import { DEFAULT_FILTERS, parseFiltersFromURL, parseSortFromURL, buildQueryString } from '../utils/urlParams';

// ============================================================================
// PRODUCTS URL STATE HOOK
// ============================================================================

/**
 * Products URL 기반 상태 관리 Hook
 *
 * URL 파라미터에서 필터와 정렬 상태를 읽고,
 * 상태 변경 시 URL을 업데이트합니다.
 */
export function useProductsURLState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ============================================================================
  // READ STATE FROM URL
  // ============================================================================

  /**
   * URL에서 필터 상태 읽기
   */
  const filters = useMemo<ProductsFilters>(() => {
    return parseFiltersFromURL(searchParams);
  }, [searchParams]);

  /**
   * URL에서 정렬 상태 읽기
   */
  const sort = useMemo<ProductsSort>(() => {
    return parseSortFromURL(searchParams);
  }, [searchParams]);

  /**
   * URL에서 viewMode 읽기
   */
  const viewMode = useMemo<'table' | 'grid'>(() => {
    const mode = searchParams.get('view');
    return mode === 'grid' ? 'grid' : 'table';
  }, [searchParams]);

  // ============================================================================
  // UPDATE STATE IN URL
  // ============================================================================

  /**
   * 필터 업데이트
   *
   * @param newFilters - 새로운 필터 상태 (부분 업데이트 가능)
   */
  const updateFilters = useCallback(
    (newFilters: Partial<ProductsFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };

      // URL 쿼리 문자열 생성
      const queryString = buildQueryString(updatedFilters, sort, viewMode);

      // URL 업데이트 (replace로 히스토리 쌓이지 않게)
      router.replace(`/sample/products/List${queryString}`);
    },
    [filters, sort, viewMode, router]
  );

  /**
   * 정렬 업데이트
   *
   * @param newSort - 새로운 정렬 상태
   */
  const updateSort = useCallback(
    (newSort: ProductsSort) => {
      // URL 쿼리 문자열 생성
      const queryString = buildQueryString(filters, newSort, viewMode);

      // URL 업데이트
      router.replace(`/sample/products/List${queryString}`);
    },
    [filters, viewMode, router]
  );

  /**
   * 모든 필터 초기화
   */
  const resetFilters = useCallback(() => {
    const queryString = buildQueryString(DEFAULT_FILTERS, sort, viewMode);
    router.replace(`/sample/products/List${queryString}`);
  }, [sort, viewMode, router]);

  /**
   * 뷰 모드 업데이트
   *
   * @param newViewMode - 새로운 뷰 모드 ('table' | 'grid')
   */
  const updateViewMode = useCallback(
    (newViewMode: 'table' | 'grid') => {
      const queryString = buildQueryString(filters, sort, newViewMode);
      router.replace(`/sample/products/List${queryString}`);
    },
    [filters, sort, router]
  );

  /**
   * 특정 필터만 제거
   *
   * @param keys - 제거할 필터 키 배열
   */
  const clearFilters = useCallback(
    (keys: Array<'search' | 'status' | 'category' | 'dateRange'>) => {
      const updatedFilters = { ...filters };

      keys.forEach((key) => {
        if (key === 'dateRange') {
          updatedFilters.dateRange = DEFAULT_FILTERS.dateRange;
        } else {
          updatedFilters[key] = DEFAULT_FILTERS[key];
        }
      });

      const queryString = buildQueryString(updatedFilters, sort, viewMode);
      router.replace(`/sample/products/List${queryString}`);
    },
    [filters, sort, viewMode, router]
  );

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    // 현재 상태
    filters,
    sort,
    viewMode,

    // 상태 업데이트 함수
    updateFilters,
    updateSort,
    updateViewMode,
    resetFilters,
    clearFilters,
  };
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * Hook 반환 타입
 */
export type UseProductsURLStateReturn = ReturnType<typeof useProductsURLState>;
