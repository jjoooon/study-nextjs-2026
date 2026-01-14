/**
 * Axios 인스턴스 설정
 *
 * @description
 * 애플리케이션의 모든 API 요청에 사용되는 Axios 인스턴스
 * - 인터셉터 설정 (요청/응답)
 * - 타임아웃 및 기본 설정
 * - 인증 토큰 자동 주입
 *
 * @architecture
 * - Single Axios Instance: 모든 API 요청이 동일한 설정 사용
 * - Request Interceptor: 인증 토큰 자동 주입
 * - Response Interceptor: 통일된 에러 처리
 * - Type Safety: TypeScript 타입 정의
 */

import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import log from '@/shared/utils/logger';

// ============================================================================
// AXIOS INSTANCE CREATION
// ============================================================================

/**
 * 기본 Axios 인스턴스
 *
 * @description
 * 모든 API 요청에 사용되는 공통 Axios 인스턴스
 */
export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// REQUEST INTERCEPTOR
// ============================================================================

/**
 * 요청 인터셉터
 *
 * @description
 * 모든 요청 전에 실행되어 인증 토큰을 자동으로 주입
 *
 * @flow
 * 1. Redux Store에서 인증 토큰 확인
 * 2. Authorization 헤더에 Bearer 토큰 추가
 * 3. 요청 계속 진행
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      // Redux Store에서 토큰 가져오기 (클라이언트 사이드에서만)
      if (typeof window !== 'undefined') {
        // 주의: 이곳에서 직접 store를 import하면 순환 의존성 발생 가능
        // 토큰은 localStorage 또는 별도의 토큰 관리자에서 가져오는 것을 권장
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      const apiLogger = log.getLogger('API');
      apiLogger.debug(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        params: config.params,
      });

      return config;
    } catch (error) {
      const apiLogger = log.getLogger('API');
      apiLogger.error('[REQUEST INTERCEPTOR ERROR]', error);
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    const apiLogger = log.getLogger('API');
    apiLogger.error('[REQUEST ERROR]', error);
    return Promise.reject(error);
  }
);

// ============================================================================
// RESPONSE INTERCEPTOR
// ============================================================================

/**
 * 응답 인터셉터
 *
 * @description
 * 모든 응답에 대해 통일된 처리 및 에러 관리
 *
 * @flow
 * 1. 성공 응답: 로깅 후 그대로 반환
 * 2. 에러 응답: 통일된 에러 포맷으로 변환
 * 3. 401 에러: 토큰 만료 처리
 * 4. 403 에러: 권한 없음 처리
 * 5. 500+ 에러: 서버 에러 처리
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 성공 응답 로깅
    const apiLogger = log.getLogger('API');
    apiLogger.debug(`[RESPONSE] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error: AxiosError<unknown>) => {
    const apiLogger = log.getLogger('API');

    // 에러 로깅
    apiLogger.error('[RESPONSE ERROR]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    // 401 Unauthorized: 토큰 만료
    if (error.response?.status === 401) {
      apiLogger.warn('[401] 인증 토큰 만료 또는 유효하지 않음');

      // 토큰 제거 및 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // window.location.href = '/login'; // 필요시 주석 해제
      }
    }

    // 403 Forbidden: 권한 없음
    if (error.response?.status === 403) {
      apiLogger.warn('[403] 접근 권한 없음');
    }

    // 500+ Internal Server Error
    if (error.response?.status && error.response.status >= 500) {
      apiLogger.error('[SERVER ERROR]', {
        status: error.response.status,
        data: error.response.data,
      });
    }

    // 통일된 에러 포맷으로 반환
    const customError = {
      status: error.response?.status || 0,
      message: (error.response?.data as { message?: string })?.message || error.message,
      data: error.response?.data,
      code: error.code,
    };

    return Promise.reject(customError);
  }
);

// ============================================================================
// AXIOS INSTANCE EXPORT
// ============================================================================

/**
 * Axios 인스턴스 내보내기
 *
 * @usage
 * import { axiosInstance } from '@/shared/api/axiosInstance';
 *
 * axiosInstance.get('/users');
 * axiosInstance.post('/login', { email, password });
 */
export default axiosInstance;
