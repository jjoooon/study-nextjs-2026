/**
 * Number Utilities
 *
 * @description
 * 숫자 처리를 위한 유틸리티 함수
 * - 포맷팅, 변환, 검증, 계산
 * - 한국어 숫자 표기 지원
 * - 타입 안전한 숫자 처리
 *
 * @usage
 * import {
 *   clamp,
 *   round,
 *   format,
 *   toInteger,
 *   isBetween,
 *   randomInt,
 *   sum,
 *   average
 * } from '@/shared/utils/numberUtils';
 *
 * // 범위 제한
 * clamp(15, 0, 10); // 10
 *
 * // 반올림
 * round(3.14159, { precision: 2 }); // 3.14
 *
 * // 포맷
 * format(1234567); // '1,234,567'
 *
 * // 범위 확인
 * isBetween(5, 0, 10); // true
 *
 * // 랜덤 정수
 * randomInt(1, 10); // 1-10 사이의 랜덤 정수
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * 숫자 입력 가능 타입
 */
type NumberInput = number | string;

/**
 * 반올림 옵션
 */
type RoundOptions = {
  precision?: number;
  mode?: 'round' | 'ceil' | 'floor' | 'trunc';
};

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * 숫자 여부 확인
 *
 * @param value - 확인할 값
 * @returns 숫자이면 true
 *
 * @example
 * isNumber(123); // true
 * isNumber('123'); // true
 * isNumber('abc'); // false
 * isNumber(NaN); // false
 * isNumber(null); // false
 */
export function isNumber(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') return !isNaN(Number(value)) && value.trim() !== '';
  return false;
}

/**
 * 정수 여부 확인
 *
 * @param value - 확인할 값
 * @returns 정수이면 true
 *
 * @example
 * isInteger(123); // true
 * isInteger(123.45); // false
 * isInteger('123'); // false (string type)
 */
export function isInteger(value: unknown): boolean {
  if (typeof value !== 'number') return false;
  return Number.isInteger(value);
}

/**
 * 양수 여부 확인
 *
 * @param value - 확인할 값
 * @returns 양수이면 true
 *
 * @example
 * isPositive(10); // true
 * isPositive(0); // false
 * isPositive(-5); // false
 */
export function isPositive(value: number): boolean {
  return typeof value === 'number' && value > 0;
}

/**
 * 음수 여부 확인
 *
 * @param value - 확인할 값
 * @returns 음수이면 true
 */
export function isNegative(value: number): boolean {
  return typeof value === 'number' && value < 0;
}

/**
 * 0 또는 양수 여부 확인
 *
 * @param value - 확인할 값
 * @returns 0 또는 양수이면 true
 */
export function isNonNegative(value: number): boolean {
  return typeof value === 'number' && value >= 0;
}

/**
 * 짝수 여부 확인
 *
 * @param value - 확인할 값
 * @returns 짝수이면 true
 */
export function isEven(value: number): boolean {
  return typeof value === 'number' && value % 2 === 0;
}

/**
 * 홀수 여부 확인
 *
 * @param value - 확인할 값
 * @returns 홀수이면 true
 */
export function isOdd(value: number): boolean {
  return typeof value === 'number' && value % 2 !== 0;
}

/**
 * 유한한 숫자 여부 확인
 *
 * @param value - 확인할 값
 * @returns 유한한 숫자이면 true
 */
