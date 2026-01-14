/**
 * Users Store 관련 타입
 *
 * @description
 * Users Redux 상태 및 액션 페이로드 타입 정의
 */

import type { User, UserFilters } from './ui';

// ============================================================================
// USERS REDUX STATE
// ============================================================================

/**
 * Users Redux 상태
 *
 * @description
 * Users 도메인의 Redux 상태 구조
 */
export interface UsersState {
  /** 사용자 목록 */
  users: User[];
  /** 현재 선택된 사용자 */
  selectedUser: User | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 총 사용자 수 */
  total: number;
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 현재 필터 */
  filters: UserFilters;
}

/**
 * Users 초기 상태
 */
export const initialUsersState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 0,
  filters: {},
};

// ============================================================================
// ACTION PAYLOAD TYPES
// ============================================================================

/**
 * 사용자 선택 액션 페이로드
 */
export interface SelectUserPayload {
  userId: string | number;
}

/**
 * 사용자 필터 업데이트 액션 페이로드
 */
export interface UpdateFiltersPayload {
  filters: UserFilters;
}

/**
 * 사용자 정렬 변경 액션 페이로드
 */
export interface ChangeSortPayload {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * 사용자 페이지 변경 액션 페이로드
 */
export interface ChangePagePayload {
  page: number;
}

/**
 * 사용자 선택 토글 액션 페이로드
 */
export interface ToggleUserSelectionPayload {
  userId: string | number;
}

/**
 * 전체 사용자 선택/해제 액션 페이로드
 */
export interface ToggleAllUsersPayload {
  selectAll: boolean;
  userIds: Array<string | number>;
}
