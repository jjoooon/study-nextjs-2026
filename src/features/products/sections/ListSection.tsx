'use client';

/**
 * List Section
 *
 * 제품 목록 페이지 컴포넌트
 *
 * @description
 * 제품 목록을 표시하고 필터링 및 정렬 기능을 제공
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - useProducts 훅으로 상태 및 액션 관리
 * - ProductFilters, ProductList 컴포넌트 조합
 * - URL 기반 상태 관리로 페이지 이동 간 상태 유지
 *
 * @architecture
 * Next.js App Router + Client Component Pattern
 * Dynamic Reducer Injection for code splitting
 * URL-based state management for cross-page persistence
 *
 * @usage
 * /products/sample/products/List route에서 자동으로 렌더링됨
 *
 * @feature URL-based State Management
 * - filters, sort 상태를 URL 쿼리 파라미터에 저장
 * - 페이지 이동 간 상태 자동 유지
 * - URL 공유, 북마크 가능
 * - 새로고침해도 상태 유지
 *
 * @example
 * /sample/products/List?search=laptop&category=electronics&sortBy=price&sortOrder=asc
 */

import { List, LayoutGrid } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import ProductFilters from '@/features/products/components/ProductFilters';
import ProductGrid from '@/features/products/components/ProductGrid';
import ProductList from '@/features/products/components/ProductList';
import { PRODUCTS_ROUTES } from '@/features/products/constants/routes';
import { useProducts } from '@/features/products/hooks/useProducts';
import productsReducer from '@/features/products/store/productsUISlice';
import { useInjectReducer } from '@/store/reducers/hooks';

// ============================================================================
// DYNAMIC REDUCER INJECTION
// ============================================================================

/**
 * List Section 컴포넌트
 *
 * Dynamic Reducer Pattern으로 products reducer를 주입
 */
export default function ListSection() {
  // 1️⃣ UI 리듀서 동적 주입
  const { isReady } = useInjectReducer('products', productsReducer, {
    ejectOnUnmount: true,
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
  return <Content />;
}

// ============================================================================
// PRODUCTS LIST SECTION CONTENT
// ============================================================================

/**
 * List Section 실제 컨텐츠
 *
 * reducer 주입 후 렌더링되는 컴포넌트
 */
function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Products 훅
  const { products, total, filters, sort, isLoading, viewMode, updateFilters, updateSort, updateViewMode } =
    useProducts();

  // 검색 조건 변경 핸들러
  const handleFilterChange = (newFilters: typeof filters) => {
    updateFilters(newFilters);
  };

  // 정렬 조건 변경 핸들러
  const handleSortChange = (sortBy: string) => {
    const sortOrder: 'asc' | 'desc' = sort.sortBy === sortBy && sort.sortOrder === 'asc' ? 'desc' : 'asc';
    updateSort({ sortBy, sortOrder });
  };

  // 상품 클릭 핸들러
  const handleProductClick = (product: (typeof products)[0]) => {
    // ✅ 쿼리 파라미터 보존하면서 상세 페이지로 이동
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', product.id);
    router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);
  };

  // 제품 등록 버튼 클릭 핸들러
  const handleNewProductClick = () => {
    // ✅ 쿼리 파라미터 보존하면서 등록 페이지로 이동
    router.push(`${PRODUCTS_ROUTES.NEW}?${searchParams.toString()}`);
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
          onClick={handleNewProductClick}
        >
          제품 등록
        </button>
      </div>

      {/* 필터 */}
      <ProductFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* 정렬 및 뷰 모드 컨트롤 */}
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

          {/* 뷰 모드 전환 버튼 */}
          <div className="flex items-center space-x-2 border-l pl-4 border-gray-300">
            <span className="text-sm font-medium text-gray-700 mr-2">뷰 모드:</span>
            <button
              type="button"
              onClick={() => updateViewMode('table')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'table' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="테이블 뷰"
            >
              <List size={20} />
            </button>
            <button
              type="button"
              onClick={() => updateViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="그리드 뷰"
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 제품 목록 - 뷰 모드에 따른 조건부 렌더링 */}
      {viewMode === 'table' ? (
        <ProductList products={products} isLoading={isLoading} onProductClick={handleProductClick} />
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <ProductGrid products={products} onProductClick={handleProductClick} />
        </div>
      )}
    </div>
  );
}
