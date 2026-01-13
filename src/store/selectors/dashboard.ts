import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Widget } from '@/features/dashboard/store/dashboardSlice';

// ============================================================================
// DASHBOARD SELECTORS
// ============================================================================

/**
 * Dashboard domain의 모든 selector
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */

// Base selectors
export const selectDashboardState = (state: RootState) => state.dashboard;

export const selectWidgets = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.widgets
);

export const selectDashboardLoading = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.isLoading
);

export const selectLastUpdated = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.lastUpdated
);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 대시보드 위젯 개수
 */
export const selectWidgetCount = createSelector(
  [selectWidgets],
  (widgets) => widgets.length
);

/**
 * 활성화된 위젯만 필터링
 */
export const selectActiveWidgets = createSelector(
  [selectWidgets],
  (widgets) => widgets // 모든 위젯 반환 (enabled 속성이 없으므로)
);

/**
 * 특정 타입의 위젯만 필터링
 */
export const selectWidgetsByType = (widgetType: Widget['type']) =>
  createSelector(
    [selectWidgets],
    (widgets) => widgets.filter((widget: Widget) => widget.type === widgetType)
  );

/**
 * 대시보드 상태 요약
 */
export const selectDashboardStatus = createSelector(
  [selectWidgetCount, selectDashboardLoading, selectLastUpdated],
  (widgetCount, isLoading, lastUpdated) => ({
    widgetCount,
    isLoading,
    lastUpdated,
    isStale: lastUpdated
      ? Date.now() - new Date(lastUpdated).getTime() > 5 * 60 * 1000 // 5분
      : true,
  })
);
