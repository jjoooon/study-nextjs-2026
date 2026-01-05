import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Widget {
  id: string;
  type: 'stats' | 'chart' | 'activity';
  position: number;
  isVisible: boolean;
}

interface DashboardState {
  widgets: Widget[];
  isLoading: boolean;
  lastUpdated: string | null;
}

const initialState: DashboardState = {
  widgets: [
    { id: 'stats', type: 'stats', position: 1, isVisible: true },
    { id: 'activity', type: 'activity', position: 2, isVisible: true },
  ],
  isLoading: false,
  lastUpdated: null,
};

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    // Simulate API call
    const response = await fetch('/api/dashboard');
    return response.json();
  }
);

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
    updateLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state) => {
        state.isLoading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleWidget, reorderWidgets, updateLastUpdated } = dashboardSlice.actions;
export default dashboardSlice.reducer;
