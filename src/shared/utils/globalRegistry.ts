import type { store as Store } from '@/redux';

// 레지스트리 키
export const REGISTRY_KEYS = {
  STORE: 'redux-store',
} as const;

// 레지스트리 키 타입
type RegistryKey = (typeof REGISTRY_KEYS)[keyof typeof REGISTRY_KEYS];

/**
 * 전역 레지스트리
 */
class GlobalRegistry {
  private static instance: GlobalRegistry;
  private registries = new Map<string, unknown>();

  private constructor() {}

  static getInstance(): GlobalRegistry {
    if (!GlobalRegistry.instance) {
      GlobalRegistry.instance = new GlobalRegistry();
    }
    return GlobalRegistry.instance;
  }

  set<T = unknown>(key: RegistryKey, value: T): void {
    this.registries.set(key, value);
  }

  get<T = unknown>(key: RegistryKey): T | undefined {
    return this.registries.get(key) as T;
  }

  getOrThrow<T = unknown>(key: RegistryKey): T {
    const value = this.get<T>(key);
    if (!value) {
      throw Error(`Registry key ${key} not found`);
    }
    return value;
  }

  has(key: RegistryKey): boolean {
    return this.registries.has(key);
  }
}

export const globalRegistry = GlobalRegistry.getInstance();

// ============================================================================
// 편의 헬퍼 함수
// ============================================================================

/**
 * Redux Store 조회
 */
export const getStore = () => globalRegistry.getOrThrow<typeof Store>(REGISTRY_KEYS.STORE);
