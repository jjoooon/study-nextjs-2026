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
 * - axiosBaseQuery: Axios의 강력한 기능 활용
 * - RTK Query: 자동 캐싱, 리패칭, 태그 무효화
 *
 * @benefits
 * ✅ Axios 인터셉터로 자동 토큰 주입
 * ✅ 통일된 에러 처리
 * ✅ 타임아웃 및 재시도 설정
 * ✅ RTK Query의 자동화 기능 유지
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import type { ActivityItem, DashboardData, DashboardStats } from '../types/apiTypes';
import { createApiConfig } from '@/shared/lib/rtkQuery/createApiConfig';

// ============================================================================
// DASHBOARD SERVICE
// ============================================================================

/**
 * Dashboard 도메인 전용 API Service
 *
 * RTK Query를 사용하여 대시보드 관련 API 엔드포인트를 정의하고
 * 자동으로 Redux hooks를 생성합니다.
 */
export const dashboardService = createApi({
  ...createApiConfig({
    reducerPath: 'dashboardService',
    tagTypes: ['Dashboard'],
  }),

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
