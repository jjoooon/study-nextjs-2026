/**
 * Axios BaseQuery for RTK Query
 *
 * @description
 * Axios Interceptor 기반 RTK Query BaseQuery
 * - Axios 인터셉터로 자동 토큰 주입 및 갱신
 * - TypeScript 완벽 호환
 * - RTK Query의 모든 기능 유지
 * - 401 에러 시 자동 토큰 갱신
 * - RTK Query의 `body`와 Axios의 `data` 자동 매핑
 *
 * @architecture
 * - Axios 인스턴스: 글로벌 설정
 * - Request Interceptor: 자동 토큰 주입
 * - Response Interceptor: 401 에러 처리 및 토큰 갱신
 * - Mutex: 중복 갱신 방지
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
 *       }),
 *     }),
 *   })
 * });
 *
 * @bugfix
 * - POST 데이터 손실 버그 수정 (body → data 매핑)
 * - RTK Query의 body 속성을 Axios의 data로 자동 변환
 *
 * @see
 * - authService: @/features/auth/services/authService - 사용 예시
 * - authSlice: @/features/auth/store/authSlice - Auth 상태 관리
 * - MSW Handlers: @/mocks/handlers/auth.ts - 개발용 API 모킹
 * - RTK Query Docs: https://redux-toolkit.js.org/rtk-query/api/createApi
 * - Axios Interceptors: https://axios-http.com/docs/interceptors
 */

import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, Method } from 'axios';

import { clearCredentials } from '@/features/auth/store/authSlice';
import { publicConfig } from '@/shared/config/env';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Extra Options 타입
 */
interface ReauthExtraOptions {
  skipReauth?: boolean;
}

/**
 * 확장된 Axios 요청 설정 타입
 */
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipReauth?: boolean;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * 인증 쿠키 삭제
 *
 * @description
 * 모든 인증 관련 쿠키를 삭제합니다
 * - refreshToken: HttpOnly Cookie
 * - 기타 인증 쿠키가 있다면 여기서 추가
 *
 * @example
 * // 로그아웃, 리프레시 토큰 만료 등에서 사용
 * deleteAuthCookies();
 *
 * @see
 * - Called from: axiosBaseQueryWithReauth (401 에러 시)
 * - Related: clearCredentials() in authSlice
 * - MDN Cookie Docs: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */
export const deleteAuthCookies = (): void => {
  if (typeof document !== 'undefined') {
    // refreshToken 삭제
    document.cookie = 'refreshToken=; Max-Age=0; Path=/; SameSite=lax';
    // 필요시 다른 쿠키도 여기서 추가
    // document.cookie = 'session=; Max-Age=0; Path=/;';
  }
};

// ============================================================================
// MUTEX (중복 토큰 갱신 방지)
// ============================================================================
/**
 * Extra Options 타입
 */
interface ReauthExtraOptions {
  skipReauth?: boolean;
}

/**
 * 확장된 Axios 요청 설정 타입
 */
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipReauth?: boolean;
}

// ============================================================================
// MUTEX (중복 토큰 갱신 방지)
// ============================================================================

/**
 * Mutex
 *
 * @description
 * 여러 요청이 동시에 401 에러를 받을 때,
 * 토큰 갱신 요청이 중복되는 것을 방지하기 위한 Mutex
 */
class Mutex {
  private mutex: Promise<void> = Promise.resolve();

  /**
   * Mutex 락 획득
   */
  async lock(): Promise<() => void> {
    // 현재 락이 해제될 때까지 대기
    await this.mutex;

    // 새로운 락 생성
    let release: () => void = () => {};
    this.mutex = new Promise<void>(() => {
      release = () => {};
    });

    // 락 해제 함수 반환
    return release;
  }
}

const mutex = new Mutex();

// ============================================================================
// AXIOS INSTANCE (토큰 갱신 없음)
// ============================================================================

/**
 * Axios 인스턴스 생성 (토큰 갱신 없음)
 *
 * @description
 * skipReauth 옵션을 사용하는 요청을 위한 Axios 인스턴스
 */
const axiosInstanceWithoutReauth: AxiosInstance = axios.create({
  baseURL: publicConfig.apiUrl,
  withCredentials: true, // 쿠키 자동 전송
  timeout: 10000, // 10초 타임아웃
});

// ============================================================================
// AXIOS INSTANCE WITH INTERCEPTORS (토큰 갱신 포함)
// ============================================================================

