/**
 * Shared Common Zod Schemas
 *
 * @description
 * 자주 사용되는 Zod 스키마 패턴들
 * 재사용 가능한 기본 필드 스키마 제공
 *
 * @usage
 * ```typescript
 * import { baseFieldSchemas } from '@/shared/utils/validation/commonSchemas';
 * import { z } from 'zod';
 *
 * const productSchema = z.object({
 *   name: baseFieldSchemas.requiredString('제품명', 1, 100),
 *   price: baseFieldSchemas.positiveNumber('가격'),
 *   email: baseFieldSchemas.email('이메일'),
 * });
 * ```
 */

import { z } from 'zod';

// ============================================================================
// KOREAN POSTPOSITION HELPER
// ============================================================================

/**
 * 한국어 마지막 글자의 받침 여부 확인
 */
const hasBatchim = (str: string): boolean => {
  const lastChar = str[str.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
};

/**
 * 필드명에 적절한 조사를 붙여 반환
 *
 * @param fieldName - 필드명
 * @param type - '은는' | '을를' | '이가'
 */
const josa = (fieldName: string, type: '은는' | '을를' | '이가'): string => {
  const hasB = hasBatchim(fieldName);
  if (type === '은는') return fieldName + (hasB ? '은' : '는');
  if (type === '을를') return fieldName + (hasB ? '을' : '를');
  return fieldName + (hasB ? '이' : '가');
};

// ============================================================================
// BASE FIELD SCHEMAS
// ============================================================================

/**
 * 기본 필드 스키마 팩토리
 *
 * @description
 * 자주 사용되는 필드 검증 스키마들
 */
export const baseFieldSchemas = {
  /**
   * 필수 문자열 필드
   *
   * @param fieldName - 필드 이름 (에러 메시지용)
   * @param minLength - 최소 길이 (기본: 1)
   * @param maxLength - 최대 길이 (기본: 100)
   * @returns Zod 스키마
   *
   * @example
   * name: baseFieldSchemas.requiredString('제품명', 1, 100)
   */
  requiredString: (fieldName: string, minLength: number = 1, maxLength: number = 100) =>
    z
      .string({ message: `${josa(fieldName, '은는')} 문자열이어야 합니다.` })
      .min(minLength, { message: `${josa(fieldName, '을를')} 입력해주세요.` })
      .max(maxLength, {
        message: `${josa(fieldName, '은는')} ${maxLength}자 이하여야 합니다.`,
      })
      .trim(),

  /**
   * 선택적 문자열 필드
   *
   * @param fieldName - 필드 이름
   * @param maxLength - 최대 길이 (기본: 100)
   * @returns Zod 스키마
   */
  optionalString: (fieldName: string, maxLength: number = 100) =>
    z
      .string()
      .max(maxLength, {
        message: `${josa(fieldName, '은는')} ${maxLength}자 이하여야 합니다.`,
      })
      .trim()
      .optional(),

  /**
   * 양수 필드
   *
   * @param fieldName - 필드 이름
   * @param min - 최소값 (기본: 0)
   * @param max - 최대값 (기본: Number.MAX_SAFE_INTEGER)
   * @returns Zod 스키마
   *
   * @example
   * price: baseFieldSchemas.positiveNumber('가격', 0, 999999999)
   */
  positiveNumber: (fieldName: string, min: number = 0, max: number = Number.MAX_SAFE_INTEGER) =>
    z
      .number({ message: `${josa(fieldName, '은는')} 숫자이어야 합니다.` })
      .min(min, { message: `${josa(fieldName, '은는')} ${min} 이상이어야 합니다.` })
      .max(max, { message: `${josa(fieldName, '이가')} 너무 큽니다.` }),

  /**
   * 선택적 숫자 필드
   *
   * @param fieldName - 필드 이름
   * @returns Zod 스키마
   */
  optionalNumber: (fieldName: string) =>
    z.number({ message: `${josa(fieldName, '은는')} 숫자이어야 합니다.` }).optional(),

  /**
   * 이메일 필드
   *
   * @param fieldName - 필드 이름
   * @returns Zod 스키마
   *
   * @example
   * email: baseFieldSchemas.email('이메일')
   */
  email: (fieldName: string = '이메일') =>
    z
      .string({ message: `${josa(fieldName, '은는')} 문자열이어야 합니다.` })
      .min(1, { message: `${josa(fieldName, '을를')} 입력해주세요.` })
      .email({ message: `올바른 ${fieldName} 형식이 아닙니다.` })
      .trim()
      .toLowerCase(),

  /**
   * URL 필드
   *
   * @param fieldName - 필드 이름
   * @returns Zod 스키마
   */
  url: (fieldName: string = 'URL') =>
    z
      .string({ message: `${josa(fieldName, '은는')} 문자열이어야 합니다.` })
      .url({ message: `올바른 ${fieldName} 형식이 아닙니다.` })
      .trim(),

  /**
   * 전화번호 필드
   *
   * @param fieldName - 필드 이름
   * @returns Zod 스키마
   */
  phoneNumber: (fieldName: string = '전화번호') =>
    z
      .string({ message: `${josa(fieldName, '은는')} 문자열이어야 합니다.` })
      .min(10, { message: `${josa(fieldName, '은는')} 10자 이상이어야 합니다.` })
      .max(15, { message: `${josa(fieldName, '은는')} 15자 이하여야 합니다.` })
      .regex(/^[\d-+\s()]+$/, { message: `올바른 ${fieldName} 형식이 아닙니다.` })
      .trim(),

  /**
   * 날짜 문자열 필드 (ISO 8601)
   *
   * @param fieldName - 필드 이름
   * @returns Zod 스키마
   */
  dateString: (fieldName: string = '날짜') =>
    z.string({ message: `${josa(fieldName, '은는')} 문자열이어야 합니다.` }).refine((val) => !isNaN(Date.parse(val)), {
      message: `올바른 ${fieldName} 형식이 아닙니다.`,
    }),

  /**
   * 상태 Enum 스키마 생성기
   *
   * @param statuses - 상태 값들
   * @param typeName - 타입 이름
   * @returns Zod Enum 스키마
   *
   * @example
   * status: baseFieldSchemas.statusEnum(
   *   ['active', 'inactive', 'archived'],
   *   '상태'
   * )
   */
  statusEnum: <T extends readonly [string, ...string[]]>(statuses: T, typeName: string = '상태') =>
    z.enum(statuses, { message: `유효하지 않은 ${typeName}입니다.` }),

  /**
   * 카테고리 Enum 스키마 생성기
   *
   * @param categories - 카테고리 값들
   * @returns Zod Enum 스키마
   */
  categoryEnum: <T extends readonly [string, ...string[]]>(categories: T) =>
    z.enum(categories, { message: '유효하지 않은 카테고리입니다.' }),

  /**
   * 설명/내용 필드 (긴 텍스트)
   *
   * @param fieldName - 필드 이름
   * @param maxLength - 최대 길이 (기본: 2000)
   * @returns Zod 스키마
   */
  description: (fieldName: string = '설명', maxLength: number = 2000) =>
    z
      .string({ message: `${josa(fieldName, '은는')} 문자열이어야 합니다.` })
      .min(1, { message: `${josa(fieldName, '을를')} 입력해주세요.` })
      .max(maxLength, { message: `${josa(fieldName, '은는')} ${maxLength}자 이하여야 합니다.` })
      .trim(),

  /**
   * 선택적 설명 필드
   *
   * @param fieldName - 필드 이름
   * @param maxLength - 최대 길이 (기본: 2000)
   * @returns Zod 스키마
   */
  optionalDescription: (fieldName: string = '설명', maxLength: number = 2000) =>
    z
      .string()
      .max(maxLength, { message: `${josa(fieldName, '은는')} ${maxLength}자 이하여야 합니다.` })
      .trim()
      .optional(),
};

// ============================================================================
// COMMON OBJECT SCHEMAS
// ============================================================================

/**
 * 페이지네이션 파라미터 스키마
 */
export const paginationParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

/**
 * 정렬 파라미터 스키마
 */
export const sortParamsSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * 검색 파라미터 스키마
 */
export const searchParamsSchema = z.object({
  search: z.string().trim().optional(),
});

// ============================================================================
// SCHEMA BUILDER HELPERS
// ============================================================================

/**
 * 생성 스키마 빌더
 *
 * @description
 * 필수 필드만 있는 생성 스키마를 쉽게 만들기 위한 헬퍼
 *
 * @example
 * const createUserSchema = buildCreateSchema({
 *   name: baseFieldSchemas.requiredString('이름'),
 *   email: baseFieldSchemas.email('이메일'),
 *   age: baseFieldSchemas.positiveNumber('나래'),
 * });
 */
export const buildCreateSchema = <T extends Record<string, z.ZodTypeAny>>(fields: T) => {
  return z.object(fields);
};

/**
 * 수정 스키마 빌더
 *
 * @description
 * 모든 필드가 선택적이며, 최소한 하나의 필드는 제공해야 하는 수정 스키마
 *
 * @example
 * const updateUserSchema = buildUpdateSchema({
 *   name: baseFieldSchemas.optionalString('이름'),
 *   email: baseFieldSchemas.email('이메일').optional(),
 *   age: baseFieldSchemas.optionalNumber('나래'),
 * });
 */
export const buildUpdateSchema = <T extends Record<string, z.ZodTypeAny>>(fields: T) => {
  return z.object(fields).refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: '최소한 하나의 필드는 수정해야 합니다.',
  });
};
