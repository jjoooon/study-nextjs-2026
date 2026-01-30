import type { XPathNode, CompiledQuery } from './xmlTypes';
import { evaluateFilter } from './xpathParser';

/**
 * XPath 쿼리 캐시 (LRU Cache)
 */
const queryCache = new Map<string, CompiledQuery>();
const MAX_CACHE_SIZE = 100;

function setCache(key: string, value: CompiledQuery) {
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
 */
export function compileXPath(nodes: XPathNode[]): CompiledQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data: any): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = data;

    for (const node of nodes) {
      if (!current) return null;

      // 현재 레벨이 배열이면 모든 요소에서 검색
      if (Array.isArray(current)) {
        current = current.map((item) => item[node.name]).filter(Boolean);
        if (current.length === 0) return null;
        if (current.length === 1) current = current[0];
      } else {
        current = current[node.name];
      }

      if (current === null || current === undefined) return null;

      // 필터 적용 (and/or 지원)
      if (node.filters && node.filters.length > 0) {
        const items = Array.isArray(current) ? current : [current];
        const filters = node.filters; // 타입 가드
        const filtered = items.filter((item) => {
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
          return current.map((item) => item[node.returnAttribute!]);
        }
        return current[node.returnAttribute];
      }
    }

    return current;
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
 */
export function getCachedOrCompile(xpath: string, nodes: XPathNode[]): CompiledQuery {
  // 캐시 확인
  if (queryCache.has(xpath)) {
    return queryCache.get(xpath)!;
  }

  // 컴파일 및 캐시 저장
  const compiled = compileXPath(nodes);
  setCache(xpath, compiled);

  return compiled;
}
