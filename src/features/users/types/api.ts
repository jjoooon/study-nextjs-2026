/**
 * Users API 관련 타입
 *
 * @description
 * 사용자 관리 API 요청/응답 타입 정의
 */

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * 사용자 생성 요청
 */
export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: string;
}

/**
 * 사용자 수정 요청
 */
export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: string;
}

/**
 * 사용자 삭제 요청
 */
export interface DeleteUserInput {
  id: number;
}

/**
 * 사용자 일괄 삭제 요청
 */
export interface BulkDeleteUsersInput {
  ids: number[];
}

/**
 * 사용자 검색 요청
 */
export interface SearchUsersInput {
  searchTerm: string;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * 사용자 목록 응답
 */
export interface UsersListResponse {
  /** 사용자 목록 */
  data: User[];
  /** 전체 항목 수 */
  total: number;
  /** 현재 페이지 */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
}

/**
 * 사용자 상세 응답
 */
export interface UserDetailResponse {
  user: User;
}

/**
 * 사용자 생성 응답
 */
export interface CreateUserResponse {
  id: string | number;
  email: string;
  name: string;
  role?: string;
  createdAt: string;
}

/**
 * 사용자 수정 응답
 */
export interface UpdateUserResponse {
  id: string | number;
  email?: string;
  name?: string;
  role?: string;
  updatedAt: string;
}

/**
 * 사용자 삭제 응답
 */
export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

/**
 * 사용자 검색 응답
 */
export interface SearchUsersResponse {
  results: User[];
  total: number;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * 사용자 관련 에러 응답
 */
export interface UserError {
  message: string;
  code?: string;
  field?: string;
}

// Forward import from ui.ts to avoid circular dependency
import type { User } from './ui';
