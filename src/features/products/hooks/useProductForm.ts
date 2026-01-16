import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/features/products/services/productService';
import type { CreateProductInput, Product, UpdateProductInput } from '@/features/products/types/api';
import log from '@/shared/utils/logger';

// ============================================================================
// PRODUCT FORM HOOKS
// ============================================================================

const logger = log.getLogger('Products');

/**
 * Product Form Hook
 *
 * 제품 등록/수정 폼 관리
 *
 * @param id - 제품 ID (수정 모드일 때만 사용)
 * @returns 폼 상태 및 핸들러
 */
export const useProductForm = (id?: string) => {
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);

  // 제품 조회 (수정 모드일 때만)
  const numericId = id ? parseInt(id, 10) : undefined;
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(numericId!, {
    skip: !numericId, // id가 없으면 쿼리 스킵
  });

  // 생성 mutation
  const [createProductMutation, { isLoading: isCreating }] = useCreateProductMutation();

  // 수정 mutation
  const [updateProductMutation, { isLoading: isUpdating }] = useUpdateProductMutation();

  /**
   * 제품 생성 처리
   */
  const handleCreate = useCallback(
    async (data: CreateProductInput): Promise<Product | null> => {
      try {
        const result = await createProductMutation(data).unwrap();
        // 생성 성공 시 상세 페이지로 이동
        router.push(`/products/${result.id}`);
        return result;
      } catch (error) {
        logger.error('Failed to create product:', error);
        alert('제품 생성에 실패했습니다.');
        return null;
      }
    },
    [createProductMutation, router]
  );

  /**
   * 제품 수정 처리
   */
  const handleUpdate = useCallback(
    async (data: UpdateProductInput): Promise<Product | null> => {
      if (!numericId) {
        alert('제품 ID가 필요합니다.');
        return null;
      }

      try {
        const result = await updateProductMutation({ id: numericId, data }).unwrap();
        // 수정 성공 시 상세 페이지로 이동
        router.push(`/products/${numericId}`);
        return result;
      } catch (error) {
        logger.error('Failed to update product:', error);
        alert('제품 수정에 실패했습니다.');
        return null;
      }
    },
    [numericId, updateProductMutation, router]
  );

  /**
   * 취소 처리
   */
  const handleCancel = useCallback(() => {
    if (isDirty) {
      if (!confirm('수정한 내용이 저장되지 않습니다. 정말 나가시겠습니까?')) {
        return;
      }
    }

    if (id) {
      router.push(`/products/${id}`);
    } else {
      router.push('/products');
    }
  }, [isDirty, id, router]);

  return {
    // 데이터
    initialData: product,
    isLoading: isLoadingProduct,
    isCreating,
    isUpdating,
    isSubmitting: isCreating || isUpdating,
    isDirty,

    // 작업
    createProduct: handleCreate,
    updateProduct: handleUpdate,
    cancel: handleCancel,
    setIsDirty,
  };
};
