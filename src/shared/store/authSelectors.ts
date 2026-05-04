import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux';
import type { AuthState } from './authSlice';

// ============================================================================
// AUTH SELECTORS
// ============================================================================

/**
 * Auth domain의 모든 selector
 *
 * @description
 * 인증 상태에 대한 selector
 * - user: 사용자 정보
 * - isAuthenticated: 인증 여부
 * - isLoading, error: 로딩 및 에러 상태
 *
 * @note 쿠키 기반 인증으로 변경되어 토큰 selector 제거됨
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
 * 사용자 사번 선택자
 */
export const selectUserEmployeeId = createSelector([selectUser], (user) => user?.employeeId ?? null);

/**
 * 사용자 역할 선택자
 */
export const selectUserRole = createSelector([selectUser], (user) => user?.role ?? null);

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