/**
 * 메인 Axios 인스턴스
 *
 * @description
 * 인터셉터가 포함된 Axios 인스턴스
 * - 401 에러 시 자동 토큰 갱신
 * - Mutex로 중복 갱신 방지
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

    // Request Interceptor: 토큰 자동 주입
    axiosInstance.interceptors.request.use(
      (config) => {
        // Redux 상태에서 토큰 추출
        const state = getState() as { auth?: { token?: string | null } };
        const token = state.auth?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor: 401 에러 처리 및 토큰 갱신
    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // 401 에러이고 재시도하지 않은 경우
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          // skipReauth 옵션 체크
          if (originalRequest._skipReauth) {
            return Promise.reject(error);
          }

          // Mutex 락 획득
          const release = await mutex.lock();

          try {
            // 토큰 갱신 요청
            const refreshResponse = await axiosInstanceWithoutReauth.post('/auth/refresh');

            if (refreshResponse.data?.token) {
              const newToken = refreshResponse.data.token;

              // 원래 요청 재시도
              originalRequest._retry = true;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              // axiosInstance가 null이 아니면 재시도
              if (axiosInstance) {
                return axiosInstance(originalRequest);
              }
            } else {
              // 갱신 실패
              return Promise.reject(error);
            }
          } finally {
            release();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return axiosInstance;
};

// ============================================================================
// BASE QUERY WITH REAUTH (토큰 갱신 지원)
// ============================================================================

/**
 * 토큰 갱신을 지원하는 BaseQuery
 *
 * @description
 * Axios Interceptor와 통합된 RTK Query BaseQuery
 * - 401 에러 시 자동 토큰 갱신
 * - 갱신 성공 시 Redux 상태 업데이트
 * - 갱신 실패 시 로그아웃
 */
const axiosBaseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const options = (extraOptions || {}) as ReauthExtraOptions;

  // Axios 인스턴스 가져오기
  const instance = getAxiosInstance(api.getState);

  // 🔧 RTK Query의 body를 Axios의 data로 매핑
  const parsedArgs = typeof args === 'string' ? { url: args } : args;
  const { url, method, body, data, params } = parsedArgs;

  // body 우선, data fallback (RTK Query 호환성)
  const requestData = body ?? data;
  const requestMethod = method?.toLowerCase() as Method;

  // skipReauth 요청 처리
  if (options.skipReauth) {
    try {
      const result = await axiosInstanceWithoutReauth({
        url,
        method: requestMethod,
        data: requestData,
        params,
      });

      return { data: result.data };
    } catch (error) {
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
  }

  // 일반 요청 (토큰 갱신 포함)
  try {
    const result = await instance({
      url,
      method: requestMethod,
      data: requestData,
      params,
    });

    return { data: result.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 401 에러는 인터셉터에서 자동 처리하지만, 실패 시 로그아웃
      if (error.response?.status === 401) {
        // 갱신 실패로 간주하고 로그아웃 처리
        api.dispatch(clearCredentials());

        // 쿠키 삭제
        deleteAuthCookies();

        // 로그인 페이지로 리다이렉트
        //
        // @note window.location.href 사용 이유
        // - Redux/RTK Query 레이어에서는 Next.js router에 직접 접근 불가능
        // - Component-level에서 auth 상태 변경을 감지하고 리다이렉트하는 것이 더 나음
        // - 예: useEffect로 auth.user === null인 경우 router.push('/login')
        // - 당장의 구현을 위해 window.location.href 사용 (상태 유지 안 됨)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

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
 * 기본 BaseQuery (토큰 갱신 포함)
 *
 * @description
 * 모든 API service에서 사용하는 기본 baseQuery
 * - Axios Interceptor로 자동 토큰 갱신
 * - Mutex로 중복 갱신 방지
 * - 갱신 실패 시 자동 로그아웃
 * - skipReauth 옵션으로 갱신 방지 가능
 *
 * @example
 * import { baseQuery } from '@/shared/lib/axios/axiosBaseQuery';
 *
 * export const myApi = createApi({
 *   baseQuery,
 *   endpoints: (builder) => ({ ... })
 * });
 *
 * @see
 * - authService: @/features/auth/services/authService - 실제 사용 예시
 * - authService.refreshToken: skipReauth 옵션 사용 예시
 * - RTK Query BaseQuery: https://redux-toolkit.js.org/rtk-query/api/createApi#basequery
 */
export const baseQuery = axiosBaseQueryWithReauth;

/**
 * Default Export
 *
 * @description
 * 토큰 갱신이 포함된 baseQuery가 기본값입니다
 */
export default baseQuery;
