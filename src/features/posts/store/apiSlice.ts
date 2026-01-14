import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import log from '@/shared/utils/logger';
import type { CreatePostInput, UpdatePostInput, PostListParams } from '../types';

// ============================================================================
// POSTS API SLICE
// ============================================================================

/**
 * Posts 도메인 전용 API Slice
 *
 * @architecture
 * - 독립적인 reducerPath: 'postsApi'
 * - Posts 엔드포인트만 포함
 * - 다른 도메인과의 순환 의존성 제거
 *
 * @scalability
 * - Posts 팀이 독립적으로 개발 가능
 * - 빌드 시간 단축 (병렬 컴파일)
 * - 테스트 용이성 향상
 */

// Custom baseQuery (auth token injection)

const customBaseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    // Auth state에서 token 가져오기
    const state = getState() as { auth?: { token?: string | null } };
    const token = state.auth?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const postsApiSlice = createApi({
  reducerPath: 'postsApi',
  baseQuery: customBaseQuery,

  // Posts 도메인 전용 캐시 태그
  tagTypes: ['Post-LIST', 'Post-ITEM'] as const,

  // Posts 전용 캐시 설정
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    /**
     * 게시물 목록 조회
     * GET /api/posts
     */
    getPosts: builder.query({
      query: (params: PostListParams | void) => {
        if (!params) return '/posts';

        const searchParams = new URLSearchParams();

        // 페이지네이션
        if (params.page) searchParams.append('page', String(params.page));
        if (params.pageSize) searchParams.append('pageSize', String(params.pageSize));

        // 정렬
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

        // 필터
        if (params.filters) {
          if (params.filters.search) searchParams.append('search', params.filters.search);
          if (params.filters.status) searchParams.append('status', params.filters.status);
          if (params.filters.categoryId) searchParams.append('categoryId', String(params.filters.categoryId));
          if (params.filters.authorId) searchParams.append('authorId', String(params.filters.authorId));
          if (params.filters.tags && params.filters.tags.length > 0) {
            searchParams.append('tags', params.filters.tags.join(','));
          }
          if (params.filters.dateFrom) searchParams.append('dateFrom', params.filters.dateFrom);
          if (params.filters.dateTo) searchParams.append('dateTo', params.filters.dateTo);
        }

        return `/posts?${searchParams.toString()}`;
      },
      providesTags: ['Post-LIST'],
      keepUnusedDataFor: 300, // 5분 캐시
    }),

    /**
     * 게시물 상세 조회
     * GET /api/posts/:id
     */
    getPostById: builder.query({
      query: (id: number) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post-ITEM', id }],
      keepUnusedDataFor: 600, // 10분 캐시
    }),

    /**
     * 게시물 생성
     * POST /api/posts
     */
    createPost: builder.mutation({
      query: (post: CreatePostInput) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post-LIST'],

      // 성공 로그
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const postsLogger = log.getLogger('Posts');
          postsLogger.info('Post created', { postId: data.id });
        } catch (error) {
          const postsLogger = log.getLogger('Posts');
          postsLogger.error('Failed to create post', { error });
        }
      },
    }),

    /**
     * 게시물 수정
     * PATCH /api/posts/:id
     */
    updatePost: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdatePostInput }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['Post-LIST', { type: 'Post-ITEM', id }],
    }),

    /**
     * 게시물 삭제
     * DELETE /api/posts/:id
     */
    deletePost: builder.mutation({
      query: (id: number) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => ['Post-LIST', { type: 'Post-ITEM', id }],
    }),

    /**
     * 게시물 일괄 삭제
     * POST /api/posts/bulk-delete
     */
    deletePosts: builder.mutation({
      query: (ids: number[]) => ({
        url: '/posts/bulk-delete',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Post-LIST'],
    }),

    /**
     * 게시물 검색
     * GET /api/posts/search
     */
    searchPosts: builder.query({
      query: (searchTerm: string) => ({
        url: '/posts/search',
        params: { q: searchTerm },
      }),
      keepUnusedDataFor: 60, // 1분 캐시 (검색 결과는 짧게)
    }),

    /**
     * 게시물 발행 (draft -> published)
     * PATCH /api/posts/:id/publish
     */
    publishPost: builder.mutation({
      query: (id: number) => ({
        url: `/posts/${id}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, id) => ['Post-LIST', { type: 'Post-ITEM', id }],
    }),

    /**
     * 게시물 보관
     * PATCH /api/posts/:id/archive
     */
    archivePost: builder.mutation({
      query: (id: number) => ({
        url: `/posts/${id}/archive`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, id) => ['Post-LIST', { type: 'Post-ITEM', id }],
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Posts API 자동 생성된 React Hooks
 */
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useDeletePostsMutation,
  useSearchPostsQuery,
  usePublishPostMutation,
  useArchivePostMutation,
} = postsApiSlice;
