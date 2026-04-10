/**
 * Customer Service
 *
 * RTK Query로 고객 관련 API 요청 처리
 *
 * @description
 * POC 도메인의 고객 관련 API 호출을 담당하는 서비스 계층
 * - 고객 목록 조회
 * - 자동 캐싱 및 재검증 전략
 *
 * @architecture
 * - 빈 API 슬라이스에 injectEndpoints로 동적 추가
 * - 코드 분할로 초기 번들 크기 최적화
 */

import type { GetCustomersParams } from '../types/customerTypes';

import { emptyApi } from '@/redux/api/emptyApi';

// ============================================================================
// CUSTOMER SERVICE (injectEndpoints)
// ============================================================================

/**
 * POC 도메인 전용 API Service
 *
 * @description
 * 빈 API 슬라이스에 injectEndpoints로 고객 관련 endpoint 추가
 * - 필요할 때만 로드되어 초기 번들 최적화
 */
export const customerService = emptyApi.injectEndpoints({
  // overrideExisting: false,

  endpoints: (builder) => ({
    /**
     * 고객 목록 조회
     * GET /api/poc/customers
     *
     * @param params - 검색 필터, 정렬 파라미터
     * @returns 고객 목록
     */
    getCustomers: builder.query({
      query: (params: GetCustomersParams | void) => {
        if (!params) return '/poc/customers';

        const searchParams = new URLSearchParams();

        // 정렬
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

        // 필터 (JSON 문자열로 전달)
        if (params.filters) {
          searchParams.append('filters', JSON.stringify(params.filters));
        }

        return `/poc/customers?${searchParams.toString()}`;
      },
      providesTags: ['Customers-LIST'],
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Customer Service 자동 생성된 React Hooks
 *
 * RTK Query가 자동으로 생성하는 hooks를 export 합니다:
 * - useGetCustomersQuery: 고객 목록 조회
 */
export const { useGetCustomersQuery, useLazyGetCustomersQuery } = customerService;
