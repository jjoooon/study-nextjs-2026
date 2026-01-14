import type { UnknownAction } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import type { AuthState } from '../types/store';

// Re-export the state type for consumers
export type { AuthState } from '../types/store';

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
  extraReducers: (builder) => {
    /**
     * REHYDRATE Handler
     *
     * @description
     * Handles state rehydration from sessionStorage.
     *
     * @security
     * - Token is never persisted (filtered by transform)
     * - After rehydration, token will be null
     * - isAuthenticated will be restored from persisted state
     * - UI should handle token==null + isAuthenticated==true by:
     *   1. Checking httpOnly cookie for token, OR
     *   2. Redirecting to login
     *
     * @note
     * In production with httpOnly cookies, the server validates the cookie
     * and the token field remains null on client side.
     */
    builder.addCase(REHYDRATE, (state, action: UnknownAction) => {
      const payload = action.payload as { auth?: AuthState } | undefined;

      if (payload?.auth) {
        // Restore persisted non-sensitive state
        state.isAuthenticated = payload.auth.isAuthenticated;
        state.user = payload.auth.user;
        // Token remains null (never persisted)
        state.token = null;
      }

      // Always reset temporary states
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
