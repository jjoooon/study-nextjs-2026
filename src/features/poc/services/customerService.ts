/**
 * Customer Service
 *
 * RTK Query로 고객 관련 API 요청 처리
 *
 * @description
 * POC 도메인의 고객 관련 API 호출을 담당하는 서비스 계층
 * - 고객 목록 조회
 * - 자동 캐싱 및 재검증 전략
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiConfig } from '@/shared/lib/rtkQuery/createApiConfig';

import type { GetCustomersParams } from '../types/customerTypes';

// ============================================================================
// CUSTOMER SERVICE
// ============================================================================

/**
 * POC 도메인 전용 API Service
 *
 * RTK Query를 사용하여 고객 관련 API 엔드포인트를 정의하고
 * 자동으로 Redux hooks를 생성합니다.
 */
export const customerService = createApi({
  ...createApiConfig({
    reducerPath: 'pocCustomerService',
    tagTypes: ['Customers-LIST'],
  }),

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
