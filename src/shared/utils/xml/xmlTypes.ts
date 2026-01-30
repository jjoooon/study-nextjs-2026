// ============================================================================
// 타입 정의
// ============================================================================

/**
 * XPath 필터 조건
 */
export interface XPathFilter {
  attribute: string;
  operator: '=' | '!=' | '<' | '>' | '<=' | '>=';
  value: string;
  logic?: 'and' | 'or'; // 다음 필터와의 논리 연산 관계
}

/**
 * XPath 노드 (AST)
 */
export interface XPathNode {
  name: string;
  filters?: XPathFilter[];
  returnAttribute?: string; // @attr 형식으로 속성 값만 반환
}

/**
 * 컴파일된 쿼리 함수
 */
export interface CompiledQuery<T = unknown> {
  (data: unknown): T;
}

/**
 * XML 파서 옵션
 */
export interface XmlParserOptions {
  explicitArray?: boolean;
  mergeAttrs?: boolean;
  trim?: boolean;
  ignoreAttrs?: boolean;
  charkey?: string;
}

/**
 * XML 파싱 결과의 기본 형태
 */
export type XmlNode = Record<string, unknown> | Record<string, unknown>[] | string | number | boolean | null;

/**
 * XML JSON 변환 결과 타입
 */
export type XmlJson<T = XmlNode> = T;
