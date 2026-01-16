import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/shared/lib/axios/axiosBaseQuery';

import type {
  ChangePasswordInput,
  LoginInput,
  RefreshTokenInput,
  RegisterInput,
  UpdateProfileInput,
} from '../types/api';

// ============================================================================
// AUTH API SLICE
// ============================================================================

/**
 * Auth 도메인 전용 API Slice
 *
 * @description
 * RTK Query + Axios 조합으로 인증 기능 관리
 */
export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),

  // Auth 도메인 전용 캐시 태그
  // 캐시 태그 (데이터 무효화용)
  tagTypes: ['Auth-SESSION', 'Auth-PROFILE'] as const,

  // Auth 전용 캐시 설정
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  // 엔드포인트 정의
  endpoints: (builder) => ({
    /**
     * 사용자 로그인
     * POST /api/auth/login
     */
    login: builder.mutation({
      query: (credentials: LoginInput) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth-SESSION'],
    }),

    /**
     * 사용자 로그아웃
     * POST /api/auth/logout
     */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth-SESSION', 'Auth-PROFILE'],
    }),

    /**
     * 사용자 회원가입
     * POST /api/auth/register
     */
    register: builder.mutation({
      query: (userData: RegisterInput) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    /**
     * 토큰 갱신
     * POST /api/auth/refresh
     */
    refreshToken: builder.mutation({
      query: ({ refreshToken }: RefreshTokenInput) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),

    /**
     * 사용자 프로필 조회
     * GET /api/auth/profile
     */
    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['Auth-PROFILE'],
      keepUnusedDataFor: 300, // 5분 캐시
    }),

    /**
     * 사용자 프로필 수정
     * PATCH /api/auth/profile
     */
    updateProfile: builder.mutation({
      query: (data: UpdateProfileInput) => ({
        url: '/auth/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Auth-PROFILE'],
    }),

    /**
     * 비밀번호 변경
     * POST /api/auth/change-password
     */
    changePassword: builder.mutation({
      query: (data: ChangePasswordInput) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    /**
     * 비밀번호 찾기 요청 (이메일 발송)
     * POST /api/auth/forgot-password
     */
    forgotPassword: builder.mutation({
      query: ({ email }: { email: string }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),

    /**
     * 비밀번호 재설정 (토큰으로)
     * POST /api/auth/reset-password
     */
    resetPassword: builder.mutation({
      query: (data: { token: string; newPassword: string; confirmPassword: string }) => ({
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
 * Auth API 자동 생성된 React Hooks
 */
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
