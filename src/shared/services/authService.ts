/**
 * Auth Service
 *
 * RTK Query로 인증 관련 API 요청 처리
 *
 * @description
 * Auth 도메인의 모든 API 호출을 담당하는 서비스 계층
 * - 로그인, 로그아웃 등 인증 관련 기능
 * - 쿠키 기반 세션 인증
 * - MSW로 모킹되어 개발 및 테스트에 활용
 * - 실제 백엔드 연동 시 코드 변경 불필요
 *
 * @architecture
 * - RTK Query for data fetching
 * - Automatic caching & revalidation
 * - Type-safe API responses
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiConfig } from '@/shared/lib/rtkQuery/createApiConfig';

// ============================================================================
// AUTH SERVICE
// ============================================================================

/**
 * Auth 도메인 전용 API Service
 *
 * RTK Query를 사용하여 인증 관련 API 엔드포인트를 정의하고
 * 자동으로 Redux hooks를 생성합니다.
 *
 * @baseQueryStrategy
 * - 모든 엔드포인트: baseQuery (자동 토큰 갱신)
 * - refreshToken만: skipReauth 옵션으로 갱신 방지
 */
export const authService = createApi({
  ...createApiConfig({
    reducerPath: 'authService',
    tagTypes: ['Auth'],
  }),

  endpoints: (builder) => ({
    /**
     * 로그인
     * POST /api/auth/login
     *
     * @param credentials - 사용자 자격증명 (사번, 비밀번호)
     * @returns 사용자 정보 (세션 쿠키는 자동 설정됨)
     */
    login: builder.mutation({
      query: (credentials: { employeeId: string; password: string }) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * 로그아웃
     * POST /api/auth/logout
     *
     * @returns 로그아웃 결과
     */
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * 현재 사용자 정보 조회
     * GET /api/auth/me
     *
     * @returns 현재 로그인된 사용자 정보
     */
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),

    /**
     * 토큰 갱신 (제거됨)
     *
     * @description
     * 쿠키 기반 인증에서는 토큰 갱신이 필요 없습니다.
     * 세션 쿠키의 유효기간 동안 자동으로 인증이 유지됩니다.
     *
     * @deprecated
     * 쿠키 기반 인증으로 변경되어 사용하지 않습니다.
     */
    // refreshToken: builder.mutation({ ... }), // 제거됨

    /**
     * 비밀번호 찾기 (이메일 발송)
     * POST /api/auth/forgot-password
     *
     * @param email - 사용자 이메일
     * @returns 이메일 발송 결과
     */
    forgotPassword: builder.mutation({
      query: (email: string) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    /**
     * 비밀번호 재설정
     * POST /api/auth/reset-password
     *
     * @param data - 토큰과 새 비밀번호
     * @returns 비밀번호 재설정 결과
     */
    resetPassword: builder.mutation({
      query: (data: { token: string; newPassword: string }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Auth Service 자동 생성된 React Hooks
 *
 * RTK Query가 자동으로 생성하는 hooks를 export 합니다:
 * - useLoginMutation: 로그인
 * - useLogoutMutation: 로그아웃
 * - useGetMeQuery: 사용자 정보 조회
 * - useForgotPasswordMutation: 비밀번호 찾기
 * - useResetPasswordMutation: 비밀번호 재설정
 */
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authService;
