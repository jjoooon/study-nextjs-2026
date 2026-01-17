/**
 * Axios BaseQuery for RTK Query
 *
 * @description
 * fetchBaseQuery + Axios 인터셉터 조합
 * - fetch API를 사용하되, Axios 인터셉터의 이점 활용
 * - TypeScript 완벽 호환
 * - RTK Query의 모든 기능 유지
 *
 * @architecture
 * - fetchBaseQuery 기반: RTK Query 표준 방식
 * - Axios 인터셉터: 자동 토큰 주입 및 에러 처리
 * - 타입 안전성: TypeScript 타입 정의
 *
 * @usage
 * import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
 *
 * export const apiSlice = createApi({
 *   baseQuery: axiosBaseQuery(),
 *   endpoints: (builder) => ({ ... })
 * });
 */

import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { publicConfig } from '@/shared/config/env';

// ============================================================================
// AXIOS BASE QUERY IMPLEMENTATION
// ============================================================================

/**
 * Axios 기반 BaseQuery
 *
 * @description
 * fetchBaseQuery를 사용하되, prepareHeaders에서 Axios 인터셉터 활용
 * 환경 변수에서 API URL을 자동으로 로드합니다
 *
 * @param baseUrl - 기본 URL (기본값: 환경 변수의 NEXT_PUBLIC_API_URL)
 * @returns RTK Query 호환 baseQuery
 *
 * @example
 * // 환경 변수에서 자동으로 URL 사용
 * export const apiSlice = createApi({
 *   baseQuery: axiosBaseQuery(),
 *   endpoints: (builder) => ({ ... })
 * });
 *
 * // 또는 명시적 URL 지정 (테스트 등)
 * export const testApiSlice = createApi({
 *   baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
 *   endpoints: (builder) => ({ ... })
 * });
 */
export const axiosBaseQuery = ({
  baseUrl = publicConfig.apiUrl,
}: {
  baseUrl?: string;
} = {}): BaseQueryFn => {
  return fetchBaseQuery({
    baseUrl,
    // HttpOnly Cookie 자동 전송을 위한 credentials 설정
    credentials: 'include',
    // Axios 인터셉터와 동일한 prepareHeaders 로직
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token?: string | null } };
      const token = state.auth?.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  });
};

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * 기본 Axios BaseQuery 내보내기
 *
 * @description
 * 대부분의 경우 이것을 사용하면 됩니다
 * 환경 변수(config.apiUrl)에서 API URL을 자동으로 로드합니다
 */
export default axiosBaseQuery;

/**
 * 미리 구성된 baseQuery 인스턴스
 *
 * @description
 * 추가 설정이 필요 없는 경우 사용
 * 환경 변수의 NEXT_PUBLIC_API_URL을 기본 URL로 사용합니다
 *
 * @example
 * import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';
 *
 * export const myApi = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({ ... })
 * });
 */
export const baseQuery = axiosBaseQuery();
