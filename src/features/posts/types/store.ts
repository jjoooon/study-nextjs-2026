/**
 * Posts Store 관련 타입
 *
 * @description
 * Posts Redux 상태 및 액션 페이로드 타입 정의
 */

import type { Post, PostFilters } from './ui';

// ============================================================================
// POSTS REDUX STATE
// ============================================================================

/**
 * Posts Redux 상태
 *
 * @description
 * Posts 도메인의 Redux 상태 구조
 */
export interface PostsState {
  /** 게시물 목록 */
  posts: Post[];
  /** 현재 선택된 게시물 */
  selectedPost: Post | null;
  /** 로딩 상태 */
  isLoading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 총 게시물 수 */
  total: number;
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 현재 필터 */
  filters: PostFilters;
  /** 현재 뷰 모드 */
  viewMode: 'list' | 'grid' | 'calendar';
}

/**
 * Posts 초기 상태
 */
export const initialPostsState: PostsState = {
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 0,
  filters: {},
  viewMode: 'list',
};

// ============================================================================
// ACTION PAYLOAD TYPES
// ============================================================================

/**
 * 게시물 선택 액션 페이로드
 */
export interface SelectPostPayload {
  postId: string | number;
}

/**
 * 게시물 필터 업데이트 액션 페이로드
 */
export interface UpdateFiltersPayload {
  filters: PostFilters;
}

/**
 * 게시물 정렬 변경 액션 페이로드
 */
export interface ChangeSortPayload {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * 게시물 페이지 변경 액션 페이로드
 */
export interface ChangePagePayload {
  page: number;
}

/**
 * 게시물 선택 토글 액션 페이로드
 */
export interface TogglePostSelectionPayload {
  postId: string | number;
}

/**
 * 전체 게시물 선택/해제 액션 페이로드
 */
export interface ToggleAllPostsPayload {
  selectAll: boolean;
  postIds: Array<string | number>;
}

/**
 * 뷰 모드 변경 액션 페이로드
 */
export interface ChangeViewModePayload {
  viewMode: 'list' | 'grid' | 'calendar';
}
