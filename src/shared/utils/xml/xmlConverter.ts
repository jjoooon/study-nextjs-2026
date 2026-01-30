import * as jp from 'jsonpath';
import { parseStringPromise } from 'xml2js';

// ============================================================================
// 타입 정의
// ============================================================================

interface XPathFilter {
  attribute: string;
  operator: '=' | '!=' | '<' | '>' | '<=' | '>=';
  value: string;
  logic?: 'and' | 'or';
}

interface XPathNode {
  name: string;
  filters?: XPathFilter[];
  returnAttribute?: string; // @attr 형식으로 속성 값만 반환
}

interface CompiledQuery {
  (data: any): any;
}

// ============================================================================
// XPath 파서 및 변환기
// ============================================================================

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
 * XPath 토크나이저
 */
function tokenizeXPath(xpath: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inString = false;
  let inBracket = 0;

  for (let i = 0; i < xpath.length; i++) {
    const char = xpath[i];
    const nextChar = xpath[i + 1];

    if (char === "'" && !inBracket) {
      inString = !inString;
      current += char;
    } else if (inString) {
      current += char;
    } else if (char === '[') {
      if (current.trim()) tokens.push(current.trim());
      tokens.push('[');
      current = '';
      inBracket++;
    } else if (char === ']') {
      if (current.trim()) tokens.push(current.trim());
      tokens.push(']');
      current = '';
      inBracket--;
    } else if (char === '/') {
      if (current.trim() || (nextChar === '/' && !current)) {
        if (current.trim()) tokens.push(current.trim());
        tokens.push('/');
        current = '';
      }
    } else if (char === '@') {
      if (current.trim()) tokens.push(current.trim());
      current = '@';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    tokens.push(current.trim());
  }

  return tokens;
}

/**
 * XPath 파서 (AST 생성)
 */
function parseXPath(xpath: string): XPathNode[] {
  const tokens = tokenizeXPath(xpath);
  const nodes: XPathNode[] = [];
  let currentNode: XPathNode | null = null;
  let currentFilters: XPathFilter[] = [];
  let inFilter = false;
  let filterBuffer = '';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const nextToken = tokens[i + 1];

    if (token === '[') {
      inFilter = true;
      filterBuffer = '';
    } else if (token === ']') {
      inFilter = false;
      const filters = parseFilterExpression(filterBuffer);
      currentFilters.push(...filters);
    } else if (inFilter) {
      filterBuffer += (filterBuffer ? ' ' : '') + token;
    } else if (token === '/') {
      if (currentNode) {
        currentNode.filters = currentFilters.length > 0 ? currentFilters : undefined;
        nodes.push(currentNode);
        currentFilters = [];
      }
      currentNode = null;
    } else if (token) {
      if (token.startsWith('@')) {
        // 속성 반환: /path/@attr
        if (currentNode) {
          currentNode.returnAttribute = token.substring(1);
        }
      } else if (!currentNode) {
        currentNode = { name: token };
      } else {
        // We already have a currentNode and encountered another name
        // This means the previous node is complete (didn't have filters)
        currentNode.filters = currentFilters.length > 0 ? currentFilters : undefined;
        nodes.push(currentNode);
        currentFilters = [];
        currentNode = { name: token };
      }
    }
  }

  if (currentNode) {
    currentNode.filters = currentFilters.length > 0 ? currentFilters : undefined;
    nodes.push(currentNode);
  }

  return nodes;
}

/**
 * 필터 표현식 파서
 */
function parseFilterExpression(expression: string): XPathFilter[] {
  const filters: XPathFilter[] = [];
  const parts = expression.split(/\s+and\s+/i);

  for (const part of parts) {
    const match = part.match(/@(\w+)\s*(=|!=|<=?|>=?)\s*'([^']*)'/);
    if (match) {
      const [, attribute, operator, value] = match;
      filters.push({
        attribute,
        operator: operator as XPathFilter['operator'],
        value,
      });
    }
  }

  return filters;
}

/**
 * AST를 실행 가능한 함수로 컴파일
 */
