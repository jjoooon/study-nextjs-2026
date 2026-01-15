/**
 * URL Parameters Utilities for Products Page
 *
 * Query Parameters 기반 상태 관리를 위한 유틸리티 함수
 *
 * @description
 * URL 파라미터를 통한 상태 관리로 다음 이점 제공:
 * - URL 공유 가능
 * - 북마크/즐겨찾기 가능
 * - 새로고침해도 상태 유지
 * - 브라우저 뒤로/앞으로 가기 지원
 *
 * @architecture
 * Shared URL utilities를 사용하며, Products 전용 설정만 추가
 *
 * @example
 * /products?search=laptop&category=electronics&sortBy=price&sortOrder=asc
 */

import { last30DaysRange } from '@/shared/utils/date/dateRange';
import { URL_PARAMS as SHARED_URL_PARAMS } from '@/shared/utils/url/urlParams';
import type { ProductsFilters, ProductsSort } from '../types/ui';

// ============================================================================
// PRODUCTS URL PARAMETER KEYS
// ============================================================================

/**
 * Products 전용 URL 파라미터 키
 *
 * @description
 * Shared URL 파라미터 + Products 전용 파라미터
 */
export const URL_PARAMS = {
  ...SHARED_URL_PARAMS,
  STATUS: 'status',
  CATEGORY: 'category',
} as const;

// ============================================================================
// DEFAULT VALUES
// ============================================================================

/**
 * 기본 필터 값
 */
export const DEFAULT_FILTERS: ProductsFilters = {
  search: '',
  status: '',
  category: '',
  dateRange: last30DaysRange(), // Shared date range preset 사용
};

/**
 * 기본 정렬 값
 */
export const DEFAULT_SORT: ProductsSort = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

// ============================================================================
// URL PARSE FUNCTIONS
// ============================================================================

/**
 * URLSearchParams에서 필터 상태 추출
 *
 * @param searchParams - URLSearchParams 객체
 * @returns ProductsFilters 상태 객체
 */
export function parseFiltersFromURL(searchParams: URLSearchParams): ProductsFilters {
  return {
    search: searchParams.get(URL_PARAMS.SEARCH) || DEFAULT_FILTERS.search,
    status: searchParams.get(URL_PARAMS.STATUS) || DEFAULT_FILTERS.status,
    category: searchParams.get(URL_PARAMS.CATEGORY) || DEFAULT_FILTERS.category,
    dateRange: {
      start: searchParams.get(URL_PARAMS.DATE_START) || DEFAULT_FILTERS.dateRange.start,
      end: searchParams.get(URL_PARAMS.DATE_END) || DEFAULT_FILTERS.dateRange.end,
    },
  };
}

/**
 * URLSearchParams에서 정렬 상태 추출
 *
 * @param searchParams - URLSearchParams 객체
 * @returns ProductsSort 상태 객체
 */
export function parseSortFromURL(searchParams: URLSearchParams): ProductsSort {
  const sortBy = searchParams.get(URL_PARAMS.SORT_BY) || DEFAULT_SORT.sortBy;
  const sortOrder = (searchParams.get(URL_PARAMS.SORT_ORDER) || DEFAULT_SORT.sortOrder) as 'asc' | 'desc';

  return { sortBy, sortOrder };
}

// ============================================================================
// URL BUILD FUNCTIONS
// ============================================================================

/**
 * 필터와 정렬 상태를 통합한 URL 쿼리 문자열로 변환
 *
 * @param filters - ProductsFilters 상태 객체
 * @param sort - ProductsSort 상태 객체
 * @returns URL 쿼리 문자열
 */
export function buildQueryString(filters: ProductsFilters, sort: ProductsSort): string {
  const params = new URLSearchParams();

  // 필터 파라미터 추가
  if (filters.search) params.set(URL_PARAMS.SEARCH, filters.search);
  if (filters.status) params.set(URL_PARAMS.STATUS, filters.status);
  if (filters.category) params.set(URL_PARAMS.CATEGORY, filters.category);
  if (filters.dateRange?.start) params.set(URL_PARAMS.DATE_START, filters.dateRange.start);
  if (filters.dateRange?.end) params.set(URL_PARAMS.DATE_END, filters.dateRange.end);

  // 정렬 파라미터 추가
  params.set(URL_PARAMS.SORT_BY, sort.sortBy);
  params.set(URL_PARAMS.SORT_ORDER, sort.sortOrder);

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}
