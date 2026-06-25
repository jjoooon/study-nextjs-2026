/**
 * String Utilities
 *
 * @description
 * 문자열 처리를 위한 유틸리티 함수
 * - 포맷팅, 변환, 검증, 조작
 * - 한국어 문자열 지원
 * - 타입 안전한 문자열 처리
 *
 * @usage
 * import {
 *   capitalize,
 *   truncate,
 *   camelToKebab,
 *   kebabToCamel,
 *   slugify,
 *   maskEmail,
 *   maskPhone,
 *   formatNumber,
 *   formatBytes,
 *   secureShortId
 * } from '@/shared/utils/stringUtils';
 *
 * // 대문자 변환
 * capitalize('hello'); // 'Hello'
 *
 * // 문자열 자르기
 * truncate('This is a long text', 10); // 'This is a...'
 *
 * // 케이스 변환
 * camelToKebab('fooBar'); // 'foo-bar'
 * kebabToCamel('foo-bar'); // 'fooBar'
 *
 * // 마스킹
 * maskEmail('user@example.com'); // 'u***@example.com'
 * maskPhone('01012345678'); // '010-****-5678'
 *
 * // 보안 ID 생성
 * secureShortId(); // 'a7K9m2P4x8Q3r1T5'
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * 문자열 입력 가능 타입
 */
type StringInput = string | null | undefined;

/**
 * 트렁크케이트 옵션
 */
type TruncateOptions = {
  length: number;
  suffix?: string;
  preserveWord?: boolean;
};

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * 빈 문자열 확인 (null, undefined, whitespace 포함)
 *
 * @param str - 확인할 문자열
 * @returns 비어있으면 true
 *
 * @example
 * isEmpty(''); // true
 * isEmpty('   '); // true
 * isEmpty(null); // true
 * isEmpty('hello'); // false
 */
export function isEmpty(str: StringInput): boolean {
  if (str == null) return true;
  return str.trim().length === 0;
}

/**
 * 비어있지 않은 문자열 확인
 *
 * @param str - 확인할 문자열
 * @returns 비어있지 않으면 true
 */
export function isNotEmpty(str: StringInput): boolean {
  return !isEmpty(str);
}

/**
 * 이메일 형식 확인
 *
 * @param str - 확인할 문자열
 * @returns 이메일 형식이면 true
 */
export function isEmail(str: StringInput): boolean {
  if (isEmpty(str)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str!);
}

/**
 * URL 형식 확인
 *
 * @param str - 확인할 문자열
 * @returns URL 형식이면 true
 */
export function isUrl(str: StringInput): boolean {
  if (isEmpty(str)) return false;
  try {
    new URL(str!);
    return true;
  } catch {
    return false;
  }
}

/**
 * 전화번호 형식 확인 (한국)
 *
 * @param str - 확인할 문자열
 * @returns 전화번호 형식이면 true
 */
export function isPhone(str: StringInput): boolean {
  if (isEmpty(str)) return false;
  const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
  return phoneRegex.test(str!);
}

/**
 * 숫자만 포함되어 있는지 확인
 *
 * @param str - 확인할 문자열
 * @returns 숫자만 있으면 true
 */
export function isNumeric(str: StringInput): boolean {
  if (isEmpty(str)) return false;
  return /^\d+$/.test(str!);
}

/**
 * 영문자만 포함되어 있는지 확인
 *
 * @param str - 확인할 문자열
 * @returns 영문자만 있으면 true
 */
export function isAlpha(str: StringInput): boolean {
  if (isEmpty(str)) return false;
  return /^[a-zA-Z]+$/.test(str!);
}

/**
 * 영문자와 숫자만 포함되어 있는지 확인
 *
 * @param str - 확인할 문자열
 * @returns 영문자와 숫자만 있으면 true
 */
export function isAlphanumeric(str: StringInput): boolean {
  if (isEmpty(str)) return false;
  return /^[a-zA-Z0-9]+$/.test(str!);
}

/**
 * 한글 포함 여부 확인
 *
 * @param str - 확인할 문자열
 * @param only - true면 한글만 있는지, false면 한글이 하나라도 있는지 확인 (기본: false)
 * @returns 한글이 포함되어 있으면 true
 *
 * @example
 * isKorean('안녕하세요'); // true
 * isKorean('hello 세계'); // true
 * isKorean('hello'); // false
 * isKorean('안녕하세요', true); // true (한글만)
 * isKorean('hello 세계', true); // false (한글 외 문자 포함)
 */
