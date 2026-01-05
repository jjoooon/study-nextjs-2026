import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  setTheme,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
