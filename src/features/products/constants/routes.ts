/**
 * Products 도메인 경로 상수
 *
 * @description
 * - URL 경로를 중앙 집중식으로 관리하여 유지보수성 향상
 * - 타입 안전성 확보
 * - URL 변경 시 이 파일만 수정하면 전체 적용
 *
 * @example
 * ```typescript
 * import { PRODUCTS_ROUTES } from '@/features/products/constants/routes';
 *
 * // 상수 사용
 * router.push(PRODUCTS_ROUTES.LIST);
 *
 * // 쿼리 파라미터와 결합
 * router.push(`${PRODUCTS_ROUTES.DETAIL}?id=${id}`);
 * ```
 *
 * @migration
 * Before: router.push(`/sample/products/List`)
 * After:  router.push(PRODUCTS_ROUTES.LIST)
 */

/**
 * Products 도메인 경로 상수
 */
export const PRODUCTS_ROUTES = {
  /** 기본 경로 */
  BASE: '/sample/products',

  /** 제품 목록 페이지 */
  LIST: '/sample/products/List',

  /** 제품 상세 페이지 */
  DETAIL: '/sample/products/Detail',

  /** 제품 등록 페이지 */
  NEW: '/sample/products/New',

  /** 제품 수정 페이지 */
  EDIT: '/sample/products/Edit',
} as const;

/**
 * Products 경로 타입
 *
 * @description
 * 모든 경로 상수의 유니온 타입
 */
export type ProductsRoute = typeof PRODUCTS_ROUTES[keyof typeof PRODUCTS_ROUTES];
