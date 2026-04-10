/**
 * Dashboard Service
 *
 * RTK Query로 대시보드 관련 API 요청 처리
 *
 * @description
 * Dashboard 도메인의 모든 API 호출을 담당하는 서비스 계층
 * - 대시보드 전체 데이터 조회
 * - 통계 데이터 조회
 * - 최근 활동 조회
 * - 자동 캐싱 및 재검증 전략
 *
 * @architecture
 * - 빈 API 슬라이스에 injectEndpoints로 동적 추가
 * - 코드 분할로 초기 번들 크기 최적화
 * - RTK Query 자동화 기능 유지
 */

import type { ActivityItem, DashboardData, DashboardStats } from '../types/apiTypes';

import { emptyApi } from '@/redux/api/emptyApi';

// ============================================================================
// DASHBOARD SERVICE (injectEndpoints)
// ============================================================================

/**
 * Dashboard 도메인 전용 API Service
 *
 * @description
 * 빈 API 슬라이스에 injectEndpoints로 대시보드 관련 endpoint 추가
 * - 필요할 때만 로드되어 초기 번들 최적화
 */
export const dashboardService = emptyApi.injectEndpoints({
  // overrideExisting: false,

  endpoints: (builder) => ({
    /**
     * 대시보드 전체 데이터 조회
     * GET /api/dashboard
     *
     * @returns 대시보드 전체 데이터 (통계, 활동 등)
     */
    getDashboard: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),

    /**
     * 대시보드 통계 조회
     * GET /api/dashboard/stats
     *
     * @returns 대시보드 통계 데이터
     */
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
    }),

    /**
     * 최근 활동 조회
     * GET /api/dashboard/activity
     *
     * @returns 최근 활동 목록
     */
    getRecentActivity: builder.query<ActivityItem[], void>({
      query: () => '/dashboard/activity',
      providesTags: ['Dashboard'],
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Dashboard Service 자동 생성된 React Hooks
 *
 * RTK Query가 자동으로 생성하는 hooks를 export 합니다:
 * - useGetDashboardQuery: 대시보드 전체 데이터
 * - useGetDashboardStatsQuery: 통계 데이터
 * - useGetRecentActivityQuery: 최근 활동
 */
export const { useGetDashboardQuery, useGetDashboardStatsQuery, useGetRecentActivityQuery } = dashboardService;

// ============================================================================
// SELECTORS EXPORTS
// ============================================================================

/**
 * Dashboard Service Selectors
 *
 * Redux state에서 데이터를 선택하는 selectors
 */
export const selectDashboardData = dashboardService.endpoints.getDashboard.select();
export const selectDashboardStats = dashboardService.endpoints.getDashboardStats.select();
export const selectRecentActivity = dashboardService.endpoints.getRecentActivity.select();

/**
 * Default export
 * 호환성을 위해 유지
 */
export default dashboardService;
