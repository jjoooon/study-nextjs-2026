/**
 * Product Validation Schemas
 *
 * @description
 * Zod 스키마를 사용한 제품 데이터 검증
 *
 * @architecture
 * - createProductSchema: 제품 생성용 검증 스키마
 * - updateProductSchema: 제품 수정용 검증 스키마
 * - 형변환과 검증을 동시에 수행
 *
 * @usage
 * ```typescript
 * import { createProductSchema } from '@/features/products/utils/validation';
 * const result = createProductSchema.safeParse(data);
 * if (result.success) { // ... }
 * ```
 */

import { z } from 'zod';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * 제품 상태 타입
 */
export const ProductStatusEnum = z.enum(['active', 'inactive', 'archived'], {
  message: '유효하지 않은 상태값입니다.',
});

/**
 * 제품 카테고리 타입
 */
export const ProductCategoryEnum = z.enum(['subscription', 'one-time'], {
  message: '유효하지 않은 카테고리입니다.',
});

// ============================================================================
// BASE PRODUCT SCHEMA
// ============================================================================

/**
 * 제품 기본 필드 스키마
 *
 * @description
 * 공통으로 사용되는 제품 필드 검증 규칙
 */
const baseProductSchema = {
  name: z
    .string({ message: '제품명은 문자열이어야 합니다.' })
    .min(1, { message: '제품명을 입력해주세요.' })
    .max(100, { message: '제품명은 100자 이하여야 합니다.' })
    .trim(),

  price: z
    .number({ message: '가격은 숫자이어야 합니다.' })
    .min(0, { message: '가격은 0보다 커야 합니다.' })
    .max(999999999, { message: '가격이 너무 큽니다.' }),

  description: z
    .string({ message: '설명은 문자열이어야 합니다.' })
    .min(1, { message: '설명을 입력해주세요.' })
    .max(2000, { message: '설명은 2000자 이하여야 합니다.' })
    .trim(),

  status: ProductStatusEnum,

  category: ProductCategoryEnum,
};

// ============================================================================
// CREATE PRODUCT SCHEMA
// ============================================================================

/**
 * 제품 생성 스키마
 *
 * @description
 * 새 제품 생성 시 사용하는 전체 필드 검증 스키마
 */
export const createProductSchema = z.object({
  ...baseProductSchema,
});

/**
 * 제품 생성 스키마 타입
 */
export type CreateProductSchema = z.infer<typeof createProductSchema>;

// ============================================================================
// UPDATE PRODUCT SCHEMA
// ============================================================================

/**
 * 제품 수정 스키마
 *
 * @description
 * 기존 제품 수정 시 사용하는 부분적 필드 검증 스키마
 * 모든 필드가 선택적이며, 제공된 필드만 검증
 */
export const updateProductSchema = z
  .object({
    name: baseProductSchema.name.optional(),
    price: baseProductSchema.price.optional(),
    description: baseProductSchema.description.optional(),
    status: baseProductSchema.status.optional(),
    category: baseProductSchema.category.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: '최소한 하나의 필드는 수정해야 합니다.',
  });

/**
 * 제품 수정 스키마 타입
 */
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

// ============================================================================
// VALIDATION ERROR TYPES
// ============================================================================

/**
 * Zod 검증 에러 형식
 *
 * @description
 * Zod 검증 실패 시 반환되는 에러 형식
 */
export type ValidationError = {
  path: string[];
  message: string;
  code: string;
};

/**
 * 필드별 에러 맵
 *
 * @description
 * 필드 이름 -> 에러 메시지 매핑
 */
export type FieldErrors = Partial<Record<string, string>>;

// ============================================================================
// HELPER FUNCTIONS
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
  if (!(error instanceof z.ZodError)) {
    return { _form: '알 수 없는 검증 에러가 발생했습니다.' };
  }

  const fieldErrors: FieldErrors = {};

  error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    fieldErrors[path] = issue.message;
  });

  return fieldErrors;
}

/**
 * 제품 생성 데이터 검증
 *
 * @param data - 검증할 데이터
 * @returns 검증 결과
 *
 * @example
 * ```typescript
 * const result = validateCreateProduct(data);
 * if (!result.success) {
 *   console.log(result.errors); // 필드별 에러
 * }
 * ```
 */
export function validateCreateProduct(data: unknown) {
  return createProductSchema.safeParse(data);
}

/**
 * 제품 수정 데이터 검증
 *
 * @param data - 검증할 데이터
 * @returns 검증 결과
 *
 * @example
 * const result = validateUpdateProduct(data);
 * if (!result.success) {
 *   console.log(result.errors); // 필드별 에러
 * }
 */
export function validateUpdateProduct(data: unknown) {
  return updateProductSchema.safeParse(data);
}
