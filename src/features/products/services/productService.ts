/**
 * Product Service
 *
 * RTK Query로 제품 관련 API 요청 처리
 *
 * @description
 * Products 도메인의 모든 API 호출을 담당하는 서비스 계층
 * - 제품 목록 조회, 상세 조회
 * - 제품 생성, 수정, 삭제
 * - 자동 캐싱 및 재검증 전략
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiConfig } from '@/shared/lib/rtk-query/createApiConfig';

import type { CreateProductInput, ProductListParams, UpdateProductInput } from '../types/apiTypes';

// ============================================================================
// PRODUCT SERVICE
// ============================================================================

/**
 * Products 도메인 전용 API Service
 *
 * RTK Query를 사용하여 제품 관련 API 엔드포인트를 정의하고
 * 자동으로 Redux hooks를 생성합니다.
 */
export const productService = createApi({
  ...createApiConfig({
    reducerPath: 'productsService',
    tagTypes: ['Products-LIST', 'Products-ITEM'],
  }),

  endpoints: (builder) => ({
    /**
     * 제품 목록 조회
     * GET /api/products
     *
     * @param params - 페이지네이션, 정렬, 필터링 파라미터
     * @returns 제품 목록
     */
    getProducts: builder.query({
      query: (params: ProductListParams | void) => {
        if (!params) return '/products';

        const searchParams = new URLSearchParams();

        // 페이지네이션
        if (params.page) searchParams.append('page', String(params.page));
        if (params.pageSize) searchParams.append('pageSize', String(params.pageSize));

        // 정렬
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

        // 필터
        if (params.search) searchParams.append('search', params.search);
        if (params.status) searchParams.append('status', params.status);
        if (params.category) searchParams.append('category', params.category);

        return `/products?${searchParams.toString()}`;
      },
      providesTags: ['Products-LIST'],
      keepUnusedDataFor: 300, // 5분 캐시
    }),

    /**
     * 제품 상세 조회
     * GET /api/products/:id
     *
     * @param id - 제품 ID
     * @returns 제품 상세 정보
     */
    getProductById: builder.query({
      query: (id: number) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products-ITEM', id }],
      keepUnusedDataFor: 600, // 10분 캐시
    }),

    /**
     * 제품 생성
     * POST /api/products
     *
     * @param product - 생성할 제품 데이터
     * @returns 생성된 제품 정보
     */
    createProduct: builder.mutation({
      query: (product: CreateProductInput) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products-LIST'],
    }),

    /**
     * 제품 수정
     * PATCH /api/products/:id
     *
     * @param id - 제품 ID
     * @param data - 수정할 제품 데이터
     * @returns 수정된 제품 정보
     */
    updateProduct: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateProductInput }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Products-LIST', { type: 'Products-ITEM', id }],
    }),

    /**
     * 제품 삭제
     * DELETE /api/products/:id
     *
     * @param id - 제품 ID
     * @returns 삭제 결과
     */
    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => ['Products-LIST', { type: 'Products-ITEM', id }],
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Product Service 자동 생성된 React Hooks
 *
 * RTK Query가 자동으로 생성하는 hooks를 export 합니다:
 * - useGetProductsQuery: 제품 목록 조회
 * - useGetProductByIdQuery: 제품 상세 조회
 * - useCreateProductMutation: 제품 생성
 * - useUpdateProductMutation: 제품 수정
 * - useDeleteProductMutation: 제품 삭제
 */
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productService;
