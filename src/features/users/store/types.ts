/**
 * Users Domain Types
 *
 * @description
 * Type definitions for users API contracts
 *
 * @architecture
 * - Feature-First: Types co-located with users feature
 * - API Contracts: Request/Response types for backend communication
 */

// ============================================================================
// ENTITY TYPES
// ============================================================================

/**
 * User entity
 */
export interface User {
  id: string | number;
  email: string;
  name: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * Create user request payload
 */
export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: string;
}

/**
 * Update user request payload
 */
export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: string;
}

/**
 * User filters for list queries
 */
export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
}

/**
 * User list query parameters
 */
export interface UserListParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: UserFilters;
}
