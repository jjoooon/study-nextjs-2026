import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/lib/axios/axiosBaseQuery';
import type { ActivityItem, DashboardData, DashboardStats } from '../types/api';

// ============================================================================
// DASHBOARD API SLICE
// ============================================================================

/**
 * Dashboard 도메인 전용 API Slice
 *
 * @description
 * RTK Query + Axios 조합으로 대시보드 데이터 관리
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
export const dashboardApiSlice = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: axiosBaseQuery(),

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
