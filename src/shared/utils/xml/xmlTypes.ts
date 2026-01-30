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
export interface CompiledQuery {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any): any;
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
