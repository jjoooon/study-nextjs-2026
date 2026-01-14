import { useGetDashboardQuery } from '@/features/dashboard/store/apiSlice';
import * as dashboardSelectors from '@/features/dashboard/store/dashboardSelectors';
import { reorderWidgets, toggleWidget } from '@/features/dashboard/store/dashboardSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

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
