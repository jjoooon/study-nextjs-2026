import type { XPathNode, XPathFilter } from './xmlTypes';

/**
 * XPath 토크나이저
 */
export function tokenizeXPath(xpath: string): string[] {
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
 * 단일 필터 평가 함수
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function evaluateFilter(item: any, filter: XPathFilter): boolean {
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
}

/**
 * 필터 표현식 파서 (and/or 지원)
 *
 * @example
 * - [@a=1 and @b=2 or @c=3]
 * - [@a=1 and @b=2]
 * - [@a=1 or @b=2]
 */
export function parseFilterExpression(expression: string): XPathFilter[] {
  const filters: XPathFilter[] = [];

  // and와 or를 모두 분리하지만, 연산자 우선순위는 왼쪽에서 오른쪽으로
  // 실제 XPath에서는 and가 or보다 높은 우선순위를 가짐
  const tokens = expression.split(/\s+(and|or)\s+/i);
  const operators = expression.match(/\s+(and|or)\s+/gi);

  for (let i = 0; i < tokens.length; i++) {
    const part = tokens[i].trim();
    const match = part.match(/@(\w+)\s*(=|!=|<=?|>=?)\s*'([^']*)'/);

    if (match) {
      const [, attribute, operator, value] = match;
      filters.push({
        attribute,
        operator: operator as XPathFilter['operator'],
        value,
        // 다음 토큰이 있으면 현재 필터의 논리 연산자로 설정
        logic: operators && i < operators.length ? (operators[i].trim().toLowerCase() as 'and' | 'or') : undefined,
      });
    }
  }

  return filters;
}

/**
 * XPath 파서 (AST 생성)
 */
export function parseXPath(xpath: string): XPathNode[] {
  const tokens = tokenizeXPath(xpath);
  const nodes: XPathNode[] = [];
  let currentNode: XPathNode | null = null;
  let currentFilters: XPathFilter[] = [];
  let inFilter = false;
  let filterBuffer = '';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

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
        // 속성 반환: /path/@attr 또는 /path/@attr (독립 노드)
        const attrName = token.substring(1);
        if (currentNode) {
          currentNode.returnAttribute = attrName;
        } else {
          // @attr이 독립적인 노드로 온 경우 (예: /CVRGE/@CVRCD)
          // 이전 노드의 속성으로 처리해야 함
          if (nodes.length > 0) {
            nodes[nodes.length - 1].returnAttribute = attrName;
          }
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
