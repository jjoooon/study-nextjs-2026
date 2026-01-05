import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import {
  debounce,
  throttle,
  measureRenderTime,
  measureFunction,
} from '@/lib/performance';

// Mock performance API
const mockPerformance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => [{ duration: 100 }]),
};

(global as any).performance = mockPerformance;

describe('Performance Utilities', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('debounce', () => {
    it('delays function execution', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 500);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('cancels previous calls', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 500);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      jest.advanceTimersByTime(500);
      expect(func).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits function execution rate', () => {
      const func = jest.fn();
      const throttledFunc = throttle(func, 500);

      throttledFunc();
      throttledFunc();
      throttledFunc();

      expect(func).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(500);

      throttledFunc();
      expect(func).toHaveBeenCalledTimes(2);
    });
  });

  describe('measureRenderTime', () => {
    it('measures render time', () => {
      const endMeasure = measureRenderTime('TestComponent');
      const duration = endMeasure();

      expect(typeof duration).toBe('number');
      expect(duration).toBeGreaterThanOrEqual(0);
    });
  });

  describe('measureFunction', () => {
    it('measures function execution time', () => {
      const testFunc = () => {
        return 'result';
      };

      const measuredFunc = measureFunction(testFunc, 'testFunction');
      const result = measuredFunc();

      expect(result).toBe('result');
    });

    it('logs execution time', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const testFunc = () => 'result';

      const measuredFunc = measureFunction(testFunc, 'testFunction');
      measuredFunc();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[Performance]'),
        expect.stringContaining('testFunction')
      );

      consoleSpy.mockRestore();
    });
  });
});
