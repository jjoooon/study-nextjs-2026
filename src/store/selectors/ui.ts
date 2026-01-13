import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// ============================================================================
// UI SELECTORS
// ============================================================================

/**
 * UI domain의 모든 selector
 */

// Base selectors
export const selectUIState = (state: RootState) => state.ui;

// Sidebar selectors
export const selectSidebar = createSelector([selectUIState], (ui) => ui.sidebar);

export const selectIsSidebarOpen = createSelector([selectSidebar], (sidebar) => sidebar.isOpen);

// Modal selectors
export const selectModal = createSelector([selectUIState], (ui) => ui.modal);

export const selectIsModalOpen = createSelector([selectModal], (modal) => modal.isOpen);

export const selectModalType = createSelector([selectModal], (modal) => modal.type);

export const selectModalData = createSelector([selectModal], (modal) => modal.data);

// Theme selectors
export const selectTheme = createSelector([selectUIState], (ui) => ui.theme);

export const selectIsDarkMode = createSelector([selectTheme], (theme) => theme === 'dark');

// Toast selectors
export const selectToast = createSelector([selectUIState], (ui) => ui.toast);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 현재 UI 상태 요약
 */
export const selectUIStatus = createSelector(
  [selectIsSidebarOpen, selectIsModalOpen, selectTheme],
  (isSidebarOpen, isModalOpen, theme) => ({
    isSidebarOpen,
    isModalOpen,
    theme,
  })
);

// ============================================================================
// PARAMETERIZED SELECTORS
// ============================================================================

/**
 * 특정 타입의 모달이 열려있는지 확인
 */
export const selectIsModalOfTypeOpen = (modalType: string) =>
  createSelector([selectModal], (modal) => modal.isOpen && modal.type === modalType);
