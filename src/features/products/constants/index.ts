/**
 * Products Feature Constants
 *
 * @description
 * 제품 관리 Feature 전용 상수
 */

/**
 * 제품 상태
 */
export const PRODUCT_STATUS = {
  /** 활성 */
  ACTIVE: 'active',

  /** 비활성 */
  INACTIVE: 'inactive',

  /** 보관 (삭제됨) */
  ARCHIVED: 'archived',
} as const;

export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

/**
 * 제품 카테고리
 */
export const PRODUCT_CATEGORY = {
  /** 구독 서비스 */
  SUBSCRIPTION: 'subscription',

  /** 일회성 결제 */
  ONE_TIME: 'one-time',
} as const;

export type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];

/**
 * 제품 상태 라벨 (표시용)
 */
export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  active: '활성',
  inactive: '비활성',
  archived: '보관',
} as const;

/**
 * 제품 카테고리 라벨 (표시용)
 */
export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  subscription: '구독',
  'one-time': '일회',
} as const;

/**
 * 제품 정렬 옵션
 */
export const PRODUCT_SORT_OPTIONS = {
  /** 이름순 */
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',

  /** 가격순 */
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',

  /** 최신순 */
  CREATED_AT_ASC: 'created_at_asc',
  CREATED_AT_DESC: 'created_at_desc',

  /** 인기순 */
  POPULARITY: 'popularity',
} as const;

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS];

/**
 * 제품 정렬 옵션 라벨
 */
export const PRODUCT_SORT_LABELS: Record<ProductSortOption, string> = {
  name_asc: '이름 오름차순',
  name_desc: '이름 내림차순',
  price_asc: '가격 오름차순',
  price_desc: '가격 내림차순',
  created_at_asc: '오래된순',
  created_at_desc: '최신순',
  popularity: '인기순',
} as const;

/**
 * 제품 필터 기본값
 */
export const DEFAULT_PRODUCT_FILTERS = {
  status: undefined as ProductStatus | undefined,
  category: undefined as ProductCategory | undefined,
  search: '',
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
} as const;

/**
 * 제품 페이지네이션 기본값
 */
export const PRODUCT_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,
} as const;

/**
 * 제품 검색 최소 길이
 */
export const PRODUCT_SEARCH_MIN_LENGTH = 2;

/**
 * 제품 검색 디바운스 시간 (ms)
 */
export const PRODUCT_SEARCH_DEBOUNCE = 300;

/**
 * 제품 관련 제한
 */
export const PRODUCT_LIMITS = {
  /** 이름 최대 길이 */
  NAME_MAX_LENGTH: 200,

  /** 설명 최대 길이 */
  DESCRIPTION_MAX_LENGTH: 5000,

  /** 최소 가격 */
  MIN_PRICE: 0,

  /** 최대 가격 */
  MAX_PRICE: 999999999,

  /** 가격 단위 (원) */
  PRICE_STEP: 100,
} as const;

/**
 * 제품 이미지 관련 상수
 */
export const PRODUCT_IMAGE = {
  /** 최대 이미지 수 */
  MAX_COUNT: 10,

  /** 지원되는 형식 */
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const,

  /** 최대 파일 크기 (5MB) */
  MAX_FILE_SIZE: 5 * 1024 * 1024,

  /** 권장 크기 (px) */
  RECOMMENDED_SIZE: {
    WIDTH: 800,
    HEIGHT: 600,
  },

  /** 최소 크기 (px) */
  MIN_DIMENSION: {
    WIDTH: 200,
    HEIGHT: 200,
  },

  /** 최대 크기 (px) */
  MAX_DIMENSION: {
    WIDTH: 4096,
    HEIGHT: 4096,
  },
} as const;

/**
 * 제품 폼 검증 메시지
 */
export const PRODUCT_FORM_MESSAGES = {
  NAME_REQUIRED: '제품명을 입력해주세요.',
  NAME_TOO_LONG: `제품명은 ${PRODUCT_LIMITS.NAME_MAX_LENGTH}자 이하로 입력해주세요.`,
  PRICE_REQUIRED: '가격을 입력해주세요.',
  PRICE_INVALID: '유효한 가격을 입력해주세요.',
  PRICE_OUT_OF_RANGE: `가격은 ${PRODUCT_LIMITS.MIN_PRICE}원 ~ ${PRODUCT_LIMITS.MAX_PRICE.toLocaleString()}원 사이로 입력해주세요.`,
  DESCRIPTION_REQUIRED: '설명을 입력해주세요.',
  DESCRIPTION_TOO_LONG: `설명은 ${PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요.`,
  CATEGORY_REQUIRED: '카테고리를 선택해주세요.',
  STATUS_REQUIRED: '상태를 선택해주세요.',
} as const;

/**
 * 제품 관련 에러 메시지
 */
export const PRODUCT_ERROR_MESSAGES = {
  NOT_FOUND: '제품을 찾을 수 없습니다.',
  CREATE_FAILED: '제품 등록에 실패했습니다.',
  UPDATE_FAILED: '제품 수정에 실패했습니다.',
  DELETE_FAILED: '제품 삭제에 실패했습니다.',
  ALREADY_EXISTS: '이미 존재하는 제품입니다.',
  INVALID_STATUS: '유효하지 않은 상태입니다.',
  INVALID_CATEGORY: '유효하지 않은 카테고리입니다.',
} as const;

/**
 * 제품 관련 성공 메시지
 */
export const PRODUCT_SUCCESS_MESSAGES = {
  CREATE: '제품이 등록되었습니다.',
  UPDATE: '제품이 수정되었습니다.',
  DELETE: '제품이 삭제되었습니다.',
  BULK_DELETE: '제품들이 삭제되었습니다.',
} as const;

/**
 * 제품 목록 표시 옵션
 */
export const PRODUCT_LIST_VIEW = {
  /** 그리드 뷰 */
  GRID: 'grid',

  /** 리스트 뷰 */
  LIST: 'list',
} as const;

export type ProductListView = (typeof PRODUCT_LIST_VIEW)[keyof typeof PRODUCT_LIST_VIEW];

/**
 * 제품 비교 최대 수
 */
export const MAX_COMPARE_COUNT = 4;
