/**
 * API Registry Constants
 *
 * RTK Query 코드 분할을 위한 API 레지스트리 설정
 *
 * @description
 * 빈 API 슬라이스를 중앙 관리하여 각 feature에서
 * injectEndpoints로 동적으로 endpoint를 추가합니다.
 *
 * @architecture
 * - emptyApi: 빈 상태로 초기 번들에 포함
 * - 각 feature: injectEndpoints로 필요한 endpoint만 로드
 * - 코드 분할로 초기 번들 크기 최적화
 *
 * @benefits
 * ✅ 초기 번들 최소화 (빈 슬라이스만 포함)
 * ✅ 필요한 endpoint만 로드
 * ✅ 타입 안전성 완전 유지
 * ✅ RTK Query 공식 패턴
 *
 * @usage
 * // 1. emptyApi는 자동으로 등록됨
 * // 2. Feature에서 injectEndpoints 사용
 * import { emptyApi } from '@/redux/api/emptyApi';
 *
 * export const productService = emptyApi.injectEndpoints({
 *   endpoints: (builder) => ({ ... }),
 * });
 */

import type { Reducer, Middleware } from '@reduxjs/toolkit';

import { emptyApi } from './emptyApi';

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
 * RTK Query API 슬라이스 등록 정보
 *
 * @description
 * 빈 API 슬라이스만 등록하여 초기 번 크기 최적화
 * - 각 feature에서 injectEndpoints로 동적 추가
 * - 코드 분할로 필요한 endpoint만 로드
 *
 * @example
 * // 새로운 feature 추가 예시:
 * // 1. feature 서비스에서 injectEndpoints 사용
 * // import { emptyApi } from '@/redux/api/emptyApi';
 * //
 * // export const analyticsService = emptyApi.injectEndpoints({
 * //   endpoints: (builder) => ({
 * //     getAnalytics: builder.query({ query: () => '/analytics' }),
 * //   }),
 * // });
 *
 * // 2. 자동으로 emptyApi에 포함됨 (별도 등록 불필요)
 */
export const API_REGISTRY = [
  // ✅ 빈 API 슬라이스만 등록 (초기 번들 최적화)
  { api: emptyApi, priority: 10, name: 'emptyApi' },

  // 📝 참고: 각 feature 서비스는 injectEndpoints로 자동 추가됨
  // - authService: emptyApi.injectEndpoints(...)
  // - productService: emptyApi.injectEndpoints(...)
  // - customerService: emptyApi.injectEndpoints(...)
  // - dashboardService: emptyApi.injectEndpoints(...)
  // - dynamicService: emptyApi.injectEndpoints(...)
] as const;

/**
 * 등록된 모든 API 이름 목록
 */
export const REGISTERED_API_NAMES = API_REGISTRY.map(({ name }) => name);
