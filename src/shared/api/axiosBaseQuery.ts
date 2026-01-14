/**
 * Axios BaseQuery for RTK Query
 *
 * @description
 * RTK Query의 baseQuery 인터페이스를 구현하는 Axios 래퍼
 * - RTK Query의 캐싱, 자동 리패칭, 태그 무효화 기능 유지
 * - Axios의 인터셉터, 타임아웃, 취소 기능 활용
 *
 * @architecture
 * - RTK Query 호환: fetchBaseQuery와 동일한 인터페이스
 * - Axios 활용: axiosInstance를 통한 모든 요청
 * - 타입 안전성: TypeScript 타입 정의
 *
 * @usage
 * import { axiosBaseQuery } from '@/shared/api/axiosBaseQuery';
 *
 * export const apiSlice = createApi({
 *   baseQuery: axiosBaseQuery(),
 *   endpoints: (builder) => ({ ... })
 * });
 */

import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import log from '@/shared/utils/logger';
import { axiosInstance } from './axiosInstance';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Axios BaseQuery 인자 타입
 *
 * @description
 * RTK Query의 baseQuery에 전달되는 인자 타입
 *
 * @note
 * 문자열 URL 또는 AxiosBaseQueryArgs 객체 모두 지원
 */
export type AxiosBaseQueryArg =
  | string // 단순 URL 문자열: "/users"
  | AxiosBaseQueryArgs; // 상세 설정 객체

/**
 * Axios BaseQuery 인자 타입 (객체)
 */
export interface AxiosBaseQueryArgs {
  /** 요청 URL (baseURL 이후의 경로) */
  url: string;
  /** HTTP 메서드 */
  method?: AxiosRequestConfig['method'];
  /** 요청 본문 */
  body?: AxiosRequestConfig['data'];
  /** URL 쿼리 파라미터 */
  params?: AxiosRequestConfig['params'];
  /** 요청 헤더 */
  headers?: AxiosRequestConfig['headers'];
  /** 타임아웃 (ms) */
  timeout?: number;
}

/**
 * Axios BaseQuery 결과 타입
 *
 * @description
 * RTK Query가 기대하는 응답 형식
 */
export type AxiosBaseQueryResult<T = unknown> =
  | { data: T }
  | {
      error: {
        status: number;
        message: string;
        data?: unknown;
      };
    };

/**
 * RTK Query Meta 정보 타입
 *
 * @description
 * 요청 메타데이터 (타임아웃, 취소 등)
 */
export type AxiosBaseQueryMeta = {
  /** 요청 ID */
  requestId: string;
  /** 요청 타임스탬프 */
  timestamp: number;
};

// ============================================================================
// AXIOS BASE QUERY IMPLEMENTATION
// ============================================================================

/**
 * Axios BaseQuery 팩토리 함수
 *
 * @description
 * RTK Query와 Axios를 연결하는 baseQuery 함수 생성
 *
 * @param baseUrl - 기본 URL (기본값: '/api')
 * @returns RTK Query 호환 baseQuery 함수
 *
 * @example
 * ```typescript
 * // 기본 사용
 * export const apiSlice = createApi({
 *   baseQuery: axiosBaseQuery(),
 *   endpoints: (builder) => ({ ... })
 * });
 *
 * // 커스텀 baseURL
 * export const apiSlice = createApi({
 *   baseQuery: axiosBaseQuery({ baseUrl: 'https://api.example.com' }),
 *   endpoints: (builder) => ({ ... })
 * });
 * ```
 */
export const axiosBaseQuery =
  ({ baseUrl = '' }: { baseUrl?: string } = {}): BaseQueryFn<
    AxiosBaseQueryArg, // 문자열 또는 객체 모두 지원
    unknown,
    unknown,
    Record<string, never> // ESLint: 빈 객체 대신 Record<string, never> 사용
  > =>
  async (arg, { getState }) => {
    const apiLogger = log.getLogger('API');

    try {
      // 인자 타입 처리 (문자열 또는 객체)
      let url: string;
      let method: AxiosRequestConfig['method'] = 'GET';
      let body: AxiosRequestConfig['data'] = undefined;
      let params: AxiosRequestConfig['params'] = undefined;
      let headers: AxiosRequestConfig['headers'] = undefined;
      let timeout: number | undefined = undefined;

      if (typeof arg === 'string') {
        // 단순 URL 문자열인 경우
        url = arg;
      } else {
        // 객체인 경우
        url = arg.url;
        method = arg.method || 'GET';
        body = arg.body;
        params = arg.params;
        headers = arg.headers;
        timeout = arg.timeout;
      }

      // 요청 ID 생성 (로깅 및 추적용)
      const requestId = `request_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Redux Store에서 인증 토큰 가져오기
      const state = getState() as { auth?: { token?: string | null } };
      const token = state.auth?.token;

      // Axios 요청 config 생성
      const config: AxiosRequestConfig = {
        url: `${baseUrl}${url}`,
        method,
        data: body,
        params,
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        timeout: timeout || 10000, // 기본 10초
      };

      // 요청 로깅
      apiLogger.debug(`[AxiosBaseQuery] ${method} ${url}`, {
        requestId,
        params,
        hasBody: !!body,
      });

      // Axios 요청 실행
      const response = await axiosInstance.request(config);

      // 성공 응답 로깅
      apiLogger.debug(`[AxiosBaseQuery] SUCCESS ${method} ${url}`, {
        requestId,
        status: response.status,
        dataSize: JSON.stringify(response.data).length,
      });

      // RTK Query가 기대하는 형식으로 반환 (meta 제거)
      return {
        data: response.data,
      };
    } catch (error) {
      // 에러 타입 확인
      const axiosError = error as AxiosError<unknown>;

      // URL 추출 (로깅용)
      const url = typeof arg === 'string' ? arg : arg.url;

      // 에러 로깅
      apiLogger.error(`[AxiosBaseQuery] ERROR ${url}`, {
        status: axiosError.response?.status,
        message: axiosError.message,
        data: axiosError.response?.data,
      });

      // RTK Query가 기대하는 에러 형식으로 반환 (meta 제거)
      return {
        error: {
          status: axiosError.response?.status || 500,
          message:
            (axiosError.response?.data as { message?: string })?.message ||
            axiosError.message ||
            '알 수 없는 에러가 발생했습니다',
          data: axiosError.response?.data,
        },
      };
    }
  };

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * 기본 Axios BaseQuery 내보내기
 *
 * @description
 * 대부분의 경우 이것을 사용하면 됩니다
 */
export default axiosBaseQuery;

/**
 * 미리 구성된 baseQuery 인스턴스
 *
 * @description
 * 추가 설정이 필요 없는 경우 사용
 */
export const baseQuery = axiosBaseQuery();
