/**
 * API Registry Constants
 *
 * 모든 RTK Query API 슬라이스의 등록 정보를 정의
 *
 * @description
 * 새로운 API를 추가하려면:
 * 1. 위에서 해당 API 슬라이스를 import
 * 2. API_REGISTRY 배열에 { api, priority, name } 추가
 */

import type { Reducer, Middleware } from '@reduxjs/toolkit';

import { authApiSlice } from '@/features/auth/store/apiSlice';
import dashboardApiSlice from '@/features/dashboard/store/apiSlice';
import { productsApiSlice } from '@/features/products/store/apiSlice';

/**
 * 개별 API 등록 정보 타입
 */
export interface ApiRegistration {
  /** RTK Query API 슬라이스 */
  api: {
    reducerPath: string;
    reducer: Reducer;
    middleware: Middleware<object, object>;
  };
  /** 실행 우선순위 (낮을수록 먼저 실행) */
  priority: number;
  /** API 이름 (로깅 및 디버깅용) */
  name: string;
}

/**
 * 모든 RTK Query API 슬라이스 등록 정보
 *
 * @example
 * // 새로운 API 추가 예시:
 * import { analyticsApiSlice } from '@/features/analytics';
 *
 * export const API_REGISTRY = [
 *   // ... 기존 API들
 *   { api: analyticsApiSlice, priority: 14, name: 'analyticsApi' },
 * ] as const;
 */
export const API_REGISTRY = [
  // Core APIs (우선순위 10-19)
  { api: authApiSlice, priority: 10, name: 'authApi' },

  // Feature APIs (우선순위 50-59)
  { api: dashboardApiSlice, priority: 50, name: 'dashboardApi' },
  { api: productsApiSlice, priority: 51, name: 'productsApi' },
  // ✅ 새로운 API를 여기에 추가
  // { api: analyticsApiSlice, priority: 54, name: 'analyticsApi' },
  // { api: reportingApiSlice, priority: 55, name: 'reportingApi' },
] as const;

/**
 * 등록된 모든 API 이름 목록
 */
export const REGISTERED_API_NAMES = API_REGISTRY.map(({ name }) => name);
