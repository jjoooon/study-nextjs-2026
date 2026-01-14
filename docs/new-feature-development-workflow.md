# 신규 업무 개발 완전 워크플로우 가이드

## 📋 개요

본 가이드는 Dashboard 예시를 기반으로 신규 Feature 개발의 전체 프로세스를 단계별로 설명합니다. MSW 정의부터 Page 생성까지 일관된 패턴을 따라 개발할 수 있습니다.

## 🎯 목차

1. [개발 단계 개요](#개발-단계-개요)
2. [예시 시나리오](#예시-시나리오-products-feature-개발)
3. [1단계: MSW 정의](#1단계-msw-정의-api-mock-data)
4. [2단계: Types 정의](#2단계-types-정의)
5. [3단계: API Slice](#3단계-api-slice-rtk-query)
6. [4단계: UI Slice](#4단계-ui-slice-redux-toolkit)
7. [5단계: Components](#5단계-components-생성)
8. [6단계: Hooks](#6단계-hooks-생성)
9. [7단계: Feature Index](#7단계-feature-index-통합)
10. [8단계: Page 생성](#8단계-page-생성)
11. [9단계: Redux Store 등록](#9단계-redux-store-등록)
12. [완성 확인 체크리스트](#완성-확인-체크리스트)

---

## 개발 단계 개요

```
1단계: MSW 정의 → API Mock 데이터
2단계: Types 정의 → 타입 구조
3단계: API Slice → RTK Query
4단계: UI Slice → Redux Toolkit
5단계: Components → UI 컴포넌트
6단계: Hooks → 커스텀 훅
7단계: Feature Index → 통합 내보내기
8단계: Page 생성 → 라우팅 페이지
9단계: Store 등록 → Redux 통합
```

---

## 예시 시나리오: "Products" Feature 개발

제품 목록/상세/관리 기능을 가진 새로운 Feature를 개발한다고 가정하고 전체 과정을 설명합니다.

**기능 요구사항**:
- 제품 목록 조회 (페이지네이션, 필터, 정렬)
- 제품 상세 조회
- 제품 생성/수정/ 삭제
- MSW로 API 목킹

---

## 1단계: MSW 정의 (API Mock Data)

### 파일 구조

```
src/mocks/
├── data/
│   └── products.ts          ← Mock 데이터 정의
├── handlers/
│   ├── products.ts          ← MSW 핸들러
│   └── index.ts             ← 핸들러 통합
```

### 1.1 Mock 데이터 정의

**`src/mocks/data/products.ts`**

```typescript
/**
 * Products Feature Mock Data
 */

import { Product } from '@/features/products/types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Plan',
    price: 99000,
    description: '프리미엄 요금제',
    status: 'active',
    category: 'subscription',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Basic Plan',
    price: 49000,
    description: '기본 요금제',
    status: 'active',
    category: 'subscription',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z',
  },
];

export const productsData = {
  products: mockProducts,
  total: mockProducts.length,
};
```

### 1.2 MSW 핸들러 작성

**`src/mocks/handlers/products.ts`**

```typescript
/**
 * MSW Handlers for Products API
 */

import { http, HttpResponse, delay } from 'msw';
import { productsData, mockProducts } from '../data/products';

export const productsHandlers = [
  /**
   * 제품 목록 조회
   * GET /api/products
   */
  http.get('/api/products', async ({ request }) => {
    const url = new URL(request.url);

    // 쿼리 파라미터 추출
    const page = url.searchParams.get('page') || '1';
    const pageSize = url.searchParams.get('pageSize') || '10';
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status') || '';

    // 네트워크 지연 시뮬레이션 (100-300ms)
    await delay(Math.floor(Math.random() * 200) + 100);

    // 필터링 로직
    let filteredProducts = [...mockProducts];

    if (search) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filteredProducts = filteredProducts.filter(p =>
        p.status === status
      );
    }

    // 페이지네이션
    const startIndex = (parseInt(page) - 1) * parseInt(pageSize);
    const endIndex = startIndex + parseInt(pageSize);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return HttpResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    }, { status: 200 });
  }),

  /**
   * 제품 상세 조회
   * GET /api/products/:id
   */
  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params;
    const product = mockProducts.find(p => p.id === parseInt(id as string));

    await delay(Math.floor(Math.random() * 200) + 100);

    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(product, { status: 200 });
  }),

  /**
   * 제품 생성
   * POST /api/products
   */
  http.post('/api/products', async ({ request }) => {
    const body = await request.json();

    await delay(Math.floor(Math.random() * 200) + 100);

    const newProduct = {
      id: mockProducts.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProducts.push(newProduct);

    return HttpResponse.json(newProduct, { status: 201 });
  }),

  /**
   * 제품 수정
   * PATCH /api/products/:id
   */
  http.patch('/api/products/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();

    await delay(Math.floor(Math.random() * 200) + 100);

    const index = mockProducts.findIndex(p => p.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    const updatedProduct = {
      ...mockProducts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    mockProducts[index] = updatedProduct;

    return HttpResponse.json(updatedProduct, { status: 200 });
  }),

  /**
   * 제품 삭제
   * DELETE /api/products/:id
   */
  http.delete('/api/products/:id', async ({ params }) => {
    const { id } = params;

    await delay(Math.floor(Math.random() * 200) + 100);

    const index = mockProducts.findIndex(p => p.id === parseInt(id as string));

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    mockProducts.splice(index, 1);

    return HttpResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  }),
];
```

### 1.3 핸들러 등록

**`src/mocks/handlers/index.ts`**

```typescript
import { dashboardHandlers } from './dashboard';
import { productsHandlers } from './products'; // 추가

export const handlers = [
  ...dashboardHandlers,
  ...productsHandlers,  // 등록
];
```

---

## 2단계: Types 정의

### 파일 구조

```
src/features/products/
└── types/
    ├── api.ts           ← API 응답/요청 타입
    ├── ui.ts            ← UI 상태 타입
    ├── store.ts         ← Redux 상태 타입
    ├── components.ts    ← 컴포넌트 Props 타입
    └── index.ts         ← 타입 통합 내보내기
```

### 2.1 API 타입

**`src/features/products/types/api.ts`**

```typescript
/**
 * Products API Types
 */

/**
 * 제품 엔티티
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  category: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 제품 생성 입력
 */
export interface CreateProductInput {
  name: string;
  price: number;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  category: string;
}

/**
 * 제품 수정 입력
 */
export interface UpdateProductInput {
  name?: string;
  price?: number;
  description?: string;
  status?: 'active' | 'inactive' | 'archived';
  category?: string;
}

/**
 * 제품 목록 조회 파라미터
 */
export interface ProductListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * 제품 목록 응답
 */
export interface ProductsListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 2.2 UI 타입

**`src/features/products/types/ui.ts`**

```typescript
/**
 * Products UI Types
 */

/**
 * 제품 필터 상태
 */
export interface ProductsFilters {
  search: string;
  status: string;
  category: string;
  dateRange: {
    start: string;
    end: string;
  };
}

/**
 * 제품 정렬 상태
 */
export interface ProductsSort {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * 제품 UI 상태
 */
export interface ProductsUIState {
  filters: ProductsFilters;
  sort: ProductsSort;
  selectedProducts: number[];
  viewMode: 'table' | 'grid';
}
```

### 2.3 Store 타입

**`src/features/products/types/store.ts`**

```typescript
/**
 * Products Redux Store Types
 */

import type { ProductsUIState } from './ui';

/**
 * Products Store State
 */
export interface ProductsState {
  ui: ProductsUIState;
  lastUpdated: string | null;
}

/**
 * Products Store Slice
 */
export interface ProductsSlice extends ProductsState {
  // 추가 상태가 필요한 경우
}
```

### 2.4 컴포넌트 타입

**`src/features/products/types/components.ts`**

```typescript
/**
 * Products Component Props Types
 */

import type { Product } from './api';

/**
 * ProductList Props
 */
export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
}

/**
 * ProductCard Props
 */
export interface ProductCardProps {
  product: Product;
  onViewDetails?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

/**
 * ProductFilters Props
 */
export interface ProductFiltersProps {
  filters: {
    search: string;
    status: string;
  };
  onFilterChange: (filters: any) => void;
}
```

### 2.5 타입 통합

**`src/features/products/types/index.ts`**

```typescript
/**
 * Products Feature Types
 */

export * from './api';
export * from './ui';
export * from './store';
export * from './components';
```

---

## 3단계: API Slice (RTK Query)

**`src/features/products/store/apiSlice.ts`**

```typescript
/**
 * Products API Slice
 *
 * RTK Query로 제품 관련 API 요청 처리
 */

import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/lib/axios';

import type {
  CreateProductInput,
  ProductListParams,
  UpdateProductInput,
} from '../types';

// ============================================================================
// PRODUCTS API SLICE
// ============================================================================

/**
 * Products 도메인 전용 API Slice
 */
export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery(),

  // Products 도메인 전용 캐시 태그
  tagTypes: ['Products-LIST', 'Products-ITEM'] as const,

  // Products 전용 캐시 설정
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    /**
     * 제품 목록 조회
     * GET /api/products
     */
    getProducts: builder.query({
      query: (params: ProductListParams | void) => {
        if (!params) return '/products';

        const searchParams = new URLSearchParams();

        // 페이지네이션
        if (params.page) searchParams.append('page', String(params.page));
        if (params.pageSize) searchParams.append('pageSize', String(params.pageSize));

        // 정렬
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

        // 필터
        if (params.search) searchParams.append('search', params.search);
        if (params.status) searchParams.append('status', params.status);
        if (params.category) searchParams.append('category', params.category);

        return `/products?${searchParams.toString()}`;
      },
      providesTags: ['Products-LIST'],
      keepUnusedDataFor: 300, // 5분 캐시
    }),

    /**
     * 제품 상세 조회
     * GET /api/products/:id
     */
    getProductById: builder.query({
      query: (id: number) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products-ITEM', id }],
      keepUnusedDataFor: 600, // 10분 캐시
    }),

    /**
     * 제품 생성
     * POST /api/products
     */
    createProduct: builder.mutation({
      query: (product: CreateProductInput) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products-LIST'],
    }),

    /**
     * 제품 수정
     * PATCH /api/products/:id
     */
    updateProduct: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateProductInput }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'Products-LIST',
        { type: 'Products-ITEM', id },
      ],
    }),

    /**
     * 제품 삭제
     * DELETE /api/products/:id
     */
    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        'Products-LIST',
        { type: 'Products-ITEM', id },
      ],
    }),
  }),
});

// ============================================================================
// GENERATED HOOKS EXPORTS
// ============================================================================

/**
 * Products API 자동 생성된 React Hooks
 */
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
```

---

## 4단계: UI Slice (Redux Toolkit)

**`src/features/products/store/productsSlice.ts`**

```typescript
/**
 * Products UI Slice
 *
 * 제품 관련 UI 상태 관리 (필터, 정렬, 선택 등)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ProductsFilters, ProductsSort, ProductsUIState } from '../types';

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: ProductsFilters = {
  search: '',
  status: '',
  category: '',
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
};

const initialSort: ProductsSort = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const initialState: ProductsUIState = {
  filters: initialFilters,
  sort: initialSort,
  selectedProducts: [],
  viewMode: 'table',
};

// ============================================================================
// PRODUCTS SLICE
// ============================================================================

/**
 * Products UI Slice
 */
export const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    /**
     * 필터 업데이트
     */
    setFilters: (state, action: PayloadAction<Partial<ProductsFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    /**
     * 필터 초기화
     */
    resetFilters: (state) => {
      state.filters = initialFilters;
    },

    /**
     * 정렬 업데이트
     */
    setSort: (state, action: PayloadAction<ProductsSort>) => {
      state.sort = action.payload;
    },

    /**
     * 제품 선택/해제
     */
    toggleProductSelection: (state, action: PayloadAction<number>) => {
      const index = state.selectedProducts.indexOf(action.payload);
      if (index === -1) {
        state.selectedProducts.push(action.payload);
      } else {
        state.selectedProducts.splice(index, 1);
      }
    },

    /**
     * 모든 제품 선택
     */
    selectAllProducts: (state, action: PayloadAction<number[]>) => {
      state.selectedProducts = action.payload;
    },

    /**
     * 모든 선택 해제
     */
    clearProductSelection: (state) => {
      state.selectedProducts = [];
    },

    /**
     * 뷰 모드 변경
     */
    setViewMode: (state, action: PayloadAction<'table' | 'grid'>) => {
      state.viewMode = action.payload;
    },
  },
});

