'use client';

import { useEffect, useState } from 'react';

import { measureWebVitals, getMemoryUsage, getBundleSize } from '@/shared/utils/performance';

interface PerformanceData {
  webVitals: {
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
    loadTime?: number;
  };
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usagePercentage: number;
  };
  bundle?: {
    total: number;
    files: Array<{ name?: string; size: number; duration: number }>;
  };
}

export function PerformanceMonitor({ enabled = false }: { enabled?: boolean }) {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Collect performance data
    const collectMetrics = async () => {
      const webVitals = await measureWebVitals();
      const memory = getMemoryUsage();
      const bundle = getBundleSize();

      setPerformanceData({
        webVitals,
        memory: memory || undefined,
        bundle,
      });
    };

    collectMetrics();

    // Update every 10 seconds
    const interval = setInterval(collectMetrics, 10000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled || !performanceData) return null;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm hover:bg-gray-800"
      >
        {isVisible ? 'Hide' : 'Show'} Performance
      </button>

      {/* Performance panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 max-h-[80vh] overflow-auto">
          <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>

          {/* Web Vitals */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Web Vitals</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>FCP:</span>
                <span
                  className={
                    performanceData.webVitals.fcp && performanceData.webVitals.fcp < 1800
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {performanceData.webVitals.fcp?.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span>LCP:</span>
                <span
                  className={
                    performanceData.webVitals.lcp && performanceData.webVitals.lcp < 2500
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {performanceData.webVitals.lcp?.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span>FID:</span>
                <span
                  className={
                    performanceData.webVitals.fid && performanceData.webVitals.fid < 100
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {performanceData.webVitals.fid?.toFixed(0)}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span>CLS:</span>
                <span
                  className={
                    performanceData.webVitals.cls && performanceData.webVitals.cls < 0.1
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {performanceData.webVitals.cls?.toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>TTFB:</span>
                <span>{performanceData.webVitals.ttfb?.toFixed(0)}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Load Time:</span>
                <span>{performanceData.webVitals.loadTime?.toFixed(0)}ms</span>
              </div>
            </div>
          </div>

          {/* Memory */}
          {performanceData.memory && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Memory</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Usage:</span>
                  <span className={performanceData.memory.usagePercentage < 80 ? 'text-green-600' : 'text-red-600'}>
                    {performanceData.memory.usagePercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span>{(performanceData.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>{(performanceData.memory.totalJSHeapSize / 1024 / 1024).toFixed(1)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Limit:</span>
                  <span>{(performanceData.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(0)} MB</span>
                </div>
              </div>
            </div>
          )}

          {/* Bundle Size */}
          {performanceData.bundle && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Bundle Size</h4>
              <div className="text-xs mb-2">Total: {(performanceData.bundle.total / 1024).toFixed(1)} KB</div>
              <div className="max-h-32 overflow-auto text-xs space-y-1">
                {performanceData.bundle.files.map((file, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="truncate flex-1">{file.name}</span>
                    <span className="ml-2">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    measureWebVitals().then(setMetrics);
  }, []);

  return metrics;
}
