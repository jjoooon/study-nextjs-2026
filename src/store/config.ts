/**
 * Redux Store Configuration
 *
 * @description
 * Persist, middleware, and DevTools configuration
 *
 * @architecture
 * - Separated from index.ts for better maintainability
 * - All non-runtime configuration in one place
 */

import type { Middleware } from '@reduxjs/toolkit';

import { performanceMiddleware } from './middleware/performance';
import { middlewareRegistry } from './registry/middleware';
import { secureStorage } from './storage';
import { transforms } from './transforms';

// ============================================================================
// PERSISTENCE CONFIGURATION
// ============================================================================

/**
 * Redux Persist Configuration (🔒 Security Hardened)
 *
 * @security
 * - sessionStorage 사용: 탭 닫으면 자동 삭제 (localStorage보다 안전)
 * - transforms로 민감 데이터 필터링: 토큰 저장 X
 * - XSS 공격 방지: 토큰이 브라우저 스토리지에 노출되지 않음
 *
 * @ux-improvement
 * - UI 상태 최적화: theme, sidebar만 저장 (modal, toast 제외)
 * - 일시적 상태는 새로고침 후 초기화
 *
 * @note
 * - 프로덕션에서는 httpOnly 쿠키 사용 권장 (서버 사이드)
 * - 현재 구현은 클라이언트 사이드 보안 강화
 */
export const persistConfig = {
  key: 'root',
  storage: secureStorage, // 🔒 sessionStorage 사용
  version: 1, // 향후 마이그레이션을 위한 버전 관리
  // 지속성을 적용할 리듀서
  whitelist: ['auth', 'ui'],
  // 🔒 transforms로 토큰 및 민감 데이터 자동 필터링
  transforms,
  // 블랙리스트: 특정 리듀서 제외
  blacklist: [],
} as const;

// ============================================================================
// MIDDLEWARE CONFIGURATION
// ============================================================================

/**
 * Middleware Priority Guide
 *
 * 0-9: Core checks (serializable, immutable)
 * 10-29: Performance & Monitoring
 * 30-49: Logging
 * 50-99: API middlewares
 * 100+: Error handling, analytics
 */

// Register core middleware
middlewareRegistry.registerMiddleware('performance', performanceMiddleware, 10);

/**
 * Get configured middleware array
 *
 * @param getDefaultMiddleware - RTK Query's default middleware getter
 * @returns Configured middleware array
 */
export const configureMiddleware = (getDefaultMiddleware: (...args: unknown[]) => Middleware[]) => {
  // Core middleware with optimizations
  const coreMiddleware = getDefaultMiddleware({
    // 직렬화 체크 최적화
    serializableCheck: {
      // 모든 RTK Query 내부 액션 무시 (자동 생성됨)
      ignoredActions: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'persist/REGISTER', // redux-persist 내부 액션
        'reducer/inject', // Dynamic reducer injection (함수 포함)
        'reducer/eject', // Dynamic reducer ejection
      ] as string[],
      // 정규식으로 모든 API 슬라이스 자동 무시
      ignoredPaths: [
        /^.*Api$/, // 'Api'로 끝나는 모든 경로
      ],
    },

    // Immutable 체크: 개발 모드에서만 실행
    immutableCheck:
      process.env.NODE_ENV === 'development'
        ? {
            // 정규식으로 모든 API 슬라이스 자동 무시
            ignoredPaths: [
              /^.*Api$/, // 'Api'로 끝나는 모든 경로
            ],
          }
        : false,
  } as Parameters<typeof getDefaultMiddleware>[0]);

  // Registry에서 등록된 미들웨어 합체
  const registryMiddleware = middlewareRegistry.getAllMiddleware();

  return coreMiddleware.concat(...registryMiddleware);
};

// ============================================================================
// DEVTOOLS CONFIGURATION
// ============================================================================

/**
 * Redux DevTools Configuration
 *
 * @description
 * - Enhanced action tracing
 * - Better action naming for API calls
 * - State sanitization for cleaner debugging
 */
export const devToolsConfig:
  | false
  | {
      trace: boolean;
      traceLimit: number;
      actionSanitizer: (action: { type: string }) => { type: string };
      stateSanitizer: (state: Record<string, unknown>) => Record<string, unknown>;
    } =
  process.env.NODE_ENV === 'development'
    ? {
        // DevTools의 액션 추적 기능 확장
        trace: true,
        traceLimit: 25,

        // 액션 이름을 더 읽기 쉽게 변환 (정규식으로 모든 API 자동 처리)
        actionSanitizer: (action: { type: string }) => {
          // 모든 API 액션 자동 처리 (예: usersApi, postsApi, dashboardApi 등)
          const apiMatch = action.type.match(/^(\w+)Api\/(.+)$/);
          if (apiMatch) {
            const [, apiName, rest] = apiMatch;
            return {
              ...action,
              type: `[${apiName}] ${rest}`
                .replace('/execute', '')
                .replace('/pending', '⏳')
                .replace('/fulfilled', '✅')
                .replace('/rejected', '❌'),
            };
          }
          return action;
        },

        // 상태를 더 읽기 쉽게 변환 (정규식으로 모든 API 자동 처리)
        stateSanitizer: (state: Record<string, unknown>) => {
          const sanitized = { ...state };

          // 불필요한 RTK Query 내부 상태 제거 (모든 API 자동 처리)
          Object.keys(sanitized).forEach((key) => {
            if (key.endsWith('Api')) {
              const apiState = sanitized[key] as Record<string, unknown> | undefined;
              if (apiState?.subscriptions) {
                delete apiState.subscriptions;
              }
            }
          });

          return sanitized as Record<string, unknown>;
        },
      }
    : false; // 프로덕션에서는 비활성화
