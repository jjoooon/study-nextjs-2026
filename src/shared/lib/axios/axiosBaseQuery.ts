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
 *         showSpinner: true,  // ✅ spinner 표시 옵션 (기본 true)
 *         spinnerMessage: '생성 중...',  // ✅ 커스텀 메시지
 *         delayShow: 200,  // ✅ 200ms 후 spinner 표시 (기본 100ms)
 *         transparentBackground: true,  // ✅ 투명 배경 (기본 false)
 *         hideLoadingIndicator: false,  // ✅ 로딩 이미지 숨김 (기본 false)
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
  /** spinner 표시 여부 (기본: true) */
  showSpinner?: boolean;
  /** spinner 메시지 */
  spinnerMessage?: string;
  /** spinner 표시 지연 시간 (ms) - 이 시간 내에 완료되면 spinner 미표시 */
  delayShow?: number;
  /** 배경색을 투명하게 할지 여부 */
  transparentBackground?: boolean;
  /** 로딩 이미지(스피너)를 숨길지 여부 */
  hideLoadingIndicator?: boolean;
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
 * - **짧은 요청은 spinner 미표시** (기본 100ms 지연 후 표시)
 * - 기본 메시지: "Loading..."
 * - RTK Query의 body를 Axios의 data로 자동 매핑
 */
const axiosBaseQueryWithReauth: BaseQueryFn = async (args, api) => {
  // Axios 인스턴스 가져오기
  const instance = getAxiosInstance(api.getState);

  // RTK Query의 body를 Axios의 data로 매핑
  const parsedArgs = typeof args === 'string' ? { url: args } : args;
  const { url, method, body, data, params } = parsedArgs;

  // spinner 옵션 추출
  const {
    showSpinner: showSpinnerOption = true,
    spinnerMessage = 'Loading...',
    delayShow = 100, // 기본 100ms: 이 시간 내에 완료되면 spinner 미표시
    transparentBackground = false,
    hideLoadingIndicator = false,
  } = parsedArgs as AxiosRequestMeta;

  // 타이머 참조와 상태 추적
  let spinnerTimer: ReturnType<typeof setTimeout> | null = null;
  let spinnerShown = false; // spinner가 실제로 표시되었는지 추적

  // spinner 표시 지연 함수
  const showSpinnerAfterDelay = () => {
    spinnerTimer = setTimeout(() => {
      spinnerShown = true;
      api.dispatch(
        showSpinner({
          message: spinnerMessage,
          transparentBackground,
          hideLoadingIndicator,
        })
      );
    }, delayShow);
  };

  // spinner 숨김 및 타이머 정리 함수
  const hideSpinnerAndClear = () => {
    // 지연 타이머 정리
    if (spinnerTimer) {
      clearTimeout(spinnerTimer);
      spinnerTimer = null;
    }

    // 아직 spinner가 표시되지 않았으면 바로 숨김 (아직 showSpinner가 dispatch되지 않음)
    if (!spinnerShown) {
      return;
    }

    // 즉시 숨김
    api.dispatch(hideSpinner());
  };

  // body 우선, data fallback (RTK Query 호환성)
  const requestData = body ?? data;
  const requestMethod = method?.toLowerCase() as Method;

  try {
    // spinner 표시 지연 시작
    if (showSpinnerOption) {
      showSpinnerAfterDelay();
    }

    const result = await instance({
      url,
      method: requestMethod,
      data: requestData,
      params,
    });

    // 요청 완료 후 spinner 정리
    hideSpinnerAndClear();

    return { data: result.data };
  } catch (error) {
    // 에러 시에도 spinner 정리
    hideSpinnerAndClear();

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
 * - **기본적으로 spinner 표시** (showSpinner: false로 끌 수 있음)
 * - **기본 메시지: "Loading..."**
 * - **기본 100ms 지연 후 표시** (delayShow로 조절 가능)
 * - **투명 배경 옵션** (transparentBackground: true)
 * - **로딩 이미지 숨김 옵션** (hideLoadingIndicator: true)
 *
 * @example
 * import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';
 *
 * export const myApi = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({
 *     // 기본 spinner 표시 (메시지: "Loading...", 100ms 지연)
 *     getItems: builder.query({
 *       query: () => '/items',
 *     }),
 *     // spinner 끄기
 *     fastQuery: builder.query({
 *       query: () => ({
 *         url: '/fast',
 *         showSpinner: false,  // ❌ spinner 미표시
 *       }),
 *     }),
 *     // 커스텀 메시지 및 시간 설정
 *     createItem: builder.mutation({
 *       query: (item) => ({
 *         url: '/items',
 *         method: 'POST',
 *         body: item,
 *         spinnerMessage: '생성 중...',  // ✅ 커스텀 메시지
 *         delayShow: 200,  // ✅ 200ms 후 표시
 *         transparentBackground: true,  // ✅ 투명 배경
 *         hideLoadingIndicator: false,  // ✅ 로딩 이미지 표시
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
