/**
 * Storage Utilities
 *
 * @description
 * Local Storage와 Session Storage를 위한 순수 유틸리티 함수
 * - 타입 안전한 저장/조회/삭제
 * - 자동 JSON 직렬화/역직렬화
 * - SSR 안전 (서버 환경에서 무시)
 *
 * @usage
 * import { local, session } from '@/shared/utils/storageUtils';
 *
 * // Local Storage
 * local.set('user', { id: 1, name: 'John' });
 * const user = local.get<{ id: number; name: string }>('user');
 * local.remove('user');
 * local.clear();
 *
 * // Session Storage
 * session.set('tempData', { key: 'value' });
 * const data = session.get<{ key: string }>('tempData');
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Storage 직렬화 가능한 값 타입
 */
type Serializable = string | number | boolean | null | undefined | Serializable[] | { [key: string]: Serializable };

// ============================================================================
// STORAGE FACTORY
// ============================================================================

/**
 * Storage 인스턴스 생성
 *
 * @param storage - Web Storage API (localStorage 또는 sessionStorage)
 * @returns Storage 유틸리티 객체
 */
function createStorage(storage: Storage | null) {
  return {
    /**
     * 값 저장
     *
     * @param key - 저장 키
     * @param value - 저장할 값
     */
    set: <T extends Serializable>(key: string, value: T): void => {
      if (!storage) return;
      storage.setItem(key, JSON.stringify(value));
    },

    /**
     * 값 조회
     *
     * @param key - 조회 키
     * @param defaultValue - 기본값 (선택)
     * @returns 저장된 값 또는 기본값
     */
    get: <T>(key: string, defaultValue?: T): T | null => {
      if (!storage) return defaultValue ?? null;

      const item = storage.getItem(key);
      if (item === null) return defaultValue ?? null;

      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    },

    /**
     * 값 삭제
     *
     * @param key - 삭제 키
     */
    remove: (key: string): void => {
      storage?.removeItem(key);
    },

    /**
     * 모든 값 삭제
     */
    clear: (): void => {
      storage?.clear();
    },

    /**
     * 키 존재 확인
     *
     * @param key - 확인 키
     * @returns 키 존재 여부
     */
    has: (key: string): boolean => {
      if (!storage) return false;
      return storage.getItem(key) !== null;
    },

    /**
     * 모든 키 조회
     *
     * @returns 저장된 모든 키 배열
     */
    keys: (): string[] => {
      if (!storage) return [];

      const keys: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key) keys.push(key);
      }

      return keys;
    },

    /**
     * 저장된 항목 수
     *
     * @returns 저장된 항목 수
     */
    size: (): number => {
      return storage?.length ?? 0;
    },
  };
}

// ============================================================================
// LOCAL STORAGE
// ============================================================================

/**
 * Local Storage 유틸리티
 *
 * @description
 * 영구 저장소 (브라우저 종료 후에도 유지)
 * - 사용자 설정, 테마, 언어 등
 * - 5~10MB 제한
 */
export const local = createStorage(typeof window !== 'undefined' ? window.localStorage : null);

// ============================================================================
// SESSION STORAGE
// ============================================================================

/**
 * Session Storage 유틸리티
 *
 * @description
 * 세션 저장소 (브라우저 종료 시 삭제)
 * - 임시 데이터, 폼 입력, 페이지 간 전달 데이터
 * - 5~10MB 제한
 */
export const session = createStorage(typeof window !== 'undefined' ? window.sessionStorage : null);
