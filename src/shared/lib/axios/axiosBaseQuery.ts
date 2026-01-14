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

// ============================================================================
// AXIOS BASE QUERY IMPLEMENTATION
// ============================================================================

/**
 * Axios 기반 BaseQuery
 *
 * @description
 * fetchBaseQuery를 사용하되, prepareHeaders에서 Axios 인터셉터 활용
 *
 * @param baseUrl - 기본 URL (기본값: '/api')
 * @returns RTK Query 호환 baseQuery
 */
export const axiosBaseQuery = ({
  baseUrl = '/api',
}: {
  baseUrl?: string;
} = {}): BaseQueryFn => {
  return fetchBaseQuery({
    baseUrl,
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
 */
export default axiosBaseQuery;

/**
 * 미리 구성된 baseQuery 인스턴스
 *
 * @description
 * 추가 설정이 필요 없는 경우 사용
 */
export const baseQuery = axiosBaseQuery();
