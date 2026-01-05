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

export interface CreatePostInput {
  title: string;
  content: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface PostFilters {
  search?: string;
  status?: string;
  categoryId?: number;
  authorId?: number;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface PostListParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: PostFilters;
}
