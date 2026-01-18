'use client';

/**
 * Edit Product Page
 *
 * 제품 수정 페이지 컴포넌트
 *
 * @description
 * 기존 제품을 수정하는 폼 페이지
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProductForm 훅으로 폼 상태 관리
 * - ProductForm 컴포넌트로 수정 폼 표시
 *
 * @architecture
 * Next.js App Router + Client Component Pattern
 * Dynamic Route [id] 사용
 * Next.js 15+: useParams로 id 추출
 *
 * @usage
 * /sample/products/Edit?id=123 route에서 자동으로 렌더링됨
 */

import { useRouter, useSearchParams } from 'next/navigation';

import ProductForm from '@/features/products/components/ProductForm';
import { PRODUCTS_ROUTES } from '@/features/products/constants/routes';
import { useProductForm } from '@/features/products/hooks/useProductForm';
import productsReducer from '@/features/products/store/productsUISlice';
import type { CreateProductInput, UpdateProductInput } from '@/features/products/types/apiTypes';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// EDIT PRODUCT PAGE
// ============================================================================

/**
 * Edit Product Page 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export default function EditProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;

  // 1️⃣ UI 리듀서만 동적 주입 (productsApi는 이미 초기에 로드됨)
  const { isReady } = useInjectReducer('products', productsReducer, {
    ejectOnUnmount: false,
  });

  // 로딩 상태 표시
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Form...</p>
        </div>
      </div>
    );
  }

  // 2️⃣ 준비되면 실제 컨텐츠 렌더링
  return <EditProductPageContent id={id} />;
}

// ============================================================================
// EDIT PRODUCT PAGE CONTENT
// ============================================================================

/**
 * Edit Product 페이지 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function EditProductPageContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initialData, isLoading, isSubmitting, updateProduct } = useProductForm(id);

  // ✅ 쿼리 파라미터를 보존한 복귀 URL
  const returnURL = `/products?${searchParams.toString()}`;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">제품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 제출 핸들러
  const handleSubmit = async (data: CreateProductInput | UpdateProductInput) => {
    const result = await updateProduct(data as UpdateProductInput);
    // 수정 성공 후 필터 상태 유지하면서 목록으로 복귀
    if (result) {
      router.push(returnURL);
    }
    return result;
  };

  // 취소 핸들러
  const handleCancel = () => {
    // ✅ 쿼리 파라미터 보존하면서 상세 페이지로 복귀
    const params = new URLSearchParams(searchParams.toString());
    router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <nav className="text-sm text-gray-600 mb-2">
          <ol className="flex items-center space-x-2">
            <li>
              <button type="button" onClick={() => router.push(returnURL)} className="hover:text-blue-600">
                제품 관리
              </button>
            </li>
            <li>/</li>
            <li>
              <button
                type="button"
                onClick={() => router.push(`/products/${id}?${searchParams.toString()}`)}
                className="hover:text-blue-600"
              >
                {initialData?.name || '제품'}
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900">수정</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">제품 수정</h1>
        <p className="text-gray-600 mt-2">제품 정보를 수정하세요.</p>
      </div>

      {/* 수정 폼 */}
      <div className="bg-white rounded-lg shadow p-6">
        {initialData ? (
          <ProductForm
            initialData={initialData}
            mode="update"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">제품을 찾을 수 없습니다.</p>
            <button
              type="button"
              onClick={() => router.push(returnURL)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              목록으로
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
