import { parseStringPromise } from 'xml2js';

/**
 * XML을 JSON으로 변환하는 유틸리티 함수
 * @param xmlString - XML 문자열
 * @returns 파싱된 JSON 객체
 */
export async function convertXmlToJson(xmlString: string): Promise<any> {
  try {
    const result = await parseStringPromise(xmlString, {
      explicitArray: false, // 단일 요소일 경우 배열로 변환하지 않음
      mergeAttrs: true, // 속성을 객체 프로퍼티로 병합
      trim: true, // 텍스트 값 공백 제거
      ignoreAttrs: false, // 속성 유지
      charkey: 'value', // 텍스트 값의 키 이름
    });

    return result;
  } catch (error) {
    console.error('XML 파싱 오류:', error);
    throw new Error(`XML 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
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
