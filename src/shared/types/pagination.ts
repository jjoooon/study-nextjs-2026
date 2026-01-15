/**
 * Shared Pagination Types
 *
 * @description
 * 페이지네이션 관련 공통 타입 정의
 * 모든 리스트 API에 일관된 페이지네이션 패턴 제공
 */

/**
 * 페이지네이션 파라미터 타입
 *
 * @description
 * 리스트 조회 요청에 사용하는 공통 파라미터
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * 정렬 파라미터 타입
 *
 * @description
 * 정렬 관련 공통 파라미터
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 검색 파라미터 타입
 *
 * @description
 * 검색 관련 공통 파라미터
 */
export interface SearchParams {
  search?: string;
}

/**
 * 리스트 조회 파라미터 타입
 *
 * @description
 * 페이지네이션 + 정렬 + 검색을 통합한 리스트 조회 파라미터
 *
 * @example
 * interface ProductListParams extends ListParams {
 *   category?: string;
 *   status?: string;
 * }
 */
export interface ListParams extends PaginationParams, SortParams, SearchParams {}

/**
 * 페이지네이션된 응답 타입
 *
 * @description
 * 리스트 API 응답에 사용하는 공통 타입
 *
 * @template T - 리스트 아이템 타입
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

/**
 * 페이지네이션 메타데이터 타입
 *
 * @description
 * 페이지네이션 UI에 필요한 메타데이터
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * PaginatedResponse에서 PaginationMeta 추출
 *
 * @param response - 페이지네이션된 응답
 * @returns 페이지네이션 메타데이터
 */
export const extractPaginationMeta = <T>(response: PaginatedResponse<T>): PaginationMeta => {
  const totalPages = response.totalPages ?? Math.ceil(response.total / response.pageSize);

  return {
    currentPage: response.page,
    totalPages,
    totalItems: response.total,
    itemsPerPage: response.pageSize,
    hasNextPage: response.hasNext ?? response.page < totalPages,
    hasPreviousPage: response.hasPrevious ?? response.page > 1,
  };
};
