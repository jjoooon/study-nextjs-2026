/**
 * Products 라우팅 관련 타입 정의
 *
 * @description
 * - 쿼리 파라미터의 타입 안전성 확보
 * - URL 상태 관리를 위한 인터페이스 제공
 */

/**
 * 제품 목록 페이지 쿼리 파라미터
 */
export interface ProductsListQueryParams {
  /** 검색어 */
  search?: string;
  /** 상태 필터 */
  status?: string;
  /** 카테고리 필터 */
  category?: string;
  /** 정렬 기준 */
  sortBy?: string;
  /** 정렬 순서 */
  sortOrder?: 'asc' | 'desc';
  /** 뷰 모드 */
  viewMode?: 'table' | 'grid';
}

/**
 * 제품 상세 페이지 쿼리 파라미터
 */
export interface ProductDetailQueryParams {
  /** 제품 ID (필수) */
  id: number | string;
  /** 추가 쿼리 파라미터 */
  [key: string]: string | number | undefined;
}

/**
 * 제품 폼(등록/수정) 페이지 쿼리 파라미터
 */
export interface ProductFormQueryParams extends ProductsListQueryParams {
  /** 제품 ID (수정 시에만 사용) */
  id?: number | string;
}
