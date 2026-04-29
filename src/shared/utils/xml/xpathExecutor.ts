import type { XPathNode, CompiledQuery } from './xmlTypes';
import { evaluateFilter } from './xpathParser';
import log from '@/shared/utils/logger';

/**
 * XPath 쿼리 캐시 (LRU Cache)
 */
const queryCache = new Map<string, CompiledQuery>();
const MAX_CACHE_SIZE = 100;

function setCache(key: string, value: CompiledQuery): void {
  if (queryCache.size >= MAX_CACHE_SIZE) {
    const firstKey = queryCache.keys().next().value;
    if (firstKey) {
      queryCache.delete(firstKey);
    }
  }
  queryCache.set(key, value);
}

/**
 * AST를 실행 가능한 함수로 컴파일
 *
 * @param nodes - XPath AST 노드 배열
 * @returns 컴파일된 쿼리 함수
 * @throws {Error} 컴파일 실패 시
 */
export function compileXPath<T = unknown>(nodes: XPathNode[]): CompiledQuery<T> {
  return (data: unknown): T => {
    try {
      let current: unknown = data;

      for (const node of nodes) {
        if (!current) return null as T;

        // 현재 레벨이 배열이면 모든 요소에서 검색
        if (Array.isArray(current)) {
          const mapped = current.map((item) => {
            if (item && typeof item === 'object') {
              return (item as Record<string, unknown>)[node.name];
            }
            return undefined;
          });
          // null과 undefined만 필터링, 빈 객체는 보존
          const filtered = mapped.filter((item) => item != null);
          if (filtered.length === 0) return null as T;
          // 중첩 배열 평탄화 (여러 부모의 자식 요소들을 하나의 배열로)
          const flattened = filtered.flat();
          current = flattened.length === 1 ? flattened[0] : flattened;
        } else if (current && typeof current === 'object') {
          current = (current as Record<string, unknown>)[node.name];
        } else {
          return null as T;
        }

        if (current === null || current === undefined) return null as T;

        // 필터 적용 (and/or 지원)
        if (node.filters && node.filters.length > 0) {
          const items = Array.isArray(current) ? current : [current];
          const filters = node.filters; // 타입 가드
          const filtered = items.filter((item) => {
            if (!item || typeof item !== 'object') {
              return false;
            }

            // 논리 연산자를 고려한 필터 평가
            let result = evaluateFilter(item, filters[0]);

            for (let i = 1; i < filters.length; i++) {
              const filter = filters[i];
              const filterResult = evaluateFilter(item, filter);
              const logic = filters[i - 1].logic || 'and';

              if (logic === 'and') {
                result = result && filterResult;
              } else if (logic === 'or') {
                result = result || filterResult;
              }
            }

            return result;
          });

          current = filtered.length === 1 ? filtered[0] : filtered;
        }

        // 속성 값만 반환
        if (node.returnAttribute) {
          if (Array.isArray(current)) {
            return current.map((item) => {
              if (item && typeof item === 'object') {
                return (item as Record<string, unknown>)[node.returnAttribute!];
              }
              return undefined;
            }) as T;
          }
          if (current && typeof current === 'object') {
            return (current as Record<string, unknown>)[node.returnAttribute] as T;
          }
          return null as T;
        }
      }

      return current as T;
    } catch (error) {
      log.error('XPath 쿼리 실행 중 오류 발생:', error);
      throw new Error(`XPath 쿼리 실행 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };
}

/**
 * XPath 캐시 비우기
 */
export function clearXPathCache(): void {
  queryCache.clear();
}

/**
 * XPath 캐시 크기 가져오기
 */
export function getXPathCacheSize(): number {
  return queryCache.size;
}

/**
 * 캐시에서 컴파일된 쿼리 가져오기 또는 컴파일 후 캐시에 저장
 *
 * @param xpath - XPath 쿼리 문자열 (캐시 키)
 * @param nodes - XPath AST 노드 배열
 * @returns 컴파일된 쿼리 함수
 */
export function getCachedOrCompile<T = unknown>(xpath: string, nodes: XPathNode[]): CompiledQuery<T> {
  // 캐시 확인
  if (queryCache.has(xpath)) {
    return queryCache.get(xpath) as CompiledQuery<T>;
  }

  // 컴파일 및 캐시 저장
  const compiled = compileXPath<T>(nodes);
  setCache(xpath, compiled);

  return compiled;
}
