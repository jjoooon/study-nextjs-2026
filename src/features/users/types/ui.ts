/**
 * Users UI 관련 타입
 *
 * @description
 * 사용자 관리 UI 상태와 컴포넌트 구조를 정의
 */

// ============================================================================
// USER ENTITY TYPES
// ============================================================================

/**
 * 사용자 엔티티
 *
 * @description
 * UI에서 표시하는 사용자 정보
 */
export interface User {
  /** 사용자 고유 ID */
  id: string | number;
  /** 사용자 이메일 */
  email: string;
  /** 사용자 이름 */
  name: string;
  /** 사용자 역할 (선택적) */
  role?: string;
  /** 사용자 상태 (선택적) */
  status?: string;
  /** 생성일 (선택적) */
  createdAt?: string;
  /** 수정일 (선택적) */
  updatedAt?: string;
}

/**
 * 사용자 역할 유형
 */
export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';

/**
 * 사용자 상태 유형
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

// ============================================================================
// USERS UI STATE TYPES
// ============================================================================

/**
 * 사용자 관리 UI 상태
 *
 * @description
 * 사용자 목록, 필터, 선택 등의 UI 상태
 */
export interface UsersUIState {
  /** 선택된 사용자 ID 목록 */
  selectedUserIds: Array<string | number>;
  /** 현재 검색어 */
  searchQuery: string;
  /** 현재 페이지 */
  currentPage: number;
  /** 페이지 당 항목 수 */
  pageSize: number;
  /** 현재 정렬 기준 */
  sortBy: string;
  /** 정렬 순서 */
  sortOrder: 'asc' | 'desc';
  /** 현재 필터 */
  activeFilters: UserFilters;
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 편집 모드 사용자 ID (null = 없음) */
  editingUserId: string | number | null;
  /** 삭제 확인 다이얼로그 표시 여부 */
  showDeleteDialog: boolean;
}

// ============================================================================
// FORM TYPES
// ============================================================================

/**
 * 사용자 생성 폼 상태
 */
export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

/**
 * 사용자 수정 폼 상태
 */
export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: string;
  status?: string;
}

/**
 * 사용자 필터 상태
 */
export interface UserFilters {
  /** 검색어 */
  search?: string;
  /** 역할 필터 */
  role?: string;
  /** 상태 필터 */
  status?: string;
}

/**
 * 사용자 목록 쿼리 매개변수
 */
export interface UserListParams {
  /** 페이지 번호 */
  page?: number;
  /** 페이지 당 항목 수 */
  pageSize?: number;
  /** 제한 수 */
  limit?: number;
  /** 정렬 기준 */
  sortBy?: string;
  /** 정렬 순서 */
  sortOrder?: 'asc' | 'desc';
  /** 필터 */
  filters?: UserFilters;
}
