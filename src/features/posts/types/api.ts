/**
 * Posts API 관련 타입
 *
 * @description
 * 게시물 관리 API 요청/응답 타입 정의
 */

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * 게시물 생성 요청
 */
export interface CreatePostInput {
  title: string;
  content: string;
  status?: 'draft' | 'published' | 'archived';
  categoryId?: number;
  tags?: string[];
}

/**
 * 게시물 수정 요청
 */
export interface UpdatePostInput {
  title?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
  categoryId?: number;
  tags?: string[];
}

/**
 * 게시물 삭제 요청
 */
export interface DeletePostInput {
  id: number;
}

/**
 * 게시물 일괄 삭제 요청
 */
export interface BulkDeletePostsInput {
  ids: number[];
}

/**
 * 게시물 검색 요청
 */
export interface SearchPostsInput {
  searchTerm: string;
}

/**
 * 게시물 발행 요청
 */
export interface PublishPostInput {
  id: number;
}

/**
 * 게시물 보관 요청
 */
export interface ArchivePostInput {
  id: number;
}

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/**
 * 게시물 목록 응답
 */
export interface PostsListResponse {
  /** 게시물 목록 */
  data: Post[];
  /** 전체 항목 수 */
  total: number;
  /** 현재 페이지 */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
}

/**
 * 게시물 상세 응답
 */
export interface PostDetailResponse {
  post: Post;
}

/**
 * 게시물 생성 응답
 */
export interface CreatePostResponse {
  id: string | number;
  title: string;
  content: string;
  status: string;
  slug?: string;
  createdAt: string;
}

/**
 * 게시물 수정 응답
 */
export interface UpdatePostResponse {
  id: string | number;
  title?: string;
  content?: string;
  status?: string;
  updatedAt: string;
}

/**
 * 게시물 삭제 응답
 */
export interface DeletePostResponse {
  success: boolean;
  message: string;
}

/**
 * 게시물 검색 응답
 */
export interface SearchPostsResponse {
  results: Post[];
  total: number;
}

/**
 * 게시물 발행 응답
 */
export interface PublishPostResponse {
  id: string | number;
  status: 'published';
  publishedAt: string;
}

/**
 * 게시물 보관 응답
 */
export interface ArchivePostResponse {
  id: string | number;
  status: 'archived';
  archivedAt: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * 게시물 관련 에러 응답
 */
export interface PostError {
  message: string;
  code?: string;
  field?: string;
}

// Forward import from ui.ts to avoid circular dependency
import type { Post } from './ui';
