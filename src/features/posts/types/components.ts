/**
 * Posts 컴포넌트 관련 타입
 *
 * @description
 * Posts 기능 컴포넌트 Props 인터페이스 정의
 */

import type { Post, PostFilters, CreatePostData, UpdatePostData } from './ui';

// ============================================================================
// POST LIST COMPONENTS
// ============================================================================

/**
 * PostList 컴포넌트 Props
 */
export interface PostListProps {
  /** 게시물 목록 */
  posts: Post[];
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 게시물 클릭 핸들러 */
  onPostClick?: (post: Post) => void;
  /** 게시물 삭제 핸들러 */
  onDeletePost?: (postId: string | number) => void;
  /** 게시물 편집 핸들러 */
  onEditPost?: (post: Post) => void;
  /** 게시물 선택 토글 핸들러 */
  onToggleSelection?: (postId: string | number) => void;
  /** 뷰 모드 */
  viewMode?: 'list' | 'grid' | 'calendar';
}

/**
 * PostListItem 컴포넌트 Props
 */
export interface PostListItemProps {
  /** 게시물 정보 */
  post: Post;
  /** 선택 여부 */
  isSelected?: boolean;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 클릭 핸들러 */
  onClick?: (post: Post) => void;
  /** 삭제 핸들러 */
  onDelete?: (postId: string | number) => void;
  /** 편집 핸들러 */
  onEdit?: (post: Post) => void;
  /** 발행 핸들러 */
  onPublish?: (postId: string | number) => void;
  /** 보관 핸들러 */
  onArchive?: (postId: string | number) => void;
}

/**
 * PostCard 컴포넌트 Props (Grid View)
 */
export interface PostCardProps {
  /** 게시물 정보 */
  post: Post;
  /** 선택 여부 */
  isSelected?: boolean;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 클릭 핸들러 */
  onClick?: (post: Post) => void;
  /** 삭제 핸들러 */
  onDelete?: (postId: string | number) => void;
  /** 편집 핸들러 */
  onEdit?: (post: Post) => void;
}

// ============================================================================
// POST FORM COMPONENTS
// ============================================================================

/**
 * CreatePostForm 컴포넌트 Props
 */
export interface CreatePostFormProps {
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 제출 핸들러 */
  onSubmit: (data: CreatePostData) => Promise<void>;
  /** 취소 핸들러 */
  onCancel?: () => void;
  /** 초기값 */
  initialValues?: Partial<CreatePostData>;
  /** 사용 가능한 카테고리 목록 */
  availableCategories?: Array<{ id: number; name: string }>;
}

/**
 * UpdatePostForm 컴포넌트 Props
 */
export interface UpdatePostFormProps {
  /** 게시물 정보 */
  post: Post;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 제출 핸들러 */
  onSubmit: (data: UpdatePostData) => Promise<void>;
  /** 취소 핸들러 */
  onCancel?: () => void;
  /** 사용 가능한 카테고리 목록 */
  availableCategories?: Array<{ id: number; name: string }>;
}

// ============================================================================
// POST FILTER COMPONENTS
// ============================================================================

/**
 * PostFilters 컴포넌트 Props
 */
export interface PostFiltersProps {
  /** 현재 필터 */
  filters: PostFilters;
  /** 필터 변경 핸들러 */
  onFiltersChange: (filters: PostFilters) => void;
  /** 사용 가능한 상태 목록 */
  availableStatuses?: string[];
  /** 사용 가능한 카테고리 목록 */
  availableCategories?: Array<{ id: number; name: string }>;
  /** 사용 가능한 태그 목록 */
  availableTags?: string[];
}

/**
 * PostSearch 컴포넌트 Props
 */
export interface PostSearchProps {
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
// POST DETAIL COMPONENTS
// ============================================================================

/**
 * PostDetail 컴포넌트 Props
 */
export interface PostDetailProps {
  /** 게시물 ID */
  postId: string | number;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 편집 모드 진입 핸들러 */
  onEdit?: () => void;
  /** 삭제 핸들러 */
  onDelete?: () => void;
  /** 발행 핸들러 */
  onPublish?: () => void;
  /** 보관 핸들러 */
  onArchive?: () => void;
}

/**
 * PostContent 컴포넌트 Props
 */
export interface PostContentProps {
  /** 게시물 정보 */
  post: Post;
  /** 편집 가능 여부 */
  editable?: boolean;
  /** 편집 핸들러 */
  onEdit?: (post: Post) => void;
  /** HTML 렌더링 여부 */
  renderHtml?: boolean;
}

// ============================================================================
// POST EDITOR COMPONENTS
// ============================================================================

/**
 * PostEditor 컴포넌트 Props
 */
export interface PostEditorProps {
  /** 게시물 정보 (수정 모드) */
  post?: Post;
  /** 로딩 중 여부 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
  /** 저장 핸들러 */
  onSave: (data: CreatePostData | UpdatePostData) => Promise<void>;
  /** 취소 핸들러 */
  onCancel?: () => void;
  /** 자동 저장 활성화 여부 */
  enableAutoSave?: boolean;
  /** 자동 저장 간격 (ms) */
  autoSaveInterval?: number;
}

// ============================================================================
// PAGINATION COMPONENTS
// ============================================================================

/**
 * PostPagination 컴포넌트 Props
 */
export interface PostPaginationProps {
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

// ============================================================================
// VIEW MODE COMPONENTS
// ============================================================================

/**
 * ViewModeToggle 컴포넌트 Props
 */
export interface ViewModeToggleProps {
  /** 현재 뷰 모드 */
  currentViewMode: 'list' | 'grid' | 'calendar';
  /** 뷰 모드 변경 핸들러 */
  onViewModeChange: (viewMode: 'list' | 'grid' | 'calendar') => void;
}
