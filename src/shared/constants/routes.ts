/**
 * 공통 라우팅 상수
 *
 * @description
 * 애플리케이션의 모든 라우팅 경로를 중앙 집중식으로 관리합니다.
 * - 공개 경로: 인증이 필요 없는 경로
 * - 보호된 경로: 인증이 필요한 경로
 * - 기능별 경로: 각 도메인별 경로 상수
 *
 * @architecture
 * - PUBLIC_ROUTES: 인증 없이 접근 가능한 경로
 * - PROTECTED_ROUTES: 인증이 필요한 경로 (참고용)
 * - Feature Routes: 각 도메인에서 import하여 사용
 *
 * @usage
 * import { PUBLIC_ROUTES } from '@/shared/constants/routes';
 * import { AUTH_ROUTES } from '@/shared/constants/routes';
 * import { PRODUCTS_ROUTES } from '@/shared/constants/routes';
 *
 * @see
 * - AuthGuard: @/shared/components/auth/AuthGuard - 공개 경로 활용
 * - Next.js Routing: https://nextjs.org/docs/app/building-your-application/routing
 */

// ============================================================================
// PUBLIC ROUTES (인증 불필요)
// ============================================================================

/**
 * 공개 경로 목록
 *
 * @description
 * 인증이 필요 없는 경로들입니다.
 * - AuthGuard에서 이 경로들은 인증 체크에서 제외됩니다.
 * - 새로운 공개 경로 추가 시 이 배열에 추가하세요.
 *
 * @example
 * // 회원가입 페이지 추가 시
 * PUBLIC_ROUTES.push('/register');
 */
export const PUBLIC_ROUTES = ['/login'] as const;

/**
 * 공개 경로 여부 확인 헬퍼 함수
 *
 * @param pathname - 확인할 경로
 * @returns 공개 경로이면 true, 아니면 false
 *
 * @example
 * isPublicRoute('/login'); // true
 * isPublicRoute('/dashboard'); // false
 */
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route));
};

// ============================================================================
// AUTH ROUTES
// ============================================================================

/**
 * 인증 관련 경로
 */
export const AUTH_ROUTES = {
  /** 로그인 페이지 */
  LOGIN: '/login',

  /** 로그아웃 (클라이언트 사이드) */
  LOGOUT: '/logout',
} as const;

// ============================================================================
// PROTECTED ROUTES (참고용)
// ============================================================================

/**
 * 보호된 경로 목록 (참고용)
 *
 * @description
 * 실제로는 AuthGuard에서 자동으로 모든 경로를 보호합니다.
 * 이 배열은 문서화 목적으로만 사용됩니다.
 *
 * @note
 * 새로운 경로가 추가되면 자동으로 보호됩니다.
 * 명시적으로 공개 경로로 지정하려면 PUBLIC_ROUTES에 추가하세요.
 */
export const PROTECTED_ROUTES = [
  '/', // 홈 페이지
  '/sample/dashboard', // 대시보드
  '/sample/products', // 상품 관련
] as const;

// ============================================================================
// FEATURE ROUTES
// ============================================================================

/**
 * 메인/홈 관련 경로
 */
export const MAIN_ROUTES = {
  /** 홈 페이지 */
  HOME: '/',

  /** 대시보드 */
  DASHBOARD: '/sample/dashboard',
} as const;

/**
 * 상품 관련 경로
 */
export const PRODUCTS_ROUTES = {
  /** 상품 목록 */
  LIST: '/sample/products/List',

  /** 상품 상세 (동적 경로) */
  DETAIL: (id: string) => `/sample/products/${id}`,

  /** 상품 생성 (추가 예정) */
  CREATE: '/sample/products/new',

  /** 상품 수정 (동적 경로, 추가 예정) */
  EDIT: (id: string) => `/sample/products/${id}/edit`,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

/**
 * 공개 경로 타입
 */
export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

/**
 * 인증 경로 타입
 */
export type AuthRoute = keyof typeof AUTH_ROUTES;

/**
 * 메인 경로 타입
 */
export type MainRoute = keyof typeof MAIN_ROUTES;
