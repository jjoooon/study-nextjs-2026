import { useAppDispatch, useAppSelector } from '@/store';
import * as dashboardActions from '@/features/dashboard/store/dashboardSlice';
import { fetchDashboardData } from '@/features/dashboard/store/dashboardSlice';
import * as dashboardSelectors from '@/store/selectors/dashboard';
import type { Widget } from '@/features/dashboard/store/dashboardSlice';

// ============================================================================
// DASHBOARD HOOKS (Selector-based)
// ============================================================================

/**
 * Dashboard 상태 관리 Hook
 */
export const useDashboard = () => {
  const dispatch = useAppDispatch();

  // Selector 기반으로 개별 상태 구독
  const widgets = useAppSelector(dashboardSelectors.selectWidgets);
  const isLoading = useAppSelector(dashboardSelectors.selectDashboardLoading);
  const lastUpdated = useAppSelector(dashboardSelectors.selectLastUpdated);

  return {
    widgets,
    isLoading,
    lastUpdated,
    toggleWidget: (id: string) => dispatch(dashboardActions.toggleWidget(id)),
    reorderWidgets: (sourceIndex: number, destIndex: number) =>
      dispatch(dashboardActions.reorderWidgets({ sourceIndex, destIndex })),
    fetchData: () => dispatch(fetchDashboardData()),
    updateLastUpdated: () => dispatch(dashboardActions.updateLastUpdated()),
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
 * Dashboard 상태 요약
 */
export const useDashboardStatus = () => {
  return useAppSelector(dashboardSelectors.selectDashboardStatus);
};
