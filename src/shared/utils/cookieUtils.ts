/**
 * Cookie Utilities
 *
 * @description
 * 쿠키 조작을 위한 순수 유틸리티 함수
 * - cookies-next 라이브러리 기반
 * - 클라이언트/서버 환경 모두 지원
 *
 * @usage
 * import { getCookieValue, setCookieValue, deleteCookieValue } from '@/shared/utils/cookieUtils';
 *
 * const token = getCookieValue('session_token');
 * setCookieValue('theme', 'dark', { maxAge: 60 * 60 * 24 * 365 });
 * deleteCookieValue('theme', { path: '/' });
 */

import { deleteCookie, getCookie, setCookie } from 'cookies-next';

// ============================================================================
// TYPES
// ============================================================================

/**
 * 쿠키 옵션
 */
export type CookieOptions = Parameters<typeof setCookie>[2];

// ============================================================================
// GET
// ============================================================================

/**
 * 쿠키 값 조회
 *
 * @param name - 쿠키 이름
 * @returns 쿠키 값 또는 undefined
 *
 * @example
 * const token = getCookieValue('session_token');
 */
export function getCookieValue(name: string): string | undefined {
  return getCookie(name) as string | undefined;
}

// ============================================================================
// SET
// ============================================================================

/**
 * 쿠키 설정
 *
 * @param name - 쿠키 이름
 * @param value - 쿠키 값
 * @param options - 쿠키 옵션 (선택)
 *
 * @example
 * setCookieValue('theme', 'dark', { maxAge: 60 * 60 * 24 * 365 });
 */
export function setCookieValue(name: string, value: string, options?: CookieOptions): void {
  setCookie(name, value, options);
}

// ============================================================================
// DELETE
// ============================================================================

/**
 * 쿠키 삭제
 *
 * @param name - 쿠키 이름
 * @param options - 쿠키 옵션 (선택, path 일치 중요)
 *
 * @example
 * deleteCookieValue('theme', { path: '/' });
 */
export function deleteCookieValue(name: string, options?: CookieOptions): void {
  deleteCookie(name, options);
}

/**
 * 여러 쿠키 일괄 삭제
 *
 * @param names - 쿠키 이름 배열
 * @param options - 쿠키 옵션 (선택)
 *
 * @example
 * deleteCookieValues(['cookie1', 'cookie2'], { path: '/' });
 */
export function deleteCookieValues(names: string[], options?: CookieOptions): void {
  names.forEach((name) => deleteCookie(name, options));
}
