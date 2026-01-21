/**
 * Shared Date Range Utilities
 *
 * @description
 * 자주 사용되는 날짜 범위 프리셋 함수들
 * 모든 날짜 범위는 ISO 8601 문자열로 반환 (Redux state 저장용)
 *
 * @architecture
 * 날짜 범위 프리셋 → ISO 문자열 기반 DateRange 반환
 * UI에서는 dateRangeFromState로 Date 객체로 변환 후 사용
 */

import type { DateRange } from '@/shared/types/dateTypes';

import { dateToISOString } from './dateSerialization';

// ============================================================================
// COMMON DATE RANGE PRESETS
// ============================================================================

/**
 * 오늘 날짜 범위 (Redux state용)
 *
 * @returns 오늘 00:00:00 ~ 23:59:59
 *
 * @example
 * todayRange()
 * // { start: '2024-01-15T00:00:00.000Z', end: '2024-01-15T23:59:59.000Z' }
 */
export const todayRange = (): DateRange => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 어제 날짜 범위 (Redux state용)
 *
 * @returns 어제 00:00:00 ~ 23:59:59
 */
export const yesterdayRange = (): DateRange => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const start = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0);
  const end = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 이번 주 날짜 범위 (Redux state용)
 *
 * @returns 이번 주 일요일 00:00:00 ~ 토요일 23:59:59
 */
export const thisWeekRange = (): DateRange => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - dayOfWeek), 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 지난 주 날짜 범위 (Redux state용)
 *
 * @returns 지난 주 일요일 00:00:00 ~ 토요일 23:59:59
 */
export const lastWeekRange = (): DateRange => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek - 7, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek - 1, 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 이번 달 날짜 범위 (Redux state용)
 *
 * @returns 이번 달 1일 00:00:00 ~ 마지막 날 23:59:59
 */
export const thisMonthRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 지난 달 날짜 범위 (Redux state용)
 *
 * @returns 지난 달 1일 00:00:00 ~ 마지막 날 23:59:59
 */
export const lastMonthRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 지난 7일 날짜 범위 (Redux state용)
 *
 * @returns 7일 전 00:00:00 ~ 현재 23:59:59
 */
export const last7DaysRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const end = new Date();

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 지난 30일 날짜 범위 (Redux state용)
 *
 * @returns 30일 전 00:00:00 ~ 현재 23:59:59
 */
export const last30DaysRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const end = new Date();

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 지난 90일 날짜 범위 (Redux state용)
 *
 * @returns 90일 전 00:00:00 ~ 현재 23:59:59
 */
export const last90DaysRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  const end = new Date();

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

/**
 * 올해 날짜 범위 (Redux state용)
 *
 * @returns 올해 1월 1일 00:00:00 ~ 12월 31일 23:59:59
 */
export const thisYearRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  return {
    start: dateToISOString(start),
    end: dateToISOString(end),
  };
};

// ============================================================================
// DATE RANGE PRESET MAP
// ============================================================================

/**
 * 날짜 범위 프리셋 매핑
 *
 * @description
 * 문자열 키로 날짜 범위 함수 호출
 * UI 셀렉트 박스 등에서 사용
 */
export const DATE_RANGE_PRESETS: Record<
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last7Days'
  | 'last30Days'
  | 'last90Days'
  | 'thisYear',
  () => DateRange
> = {
  today: todayRange,
  yesterday: yesterdayRange,
  thisWeek: thisWeekRange,
  lastWeek: lastWeekRange,
  thisMonth: thisMonthRange,
  lastMonth: lastMonthRange,
  last7Days: last7DaysRange,
  last30Days: last30DaysRange,
  last90Days: last90DaysRange,
  thisYear: thisYearRange,
};

/**
 * 날짜 범위 프리셋 실행 헬퍼
 *
 * @param preset - 날짜 범위 프리셋 키
 * @returns 날짜 범위
 *
 * @example
 * getDateRangeByPreset('last30Days')
 * // { start: '...', end: '...' }
 */
export const getDateRangeByPreset = (preset: keyof typeof DATE_RANGE_PRESETS): DateRange => {
  return DATE_RANGE_PRESETS[preset]();
};
