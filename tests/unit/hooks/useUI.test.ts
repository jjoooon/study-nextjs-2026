import { describe, it, expect, beforeEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { setupStore } from '@/store';
import { Provider } from 'react-redux';
import { useUI, useSidebar, useModal } from '@/features/ui';

function wrapper({ children }: { children: React.ReactNode }) {
  const store = setupStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('UI Hooks', () => {
  describe('useUI', () => {
    it('returns initial UI state', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      expect(result.current.sidebar.isOpen).toBe(true);
      expect(result.current.modal.isOpen).toBe(false);
      expect(result.current.theme).toBe('light');
    });

    it('toggles sidebar', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebar.isOpen).toBe(false);

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebar.isOpen).toBe(true);
    });

    it('sets sidebar open state', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.setSidebarOpen(false);
      });

      expect(result.current.sidebar.isOpen).toBe(false);
    });

    it('opens modal with data', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.openModal('test-modal', { test: 'data' });
      });

      expect(result.current.modal.isOpen).toBe(true);
      expect(result.current.modal.type).toBe('test-modal');
      expect(result.current.modal.data).toEqual({ test: 'data' });
    });

    it('closes modal', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.openModal('test-modal');
      });

      expect(result.current.modal.isOpen).toBe(true);

      act(() => {
        result.current.closeModal();
      });

      expect(result.current.modal.isOpen).toBe(false);
    });

    it('shows toast', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.showToast('Test message', 'success');
      });

      expect(result.current.toast).toEqual({
        message: 'Test message',
        type: 'success',
        duration: 3000,
      });
    });

    it('clears toast', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.showToast('Test message', 'info');
      });

      expect(result.current.toast).not.toBeNull();

      act(() => {
        result.current.clearToast();
      });

      expect(result.current.toast).toBeNull();
    });

    it('sets theme', () => {
      const { result } = renderHook(() => useUI(), { wrapper });

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });
  });

  describe('useSidebar', () => {
    it('returns sidebar state', () => {
      const { result } = renderHook(() => useSidebar(), { wrapper });

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('useModal', () => {
    it('returns modal state', () => {
      const { result } = renderHook(() => useModal(), { wrapper });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.type).toBeNull();
    });
  });
});
