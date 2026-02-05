/**
 * Customer Type Definitions
 *
 * 고객 관련 타입 정의
 */

// ============================================================================
// ENTITY TYPES
// ============================================================================

/**
 * 고객 데이터 타입
 */
export interface Customer {
  /** 고유 ID */
  id: string;
  /** 고객명 */
  name: string;
  /** 고객식별번호 */
  customerNo: string;
  /** 고객유형명 */
  customerType: string;
  /** 휴대폰번호 */
  phone: string;
  /** 주소 */
  address: string;
  /** 생년월일 (YYYYMMDD) */
  birthDate: string;
  /** 상태 */
  status: 'active' | 'terminated';
  /** 생성일시 */
  createdAt: string;
  /** 수정일시 */
  updatedAt: string;
}

// ============================================================================
// INPUT TYPES
// ============================================================================

/**
 * 고객 검색 필터 타입
 */
export interface CustomerSearchFilters {
  /** 고객유형 */
  customerType?: '' | 'individual' | 'corporate';
  /** 고객식별번호 */
  customerNo?: string;
  /** 고객명 */
  name?: string;
  /** 생년월일 */
  birthDate?: string;
  /** 휴대폰번호1 */
  phone1?: string;
  /** 휴대폰번호2 */
  phone2?: string;
  /** 휴대폰번호3 */
  phone3?: string;
  /** 최근등록고객 (3개월) */
  recentCustomer?: boolean;
  /** 해지고객 제외 */
  excludeTerminated?: boolean;
}

// ============================================================================
// PARAMS TYPES
// ============================================================================

/**
 * 고객 검색 API 파라미터 타입
 */
export interface GetCustomersParams {
  /** 검색 필터 */
  filters?: CustomerSearchFilters;
  /** 정렬 필드 */
  sortBy?: string;
  /** 정렬 순서 */
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * 고객 검색 응답 타입
 */
export interface GetCustomersResponse {
  /** 고객 목록 */
  customers: Customer[];
  /** 전체 개수 */
  total: number;
}