function compileXPath(nodes: XPathNode[]): CompiledQuery {
  return (data: any): any => {
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

      // 필터 적용
      if (node.filters && node.filters.length > 0) {
        const items = Array.isArray(current) ? current : [current];
        const filtered = items.filter((item) => {
          return node.filters!.every((filter) => {
            const attrValue = item[filter.attribute];
            const filterValue = filter.value;

            switch (filter.operator) {
              case '=':
                return attrValue === filterValue;
              case '!=':
                return attrValue !== filterValue;
              case '<':
                return attrValue < filterValue;
              case '>':
                return attrValue > filterValue;
              case '<=':
                return attrValue <= filterValue;
              case '>=':
                return attrValue >= filterValue;
              default:
                return false;
            }
          });
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

// ============================================================================
// XML → JSON 변환
// ============================================================================

/**
 * XML을 JSON으로 변환하는 유틸리티 함수
 *
 * @example
 * ```typescript
 * // 기본 사용 (단일 요소는 객체로, 여러 요소는 배열로)
 * const data = await convertXmlToJson(xml);
 *
 * // 커스텀 옵션
 * const data = await convertXmlToJson(xml, {
 *   explicitArray: false  // 단일 요소를 객체로 변환하지 않음
 * });
 * ```
 *
 * @param xmlString - XML 문자열
 * @param options - xml2js 파서 옵션
 * @returns 파싱된 JSON 객체
 */
export async function convertXmlToJson(
  xmlString: string,
  options?: {
    explicitArray?: boolean;
    mergeAttrs?: boolean;
    trim?: boolean;
    ignoreAttrs?: boolean;
    charkey?: string;
  }
): Promise<any> {
  try {
    const result = await parseStringPromise(xmlString, {
      // 기본 설정: XML을 자연스러운 JSON으로 변환
      explicitArray: false, // 단일 요소는 객체로, 여러 요소는 배열로
      mergeAttrs: true, // 속성을 객체 프로퍼티로 병합
      trim: true, // 텍스트 값 공백 제거
      ignoreAttrs: false, // 속성 유지
      charkey: 'value', // 텍스트 값의 키 이름
      ...options, // 사용자 커스텀 옵션으로 오버라이드
    });

    return result;
  } catch (error) {
    console.error('XML 파싱 오류:', error);
    throw new Error(`XML 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// ============================================================================
// XPath 쿼리 함수 (레거시 호환)
// ============================================================================

/**
 * XPath 스타일로 JSON 데이터 쿼리 (레거시 호환용)
 *
 * @example
 * ```typescript
 * // 기본 경로
 * const risks = xpathQuery(jsonData, "/GD/RISK_OBJCT_CVRGE/RISK");
 *
 * // 속성 필터링
 * const risk = xpathQuery(jsonData, "/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']");
 *
 * // 복합 조건
 * const coverage = xpathQuery(jsonData,
 *   "/GD/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE[@SL_STRDT<='20260130' and @SL_NDDT>'20260130']"
 * );
 *
 * // 속성 값만 반환
 * const attrCode = xpathQuery(jsonData,
 *   "/GD/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE/ADD_ATTR/ATTR[@ATRCD='CG00264']/@ATRCD"
 * );
 * ```
 *
 * @param jsonData - 변환된 JSON 데이터
 * @param xpath - XPath 쿼리 문자열
 * @returns 쿼리 결과
 */
export function xpathQuery(jsonData: any, xpath: string): any {
  // 캐시 확인
  if (queryCache.has(xpath)) {
    const compiled = queryCache.get(xpath)!;
    return compiled(jsonData);
  }

  // XPath 파싱 및 컴파일
  const nodes = parseXPath(xpath);
  const compiled = compileXPath(nodes);

  // 캐시 저장
  setCache(xpath, compiled);

  return compiled(jsonData);
}

/**
 * XPath 쿼리 캐시 비우기
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

// ============================================================================
// JSONPath 쿼리 함수 (추천)
// ============================================================================

/**
 * JSONPath로 JSON 데이터 쿼리 (현대적이고 강력한 방법)
 *
 * JSONPath는 XPath와 유사하지만 JSON에 최적화된 쿼리 언어입니다.
 * 훨씬 더 직관적이고 간편하게 데이터를 탐색할 수 있습니다.
 *
 * @example
 * ```typescript
 * // 기본 경로
 * const risks = jsonPathQuery(jsonData, '$.GD.RISK_OBJCT_CVRGE.RISK');
 *
 * // 필터링
 * const risk = jsonPathQuery(jsonData,
 *   "$.GD.RISK_OBJCT_CVRGE.RISK[?(@.RK_TPCD=='RLA20011')]"
 * );
 *
 * // 복잡한 조건
 * const coverage = jsonPathQuery(jsonData,
 *   "$.GD.RISK_OBJCT_CVRGE.RISK[?(@.RK_TPCD=='RLA20011')].OBJECT.CVRGE[?(@.SL_STRDT<='20260130' && @.SL_NDDT>'20260130')]"
 * );
 *
 * // 속성만 반환
 * const codes = jsonPathQuery(jsonData,
 *   "$.GD.RISK_OBJCT_CVRGE.RISK[?(@.RK_TPCD=='RLA20011')].OBJECT.CVRGE.@CVRCD"
 * );
 *
 * // 배열의 모든 요소
 * const allIds = jsonPathQuery(jsonData, '$..CVRGE[*].CVRCD');
 *
 * // 첫 번째 요소
 * const first = jsonPathQuery(jsonData, '$.GD.RISK_OBJCT_CVRGE.RISK[0]');
 *
 * // 마지막 요소
 * const last = jsonPathQuery(jsonData, '$.GD.RISK_OBJCT_CVRGE.RISK[(@.length-1)]');
 * ```
 *
 * @param jsonData - 변환된 JSON 데이터
 * @param jsonPath - JSONPath 쿼리 문자열
 * @returns 쿼리 결과 (항상 배열로 반환)
 */
export function jsonPathQuery(jsonData: any, jsonPath: string): any[] {
  try {
    const result = jp.query(jsonData, jsonPath);

    // JSONPath는 항상 배열을 반환하지만,
    // 단일 결과인 경우도 배열로 반환하여 일관성 유지
    return Array.isArray(result) ? result : [result];
  } catch (error) {
    console.error('JSONPath 쿼리 오류:', error);
    throw new Error(`JSONPath 쿼리 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * JSONPath로 단일 결과만 가져오기
 * 결과가 여러 개인 경우 첫 번째 항목만 반환
 *
 * @example
 * ```typescript
 * const risk = jsonPathQueryOne(jsonData,
 *   "$.GD.RISK_OBJCT_CVRGE.RISK[?(@.RK_TPCD=='RLA20011')]"
 * );
 * // 결과가 배열이 아니라 단일 객체로 반환
 * ```
 */
export function jsonPathQueryOne(jsonData: any, jsonPath: string): any {
  const results = jsonPathQuery(jsonData, jsonPath);
  return results.length > 0 ? results[0] : null;
}

/**
 * JSONPath로 값의 개수 가져오기
 */
export function jsonPathCount(jsonData: any, jsonPath: string): number {
  return jsonPathQuery(jsonData, jsonPath).length;
}

/**
 * JSONPath로 결과가 존재하는지 확인
 */
export function jsonPathExists(jsonData: any, jsonPath: string): boolean {
  return jsonPathQuery(jsonData, jsonPath).length > 0;
}

/**
 * XML 파일에서 특정 경로의 데이터 추출 (XPath 스타일)
 * @param jsonData - 변환된 JSON 데이터
 * @param path - 점으로 구분된 경로 (예: "GD.RISK_OBJCT_CVRGE.RISK")
 * @param filters - 필터 조건들 (예: { RK_TPCD: "RLA20011" })
 */
export function queryData(jsonData: any, path: string, filters?: Record<string, any>): any {
  const keys = path.split('.');
  let result = jsonData;

  // 경로 따라 접근
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return null;
    }
  }

  // 배열인 경우 필터 적용
  if (Array.isArray(result) && filters) {
    result = result.filter((item: any) => {
      return Object.entries(filters).every(([filterKey, filterValue]) => {
        return item[filterKey] === filterValue;
      });
    });
  }

  return result;
}

/**
 * 날짜 범위로 필터링하는 헬퍼 함수
 * @param data - 필터링할 데이터 배열
 * @param startDateKey - 시작일 키 이름
 * @param endDateKey - 종료일 키 이름
 * @param targetDate - 목표 날짜 (YYYYMMDD 형식)
 */
export function filterByDateRange(data: any[], startDateKey: string, endDateKey: string, targetDate: string): any[] {
  return data.filter((item: any) => {
    const startDate = item[startDateKey];
    const endDate = item[endDateKey];

    return startDate <= targetDate && endDate > targetDate;
  });
}
