/**
 * Shared URL Parameter Utilities
 *
 * @description
 * URL 쿼리 파라미터 기반 상태 관리를 위한 유틸리티 함수
 *
 * @benefits
 * ✅ URL 공유 가능
 * ✅ 북마크/즐겨찾기 가능
 * ✅ 새로고침해도 상태 유지
 * ✅ 브라우저 뒤로/앞으로 가기 지원
 * ✅ 페이지 간 이동 시 상태 자동 유지
 *
 * @example
 * /products?search=laptop&category=electronics&sortBy=price&sortOrder=asc
 */

import type { DateRange } from '@/shared/types/date';
import type { URLParamKeys } from '@/shared/types/url';

// ============================================================================
// URL PARAMETER KEYS
// ============================================================================

/**
 * 공통 URL 파라미터 키 상수
 */
export const URL_PARAMS: URLParamKeys = {
  SEARCH: 'search',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
  DATE_START: 'dateStart',
  DATE_END: 'dateEnd',
} as const;

// ============================================================================
// URL PARSE FUNCTIONS
// ============================================================================

/**
 * URLSearchParams에서 문자열 값 추출
 *
 * @param searchParams - URLSearchParams 객체
 * @param key - 파라미터 키
 * @param defaultValue - 기본값
 * @returns 파라미터 값 또는 기본값
 */
export const getStringParam = (searchParams: URLSearchParams, key: string, defaultValue: string = ''): string => {
  return searchParams.get(key) || defaultValue;
};

/**
 * URLSearchParams에서 숫자 값 추출
 *
 * @param searchParams - URLSearchParams 객체
 * @param key - 파라미터 키
 * @param defaultValue - 기본값
 * @returns 파라미터 값 또는 기본값
 */
export const getNumberParam = (searchParams: URLSearchParams, key: string, defaultValue: number = 1): number => {
  const value = searchParams.get(key);
  return value ? parseInt(value, 10) : defaultValue;
};

/**
 * URLSearchParams에서 날짜 범위 추출
 *
 * @param searchParams - URLSearchParams 객체
 * @param defaultRange - 기본 날짜 범위
 * @returns 날짜 범위
 */
export const getDateRangeParam = (searchParams: URLSearchParams, defaultRange: DateRange): DateRange => {
  const start = searchParams.get(URL_PARAMS.DATE_START);
  const end = searchParams.get(URL_PARAMS.DATE_END);

  return {
    start: start || defaultRange.start,
    end: end || defaultRange.end,
  };
};

/**
 * URLSearchParams에서 정렬 상태 추출
 *
 * @param searchParams - URLSearchParams 객체
 * @param defaultSortBy - 기본 정렬 필드
 * @param defaultSortOrder - 기본 정렬 순서
 * @returns 정렬 상태
 */
export const getSortParam = (
  searchParams: URLSearchParams,
  defaultSortBy: string = 'createdAt',
  defaultSortOrder: 'asc' | 'desc' = 'desc'
) => {
  const sortBy = searchParams.get(URL_PARAMS.SORT_BY) || defaultSortBy;
  const sortOrder = (searchParams.get(URL_PARAMS.SORT_ORDER) || defaultSortOrder) as 'asc' | 'desc';

  return { sortBy, sortOrder };
};

// ============================================================================
// URL BUILD FUNCTIONS
// ============================================================================

/**
 * 객체를 URL 쿼리 문자열로 변환
 *
 * @param params - 쿼리 파라미터 객체
 * @returns URL 쿼리 문자열 (예: "?key=value&key2=value2")
 */
export const buildQueryString = (params: Record<string, string | number | undefined>): string => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * 날짜 범위를 URL 쿼리 문자열로 변환
 *
 * @param dateRange - 날짜 범위
 * @returns URL 쿼리 문자열
 */
export const buildDateRangeQueryString = (dateRange: DateRange): string => {
  return buildQueryString({
    [URL_PARAMS.DATE_START]: dateRange.start,
    [URL_PARAMS.DATE_END]: dateRange.end,
  });
};

/**
 * 필터 객체를 URL 쿼리 문자열로 변환
 *
 * @param filters - 필터 객체
 * @param excludeEmpty - 빈 값 제외 여부 (기본: true)
 * @returns URL 쿼리 문자열
 */
export const buildFiltersQueryString = <T extends Record<string, unknown>>(
  filters: T,
  excludeEmpty: boolean = true
): string => {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (excludeEmpty && (value === '' || value === null || value === undefined)) {
      return;
    }

    if (typeof value === 'object' && value !== null) {
      // DateRange와 같은 중첩 객체 처리
      query.set(key, JSON.stringify(value));
    } else {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

// ============================================================================
// URL UPDATE HELPERS
// ============================================================================

/**
 * 현재 URL에서 특정 파라미터만 업데이트
 *
 * @param searchParams - 현재 URLSearchParams
 * @param updates - 업데이트할 파라미터들
 * @returns 업데이트된 URL 쿼리 문자열
 */
export const updateURLParams = (
  searchParams: URLSearchParams,
  updates: Partial<Record<string, string | null | undefined>>
): string => {
  const params = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === '' || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * 특정 URL 파라미터 제거
 *
 * @param searchParams - 현재 URLSearchParams
 * @param keys - 제거할 파라미터 키 배열
 * @returns 업데이트된 URL 쿼리 문자열
 */
export const removeURLParams = (searchParams: URLSearchParams, keys: string[]): string => {
  const params = new URLSearchParams(searchParams);

  keys.forEach((key) => {
    params.delete(key);
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * 모든 URL 파라미터 제거
 *
 * @returns 빈 쿼리 문자열
 */
export const clearAllURLParams = (): string => {
  return '';
};
