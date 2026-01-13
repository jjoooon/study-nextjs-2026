import { useGetDashboardQuery } from '@/features/dashboard/store/apiSlice';
import * as dashboardActions from '@/features/dashboard/store/dashboardSlice';
import { toggleWidget, reorderWidgets } from '@/features/dashboard/store/dashboardSlice';
import type { Widget } from '@/features/dashboard/store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import * as dashboardSelectors from '@/store/selectors/dashboard';

// ============================================================================
// DASHBOARD HOOKS (RTK Query + Selector-based)
// ============================================================================

/**
 * Dashboard 상태 관리 Hook
 *
 * RTK Query를 사용한 API 데이터 fetching + Redux Slice의 UI 상태 관리
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */
export const useDashboard = () => {
  const dispatch = useAppDispatch();

  // ✅ RTK Query hook (리듀서가 항상 존재하므로 안전)
  const { data: dashboardData, isLoading, isError, refetch } = useGetDashboardQuery();

  // ✅ Selector 기반 UI 상태 구독
  const widgets = useAppSelector(dashboardSelectors.selectWidgets);

  return {
    // API 데이터
    stats: dashboardData?.stats,
    recentActivity: dashboardData?.recentActivity,
    isLoading,
    isError,
    lastUpdated: dashboardData ? new Date().toISOString() : null,

    // UI 상태
    widgets,

    // Actions
    toggleWidget: (id: string) => dispatch(toggleWidget(id)),
    reorderWidgets: (sourceIndex: number, destIndex: number) => dispatch(reorderWidgets({ sourceIndex, destIndex })),
    refetchData: () => refetch(),
  };
};

/**
 * Dashboard 위젯 목록만 가져오는 Hook
 */
export const useDashboardWidgets = () => {
  return useAppSelector(dashboardSelectors.selectWidgets);
};

/**
 * 활성화된 위젯만 가져오는 Hook
 */
export const useActiveWidgets = () => {
  return useAppSelector(dashboardSelectors.selectActiveWidgets);
};

/**
 * 특정 타입의 위젯만 가져오는 Hook
 */
export const useWidgetsByType = (widgetType: Widget['type']) => {
  return useAppSelector(dashboardSelectors.selectWidgetsByType(widgetType));
};

/**
 * 위젯 개수
 */
export const useWidgetCount = () => {
  return useAppSelector(dashboardSelectors.selectWidgetCount);
};

/**
 * Dashboard API 데이터 상태 요약
 */
export const useDashboardApiStatus = () => {
  const { isLoading, isError, data } = useGetDashboardQuery();

  return {
    isLoading,
    isError,
    hasData: !!data,
    dataUpdatedAt: data ? new Date(data.widgets[0]?.position || Date.now()) : null,
  };
};

/**
 * Dashboard Statistics 전용 Hook
 */
export const useDashboardStats = () => {
  const { data, isLoading, isError } = useGetDashboardQuery();

  return {
    stats: data?.stats,
    isLoading,
    isError,
  };
};

/**
 * Recent Activity 전용 Hook
 */
export const useRecentActivity = () => {
  const { data, isLoading, isError } = useGetDashboardQuery();

  return {
    activities: data?.recentActivity || [],
    isLoading,
    isError,
  };
};
