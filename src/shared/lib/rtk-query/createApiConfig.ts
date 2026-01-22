/**
 * RTK Query Common Configuration
 *
 * RTK Query API 서비스의 표준화된 설정을 제공하는 유틸리티
 *
 * @description
 * 모든 API 서비스에서 일관된 설정을 사용하도록 공통 설정 팩토리를 제공합니다.
 * - 캐시 전략 프리셋 (실시간, 정적, 인증 등)
 * - 타입 안전한 설정 구성
 * - 서비스별 오버라이드 지원
 *
 * @benefits
 * ✅ 단일 소스: 설정 변경이 한 곳에서 가능
 * ✅ 일관성: 모든 서비스가 표준화된 설정 사용
 * ✅ 유지보수: 새 서비스 생성 시 복사/붙여넣기 불필요
 * ✅ 유연성: 필요시 개별 설정 오버라이드 가능
 *
 * @example
 * ```ts
 * export const dashboardService = createApi({
 *   ...createApiConfig({
 *     reducerPath: 'dashboardService',
 *     tagTypes: ['Dashboard'],
 *     cacheStrategy: CacheStrategy.REALTIME,
 *   }),
 *   endpoints: (builder) => ({ ... }),
 * });
 * ```
 */

import { baseQuery } from '../axios/axiosBaseQuery';

// ============================================================================
// CACHE STRATEGY PRESETS
// ============================================================================

/**
 * 캐시 전략 프리셋
 *
 * 데이터 특성에 따라 최적화된 캐싱 설정을 제공합니다.
 */
export const CacheStrategy = {
  DEFAULT: {
    keepUnusedDataFor: 300, // 5분
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  },

  /**
   * 실시간 데이터 (Real-time Data)
   *
   * @description
   * 자주 변경되는 데이터용 - 짧은 캐시, 자동 리패치
   *
   * @useCase
   * - 대시보드 통계
   * - 최근 활동
   * - 알림
   * - 실시간 시계열 데이터
   */
  REALTIME: {
    keepUnusedDataFor: 60, // 1분
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  },

  /**
   * 정적 데이터 (Static Data)
   *
   * @description
   * 드물게 변경되는 데이터용 - 긴 캐시, 주기적 리프레시
   *
   * @useCase
   * - 제품 목록
   * - 사용자 프로필
   * - 카탈로그 데이터
   * - 마스터 데이터
   */
  STATIC: {
    keepUnusedDataFor: 300, // 5분
    refetchOnMountOrArgChange: 30, // 30초
    refetchOnFocus: true,
    refetchOnReconnect: true,
  },
} as const;

// ============================================================================
// CONFIGURATION FACTORY
// ============================================================================

/**
 * API 서비스 설정 타입
 */
export interface ApiServiceConfig<T extends string> {
  /** 서비스별 고유 reducer 경로 */
  reducerPath: string;

  /** 캐시 태그 타입 (무효화용) */
  tagTypes: readonly T[];

  /** 캐시 전략 프리셋 (기본값: CacheStrategy.STATIC) */
  cacheStrategy?: Partial<(typeof CacheStrategy)[keyof typeof CacheStrategy]>;

  /** 추가 설정 옵션 (모든 createApi 옵션 오버라이드 가능) */
  extraOptions?: {
    [key: string]: unknown;
  };
}

/**
 * 표준화된 RTK Query API 설정 생성
 *
 * @param config - 서비스별 설정
 * @returns createApi에 전달할 완전한 설정 객체
 *
 * @example
 * ```ts
 * // 실시간 데이터 서비스
 * export const dashboardService = createApi({
 *   ...createApiConfig({
 *     reducerPath: 'dashboardService',
 *     tagTypes: ['Dashboard'],
 *     cacheStrategy: CacheStrategy.REALTIME,
 *   }),
 *   endpoints: (builder) => ({ ... }),
 * });
 *
 * // 정적 데이터 서비스
 * export const productService = createApi({
 *   ...createApiConfig({
 *     reducerPath: 'productsService',
 *     tagTypes: ['Products-LIST', 'Products-ITEM'],
 *     cacheStrategy: CacheStrategy.STATIC,
 *   }),
 *   endpoints: (builder) => ({ ... }),
 * });
 *
 * // 커스텀 설정 서비스
 * export const customService = createApi({
 *   ...createApiConfig({
 *     reducerPath: 'customService',
 *     tagTypes: ['Custom'],
 *     cacheStrategy: {
 *       keepUnusedDataFor: 120,
 *       refetchOnFocus: false,
 *     },
 *   }),
 *   endpoints: (builder) => ({ ... }),
 * });
 * ```
 */
export function createApiConfig<T extends string>(config: ApiServiceConfig<T>) {
  const { reducerPath, tagTypes, cacheStrategy = CacheStrategy.DEFAULT, extraOptions = {} } = config;

  return {
    reducerPath,
    baseQuery,
    tagTypes,
    ...cacheStrategy,
    ...extraOptions,
  };
}

// ============================================================================
// BARREL EXPORTS
// ============================================================================

export * from '../axios/axiosBaseQuery';
