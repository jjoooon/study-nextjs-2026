// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  loadTime: number; // Page load time
}

// Measure Web Vitals
export function measureWebVitals(): Promise<PerformanceMetrics> {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {};

    // Measure page load time
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        metrics.loadTime = perfData.loadEventEnd - perfData.fetchStart;
        metrics.ttfb = perfData.responseStart - perfData.fetchStart;
      }
    });

    // Use PerformanceObserver for Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[0] as any;
          metrics.fcp = fcp.startTime;
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observation not supported');
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation not supported');
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fid = entries[0] as any;
          metrics.fid = fid.processingStart - fid.startTime;
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation not supported');
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation not supported');
      }
    }

    // Resolve after a delay to allow metrics to populate
    setTimeout(() => {
      resolve(metrics as PerformanceMetrics);
    }, 3000);
  });
}

// Measure memory usage (Chrome only)
export function getMemoryUsage() {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };
  }
  return null;
}

// Measure render time
export function measureRenderTime(componentName: string) {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`);
    return duration;
  };
}

// Custom performance marker
export function markPerformance(name: string) {
  if (performance.mark) {
    performance.mark(name);
  }
}

export function measurePerformance(name: string, startMark: string) {
  if (performance.measure) {
    try {
      performance.measure(name, startMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (e) {
      console.warn('Performance measure failed:', e);
    }
  }
  return 0;
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Request animation frame throttle
export function rafThrottle<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  return (...args: Parameters<T>) => {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args);
        rafId = null;
      });
    }
  };
}

// Measure function execution time
export function measureFunction<T extends (...args: any[]) => any>(func: T, functionName: string): T {
  return ((...args: any[]) => {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    console.log(`[Performance] ${functionName} took ${(end - start).toFixed(2)}ms`);
    return result;
  }) as T;
}

// Resource timing data
export function getResourceTiming() {
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  return resources.map((resource) => ({
    name: resource.name,
    duration: resource.duration,
    size: resource.transferSize,
    type: resource.initiatorType,
  }));
}

// Analyze bundle size (if available)
export function getBundleSize() {
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const jsResources = resources.filter((r) => r.initiatorType === 'script');
  return {
    total: jsResources.reduce((sum, r) => sum + r.transferSize, 0),
    files: jsResources.map((r) => ({
      name: r.name.split('/').pop(),
      size: r.transferSize,
      duration: r.duration,
    })),
  };
}
