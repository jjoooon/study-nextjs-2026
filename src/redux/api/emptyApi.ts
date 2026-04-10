/**
 * Empty API Slice
 *
 * @description
 * RTK Query 코드 분할을 위한 빈 API 슬라이스
 *
 * @architecture
 * - 빈 상태로 초기 번들에 포함
 * - 각 feature에서 injectEndpoints로 동적 추가
 * - 중앙 집중식 캐싱 및 태그 관리
 *
 * @benefits
 * ✅ 초기 번들 크기 최소화
 * ✅ 필요한 endpoint만 로드
 * ✅ 코드 분할로 성능 최적화
 * ✅ 타입 안전성 유지
 *
 * @usage
 * // feature 서비스에서 injectEndpoints 사용
 * import { emptyApi } from '@/redux/api/emptyApi';
 *
 * export const productService = emptyApi.injectEndpoints({
 *   endpoints: (builder) => ({
 *     getProducts: builder.query({ query: () => '/products' }),
 *   }),
 * });
 *
 * @see
 * - https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';

// ============================================================================
// EMPTY API SLICE
// ============================================================================

/**
 * 빈 API 슬라이스
 *
 * @description
 * 코드 분할을 위한 기본 API 슬라이스
 * - 초기 번들에는 이것만 포함됨
 * - 각 feature에서 필요한 endpoint를 동적으로 주입
 *
 * @note
 * - tagTypes: 모든 feature의 태그를 미리 정의
 * - reducerPath: 통합 API 관리를 위해 'api' 사용
 */
export const emptyApi = createApi({
  reducerPath: 'api',

  baseQuery,

  /**
   * 캐시 태그 정의
   *
   * @description
   * 모든 feature의 태그를 미리 정의하여 캐시 무효화 지원
   *
   * @note
   * 새 feature 추가 시 여기에 태그를 추가해야 함
   */
  tagTypes: [
    // Core Tags
    'Auth',

    // Dashboard Tags
    'Dashboard',

    // Products Tags
    'Products-LIST',
    'Products-ITEM',

    // Customers Tags
    'Customers-LIST',

    // Dynamic Tags (런타임 생성용)
    'Dynamic',
  ],

  /**
   * 빈 엔드포인트
   *
   * @description
   * injectEndpoints로 동적으로 추가됨
   */
  endpoints: () => ({}),
});

// ============================================================================
// RE-EXPORTS
// ============================================================================

/**
 * Empty API 타입 export
 *
 * @description
 * 다른 파일에서 타입 참조용
 */
export type { Api } from '@reduxjs/toolkit/query/react';
