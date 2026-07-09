/**
 * Date Utilities
 *
 * @description
 * date-fns를 사용한 날짜 처리 유틸리티 함수
 * - 포맷팅, 파싱, 비교, 계산
 * - 한국 시간대(KST) 지원
 * - 타입 안전한 날짜 조작
 *
 * @usage
 * import { format, parse, add, subtract, isToday, diff } from '@/shared/utils/dateUtils';
 *
 * // 형식화
 * format(new Date(), 'yyyy-MM-dd'); // '2026-02-04'
 * format(new Date(), 'yyyy년 M월 d일 HH:mm'); // '2026년 2월 4일 14:30'
 *
 * // 파싱
 * parse('2026-02-04', 'yyyy-MM-dd');
 *
 * // 날짜 계산
 * add(new Date(), { days: 7, months: 1 });
 * subtract(new Date(), { days: 1 });
 *
 * // 비교
 * isToday(new Date());
 * diff(date1, date2, 'days');
 */

import {
  format as formatDate,
  parseISO,
  parse as parseDate,
  addDays,
  subDays,
  addMonths,
  subMonths,
  addYears,
  subYears,
  addHours,
  subHours,
  addMinutes,
  subMinutes,
  addSeconds,
  subSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMonths,
  differenceInYears,
  isToday as dateFnsIsToday,
  isYesterday as dateFnsIsYesterday,
  isTomorrow as dateFnsIsTomorrow,
  isPast as dateFnsIsPast,
  isFuture as dateFnsIsFuture,
  isValid,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  formatDistanceToNow,
  formatRelative,
} from 'date-fns';
import { ko } from 'date-fns/locale';

// ============================================================================
// TYPES
// ============================================================================

/**
 * 날짜 입력 가능 타입
 */
type DateInput = Date | string | number;

/**
 * 날짜 단위
 */
type DateUnit = 'days' | 'hours' | 'minutes' | 'seconds' | 'months' | 'years';

/**
 * 날짜 추가 옵션
 */
type AddOptions = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  months?: number;
  years?: number;
};

// ============================================================================
// PARSING
// ============================================================================

/**
 * ISO 8601 문자열을 Date로 파싱
 *
 * @param dateStr - ISO 8601 날짜 문자열
 * @returns Date 객체 또는 null (파싱 실패 시)
 *
 * @example
 * parseISO('2026-02-04'); // Date
 * parseISO('2026-02-04T14:30:00Z'); // Date
 */
export function parse(dateStr: string): Date | null {
  const date = parseISO(dateStr);
  return isValid(date) ? date : null;
}

/**
 * 형식 문자열로 날짜 파싱
 *
 * @param dateStr - 날짜 문자열
 * @param formatStr - 형식 문자열
 * @returns Date 객체 또는 null (파싱 실패 시)
 *
 * @example
 * parseWithFormat('2026-02-04', 'yyyy-MM-dd');
 * parseWithFormat('04/02/2026', 'dd/MM/yyyy');
 */
export function parseWithFormat(dateStr: string, formatStr: string): Date | null {
  const date = parseDate(dateStr, formatStr, new Date());
  return isValid(date) ? date : null;
}

/**
 * 안전한 Date 객체 생성
 *
 * @param input - 날짜 입력
 * @returns 유효한 Date 객체 또는 null
 */
export function createDate(input?: DateInput): Date | null {
  if (input === null || input === undefined) return null;
  const date = typeof input === 'string' ? parseISO(input) : new Date(input);
  return isValid(date) ? date : null;
}

// ============================================================================
// FORMATTING
// ============================================================================

/**
 * 날짜 형식화 (한국어 로케일)
 *
 * @param date - 날짜 입력
 * @param formatStr - 형식 문자열 (date-fns 형식)
 * @returns 형식화된 날짜 문자열
 *
 * @example
 * format(new Date(), 'yyyy-MM-dd'); // '2026-02-04'
 * format(new Date(), 'yyyy년 M월 d일'); // '2026년 2월 4일'
 * format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // '2026-02-04 14:30:45'
 */
export function format(date: DateInput, formatStr: string): string {
  const d = createDate(date);
  if (!d) return '';
  return formatDate(d, formatStr, { locale: ko });
}

/**
 * ISO 8601 형식으로 변환
 *
 * @param date - 날짜 입력
 * @returns ISO 8601 문자열
 */
export function toISOString(date: DateInput): string {
  const d = createDate(date);
  if (!d) return '';
  return d.toISOString();
}

