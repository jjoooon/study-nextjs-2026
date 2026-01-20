import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { DashboardState } from '../types/storeTypes';
import { last30DaysRange } from '../utils/dateUtils';

const initialState: DashboardState = {
  widgets: [
    { id: 'stats', type: 'stats', position: 1, isVisible: true },
    { id: 'activity', type: 'activity', position: 2, isVisible: true },
  ],
  layout: {
    isDragging: false,
    selectedWidget: null,
  },
  filters: {
    dateRange: last30DaysRange(), // 최근 30일을 기본값으로 사용
  },
};

/**
 * Dashboard UI State Slice
 *
 * Widget configuration 등 UI 상태만 관리합니다.
 * API 데이터는 RTK Query (dashboardApiSlice)에서 관리합니다.
 */
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleWidget: (state, action: PayloadAction<string>) => {
      const widget = state.widgets.find((w) => w.id === action.payload);
      if (widget) {
        widget.isVisible = !widget.isVisible;
      }
    },
    reorderWidgets: (state, action: PayloadAction<{ sourceIndex: number; destIndex: number }>) => {
      const [removed] = state.widgets.splice(action.payload.sourceIndex, 1);
      state.widgets.splice(action.payload.destIndex, 0, removed);
    },
  },
});

export const { toggleWidget, reorderWidgets } = dashboardSlice.actions;
export default dashboardSlice.reducer;
