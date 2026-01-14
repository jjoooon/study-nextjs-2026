'use client';

/**
 * New Product Page
 *
 * 제품 등록 페이지 컴포넌트
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
 * /products/new route에서 자동으로 렌더링됨
 */

import ProductForm from '@/features/products/components/ProductForm';
import { useProductForm } from '@/features/products/hooks/useProductForm';
import productsReducer from '@/features/products/store/productsSlice';
import type { CreateProductInput, UpdateProductInput } from '@/features/products/types/api';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// DYNAMIC REDUCER INJECTION
// ============================================================================

/**
 * New Product Page 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export default function NewProductPage() {
  // 1️⃣ UI 리듀서만 동적 주입 (productsApi는 이미 초기에 로드됨)
  const { isReady } = useInjectReducer('products', productsReducer, {
    priority: 23,
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
  return <NewProductPageContent />;
}

// ============================================================================
// NEW PRODUCT PAGE CONTENT
// ============================================================================

/**
 * New Product 페이지 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function NewProductPageContent() {
  const { createProduct, isSubmitting, cancel } = useProductForm();

  // 제출 핸들러
  const handleSubmit = async (data: CreateProductInput | UpdateProductInput) => {
    return await createProduct(data as CreateProductInput);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <nav className="text-sm text-gray-600 mb-2">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/products" className="hover:text-blue-600">
                제품 관리
              </a>
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
        <ProductForm mode="create" onSubmit={handleSubmit} onCancel={cancel} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
