import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

export interface SidebarState {
  isOpen: boolean;
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: unknown;
}

export interface UIState {
  sidebar: SidebarState;
  modal: ModalState;
  theme: 'light' | 'dark';
  toast: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration: number;
  } | null;
}

const initialState: UIState = {
  sidebar: {
    isOpen: true,
  },
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  theme: 'light',
  toast: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: unknown }>) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
        duration?: number;
      }>
    ) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type,
        duration: action.payload.duration || 3000,
      };
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
  extraReducers: (builder) => {
    /**
     * REHYDRATE Handler
     *
     * @description
     * Handles state rehydration from sessionStorage.
     *
     * @ux-improvement
     * - Only theme and sidebar state are persisted
     * - Modal and toast states are reset to defaults
     * - Prevents showing stale modals/toasts after page refresh
     */
    builder.addCase(REHYDRATE, (state, action: any) => {
      const payload = action.payload as { ui?: UIState } | undefined;

      if (payload?.ui) {
        // Restore persisted UI preferences
        state.theme = payload.ui.theme;
        state.sidebar = payload.ui.sidebar;
      }

      // Always reset ephemeral states to defaults
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      };
      state.toast = null;
    });
  },
});

export const { toggleSidebar, setSidebarOpen, openModal, closeModal, setTheme, showToast, clearToast } =
  uiSlice.actions;

export default uiSlice.reducer;
