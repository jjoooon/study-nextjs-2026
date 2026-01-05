import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { setupStore } from '@/store';
import { Provider } from 'react-redux';
import { useAuth, useIsAuthenticated, useCurrentUser } from '@/features/auth';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        token: 'test-token',
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
      }),
  })
) as jest.MockedFunction<typeof fetch>;

function wrapper({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('Auth Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useAuth', () => {
    it('returns initial auth state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('handles login successfully', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('handles logout', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('clears errors', () => {
      const store = setupStore();
      store.dispatch({
        type: 'auth/loginFailure',
        payload: 'Test error',
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
      });

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('useIsAuthenticated', () => {
    it('returns authentication status', () => {
      const { result } = renderHook(() => useIsAuthenticated(), { wrapper });

      expect(result.current).toBe(false);
    });
  });

  describe('useCurrentUser', () => {
    it('returns current user', () => {
      const { result } = renderHook(() => useCurrentUser(), { wrapper });

      expect(result.current).toEqual({
        id: null,
        name: null,
        email: null,
      });
    });
  });
});
