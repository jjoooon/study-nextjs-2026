/**
 * Shared Date Serialization Utilities
 *
 * @description
 * Redux state의 Date 직렬화 문제를 해결하기 위한
 * 날짜 변환 헬퍼 함수들
 *
 * @architecture
 * Date 객체 ↔ ISO 8601 문자열 변환
 * Redux state에는 ISO 문자열로 저장
 * UI에서는 Date 객체로 사용
 */

import type { DateRange, DateRangeObject } from '@/shared/types/dateTypes';

// ============================================================================
// DATE SERIALIZATION UTILS
// ============================================================================

/**
 * Date 객체를 ISO 8601 문자열로 변환
 *
 * @param date - Date 객체
 * @returns ISO 8601 형식의 날짜 문자열
 *
 * @example
 * dateToISOString(new Date('2024-01-15')) // '2024-01-15T00:00:00.000Z'
 */
export const dateToISOString = (date: Date): string => {
  return date.toISOString();
};

/**
 * ISO 8601 문자열을 Date 객체로 변환
 *
 * @param isoString - ISO 8601 형식의 날짜 문자열
 * @returns Date 객체
 *
 * @example
 * isoStringToDate('2024-01-15T00:00:00.000Z') // Date 객체
 */
export const isoStringToDate = (isoString: string): Date => {
  return new Date(isoString);
};

/**
 * 현재 날짜를 ISO 8601 문자열로 반환
 *
 * @returns 현재 날짜의 ISO 8601 문자열
 *
 * @example
 * getCurrentDateISOString() // '2024-01-15T10:30:00.000Z'
 */
export const getCurrentDateISOString = (): string => {
  return new Date().toISOString();
};

/**
 * Date 객체 배열을 ISO 문자열 배열로 변환
 *
 * @param dates - Date 객체 배열
 * @returns ISO 문자열 배열
 */
export const datesToISOStrings = (dates: Date[]): string[] => {
  return dates.map((date) => dateToISOString(date));
};

/**
 * ISO 문자열 배열을 Date 객체 배열로 변환
 *
 * @param isoStrings - ISO 문자열 배열
 * @returns Date 객체 배열
 */
export const isoStringsToDates = (isoStrings: string[]): Date[] => {
  return isoStrings.map((isoString) => isoStringToDate(isoString));
};

// ============================================================================
// DATE RANGE CONVERSION
// ============================================================================

/**
 * DateRange 객체를 Redux state용으로 변환
 *
 * @param dateRange - Date 객체 기반 날짜 범위
 * @returns ISO 문자열 기반 날짜 범위
 *
 * @example
 * dateRangeToState({
 *   start: new Date('2024-01-01'),
 *   end: new Date('2024-01-31')
 * })
 * // { start: '2024-01-01T00:00:00.000Z', end: '2024-01-31T00:00:00.000Z' }
 */
export const dateRangeToState = (dateRange: DateRangeObject): DateRange => {
  return {
    start: dateToISOString(dateRange.start),
    end: dateToISOString(dateRange.end),
  };
};

/**
 * Redux state의 DateRange를 Date 객체로 변환
 *
 * @param dateRange - ISO 문자열 기반 날짜 범위
 * @returns Date 객체 기반 날짜 범위
 *
 * @example
 * dateRangeFromState({
 *   start: '2024-01-01T00:00:00.000Z',
 *   end: '2024-01-31T00:00:00.000Z'
 * })
 * // { start: Date, end: Date }
 */
export const dateRangeFromState = (dateRange: DateRange): DateRangeObject => {
  return {
    start: isoStringToDate(dateRange.start),
    end: isoStringToDate(dateRange.end),
  };
};

// ============================================================================
// DATE VALIDATION
// ============================================================================

/**
 * ISO 문자열이 유효한 날짜인지 확인
 *
 * @param isoString - ISO 8601 형식의 날짜 문자열
 * @returns 유효성 여부
 */
export const isValidISOString = (isoString: string): boolean => {
  const date = new Date(isoString);
  return !isNaN(date.getTime());
};

/**
 * DateRange의 시작일이 종료일보다 이전인지 확인
 *
 * @param dateRange - 날짜 범위
 * @returns 유효성 여부
 */
export const isValidDateRange = (dateRange: DateRange): boolean => {
  const start = isoStringToDate(dateRange.start);
  const end = isoStringToDate(dateRange.end);

  return isValidISOString(dateRange.start) && isValidISOString(dateRange.end) && start <= end;
};
