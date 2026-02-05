# RTK Query 기본 지식

> **⚠️ 프로덕션 준비 참고사항**: 이 문서는 RTK Query의 기본 개념과 패턴을 소개합니다. 실제 프로덕션 환경에서는 추가적인 고려사항이 필요합니다:
> - 완전한 에러 처리 및 재시도 로직
> - 토큰 리프레시 흐름 구현
> - SSR/Server Component 데이터 패칭 전략
> - 테스트 및 디버깅 설정

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

RTK Query는 Redux Toolkit 1.6+부터 내장되어 있으며, 현재 프로젝트는 2.x 버전을 사용합니다:

```json
{
  "@reduxjs/toolkit": "^2.5.0"
}
```

> **버전 참고**: 1.x와 2.x 사이에는 주요 변경사항이 없지만, 2.x는 더 나은 TypeScript 지원과 성능 개선이 포함되어 있습니다.

---

## 핵심 개념

### 0. 필수 타입 정의

RTK Query를 사용할 때 필요한 타입들을 먼저 정의해야 합니다:

```typescript
// features/products/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  category: string;
}

// Redux 상태 타입
export type RootState = ReturnType<typeof store.getState>;

// RTK Query 에러 타입
export interface FetchBaseQueryError {
  status: number;
  data: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}
```

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
import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { Product, ProductFormData, RootState } from '../types';
import { authActions } from '@/features/auth/authSlice';

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

// 에러 처리가 포함된 Base Query (기본 버전)
// ⚠️ 참고: 프로덕션에서는 로깅 서비스, 재시도 로직, 토큰 리프레시가 필요합니다
const baseQueryWithErrorHandling: BaseQueryType<string, RootState, ExtraOptions> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  // 에러 처리
  if (result.error) {
    const { status, data } = result.error as ApiError;

    // 401 Unauthorized - 토큰 만료
    if (status === 401) {
      // ⚠️ window.location 직접 사용은 Next.js에서 권장되지 않습니다
      // 대신 다음 방법 중 하나를 사용하세요:
      // 1. Redux 액션 디스패치: api.dispatch(logout())
      // 2. Next.js Router 사용: router.push('/login')
      // 3. middleware에서 리다이렉트 처리

      // 간단한 예시 - 실제로는 인증 상태를 관리하는 redux slice에서 처리 권장
      api.dispatch(authActions.clearCredentials());
    }

    // 403 Forbidden
    if (status === 403) {
      // 프로덕션에서는 로깅 서비스 사용
      if (process.env.NODE_ENV === 'development') {
        console.error('권한이 없습니다:', data?.message);
      }
    }

    // 500 Server Error
    if (status >= 500) {
      if (process.env.NODE_ENV === 'development') {
        console.error('서버 에러:', data?.message);
      }
      // 프로덕션에서는 재시도 로직 또는 사용자 알림 추가 권장
    }
  }

  return result;
};

// 타입 정의
type BaseQueryType = typeof baseQuery;
interface ExtraOptions {
  // 필요한 경우 추가 옵션 정의
}

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
    // ⚠️ pollingInterval은 배터리 소모가 큽니다. 실시간 데이터가 필요한 경우 WebSocket을 고려하세요
    pollingInterval: 30000, // 30초마다 자동 리프레시
    refetchOnMountOrArgChange: true, // 마운트 시 항상 재요청 (캐시 무시)
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
import { useRouter } from 'next/navigation'; // App Router
// import { useRouter } from 'next/router'; // Pages Router

