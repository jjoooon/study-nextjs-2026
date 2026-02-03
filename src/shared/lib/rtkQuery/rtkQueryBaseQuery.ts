/**
 * FetchBaseQuery for RTK Query
 *
 * @description
 * 쿠키 기반 인증을 위한 RTK Query fetchBaseQuery 구현
 * - fetch API 사용 (RTK Query 표준 방식)
 * - TypeScript 완벽 호환
 * - RTK Query의 모든 기능 유지
 * - 401 에러 시 자동 로그아웃
 *
 * @architecture
 * - fetchBaseQuery 기반: RTK Query 표준 방식
 * - credentials: include로 쿠키 자동 전송
 * - 타입 안전성: TypeScript 타입 정의
 *
 * @usage
 * import { baseQuery } from '@/shared/lib/rtkQuery/rtkQueryBaseQuery';
 *
 * export const apiSlice = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({ ... })
 * });
 */

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { publicConfig } from '@/shared/config/env';
import { AUTH_ROUTES } from '@/shared/constants/routes';
import { clearCredentials } from '@/shared/store/authSlice';

// ============================================================================
// TYPES
// ============================================================================

/**
 * BaseQuery 타입 정의
 */
type BaseQueryType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, object>;

// ============================================================================
// BASE QUERY
// ============================================================================

/**
 * 내부 fetchBaseQuery 인스턴스
 *
 * @description
 * 쿠키 기반 인증을 위한 기본 fetchBaseQuery
 * - credentials: include로 쿠키 자동 전송
 * - MSW 테스트를 위해 쿠키를 Cookie 헤더에 수동 추가
 */
const internalBaseQuery = fetchBaseQuery({
  baseUrl: publicConfig.apiUrl,
  // HttpOnly Cookie 자동 전송을 위한 credentials 설정
  credentials: 'include',
  // MSW 테스트를 위해 쿠키를 수동으로 Cookie 헤더에 추가
  prepareHeaders: (headers) => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie;
      if (cookies) {
        headers.set('Cookie', cookies);
      }
    }

    return headers;
  },
});

/**
 * 쿠키 기반 인증 BaseQuery Wrapper
 *
 * @description
 * 401 에러 발생 시 자동으로 로그아웃 처리합니다.
 *
 * @flow
 * 1. 요청 실행
 * 2. 401 에러 발생 시 로그아웃 처리
 * 3. 쿠키 삭제 및 로그인 페이지로 리다이렉트
 */
export const baseQueryWithReauth: BaseQueryType = async (args, api, extraOptions) => {
  // 요청 실행
  const result = await internalBaseQuery(args, api, extraOptions);

  // 401 에러인 경우 로그아웃 처리
  if (result.error && result.error.status === 401) {
    api.dispatch(clearCredentials());

    // 쿠키 삭제
    if (typeof document !== 'undefined') {
      document.cookie = 'InitechEamERCD=; Max-Age=0; Path=/; SameSite=lax';
      document.cookie = 'InitechEamUID=; Max-Age=0; Path=/; SameSite=lax';
      document.cookie = 'InitechEamUIP=; Max-Age=0; Path=/; SameSite=lax';
      document.cookie = 'InitechEamUPID=; Max-Age=0; Path=/; SameSite=lax';
      document.cookie = 'InitechEamUTOA=; Max-Age=0; Path=/; SameSite=lax';
      document.cookie = 'InitechEamUHMAC=; Max-Age=0; Path=/; SameSite=lax';
      document.cookie = 'InitechEamULAT=; Max-Age=0; Path=/; SameSite=lax';
    }

    // 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = AUTH_ROUTES.LOGIN;
    }
  }

  return result;
};

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * 기본 BaseQuery (쿠키 기반 인증)
 *
 * @description
 * 모든 API service에서 사용하는 기본 baseQuery
 * - 401 에러 시 자동 로그아웃
 * - 쿠키 자동 전송
 *
 * @example
 * import { baseQuery } from '@/shared/lib/rtkQuery/rtkQueryBaseQuery';
 *
 * export const myApi = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({ ... })
 * });
 */
export const baseQuery = baseQueryWithReauth;

/**
 * Default Export
 *
 * @description
 * 쿠키 기반 인증 baseQuery가 기본값입니다
 */
export default baseQuery;
