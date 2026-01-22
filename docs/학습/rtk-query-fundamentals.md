# RTK Query 기본 지식

이 문서는 RTK Query의 핵심 개념과 프로젝트에서의 사용법을 설명합니다.

## 목차

1. [RTK Query란?](#rtk-query란)
2. [핵심 개념](#핵심-개념)
3. [API Slice 만들기](#api-slice-만들기)
4. [Hooks 생성](#hooks-생성)
5. [캐싱 전략](#캐싱-전략)
6. [에러 처리](#에러-처리)
7. [프로젝트 적용](#프로젝트-적용)

---

## RTK Query란?

### 정의

RTK Query는 **Redux Toolkit에 내장된 강력한 데이터 페칭 및 캐싱 라이브러리**입니다.

### 왜 RTK Query인가?

**기존 방식의 문제점:**
- ❌ 수동으로 로딩/에러 상태 관리
- ❌ 중복 요청 방지 로직 직접 구현
- ❌ 캐싱 로직 복잡함
- ❌ 코드가 반복됨

**RTK Query의 해결책:**
- ✅ 자동으로 로딩/에러 상태 관리
- ✅ 내장된 중복 요청 방지
- ✅ 자동 캐싱 및 무효화
- ✅ boilerplate 감소
- ✅ TypeScript 완벽 지원
- ✅ Code Splitting 지원

### 프로젝트에서의 사용

RTK Query는 Redux Toolkit 1.6+부터 내장되어 있습니다:

```json
{
  "@reduxjs/toolkit": "^2.5.0"
}
```

---

## 핵심 개념

### 1. createApi

API를 정의하는 함수입니다.

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API 정의
export const productsApi = createApi({
  reducerPath: 'productsApi', // 리듀서 경로
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Product'], // 캐시 태그
  endpoints: (builder) => ({
    // 엔드포인트 정의
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Product'], // 캐시 태그 제공
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'], // 캐시 무효화
    }),
  }),
});

// 자동 생성된 hooks
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
} = productsApi;
```

### 2. fetchBaseQuery

기본 설정이 포함된 fetch 래퍼입니다.

```typescript
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.example.com',
  prepareHeaders: (headers, { getState }) => {
    // 토큰 추가
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// 커스텀 baseQuery (에러 처리)
const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // 401 에러 시 리프레시
  if (result.error && result.error.status === 401) {
    // 리프레시 로직
  }

  return result;
};
```

### 3. Tags & Cache Invalidation

캐시 무효화 시스템입니다.

```typescript
export const productsApi = createApi({
  tagTypes: ['Product', 'User'], // 태그 정의

  endpoints: (builder) => ({
    // Query: 데이터 조회 (캐시 제공)
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Product'], // 이 데이터를 'Product' 태그와 연결
    }),

    // Mutation: 데이터 수정 (캐시 무효화)
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'], // 'Product' 태그와 연결된 캐시 무효화
    }),

    // 특정 ID만 무효화
    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id }, // 특정 상품만 무효화
        'Product', // 전체 목록도 무효화
      ],
    }),
  }),
});
```

---

## API Slice 만들기

### 완전한 API Slice 예시

```typescript
// features/products/services/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../types';

// 에러 타입
interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

// Base Query 설정
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    // 인증 토큰 추가
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// 에러 처리가 포함된 Base Query
const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  // 에러 처리
  if (result.error) {
    const { status, data } = result.error as ApiError;

    // 401 Unauthorized
    if (status === 401) {
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }

    // 403 Forbidden
    if (status === 403) {
      console.error('권한이 없습니다:', data?.message);
    }

    // 500 Server Error
    if (status >= 500) {
      console.error('서버 에러:', data?.message);
    }
  }

  return result;
};

// API 생성
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Product', 'ProductList'],
  endpoints: (builder) => ({
    // ===== Queries =====
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [
              { type: 'ProductList', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
            ]
          : [{ type: 'ProductList', id: 'LIST' }],
    }),

    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    searchProducts: builder.query<Product[], string>({
      query: (keyword) => `/products/search?q=${keyword}`,
      providesTags: (result) =>
        result
          ? [
              { type: 'ProductList', id: 'SEARCH' },
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
            ]
          : [{ type: 'ProductList', id: 'SEARCH' }],
    }),

    // ===== Mutations =====
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'ProductList', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<
      Product,
      { id: string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Product', id },
        { type: 'ProductList', id: 'LIST' },
      ],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Product', id },
        { type: 'ProductList', id: 'LIST' },
      ],
    }),
  }),
});

// Hooks 자동 생성
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
```

---

## Hooks 생성

### Query Hooks 사용

```typescript
// features/products/components/ProductList.tsx
import { useGetProductsQuery } from '../services/productsApi';

