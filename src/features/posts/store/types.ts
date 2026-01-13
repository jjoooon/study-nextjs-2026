/**
 * Posts Domain Types
 *
 * @description
 * Type definitions for posts API contracts
 *
 * @architecture
 * - Feature-First: Types co-located with posts feature
 * - API Contracts: Request/Response types for backend communication
 */

// ============================================================================
// ENTITY TYPES
// ============================================================================

/**
 * Post entity
 */
export interface Post {
  id: string | number;
  title: string;
  content: string;
  slug?: string;
  authorId: string | number;
  authorName?: string;
  status?: 'draft' | 'published' | 'archived';
  categoryId?: number;
  tags?: string[];
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// REQUEST TYPES
// ============================================================================

/**
 * Create post request payload
 */
export interface CreatePostInput {
  title: string;
  content: string;
  status?: 'draft' | 'published' | 'archived';
}

/**
 * Update post request payload
 */
export interface UpdatePostInput {
  title?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
}

/**
 * Post filters for list queries
 */
export interface PostFilters {
  search?: string;
  status?: string;
  categoryId?: number;
  authorId?: number;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Post list query parameters
 */
export interface PostListParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: PostFilters;
}