/**
 * 상대적 시간 표현 (지금으로부터)
 *
 * @param date - 날짜 입력
 * @returns 상대적 시간 문자열 (한국어)
 *
 * @example
 * fromNow(new Date()); // '방금'
 * fromNow(addDays(new Date(), -1)); // '1일 전'
 * fromNow(addDays(new Date(), 7)); // '7일 후'
 */
export function fromNow(date: DateInput): string {
  const d = createDate(date);
  if (!d) return '';
  return formatDistanceToNow(d, { locale: ko, addSuffix: true });
}

/**
 * 상대적 날짜 표현
 *
 * @param date - 날짜 입력
 * @param baseDate - 기준 날짜 (기본값: 현재)
 * @returns 상대적 날짜 문자열
 */
export function relativeTo(date: DateInput, baseDate: DateInput = new Date()): string {
  const d = createDate(date);
  const base = createDate(baseDate);
  if (!d || !base) return '';
  return formatRelative(d, base, { locale: ko });
}

/**
 * YYYY-MM-DD 형식 (표준 날짜)
 */
export function formatStandard(date: DateInput): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * YYYY-MM-DD HH:mm:ss 형식 (표준 날짜시간)
 */
export function formatDateTime(date: DateInput): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * YYYY년 M월 D일 형식 (한국어 날짜)
 */
export function formatKorean(date: DateInput): string {
  return format(date, 'yyyy년 M월 d일');
}

/**
 * YYYY년 M월 D일 HH:mm 형식 (한국어 날짜시간)
 */
export function formatKoreanDateTime(date: DateInput): string {
  return format(date, 'yyyy년 M월 d일 HH:mm');
}

/**
 * HH:mm 형식 (시간)
 */
export function formatTime(date: DateInput): string {
  return format(date, 'HH:mm');
}

/**
 * HH:mm:ss 형식 (시간+초)
 */
export function formatTimeWithSeconds(date: DateInput): string {
  return format(date, 'HH:mm:ss');
}

// ============================================================================
// COMPARISON
// ============================================================================

/**
 * 오늘인지 확인
 *
 * @param date - 날짜 입력
 * @returns 오늘 여부
 */
export function isToday(date: DateInput): boolean {
  const d = createDate(date);
  return d ? dateFnsIsToday(d) : false;
}

/**
 * 어제인지 확인
 *
 * @param date - 날짜 입력
 * @returns 어제 여부
 */
export function isYesterday(date: DateInput): boolean {
  const d = createDate(date);
  return d ? dateFnsIsYesterday(d) : false;
}

/**
 * 내일인지 확인
 *
 * @param date - 날짜 입력
 * @returns 내일 여부
 */
export function isTomorrow(date: DateInput): boolean {
  const d = createDate(date);
  return d ? dateFnsIsTomorrow(d) : false;
}

/**
 * 과거인지 확인
 *
 * @param date - 날짜 입력
 * @returns 과거 여부
 */
export function isPast(date: DateInput): boolean {
  const d = createDate(date);
  return d ? dateFnsIsPast(d) : false;
}

/**
 * 미래인지 확인
 *
 * @param date - 날짜 입력
 * @returns 미래 여부
 */
export function isFuture(date: DateInput): boolean {
  const d = createDate(date);
  return d ? dateFnsIsFuture(d) : false;
}

/**
 * 두 날짜 간의 차이 계산
 *
 * @param dateLeft - 시작 날짜
 * @param dateRight - 끝 날짜
 * @param unit - 단위 (days, hours, minutes, seconds, months, years)
 * @param absolute - 절대값 반환 여부 (기본값: true). false면 dateLeft가 dateRight보다
 *                   과거일 때 음수를 반환
 * @returns 차이 값
 *
 * @example
 * diff('2026-02-01', '2026-02-04', 'days'); // 3
 * diff('2026-01-01', '2026-02-01', 'months'); // 1
 * diff('2026-02-01', '2026-02-04', 'days', false); // -3
 */
export function diff(
  dateLeft: DateInput,
  dateRight: DateInput,
  unit: DateUnit = 'days',
  absolute: boolean = true
): number {
  const left = createDate(dateLeft);
  const right = createDate(dateRight);
  if (!left || !right) return 0;

  const applySign = (value: number) => (absolute ? Math.abs(value) : value);

  switch (unit) {
    case 'days':
      return applySign(differenceInDays(left, right));
    case 'hours':
      return applySign(differenceInHours(left, right));
    case 'minutes':
      return applySign(differenceInMinutes(left, right));
    case 'seconds':
      return applySign(differenceInSeconds(left, right));
    case 'months':
      return applySign(differenceInMonths(left, right));
    case 'years':
      return applySign(differenceInYears(left, right));
    default:
      return 0;
  }
}

// ============================================================================
// ARITHMETIC
// ============================================================================

