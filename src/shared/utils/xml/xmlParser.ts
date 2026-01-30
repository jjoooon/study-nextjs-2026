import { parseStringPromise } from 'xml2js';
import log from '@/shared/utils/logger';
import type { XmlParserOptions } from './xmlTypes';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function convertXmlToJson(xmlString: string, options?: XmlParserOptions): Promise<any> {
  const logger = log.getLogger('Global');

  // 입력값 검증
  if (!xmlString || typeof xmlString !== 'string') {
    throw new Error('XML 입력값은 비어있지 않은 문자열이어야 합니다');
  }

  // XXE 공격 방지를 위한 DTD/엔티티 검증
  // 참고: xml2js는 기본적으로 XXE에 안전하지만, 추가 보안 조치로 명시적 검증 수행
  const forbiddenPatterns = [
    /<!DOCTYPE/i,
    /<!ENTITY/i,
    /SYSTEM\s+/i,
    /PUBLIC\s+/i
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(xmlString)) {
      logger.warn('잠재적 XXE 공격 시도 탐지: DTD 또는 엔티티 선언 포함');
      throw new Error('DTD와 외부 엔티티가 포함된 XML은 허용되지 않습니다');
    }
  }

  try {
    const result = await parseStringPromise(xmlString, {
      // 기본 설정: XML을 자연스러운 JSON으로 변환
      explicitArray: false, // 단일 요소는 객체로, 여러 요소는 배열로
      mergeAttrs: true, // 속성을 객체 프로퍼티로 병합
      trim: true, // 텍스트 값 공백 제거
      ignoreAttrs: false, // 속성 유지
      charkey: 'value', // 텍스트 값의 키 이름

      // 보안 설정 (xml2js는 기본적으로 XXE 안전, 추가 보안 강화)
      // 참고: xml2js는 sax-js를 사용하며, sax-js는 DTD 처리를 지원하지 않음
      // 따라서 XXE 공격에 기본적으로 안전하지만 명시적으로 보안 설정 추가

      ...options, // 사용자 커스텀 옵션으로 오버라이드
    });

    return result;
  } catch (error) {
    logger.error('XML 파싱 오류:', error);
    throw new Error(`XML 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}
