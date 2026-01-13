import type { Reducer, AnyAction } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';

import log from '@/shared/utils/logger';
import { store } from '@/store';
import { injectReducer, ejectReducer } from '@/store/reducers/registry';

// ============================================================================
// DYNAMIC REDUCER HOOKS
// ============================================================================

/**
 * 리듀서 지연 로딩 훅
 *
 * @description
 * 컴포넌트 마운트 시 리듀서를 주입하고, 언마운트 시 자동 정리
 *
 * @param key - 리듀서 고유 키
 * @param reducer - 리듀서 함수
 * @param options - 옵션 (우선순위, 자동 제거 등)
 *
 * @example
 * const analyticsReducer = (state = { events: [] }, action) => { ... };
 *
 * function AnalyticsPage() {
 *   useInjectReducer('analytics', analyticsReducer, { priority: 30 });
 *   return <div>...</div>;
 * }
 */
export interface UseInjectReducerOptions {
  /**
   * 리듀서 실행 우선순위 (낮을수록 먼저 실행)
   * @default 50
   */
  priority?: number;

  /**
   * 컴포넌트 언마운트 시 리듀서 자동 제거
   * @default false
   *
   * @note true인 경우 컴포넌트가 언마운트될 때 리듀서가 제거됨
   * @note 여러 컴포넌트에서 같은 리듀서를 사용하는 경우 false로 설정
   */
  ejectOnUnmount?: boolean;
}

export const useInjectReducer = (key: string, reducer: Reducer, options: UseInjectReducerOptions = {}) => {
  const { priority = 50, ejectOnUnmount = false } = options;
  const isInjected = useRef(false);

  useEffect(() => {
    if (!isInjected.current) {
      try {
        store.dispatch(injectReducer(key, reducer, priority) as unknown as AnyAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Reducer injected via hook: ${key}`);

        isInjected.current = true;
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject reducer: ${key}`, error);
      }
    }

    // Cleanup function
    if (ejectOnUnmount) {
      return () => {
        try {
          store.dispatch(ejectReducer(key) as unknown as AnyAction);

          const logger = log.getLogger('ReducerRegistry');
          logger.debug(`🗑️  Reducer ejected via hook: ${key}`);

          isInjected.current = false;
        } catch (error) {
          const logger = log.getLogger('ReducerRegistry');
          logger.error(`❌ Failed to eject reducer: ${key}`, error);
        }
      };
    }

    return () => {};
  }, [key, reducer, priority, ejectOnUnmount]);
};

// ============================================================================
// ASYNC REDUCER LOADING
// ============================================================================

/**
 * 비동기 리듀서 로딩 훅
 *
 * @description
 * Promise 기반으로 리듀서를 비동기적으로 로드
 *
 * @param key - 리듀서 고유 키
 * @param reducerPromise - 리듀서를 반환하는 Promise
 * @param options - 옵션
 *
 * @returns { loading, error, injected }
 *
 * @example
 * const { loading, error, injected } = useLazyReducer(
 *   'analytics',
 *   import('./analytics/reducer').then(m => m.analyticsReducer)
 * );
 *
 * if (loading) return <LoadingSpinner />;
 * if (error) return <ErrorMessage error={error} />;
 * return <AnalyticsDashboard />;
 */
export interface UseLazyReducerOptions {
  /**
   * 리듀서 실행 우선순위
   * @default 50
   */
  priority?: number;

  /**
   * 로딩 상태에서 즉시 주입 시도 (중복 주입 방지)
   * @default true
   */
  injectImmediately?: boolean;
}

export interface UseLazyReducerResult {
  loading: boolean;
  error: Error | null;
  injected: boolean;
}