export function isKorean(str: StringInput, only: boolean = false): boolean {
  if (isEmpty(str)) return false;
  // U+1100-11FF: 한글 자모, U+3130-318F: 호환 자모, U+A960-A97F: 자모 확장A, U+AC00-D7A3: 완성형 음절, U+D7B0-D7FF: 자모 확장B
  const p = '\\u1100-\\u11FF\\u3130-\\u318F\\uA960-\\uA97F\\uAC00-\\uD7A3\\uD7B0-\\uD7FF';
  if (only) return new RegExp(`^[${p}\\s]+$`).test(str!);
  return new RegExp(`[${p}]`).test(str!);
}

// ============================================================================
// TRANSFORMATION
// ============================================================================

/**
 * 첫 글자를 대문자로 변환
 *
 * @param str - 변환할 문자열
 * @returns 첫 글자가 대문자인 문자열
 *
 * @example
 * capitalize('hello'); // 'Hello'
 * capitalize('hello world'); // 'Hello world'
 * capitalize(''); // ''
 */
export function capitalize(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.charAt(0).toUpperCase() + str!.slice(1);
}

/**
 * 모든 단어의 첫 글자를 대문자로 변환
 *
 * @param str - 변환할 문자열
 * @returns 각 단어의 첫 글자가 대문자인 문자열
 *
 * @example
 * capitalizeWords('hello world'); // 'Hello World'
 * capitalizeWords('foo bar baz'); // 'Foo Bar Baz'
 */
