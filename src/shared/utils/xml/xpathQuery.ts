import { getCachedOrCompile, clearXPathCache, getXPathCacheSize } from './xpathExecutor';
import { parseXPath } from './xpathParser';
import log from '@/shared/utils/logger';

/**
 * XPath 인젝션 방지를 위한 입력 검증
 *
 * 허용되는 XPath 패턴:
 * - 경로 구분자: /
 * - 속성 접근: @attributeName
 * - 필터 조건: [@attr='value'], [@attr<='value'], etc.
 * - 논리 연산자: and, or
 * - 비교 연산자: =, !=, <, >, <=, >=
 * - 문자열 리터럴: 'single quoted strings'
 */
const XPATH_PATTERN = /^[a-zA-Z0-9_@/\-[\]\s'=<>()]+$/;

/**
 * 허용되는 XPath 키워드 및 연산자
 * @deprecated 향후 버전에서 사용될 수 있음
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ALLOWED_XPATH_KEYWORDS = [
  'and',
  'or', // 논리 연산자
  '=',
  '!=',
  '<',
  '>',
  '<=',
  '>=', // 비교 연산자
];

/**
 * 위험한 패턴 탐지 (JavaScript 코드 인젝션 방지)
 */
const DANGEROUS_PATTERNS = [
  /javascript:/i,
  /eval\(/i,
  /function\(/i,
  /new\s+Function/i,
  /document\./i,
  /window\./i,
  /\.\./, // 경로 순회 방지
];

/**
 * XPath 입력값 검증
 *
 * @param xpath - 검증할 XPath 표현식
 * @throws {Error} 유효하지 않은 XPath인 경우
 */
function validateXPathInput(xpath: string): void {
  // 입력값 타입 검증
  if (typeof xpath !== 'string') {
    throw new Error('XPath는 문자열이어야 합니다');
  }

  if (!xpath || xpath.trim().length === 0) {
    throw new Error('XPath는 비어있을 수 없습니다');
  }

  // 길이 제한 (DoS 방지)
  if (xpath.length > 1000) {
    throw new Error('XPath가 너무 깁니다 (최대 1000자)');
  }

  // 위험한 패턴 검사
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(xpath)) {
      log.warn('잠재적 XPath 인젝션 시도 탐지', { xpath });
      throw new Error('위험한 XPath 표현식이 감지되었습니다');
    }
  }

  // 허용된 패턴 검증
  if (!XPATH_PATTERN.test(xpath)) {
    throw new Error(`허용되지 않는 문자가 XPath에 포함되어 있습니다: ${xpath}`);
  }
}

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
 * @throws {Error} 유효하지 않은 XPath 또는 쿼리 실패 시
 */

export function xpathQuery<T = unknown>(jsonData: unknown, xpath: string): T {
  const logger = log.getLogger('Global');

  try {
    // 입력값 검증 (인젝션 방지)
    validateXPathInput(xpath);

    // XPath 파싱 및 컴파일 (캐시 포함)
    const nodes = parseXPath(xpath);
    const compiled = getCachedOrCompile(xpath, nodes);

    // 쿼리 실행
    const result = compiled(jsonData);

    return result as T;
  } catch (error) {
    // 이미 처리된 에러인 경우 그대로 전파
    if (error instanceof Error && error.message.includes('XPath')) {
      throw error;
    }

    // 그 외 에러는 래핑하여 처리
    logger.error('XPath 쿼리 실행 오류:', { xpath, error });
    throw new Error(`XPath 쿼리 실패 (${xpath}): ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

// 재 내보내기
export { clearXPathCache, getXPathCacheSize };
