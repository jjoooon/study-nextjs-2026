// ============================================================================
// POSTS SLICE - 통합 내보내기
// ============================================================================

/**
 * Posts 도메인 관련 모든 기능의 통합 내보내기
 *
 * 이 파일을 통해서 Posts 관련 모든 것을 import 할 수 있습니다.
 */

// API Slice
export { postsApiSlice } from './apiSlice';
export * from './apiSlice';

// Slices (동기 상태)
// 추후 추가: export { postsSlice } from './slice';
// 추후 추가: export * from './selectors';

// Types (모든 타입 통합 내보내기)
export * from '../types';
