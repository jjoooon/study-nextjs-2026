/**
 * Dashboard Feature
 *
 * @description
 * 대시보드 기능의 통합 내보내기
 *
 * @usage
 * import { DashboardStats, RecentActivity } from '@/features/dashboard';
 * import { useDashboard } from '@/features/dashboard/hooks/dashboard';
 */

// Components
export { default as DashboardStats } from './components/DashboardStats';
export { default as RecentActivity } from './components/RecentActivity';

// Store
export { default as dashboardReducer } from './store/dashboardSlice';
export { toggleWidget, reorderWidgets } from './store/dashboardSlice';
export { dashboardApiSlice } from './store/apiSlice';

// Hooks
export * from './hooks/dashboard';

// Types
export * from './types';
