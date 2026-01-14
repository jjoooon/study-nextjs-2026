/**
 * Users 컴포넌트 관련 타입
 *
 * @description
 * Users 기능 컴포넌트 Props 인터페이스 정의
 */

import type { User, UserFilters, CreateUserData, UpdateUserData } from './ui';

// ============================================================================
// USER LIST COMPONENTS
// ============================================================================

/**
 * UserList 컴포넌트 Props
 */
export interface UserListProps {
  /** 사용자 목록 */
  users: User[];
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 사용자 클릭 핸들러 */
  onUserClick?: (user: User) => void;
  /** 사용자 삭제 핸들러 */
  onDeleteUser?: (userId: string | number) => void;
  /** 사용자 편집 핸들러 */
  onEditUser?: (user: User) => void;
  /** 사용자 선택 토글 핸들러 */
  onToggleSelection?: (userId: string | number) => void;
}

/**
 * UserListItem 컴포넌트 Props
 */
export interface UserListItemProps {
  /** 사용자 정보 */
  user: User;
  /** 선택 여부 */
  isSelected?: boolean;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 클릭 핸들러 */
  onClick?: (user: User) => void;
  /** 삭제 핸들러 */
  onDelete?: (userId: string | number) => void;
  /** 편집 핸들러 */
  onEdit?: (user: User) => void;
}

/**
 * UserTable 컴포넌트 Props
 */
export interface UserTableProps {
  /** 사용자 목록 */
  users: User[];
  /** 컬럼 정의 */
  columns?: UserTableColumn[];
  /** 정렬 기준 */
  sortBy?: string;
  /** 정렬 순서 */
  sortOrder?: 'asc' | 'desc';
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 정렬 변경 핸들러 */
  onSort?: (column: string) => void;
  /** 사용자 선택 핸들러 */
  onSelectUser?: (userId: string | number) => void;
}

/**
 * UserTable 컬럼 정의
 */
export interface UserTableColumn {
  /** 컬럼 키 */
  key: string;
  /** 컬럼 라벨 */
  label: string;
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 너비 */
  width?: string | number;
}

// ============================================================================
// USER FORM COMPONENTS
// ============================================================================

/**
 * CreateUserForm 컴포넌트 Props
 */
export interface CreateUserFormProps {
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 제출 핸들러 */
  onSubmit: (data: CreateUserData) => Promise<void>;
  /** 취소 핸들러 */
  onCancel?: () => void;
  /** 초기값 */
  initialValues?: Partial<CreateUserData>;
}

/**
 * UpdateUserForm 컴포넌트 Props
 */
export interface UpdateUserFormProps {
  /** 사용자 정보 */
  user: User;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 제출 핸들러 */
  onSubmit: (data: UpdateUserData) => Promise<void>;
  /** 취소 핸들러 */
  onCancel?: () => void;
}

// ============================================================================
// USER FILTER COMPONENTS
// ============================================================================

/**
 * UserFilters 컴포넌트 Props
 */
export interface UserFiltersProps {
  /** 현재 필터 */
  filters: UserFilters;
  /** 필터 변경 핸들러 */
  onFiltersChange: (filters: UserFilters) => void;
  /** 사용 가능한 역할 목록 */
  availableRoles?: string[];
  /** 사용 가능한 상태 목록 */
  availableStatuses?: string[];
}

/**
 * UserSearch 컴포넌트 Props
 */
export interface UserSearchProps {
  /** 검색어 */
  searchQuery: string;
  /** 검색 핸들러 */
  onSearch: (query: string) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 디바운스 시간 (ms) */
  debounceMs?: number;
}

// ============================================================================
// USER DETAIL COMPONENTS
// ============================================================================

/**
 * UserDetail 컴포넌트 Props
 */
export interface UserDetailProps {
  /** 사용자 ID */
  userId: string | number;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 편집 모드 진입 핸들러 */
  onEdit?: () => void;
  /** 삭제 핸들러 */
  onDelete?: () => void;
}

/**
 * UserProfile 컴포넌트 Props
 */
export interface UserProfileProps {
  /** 사용자 정보 */
  user: User;
  /** 편집 가능 여부 */
  editable?: boolean;
  /** 편집 핸들러 */
  onEdit?: (user: User) => void;
}

// ============================================================================
// PAGINATION COMPONENTS
// ============================================================================

/**
 * UserPagination 컴포넌트 Props
 */
export interface UserPaginationProps {
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 총 항목 수 */
  totalItems: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 페이지 당 항목 수 */
  pageSize?: number;
  /** 페이지 크기 변경 핸들러 */
  onPageSizeChange?: (size: number) => void;
}
