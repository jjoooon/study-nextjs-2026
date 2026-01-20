/**
 * Auth Slice
 *
 * 인증 상태 관리를 위한 Redux Slice
 *
 * @description
 * - 사용자 인증 상태 관리
 * - 토큰 및 사용자 정보 저장
 * - 로그인/로그아웃 상태 관리
 *
 * @features
 * - 타입 안전한 상태 관리
 * - Redux Persist 통합 (로컬 스토리지 저장)
 * - 자동 로그인 지원
 */

import { createSlice } from '@reduxjs/toolkit';
import type { AuthState, User } from '../types/storeTypes';

// ============================================================================
// INITIAL STATE
// ============================================================================

/**
 * 초기 상태
 */
const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// ============================================================================
// SLICE
// ============================================================================

/**
 * Auth Slice
 *
 * 인증 상태를 관리하는 Redux Slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * 자격증명 저장
     *
     * 로그인 성공 시 토큰과 사용자 정보를 저장합니다.
     */
    setCredentials: (state, action: { payload: Pick<AuthState, 'token' | 'refreshToken' | 'user'> }) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },

    /**
     * 자격증명 제거 (로그아웃)
     *
     * 모든 인증 정보를 초기화합니다.
     */
    clearCredentials: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    /**
     * 로딩 시작
     *
     * 인증 관련 요청 시작 시 호출합니다.
     */
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    /**
     * 에러 설정
     *
     * 인증 관련 요청 실패 시 에러 메시지를 저장합니다.
     */
    setError: (state, action: { payload: string }) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    /**
     * 사용자 정보 업데이트
     *
     * 프로필 수정 등 사용자 정보 변경 시 사용합니다.
     */
    updateUser: (state, action: { payload: Partial<User> }) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// ============================================================================
// ACTIONS & REDUCER
// ============================================================================

export const { setCredentials, clearCredentials, setLoading, setError, updateUser } = authSlice.actions;
export default authSlice.reducer;

// 타입 export (selector에서 사용)
export type { AuthState } from '../types/storeTypes';