/**
 * 날짜 더하기
 *
 * @param date - 날짜 입력
 * @param options - 추가 옵션
 * @returns 새로운 Date 객체
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 *
 * @example
 * add(new Date(), { days: 7 }); // 7일 후
 * add(new Date(), { months: 1 }); // 1개월 후
 * add(new Date(), { days: 7, months: 1 }); // 7일 1개월 후
 */
export function add(date: DateInput, options: AddOptions): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot add to invalid date');

  let result = d;

  if (options.days) result = addDays(result, options.days);
  if (options.hours) result = addHours(result, options.hours);
  if (options.minutes) result = addMinutes(result, options.minutes);
  if (options.seconds) result = addSeconds(result, options.seconds);
  if (options.months) result = addMonths(result, options.months);
  if (options.years) result = addYears(result, options.years);

  return result;
}

/**
 * 날짜 빼기
 *
 * @param date - 날짜 입력
 * @param options - 뺄셈 옵션
 * @returns 새로운 Date 객체
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 *
 * @example
 * subtract(new Date(), { days: 7 }); // 7일 전
 * subtract(new Date(), { months: 1 }); // 1개월 전
 */
export function subtract(date: DateInput, options: AddOptions): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot subtract from invalid date');

  let result = d;

  if (options.days) result = subDays(result, options.days);
  if (options.hours) result = subHours(result, options.hours);
  if (options.minutes) result = subMinutes(result, options.minutes);
  if (options.seconds) result = subSeconds(result, options.seconds);
  if (options.months) result = subMonths(result, options.months);
  if (options.years) result = subYears(result, options.years);

  return result;
}

// ============================================================================
// BOUNDARIES
// ============================================================================

/**
 * 날짜의 시작 (00:00:00)
 *
 * @param date - 날짜 입력
 * @returns 해당 날짜의 시작 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function start(date: DateInput): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get start of invalid date');
  return startOfDay(d);
}

/**
 * 날짜의 끝 (23:59:59.999)
 *
 * @param date - 날짜 입력
 * @returns 해당 날짜의 끝 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function end(date: DateInput): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get end of invalid date');
  return endOfDay(d);
}

/**
 * 주의 시작 (월요일)
 *
 * @param date - 날짜 입력
 * @returns 해당 주의 시작 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function startOfCurrentWeek(date: DateInput = new Date()): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get start of week');
  return startOfWeek(d, { locale: ko });
}

/**
 * 주의 끝 (일요일)
 *
 * @param date - 날짜 입력
 * @returns 해당 주의 끝 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function endOfCurrentWeek(date: DateInput = new Date()): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get end of week');
  return endOfWeek(d, { locale: ko });
}

/**
 * 월의 시작
 *
 * @param date - 날짜 입력
 * @returns 해당 월의 시작 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function startOfCurrentMonth(date: DateInput = new Date()): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get start of month');
  return startOfMonth(d);
}

/**
 * 월의 끝
 *
 * @param date - 날짜 입력
 * @returns 해당 월의 끝 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function endOfCurrentMonth(date: DateInput = new Date()): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get end of month');
  return endOfMonth(d);
}

/**
 * 연도의 시작
 *
 * @param date - 날짜 입력
 * @returns 해당 연도의 시작 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function startOfCurrentYear(date: DateInput = new Date()): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get start of year');
  return startOfYear(d);
}

/**
 * 연도의 끝
 *
 * @param date - 날짜 입력
 * @returns 해당 연도의 끝 시간
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function endOfCurrentYear(date: DateInput = new Date()): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot get end of year');
  return endOfYear(d);
}

// ============================================================================
// UTILITY
// ============================================================================

/**
 * 현재 시간 타임스탬프
 *
 * @returns 밀리초 타임스탬프
 */
export function now(): number {
  return Date.now();
}

/**
 * 유효한 날짜인지 확인
 *
 * @param date - 날짜 입력
 * @returns 유효 여부
 *
 * @example
 * isValidDate(new Date()); // true
 * isValidDate('2026-02-04'); // true
 * isValidDate('invalid-date'); // false
 * isValidDate(undefined); // false
 */
export function isValidDate(date: DateInput): boolean {
  const d = createDate(date);
  return d !== null;
}

/**
 * 날짜 복제 (불변성 보장)
 *
 * @param date - 날짜 입력
 * @returns 새로운 Date 객체
 * @throws {Error} 유효하지 않은 날짜가 입력된 경우
 */
export function clone(date: DateInput): Date {
  const d = createDate(date);
  if (!d) throw new Error('Invalid date input: cannot clone invalid date');
  return new Date(d.getTime());
}
