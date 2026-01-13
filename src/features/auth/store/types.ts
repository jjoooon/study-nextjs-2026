/**
 * Auth Domain Types
 *
 * @description
 * Type definitions for authentication API contracts
 *
 * @architecture
 * - Feature-First: Types co-located with auth feature
 * - API Contracts: Request/Response types for backend communication
 *
 * @usage
 * Import from '@/features/auth/store/types' in auth API slice and components
 */

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * Login request payload
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Registration request payload
 */
export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

/**
 * Refresh token request payload
 */
export interface RefreshTokenInput {
  refreshToken: string;
}

/**
 * Change password request payload
 */
export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

/**
 * Update profile request payload
 */
export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * Authentication response
 */
export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
}

/**
 * User profile response
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
