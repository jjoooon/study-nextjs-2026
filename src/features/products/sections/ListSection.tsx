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

import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ComponentType } from 'react';
import { useEffect } from 'react';

import ProductFilters from '@/features/products/components/ProductFilters';
import ProductList from '@/features/products/components/ProductList';
import type { TableDialogResult } from '@/features/products/components/popups/TableDialog';
import { PRODUCTS_ROUTES } from '@/features/products/constants/routes';
import { useProducts } from '@/features/products/hooks/useProducts';
import productsReducer from '@/features/products/store/productsUISlice';
import type { Product } from '@/features/products/types/apiTypes';
import { useInjectReducer } from '@/redux/reducers/hooks';
import { SkeletonList } from '@/shared/components/ui/Skeleton';
import { popup } from '@/shared/utils/popup';
import { registerDialog } from '@/shared/utils/popup-registry';

// ============================================================================
// DYNAMIC IMPORT - AG Grid Bundle Optimization
// ============================================================================

/**
 * ProductGrid Dynamic Import
 *
 * @description
 * Vercel React Best Practices - bundle-dynamic-imports 규칙 적용
 * AG Grid (~500KB gzipped)를 초기 번들에서 제외하여 지연 로딩
 *
 * @benefits
 * - 초기 번들 크기 ~500KB 감소
 * - LCP (Largest Contentful Paint) 개선
 * - TTI (Time to Interactive) 개선
 * - 그리드 뷰를 사용하지 않는 사용자에게 불필요한 코드 전송 방지
 *
 * @implementation
 * - ssr: false (AG Grid는 클라이언트 전용 라이브러리)
 * - loading: ProductGrid 로딩 중 SkeletonList 표시
 * - viewMode === 'grid'일 때만 로드됨 (on-demand loading)
 */
const ProductGrid = dynamic(
  () => import('@/features/products/components/ProductGrid').then((mod) => ({ default: mod.default })),
  {
    loading: () => <SkeletonList count={5} />,
    ssr: false, // AG Grid는 클라이언트 사이드 전용
  }
);

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

  // ============================================================================
  // DYNAMIC POPUP REGISTRATION
  // ============================================================================

  /**
   * Table Dialog 동적 등록
   *
   * @description
   * Feature 팝업을 사용처에서 동적으로 등록
   * - 모듈 독립성 확보
   * - 필요할 때만 로드 (코드 스플리팅)
   * - 중앙 레지스트리 의존성 제거
   */
  useEffect(() => {
    registerDialog(
      'shared/table',
      () =>
        import('@/features/products/components/popups/TableDialog') as unknown as Promise<{
          default: ComponentType<Record<string, unknown>>;
        }>
    );

    // cleanup: 필요없으면 제거 (현재는 등록만 하므로 빈 함수)
    return () => {
      // 팝업 등록은 해제하지 않아도 됨 (전역 레지스트리이므로)
    };
  }, []);

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

  // 테이블 팝업 테스트 버튼 클릭 핸들러
  const handleTablePopupTest = async () => {
    // 더미 데이터 생성
    const dummyData = products.map((product: Product) => ({
      id: String(product.id),
      name: product.name,
      category: product.category,
      price: product.price,
      status: Math.random() > 0.5 ? 'active' : 'inactive',
    }));

    try {
      // 팝업 열기 (단일 선택 모드)
      const result = await popup.open<TableDialogResult>('shared/table', {
        title: '제품 선택 테스트',
        description: '행을 클릭하면 팝업이 닫히고 선택된 데이터가 반환됩니다.',
        data: dummyData,
        allowMultiSelect: false,
      });

      // 액션 타입에 따라 분기 처리
      if (result) {
        switch (result.action) {
          case 'select':
            console.log('🎉 선택된 행:', result.singleRow);

            // 선택된 제품으로 이동
            if (result.singleRow) {
              const clickedProduct = products.find((p: Product) => p.id === Number(result.singleRow?.id));
              if (clickedProduct) {
                handleProductClick(clickedProduct);
              }
            }
            break;

          case 'multiSelect':
            console.log('📦 다중 선택된 행들:', result.selectedRows);
            // 다중 선택 로직 처리
            break;

          case 'cancel':
            console.log('❌ 취소됨');
            break;
        }
      }
    } catch (error) {
      console.error('팝업 오류:', error);
    }
  };

  return (
    <div className="">
      {/* 페이지 헤더 */}
      <div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">제품 관리</h1>
          <p className="text-gray-600">총 {total}개의 제품</p>
        </div>
        <div>
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
            onClick={() => router.push('/')}
          >
            메인으로
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            onClick={handleTablePopupTest}
          >
            테이블 팝업 테스트
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            onClick={handleNewProductClick}
          >
            제품 등록
          </button>
        </div>
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
