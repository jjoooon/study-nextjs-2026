/**
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { format as formatDate } from 'date-fns';

export const BaseMaskFormat = {
  SSN: '######-#######',
  SSNALL: '######-#######',
  LRN: '######-#######',
  DLN: '##-######-##',
  // PN: "#########",
  BRN: '###-##-#####',
  FOREIGN: '######-#######',
  CARD: '####-####-####-####',
  POST: '###-###',
  NUM: '#,###',
  DATE: 'yyyy-MM-dd',
  TIME: 'HH:mm:ss',
  CVT: '##/##',
  PLN: '####',
  DATETIME: 'yyyy-MM-dd HH:mm:ss',
} as const;

type FormatType = keyof typeof BaseMaskFormat;

type ValueInput = string | number | Date | null | undefined;
type StringInput = string | null | undefined;

/** 
 * 지정한 formatType에 맞춰서 포맷팅하여 반환합니다.
 * @param value 포팃팅대상 데이터
 * @param formatType 포맷유형
 * @return 포맷팅된 문자열
 * @example
 *   const formattedSSN = formatWithType('1234561234567', 'SSN');
 *   const formattedDate = formatWithType(new Date(), 'DATE');
 */
export function formatWithType(value: ValueInput, formatType: FormatType): string {
  if (value === null || value === undefined) return '';
  const formatTypeUpper: FormatType = formatType.toLocaleLowerCase() as FormatType;
  const formatStr: string = BaseMaskFormat[formatTypeUpper];
  return format(value, formatStr);
}

/**
 * 포맷문자유형대로 입력값을 포맷팅
 * @param value 포맷팅할 데이터
 * @param formatStr 포맷문자유형
 * @returns 포맷팅된 문자열
 * @example
 *   const formattedSSN = format('1234561234567', '######-#######');
 *   const formattedDate = format(new Date(), 'yyyy년 MM월 dd일');
 */
export function format(value: ValueInput, formatStr: string): string {
  if (
    formatStr === null || 
    formatStr === '' || 
    formatStr === undefined || 
    value === null || 
    value === undefined || 
    value === ''){ 
      return '';
    }
  
  const rawValue = String(value);
  // Date 처리
  if (/[yMdhms]/.test(formatStr)) {
    const date = new Date(value);
    if (!date) return rawValue;
    if (!Number.isNaN(date.getTime())) {
      return formatDate(date, formatStr);
    }
  }

  const onlyNumber = rawValue.replace(/\D/g, '');

  // 숫자 #,### or #,###.#0등 처리
  if (formatStr.includes(',') || (formatStr.includes('.') && !formatStr.includes('-'))) {
    const num = typeof value === 'number' ? value : Number(onlyNumber);
    if (!Number.isNaN(num)) {
      const decimalMatch = formatStr.split('.')[1];
      const decimalCount = decimalMatch ? decimalMatch.replaceAll(/[^#0]/g, '').length : 0;
      return new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: decimalCount,
        maximumFractionDigits: decimalCount,
      }).format(num);
    }
  }

  // 그 외 처리
  if (formatStr.includes('#')) {
    let result = formatStr;
    let numberIndex = 0;

    for (const element of formatStr) {
      if (element === '#' && numberIndex < onlyNumber.length) {
        result = result.replace('#', onlyNumber[numberIndex]);
        numberIndex++;
      }
    }
    return result.replaceAll('#', '');
  }

  return rawValue;
}