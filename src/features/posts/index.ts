/**
 * Posts Feature
 *
 * @description
 * 게시물 관리 기능의 통합 내보내기
 *
 * @usage
 * import { useGetPostsQuery } from '@/features/posts';
 * import type { Post, CreatePostInput } from '@/features/posts';
 */

// Store
export { postsApiSlice } from './store/apiSlice';
export {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from './store/apiSlice';

// Types
export * from './types';
