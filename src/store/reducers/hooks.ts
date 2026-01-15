import type { Reducer, UnknownAction } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';

import log from '@/shared/utils/logger';
import { store } from '@/store';
import { ejectReducer, injectReducer } from '@/store/registry/reducer';

// TODO: @YunJunmo
// - logger 매번 getLogger 할 필요 있는지 검토

// ============================================================================
// DYNAMIC REDUCER HOOKS
// ============================================================================

/**
 * 리듀서 지연 로딩 훅
 *
 * @description
 * 컴포넌트 마운트 시 리듀서를 주입하고, 언마운트 시 자동 정리
 * 리듀서 주입 후 안전한 렌더링을 위해 isReady 상태를 반환
 *
 * @param key - 리듀서 고유 키
 * @param reducer - 리듀서 함수
 * @param options - 옵션 (우선순위, 자동 제거 등)
 * @returns { isReady } - 리듀서 주입 후 렌더링 준비 완료 여부
 *
 * @example
 * const analyticsReducer = (state = { events: [] }, action) => { ... };
 *
 * function AnalyticsPage() {
 *   const { isReady } = useInjectReducer('analytics', analyticsReducer, { priority: 30 });
 *
 *   if (!isReady) {
 *     return <LoadingSpinner />;
 *   }
 *
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

export interface UseInjectReducerResult {
  /**
   * 리듀서 주입 후 렌더링 준비 완료 여부
   */
  isReady: boolean;
}

