'use client';

import { PerformanceMonitor } from './PerformanceMonitor';

export function PerformanceMonitorWrapper() {
  return <PerformanceMonitor enabled={process.env.NODE_ENV === 'development'} />;
}
