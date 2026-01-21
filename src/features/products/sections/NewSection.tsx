'use client';

/**
 * New Section
 *
 * 제품 등록 섹션 컴포넌트
 *
 * @description
 * 신규 제품을 등록하는 폼 페이지
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProductForm 훅으로 폼 상태 관리
 * - ProductForm 컴포넌트로 등록 폼 표시
 *
 * @architecture
 * Next.js App Router + Client Component Pattern
 *
 * @usage
 * /sample/products/New route에서 자동으로 렌더링됨
 */

import { useRouter, useSearchParams } from 'next/navigation';

import ProductForm from '@/features/products/components/ProductForm';
import { PRODUCTS_ROUTES } from '@/features/products/constants/routes';
import { useProductForm } from '@/features/products/hooks/useProductForm';
import productsReducer from '@/features/products/store/productsUISlice';
import type { CreateProductInput, UpdateProductInput } from '@/features/products/types/apiTypes';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// DYNAMIC REDUCER INJECTION
// ============================================================================

/**
 * New Section 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export default function NewSection() {
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
  return <Content />;
}

// ============================================================================
// NEW PRODUCT SECTION CONTENT
// ============================================================================

/**
 * New Section 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createProduct, isSubmitting } = useProductForm();

  // ✅ 쿼리 파라미터를 보존한 복귀 URL
  const returnURL = `${PRODUCTS_ROUTES.LIST}?${searchParams.toString()}`;

  // 제출 핸들러
  const handleSubmit = async (data: CreateProductInput | UpdateProductInput) => {
    const result = await createProduct(data as CreateProductInput);
    // 등록 성공 후 필터 상태 유지하면서 목록으로 복귀
    if (result) {
      router.push(returnURL);
    }
    return result;
  };

  // 취소 핸들러
  const handleCancel = () => {
    // ✅ 쿼리 파라미터 보존하면서 목록으로 복귀
    router.push(returnURL);
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
            <li className="text-gray-900">신규 등록</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">신규 제품 등록</h1>
        <p className="text-gray-600 mt-2">새로운 제품 정보를 입력하세요.</p>
      </div>

      {/* 등록 폼 */}
      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm mode="create" onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
