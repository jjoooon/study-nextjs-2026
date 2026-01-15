/**
 * Shared URL State Types
 *
 * @description
 * URL 쿼리 파라미터 기반 상태 관리를 위한 공통 타입
 *
 * @architecture
 * URL 상태 (영구적) + Redux 상태 (일시적)
 * - filters, sort: URL 쿼리 파라미터로 관리
 * - 페이지 새로고침에도 상태 유지
 * - URL 공유 가능
 */

/**
 * 기본 정렬 순서 타입
 */
export type SortOrder = 'asc' | 'desc';

/**
 * 기본 정렬 상태 타입
 */
export interface BaseSort {
  sortBy: string;
  sortOrder: SortOrder;
}

/**
 * 기본 필터 상태 타입
 */
export interface BaseFilters {
  search?: string;
}

/**
 * 페이지네이션 파라미터 타입
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * URL 파라미터 키 상수 타입
 */
export interface URLParamKeys {
  SEARCH: 'search';
  PAGE: 'page';
  PAGE_SIZE: 'pageSize';
  SORT_BY: 'sortBy';
  SORT_ORDER: 'sortOrder';
  DATE_START: 'dateStart';
  DATE_END: 'dateEnd';
}

/**
 * 일반적인 URL 상태 타입
 *
 * @description
 * 필터, 정렬, 페이지네이션을 포함한 URL 상태
 */
export interface URLState<TFilters = BaseFilters, TSort extends BaseSort = BaseSort> extends PaginationParams {
  filters: TFilters;
  sort: TSort;
}
