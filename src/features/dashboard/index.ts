/**
 * Dashboard Feature
 *
 * Exports all dashboard-related components and store
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
