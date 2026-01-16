/**
 * Authentication Service
 *
 * RTK Query로 인증 관련 API 요청 처리
 *
 * @description
 * Auth 도메인의 모든 API 호출을 담당하는 서비스 계층
 * - 로그인, 로그아웃, 회원가입
 * - 토큰 갱신, 프로필 관리
 * - 비밀번호 찾기/재설정
 * - 자동 캐싱 및 재검증 전략
 */

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
// AUTH SERVICE
// ============================================================================

/**
 * Auth 도메인 전용 API Service
 *
 * RTK Query를 사용하여 인증 관련 API 엔드포인트를 정의하고
 * 자동으로 Redux hooks를 생성합니다.
 *
 * @architecture
 * - axiosBaseQuery: Axios의 강력한 기능 활용
 * - RTK Query: 자동 캐싱, 리패칭, 태그 무효화
 *
 * @benefits
 * ✅ Axios 인터셉터로 자동 토큰 주입
 * ✅ 통일된 에러 처리
 * ✅ 타임아웃 및 재시도 설정
 * ✅ RTK Query의 자동화 기능 유지
 */
export const authService = createApi({
  reducerPath: 'authService',
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
     *
     * @param credentials - 로그인 자격 증명
     * @returns 인증 토큰 및 사용자 정보
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
     *
     * @returns 로그아웃 결과
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
     *
     * @param userData - 회원가입 데이터
     * @returns 생성된 사용자 정보
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
     *
     * @param refreshToken - 리프레시 토큰
     * @returns 새로운 액세스 토큰
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
     *
     * @returns 사용자 프로필 정보
     */
    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['Auth-PROFILE'],
      keepUnusedDataFor: 300, // 5분 캐시
    }),

    /**
     * 사용자 프로필 수정
     * PATCH /api/auth/profile
     *
     * @param data - 수정할 프로필 데이터
     * @returns 수정된 프로필 정보
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
     *
     * @param data - 현재 비밀번호와 새 비밀번호
     * @returns 비밀번호 변경 결과
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
     *
     * @param email - 사용자 이메일
     * @returns 이메일 발송 결과
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
     *
     * @param data - 재설정 토큰과 새 비밀번호
     * @returns 비밀번호 재설정 결과
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
 * Auth Service 자동 생성된 React Hooks
 *
 * RTK Query가 자동으로 생성하는 hooks를 export 합니다:
 * - useLoginMutation: 로그인
 * - useLogoutMutation: 로그아웃
 * - useRegisterMutation: 회원가입
 * - useRefreshTokenMutation: 토큰 갱신
 * - useGetProfileQuery: 프로필 조회
 * - useUpdateProfileMutation: 프로필 수정
 * - useChangePasswordMutation: 비밀번호 변경
 * - useForgotPasswordMutation: 비밀번호 찾기
 * - useResetPasswordMutation: 비밀번호 재설정
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
} = authService;
