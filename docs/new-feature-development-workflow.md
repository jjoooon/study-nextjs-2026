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

**`src/features/products/hooks/useProducts.ts`**

```typescript
/**
 * useProducts Hook
 *
 * 제품 관련 기능을 통합하는 커스텀 훅
 */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState } from '@/store';
import { useGetProductsQuery } from '../store/apiSlice';
import { setFilters, setSort } from '../store/productsSlice';

// Typed hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Products 통합 Hook
 */
export function useProducts() {
  const dispatch = useAppDispatch();

  // Redux 상태
  const filters = useAppSelector((state) => state.products.filters);
  const sort = useAppSelector((state) => state.products.sort);
  const selectedProducts = useAppSelector((state) => state.products.selectedProducts);
  const viewMode = useAppSelector((state) => state.products.viewMode);

  // RTK Query
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
    ...filters,
    ...sort,
  });

  // 액션 핸들러
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(setFilters(newFilters));
  };

  const updateSort = (newSort: { sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    dispatch(setSort(newSort));
  };

  return {
    // 데이터
    products: productsData?.products || [],
    total: productsData?.total || 0,

    // 상태
    filters,
    sort,
    selectedProducts,
    viewMode,

    // 로딩 상태
    isLoading,
    isError,
    error,

    // 액션
    updateFilters,
    updateSort,
    refetch,
  };
}
```

---

## 7단계: Feature Index 통합

**`src/features/products/index.ts`**

```typescript
/**
 * Products Feature - 통합 내보내기
 *
 * 제품 관리 기능의 진입점
 */

// Store
export { productsApiSlice } from './store/apiSlice';
export { default as productsReducer } from './store/productsSlice';
export * from './store/productsSlice';

// Types
export * from './types';

// Hooks
export { useProducts, useAppDispatch, useAppSelector } from './hooks/useProducts';

// Components
export { ProductList } from './components/ProductList';
export { ProductFilters } from './components/ProductFilters';
```

---

## 8단계: Page 생성

**`src/app/(dashboard)/products/page.tsx`**

```typescript
'use client';

/**
 * Products Page - Dynamic Reducer Pattern
 *
 * 제품 관리 페이지
 */

import { useEffect, useState } from 'react';

import { productsReducer, useProducts, ProductList, ProductFilters } from '@/features/products';
import { useInjectReducer } from '@/store/reducers/hooks';

/**
 * Products 컴포넌트 (실제 내용)
 */
function ProductsContent() {
  const {
    products,
    filters,
    sort,
    isLoading,
    updateFilters,
    updateSort,
    refetch,
  } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">제품 관리 페이지</p>
        </div>

        {/* Filters */}
        <ProductFilters
          filters={filters}
          onFilterChange={updateFilters}
        />

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              총 {products.length}개의 제품
            </span>
            <div className="space-x-2">
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? '로딩 중...' : '새로고침'}
              </button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <ProductList
          products={products}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

/**
 * 메인 페이지 컴포넌트
 */
export default function Page() {
  const [isReady, setIsReady] = useState(false);

  // Dynamic Reducer Injection
  useInjectReducer('products', productsReducer, {
    priority: 23,
    ejectOnUnmount: false,
  });

  // 리듀서 주입 후 렌더링
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

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

  return <ProductsContent />;
}
```

---

## 9단계: Redux Store 등록

### 9.1 리듀서 등록

**`src/store/reducers.ts`**

```typescript
import { productsReducer } from '@/features/products';  // 추가

export const asyncReducers = {
  // 기존 리듀서...
  products: productsReducer,  // UI 리듀서
};
```

### 9.2 API Slice 등록

**`src/store/configureStore.ts`** (또는 해당 설정 파일)

```typescript
import { productsApiSlice } from '@/features/products';  // 추가

export const apiSlices = [
  dashboardApiSlice,
  productsApiSlice,  // API 리듀서
];
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
- API Slice: 서버 데이터 (RTK Query)
- UI Slice: 클라이언트 상태 (Redux Toolkit)
- 분리된 관심사 → 유지보수성 향상

### 4. **Code Splitting**
Dynamic Reducer Injection → 초기 번들 크기 최적화

### 5. **Consistent Structure**
모든 Feature가 동일한 패턴 따름 → 온보딩 및 협업 효율화

---

이 워크플로우를 따르면 일관된 구조로 신규 Feature를 효율적으로 개발할 수 있습니다! 🚀
