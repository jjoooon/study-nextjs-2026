/**
 * Axios BaseQuery for RTK Query
 *
 * @description
 * 쿠키 기반 인증을 위한 RTK Query BaseQuery
 * - Axios 인터셉터로 쿠키 자동 전송
 * - TypeScript 완벽 호환
 * - RTK Query의 모든 기능 유지
 * - 401 에러 시 로그아웃 처리
 * - RTK Query의 `body`와 Axios의 `data` 자동 매핑
 * - 전역 spinner 자동 표시/숨김
 *
 * @architecture
 * - Axios 인스턴스: 글로벌 설정
 * - withCredentials: 쿠키 자동 전송
 * - Request Interceptor: 요청 시 spinner 표시
 * - Response Interceptor: 응답 시 spinner 숨김, 401 에러 시 로그아웃
 * - Body-to-Data 매핑: RTK Query 호환성 보장
 *
 * @usage
 * import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';
 *
 * export const apiSlice = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({
 *     // RTK Query 스타일 (body 사용)
 *     createItem: builder.mutation({
 *       query: (item) => ({
 *         url: '/items',
 *         method: 'POST',
 *         body: item,  // ✅ 자동으로 data로 매핑됨
 *         showSpinner: true,  // ✅ spinner 표시 옵션
 *       }),
 *     }),
 *   })
 * });
 *
 * @see
 * - authService: @/shared/services/authService - 사용 예시
 * - authSlice: @/shared/store/authSlice - Auth 상태 관리
 * - spinnerSlice: @/shared/store/spinnerSlice - Spinner 상태 관리
 * - MSW Handlers: @/mocks/handlers/auth.ts - 개발용 API 모킹
 * - RTK Query Docs: https://redux-toolkit.js.org/rtk-query/api/createApi
 * - Axios Interceptors: https://axios-http.com/docs/interceptors
 */

import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosInstance, Method } from 'axios';

import { publicConfig } from '@/shared/config/env';
import { clearCredentials } from '@/shared/store/authSlice';
import { hideSpinner, showSpinner } from '@/shared/store/spinnerSlice';
import { deleteCookieValues } from '@/shared/utils/cookieUtils';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Axios 요청 메타데이터
 */
export interface AxiosRequestMeta {
  /** spinner 표시 여부 (기본: false) */
  showSpinner?: boolean;
  /** spinner 메시지 */
  spinnerMessage?: string;
  /** 최소 표시 시간 (ms) */
  minDuration?: number;
}

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

/**
 * Axios 인스턴스 생성
 *
 * @description
 * 쿠키 기반 인증을 위한 Axios 인스턴스
 * - withCredentials: true로 쿠키 자동 전송
 * - 401 에러 시 로그아웃 처리
 */
let axiosInstance: AxiosInstance | null = null;

/**
 * Axios 인스턴스 생성 함수
 *
 * @description
 * Redux store를 주입받아 인터셉터 설정
 */
const getAxiosInstance = (getState: () => unknown): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: publicConfig.apiUrl,
      withCredentials: true, // 쿠키 자동 전송
      timeout: 10000, // 10초 타임아웃
    });

    // Response Interceptor: 401 에러 처리
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // 401 에러 시 로그아웃 처리
        if (error.response?.status === 401) {
          // Redux 상태 초기화
          const store = getState() as { dispatch?: (action: unknown) => void };
          if (store.dispatch) {
            store.dispatch(clearCredentials());
          }

          // 인증 쿠키 삭제
          deleteCookieValues(
            [
              'InitechEamERCD',
              'InitechEamUID',
              'InitechEamUIP',
              'InitechEamUPID',
              'InitechEamUTOA',
              'InitechEamUHMAC',
              'InitechEamULAT',
            ],
            { path: '/', sameSite: 'lax' }
          );

          // 로그인 페이지로 리다이렉트
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return axiosInstance;
};

// ============================================================================
// BASE QUERY
// ============================================================================

/**
 * 쿠키 기반 BaseQuery
 *
 * @description
 * 쿠키 인증과 통합된 RTK Query BaseQuery
 * - 401 에러 시 자동 로그아웃
 * - showSpinner 옵션으로 spinner 자동 표시
 * - RTK Query의 body를 Axios의 data로 자동 매핑
 */
const axiosBaseQueryWithReauth: BaseQueryFn = async (args, api) => {
  // Axios 인스턴스 가져오기
  const instance = getAxiosInstance(api.getState);

  // RTK Query의 body를 Axios의 data로 매핑
  const parsedArgs = typeof args === 'string' ? { url: args } : args;
  const { url, method, body, data, params } = parsedArgs;

  // spinner 옵션 추출
  const { showSpinner: showSpinnerOption, spinnerMessage, minDuration } = parsedArgs as AxiosRequestMeta;

  // ✅ spinner 표시 (interceptor 대신 직접 dispatch)
  if (showSpinnerOption) {
    api.dispatch(showSpinner({ message: spinnerMessage, minDuration }));
  }

  // body 우선, data fallback (RTK Query 호환성)
  const requestData = body ?? data;
  const requestMethod = method?.toLowerCase() as Method;

  try {
    const result = await instance({
      url,
      method: requestMethod,
      data: requestData,
      params,
    });

    // ✅ spinner 숨김
    if (showSpinnerOption) {
      api.dispatch(hideSpinner());
    }

    return { data: result.data };
  } catch (error) {
    // ✅ 에러 시에도 spinner 숨김
    if (showSpinnerOption) {
      api.dispatch(hideSpinner());
    }

    if (axios.isAxiosError(error)) {
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data,
        },
      };
    }
    throw error;
  }
};

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * 기본 BaseQuery (쿠키 기반 인증)
 *
 * @description
 * 모든 API service에서 사용하는 기본 baseQuery
 * - 쿠키 자동 전송 (withCredentials: true)
 * - 401 에러 시 자동 로그아웃
 * - showSpinner 옵션으로 spinner 자동 표시
 *
 * @example
 * import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';
 *
 * export const myApi = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({
 *     // Spinner 표시 안함 (기본)
 *     getItems: builder.query({
 *       query: () => '/items',
 *     }),
 *     // Spinner 표시
 *     createItem: builder.mutation({
 *       query: (item) => ({
 *         url: '/items',
 *         method: 'POST',
 *         body: item,
 *         showSpinner: true,
 *       }),
 *     }),
 *     // Spinner와 메시지 표시
 *     uploadFile: builder.mutation({
 *       query: (file) => ({
 *         url: '/upload',
 *         method: 'POST',
 *         body: file,
 *         showSpinner: true,
 *         spinnerMessage: '파일 업로드 중...',
 *       }),
 *     }),
 *   })
 * });
 *
 * @see
 * - authService: @/shared/services/authService - 실제 사용 예시
 * - spinnerSlice: @/shared/store/spinnerSlice - Spinner 상태 관리
 * - RTK Query BaseQuery: https://redux-toolkit.js.org/rtk-query/api/createApi#basequery
 */
export const baseQuery = axiosBaseQueryWithReauth;

/**
 * Default Export
 *
 * @description
 * 쿠키 기반 인증 baseQuery가 기본값입니다
 */
export default baseQuery;
