/**
 * Shared Module Index
 *
 * Exports all shared utilities, components, and re-exports store utilities
 */

// Components
export * from './components';

// Store utilities - re-exported from main store for convenience
export { useAppDispatch, useAppSelector } from '@/store';

// Utils
export { default as log } from './utils/logger';