export const useInjectReducer = (
  key: string,
  reducer: Reducer,
  options: UseInjectReducerOptions = {}
): UseInjectReducerResult => {
  const { priority = 50, ejectOnUnmount = false } = options;
  const isInjected = useRef(false);
  const readySetRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Reducer injection
  useEffect(() => {
    if (!isInjected.current) {
      try {
        store.dispatch(injectReducer(key, reducer, priority) as unknown as UnknownAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Reducer injected via hook: ${key}`);

        isInjected.current = true;

        // 다음 tick에서 렌더링 준비 완료
        requestAnimationFrame(() => {
          if (!readySetRef.current) {
            readySetRef.current = true;
            setIsReady(true);
          }
        });

        // 성공 시 cleanup 반환 안 함 (RAF 콜백이 실행되어야 함)
        return undefined;
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject reducer: ${key}`, error);

        // 에러 발생 시 즉시 isReady를 true로 설정
        if (!readySetRef.current) {
          readySetRef.current = true;
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        }

        // 실패 시 cleanup 반환 (필요 없음)
        return undefined;
      }
    }

    // 이미 주입된 경우 아무것도 하지 않음
    return undefined;
  }, [key, reducer, priority]);

  // Cleanup function for ejectOnUnmount
  useEffect(() => {
    if (ejectOnUnmount) {
      return () => {
        if (isInjected.current) {
          try {
            store.dispatch(ejectReducer(key) as unknown as UnknownAction);

            const logger = log.getLogger('ReducerRegistry');
            logger.debug(`🗑️  Reducer ejected via hook: ${key}`);

            isInjected.current = false;
            readySetRef.current = false;
            setIsReady(false);
          } catch (error) {
            const logger = log.getLogger('ReducerRegistry');
            logger.error(`❌ Failed to eject reducer: ${key}`, error);
          }
        }
      };
    }

    return undefined;
  }, [key, ejectOnUnmount]);

  return { isReady };
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
  isReady: boolean;
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
    isReady: false,
  });

  useEffect(() => {
    let mounted = true;

    const loadReducer = async () => {
      try {
        const reducer = await reducerPromise;

        if (mounted) {
          store.dispatch(injectReducer(key, reducer, priority) as unknown as UnknownAction);

          result.current = {
            loading: false,
            error: null,
            injected: true,
            isReady: true,
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
            isReady: false,
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
 * @returns { isReady } - 리듀서 주입 후 렌더링 준비 완료 여부
 *
 * @example
 * const ANALYTICS_ENABLED = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
 *
 * function Dashboard() {
 *   const { isReady } = useConditionalReducer('analytics', analyticsReducer, ANALYTICS_ENABLED);
 *
 *   if (!isReady) {
 *     return <LoadingSpinner />;
 *   }
 *
 *   return <div>...</div>;
 * }
 */
export type UseConditionalReducerResult = UseInjectReducerResult;

export const useConditionalReducer = (
  key: string,
  reducer: Reducer,
  enabled: boolean,
  options: UseInjectReducerOptions = {}
): UseConditionalReducerResult => {
  const isInjected = useRef(false);
  const readySetRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // enabled가 false인 경우 즉시 ready로 처리 (최초 1회만)
    if (!enabled && !readySetRef.current) {
      readySetRef.current = true;
      requestAnimationFrame(() => {
        setIsReady(true);
      });
      return undefined;
    }

    if (enabled && !isInjected.current) {
      try {
        store.dispatch(injectReducer(key, reducer, options.priority) as unknown as UnknownAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Conditional reducer enabled: ${key}`);

        isInjected.current = true;

        // 다음 tick에서 렌더링 준비 완료
        requestAnimationFrame(() => {
          if (!readySetRef.current) {
            readySetRef.current = true;
            setIsReady(true);
          }
        });

        return undefined;
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject conditional reducer: ${key}`, error);

        // 에러 발생 시 즉시 isReady를 true로 설정
        if (!readySetRef.current) {
          readySetRef.current = true;
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        }

        return undefined;
      }
    }

    return undefined;
  }, [key, reducer, enabled, options]);

  return { isReady };
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
 * @returns { isReady } - 리듀서 주입 후 렌더링 준비 완료 여부
 *
 * @example
 * function AdminPanel({ userRole }) {
 *   const { isReady } = useRoleBasedReducer(
 *     'admin',
 *     adminReducer,
 *     userRole,
 *     ['admin', 'superadmin']
 *   );
 *
 *   if (!isReady) {
 *     return <LoadingSpinner />;
 *   }
 *
 *   return <div>Admin Panel</div>;
 * }
 */
export type UseRoleBasedReducerResult = UseInjectReducerResult;

export const useRoleBasedReducer = (
  key: string,
  reducer: Reducer,
  userRole: string | null,
  allowedRoles: string[],
  options: UseInjectReducerOptions = {}
): UseRoleBasedReducerResult => {
  const isInjected = useRef(false);
  const readySetRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isAuthorized = userRole && allowedRoles.includes(userRole);

    // 권한이 없는 경우 즉시 ready로 처리 (최초 1회만)
    if (!isAuthorized && !readySetRef.current) {
      readySetRef.current = true;
      requestAnimationFrame(() => {
        setIsReady(true);
      });
      return undefined;
    }

    if (isAuthorized && !isInjected.current) {
      try {
        store.dispatch(injectReducer(key, reducer, options.priority) as unknown as UnknownAction);

        const logger = log.getLogger('ReducerRegistry');
        logger.debug(`✅ Role-based reducer authorized: ${key} (${userRole})`);

        isInjected.current = true;

        // 다음 tick에서 렌더링 준비 완료
        requestAnimationFrame(() => {
          if (!readySetRef.current) {
            readySetRef.current = true;
            setIsReady(true);
          }
        });

        return undefined;
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject role-based reducer: ${key}`, error);

        // 에러 발생 시 즉시 isReady를 true로 설정
        if (!readySetRef.current) {
          readySetRef.current = true;
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        }

        return undefined;
      }
    }

    return undefined;
  }, [key, reducer, userRole, allowedRoles, options]);

  return { isReady };
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
 * @returns { isReady } - 모든 리듀서 주입 후 렌더링 준비 완료 여부
 *
 * @example
 * function Dashboard() {
 *   const { isReady } = useBatchReducers({
 *     analytics: analyticsReducer,
 *     reporting: reportingReducer,
 *     insights: insightsReducer
 *   }, { priority: 30 });
 *
 *   if (!isReady) {
 *     return <LoadingSpinner />;
 *   }
 *
 *   return <div>Dashboard</div>;
 * }
 */
export interface BatchReducersMap {
  [key: string]: Reducer;
}

export type UseBatchReducersResult = UseInjectReducerResult;

export const useBatchReducers = (
  reducers: BatchReducersMap,
  options: UseInjectReducerOptions = {}
): UseBatchReducersResult => {
  const { priority = 50 } = options;
  const isInjected = useRef(false);
  const readySetRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isInjected.current && Object.keys(reducers).length > 0) {
      try {
        Object.entries(reducers).forEach(([key, reducer]) => {
          store.dispatch(injectReducer(key, reducer, priority) as unknown as UnknownAction);

          const logger = log.getLogger('ReducerRegistry');
          logger.debug(`✅ Batch reducer injected: ${key}`);
        });

        isInjected.current = true;

        // 다음 tick에서 렌더링 준비 완료
        requestAnimationFrame(() => {
          if (!readySetRef.current) {
            readySetRef.current = true;
            setIsReady(true);
          }
        });

        return undefined;
      } catch (error) {
        const logger = log.getLogger('ReducerRegistry');
        logger.error(`❌ Failed to inject batch reducers`, error);

        // 에러 발생 시 즉시 isReady를 true로 설정
        if (!readySetRef.current) {
          readySetRef.current = true;
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        }

        return undefined;
      }
    }

    return undefined;
  }, [reducers, priority]);

  return { isReady };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default useInjectReducer;
