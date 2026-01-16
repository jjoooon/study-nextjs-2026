import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

import type { AuthState } from './authSlice';

// ============================================================================
// AUTH SELECTORS
// ============================================================================

/**
 * Auth domain의 모든 selector
 *
 * @description
 * 인증 상태에 대한 selector
 * - token, refreshToken: 토큰 정보
 * - user: 사용자 정보
 * - isAuthenticated: 인증 여부
 * - isLoading, error: 로딩 및 에러 상태
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */

// ============================================================================
// BASE SELECTORS
// ============================================================================

/**
 * Auth State 선택자
 */
export const selectAuthState = (state: RootState): AuthState => state.auth;

/**
 * 인증 여부 선택자
 */
export const selectIsAuthenticated = createSelector([selectAuthState], (auth) => auth.isAuthenticated);

/**
 * 사용자 정보 선택자
 */
export const selectUser = createSelector([selectAuthState], (auth) => auth.user);

/**
 * 액세스 토큰 선택자
 */
export const selectToken = createSelector([selectAuthState], (auth) => auth.token);

/**
 * 리프레시 토큰 선택자
 */
export const selectRefreshToken = createSelector([selectAuthState], (auth) => auth.refreshToken);

/**
 * 로딩 상태 선택자
 */
export const selectAuthLoading = createSelector([selectAuthState], (auth) => auth.isLoading);

/**
 * 에러 메시지 선택자
 */
export const selectAuthError = createSelector([selectAuthState], (auth) => auth.error);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 사용자 이름 선택자
 */
export const selectUserName = createSelector([selectUser], (user) => user?.name ?? null);

/**
 * 사용자 이메일 선택자
 */
export const selectUserEmail = createSelector([selectUser], (user) => user?.email ?? null);

/**
 * 사용자 역할 선택자
 */
export const selectUserRole = createSelector([selectUser], (user) => user?.role ?? null);

/**
 * 사용자 아바타 선택자
 */
export const selectUserAvatar = createSelector([selectUser], (user) => user?.avatar ?? null);

/**
 * 인증 상태 요약
 */
export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectAuthLoading, selectAuthError],
  (isAuthenticated, isLoading, error) => ({
    isAuthenticated,
    isLoading,
    error,
  })
);
