import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import log from '@/shared/utils/logger';

// ============================================================================
// USERS API SLICE
// ============================================================================

/**
 * Users 도메인 전용 API Slice
 */

// Custom baseQuery (auth token injection)
import type { CreateUserInput, UpdateUserInput, UserListParams } from '@/store/api/types/users';

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

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: customBaseQuery,

  // Users 도메인 전용 캐시 태그
  tagTypes: ['User-LIST', 'User-ITEM'] as const,

  // Users 전용 캐시 설정
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    /**
     * 사용자 목록 조회
     * GET /api/users
     */
    getUsers: builder.query({
      query: (params: UserListParams | void) => {
        if (!params) return '/users';

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
          if (params.filters.role) searchParams.append('role', params.filters.role);
          if (params.filters.status) searchParams.append('status', params.filters.status);
        }

        return `/users?${searchParams.toString()}`;
      },
      providesTags: ['User-LIST'],
      keepUnusedDataFor: 300, // 5분 캐시
    }),

    /**
     * 사용자 상세 조회
     * GET /api/users/:id
     */
    getUserById: builder.query({
      query: (id: number) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User-ITEM', id }],
      keepUnusedDataFor: 600, // 10분 캐시
    }),

    /**
     * 사용자 생성
     * POST /api/users
     */
    createUser: builder.mutation({
      query: (user: CreateUserInput) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User-LIST'],

      // 성공 로그
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const usersLogger = log.getLogger('Users');
          usersLogger.info('User created', { userId: data.id });
        } catch (error) {
          const usersLogger = log.getLogger('Users');
          usersLogger.error('Failed to create user', { error });
        }
      },
    }),

    /**
     * 사용자 수정
     * PATCH /api/users/:id
     */
    updateUser: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateUserInput }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => ['User-LIST', { type: 'User-ITEM', id }],
    }),

    /**
     * 사용자 삭제
     * DELETE /api/users/:id
     */
    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => ['User-LIST', { type: 'User-ITEM', id }],
    }),

    /**
     * 사용자 일괄 삭제
     * POST /api/users/bulk-delete
     */
    deleteUsers: builder.mutation({
      query: (ids: number[]) => ({
        url: '/users/bulk-delete',
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['User-LIST'],
    }),

    /**
     * 사용자 검색
     * GET /api/users/search
     */
    searchUsers: builder.query({
      query: (searchTerm: string) => ({
        url: '/users/search',
        params: { q: searchTerm },
      }),
      keepUnusedDataFor: 60, // 1분 캐시 (검색 결과는 짧게)
    }),

    /**
     * 사용자 상태 토글 (활성/비활성)
     * PATCH /api/users/:id/toggle-status
     */
    toggleUserStatus: builder.mutation({
      query: (id: number) => ({
        url: `/users/${id}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, id) => ['User-LIST', { type: 'User-ITEM', id }],
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Users API 자동 생성된 React Hooks
 */
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteUsersMutation,
  useSearchUsersQuery,
  useToggleUserStatusMutation,
} = usersApiSlice;
