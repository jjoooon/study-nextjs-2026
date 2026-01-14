/**
 * Posts UI 관련 타입
 *
 * @description
 * 게시물 관리 UI 상태와 컴포넌트 구조를 정의
 */

// ============================================================================
// POST ENTITY TYPES
// ============================================================================

/**
 * 게시물 엔티티
 *
 * @description
 * UI에서 표시하는 게시물 정보
 */
export interface Post {
  /** 게시물 고유 ID */
  id: string | number;
  /** 게시물 제목 */
  title: string;
  /** 게시물 내용 */
  content: string;
  /** 슬러그 (선택적) */
  slug?: string;
  /** 작성자 ID */
  authorId: string | number;
  /** 작성자 이름 (선택적) */
  authorName?: string;
  /** 게시물 상태 */
  status?: 'draft' | 'published' | 'archived';
  /** 카테고리 ID (선택적) */
  categoryId?: number;
  /** 태그 목록 (선택적) */
  tags?: string[];
  /** 조회수 (선택적) */
  viewCount?: number;
  /** 좋아요 수 (선택적) */
  likeCount?: number;
  /** 댓글 수 (선택적) */
  commentCount?: number;
  /** 생성일 (선택적) */
  createdAt?: string;
  /** 수정일 (선택적) */
  updatedAt?: string;
}

/**
 * 게시물 상태 유형
 */
export type PostStatus = 'draft' | 'published' | 'archived';

// ============================================================================
// POSTS UI STATE TYPES
// ============================================================================

/**
 * 게시물 관리 UI 상태
 *
 * @description
 * 게시물 목록, 필터, 선택 등의 UI 상태
 */
export interface PostsUIState {
  /** 선택된 게시물 ID 목록 */
  selectedPostIds: Array<string | number>;
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
  activeFilters: PostFilters;
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 편집 모드 게시물 ID (null = 없음) */
  editingPostId: string | number | null;
  /** 삭제 확인 다이얼로그 표시 여부 */
  showDeleteDialog: boolean;
  /** 현재 뷰 모드 */
  viewMode: 'list' | 'grid' | 'calendar';
}

// ============================================================================
// FORM TYPES
// ============================================================================

/**
 * 게시물 생성 폼 상태
 */
export interface CreatePostData {
  title: string;
  content: string;
  status?: 'draft' | 'published' | 'archived';
  categoryId?: number;
  tags?: string[];
}

/**
 * 게시물 수정 폼 상태
 */
export interface UpdatePostData {
  title?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
  categoryId?: number;
  tags?: string[];
}

/**
 * 게시물 필터 상태
 */
export interface PostFilters {
  /** 검색어 */
  search?: string;
  /** 상태 필터 */
  status?: string;
  /** 카테고리 필터 */
  categoryId?: number;
  /** 작성자 필터 */
  authorId?: number;
  /** 태그 필터 */
  tags?: string[];
  /** 시작 날짜 */
  dateFrom?: string;
  /** 종료 날짜 */
  dateTo?: string;
}

/**
 * 게시물 목록 쿼리 매개변수
 */
export interface PostListParams {
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
  filters?: PostFilters;
}