export function isFinite(value: number): boolean {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * 범위 내에 있는지 확인
 *
 * @param value - 확인할 값
 * @param min - 최소값
 * @param max - 최대값
 * @param inclusive - 경계값 포함 여부 (기본: true)
 * @returns 범위 내에 있으면 true
 *
 * @example
 * isBetween(5, 0, 10); // true
 * isBetween(0, 0, 10); // true
 * isBetween(10, 0, 10, true); // true
 * isBetween(10, 0, 10, false); // false
 */
export function isBetween(value: number, min: number, max: number, inclusive: boolean = true): boolean {
  if (inclusive) {
    return value >= min && value <= max;
  }
  return value > min && value < max;
}

// ============================================================================
// PARSING
// ============================================================================

/**
 * 안전한 숫자 파싱
 *
 * @param value - 파싱할 값
 * @param defaultValue - 기본값 (기본: 0)
 * @returns 파싱된 숫자 또는 기본값
 *
 * @example
 * parse('123'); // 123
 * parse('abc'); // 0
 * parse('abc', 100); // 100
 * parse('12.34'); // 12.34
 */
export function parse(value: NumberInput | null | undefined, defaultValue: number = 0): number {
  if (value === null || value === undefined) return defaultValue;
  if (typeof value === 'number') return isNaN(value) ? defaultValue : value;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * 정수로 파싱
 *
 * @param value - 파싱할 값
 * @param defaultValue - 기본값 (기본: 0)
 * @returns 파싱된 정수 또는 기본값
 *
 * @example
 * toInteger('123.45'); // 123
 * toInteger('abc'); // 0
 * toInteger('12.99', -1); // -1
 */
export function toInteger(value: NumberInput | null | undefined, defaultValue: number = 0): number {
  const parsed = parse(value, defaultValue);
  return Math.trunc(parsed);
}

/**
 * 문자열을 숫자로 변환 (천 단위 콤마 포함)
 *
 * @param value - 파싱할 문자열
 * @param defaultValue - 기본값 (기본: 0)
 * @returns 파싱된 숫자 또는 기본값
 *
 * @example
 * parseComma('1,234,567'); // 1234567
 * parseComma('-1,234'); // -1234
 * parseComma('abc'); // 0
 */
export function parseComma(value: string | null | undefined, defaultValue: number = 0): number {
  if (value == null) return defaultValue;
  const cleaned = value.replace(/,/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? defaultValue : parsed;
}

// ============================================================================
// FORMATTING
// ============================================================================

/**
 * 숫자 포맷 (천 단위 콤마)
 *
 * @param value - 포맷할 숫자
 * @param options - 포맷 옵션
 * @returns 포맷된 문자열
 *
 * @example
 * format(1234567); // '1,234,567'
 * format(1234.567, { precision: 2 }); // '1,234.57'
 * format(-1234); // '-1,234'
 */
export function format(
  value: number,
  options?: {
    precision?: number;
    locale?: string;
  }
): string {
  const opts = {
    precision: options?.precision,
    locale: options?.locale || 'ko-KR',
  };

  if (opts.precision !== undefined) {
    return value.toLocaleString(opts.locale, {
      minimumFractionDigits: opts.precision,
      maximumFractionDigits: opts.precision,
    });
  }

  return value.toLocaleString(opts.locale);
}

/**
 * 통화 포맷 (한국 원)
 *
 * @param value - 포맷할 숫자
 * @param options - 포맷 옵션
 * @returns 포맷된 문자열
 *
 * @example
 * formatCurrency(10000); // '₩10,000'
 * formatCurrency(1234567); // '₩1,234,567'
 */
export function formatCurrency(
  value: number,
  options?: {
    symbol?: string;
    locale?: string;
  }
): string {
  const symbol = options?.symbol || '₩';
  const locale = options?.locale || 'ko-KR';
  const formatted = value.toLocaleString(locale);
  return `${symbol}${formatted}`;
}

/**
 * 퍼센트 포맷
 *
 * @param value - 포맷할 값 (0-1 또는 0-100)
 * @param options - 포맷 옵션
 * @returns 포맷된 문자열
 *
 * @example
 * formatPercent(0.1234); // '12.3%'
 * formatPercent(12.34, { isDecimal: false }); // '12.3%'
 * formatPercent(0.5, { decimals: 0 }); // '50%'
 */
export function formatPercent(
  value: number,
  options?: {
    decimals?: number;
    isDecimal?: boolean;
  }
): string {
  const decimals = options?.decimals ?? 1;
  const isDecimal = options?.isDecimal ?? true;
  const percent = isDecimal ? value * 100 : value;
  return `${percent.toFixed(decimals)}%`;
}

/**
 * 바이트를 사람이 읽기 쉬운 형식으로 변환
 *
 * @param bytes - 바이트 수
 * @param options - 포맷 옵션
 * @returns 포맷된 문자열
 *
 * @example
 * formatBytes(0); // '0 B'
 * formatBytes(1024); // '1 KB'
 * formatBytes(1048576); // '1 MB'
 * formatBytes(1073741824); // '1 GB'
 */
export function formatBytes(
  bytes: number,
  options?: {
    decimals?: number;
    binary?: boolean;
  }
): string {
  if (bytes === 0) return '0 B';

  const decimals = options?.decimals ?? 2;
  const binary = options?.binary ?? true;
  const k = binary ? 1024 : 1000;
  const sizes = binary ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * 숫자를 한국어로 변환
 *
 * @param value - 변환할 숫자
 * @returns 한국어 문자열
 *
 * @example
 * toKorean(12345); // '일만 이천삼백사십오'
 * toKorean(100); // '백'
 * toKorean(0); // '영'
 */
export function toKorean(value: number): string {
  if (value === 0) return '영';

  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const units = ['', '십', '백', '천'];
  const bigUnits = ['', '만', '억', '조', '경', '해'];

  const convertChunk = (num: number): string => {
    let result = '';
    const numStr = num.toString().padStart(4, '0');

    for (let i = 0; i < 4; i++) {
      const digit = parseInt(numStr[i]);
      const unitIndex = 3 - i;

      if (digit === 0) continue;
      if (digit === 1 && unitIndex > 0) {
        result += units[unitIndex];
      } else {
        result += digits[digit] + units[unitIndex];
      }
    }
    return result;
  };

  if (value < 0) return '마이너스 ' + toKorean(-value);

  let result = '';
  let chunkIndex = 0;

  while (value > 0) {
    const chunk = value % 10000;
    if (chunk > 0) {
      const chunkStr = convertChunk(chunk);
      result = chunkStr + bigUnits[chunkIndex] + result;
    }
    value = Math.floor(value / 10000);
    chunkIndex++;
  }

  return result || '영';
}

// ============================================================================
// ROUNDING
// ============================================================================

/**
 * 반올림
 *
 * @param value - 반올림할 값
 * @param options - 옵션
 * @returns 반올림된 값
 *
 * @example
 * round(3.14159, { precision: 2 }); // 3.14
 * round(3.5); // 4
 * round(3.5, { mode: 'floor' }); // 3
 */
export function round(value: number, options?: RoundOptions): number {
  const precision = options?.precision ?? 0;
  const mode = options?.mode ?? 'round';

  const multiplier = Math.pow(10, precision);
  const scaled = value * multiplier;

  switch (mode) {
    case 'ceil':
      return Math.ceil(scaled) / multiplier;
    case 'floor':
      return Math.floor(scaled) / multiplier;
    case 'trunc':
      return Math.trunc(scaled) / multiplier;
    case 'round':
    default:
      return Math.round(scaled) / multiplier;
  }
}

/**
 * 올림
 *
 * @param value - 올림할 값
 * @param precision - 소수점 자릿수 (기본: 0)
 * @returns 올림된 값
 */
export function ceil(value: number, precision: number = 0): number {
  return round(value, { precision, mode: 'ceil' });
}

/**
 * 내림
 *
 * @param value - 내림할 값
 * @param precision - 소수점 자릿수 (기본: 0)
 * @returns 내림된 값
 */
export function floor(value: number, precision: number = 0): number {
  return round(value, { precision, mode: 'floor' });
}

/**
 * 버림
 *
 * @param value - 버림할 값
 * @param precision - 소수점 자릿수 (기본: 0)
 * @returns 버림된 값
 */
export function trunc(value: number, precision: number = 0): number {
  return round(value, { precision, mode: 'trunc' });
}

// ============================================================================
// CLAMPING & BOUNDS
// ============================================================================

/**
 * 범위 내로 제한
 *
 * @param value - 제한할 값
 * @param min - 최소값
 * @param max - 최대값
 * @returns 제한된 값
 *
 * @example
 * clamp(15, 0, 10); // 10
 * clamp(-5, 0, 10); // 0
 * clamp(5, 0, 10); // 5
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 최소값 반환
 *
 * @param values - 숫자 배열
 * @returns 최소값
 * @throws {Error} 빈 배열인 경우
 */
export function min(...values: number[]): number {
  if (values.length === 0) throw new Error('min() requires at least one argument');
  return Math.min(...values);
}

/**
 * 최대값 반환
 *
 * @param values - 숫자 배열
 * @returns 최대값
 * @throws {Error} 빈 배열인 경우
 */
export function max(...values: number[]): number {
  if (values.length === 0) throw new Error('max() requires at least one argument');
  return Math.max(...values);
}

// ============================================================================
// RANDOM
// ============================================================================

/**
 * 범위 내 랜덤 정수 생성
 *
 * @param min - 최소값 (포함)
 * @param max - 최대값 (포함)
 * @returns 랜덤 정수
 *
 * @example
 * randomInt(1, 10); // 1-10 사이의 랜덤 정수
 * randomInt(0, 100); // 0-100 사이의 랜덤 정수
 */
export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 범위 내 랜덤 실수 생성
 *
 * @param min - 최소값
 * @param max - 최대값
 * @returns 랜덤 실수
 *
 * @example
 * randomFloat(0, 1); // 0-1 사이의 랜덤 실수
 * randomFloat(1.5, 2.5); // 1.5-2.5 사이의 랜덤 실수
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * 암호학적으로 안전한 랜덤 정수 생성
 *
 * @description
 * rejection sampling을 사용하여 모듈로 편향을 제거하고 균일 분포 보장
 *
 * @param min - 최소값 (포함)
 * @param max - 최대값 (포함)
 * @returns 암호학적으로 안전한 랜덤 정수
 * @throws {Error} 범위가 유효하지 않은 경우
 *
 * @example
 * secureRandomInt(100000, 999999); // 6자리 랜덤 정수
 * secureRandomInt(1, 10); // 1-10 사이의 랜덤 정수
 */
export function secureRandomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error('secureRandomInt() requires min <= max');
  }

  const range = max - min + 1;
  const array = new Uint32Array(1);

  // Rejection sampling to avoid modulo bias
  // Only accept values that fall within the largest multiple of range
  // that fits in Uint32 range
  const maxUint32 = 0xffffffff;
  const maxValid = maxUint32 - (maxUint32 % range);

  let value;
  do {
    crypto.getRandomValues(array);
    value = array[0];
  } while (value > maxValid);

  return (value % range) + min;
}

/**
 * 배열에서 랜덤 요소 선택
 *
 * @param array - 배열
 * @returns 랜덤 요소
 * @throws {Error} 빈 배열인 경우
 *
 * @example
 * randomItem(['a', 'b', 'c']); // 'a', 'b', 또는 'c'
 */
export function randomItem<T>(array: T[]): T {
  if (array.length === 0) throw new Error('randomItem() requires non-empty array');
  return array[Math.floor(Math.random() * array.length)];
}

// ============================================================================
// MATH OPERATIONS
// ============================================================================

/**
 * 합계 계산
 *
 * @param values - 숫자 배열
 * @returns 합계
 *
 * @example
 * sum([1, 2, 3, 4, 5]); // 15
 * sum([10, 20, 30]); // 60
 */
export function sum(...values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0);
}

/**
 * 평균 계산
 *
 * @param values - 숫자 배열
 * @returns 평균
 * @throws {Error} 빈 배열인 경우
 *
 * @example
 * average([1, 2, 3, 4, 5]); // 3
 * average([10, 20, 30]); // 20
 */
export function average(...values: number[]): number {
  if (values.length === 0) throw new Error('average() requires at least one value');
  return sum(...values) / values.length;
}

/**
 * 중간값 계산
 *
 * @param values - 숫자 배열
 * @returns 중간값
 * @throws {Error} 빈 배열인 경우
 *
 * @example
 * median([1, 2, 3, 4, 5]); // 3
 * median([1, 2, 3, 4]); // 2.5
 */
export function median(...values: number[]): number {
  if (values.length === 0) throw new Error('median() requires at least one value');
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

/**
 * 최빈값 계산
 *
 * @param values - 숫자 배열
 * @returns 최빈값 배열
 * @throws {Error} 빈 배열인 경우
 *
 * @example
 * mode([1, 2, 2, 3, 3, 3]); // [3]
 * mode([1, 1, 2, 2]); // [1, 2]
 */
export function mode(...values: number[]): number[] {
  if (values.length === 0) throw new Error('mode() requires at least one value');

  const frequency = new Map<number, number>();
  for (const value of values) {
    frequency.set(value, (frequency.get(value) || 0) + 1);
  }

  const maxFrequency = Math.max(...frequency.values());
  const modes = [...frequency.entries()].filter(([_, count]) => count === maxFrequency).map(([value]) => value);

  return modes.sort((a, b) => a - b);
}

/**
 * 표준편차 계산
 *
 * @param values - 숫자 배열
 * @returns 표준편차
 * @throws {Error} 빈 배열인 경우
 *
 * @example
 * stdDev([2, 4, 4, 4, 5, 5, 7, 9]); // 2
 */
export function stdDev(...values: number[]): number {
  if (values.length === 0) throw new Error('stdDev() requires at least one value');
  const avg = average(...values);
  const squareDiffs = values.map((value) => Math.pow(value - avg, 2));
  const avgSquareDiff = average(...squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

/**
 * 분산 계산
 *
 * @param values - 숫자 배열
 * @returns 분산
 * @throws {Error} 빈 배열인 경우
 */
export function variance(...values: number[]): number {
  const std = stdDev(...values);
  return std * std;
}

/**
 * 퍼센타일 계산
 *
 * @param values - 숫자 배열
 * @param percentile - 퍼센타일 (0-100)
 * @returns 퍼센타일 값
 * @throws {Error} 빈 배열이거나 잘못된 퍼센타일인 경우
 *
 * @example
 * percentile([1, 2, 3, 4, 5], 50); // 3 (중간값)
 * percentile([1, 2, 3, 4, 5], 90); // 5
 */
export function percentile(values: number[], percentile: number): number {
  if (values.length === 0) throw new Error('percentile() requires at least one value');
  if (percentile < 0 || percentile > 100) {
    throw new Error('percentile must be between 0 and 100');
  }

  const sorted = [...values].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);

  if (Number.isInteger(index)) {
    return sorted[index];
  }

  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

// ============================================================================
// NUMBER THEORY
// ============================================================================

/**
 * 최대공약수 (GCD) 계산
 *
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 최대공약수
 *
 * @example
 * gcd(48, 18); // 6
 * gcd(17, 23); // 1
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * 최소공배수 (LCM) 계산
 *
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 최소공배수
 *
 * @example
 * lcm(4, 6); // 12
 * lcm(5, 7); // 35
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a * b) / gcd(a, b));
}

/**
 * 제곱 계산
 *
 * @param base - 밑
 * @param exponent - 지수
 * @returns 제곱값
 *
 * @example
 * power(2, 3); // 8
 * power(5, 2); // 25
 */
export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

/**
 * 제곱근 계산
 *
 * @param value - 값
 * @returns 제곱근
 *
 * @example
 * sqrt(16); // 4
 * sqrt(2); // 1.414...
 */
export function sqrt(value: number): number {
  if (value < 0) throw new Error('sqrt() requires non-negative value');
  return Math.sqrt(value);
}

/**
 * 절대값 계산
 *
 * @param value - 값
 * @returns 절대값
 */
export function abs(value: number): number {
  return Math.abs(value);
}

/**
 * 부호 반환
 *
 * @param value - 값
 * @returns -1, 0, 또는 1
 *
 * @example
 * sign(-10); // -1
 * sign(0); // 0
 * sign(10); // 1
 */
export function sign(value: number): number {
  return Math.sign(value);
}

// ============================================================================
// INTERPOLATION & MAPPING
// ============================================================================

/**
 * 값을 한 범위에서 다른 범위로 매핑
 *
 * @param value - 매핑할 값
 * @param inMin - 입력 범위 최소값
 * @param inMax - 입력 범위 최대값
 * @param outMin - 출력 범위 최소값
 * @param outMax - 출력 범위 최대값
 * @returns 매핑된 값
 * @throws {Error} 입력 범위가 유효하지 않은 경우 (inMin === inMax)
 *
 * @example
 * map(5, 0, 10, 0, 100); // 50
 * map(0.5, 0, 1, 0, 255); // 127.5
 */
export function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  if (inMin === inMax) {
    throw new Error('map() requires inMin and inMax to be different values');
  }
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * 선형 보간
 *
 * @param start - 시작값
 * @param end - 끝값
 * @param t - 보간 비율 (0-1)
 * @returns 보간된 값
 *
 * @example
 * lerp(0, 100, 0.5); // 50
 * lerp(10, 20, 0.3); // 13
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * 값 정규화 (0-1 범위로)
 *
 * @param value - 정규화할 값
 * @param min - 최소값
 * @param max - 최대값
 * @returns 정규화된 값
 * @throws {Error} 범위가 유효하지 않은 경우 (min === max)
 *
 * @example
 * normalize(50, 0, 100); // 0.5
 * normalize(75, 0, 100); // 0.75
 */
export function normalize(value: number, min: number, max: number): number {
  if (min === max) {
    throw new Error('normalize() requires min and max to be different values');
  }
  return (value - min) / (max - min);
}

// ============================================================================
// UTILITY
// ============================================================================

/**
 * 숫자 배열의 범위 (최대값 - 최소값) 계산
 *
 * @param values - 숫자 배열
 * @returns 범위
 * @throws {Error} 빈 배열인 경우
 *
 * @example
 * range([1, 2, 3, 4, 5]); // 4
 * range([10, 20, 30]); // 20
 */
export function range(...values: number[]): number {
  if (values.length === 0) throw new Error('range() requires at least one value');
  return max(...values) - min(...values);
}

/**
 * 값 나누기 (안전하게 0으로 나누기 처리)
 *
 * @param dividend - 피제수
 * @param divisor - 제수
 * @param defaultValue - 0으로 나눌 때 반환할 기본값 (기본: 0)
 * @returns 나눗셈 결과
 *
 * @example
 * safeDivide(10, 2); // 5
 * safeDivide(10, 0); // 0
 * safeDivide(10, 0, Infinity); // Infinity
 */
export function safeDivide(dividend: number, divisor: number, defaultValue: number = 0): number {
  return divisor === 0 ? defaultValue : dividend / divisor;
}

/**
 * 비율 계산
 *
 * @param value - 값
 * @param total - 전체
 * @returns 비율 (0-1)
 *
 * @example
 * ratio(25, 100); // 0.25
 * ratio(1, 4); // 0.25
 */
export function ratio(value: number, total: number): number {
  return safeDivide(value, total, 0);
}

/**
 * 퍼센트 계산
 *
 * @param value - 값
 * @param total - 전체
 * @returns 퍼센트 (0-100)
 *
 * @example
 * percent(25, 100); // 25
 * percent(1, 4); // 25
 */
export function percent(value: number, total: number): number {
  return ratio(value, total) * 100;
}

/**
 * 숫자를 지정된 간격으로 반올림
 *
 * @param value - 반올림할 값
 * @param interval - 간격
 * @returns 반올림된 값
 *
 * @example
 * snapToGrid(47, 10); // 50
 * snapToGrid(43, 10); // 40
 * snapToGrid(45, 10); // 50
 */
export function snapToGrid(value: number, interval: number): number {
  return Math.round(value / interval) * interval;
}

/**
 * 팩토리얼 계산
 *
 * @param n - 숫자
 * @returns 팩토리얼
 * @throws {Error} 음수인 경우
 *
 * @example
 * factorial(5); // 120
 * factorial(0); // 1
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('factorial() requires non-negative value');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * 피보나치 수열의 n번째 값 계산
 *
 * @param n - 인덱스 (0-based)
 * @returns 피보나치 수
 * @throws {Error} 음수인 경우
 *
 * @example
 * fibonacci(0); // 0
 * fibonacci(1); // 1
 * fibonacci(10); // 55
 */
export function fibonacci(n: number): number {
  if (n < 0) throw new Error('fibonacci() requires non-negative value');
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

/**
 * 숫자가 소수인지 확인
 *
 * @param n - 확인할 숫자
 * @returns 소수이면 true
 *
 * @example
 * isPrime(2); // true
 * isPrime(17); // true
 * isPrime(1); // false
 * isPrime(15); // false
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  let i = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}
