/**
 * Pure HTTP Client
 *
 * @description
 * HTTP 요청 클라이언트
 * - GET/POST 함수 제공
 * - TypeScript 타입 안전성
 * - 간단하고 명확한 API
 *
 * @usage
 * import { get, post } from '@/shared/lib/axios/axiosClient';
 *
 * // GET 요청
 * const users = await get<User[]>('/api/users');
 * const user = await get<User>('/api/users/1');
 *
 * // POST 요청
 * const newUser = await post<User>('/api/users', { name: 'John' });
 * const result = await post<Response, Request>('/api/submit', requestData);
 */

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { publicConfig } from '@/shared/config/env';

// ============================================================================
// TYPES
// ============================================================================

/**
 * HTTP 요청 옵션
 */
export interface HttpRequestOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> {
  /** 요청 타임아웃 (ms, 기본: 10000) */
  timeout?: number;
}

/**
 * HTTP 에러 타입
 */
export interface HttpError<T = unknown> {
  /** HTTP 상태 코드 */
  status: number;
  /** 에러 데이터 */
  data?: T;
  /** 원본 Axios 에러 */
  originalError?: AxiosError<T>;
}

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

/**
 * 순수한 Axios 인스턴스
 *
 * @description
 * - 인증 로직 없음
 * - 인터셉터 없음
 * - withCredentials: false (쿠키 미전송)
 */
const axiosInstance = axios.create({
  baseURL: publicConfig.apiUrl,
  timeout: 10000,
  withCredentials: true, // 쿠키 자동 전송
});

// ============================================================================
// HTTP FUNCTIONS
// ============================================================================

/**
 * 에러 처리
 *
 * @description
 * Axios 에러를 표준화된 HttpError 형태로 변환
 *
 * @param error - 발생한 에러
 * @returns HttpError
 */
function handleError<T = unknown>(error: unknown): HttpError<T> {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data,
      originalError: error,
    };
  }

  // Axios 에러가 아닌 경우
  return {
    status: 500,
    data: error as T,
    originalError: undefined,
  };
}

/**
 * GET 요청
 *
 * @template T - 응답 데이터 타입
 * @param url - 요청 URL
 * @param options - 요청 옵션 (params, headers 등)
 * @returns Promise<T>
 *
 * @example
 * import { get } from '@/shared/lib/axios/axiosClient';
 *
 * const users = await get<User[]>('/api/users');
 * const user = await get<User>('/api/users/1', {
 *   params: { include: 'profile' }
 * });
 */
export async function get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(url, options);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * POST 요청
 *
 * @template T - 응답 데이터 타입
 * @template D - 요청 데이터 타입 (기본: unknown)
 * @param url - 요청 URL
 * @param data - 요청 바디
 * @param options - 요청 옵션 (headers, params 등)
 * @returns Promise<T>
 *
 * @example
 * import { post } from '@/shared/lib/axios/axiosClient';
 *
 * const newUser = await post<User>('/api/users', { name: 'John' });
 * const result = await post<Response, Request>('/api/submit', data);
 */
export async function post<T, D = unknown>(url: string, data?: D, options?: HttpRequestOptions): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(url, data, options);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}
