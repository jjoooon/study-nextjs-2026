/**
 * Application Constants
 *
 * @description
 * 애플리케이션 전반에 사용되는 공통 상수 정의
 *
 * @categories
 * - API: API 관련 상수
 * - Routes: 라우팅 관련 상수
 * - Storage: 로컬 스토리지 키
 * - Time: 시간 관련 상수
 * - Pagination: 페이지네이션 상수
 */

/**
 * API 관련 상수
 */
export const API = {
  /** 기본 API 엔드포인트 */
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',

  /** API 타임아웃 (ms) */
  TIMEOUT: 10000,

  /** 재시도 횟수 */
  RETRY_COUNT: 3,

  /** 재시간 지연 (ms) */
  RETRY_DELAY: 1000,

  /** 헤더 키 */
  HEADERS: {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    ACCEPT: 'Accept',
  } as const,

  /** HTTP 상태 코드 */
  STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  } as const,
} as const;

/**
 * 라우팅 관련 상수
 */
export const ROUTES = {
  /** 공개 라우트 (인증 불필요) */
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  } as const,

  /** 보호된 라우트 (인증 필요) */
  PROTECTED: {
    DASHBOARD: '/dashboard',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id: string) => `/products/${id}`,
    PRODUCT_CREATE: '/products/new',
    PRODUCT_EDIT: (id: string) => `/products/${id}/edit`,
  } as const,

  /** API 라우트 */
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REGISTER: '/api/auth/register',
      REFRESH: '/api/auth/refresh',
    } as const,
    PRODUCTS: {
      LIST: '/api/products',
      DETAIL: (id: string) => `/api/products/${id}`,
      CREATE: '/api/products',
      UPDATE: (id: string) => `/api/products/${id}`,
      DELETE: (id: string) => `/api/products/${id}`,
    } as const,
  } as const,
} as const;

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  /** 인증 토큰 */
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',

  /** 사용자 설정 */
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',

  /** 캐시 */
  CACHE_PREFIX: 'cache_',

  /** 임시 데이터 */
  TEMP_DATA_PREFIX: 'temp_',
} as const;

/**
 * 세션 스토리지 키
 */
export const SESSION_KEYS = {
  /** OAuth 상태 */
  OAUTH_STATE: 'oauth_state',

  /** 리다이렉트 URL */
  REDIRECT_URL: 'redirect_url',

  /** 임시 폼 데이터 */
  FORM_DATA_PREFIX: 'form_',
} as const;

/**
 * 시간 관련 상수 (밀리초)
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

/**
 * 디바운스/쓰로틀 시간
 */
export const DELAY = {
  INPUT: 300, // 입력 디바운스
  SEARCH: 500, // 검색 디바운스
  SCROLL: 100, // 스크롤 쓰로틀
  RESIZE: 200, // 리사이즈 쓰로틀
} as const;

/**
 * 페이지네이션 상수
 */
export const PAGINATION = {
  /** 기본 페이지 크기 */
  DEFAULT_PAGE_SIZE: 20,

  /** 페이지 크기 옵션 */
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100] as const,

  /** 최대 페이지 크기 */
  MAX_PAGE_SIZE: 100,

  /** 최소 페이지 크기 */
  MIN_PAGE_SIZE: 10,

  /** 기본 페이지 번호 */
  DEFAULT_PAGE: 1,
} as const;

/**
 * 애플리케이션 메타데이터
 */
export const APP = {
  /** 애플리케이션 이름 */
  NAME: 'Next.js App',

  /** 버전 */
  VERSION: '1.0.0',

  /** 설명 */
  DESCRIPTION: 'Next.js 16 with TypeScript and Redux Toolkit',

  /** 환경 */
  ENV: process.env.NODE_ENV || 'development',

  /** 개발 모드 여부 */
  isDevelopment: process.env.NODE_ENV === 'development',

  /** 프로덕션 모드 여부 */
  isProduction: process.env.NODE_ENV === 'production',

  /** 테스트 모드 여부 */
  isTest: process.env.NODE_ENV === 'test',
} as const;
