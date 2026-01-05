// ============================================================================
// SELECTORS - CENTRALIZED EXPORT
// ============================================================================

/**
 * 모든 selector의 통합 내보내기
 *
 * 이 파일을 통해서 모든 selector를 import 할 수 있습니다.
 * 사용 예시:
 * import * as authSelectors from '@/store/selectors';
 * const user = authSelectors.selectAuthUser(state);
 */

// Auth domain selectors
export * from './auth';

// UI domain selectors
export * from './ui';

// Dashboard domain selectors
export * from './dashboard';

// API state selectors
export * from './api';
