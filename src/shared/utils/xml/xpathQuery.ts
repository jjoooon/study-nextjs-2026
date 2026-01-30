import { getCachedOrCompile, clearXPathCache, getXPathCacheSize } from './xpathExecutor';
import { parseXPath } from './xpathParser';

/**
 * XPath 스타일로 JSON 데이터 쿼리
 *
 * @example
 * ```typescript
 * // 기본 경로
 * const risks = xpathQuery(jsonData, "/GD/RISK_OBJCT_CVRGE/RISK");
 *
 * // 속성 필터링
 * const risk = xpathQuery(jsonData, "/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20011']");
 *
 * // 논리 연산자 (and/or)
 * const coverage = xpathQuery(jsonData,
 *   "/GD/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE[@SL_STRDT<='20260130' and @SL_NDDT>'20260130']"
 * );
 *
 * // 속성 값만 반환
 * const attrCode = xpathQuery(jsonData,
 *   "/GD/RISK[@RK_TPCD='RLA20011']/OBJECT/CVRGE/@CVRCD"
 * );
 *
 * // OR 조건
 * const risks = xpathQuery(jsonData,
 *   "/GD/RISK_OBJCT_CVRGE/RISK[@RK_TPCD='RLA20010' or @RK_TPCD='RLA20011']"
 * );
 * ```
 *
 * @param jsonData - 변환된 JSON 데이터
 * @param xpath - XPath 쿼리 문자열
 * @returns 쿼리 결과
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function xpathQuery(jsonData: any, xpath: string): any {
  // XPath 파싱 및 컴파일 (캐시 포함)
  const nodes = parseXPath(xpath);
  const compiled = getCachedOrCompile(xpath, nodes);

  return compiled(jsonData);
}

// 재내보
export { clearXPathCache, getXPathCacheSize };
