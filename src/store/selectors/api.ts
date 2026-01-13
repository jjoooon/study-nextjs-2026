import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// ============================================================================
// API STATE SELECTORS
// ============================================================================

/**
 * RTK Query API state selectors
 * 각 API 슬라이스의 쿼리 상태를 안전하게 접근
 */

// Users API selectors
export const selectUsersApiState = (state: RootState) => state.usersApi;

export const selectUsersQueries = createSelector(
  [selectUsersApiState],
  (usersApi) => usersApi?.queries || {}
);

export const selectIsUsersLoading = createSelector(
  [selectUsersQueries],
  (queries) =>
    Object.values(queries).some((query: any) => query?.status === 'pending')
);

// Posts API selectors
export const selectPostsApiState = (state: RootState) => state.postsApi;

export const selectPostsQueries = createSelector(
  [selectPostsApiState],
  (postsApi) => postsApi?.queries || {}
);

export const selectIsPostsLoading = createSelector(
  [selectPostsQueries],
  (queries) =>
    Object.values(queries).some((query: any) => query?.status === 'pending')
);

// Auth API selectors
export const selectAuthApiState = (state: RootState) => state.authApi;

export const selectAuthQueries = createSelector(
  [selectAuthApiState],
  (authApi) => authApi?.queries || {}
);

export const selectIsAuthApiLoading = createSelector(
  [selectAuthQueries],
  (queries) =>
    Object.values(queries).some((query: any) => query?.status === 'pending')
);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 전체 API 로딩 상태
 * 모든 API 슬라이스 중 하나라도 로딩 중이면 true
 */
export const selectIsAnyApiLoading = createSelector(
  [selectIsUsersLoading, selectIsPostsLoading, selectIsAuthApiLoading],
  (usersLoading, postsLoading, authLoading) =>
    usersLoading || postsLoading || authLoading
);

/**
 * API 요청 개수 집계
 */
export const selectApiRequestCount = createSelector(
  [
    selectUsersQueries,
    selectPostsQueries,
    selectAuthQueries,
  ],
  (usersQueries, postsQueries, authQueries) => {
    const pendingCount =
      Object.values(usersQueries).filter((q: any) => q?.status === 'pending').length +
      Object.values(postsQueries).filter((q: any) => q?.status === 'pending').length +
      Object.values(authQueries).filter((q: any) => q?.status === 'pending').length;

    const fulfilledCount =
      Object.values(usersQueries).filter((q: any) => q?.status === 'fulfilled').length +
      Object.values(postsQueries).filter((q: any) => q?.status === 'fulfilled').length +
      Object.values(authQueries).filter((q: any) => q?.status === 'fulfilled').length;

    const rejectedCount =
      Object.values(usersQueries).filter((q: any) => q?.status === 'rejected').length +
      Object.values(postsQueries).filter((q: any) => q?.status === 'rejected').length +
      Object.values(authQueries).filter((q: any) => q?.status === 'rejected').length;

    return {
      pending: pendingCount,
      fulfilled: fulfilledCount,
      rejected: rejectedCount,
      total: pendingCount + fulfilledCount + rejectedCount,
    };
  }
);