export function ProductForm() {
  const [createProduct, { isLoading, isError, error }] =
    useCreateProductMutation();
  const router = useRouter();

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

> **중요**: `'use client'` 지시어는 이 컴포넌트가 클라이언트 컴포넌트임을 나타냅니다. RTK Query는 클라이언트 상태 관리 라이브러리이므로, 항상 클라이언트 컴포넌트에서만 사용할 수 있습니다.

---

## Server-Side 데이터 패칭

### 문제: 클라이언트 전용 패칭의 한계

RTK Query를 클라이언트에서만 사용하면:
1. 서버에서 초기 데이터를 제공할 수 없음
2. SEO에 불리 (크롤러가 빈 페이지를 수집)
3. 콘텐츠 플리커링 발생 가능
4. 불필요한 클라이언트-서버 왕복

### 해결책 1: Pages Router (getServerSideProps)

```typescript
// pages/products/[id].tsx
import { wrapper } from '@/redux/config';
import { productsApi } from '@/features/products/services/productsApi';
import { useGetProductQuery } from '@/features/products/services/productsApi';

export default function ProductPage() {
  // 서버에서 미리 채워진 데이터를 사용
  const { data: product } = useGetProductQuery(productId);

  if (!product) return <div>Loading...</div>;

  return <ProductDetail product={product} />;
}

// 서버 사이드에서 데이터 미리 채우기
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.params!;
    // 서버에서 데이터 페칭
    await store.dispatch(
      productsApi.endpoints.getProduct.initiate(id)
    );

    return {
      props: { productId: id },
    };
  }
);
```

### 해결책 2: App Router (Server Components)

```typescript
// app/products/[id]/page.tsx
import { productsApi } from '@/features/products/services/productsApi';
import { ProductClient } from './ProductClient';

// 서버 컴포넌트에서 직접 데이터 페칭
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // 서버에서 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
    { cache: 'no-store' } // 또는 next: { revalidate: 60 }
  );

  if (!response.ok) {
    notFound();
  }

  const product = await response.json();

  // 클라이언트 컴포넌트에 초기 데이터 전달
  return <ProductClient initialProduct={product} />;
}
```

```typescript
// app/products/[id]/ProductClient.tsx
'use client';

import { useGetProductQuery } from '@/features/products/services/productsApi';

interface ProductClientProps {
  initialProduct: Product;
}

export function ProductClient({ initialProduct }: ProductClientProps) {
  // 초기 데이터가 있으므로 즉시 렌더링
  // 백그라운드에서 최신 데이터로 업데이트
  const { data: product } = useGetProductQuery(initialProduct.id, {
    // 서버에서 받은 데이터로 초기화 (hydration)
    skip: false,
  });

  return <ProductDetail product={product || initialProduct} />;
}
```

### 권장 패턴: 하이브리드 접근

```typescript
// 서버 컴포넌트: 정적/중요 데이터
// 클라이언트 (RTK Query): 사용자 특정 데이터, 실시간 업데이트

// app/page.tsx (서버 컴포넌트)
export default async function HomePage() {
  // SEO에 중요한 데이터는 서버에서 페칭
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <FeaturedProducts products={featuredProducts} />
      <UserDashboard /> {/* RTK Query 사용 */}
    </>
  );
}
```

---

## 테스트 전략

### MSW (Mock Service Worker) 통합

```typescript
// mocks/handlers.ts
import { rest } from 'msw';
import { productsApi } from '@/features/products/services/productsApi';

export const handlers = [
  // Query mocking
  rest.get('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', name: 'Product 1', price: 100 },
        { id: '2', name: 'Product 2', price: 200 },
      ])
    );
  }),

  // Mutation mocking
  rest.post('/api/products', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ id: '3', ...req.body })
    );
  }),

  // Error mocking
  rest.get('/api/products/error', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'Server error' })
    );
  }),
];
```

```typescript
// features/products/components/__tests__/ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';
import { store } from '@/redux/config';
import { ProductList } from '../ProductList';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductList', () => {
  it('상품 목록을 렌더링합니다', async () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // 로딩 상태
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();

    // 데이터 로드 완료
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });

  it('에러 상태를 처리합니다', async () => {
    server.use(
      rest.get('/api/products', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/에러/)).toBeInTheDocument();
    });
  });
});
```

---

## 성능 최적화

### 1. 데이터 정규화 (Entity Adapter)

대규모 데이터셋에서는 정규화가 필수적입니다:

```typescript
import { createEntityAdapter } from '@reduxjs/toolkit';

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const productsApi = createApi({
  // ...
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      transformResponse: (response: Product[]) => {
        // Entity Adapter로 정규화
        return productsAdapter.setAll(
          { ids: [], entities: {} },
          response
        ).entities;
      },
    }),
  }),
});
```

### 2. 선택적 리페칭

```typescript
const { data } = useGetProductsQuery(undefined, {
  // 마운트 시 항상 리페치 (신선도가 중요한 데이터)
  refetchOnMountOrArgChange: true,

  // 포커스 시 리페치 (실시간성이 중요한 데이터)
  refetchOnFocus: true,

  // 데이터 유효기간 (초)
  // 이 시간이 지나면 stale로 간주하여 다시 요청
  keepUnusedDataFor: 60,
});
```

### 3. 요청 취소

```typescript
export function ProductSearch() {
  const [query, setQuery] = useState('');

  // query가 변경되면 이전 요청은 자동으로 취소됨
  const { data } = useSearchProductsQuery(query, {
    // 검색어가 없으면 요청하지 않음
    skip: !query || query.length < 2,
  });

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### 4. 코드 스플리팅

```typescript
// 큰 API Slice는 분리
// features/products/api/productsSlice.ts
export const productsSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({ /* ... */ }),
  }),
});

