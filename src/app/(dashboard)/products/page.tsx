'use client';

// TODO: @YunJunmo
// - 에러 처리 처리

/**
 * Products Page
 *
 * 제품 목록 페이지 컴포넌트
 *
 * @description
 * 제품 목록을 표시하고 필터링 및 정렬 기능을 제공
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProducts 훅으로 상태 및 액션 관리
 * - ProductFilters, ProductList 컴포넌트 조합
 *
 * @architecture
 * Next.js App Router + Client Component Pattern
 * Dynamic Reducer Injection for code splitting
 *
 * @usage
 * /products route에서 자동으로 렌더링됨
 */

import { useRouter } from 'next/navigation';
import ProductFilters from '@/features/products/components/ProductFilters';
import ProductList from '@/features/products/components/ProductList';
import { useProducts } from '@/features/products/hooks/useProducts';
import productsReducer from '@/features/products/store/productsSlice';
import { getErrorMessage } from '@/shared/utils/error';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// DYNAMIC REDUCER INJECTION
// ============================================================================

/**
 * Products Page 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export default function ProductsPage() {
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
          <p className="text-gray-600">Loading Products...</p>
        </div>
      </div>
    );
  }

  // 2️⃣ 준비되면 실제 컨텐츠 렌더링
  return <ProductsPageContent />;
}

// ============================================================================
// PRODUCTS PAGE CONTENT
// ============================================================================

/**
 * Products 페이지 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function ProductsPageContent() {
  const router = useRouter();

  // Products 훅
  const { products, total, filters, sort, isLoading, isError, error, updateFilters, updateSort, refetch } =
    useProducts();

  // 핸들러
  const handleFilterChange = (newFilters: typeof filters) => {
    updateFilters(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const sortOrder: 'asc' | 'desc' = sort.sortBy === sortBy && sort.sortOrder === 'asc' ? 'desc' : 'asc';
    updateSort({ sortBy, sortOrder });
  };

  const handleProductClick = (product: (typeof products)[0]) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">제품 관리</h1>
          <p className="text-gray-600">총 {total}개의 제품</p>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          onClick={() => router.push('/')}
        >
          메인으로
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          onClick={() => router.push('/products/new')}
        >
          제품 등록
        </button>
      </div>

      {/* 에러 상태 */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="text-sm">{getErrorMessage(error)}</p>
          <button type="button" onClick={() => refetch()} className="mt-2 text-sm underline hover:no-underline">
            다시 시도
          </button>
        </div>
      )}

      {/* 필터 */}
      <ProductFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* 정렬 컨트롤 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">정렬:</span>
            <button
              type="button"
              onClick={() => handleSortChange('name')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sort.sortBy === 'name' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              이름 {sort.sortBy === 'name' && (sort.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              type="button"
              onClick={() => handleSortChange('price')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sort.sortBy === 'price' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              가격 {sort.sortBy === 'price' && (sort.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              type="button"
              onClick={() => handleSortChange('createdAt')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sort.sortBy === 'createdAt'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              등록일 {sort.sortBy === 'createdAt' && (sort.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {/* 제품 목록 */}
      <ProductList products={products} isLoading={isLoading} onProductClick={handleProductClick} />

      {/* 빈 상태 */}
      {products.length === 0 && !isLoading && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 제품이 없습니다.</p>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => router.push('/products/new')}
          >
            제품 등록하기
          </button>
        </div>
      )}
    </div>
  );
}
