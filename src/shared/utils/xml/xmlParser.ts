import { parseStringPromise } from 'xml2js';
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
