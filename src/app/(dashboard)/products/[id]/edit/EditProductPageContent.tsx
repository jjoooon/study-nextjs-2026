'use client';

/**
 * Edit Product Page Content
 *
 * 제품 수정 페이지 클라이언트 컴포넌트
 *
 * @description
 * Dynamic Reducer Injection과 상태 관리를 처리하는 클라이언트 컴포넌트
 *
 * @architecture
 * Client Component Pattern
 */

import { ProductForm, productsReducer, useProductForm } from '@/features/products';
import type { CreateProductInput, UpdateProductInput } from '@/features/products';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// DYNAMIC REDUCER INJECTION
// ============================================================================

interface EditProductPageContentProps {
  id: string;
}

/**
 * Edit Product Page 컨텐츠 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export function EditProductPageContent({ id }: EditProductPageContentProps) {
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
  return <EditProductPageContentInner id={id} />;
}

// ============================================================================
// EDIT PRODUCT PAGE CONTENT INNER
// ============================================================================

/**
 * Edit Product 페이지 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function EditProductPageContentInner({ id }: { id: string }) {
  const { initialData, isLoading, isSubmitting, updateProduct, cancel } = useProductForm(id);

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
    return await updateProduct(data as UpdateProductInput);
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
            <li>
              <a href={`/products/${id}`} className="hover:text-blue-600">
                {initialData?.name || '제품'}
              </a>
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
            onCancel={cancel}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">제품을 찾을 수 없습니다.</p>
            <a
              href="/products"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              목록으로
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
