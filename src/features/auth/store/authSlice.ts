import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string | null;
  name: string | null;
  email: string | null;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    name: null,
    email: null,
  },
  token: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: { id: string; name: string; email: string } }>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = { id: null, name: null, email: null };
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
