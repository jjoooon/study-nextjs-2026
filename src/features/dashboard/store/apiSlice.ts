import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DashboardStats, ActivityItem, DashboardData, Widget } from '../types';

// ============================================================================
// DASHBOARD API SLICE
// ============================================================================

/**
 * Dashboard 도메인 전용 API Slice
 */
export const dashboardApiSlice = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),

  // Dashboard 도메인 전용 캐시 태그
  tagTypes: ['Dashboard'] as const,

  // Dashboard 전용 캐시 설정
  keepUnusedDataFor: 60, // 1분 캐시 (실시간 데이터)
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    /**
     * 대시보드 전체 데이터 조회
     * GET /api/dashboard
     */
    getDashboard: builder.query<DashboardData, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 60,
    }),

    /**
     * 대시보드 통계 조회
     * GET /api/dashboard/stats
     */
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 60,
    }),

    /**
     * 최근 활동 조회
     * GET /api/dashboard/activity
     */
    getRecentActivity: builder.query<ActivityItem[], void>({
      query: () => '/dashboard/activity',
      providesTags: ['Dashboard'],
      keepUnusedDataFor: 30, // 30초 캐시 (활동 데이터는 더 자주 갱신)
    }),
  }),
});

// Hooks 자동 생성
export const { useGetDashboardQuery, useGetDashboardStatsQuery, useGetRecentActivityQuery } = dashboardApiSlice;

// Selectors
export const selectDashboardData = dashboardApiSlice.endpoints.getDashboard.select();
export const selectDashboardStats = dashboardApiSlice.endpoints.getDashboardStats.select();
export const selectRecentActivity = dashboardApiSlice.endpoints.getRecentActivity.select();

export default dashboardApiSlice;
