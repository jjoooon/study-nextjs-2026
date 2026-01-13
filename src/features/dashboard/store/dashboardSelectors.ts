import { createSelector } from '@reduxjs/toolkit';

import type { Widget } from '@/features/dashboard/store/dashboardSlice';
import type { RootState } from '@/store';

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

export const selectWidgets = createSelector([selectDashboardState], (dashboard) => dashboard.widgets);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 대시보드 위젯 개수
 */
export const selectWidgetCount = createSelector([selectWidgets], (widgets) => widgets.length);

/**
 * 활성화된 위젯만 필터링
 */
export const selectActiveWidgets = createSelector([selectWidgets], (widgets) =>
  widgets.filter((widget: Widget) => widget.isVisible)
);

/**
 * 특정 타입의 위젯만 필터링
 */
export const selectWidgetsByType = (widgetType: Widget['type']) =>
  createSelector([selectWidgets], (widgets) => widgets.filter((widget: Widget) => widget.type === widgetType));

/**
 * 대시보드 상태 요약
 */
export const selectDashboardStatus = createSelector([selectWidgetCount, selectWidgets], (widgetCount, widgets) => ({
  widgetCount,
  visibleWidgets: widgets.filter((w: Widget) => w.isVisible).length,
}));
