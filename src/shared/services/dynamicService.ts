/**
 * Dynamic API Service
 *
 * RTK Query로 동적 API 요청 처리
 *
 * @description
 * 런타임에 URL, 파라미터, 메서드를 전달하여 유연하게 API를 호출하는 공통 서비스
 * - 미리 정의되지 않은 endpoint 호출
 * - 커스텀 URL, 파라미터 처리
 * - 모든 service에서 재사용 가능
 *
 * @warning
 * 이 service는 "escape hatch"로 설계되었습니다.
 *
 * ⚠️ 사용을 권장하지 않는 경우:
 * - 핵심 비즈니스 로직 (로그인, 제품 CRUD 등)
 * - 자주 호출되는 API
 * - 팀에서 공유하는 표준 endpoint
 *
 * ✅ 적합한 사용 cases:
 * - 프로토타이핑, 빠른 테스트
 * - 드물게 사용되는 일회성 endpoint
 * - 동적으로 결정되는 경로 (`/api/files/${dynamicPath}`)
 *
 * @example
 * ```tsx
 * // GET 요청
 * const { data } = useDynamicQuery({ url: '/custom/endpoint' });
 *
 * // POST 요청 - 명시적 타입 단언 사용
 * const [mutation] = useDynamicMutation();
 *
 * const handleSubmit = async () => {
 *   // 타입 단언: API 응답 구조를 명확히 알 때만 사용
 *   const result = await mutation({
 *     url: '/custom/action',
 *     method: 'POST',
 *     body: { data: 'value' }
 *   }).unwrap() as { user: User };
 *
 *   result.user; // User
 * };
 * ```
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiConfig } from '@/shared/lib/rtk-query/createApiConfig';

// ============================================================================
// TYPES
// ============================================================================

/**
 * 동적 쿼리 요청 설정
 */
export interface DynamicQueryConfig {
  /** 요청 URL (절대 경로 또는 상대 경로) */
  url: string;
  /** 쿼리 파라미터 */
  params?: Record<string, string | number | boolean | undefined>;
  /** 캐시 태그 (선택) */
  tag?: string;
}

/**
 * 동적 뮤테이션 요청 설정
 */
export interface DynamicMutationConfig {
  /** 요청 URL (절대 경로 또는 상대 경로) */
  url: string;
  /** HTTP 메서드 */
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  /** 요청 바디 */
  body?: unknown;
  /** 쿼리 파라미터 */
  params?: Record<string, string | number | boolean | undefined>;
  /** 무효화할 태그 (선택) */
  invalidateTags?: Array<{ type: string; id?: string | number }>;
}

// ============================================================================
// DYNAMIC SERVICE
// ============================================================================

/**
 * 동적 API Service
 *
 * 미리 정의되지 않은 endpoint를 런타임에 호출할 수 있는 공통 서비스
 */
export const dynamicService = createApi({
  ...createApiConfig({
    reducerPath: 'dynamicService',
    tagTypes: ['Dynamic'] as const,
  }),

  endpoints: (builder) => ({
    /**
     * 동적 쿼리 (GET 요청)
     *
     * @description
     * 런타임에 URL과 파라미터를 전달하여 유연하게 GET 요청을 수행합니다.
     */
    fetch: builder.query<unknown, DynamicQueryConfig>({
      query: (config) => {
        const { url, params } = config;
        if (!params || Object.keys(params).length === 0) {
          return url;
        }

        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, String(value));
          }
        });

        return `${url}?${searchParams.toString()}`;
      },
      providesTags: (_result, _error, arg) => (arg.tag ? [{ type: 'Dynamic' as const, id: arg.tag }] : []),
    }),

    /**
     * 동적 뮤테이션 (POST/PATCH/PUT/DELETE 요청)
     *
     * @description
     * 런타임에 URL, 메서드, 데이터를 전달하여 유연하게 변경 요청을 수행합니다.
     */
    execute: builder.mutation<unknown, DynamicMutationConfig>({
      query: (config) => {
        const { url, method, body, params } = config;

        const queryConfig: {
          url: string;
          method: string;
          body?: unknown;
          params?: Record<string, string | number | boolean | undefined>;
        } = {
          url,
          method,
        };

        if (body) {
          queryConfig.body = body;
        }

        if (params && Object.keys(params).length > 0) {
          queryConfig.params = params;
        }

        return queryConfig;
      },
      invalidatesTags: (_result, _error, arg) =>
        (arg.invalidateTags ?? []) as Array<{ type: 'Dynamic'; id?: string | number }>,
    }),
  }),
});

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

/**
 * 동적 쿼리 Hook
 *
 * @description
 * GET 요청을 위한 Hook
 */
export const useDynamicQuery = dynamicService.useFetchQuery;

/**
 * 동적 뮤테이션 Hook
 *
 * @description
 * POST/PATCH/PUT/DELETE 요청을 위한 Hook
 *
 * @example
 * ```tsx
 * const [mutation] = useDynamicMutation();
 *
 * const handleSubmit = async () => {
 *   // 명시적 타입 단언 사용 (API 응답 구조를 정확히 알 때만)
 *   const result = await mutation({
 *     url: '/custom/action',
 *     method: 'POST',
 *     body: { data: 'value' }
 *   }).unwrap() as { success: boolean; id: string };
 *
 *   console.log(result.id); // 타입 안전
 * };
 * ```
 */
export const useDynamicMutation = dynamicService.useExecuteMutation;

// ============================================================================
// RAW API EXPORT (서비스 레이어용)
// ============================================================================

/**
 * Raw Dynamic API
 *
 * @description
 * React 컴포넌트 외부(서비스 레이어, 유틸리티 등)에서 직접 API 호출이 필요할 때 사용
 *
 * @example
 * ```ts
 * import { dynamicApi } from '@/shared/services/dynamicService';
 * import type { RootState } from '@/redux';
 *
 * export const fetchCustomData = async (
 *   id: string,
 *   getState: () => RootState
 * ) => {
 *   const result = await dynamicApi.fetch.initiate(
 *     { url: `/custom/${id}`, params: { detailed: true } },
 *     { getState }
 *   );
 *
 *   if (result.error) {
 *     throw new Error('Request failed');
 *   }
 *
 *   return result.data as CustomResponse;
 * };
 * ```
 */
export const dynamicApi = dynamicService.endpoints;