export function ProductList() {
  // Query Hook
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery(undefined, {
    // 옵션
    pollingInterval: 30000, // 30초마다 자동 리프레시
    refetchOnMountOrArgChange: true, // 마운트 시 항상 재요청
    refetchOnFocus: true, // 윈도우 포커스 시 재요청
    refetchOnReconnect: true, // 재연결 시 재요청
  });

  if (isLoading) return <Skeleton />;

  if (isError) {
    return (
      <div>
        <p>에러: {(error as any)?.data?.message}</p>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  }

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Mutation Hooks 사용

```typescript
// features/products/components/ProductForm.tsx
import { useCreateProductMutation } from '../services/productsApi';

export function ProductForm() {
  const [createProduct, { isLoading, isError, error }] =
    useCreateProductMutation();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const result = await createProduct(data).unwrap();

      // 성공 처리
      console.log('상품 생성 성공:', result);
      router.push('/products');
    } catch (err) {
      // 에러 처리
      console.error('상품 생성 실패:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
      {isError && (
        <div className="error">
          {(error as any)?.data?.message || '상품 생성에 실패했습니다'}
        </div>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? '생성 중...' : '상품 생성'}
      </button>
    </form>
  );
}
```

### Selectors 사용

```typescript
import { useGetProductsQuery } from '../services/productsApi';

export function ProductList() {
  // 기본 사용
  const { data } = useGetProductsQuery();

  // Selector로 특정 데이터 선택
  const electronicsProducts = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: data?.filter(p => p.category === 'electronics'),
    }),
  });

  // 여러 쿼리 조합
  const { data: products } = useGetProductsQuery();
  const { data: users } = useGetUsersQuery();

  const productsWithUsers = useMemo(() => {
    return products?.map(product => ({
      ...product,
      seller: users?.find(u => u.id === product.sellerId),
    }));
  }, [products, users]);
}
```

---

## 캐싱 전략

### 1. 기본 캐싱

```typescript
// 같은 요청은 자동으로 캐시됨
const { data: products1 } = useGetProductsQuery();
const { data: products2 } = useGetProductsQuery();
// products1과 products2는 같은 데이터 (캐시됨)
```

### 2. 태그 기반 캐싱

```typescript
export const productsApi = createApi({
  tagTypes: ['Product', 'ProductList'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['ProductList'], // 캐시 태그 제공
    }),

    createProduct: builder.mutation({
      query: (data) => ({ url: '/products', method: 'POST', body: data }),
      invalidatesTags: ['ProductList'], // ProductList 캐시 무효화
    }),
  }),
});
```

### 3. 선택적 캐싱

```typescript
const { data } = useGetProductsQuery(undefined, {
  // 캐시가 있어도 항상 다시 요청
  refetchOnMountOrArgChange: true,
});

// 특정 조건에서만 요청
const { data } = useGetProductQuery(id, {
  skip: !id, // id가 없으면 요청하지 않음
});
```

### 4. 수동 캐시 무효화

```typescript
import { useDispatch } from 'react-redux';
import { productsApi } from '../services/productsApi';

export function RefreshButton() {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    // 특정 엔드포인트 캐시 무효화
    dispatch(
      productsApi.util.invalidateTags([
        { type: 'ProductList', id: 'LIST' },
      ])
    );
  };

  return <button onClick={handleRefresh}>새로고침</button>;
}
```

---

## 에러 처리

### 기본 에러 처리

```typescript
const { data, error, isError } = useGetProductsQuery();

if (isError) {
  return <div>에러: {error.status}</div>;
}
```

### 상세 에러 처리

```typescript
const [createProduct, { error }] = useCreateProductMutation();

const handleSubmit = async (data: ProductFormData) => {
  try {
    await createProduct(data).unwrap();
  } catch (err) {
    // 에러 타입 확인
    if ('status' in err) {
      // FetchBaseQueryError
      const fetchError = err as FetchBaseQueryError;
      switch (fetchError.status) {
        case 400:
          console.error('잘못된 요청:', fetchError.data);
          break;
        case 401:
          console.error('인증 필요');
          break;
        case 500:
          console.error('서버 에러');
          break;
      }
    } else {
      // SerializedError
      console.error('알 수 없는 에러:', err.message);
    }
  }
};
```

### 커스텀 에러 BaseQuery

```typescript
const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // 에러 로깅
    console.error('API Error:', result.error);

    // 사용자 정의 에러 메시지
    return {
      error: {
        ...result.error,
        data: {
          ...result.error.data,
          message: '요청에 실패했습니다. 다시 시도해주세요.',
        },
      },
    };
  }

  return result;
};
```

---

## 프로젝트 적용

### Redux Store에 API 추가

```typescript
// redux/config.ts
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '@/features/products/services/productsApi';

export const store = configureStore({
  reducer: {
    // API 리듀서 추가
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
```

### Provider 설정

```typescript
// app/providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/config';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

---

## 요약

### RTK Query 핵심 개념

1. **createApi**: API 정의 및 자동 hooks 생성
2. **fetchBaseQuery**: 기본 설정이 포함된 fetch
3. **Tags**: 캐시 무효화 시스템
4. **Query Hooks**: 데이터 조회 (useGetProductsQuery)
5. **Mutation Hooks**: 데이터 수정 (useCreateProductMutation)
6. **자동 캐싱**: 중복 요청 방지

### 프로젝트 적용 가이드

- **API Slice**: Feature별로 분리
- **Tags**: 데이터 관계에 맞게 태그 설정
- **에러 처리**: unwrap()로 에러 캐치
- **캐싱**: invalidateTags로 캐시 무효화

### 다음 학습 단계

1. [Redux Toolkit 기본 지식](./redux-toolkit-fundamentals.md) - RTK 기초
2. [Zod 기본 지식](./zod-fundamentals.md) - 스키마 검증

---

## 참고 자료

- [RTK Query 공식 문서](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query 튜토리얼](https://redux-toolkit.js.org/tutorials/rtk-query)
- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
