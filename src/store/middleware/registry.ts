import { Middleware } from '@reduxjs/toolkit';

// ============================================================================
// DYNAMIC MIDDLEWARE REGISTRY
// ============================================================================

/**
 * 미들웨어 동적 등록 시스템
 *
 * @purpose
 * - 중앙 집중식 store config 수정 없이 미들웨어 추가
 * - 팀별 독립적 미들웨어 개발
 * - Merge conflict 방지
 * - 우선순위 기반 미들웨어 순서 관리
 *
 * @usage
 * // 도메인 슬라이스에서 미들웨어 등록
 * middlewareRegistry.register('usersApi', usersApiSlice.middleware, 10);
 *
 * // store 설정에서 자동 합체
 * middleware: (getDefaultMiddleware) =>
 *   getDefaultMiddleware()
 *     .concat(...middlewareRegistry.getAll())
 */

type MiddlewareEntry = {
  name: string;
  middleware: Middleware;
  priority: number;
};

class MiddlewareRegistry {
  private entries: Map<string, MiddlewareEntry> = new Map();
  private isLocked = false;

  /**
   * 미들웨어 등록
   *
   * @param name - 미들웨어 고유 이름
   * @param middleware - 미들웨어 인스턴스
   * @param priority - 우선순위 (낮을수록 먼저 실행, 기본값: 50)
   */
  register(name: string, middleware: Middleware, priority: number = 50) {
    if (this.isLocked) {
      console.warn(
        `[MiddlewareRegistry] Cannot register "${name}" - registry is locked. ` +
          `Register middleware before store initialization.`
      );
      return;
    }

    if (this.entries.has(name)) {
      console.warn(`[MiddlewareRegistry] Overriding middleware: ${name}`);
    }

    this.entries.set(name, { name, middleware, priority });
  }

  /**
   * 미들웨어 등록 해제
   */
  unregister(name: string) {
    if (this.isLocked) {
      console.warn(`[MiddlewareRegistry] Cannot unregister "${name}" - registry is locked`);
      return false;
    }

    return this.entries.delete(name);
  }

  /**
   * 모든 미들웨어 가져오기 (우선순위 정렬됨)
   */
  getAll(): Middleware[] {
    return Array.from(this.entries.values())
      .sort((a, b) => a.priority - b.priority)
      .map((entry) => entry.middleware);
  }

  /**
   * 등록된 미들웨어 이름 목록
   */
  getNames(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * 미들웨어 개수
   */
  getCount(): number {
    return this.entries.size;
  }

  /**
   * 특정 미들웨어가 등록되어 있는지 확인
   */
  has(name: string): boolean {
    return this.entries.has(name);
  }

  /**
   * 레지스트리 잠금 (store 초기화 후 호출)
   */
  lock() {
    this.isLocked = true;
    console.log(`[MiddlewareRegistry] Locked (${this.getCount()} middlewares registered)`);
  }

  /**
   * 레지스트리 잠금 해제 (테스트용)
   */
  unlock() {
    this.isLocked = false;
    console.log('[MiddlewareRegistry] Unlocked');
  }

  /**
   * 모든 미들웨어 제거 (테스트용)
   */
  clear() {
    if (this.isLocked) {
      console.warn('[MiddlewareRegistry] Cannot clear - registry is locked');
      return;
    }

    this.entries.clear();
    console.log('[MiddlewareRegistry] Cleared');
  }

  /**
   * 등록된 미들웨어 정보 출력 (디버깅용)
   */
  printInfo() {
    const sorted = Array.from(this.entries.values()).sort((a, b) => a.priority - b.priority);

    console.log('[MiddlewareRegistry] Registered middlewares:');
    sorted.forEach((entry) => {
      console.log(`  ${entry.priority}: ${entry.name}`);
    });
  }
}

// Singleton instance
export const middlewareRegistry = new MiddlewareRegistry();

// ============================================================================
// CORE MIDDLEWARE REGISTRATION
// ============================================================================

/**
 * 코어 미들웨어 자동 등록
 * (store 초기화 전에 실행됨)
 */

// Priority 0-9: Core checks (serializable, immutable)
// Priority 10-29: Performance & Monitoring
// Priority 30-49: Logging
// Priority 50-99: API middlewares (usersApi, postsApi, etc.)
// Priority 100+: Error handling, analytics

if (process.env.NODE_ENV === 'development') {
  // 개발 모드에서만 실행
  middlewareRegistry.printInfo = middlewareRegistry.printInfo.bind(middlewareRegistry);
}

export default middlewareRegistry;
