import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { AuthUser } from '@/features/auth/store/authSlice';

// ============================================================================
// AUTH SELECTORS
// ============================================================================

/**
 * Auth domain의 모든 selector
 *
 * @performance
 * - Memoized selectors로 불필요한 리렌더링 방지
 * - Computed selectors로 파생 상태 캐싱
 */

// Base selectors
export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectAuthToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 사용자 표시 이름 생성
 * 예: "John Doe (john@example.com)"
 */
export const selectUserDisplayName = createSelector(
  [selectAuthUser],
  (user) => user ? `${user.name} (${user.email})` : 'Guest'
);

/**
 * 사용자 초기 추출
 */
export const selectUserInitials = createSelector(
  [selectAuthUser],
  (user) => {
    if (!user || !user.name) return '?';
    const names = user.name.split(' ');
    return names.map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
);

/**
 * 인증 상태와 사용자 정보를 동시에 가져오기
 */
export const selectAuthStatus = createSelector(
  [selectIsAuthenticated, selectAuthUser, selectAuthLoading, selectAuthError],
  (isAuthenticated, user, isLoading, error) => ({
    isAuthenticated,
    user,
    isLoading,
    error,
  })
);

// ============================================================================
// PARAMETERIZED SELECTORS
// ============================================================================

/**
 * 특정 사용자 ID와 현재 로그인한 사용자 비교
 */
export const selectIsCurrentUser = (userId: string | number) =>
  createSelector(
    [selectAuthUser],
    (user) => user?.id === userId
  );

/**
 * 현재 사용자의 권한 확인
 */
export const selectHasRole = (requiredRole: string) =>
  createSelector(
    [selectAuthUser],
    (user) => user?.role === requiredRole
  );

/**
 * 현재 사용자가 특정 권한 중 하나라도 있는지 확인
 */
export const selectHasAnyRole = (requiredRoles: string[]) =>
  createSelector(
    [selectAuthUser],
    (user) => user?.role ? requiredRoles.includes(user.role) : false
  );
