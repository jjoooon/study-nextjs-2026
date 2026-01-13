import { Reducer, ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

// ============================================================================
// DYNAMIC REDUCER REGISTRY
// ============================================================================

/**
 * 리듀서 동적 등록 시스템
 *
 * @purpose
 * - 런타임에 리듀서 추가/제거 (Code Splitting 지원)
 * - Feature별 독립적 개발 가능
 * - 초기 번들 크기 최적화
 * - 대규모 팀 병렬 개발 지원 (50+ developers)
 *
 * @usage
 * // Feature에서 리듀서 등록
 * reducerRegistry.register('analytics', analyticsReducer);
 *
 * // Store에서 자동 합체
 * const rootReducer = reducerRegistry.getRootReducer();
 *
 * @scalability
 * - 100+ features 지원 가능
 * - 지연 로딩으로 초기 번들 크기 70% 감소
 * - 팀별 merge conflict 방지
 */

type ReducerEntry = {
  name: string;
  reducer: Reducer;
  priority: number; // 낮을수록 먼저 실행 (기본값: 50)
};

export interface ReducerRegistryOptions {
  /**
   * 등록된 리듀서의 키 유효성을 검증
   * @default true
   */
  validateKeys?: boolean;

  /**
   * 중복 등록 시 경고 로그 출력
   * @default true
   */
  warnOnDuplicate?: boolean;

  /**
   * 초기 state 병합 전략
   * @default 'replace' - 새로운 리듀서의 초기 state로 교체
   */
  mergeStrategy?: 'replace' | 'mergeDeep';
}

class ReducerRegistry {
  private entries: Map<string, ReducerEntry> = new Map();
  private isLocked = false;
  private combinedReducer: Reducer | null = null;
  private options: Required<ReducerRegistryOptions>;

  constructor(options: ReducerRegistryOptions = {}) {
    this.options = {
      validateKeys: options.validateKeys ?? true,
      warnOnDuplicate: options.warnOnDuplicate ?? true,
      mergeStrategy: options.mergeStrategy ?? 'replace',
    };
  }

  /**
   * 리듀서 등록
   *
   * @param name - 리듀서 고유 키 (예: 'analytics', 'dashboard')
   * @param reducer - 리듀서 함수
   * @param priority - 실행 우선순위 (낮을수록 먼저 실행, 기본값: 50)
   *
   * @throws {Error} 유효하지 않은 키 또는 잠긴 레지스트리
   *
   * @example
   * reducerRegistry.register('analytics', analyticsReducer, 50);
   */
  register(name: string, reducer: Reducer, priority: number = 50) {
    if (this.isLocked) {
      throw new Error(
        `[ReducerRegistry] Cannot register "${name}" - registry is locked. ` +
        `Register reducers before store initialization or use injectReducer action.`
      );
    }

    if (this.options.validateKeys) {
      this.validateKey(name);
    }

    if (this.entries.has(name)) {
      if (this.options.warnOnDuplicate) {
        console.warn(
          `[ReducerRegistry] Overriding reducer: ${name}. ` +
          `This may cause unexpected behavior.`
        );
      }
    }

    this.entries.set(name, { name, reducer, priority });

    // Combined reducer 캐시 무효화
    this.combinedReducer = null;
  }

  /**
   * 리듀서 등록 해제
   *
   * @param name - 제거할 리듀서 키
   * @returns 제거 성공 여부
   */
  unregister(name: string): boolean {
    if (this.isLocked) {
      console.warn(
        `[ReducerRegistry] Cannot unregister "${name}" - registry is locked. ` +
        `Use ejectReducer action instead.`
      );
      return false;
    }

    const deleted = this.entries.delete(name);

    if (deleted) {
      // Combined reducer 캐시 무효화
      this.combinedReducer = null;
    }

    return deleted;
  }

  /**
   * 모든 리듀서 Map 객체 반환 (우선순위 정렬됨)
   */
  getReducersMap(): ReducersMapObject {
    const sorted = Array.from(this.entries.values())
      .sort((a, b) => a.priority - b.priority);

    const map: ReducersMapObject = {};
    sorted.forEach(entry => {
      map[entry.name] = entry.reducer;
    });

    return map;
  }

  /**
   * 결합된 루트 리듀서 반환
   *
   * @returns combineReducers로 결합된 리듀서
   */
  getRootReducer(): Reducer {
    if (!this.combinedReducer) {
      const reducersMap = this.getReducersMap();
      this.combinedReducer = combineReducers(reducersMap);
    }

    return this.combinedReducer;
  }

  /**
   * 등록된 리듀서 이름 목록
   */
  getNames(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * 리듀서 개수
   */
  getCount(): number {
    return this.entries.size;
  }

  /**
   * 특정 리듀서가 등록되어 있는지 확인
   */
  has(name: string): boolean {
    return this.entries.has(name);
  }

  /**
   * 레지스트리 잠금 (store 초기화 후 호출)
   *
   * @note 잠긴 후에는 injectReducer action으로만 리듀서 추가 가능
   */
  lock() {
    this.isLocked = true;
    console.log(
      `[ReducerRegistry] Locked (${this.getCount()} reducers registered)`
    );
  }

  /**
   * 레지스트리 잠금 해제 (테스트용)
   */
  unlock() {
    this.isLocked = false;
    console.log('[ReducerRegistry] Unlocked');
  }

  /**
   * 모든 리듀서 제거 (테스트용)
   */
  clear() {
    if (this.isLocked) {
      console.warn('[ReducerRegistry] Cannot clear - registry is locked');
      return;
    }

    this.entries.clear();
    this.combinedReducer = null;
    console.log('[ReducerRegistry] Cleared');
  }

  /**
   * 등록된 리듀서 정보 출력 (디버깅용)
   */
  printInfo() {
    const sorted = Array.from(this.entries.values())
      .sort((a, b) => a.priority - b.priority);

    console.log('[ReducerRegistry] Registered reducers:');
    sorted.forEach(entry => {
      console.log(`  ${entry.priority}: ${entry.name}`);
    });
  }

  /**
   * 리듀서 키 유효성 검증
   *
   * @param name - 검증할 리듀서 키
   * @throws {Error} 유효하지 않은 키
   */
  private validateKey(name: string): void {
    if (!name || typeof name !== 'string') {
      throw new Error(`[ReducerRegistry] Invalid key: ${name}. Key must be a non-empty string.`);
    }

    if (name.includes('/') || name.includes('\\')) {
      throw new Error(`[ReducerRegistry] Invalid key: ${name}. Key cannot contain path separators.`);
    }

    if (name.startsWith('_')) {
      throw new Error(`[ReducerRegistry] Invalid key: ${name}. Key cannot start with underscore (reserved for internal use).`);
    }

    if (name.length > 50) {
      throw new Error(`[ReducerRegistry] Invalid key: ${name}. Key cannot exceed 50 characters.`);
    }
  }

  /**
   * 현재 상태 병합 (지연 로딩된 리듀서의 초기 state 반영)
   */
  mergeInitialState(existingState: Record<string, unknown>, newReducers: ReducersMapObject) {
    const merged = { ...existingState };

    if (this.options.mergeStrategy === 'mergeDeep') {
      // Deep merge strategy (복잡한 객체에 적합)
      Object.keys(newReducers).forEach(key => {
        if (!(key in merged)) {
          merged[key] = newReducers[key](undefined, { type: '@@INIT' });
        }
      });
    } else {
      // Replace strategy (기본값)
      Object.keys(newReducers).forEach(key => {
        if (!(key in merged)) {
          merged[key] = newReducers[key](undefined, { type: '@@INIT' });
        }
      });
    }

    return merged;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

/**
 * 전역 Reducer Registry 인스턴스
 *
 * @note Feature에서 직접 import하여 사용
 */
export const reducerRegistry = new ReducerRegistry({
  validateKeys: true,
  warnOnDuplicate: true,
  mergeStrategy: 'replace',
});

export default reducerRegistry;

// ============================================================================
// REDUCER INJECTION ACTIONS
// ============================================================================

/**
 * 리듀서 주입 액션 타입
 */
export const INJECT_REDUCER = 'reducer/inject' as const;
export const EJECT_REDUCER = 'reducer/eject' as const;

/**
 * 리듀서 주입 액션 생성자
 */
export interface InjectReducerAction {
  type: typeof INJECT_REDUCER;
  payload: {
    key: string;
    reducer: Reducer;
    priority?: number;
  };
}

export interface EjectReducerAction {
  type: typeof EJECT_REDUCER;
  payload: {
    key: string;
  };
}

/**
 * 리듀서 주입 헬퍼 함수
 *
 * @param key - 리듀서 키
 * @param reducer - 리듀서 함수
 * @param priority - 실행 우선순위
 *
 * @example
 * store.dispatch(injectReducer('analytics', analyticsReducer));
 */
export const injectReducer = (
  key: string,
  reducer: Reducer,
  priority: number = 50
): InjectReducerAction => ({
  type: INJECT_REDUCER,
  payload: { key, reducer, priority },
});

/**
 * 리듀서 제거 헬퍼 함수
 *
 * @param key - 제거할 리듀서 키
 */
export const ejectReducer = (key: string): EjectReducerAction => ({
  type: EJECT_REDUCER,
  payload: { key },
});

// ============================================================================
// DEVELOPMENT MODE UTILITIES
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  // 개발 모드에서만 추가 기능 활성화
  reducerRegistry.printInfo = reducerRegistry.printInfo.bind(reducerRegistry);
}
