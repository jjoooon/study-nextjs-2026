export type BufferKey = string | number | symbol;

export interface Buffer<T = unknown> {
  /** 버퍼에서 키에 해당하는 값을 가져옵니다 */
  getBuffer(key: BufferKey): T | undefined;
  /** 버퍼에 키-값 쌍을 저장합니다 */
  setBuffer<K extends BufferKey>(key: K, value: T): void;
  /** 버퍼의 모든 키를 반환합니다 */
  getBufferKeys(): string[];
  /** 버퍼의 모든 키-값 쌍을 객체 배열 형태로 반환합니다 */
  getBufferItems(): Array<{ key: string; value: T }>;
  /** 버퍼에 해당 키가 존재하는지 확인합니다 */
  hasBuffer(key: BufferKey): boolean;
  /** 버퍼에서 해당 키를 삭제합니다 */
  removeBuffer(key: BufferKey): void;
  /** 버퍼를 초기화합니다 */
  resetBuffer(): void;
}

/** 빈 버퍼를 생성합니다 */
export function createBuffer<T = unknown>(): Buffer<T> {
  const buffer: Record<BufferKey, T> = {};

  return {
    getBuffer(key: BufferKey): T | undefined {
      return buffer[key];
    },

    setBuffer(key, value) {
      buffer[key] = value;
    },

    getBufferKeys() {
      return Object.keys(buffer);
    },

    getBufferItems(): Array<{ key: string; value: T }> {
      return Object.entries(buffer).map(([key, value]) => ({ key, value }));
    },

    hasBuffer(key) {
      return key in buffer;
    },

    removeBuffer(key) {
      delete buffer[key];
    },

    resetBuffer() {
      Object.keys(buffer).forEach((key) => {
        delete buffer[key];
      });
    },
  };
}