// features/products/api/productsMutations.ts
export const productMutations = createApi({
  reducerPath: 'productMutations',
  baseQuery,
  endpoints: (builder) => ({
    createProduct: builder.mutation({ /* ... */ }),
  }),
});
```

---

## RTK Query vs 다른 라이브러리

### RTK Query가 적합한 경우

| 상황 | 이유 |
|------|------|
| 이미 Redux Toolkit 사용 중 | 중복 상태 관리 없음 |
| 복잡한 캐싱 로직 필요 | 강력한 태그 기반 시스템 |
| TypeScript 프로젝트 | 우수한 타입 지원 |
| 대규모 엔터프라이즈 앱 | 구조화된 접근법 |

| 다른 라이브러리가 적합한 경우 | 이유 |
|-------------------------------|------|
| React Query | 더 가볍고, React 중심적 |
| SWR | 더 간단한 API, 더 빠른 반응성 |
| tRPC | 완전한 타입 안전성, RPC 스타일 |
| 단순 fetch | 작은 규모, 복잡한 캐싱 불필요 |

---

## 요약

### RTK Query 핵심 개념

1. **createApi**: API 정의 및 자동 hooks 생성
2. **fetchBaseQuery**: 기본 설정이 포함된 fetch 래퍼
3. **Tags**: 캐시 무효화 시스템 (providesTags/invalidatesTags)
4. **Query Hooks**: 데이터 조회 (useGetProductsQuery)
5. **Mutation Hooks**: 데이터 수정 (useCreateProductMutation)
6. **자동 캐싱**: 중복 요청 방지, 캐시 공유

### 프로젝트 적용 가이드

- **API Slice**: Feature별로 분리하여 관리
- **Tags**: 데이터 관계에 맞는 태그 계층 구조 설계
- **에러 처리**: unwrap()로 에러 캐치, 커스텀 baseQuery로 중앙화
- **캐싱**: invalidateTags로 자동 캐시 무효화
- **타입**: 타입을 먼저 정의하고 API Slice 생성

### ⚠️ 프로덕션 체크리스트

- [ ] 토큰 만료 시 리프레시 로직 구현
- [ ] 재시도 로직 추가 (네트워크 실패, 5xx 에러)
- [ ] 로깅 서비스 연동 (console.error 대신)
- [ ] SSR/Server Component 데이터 패칭 전략
- [ ] MSW를 이용한 테스트 작성
- [ ] 데이터 정규화 (대규모 데이터셋)
- [ ] AbortController를 이용한 요청 취소
- [ ] Error Boundary로 에러 처리
- [ ] 성능 모니터링 (번들 크기, API 응답 시간)

### 다음 학습 단계

1. [Redux Toolkit 기본 지식](./redux-toolkit-fundamentals.md) - RTK 기초
2. [Zod 기본 지식](./zod-fundamentals.md) - 스키마 검증
3. [테스트 가이드](./testing-guide.md) - RTK Query 테스트 방법

### 다음 학습 단계

1. [Redux Toolkit 기본 지식](./redux-toolkit-fundamentals.md) - RTK 기초
2. [Zod 기본 지식](./zod-fundamentals.md) - 스키마 검증

---

## 참고 자료

- [RTK Query 공식 문서](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query 튜토리얼](https://redux-toolkit.js.org/tutorials/rtk-query)
- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
