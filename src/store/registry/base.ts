/**
 * Base Registry Class
 *
 * @description
 * 공통 레지스트리 패턴을 추상화한 기본 클래스
 * - MiddlewareRegistry
 * - ReducerRegistry
 * 등에서 상속하여 사용
 *
 * @features
 * - 우선순위 기반 정렬
 * - 잠금 메커니즘 (Lock/Unlock)
 * - 캐싱으로 성능 최적화
 * - 유효성 검증
 * - 디버깅 지원
 *
 * @example
 * ```typescript
 * interface MyEntry {
 *   name: string;
 *   value: unknown;
 *   priority: number;
 * }
 *
 * class MyRegistry extends BaseRegistry<MyEntry> {
 *   protected validateEntry(entry: MyEntry): void {
 *     if (!entry.name) throw new Error('Name required');
 *   }
 * }
 * ```
 */

import log from '@/shared/utils/logger';

/**
 * 레지스트리 엔트리 기본 인터페이스
 */
export interface RegistryEntry {
  name: string;
  priority: number;
}

/**
 * 레지스트리 옵션
 */
export interface RegistryOptions<T extends RegistryEntry> {
  /** 키 유효성 검증 */
  validateKeys?: boolean;

  /** 중복 등록 시 경고 */
  warnOnDuplicate?: boolean;

  /** 사용자 정의 엔트리 검증 */
  validateEntry?: (entry: T) => void;

  /** 레지스트리 이름 (로깅용) */
  name?: string;
}

/**
 * 추상 레지스트리 기본 클래스
 *
 * @typeParam T - 레지스트리 엔트리 타입
 */
export abstract class BaseRegistry<T extends RegistryEntry> {
  protected entries: Map<string, T> = new Map();
  protected isLocked = false;
  protected cache: unknown | null = null;
  protected options: Required<RegistryOptions<T>>;
  protected logger = log.getLogger('Registry');

  constructor(options: RegistryOptions<T> = {}) {
    this.options = {
      validateKeys: options.validateKeys ?? true,
      warnOnDuplicate: options.warnOnDuplicate ?? true,
      validateEntry: options.validateEntry ?? (() => {}),
      name: options.name ?? 'BaseRegistry',
    };

    // Logger 이름 설정
    if (options.name) {
      this.logger = log.getLogger(options.name);
    }
  }

  /**
   * 엔트리 등록 (잠금 전)
   *
   * @param name - 고유 키
   * @param entry - 등록할 엔트리
   * @throws {Error} 잠긴 레지스트리 또는 유효하지 않은 엔트리
   */
  register(name: string, entry: T): void {
    if (this.isLocked) {
      this.logger.warn(`Cannot register "${name}" - registry is locked. Register entries before initialization.`);
      return;
    }

    // 키 유효성 검증
    if (this.options.validateKeys) {
      this.validateKey(name);
    }

    // 사용자 정의 검증
    try {
      this.options.validateEntry(entry);
    } catch (error) {
      this.logger.error(`Invalid entry "${name}":`, error);
      throw error;
    }

    // 중복 확인
    if (this.entries.has(name)) {
      if (this.options.warnOnDuplicate) {
        const existing = this.entries.get(name);
        this.logger.warn(`Overriding entry: ${name}`, {
          existingPriority: existing?.priority,
          newPriority: entry.priority,
        });
      }
    }

    this.entries.set(name, entry);
    this.invalidateCache();
  }

  /**
   * 엔트리 등록 해제 (잠금 전)
   *
   * @param name - 제거할 엔트리 키
   * @returns 제거 성공 여부
   */
  unregister(name: string): boolean {
    if (this.isLocked) {
      this.logger.warn(`Cannot unregister "${name}" - registry is locked`);
      return false;
    }

    const deleted = this.entries.delete(name);
    if (deleted) {
      this.invalidateCache();
    }
    return deleted;
  }

  /**
   * 런타임에 엔트리 주입 (잠긴 레지스트리에서도 작동)
   *
   * @param name - 엔트리 키
   * @param entry - 엔트리
   */
  inject(name: string, entry: T): void {
    if (this.options.validateKeys) {
      this.validateKey(name);
    }

    try {
      this.options.validateEntry(entry);
    } catch (error) {
      this.logger.error(`Invalid entry "${name}":`, error);
      throw error;
    }

    if (!this.entries.has(name)) {
      this.entries.set(name, entry);
      this.invalidateCache();
    }
  }

  /**
   * 런타임에 엔트리 제거 (잠긴 레지스트리에서도 작동)
   *
   * @param name - 제거할 엔트리 키
   */
  eject(name: string): void {
    if (this.entries.has(name)) {
      this.entries.delete(name);
      this.invalidateCache();
    }
  }

  /**
   * 모든 엔트리 가져오기 (우선순위 정렬됨)
   *
   * @returns 정렬된 엔트리 배열
   */
  getAll(): T[] {
    return Array.from(this.entries.values()).sort((a, b) => a.priority - b.priority);
  }

  /**
   * 특정 엔트리 가져오기
   *
   * @param name - 엔트리 키
   * @returns 엔트리 또는 undefined
   */
  get(name: string): T | undefined {
    return this.entries.get(name);
  }

  /**
   * 등록된 모든 키 가져오기
   *
   * @returns 키 배열
   */
  getKeys(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * 엔트리 개수
   *
   * @returns 등록된 엔트리 수
   */
  getCount(): number {
    return this.entries.size;
  }

  /**
   * 특정 엔트리 존재 여부 확인
   *
   * @param name - 엔트리 키
   * @returns 존재 여부
   */
  has(name: string): boolean {
    return this.entries.has(name);
  }

  /**
   * 레지스트리 잠금 (초기화 후)
   *
   * @note 잠긴 후에는 inject/eject만 사용 가능
   */
  lock(): void {
    this.isLocked = true;
    this.logger.info(`Locked (${this.getCount()} entries registered)`);
  }

  /**
   * 레지스트리 잠금 해제 (테스트용)
   */
  unlock(): void {
    this.isLocked = false;
    this.logger.info('Unlocked');
  }

  /**
   * 모든 엔트리 제거 (테스트용)
   */
  clear(): void {
    if (this.isLocked) {
      this.logger.warn('Cannot clear - registry is locked');
      return;
    }

    this.entries.clear();
    this.invalidateCache();
    this.logger.info('Cleared');
  }

  /**
   * 캐시 무효화
   */
  protected invalidateCache(): void {
    this.cache = null;
  }

  /**
   * 키 유효성 검증
   *
   * @param name - 검증할 키
   * @throws {Error} 유효하지 않은 키
   */
  protected validateKey(name: string): void {
    if (!name || typeof name !== 'string') {
      throw new Error(`Invalid key: ${name}. Key must be a non-empty string.`);
    }

    if (name.includes('/') || name.includes('\\')) {
      throw new Error(`Invalid key: ${name}. Key cannot contain path separators.`);
    }

    if (name.startsWith('_')) {
      throw new Error(`Invalid key: ${name}. Key cannot start with underscore (reserved).`);
    }

    if (name.length > 50) {
      throw new Error(`Invalid key: ${name}. Key cannot exceed 50 characters.`);
    }
  }

  /**
   * 등록된 엔트리 정보 출력 (디버깅용)
   */
  printInfo(): void {
    const sorted = this.getAll();

    this.logger.debug('Registered entries:', {
      registry: this.options.name,
      count: sorted.length,
      entries: sorted.map((entry) => ({
        name: entry.name,
        priority: entry.priority,
      })),
    });
  }
}

export default BaseRegistry;
