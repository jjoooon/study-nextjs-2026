import { Middleware } from '@reduxjs/toolkit';

import { BaseRegistry, RegistryEntry } from './base';

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

interface MiddlewareEntry extends RegistryEntry {
  name: string;
  middleware: Middleware;
  priority: number;
}

/**
 * Middleware Registry Class
 *
 * @extends BaseRegistry<MiddlewareEntry>
 */
class MiddlewareRegistry extends BaseRegistry<MiddlewareEntry> {
  constructor() {
    super({
      name: 'MiddlewareRegistry',
      validateKeys: true,
      warnOnDuplicate: true,
    });
  }

  /**
   * 미들웨어 등록
   *
   * @param name - 미들웨어 고유 이름
   * @param middleware - 미들웨어 인스턴스
   * @param priority - 우선순위 (낮을수록 먼저 실행, 기본값: 50)
   */
  registerMiddleware(name: string, middleware: Middleware, priority: number = 50): void {
    const entry: MiddlewareEntry = { name, middleware, priority };
    super.register(name, entry);
  }

  /**
   * 미들웨어 등록 해제
   *
   * @param name - 제거할 미들웨어 이름
   */
  unregister(name: string): boolean {
    return super.unregister(name);
  }

  /**
   * 모든 미들웨어 가져오기 (우선순위 정렬됨)
   *
   * @returns Middleware 배열
   */
  getAllMiddleware(): Middleware[] {
    return super.getAll().map((entry) => entry.middleware);
  }

  /**
   * 등록된 미들웨어 이름 목록
   */
  getNames(): string[] {
    return super.getKeys();
  }

  /**
   * 미들웨어 개수
   */
  getCount(): number {
    return super.getCount();
  }

  /**
   * 특정 미들웨어가 등록되어 있는지 확인
   */
  has(name: string): boolean {
    return super.has(name);
  }
}

// 싱글톤 인스턴스
export const middlewareRegistry = new MiddlewareRegistry();

// ============================================================================
// CORE MIDDLEWARE REGISTRATION
// ============================================================================

/**
 * 코어 미들웨어 자동 등록
 * (store 초기화 전에 실행됨)
 */

// 우선순위 0-9: 핵심 체크 (직렬화, 불변성)
// 우선순위 10-29: 성능 및 모니터링
// 우선순위 30-49: 로깅
// 우선순위 50-99: API 미들웨어 (usersApi, postsApi 등)
// 우선순위 100+: 에러 처리, 분석

if (process.env.NODE_ENV === 'development') {
  // 개발 모드에서만 실행
  middlewareRegistry.printInfo = middlewareRegistry.printInfo.bind(middlewareRegistry);
}

export default middlewareRegistry;