// ============================================================================
// ACTIONS EXPORT
// ============================================================================

export const {
  setFilters,
  resetFilters,
  setSort,
  toggleProductSelection,
  selectAllProducts,
  clearProductSelection,
  setViewMode,
} = productsSlice.actions;

// ============================================================================
// REDUCER EXPORT
// ============================================================================

export default productsSlice.reducer;
```

---

## 5단계: Components 생성

### 5.1 ProductList 컴포넌트

**`src/features/products/components/ProductList.tsx`**

```typescript
'use client';

/**
 * ProductList Component
 *
 * 제품 목록을 표시하는 컴포넌트
 */

import type { ProductListProps } from '../types';

export function ProductList({ products, isLoading, onProductClick }: ProductListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">제품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onProductClick?.(product)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ₩{product.price.toLocaleString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.status === 'active' ? 'bg-green-100 text-green-800' :
              product.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {product.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 5.2 ProductFilters 컴포넌트

**`src/features/products/components/ProductFilters.tsx`**

```typescript
'use client';

/**
 * ProductFilters Component
 *
 * 제품 필터 UI 컴포넌트
 */

import type { ProductFiltersProps } from '../types';

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 검색 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            검색
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="제품명 검색..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 상태 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상태
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">전체</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
            <option value="archived">보관</option>
          </select>
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">전체</option>
            <option value="subscription">구독</option>
            <option value="one-time">일회</option>
          </select>
        </div>
      </div>
    </div>
  );
}
```

---

## 6단계: Hooks 생성

### 6.1 Selectors 파일 생성 (먼저 생성)

**`src/features/products/store/productsSelectors.ts`**

```typescript
import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store';

// ============================================================================
// PRODUCTS SELECTORS
// ============================================================================

/**
 * Products domain의 모든 selector
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */

// Base selectors
export const selectProductsState = (state: RootState) => state.products;

export const selectFilters = createSelector([selectProductsState], (products) => products.filters);

export const selectSort = createSelector([selectProductsState], (products) => products.sort);

export const selectSelectedProducts = createSelector([selectProductsState], (products) => products.selectedProducts);

export const selectViewMode = createSelector([selectProductsState], (products) => products.viewMode);

// ============================================================================
// COMPOSED SELECTORS
// ============================================================================

/**
 * 선택된 제품 개수
 */
export const selectSelectedProductsCount = createSelector(
  [selectSelectedProducts],
  (selectedProducts) => selectedProducts.length
);

/**
 * 현재 정렬 상태 요약
 */
export const selectSortSummary = createSelector([selectSort], (sort) => ({
  sortBy: sort.sortBy,
  sortOrder: sort.sortOrder,
  label: `${sort.sortBy} ${sort.sortOrder === 'asc' ? '오름차순' : '내림차순'}`,
}));

/**
 * Products 상태 요약
 */
export const selectProductsStatus = createSelector(
  [selectSelectedProductsCount, selectSortSummary],
  (selectedCount, sortSummary) => ({
    selectedCount,
    sortLabel: sortSummary.label,
  })
);
```

### 6.2 Hooks 파일 작성

**`src/features/products/hooks/useProducts.ts`**

```typescript
import { useGetProductsQuery } from '@/features/products/store/apiSlice';
import * as productsSelectors from '@/features/products/store/productsSelectors';
import { setFilters, setSort } from '@/features/products/store/productsSlice';
import { useAppDispatch, useAppSelector } from '@/store';

// ============================================================================
// PRODUCTS HOOKS (RTK Query + Selector-based)
// ============================================================================

/**
 * Products 상태 관리 Hook
 *
 * RTK Query를 사용한 API 데이터 fetching + Redux Slice의 UI 상태 관리
 *
 * @note Conditional Rendering으로 인해 방어 로직 불필요
 */
export const useProducts = () => {
  const dispatch = useAppDispatch();

  // ✅ RTK Query hook (리듀서가 항상 존재하므로 안전)
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
  });

  // ✅ Selector 기반 UI 상태 구독
  const filters = useAppSelector(productsSelectors.selectFilters);
  const sort = useAppSelector(productsSelectors.selectSort);
  const selectedProducts = useAppSelector(productsSelectors.selectSelectedProducts);
  const viewMode = useAppSelector(productsSelectors.selectViewMode);

  return {
    // API 데이터
    products: productsData?.products || [],
    total: productsData?.total || 0,
    isLoading,
    isError,
    error,

    // UI 상태
    filters,
    sort,
    selectedProducts,
    viewMode,

    // Actions
    updateFilters: (newFilters: Partial<typeof filters>) => dispatch(setFilters(newFilters)),
    updateSort: (newSort: { sortBy: string; sortOrder: 'asc' | 'desc' }) => dispatch(setSort(newSort)),
    refetch,
  };
};

/**
 * Products 필터 상태만 가져오는 Hook
 */
export const useProductsFilters = () => {
  return useAppSelector(productsSelectors.selectFilters);
};

/**
 * 선택된 제품 개수
 */
export const useSelectedProductsCount = () => {
  return useAppSelector(productsSelectors.selectSelectedProductsCount);
};

/**
 * Products API 데이터 상태 요약
 */
export const useProductsApiStatus = () => {
  const { isLoading, isError, error, data } = useGetProductsQuery();

  return {
    isLoading,
    isError,
    error,
    hasData: !!data,
    productCount: data?.products.length || 0,
    totalCount: data?.total || 0,
  };
};
```

### ⚠️ 중요 사항

1. **Selector 파일 분리**: `store/{feature}Selectors.ts`에 selector를 별도로 정의
2. **@/store에서 Hooks 가져오기**: `useAppDispatch`, `useAppSelector`는 feature에서 재정의하지 않고 `@/store`에서 가져옴
3. **다중 Hooks Export**: `useProducts` 외에도 `useProductsFilters`, `useSelectedProductsCount` 등 부수적 hooks 함께 export

---

## 7단계: Feature Index 통합

**`src/features/products/index.ts`**

```typescript
/**
 * Products Feature - 통합 내보내기
 *
 * 제품 관리 기능의 진입점
 *
 * @description
 * Products 도메인의 모든 기능을 내보내는 바럴 파일
 * - Store: RTK Query API, Redux Toolkit UI state
 * - Types: API, UI, Store, Components 타입
 * - Hooks: useProducts 통합 훅
 * - Components: ProductList, ProductFilters
 *
 * @architecture
 * Feature-based architecture로 products 도메인의 모든 계층을 통합 제공
 *
 * @usage
 * ```typescript
 * import { useProducts, ProductList, ProductFilters } from '@/features/products';
 * ```
 */

// ============================================================================
// STORE EXPORTS
// ============================================================================

// RTK Query API Slice
export { productsApiSlice } from './store/apiSlice';

// Redux Toolkit UI Slice
export { default as productsReducer } from './store/productsSlice';
export * from './store/productsSlice';

// ============================================================================
// TYPES EXPORTS
// ============================================================================

export * from './types';

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

export { useProducts } from './hooks/useProducts';

// ⚠️ 주의: useAppDispatch, useAppSelector는 @/store에서 가져와야 합니다

// ============================================================================
// COMPONENTS EXPORTS
// ============================================================================

export { ProductList } from './components/ProductList';
export { ProductFilters } from './components/ProductFilters';
```

### ⚠️ 주의사항

1. **존재하지 않는 타입 제거**: `ProductsApi`와 같이 API Slice에 정의되지 않은 타입은 export하지 않습니다
2. **훅 재정의 제거**: `useAppDispatch`, `useAppSelector`는 `@/store`에서 가져와야 합니다 (feature에서 재정의하지 않음)
3. **명확한 Export**: 각 섹션을 명확히 분리하여 무엇이 export되는지 쉽게 파악할 수 있습니다

---

## 8단계: Page 생성

**`src/app/(dashboard)/products/page.tsx`**

```typescript
'use client';

/**
 * Products Page with Dynamic Reducer Pattern
 *
 * 제품 목록 페이지 컴포넌트
 *
 * @description
 * 제품 목록을 표시하고 필터링 및 정렬 기능을 제공
 * - Dynamic Reducer Pattern으로 products reducer lazy loading
 * - isReady 패턴으로 안전한 렌더링 보장
 * - useProducts 훅으로 상태 및 액션 관리
 * - ProductFilters, ProductList 컴포넌트 조합
 *
 * @architecture
 * Next.js App Router + Client Component Pattern
 * Dynamic Reducer Injection for code splitting
 */

import { useEffect, useState } from 'react';

import {
  ProductFilters,
  ProductList,
  productsReducer,
  useProducts,
} from '@/features/products';
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
  const [isReady, setIsReady] = useState(false);

  // 1️⃣ UI 리듀서만 동적 주입 (productsApi는 이미 초기에 로드됨)
  useInjectReducer('products', productsReducer, {
    priority: 23,
    ejectOnUnmount: false,
  });

  // 2️⃣ 리듀서 주입 후 렌더링
  useEffect(() => {
    // 다음 tick에서 컴포넌트 렌더링
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

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

  // 3️⃣ 준비되면 실제 컨텐츠 렌더링
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
  // Products 훅
  const {
    products,
    total,
    filters,
    sort,
    isLoading,
    isError,
    error,
    updateFilters,
    updateSort,
    refetch,
  } = useProducts();

  // 핸들러
  const handleFilterChange = (newFilters: typeof filters) => {
    updateFilters(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const sortOrder: 'asc' | 'desc' = sort.sortBy === sortBy && sort.sortOrder === 'asc' ? 'desc' : 'asc';
    updateSort({ sortBy, sortOrder });
  };

  const handleProductClick = (product: (typeof products)[0]) => {
    console.log('Product clicked:', product);
    // TODO: 제품 상세 페이지로 이동 또는 모달 표시
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">제품 관리</h1>
        <p className="text-gray-600">총 {total}개의 제품</p>
      </div>

      {/* 에러 상태 */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">오류가 발생했습니다</p>
          <p className="text-sm">{error as string}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 text-sm underline hover:no-underline"
          >
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
                sort.sortBy === 'name'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              이름 {sort.sortBy === 'name' && (sort.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              type="button"
              onClick={() => handleSortChange('price')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                sort.sortBy === 'price'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <ProductList
        products={products}
        isLoading={isLoading}
        onProductClick={handleProductClick}
      />

      {/* 빈 상태 */}
      {products.length === 0 && !isLoading && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">등록된 제품이 없습니다.</p>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              /* TODO: 제품 생성 모달 열기 */
            }}
          >
            제품 등록하기
          </button>
        </div>
      )}
    </div>
  );
}
```

### ⚠️ 주의사항

1. **Import 경로**: `@/store/reducers/hooks`에서 `useInjectReducer`를 가져와야 합니다
2. **UI Reducer만 주입**: `productsApi` reducer는 이미 전역에서 로드되므로 UI reducer만 주입합니다
3. **isReady 패턴**: 리듀서 주입 후 다음 tick에 컨텐츠를 렌더링하여 안전성 보장
4. **Priority 설정**: dashboard(22), products(23) 등으로 우선순위를 다르게 설정
5. **MSW 제외**: MSW worker는 `src/app/providers.tsx`에서 이미 시작되므로 페이지에서 별도로 시작할 필요 없음

---

## 9단계: Redux Store 등록

### 9.1 UI 리듀서 등록

**`src/store/setup.ts`**

```typescript
import { authReducer } from '@/features/auth';
import log from '@/shared/utils/logger';

// ... existing imports

export const initializeReducers = () => {
  // ✅ Core UI Reducers - 항상 초기 로드
  reducerRegistry.register('auth', authReducer, 20);

  // ⚠️ Optional UI Reducers - 페이지에서 지연 로딩
  // dashboard, products는 각 페이지에서 useInjectReducer로 주입

  // ✅ API Reducers - 중앙 집중식 레지스트리에서 자동 등록
  registerAllApiReducers(reducerRegistry);
};
```

**⚠️ 중요**: Core features만 초기에 등록합니다. Dashboard, Products 같은 optional features는 페이지 컴포넌트에서 `useInjectReducer`로 지연 로딩합니다.

### 9.2 API Slice 등록

**`src/store/api/config.ts`**

```typescript
import { authApiSlice } from '@/features/auth';
import { dashboardApiSlice } from '@/features/dashboard';
import { productsApiSlice } from '@/features/products';  // 추가

/**
 * 개별 API 등록 정보 타입
 */
export interface ApiRegistration {
  /** RTK Query API 슬라이스 */
  api: {
    reducerPath: string;
    reducer: Reducer;
    middleware: Middleware<object, object>;
  };
  /** 실행 우선순위 (낮을수록 먼저 실행) */
  priority: number;
  /** API 이름 (로깅 및 디버깅용) */
  name: string;
}

/**
 * 모든 RTK Query API 슬라이스 등록 정보
 */
export const API_REGISTRY = [
  // Core APIs (우선순위 10-19)
  { api: authApiSlice, priority: 10, name: 'authApi' },

  // Feature APIs (우선순위 50-59)
  { api: dashboardApiSlice, priority: 52, name: 'dashboardApi' },
  { api: productsApiSlice, priority: 53, name: 'productsApi' },  // 추가
  // ✅ 새로운 API를 여기에 추가
] as const;

/**
 * 등록된 모든 API 이름 목록
 */
export const REGISTERED_API_NAMES = API_REGISTRY.map(({ name }) => name);
```

### 9.3 RootState 타입 업데이트

**`src/store/index.ts`**

```typescript
export type RootState = {
  auth: import('@/features/auth/types').AuthState;
  dashboard: import('@/features/dashboard/types').DashboardState;
  dashboardApi: unknown;
  products: import('@/features/products/types').ProductsUIState;  // 추가
  productsApi: unknown;  // 추가
};
```

### ⚠️ 주의사항

1. **등록 위치**:
   - **UI 리듀서**: `src/store/setup.ts`의 `initializeReducers` 함수에 등록
   - **API 리듀서**: `src/store/api/config.ts`의 `API_REGISTRY` 배열에 등록
   - API 리듀서는 자동으로 전역 리듀서에 포함되므로 Page에서 주입할 필요 없음

2. **우선순위 (Priority)**:
   - **Core APIs**: 10-19 (auth, 등)
   - **Feature APIs**: 50-59 (dashboard: 52, products: 53, 등)
   - **UI Reducers**: 20-29 (auth: 20, dashboard: 22, products: 23)
   - 낮을수록 먼저 실행됨

3. **RootState 타입**: 새로운 feature 추가 시 반드시 `src/store/index.ts`의 `RootState` 타입을 업데이트해야 TypeScript 오류가 발생하지 않습니다

4. **자동 등록**: API Slice는 `API_REGISTRY`에 등록하면 자동으로 리듀서와 미들웨어가 등록됩니다

5. **Page에서는 UI Reducer만 주입**: API reducer는 이미 초기화되어 있으므로 Page에서는 UI reducer만 `useInjectReducer`로 주입합니다

---

## 🔧 빌드 에러 해결 가이드

실제 구현 중 발생한 빌드 에러와 해결 방법입니다.

### 에러 1: JSX 문법 오류

**에러 메시지**:
```
SyntaxError: Expected corresponding JSX closing tag for <div>
```

**원인**: 주석 처리된 코드가 불완전한 JSX 구조

**해결**:
```typescript
// ❌ 잘못된 주석 처리
{/* 빈 상태 && products.length === 0 && !isLoading && (
  <div>...</div>
)}

// ✅ 올바른 주석과 코드
{/* 빈 상태 */}
{products.length === 0 && !isLoading && (
  <div>...</div>
)}
```

### 에러 2: Import 경로 오류

**에러 메시지**:
```
Module not found: Can't resolve '@/store/reducers'
```

**원인**: `useInjectReducer` import 경로가 잘못됨

**해결**:
```typescript
// ❌ 잘못된 경로
import { useInjectReducer } from '@/store/reducers';

// ✅ 올바른 경로
import { useInjectReducer } from '@/store/reducers/hooks';
```

### 에러 3: TypeScript 타입 오류

**에러 메시지**:
```
Type 'ThunkDispatch<PersistPartial, undefined, UnknownAction>' does not satisfy the constraint 'Action<string>'
```

**원인**: `useAppDispatch()`를 Store로 잘못 사용

**해결**:
```typescript
// ❌ 잘못된 패턴
const storeRef = useRef<Store<RootState, AppDispatch> | null>(null);
if (!storeRef.current) {
  const store = useAppDispatch(); // ❌ useAppDispatch는 dispatch 함수 반환
  storeRef.current = store as unknown as Store<RootState, AppDispatch>;
}

// ✅ 올바른 패턴 (단순화)
useInjectReducer('products', productsReducer);
useInjectReducer('productsApi', productsApiSlice.reducer);
```

### 에러 4: RootState 타입 누락

**에러 메시지**:
```
Property 'products' does not exist on type 'RootState'
```

**원인**: 새 feature 추가 시 `RootState` 타입 업데이트 누락

**해결**:
```typescript
// src/store/index.ts
export type RootState = {
  auth: import('@/features/auth/types').AuthState;
  dashboard: import('@/features/dashboard/types').DashboardState;
  dashboardApi: unknown;
  products: import('@/features/products/types').ProductsUIState;  // 추가
  productsApi: unknown;  // 추가
};
```

### 에러 5: 존재하지 않는 타입 Export

**에러 메시지**:
```
Module '"./store/apiSlice"' has no exported member 'ProductsApi'
```

**원인**: Feature Index에서 존재하지 않는 타입 export

**해결**:
```typescript
// ❌ 잘못된 export
export { productsApiSlice } from './store/apiSlice';
export type { ProductsApi } from './store/apiSlice';  // ❌ 존재하지 않음

// ✅ 올바른 export
export { productsApiSlice } from './store/apiSlice';
```

---

## 완성 확인 체크리스트

개발 완료 후 다음 사항을 확인합니다:

```
✅ 1. MSW 핸들러 작성 (/api/products)
   - GET /api/products (목록)
   - GET /api/products/:id (상세)
   - POST /api/products (생성)
   - PATCH /api/products/:id (수정)
   - DELETE /api/products/:id (삭제)

✅ 2. Types 정의
   - api.ts (API 타입)
   - ui.ts (UI 상태 타입)
   - store.ts (Redux 상태 타입)
   - components.ts (컴포넌트 Props 타입)
   - index.ts (타입 통합)

✅ 3. API Slice 작성 (RTK Query)
   - endpoints 정의
   - 자동 생성된 hooks export

✅ 4. UI Slice 작성 (Redux Toolkit)
   - initial state 정의
   - actions & reducers 작성
   - reducer export

✅ 5. Components 작성
   - ProductList (목록 컴포넌트)
   - ProductFilters (필터 컴포넌트)
   - 로딩/에러 상태 처리

✅ 6. Custom Hook 작성
   - useProducts 통합 훅
   - Redux 상태 연동
   - RTK Query 연동

✅ 7. Feature Index 통합
   - Store, Types, Hooks, Components export

✅ 8. Page 작성
   - Dynamic Reducer Pattern 적용
   - useInjectReducer 사용
   - 컴포넌트 구조화

✅ 9. Redux Store 등록
   - UI 리듀서 등록
   - API 리듀서 등록

✅ 10. 빌드 및 테스트
   - npm run build 성공
   - 페이지 라우팅 정상 작동
   - MSW 목킹 데이터 표시
   - 필터/정렬 기능 작동
```

---

## 🚀 실행 순서

### 1. 개발 서버 실행

```bash
npm run dev
```

### 2. 브라우저 접속

```
http://localhost:3000/products
```

### 3. 기능 확인

- ✅ MSW로 목킹된 데이터 표시
- ✅ 필터 기능 (검색, 상태, 카테고리)
- ✅ 로딩 상태 표시
- ✅ 에러 핸들링
- ✅ 페이지네이션

---

## 📚 추가 참고자료

### 관련 문서

- [Next.js App Router](https://nextjs.org/docs/app)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [MSW (Mock Service Worker)](https://mswjs.io/)
- [TypeScript](https://www.typescriptlang.org/)

### 프로젝트 내 참고 파일

- `src/features/dashboard/` - Dashboard Feature 예시
- `src/mocks/handlers/dashboard.ts` - MSW 핸들러 예시
- `src/app/(dashboard)/dashboard/page.tsx` - Dynamic Reducer Pattern 예시

---

## 🎯 핵심 패턴 요약

### 1. **MSW First**
API 정의 없이 MSW로 먼저 목킹 → 프론트엔드 독립 개발 가능

### 2. **Type Safety**
모든 레이어에서 TypeScript 타입 정의 → 컴파일 타임 에러 방지

### 3. **Separation of Concerns**
- **API Slice**: 서버 데이터 (RTK Query) - 전역 로드
- **UI Slice**: 클라이언트 상태 (Redux Toolkit) - 페이지 주입
- **Selectors**: 별도 파일 분리 (`store/{feature}Selectors.ts`)
- 분리된 관심사 → 유지보수성 향상

### 4. **Code Splitting**
- **API Reducers**: 초기에 전역 로드 (`src/store/api/config.ts`)
- **UI Reducers**: 페이지 진입 시 지연 로딩 (`useInjectReducer`)
- **isReady 패턴**: 안전한 렌더링 보장
- 초기 번들 크기 최적화

### 5. **Consistent Structure**
모든 Feature가 동일한 패턴 따름 → 온보딩 및 협업 효율화

### 6. **Selector-Based Hooks**
- Inline selectors 대신 별도 selector 파일 사용
- `createSelector`로 메모이제이션 자동화
- 다중 재사용 가능한 hooks export (`useProducts`, `useProductsFilters`, 등)

---

이 워크플로우를 따르면 일관된 구조로 신규 Feature를 효율적으로 개발할 수 있습니다! 🚀
