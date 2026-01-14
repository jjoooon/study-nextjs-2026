import * as authSelectors from '@/features/auth/store/authSelectors';
import { loginStart, loginSuccess, loginFailure, logout, clearError } from '@/features/auth/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// ============================================================================
// AUTH HOOKS (Selector-based)
// ============================================================================

/**
 * Auth 상태 관리 Hook
 *
 * @performance
 * - Selector 기반으로 불필요한 리렌더링 방지
 * - 각 상태가 독립적으로 구독되어 필요한 경우에만 리렌더링
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();

  // Selector 기반으로 개별 상태 구독
  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const user = useAppSelector(authSelectors.selectAuthUser);
  const token = useAppSelector(authSelectors.selectAuthToken);
  const isLoading = useAppSelector(authSelectors.selectAuthLoading);
  const error = useAppSelector(authSelectors.selectAuthError);

  return {
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    login: async (email: string, password: string) => {
      try {
        dispatch(loginStart());
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        dispatch(loginSuccess(data));
      } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
      }
    },
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  };
};

/**
 * 인증 상태만 가져오는 Hook
 */
export const useIsAuthenticated = () => {
  return useAppSelector(authSelectors.selectIsAuthenticated);
};

/**
 * 현재 사용자만 가져오는 Hook
 */
export const useCurrentUser = () => {
  return useAppSelector(authSelectors.selectAuthUser);
};

/**
 * 사용자 표시 이름
 */
export const useUserDisplayName = () => {
  return useAppSelector(authSelectors.selectUserDisplayName);
};

/**
 * 사용자 이니셜
 */
export const useUserInitials = () => {
  return useAppSelector(authSelectors.selectUserInitials);
};

/**
 * 특정 사용자와 현재 사용자 비교
 */
export const useIsCurrentUser = (userId: string | number) => {
  return useAppSelector(authSelectors.selectIsCurrentUser(userId));
};

/**
 * 특정 권한 확인
 */
export const useHasRole = (requiredRole: string) => {
  return useAppSelector(authSelectors.selectHasRole(requiredRole));
};

/**
 * 인증 상태와 사용자 정보를 동시에 가져오기
 */
export const useAuthStatus = () => {
  return useAppSelector(authSelectors.selectAuthStatus);
};
