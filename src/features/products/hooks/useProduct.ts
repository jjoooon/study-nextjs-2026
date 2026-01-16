import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useGetProductByIdQuery, useDeleteProductMutation } from '@/features/products/services/productService';
import log from '@/shared/utils/logger';

// ============================================================================
// PRODUCT HOOKS (Single Product)
// ============================================================================

const logger = log.getLogger('Prodcuts');

/**
 * Product 상세 관리 Hook
 *
 * 단일 제품 조회 및 삭제 기능 제공
 *
 * @param id - 제품 ID
 * @returns 제품 데이터 및 관리 함수
 */
export const useProduct = (id: string) => {
  const router = useRouter();

  // 제품 조회
  const numericId = parseInt(id, 10);
  const { data: product, isLoading, isError, error, refetch } = useGetProductByIdQuery(numericId);

  // 제품 삭제
  const [deleteProductMutation, { isLoading: isDeleting }] = useDeleteProductMutation();

  /**
   * 제품 삭제 처리
   */
  const handleDelete = useCallback(async () => {
    if (!confirm('정말 이 제품을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteProductMutation(numericId).unwrap();
      // 삭제 성공 시 리스트 페이지로 이동
      router.push('/products');
    } catch (error) {
      logger.error('Failed to delete product:', error);
      alert('제품 삭제에 실패했습니다.');
    }
  }, [numericId, deleteProductMutation, router]);

  return {
    // 데이터
    product,
    isLoading,
    isDeleting,
    isError,
    error,

    // 작업
    deleteProduct: handleDelete,
    refetch,
  };
};
