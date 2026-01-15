/**
 * Product Validation Schemas
 *
 * @description
 * Zod 스키마를 사용한 제품 데이터 검증
 *
 * @architecture
 * - createProductSchema: 제품 생성용 검증 스키마
 * - updateProductSchema: 제품 수정용 검증 스키마
 * - Shared validation helpers 사용
 * - 형변환과 검증을 동시에 수행
 *
 * @usage
 * ```typescript
 * import { validateSchema } from '@/shared/utils/validation';
 * import { createProductSchema } from '@/features/products/utils/validation';
 *
 * const result = validateSchema(createProductSchema, data);
 * if (result.success) { // ... }
 * ```
 */

import { z } from 'zod';
import { baseFieldSchemas, buildCreateSchema, buildUpdateSchema } from '@/shared/utils/validation/commonSchemas';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * 제품 상태 Enum (Shared baseFieldSchemas.statusEnum 사용)
 */
export const ProductStatusEnum = baseFieldSchemas.statusEnum(['active', 'inactive', 'archived'] as const, '상태');

/**
 * 제품 카테고리 Enum
 */
export const ProductCategoryEnum = baseFieldSchemas.categoryEnum(['subscription', 'one-time'] as const);

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
  name: baseFieldSchemas.requiredString('제품명', 1, 100),
  price: baseFieldSchemas.positiveNumber('가격', 0, 999999999),
  description: baseFieldSchemas.description('제품 설명', 2000),
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
export const createProductSchema = buildCreateSchema({
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
export const updateProductSchema = buildUpdateSchema({
  name: baseFieldSchemas.optionalString('제품명', 100),
  price: baseFieldSchemas.optionalNumber('가격'),
  description: baseFieldSchemas.optionalDescription('제품 설명', 2000),
  status: ProductStatusEnum.optional(),
  category: ProductCategoryEnum.optional(),
});

/**
 * 제품 수정 스키마 타입
 */
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
