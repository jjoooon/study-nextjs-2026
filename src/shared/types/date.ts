/**
 * Shared Date Types
 *
 * @description
 * 날짜 관련 공통 타입 정의
 * Redux state 직렬화를 위해 Date 객체 대신 ISO 문자열 사용
 */

/**
 * 날짜 범위 타입 (Redux state용)
 *
 * @description
 * ISO 8601 문자열 기반 날짜 범위
 * Redux state 저장에 적합 (Date 객체 직렬화 문제 해결)
 */
export interface DateRange {
  start: string;
  end: string;
}

/**
 * 날짜 범위 타입 (UI용)
 *
 * @description
 * Date 객체 기반 날짜 범위
 * 컴포넌트에서 사용하기 적합
 */
export interface DateRangeObject {
  start: Date;
  end: Date;
}

/**
 * 날짜 범위 프리셋 타입
 */
export type DateRangePreset =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | 'last7Days'
  | 'last30Days'
  | 'last90Days'
  | 'thisYear';
