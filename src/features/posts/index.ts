/**
 * Posts Feature
 *
 * Exports all posts-related store
 */

// Store
export { postsApiSlice } from './store/apiSlice';
export {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from './store/apiSlice';
