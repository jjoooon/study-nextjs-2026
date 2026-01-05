import { Middleware, AnyAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Redux action 성능 모니터링 미들웨어
 *
 * @purpose
 * - 느린 액션 식별 (16ms 초과 = 1프레임 이상)
 * - 액션 실행 빈도 추적
 * - 성능 병목점 발견
 *
 * @usage
 * 개발 모드에서만 활성화되며, 16ms 이상 걸리는 액션을 경고로 표시
 */

interface PerformanceMetrics {
  actionCount: Map<string, number>;
  slowActions: Array<{ action: string; duration: number; timestamp: number }>;
  lastReset: number;
}

const metrics: PerformanceMetrics = {
  actionCount: new Map(),
  slowActions: [],
  lastReset: Date.now(),
};

/**
 * 성능 미들웨어
 */
export const performanceMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: unknown) => {
    // 개발 모드에서만 실행
    if (process.env.NODE_ENV !== 'development') {
      return next(action);
    }

    const startTime = performance.now();
    const actionType = (action as AnyAction).type;

    const result = next(action);

    const duration = performance.now() - startTime;

    // 액션 카운트 추적
    const count = metrics.actionCount.get(actionType) || 0;
    metrics.actionCount.set(actionType, count + 1);

    // 느린 액션 추적 (16ms = 1프레임 초과)
    if (duration > 16) {
      metrics.slowActions.push({
        action: actionType,
        duration,
        timestamp: Date.now(),
      });

      // 최근 100개만 유지
      if (metrics.slowActions.length > 100) {
        metrics.slowActions.shift();
      }

      console.warn(
        `[Perf] Slow action detected: ${actionType} (${duration.toFixed(2)}ms)`
      );
    }

    return result;
  };

/**
 * 성능 리포트 가져오기
 */
export const getPerformanceReport = () => {
  const actionCounts = Object.fromEntries(metrics.actionCount);

  // 가장 많이 호출된 액션 Top 10
  const topActions = Object.entries(actionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([action, count]) => ({ action, count }));

  // 가장 느린 액션 Top 10
  const slowestActions = [...metrics.slowActions]
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10)
    .map(({ action, duration, timestamp }) => ({
      action,
      duration: `${duration.toFixed(2)}ms`,
      time: new Date(timestamp).toISOString(),
    }));

  return {
    uptime: Date.now() - metrics.lastReset,
    totalActions: Object.values(actionCounts).reduce((sum, count) => sum + count, 0),
    uniqueActions: Object.keys(actionCounts).length,
    slowActionsCount: metrics.slowActions.length,
    topActions,
    slowestActions,
  };
};

/**
 * 성능 지표 초기화
 */
export const resetMetrics = () => {
  metrics.actionCount.clear();
  metrics.slowActions = [];
  metrics.lastReset = Date.now();
};

/**
 * 개발자 전용 성능 모니터링 Hook
 */
export const usePerformanceMonitor = () => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // 30초마다 성능 리포트 출력
    const interval = setInterval(() => {
      const report = getPerformanceReport();
      console.log('[Perf Report]', {
        uptime: `${(report.uptime / 1000).toFixed(1)}s`,
        totalActions: report.totalActions,
        uniqueActions: report.uniqueActions,
        slowActions: report.slowActionsCount,
        topActions: report.topActions.slice(0, 5),
        slowestActions: report.slowestActions.slice(0, 5),
      });
    }, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }

  return () => {};
};
