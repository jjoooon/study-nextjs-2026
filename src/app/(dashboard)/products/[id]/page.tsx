'use client';

/**
 * Product Detail Page
 *
 * 제품 상세 페이지 컴포넌트
 *
 * @description
 * 제품 상세 정보를 표시하고 수정/삭제 기능 제공
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProduct 훅으로 제품 조회 및 삭제
 * - ProductDetail 컴포넌트로 상세 정보 표시
 *
 * @architecture
 * Next.js App Router + Client Component Pattern
 * Dynamic Route [id] 사용
 * Next.js 15+: useParams로 id 추출
 *
 * @usage
 * /products/123 route에서 자동으로 렌더링됨
 */

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import ProductDetail from '@/features/products/components/ProductDetail';
import { useProduct } from '@/features/products/hooks/useProduct';
import productsReducer from '@/features/products/store/productsUISlice';
import { preserveQueryParams } from '@/features/products/utils/urlParams';
import { getErrorMessage } from '@/shared/utils/error';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// PRODUCT DETAIL PAGE
// ============================================================================

/**
 * Product Detail Page 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

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
          <p className="text-gray-600">Loading Product...</p>
        </div>
      </div>
    );
  }

  // 2️⃣ 준비되면 실제 컨텐츠 렌더링
  return <ProductDetailPageContent id={id} />;
}

// ============================================================================
// PRODUCT DETAIL PAGE CONTENT
// ============================================================================

/**
 * Product Detail 페이지 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function ProductDetailPageContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { product, isLoading, isError, error, isDeleting, deleteProduct } = useProduct(id);

  // ✅ 쿼리 파라미터를 보존한 복귀 URL
  const returnURL = preserveQueryParams('/products', searchParams);

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

  // 에러 상태
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="text-sm mt-2">{getErrorMessage(error)}</p>
          <button
            type="button"
            onClick={() => router.push(returnURL)}
            className="mt-4 text-sm underline hover:no-underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 제품을 찾을 수 없음
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white border border-gray-200 px-4 py-3 rounded max-w-md">
          <p className="font-medium text-gray-900">제품을 찾을 수 없습니다</p>
          <button
            type="button"
            onClick={() => router.push(returnURL)}
            className="mt-4 text-sm text-blue-600 underline hover:no-underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 핸들러
  const handleEdit = (_productId: number) => {
    // ✅ 쿼리 파라미터 보존하면서 수정 페이지로 이동
    router.push(`/products/${product.id}/edit?${searchParams.toString()}`);
  };

  const handleDelete = (_productId: number) => {
    deleteProduct();
  };

  const handleBack = () => {
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
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* 제품 상세 */}
      <ProductDetail product={product} onEdit={handleEdit} onDelete={handleDelete} onBack={handleBack} />

      {/* 삭제 중 로딩 표시 */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-900">제품을 삭제하는 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}
