/**
 * Shared Zod Validation Helpers
 *
 * @description
 * Zod 검증과 관련된 헬퍼 함수들
 * 에러 변환, 검증 래퍼 등 제공
 *
 * @usage
 * ```typescript
 * import { zodToFieldErrors, validateSchema } from '@/shared/utils/validation/zodHelpers';
 * import { createProductSchema } from './mySchema';
 *
 * const result = validateSchema(createProductSchema, data);
 * if (!result.success) {
 *   const errors = zodToFieldErrors(result.error);
 *   console.log(errors); // { name: '이름을 입력해주세요.' }
 * }
 * ```
 */

import type { z } from 'zod';

// ============================================================================
// VALIDATION ERROR TYPES
// ============================================================================

/**
 * Zod 검증 에러 형식
 *
 * @description
 * Zod 검증 실패 시 반환되는 에러 형식
 */
export type ZodFieldError = {
  path: string[];
  message: string;
  code: string;
};

/**
 * 필드별 에러 맵
 *
 * @description
 * 필드 이름 → 에러 메시지 매핑
 */
export type FieldErrors = Record<string, string>;

/**
 * 폼 레벨 에러
 *
 * @description
 * 폼 전체에 적용되는 에러 (예: 서버 오류)
 */
export type FormError = string | null;

// ============================================================================
// ZOD ERROR CONVERSION
// ============================================================================

/**
 * Zod 에러를 필드별 에러 맵으로 변환
 *
 * @param error - Zod 검증 에러
 * @returns 필드별 에러 맵
 *
 * @example
 * ```typescript
 * try {
 *   createProductSchema.parse(data);
 * } catch (error) {
 *   const fieldErrors = zodToFieldErrors(error);
 *   // { name: '제품명을 입력해주세요.', price: '가격은 0보다 커야 합니다.' }
 * }
 * ```
 */
export function zodToFieldErrors(error: unknown): FieldErrors {
  if (!isZodError(error)) {
    return { _form: '알 수 없는 검증 에러가 발생했습니다.' };
  }

  const fieldErrors: FieldErrors = {};

  error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    fieldErrors[path] = issue.message;
  });

  // 첫 번째 에러를 폼 레벨 에러로도 설정
  if (error.issues.length > 0 && !fieldErrors._form) {
    fieldErrors._form = error.issues[0].message;
  }

  return fieldErrors;
}

/**
 * Zod 에러에서 첫 번째 에러 메시지 추출
 *
 * @param error - Zod 검증 에러
 * @returns 첫 번째 에러 메시지
 */
export function getFirstZodErrorMessage(error: unknown): string {
  if (!isZodError(error)) {
    return '알 수 없는 오류가 발생했습니다.';
  }

  return error.issues[0]?.message || '검증에 실패했습니다.';
}

/**
 * Zod 에러인지 확인
 *
 * @param error - 확인할 에러 객체
 * @returns Zod 에러 여부
 */
function isZodError(error: unknown): error is z.ZodError {
  return typeof error === 'object' && error !== null && 'issues' in error && Array.isArray(error.issues);
}

// ============================================================================
// VALIDATION WRAPPERS
// ============================================================================

/**
 * 스키마 검증 래퍼
 *
 * @param schema - Zod 스키마
 * @param data - 검증할 데이터
 * @returns 검증 결과
 *
 * @example
 * ```typescript
 * const result = validateSchema(createProductSchema, formData);
 * if (!result.success) {
 *   console.log(result.errors); // FieldErrors
 * } else {
 *   console.log(result.data); // 검증된 데이터
 * }
 * ```
 */
export function validateSchema<T extends z.ZodType>(
  schema: T,
  data: unknown
):
  | { success: true; data: z.infer<T> }
  | { success: false; error: z.ZodError; fieldErrors: FieldErrors; formError: string } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors = zodToFieldErrors(result.error);
  const formError = getFirstZodErrorMessage(result.error);

  return {
    success: false,
    error: result.error,
    fieldErrors,
    formError,
  };
}

/**
 * 비동기 스키마 검증 래퍼
 *
 * @param schema - Zod 스키마
 * @param data - 검증할 데이터
 * @returns 검증 결과 Promise
 */
export async function validateSchemaAsync<T extends z.ZodType>(
  schema: T,
  data: unknown
): Promise<
  | { success: true; data: z.infer<T> }
  | { success: false; error: z.ZodError; fieldErrors: FieldErrors; formError: string }
> {
  try {
    const result = await schema.safeParseAsync(data);

    if (result.success) {
      return { success: true, data: result.data };
    }

    const fieldErrors = zodToFieldErrors(result.error);
    const formError = getFirstZodErrorMessage(result.error);

    return {
      success: false,
      error: result.error,
      fieldErrors,
      formError,
    };
  } catch (error) {
    return {
      success: false,
      error: error as z.ZodError,
      fieldErrors: { _form: '검증 중 오류가 발생했습니다.' },
      formError: '검증 중 오류가 발생했습니다.',
    };
  }
}

// ============================================================================
// FIELD ERROR HELPERS
// ============================================================================

/**
 * 필드 에러가 있는지 확인
 *
 * @param fieldErrors - 필드 에러 맵
 * @param fieldName - 필드 이름
 * @returns 에러 존재 여부
 */
export function hasFieldError(fieldErrors: FieldErrors, fieldName: string): boolean {
  return !!fieldErrors[fieldName];
}

/**
 * 필드 에러 메시지 가져오기
 *
 * @param fieldErrors - 필드 에러 맵
 * @param fieldName - 필드 이름
 * @returns 에러 메시지 또는 null
 */
export function getFieldError(fieldErrors: FieldErrors, fieldName: string): string | null {
  return fieldErrors[fieldName] || null;
}

/**
 * 모든 필드 에러 초기화
 *
 * @returns 빈 필드 에러 맵
 */
export function clearFieldErrors(): FieldErrors {
  return {};
}

/**
 * 특정 필드 에러만 초기화
 *
 * @param fieldErrors - 현재 필드 에러 맵
 * @param fieldNames - 초기화할 필드 이름 배열
 * @returns 업데이트된 필드 에러 맵
 */
export function clearSpecificFieldErrors(fieldErrors: FieldErrors, fieldNames: string[]): FieldErrors {
  const updated = { ...fieldErrors };
  fieldNames.forEach((fieldName) => {
    delete updated[fieldName];
  });
  return updated;
}
