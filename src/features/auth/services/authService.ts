/**
 * Auth Service
 *
 * RTK Query로 인증 관련 API 요청 처리
 *
 * @description
 * Auth 도메인의 모든 API 호출을 담당하는 서비스 계층
 * - 로그인, 로그아웃, 토큰 갱신 등 인증 관련 기능
 * - MSW로 모킹되어 개발 및 테스트에 활용
 * - 실제 백엔드 연동 시 코드 변경 불필요
 *
 * @architecture
 * - RTK Query for data fetching
 * - Automatic caching & revalidation
 * - Type-safe API responses
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';

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
  reducerPath: 'authService',
  baseQuery,

  // Auth 도메인 전용 캐시 태그
  tagTypes: ['Auth'] as const,

  endpoints: (builder) => ({
    /**
     * 로그인
     * POST /api/auth/login
     *
     * @param credentials - 사용자 자격증명
     * @returns 토큰 및 사용자 정보
     */
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
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
     * 토큰 갱신
     * POST /api/auth/refresh
     *
     * @description
     * - refreshToken은 HttpOnly Cookie에서 자동 전송됨
     * - 별도로 파라미터 전달 불필요
     * - skipReauth: true로 토큰 갱신 로직 건너뜀 (무한 루프 방지)
     *
     * @returns 새로운 accessToken
     */
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
        // 쿠키는 withCredentials: true로 자동 전송
      }),
      extraOptions: {
        skipReauth: true, // 토큰 갱신 엔드포인트는 재갱신하지 않음
      },
    }),

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
 * - useRefreshTokenMutation: 토큰 갱신
 * - useForgotPasswordMutation: 비밀번호 찾기
 * - useResetPasswordMutation: 비밀번호 재설정
 */
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authService;
