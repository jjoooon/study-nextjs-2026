// ============================================================================
// DASHBOARD FEATURE - 통합 내보내기
// ============================================================================

/**
 * Dashboard 도메인 관련 모든 기능의 통합 내보내기
 */

// Dashboard Slice (export default and types)
export { default } from './dashboardSlice';
export type { DashboardState } from '../types/store';
export type { Widget } from '../types/ui';

// Dashboard Slice actions
export { toggleWidget, reorderWidgets } from './dashboardSlice';

// API Slice
export { dashboardApiSlice } from './apiSlice';
export * from './apiSlice';

// Selectors (Feature-First pattern)
export * from './dashboardSelectors';

// Types (모든 타입 통합 내보내기)
export * from '../types';