export function capitalizeWords(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * 전체를 대문자로 변환
 *
 * @param str - 변환할 문자열
 * @returns 대문자 문자열
 */
export function upper(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.toUpperCase();
}

/**
 * 전체를 소문자로 변환
 *
 * @param str - 변환할 문자열
 * @returns 소문자 문자열
 */
export function lower(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.toLowerCase();
}

/**
 * 첫 글자를 소문자로 변환
 *
 * @param str - 변환할 문자열
 * @returns 첫 글자가 소문자인 문자열
 *
 * @example
 * uncapitalize('Hello'); // 'hello'
 * uncapitalize('Hello World'); // 'hello World'
 */
export function uncapitalize(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.charAt(0).toLowerCase() + str!.slice(1);
}

// ============================================================================
// CASE CONVERSION
// ============================================================================

/**
 * camelCase를 kebab-case로 변환
 *
 * @param str - camelCase 문자열
 * @returns kebab-case 문자열
 *
 * @example
 * camelToKebab('fooBar'); // 'foo-bar'
 * camelToKebab('fooBarBaz'); // 'foo-bar-baz'
 * camelToKebab('HTTPServer'); // 'http-server'
 */
export function camelToKebab(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * kebab-case를 camelCase로 변환
 *
 * @param str - kebab-case 문자열
 * @returns camelCase 문자열
 *
 * @example
 * kebabToCamel('foo-bar'); // 'fooBar'
 * kebabToCamel('foo-bar-baz'); // 'fooBarBaz'
 */
export function kebabToCamel(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * camelCase를 snake_case로 변환
 *
 * @param str - camelCase 문자열
 * @returns snake_case 문자열
 *
 * @example
 * camelToSnake('fooBar'); // 'foo_bar'
 * camelToSnake('fooBarBaz'); // 'foo_bar_baz'
 */
export function camelToSnake(str: StringInput): string {
  if (isEmpty(str)) return '';
  return camelToKebab(str).replace(/-/g, '_');
}

/**
 * snake_case를 camelCase로 변환
 *
 * @param str - snake_case 문자열
 * @returns camelCase 문자열
 *
 * @example
 * snakeToCamel('foo_bar'); // 'fooBar'
 * snakeToCamel('foo_bar_baz'); // 'fooBarBaz'
 */
export function snakeToCamel(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * camelCase를 PascalCase로 변환
 *
 * @param str - camelCase 문자열
 * @returns PascalCase 문자열
 *
 * @example
 * camelToPascal('fooBar'); // 'FooBar'
 * camelToPascal('fooBarBaz'); // 'FooBarBaz'
 */
export function camelToPascal(str: StringInput): string {
  if (isEmpty(str)) return '';
  return capitalize(str!);
}

/**
 * PascalCase를 camelCase로 변환
 *
 * @param str - PascalCase 문자열
 * @returns camelCase 문자열
 *
 * @example
 * pascalToCamel('FooBar'); // 'fooBar'
 * pascalToCamel('FooBarBaz'); // 'fooBarBaz'
 */
export function pascalToCamel(str: StringInput): string {
  if (isEmpty(str)) return '';
  return uncapitalize(str!);
}

// ============================================================================
// TRUNCATION
// ============================================================================

/**
 * 문자열 자르기
 *
 * @param str - 자를 문자열
 * @param options - 자르기 옵션
 * @returns 자른 문자열
 *
 * @example
 * truncate('This is a long text', 10); // 'This is a...'
 * truncate('Hello world', 5, { suffix: '…' }); // 'Hello…'
 * truncate('Hello world', 8, { preserveWord: true }); // 'Hello…'
 */
export function truncate(str: StringInput, length: number, options?: Partial<TruncateOptions>): string {
  if (isEmpty(str)) return '';
  if (str!.length <= length) return str!;

  const opts: TruncateOptions = {
    length,
    suffix: '...',
    preserveWord: false,
    ...options,
  };

  let result = str!.slice(0, opts.length);

  if (opts.preserveWord) {
    const lastSpaceIndex = result.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      result = result.slice(0, lastSpaceIndex);
    }
  }

  return result + opts.suffix;
}

/**
 * 문자열 자르기 (간편 버전)
 *
 * @param str - 자를 문자열
 * @param length - 최대 길이
 * @returns 자른 문자열 (기본 접미사: '...')
 */
export function ellipsis(str: StringInput, length: number): string {
  return truncate(str, length);
}

// ============================================================================
// CLEANING
// ============================================================================

/**
 * 앞뒤 공백 제거
 *
 * @param str - 정리할 문자열
 * @returns 공백이 제거된 문자열
 */
export function trim(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.trim();
}

/**
 * 모든 공백 제거
 *
 * @param str - 정리할 문자열
 * @returns 공백이 없는 문자열
 *
 * @example
 * removeWhitespace('hello   world'); // 'helloworld'
 * removeWhitespace('  foo  bar  '); // 'foobar'
 */
export function removeWhitespace(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.replace(/\s+/g, '');
}

/**
 * 연속된 공백을 단일 공백으로 변환
 *
 * @param str - 정리할 문자열
 * @returns 정규화된 문자열
 *
 * @example
 * normalizeWhitespace('hello   world'); // 'hello world'
 * normalizeWhitespace('  foo   bar  '); // 'foo bar'
 */
export function normalizeWhitespace(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.replace(/\s+/g, ' ').trim();
}

/**
 * 특수 문자 제거
 *
 * @param str - 정리할 문자열
 * @param keepSpaces - 공백 유지 여부 (기본: true)
 * @returns 특수 문자가 제거된 문자열
 *
 * @example
 * removeSpecialChars('Hello, World!'); // 'Hello World'
 * removeSpecialChars('Hello, World!', false); // 'HelloWorld'
 */
export function removeSpecialChars(str: StringInput, keepSpaces: boolean = true): string {
  if (isEmpty(str)) return '';
  const pattern = keepSpaces ? /[^a-zA-Z0-9\s가-힣]/g : /[^a-zA-Z0-9가-힣]/g;
  return str!.replace(pattern, '');
}

// ============================================================================
// SLUG & ID
// ============================================================================

/**
 * URL-safe 슬러그 생성
 *
 * @param str - 변환할 문자열
 * @returns URL-safe 슬러그
 *
 * @example
 * slugify('Hello World!'); // 'hello-world'
 * slugify('안녕하세요 세계'); // '안녕하세요-세계'
 * slugify('Foo @#$ Bar'); // 'foo-bar'
 */
export function slugify(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!
    .toLowerCase()
    .trim()
    .replace(/[^\w\s가-힣-]/g, '') // 특수 문자 제거 (하이픈 제외)
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .replace(/-+/g, '-') // 연속된 하이픈을 단일 하이픈으로
    .replace(/^-+|-+$/g, ''); // 앞뒤 하이픈 제거
}

/**
 * 고유 ID 생성 (UUID v4와 유사)
 *
 * @returns 고유 ID 문자열
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 짧은 고유 ID 생성
 *
 * @description
 * ⚠️ 보안 경고: 이 함수는 Math.random()을 사용하므로 암호학적으로 안전하지 않습니다.
 * 토큰, API 키, 세션 ID 등 보안이 중요한 용도로는 `secureShortId()`를 사용하세요.
 *
 * @param length - ID 길이 (기본: 8)
 * @returns 짧은 ID 문자열
 *
 * @example
 * shortId(); // 'a3b9c2d1'
 * shortId(12); // 'x7k2m9p4q3r1'
 */
export function shortId(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 암호학적으로 안전한 짧은 ID 생성
 *
 * @description
 * crypto.getRandomValues()를 사용하여 암호학적으로 안전한 난수를 생성합니다.
 * 토큰, API 키, 세션 ID 등 보안이 중요한 용도에 적합합니다.
 *
 * @param length - ID 길이 (기본: 16)
 * @returns 암호학적으로 안전한 짧은 ID 문자열
 *
 * @example
 * secureShortId(); // 'a7K9m2P4x8Q3r1T5'
 * secureShortId(24); // 'x7K2m9P4q3R1s5T8u2V4w6Y1'
 */
export function secureShortId(length: number = 16): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

// ============================================================================
// MASKING & PRIVACY
// ============================================================================

/**
 * 이메일 마스킹
 *
 * @param email - 이메일 주소
 * @param visibleChars - 보여줄 앞 글자 수 (기본: 1)
 * @returns 마스킹된 이메일
 *
 * @example
 * maskEmail('user@example.com'); // 'u***@example.com'
 * maskEmail('john.doe@example.com', 2); // 'jo***@example.com'
 */
export function maskEmail(email: StringInput, visibleChars: number = 1): string {
  if (isEmpty(email) || !isEmail(email)) return '';
  const [local, domain] = email!.split('@');
  const visiblePart = local.slice(0, visibleChars);
  const maskedPart = '*'.repeat(Math.max(3, local.length - visibleChars));
  return `${visiblePart}${maskedPart}@${domain}`;
}

/**
 * 전화번호 마스킹
 *
 * @param phone - 전화번호
 * @param maskMiddle - 가운데 마스킹 여부 (기본: true)
 * @returns 마스킹된 전화번호
 *
 * @example
 * maskPhone('01012345678'); // '010-****-5678'
 * maskPhone('010-0000-0000'); // '010-****-5678'
 * maskPhone('01012345678', false); // '01012345678' (마스킹 없이 원본 반환)
 * maskPhone('0212345678'); // '02-****-5678' (서울 지역번호)
 */
export function maskPhone(phone: StringInput, maskMiddle: boolean = true): string {
  if (isEmpty(phone)) return '';
  const cleaned = phone!.replace(/[^0-9]/g, '');

  if (cleaned.length < 9) return phone!;

  if (maskMiddle) {
    if (cleaned.length === 9) {
      // 010-123-4567
      return `${cleaned.slice(0, 3)}-***-${cleaned.slice(6)}`;
    } else if (cleaned.length === 10) {
      // 010-0000-0000 or 02-0000-0000
      const firstPart = cleaned.slice(0, 3);
      const isSeoul = firstPart === '02';
      if (isSeoul) {
        return `${cleaned.slice(0, 2)}-****-${cleaned.slice(6)}`;
      }
      return `${cleaned.slice(0, 3)}-****-${cleaned.slice(7)}`;
    } else if (cleaned.length === 11) {
      // 010-0000-0000
      return `${cleaned.slice(0, 3)}-****-${cleaned.slice(7)}`;
    }
  }

  return phone!;
}

/**
 * 이름 마스킹
 *
 * @param name - 이름
 * @returns 마스킹된 이름
 *
 * @example
 * maskName('홍길동'); // '홍*'
 * maskName('김철수'); // '김*'
 */
export function maskName(name: StringInput): string {
  if (isEmpty(name)) return '';
  const firstChar = name!.charAt(0);
  const maskedLength = Math.max(1, name!.length - 1);
  return firstChar + '*'.repeat(maskedLength);
}

/**
 * 카드 번호 마스킹
 *
 * @param cardNumber - 카드 번호
 * @returns 마스킹된 카드 번호
 *
 * @example
 * maskCardNumber('1234567890123456'); // '1234-****-****-3456'
 * maskCardNumber('0000-0000-9012-3456'); // '1234-****-****-3456'
 */
export function maskCardNumber(cardNumber: StringInput): string {
  if (isEmpty(cardNumber)) return '';
  const cleaned = cardNumber!.replace(/[^0-9]/g, '');

  if (cleaned.length < 13) return cardNumber!;

  const groups = cleaned.match(/(\d{4})(\d{4})(\d{4})(\d{4})/);
  if (groups) {
    return `${groups[1]}-****-****-${groups[4]}`;
  }

  return cardNumber!;
}

// ============================================================================
// SEARCH & MATCH
// ============================================================================

/**
 * 부분 일치 확인 (대소문자 무시)
 *
 * @param str - 검색할 문자열
 * @param search - 찾을 문자열
 * @returns 일치하면 true
 */
export function includes(str: StringInput, search: StringInput): boolean {
  if (isEmpty(str) || isEmpty(search)) return false;
  return str!.toLowerCase().includes(search!.toLowerCase());
}

/**
 * 문자열로 시작하는지 확인 (대소문자 무시)
 *
 * @param str - 검색할 문자열
 * @param search - 찾을 접두사
 * @returns 시작하면 true
 */
export function startsWith(str: StringInput, search: StringInput): boolean {
  if (isEmpty(str) || isEmpty(search)) return false;
  return str!.toLowerCase().startsWith(search!.toLowerCase());
}

/**
 * 문자열로 끝나는지 확인 (대소문자 무시)
 *
 * @param str - 검색할 문자열
 * @param search - 찾을 접미사
 * @returns 끝나면 true
 */
export function endsWith(str: StringInput, search: StringInput): boolean {
  if (isEmpty(str) || isEmpty(search)) return false;
  return str!.toLowerCase().endsWith(search!.toLowerCase());
}

/**
 * 하이라이트 추가
 *
 * @description
 * HTML 이스케이프 후 하이라이트를 적용하여 XSS 방지
 *
 * @param str - 원본 문자열
 * @param search - 찾을 문자열
 * @param tagName - 태그 이름 (기본: 'mark')
 * @returns 하이라이트가 추가된 HTML 문자열
 *
 * @example
 * highlight('Hello world', 'world'); // 'Hello <mark>world</mark>'
 * highlight('Hello world', 'world', 'span'); // 'Hello <span>world</span>'
 * highlight('<script>alert("xss")</script>', 'script'); // '&lt;script&gt;alert("xss")&lt;/script&gt;'
 *
 * @security
 * HTML 이스케이프를 수행하므로 안전하게 사용 가능
 */
export function highlight(str: StringInput, search: StringInput, tagName: string = 'mark'): string {
  if (isEmpty(str) || isEmpty(search)) return str || '';

  // HTML 이스케이프 (XSS 방지)
  const htmlEscape = (text: string): string => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return text.replace(/[&<>"']/g, (char) => escapeMap[char]);
  };

  const escapedStr = htmlEscape(str!);
  const escapedSearch = htmlEscape(search!);

  const regex = new RegExp(`(${escapedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

  return escapedStr.replace(regex, `<${tagName}>$1</${tagName}>`);
}

// ============================================================================
// PADDING
// ============================================================================

/**
 * 왼쪽 패딩
 *
 * @param str - 패딩할 문자열
 * @param length - 목표 길이
 * @param char - 패딩 문자 (기본: ' ')
 * @returns 패딩된 문자열
 *
 * @example
 * padLeft('5', 2, '0'); // '05'
 * padLeft('123', 5, '0'); // '00123'
 */
export function padLeft(str: StringInput, length: number, char: string = ' '): string {
  if (isEmpty(str)) return char.repeat(length);
  return str!.padStart(length, char);
}

/**
 * 오른쪽 패딩
 *
 * @param str - 패딩할 문자열
 * @param length - 목표 길이
 * @param char - 패딩 문자 (기본: ' ')
 * @returns 패딩된 문자열
 *
 * @example
 * padRight('5', 3, '0'); // '500'
 * padRight('abc', 5, '-'); // 'abc--'
 */
export function padRight(str: StringInput, length: number, char: string = ' '): string {
  if (isEmpty(str)) return char.repeat(length);
  return str!.padEnd(length, char);
}

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

/**
 * 숫자 포맷 (천 단위 콤마)
 *
 * @param num - 숫자 또는 숫자 문자열
 * @returns 포맷된 문자열
 *
 * @example
 * formatNumber(1000); // '1,000'
 * formatNumber(1234567.89); // '1,234,567.89'
 * formatNumber('1000000'); // '1,000,000'
 */
export function formatNumber(num: number | string): string {
  const parsed = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(parsed)) return '0';
  return parsed.toLocaleString('ko-KR');
}

/**
 * 파일 크기 포맷
 *
 * @param bytes - 바이트 수
 * @param decimals - 소수점 자릿수 (기본: 2)
 * @returns 포맷된 문자열
 *
 * @example
 * formatBytes(0); // '0 Bytes'
 * formatBytes(1024); // '1 KB'
 * formatBytes(1048576); // '1 MB'
 * formatBytes(1073741824); // '1 GB'
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * 통화 포맷 (한국 원)
 *
 * @param amount - 금액
 * @returns 포맷된 문자열
 *
 * @example
 * formatCurrency(10000); // '₩10,000'
 * formatCurrency(1234567); // '₩1,234,567'
 */
export function formatCurrency(amount: number): string {
  return `₩${formatNumber(amount)}`;
}

/**
 * 퍼센트 포맷
 *
 * @param value - 값 (0-1 또는 0-100)
 * @param isDecimal - 소수값 여부 (기본: true)
 * @param decimals - 소수점 자릿수 (기본: 1)
 * @returns 포맷된 문자열
 *
 * @example
 * formatPercent(0.1234); // '12.3%'
 * formatPercent(12.34, false); // '12.3%'
 * formatPercent(0.5, true, 0); // '50%'
 */
export function formatPercent(value: number, isDecimal: boolean = true, decimals: number = 1): string {
  const percent = isDecimal ? value * 100 : value;
  return `${percent.toFixed(decimals)}%`;
}

// ============================================================================
// STRING OPERATIONS
// ============================================================================

/**
 * 문자열 반복
 *
 * @param str - 반복할 문자열
 * @param count - 횟수
 * @returns 반복된 문자열
 *
 * @example
 * repeat('a', 3); // 'aaa'
 * repeat('ab', 2); // 'abab'
 */
export function repeat(str: StringInput, count: number): string {
  if (isEmpty(str) || count <= 0) return '';
  return str!.repeat(count);
}

/**
 * 문자열 역순
 *
 * @param str - 뒤집을 문자열
 * @returns 역순 문자열
 *
 * @example
 * reverse('hello'); // 'olleh'
 * reverse('안녕'); // '녕안'
 */
export function reverse(str: StringInput): string {
  if (isEmpty(str)) return '';
  return str!.split('').reverse().join('');
}

/**
 * 첫 번째 문자 가져오기
 *
 * @param str - 문자열
 * @param fallback - 대체 문자 (기본: '')
 * @returns 첫 번째 문자 또는 대체 문자
 */
export function first(str: StringInput, fallback: string = ''): string {
  if (isEmpty(str)) return fallback;
  return str!.charAt(0);
}

/**
 * 마지막 문자 가져오기
 *
 * @param str - 문자열
 * @param fallback - 대체 문자 (기본: '')
 * @returns 마지막 문자 또는 대체 문자
 */
export function last(str: StringInput, fallback: string = ''): string {
  if (isEmpty(str)) return fallback;
  return str!.charAt(str!.length - 1);
}

// ============================================================================
// TEMPLATE
// ============================================================================

/**
 * 템플릿 문자열 치환
 *
 * @param template - 템플릿 문자열
 * @param values - 치환 값 객체
 * @returns 치환된 문자열
 *
 * @example
 * template('Hello {{name}}!', { name: 'World' }); // 'Hello World!'
 * template('{{greeting}}, {{name}}!', { greeting: 'Hi', name: 'John' }); // 'Hi, John!'
 */
export function template(str: StringInput, values: Record<string, string | number>): string {
  if (isEmpty(str)) return '';
  return str!.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return values[key]?.toString() ?? '';
  });
}

/**
 * 초기화 생성 (이름, 이메일 등에서)
 *
 * @param str - 문자열
 * @param length - 초기화 길이 (기본: 2)
 * @returns 초기화 문자열
 *
 * @example
 * initials('John Doe'); // 'JD'
 * initials('홍길동'); // '홍길'
 * initials('Alice Bob Carol', 1); // 'A'
 */
export function initials(str: StringInput, length: number = 2): string {
  if (isEmpty(str)) return '';
  const words = str!.trim().split(/\s+/);
  const result = words.map((word) => word.charAt(0).toUpperCase()).join('');
  return result.slice(0, length);
}