export const useLazyReducer = (
  key: string,
  reducerPromise: Promise<Reducer>,
  options: UseLazyReducerOptions = {}
): UseLazyReducerResult => {
  const { priority = 50, injectImmediately = true } = options;

  const result = useRef<UseLazyReducerResult>({
    loading: true,
    error: null,
    injected: false,
  });

  useEffect(() => {
    let mounted = true;

    const loadReducer = async () => {
      try {
        const reducer = await reducerPromise;

        if (mounted) {
          store.dispatch(injectReducer(key, reducer, priority) as unknown as AnyAction);

          result.current = {
            loading: false,
            error: null,
            injected: true,
          };

          const logger = log.getLogger('ReducerRegistry');
          logger.debug(`✅ Lazy reducer loaded: ${key}`);
        }
      } catch (error) {
        if (mounted) {
          result.current = {
            loading: false,
            error: error as Error,
            injected: false,
          };

          const logger = log.getLogger('ReducerRegistry');
          logger.error(`❌ Failed to load lazy reducer: ${key}`, error);
        }
      }
    };

    if (injectImmediately && !result.current.injected) {
      loadReducer();
    }

    return () => {
      mounted = false;
    };
  }, [key, reducerPromise, priority, injectImmediately]);

  return result.current;
};

// ============================================================================
// FEATURE FLAG BASED LOADING
// ============================================================================

/**
 * Feature Flag 기반 조건부 리듀서 로딩
 *
 * @description
 * Feature flag가 활성화된 경우에만 리듀서 로드
 *
 * @param key - 리듀서 고유 키
 * @param reducer - 리듀서 함수
 * @param enabled - Feature flag (true면 로드)
 * @param options - 옵션
 *
 * @example
 * const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
 *
 * function Dashboard() {
 *   useConditionalReducer('analytics', analyticsReducer, ANALYTICS_ENABLED);
 *   return <div>...</div>;
 * }
 */
export const useConditionalReducer = (
  key: string,
  reducer: Reducer,
  enabled: boolean,
  options: UseInjectReducerOptions = {}
) => {
  useEffect(() => {
    if (enabled) {
      try {
        store.dispatch(injectReducer(key, reducer, options.priority) as unknown as AnyAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Conditional reducer enabled: ${key}`);
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject conditional reducer: ${key}`, error);
      }
    }

    return () => {};
  }, [key, reducer, enabled, options]);
};

// ============================================================================
// ROLE-BASED REDUCER LOADING
// ============================================================================

/**
 * 권한 기반 리듀서 로딩
 *
 * @description
 * 사용자 역할(role)에 따라 리듀서 조건부 로드
 *
 * @param key - 리듀서 고유 키
 * @param reducer - 리듀서 함수
 * @param userRole - 사용자 역할
 * @param allowedRoles - 허용된 역할 목록
 * @param options - 옵션
 *
 * @example
 * function AdminPanel({ userRole }) {
 *   useRoleBasedReducer(
 *     'admin',
 *     adminReducer,
 *     userRole,
 *     ['admin', 'superadmin']
 *   );
 *
 *   return <div>Admin Panel</div>;
 * }
 */
export const useRoleBasedReducer = (
  key: string,
  reducer: Reducer,
  userRole: string | null,
  allowedRoles: string[],
  options: UseInjectReducerOptions = {}
) => {
  useEffect(() => {
    const isAuthorized = userRole && allowedRoles.includes(userRole);

    if (isAuthorized) {
      try {
        store.dispatch(injectReducer(key, reducer, options.priority) as unknown as AnyAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Role-based reducer authorized: ${key} (${userRole})`);
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject role-based reducer: ${key}`, error);
      }
    }

    return () => {};
  }, [key, reducer, userRole, allowedRoles, options]);
};

// ============================================================================
// BATCH REDUCER LOADING
// ============================================================================

/**
 * 여러 리듀서를 한 번에 로드
 *
 * @description
 * 여러 feature의 리듀서를 동시에 주입
 *
 * @param reducers - 리듀서 Map { key: reducer }
 * @param options - 공통 옵션
 *
 * @example
 * useBatchReducers({
 *   analytics: analyticsReducer,
 *   reporting: reportingReducer,
 *   insights: insightsReducer
 * }, { priority: 30 });
 */
export interface BatchReducersMap {
  [key: string]: Reducer;
}

export const useBatchReducers = (reducers: BatchReducersMap, options: UseInjectReducerOptions = {}) => {
  const { priority = 50 } = options;

  useEffect(() => {
    Object.entries(reducers).forEach(([key, reducer]) => {
      try {
        store.dispatch(injectReducer(key, reducer, priority) as unknown as AnyAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Batch reducer injected: ${key}`);
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject batch reducer: ${key}`, error);
      }
    });

    return () => {};
  }, [reducers, priority]);
};

// ============================================================================
// EXPORTS
// ============================================================================

export default useInjectReducer;
