# Redux Toolkit 기본 지식

이 문서는 Redux Toolkit의 핵심 개념과 프로젝트에서의 사용법을 설명합니다.

## 목차

1. [Redux Toolkit이란?](#redux-toolkit이란)
2. [핵심 개념](#핵심-개념)
3. [Slice 만들기](#slice-만들기)
4. [Store 구성](#store-구성)
5. [Selectors 사용](#selectors-사용)
6. [비동기 처리](#비동기-처리)
7. [프로젝트 적용](#프로젝트-적용)

---

## Redux Toolkit이란?

### 정의

Redux Toolkit(RTK)은 **Redux 공식 팀이 권장하는 Redux 로직 작성을 위한 표준 방식**입니다.

### 왜 Redux Toolkit인가?

**기존 Redux의 문제점:**
- ❌ 설정이 너무 복잡함
- ❌ 보일러플레이트가 많음
- ❌ 불변성 유지를 위해 수동으로 spread 연산자 사용
- ❌ 비동기 처리를 위해 redux-thunk, redux-saga 등 추가 설정 필요

**Redux Toolkit의 해결책:**
- ✅ 간단한 설정 (configureStore)
- ✅ 보일러플레이트 감소 (createSlice)
- ✅ Immer로 불변성 자동 처리
- ✅ createAsyncAction으로 비동기 처리 내장
- ✅ TypeScript 완벽 지원

### 프로젝트의 버전

```json
{
  "@reduxjs/toolkit": "^2.5.0",
  "react-redux": "^9.2.0",
  "redux-persist": "^6.0.0"
}
```

**Redux Toolkit 2.5의 새로운 특징:**
- ✅ 개선된 TypeScript 타입 추론
- ✅ 더 나은 DevTools 통합
- ✅ Performance 최적화
- ✅ enhanced 패키지 구조

---

## 핵심 개념

### 1. configureStore

Redux Store를 생성하는 함수입니다.

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';

export const store = configureStore({
  reducer: {
    // 리듀서 등록
    products: productsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // 커스텀 미들웨어 추가
      logger
    ),
  devTools: process.env.NODE_ENV !== 'production',
});
```

### 2. createSlice

리듀서와 액션을 동시에 생성하는 함수입니다.

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products', // Slice 이름
  initialState,
  reducers: {
    // 동기 액션
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      // Immer가 불변성 자동 처리
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// 액션 생성자 자동 생성
export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setLoading,
  setError,
} = productsSlice.actions;

// 리듀서 내보내기
export default productsSlice.reducer;
```

### 3. createAsyncThunk

비동기 작업을 처리하는 thunk를 생성합니다.

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../services/productService';

// 비동기 thunk 생성
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // 액션 타입 prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts();
      return response.data;
    } catch (error) {
      // 에러 처리
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: ProductFormData, { rejectWithValue }) => {
    try {
      const response = await productService.createProduct(productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

**생성된 액션 타입:**
- `fetchProducts.pending` - 요청 시작
- `fetchProducts.fulfilled` - 요청 성공
- `fetchProducts.rejected` - 요청 실패

### 4. extraReducers

비동기 액션을 처리하는 리듀서입니다.

```typescript
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 동기 리듀서
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts.pending
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // fetchProducts.fulfilled
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      // fetchProducts.rejected
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createProduct
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
```

---

## Slice 만들기

### 완전한 Slice 예시

```typescript
// features/products/store/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../services/productService';
import { Product, ProductFormData } from '../types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

// ===== 비동기 Thunks =====
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '상품 목록을 불러올 수 없습니다');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '상품을 불러올 수 없습니다');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: ProductFormData, { rejectWithValue }) => {
    try {
      const response = await productService.createProduct(productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '상품 생성에 실패했습니다');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: ProductFormData }, { rejectWithValue }) => {
    try {
      const response = await productService.updateProduct(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '상품 수정에 실패했습니다');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '상품 삭제에 실패했습니다');
    }
  }
);

// ===== Slice =====
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 동기 액션들
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // 로컬 상태 업데이트 (서버 전송 없이)
    updateLocalProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createProduct
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // updateProduct
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })

      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      });
  },
});

// ===== 액션 생성자 내보내기 =====
export const {
  clearSelectedProduct,
  clearError,
  updateLocalProduct,
} = productsSlice.actions;

// ===== 리듀서 내보내기 =====
export default productsSlice.reducer;
```

---

## Store 구성

### 기본 Store 설정

```typescript
// redux/config.ts
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHook } from './hooks';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 특정 액션 타입은 직렬화 검사에서 제외
        ignoredActions: ['products/fetchProducts/fulfilled'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// RootState 타입 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 동적 리듀서 등록 (레지스트리 패턴)

```typescript
// redux/registry/reducer.ts
import { Reducer } from '@reduxjs/toolkit';

interface ReducerRegistry {
  [key: string]: Reducer;
}

const reducerRegistry: ReducerRegistry = {};

export const registerReducer = (key: string, reducer: Reducer) => {
  if (reducerRegistry[key]) {
    console.warn(`Reducer ${key} is already registered`);
  }
  reducerRegistry[key] = reducer;
};

export const unregisterReducer = (key: string) => {
  delete reducerRegistry[key];
};

export const getReducers = () => reducerRegistry;
```

### 루트 리듀서

```typescript
// redux/reducers/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import { getReducers } from '../registry/reducer';

// 항상 로드된 리듀서
import authReducer from '@/features/auth/store/authSlice';

const staticReducers = {
  auth: authReducer,
};

export const rootReducer = combineReducers({
  ...staticReducers,
  // 동적 리듀서
  ...getReducers(),
});

export type RootState = ReturnType<typeof rootReducer>;
```

### 커스텀 훅

```typescript
// redux/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './config';

// 타입 안전한 useDispatch 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 타입 안전한 useSelector 훅
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 동적 리듀서 주입 훅
export const useInjectReducer = (
  key: string,
  reducer: Reducer,
  options?: { ejectOnUnmount?: boolean }
) => {
  const dispatch = useAppDispatch();
  const isInjected = useRef(false);

  if (!isInjected.current) {
    registerReducer(key, reducer);
    dispatch({ type: '@@INIT/REDUCER' });
    isInjected.current = true;
  }

  useEffect(() => {
    return () => {
      if (options?.ejectOnUnmount) {
        unregisterReducer(key);
        dispatch({ type: '@@EJECT/REDUCER' });
      }
    };
  }, [key, dispatch, options]);
};
```

---

## Selectors 사용

### 기본 Selector

```typescript
// features/products/store/productsSelectors.ts
import { RootState } from '@/redux/config';

// 간단한 selectors
export const selectAllProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;

// 메모이제이된 selectors (성능 최적화)
import { createSelector } from '@reduxjs/toolkit';

export const selectProductsByCategory = createSelector(
  [selectAllProducts, (_state: RootState, category: string) => category],
  (products, category) => products.filter(p => p.category === category)
);

export const selectProductById = createSelector(
  [selectAllProducts, (_state: RootState, id: string) => id],
  (products, id) => products.find(p => p.id === id)
);

export const selectSortedProducts = createSelector(
  [selectAllProducts, (_state: RootState, sortBy: 'name' | 'price') => sortBy],
  (products, sortBy) => {
    return [...products].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });
  }
);
```

### 컴포넌트에서 사용

```typescript
// features/products/components/ProductList.tsx
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { fetchProducts, deleteProduct } from '../store/productsSlice';
import { selectAllProducts, selectProductsLoading } from '../store/productsSelectors';

export function ProductList() {
  const dispatch = useAppDispatch();

  // 상태 선택
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector(selectProductsLoading);

  // 액션 디스패치
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

### Redux Toolkit 2.x 최적화 팁

#### 1. Thunk 결과 타입 검증 (TypeScript 5.x)

```typescript
import { unwrapResult } from '@reduxjs/toolkit';

export function ProductForm() {
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: ProductFormData) => {
    const result = await dispatch(createProduct(data));

    // 타입 안전한 결과 검증
    if (createProduct.fulfilled.match(result)) {
      // 성공: result.payload는 Product 타입
      console.log('생성된 상품:', result.payload);
      router.push('/products');
    } else if (createProduct.rejected.match(result)) {
      // 실패: result.error는 SerializedError
      console.error('생성 실패:', result.error.message);
    }
  };
}
```

#### 2. listenerMiddleware 활용 (Redux Toolkit 1.9+)

```typescript
// redux/listenerMiddleware.ts
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { productsApi } from '@/features/products/services/productsApi';

export const listenerMiddleware = createListenerMiddleware();

// API 호출 성공 시 추가 작업 수행
listenerMiddleware.startListening({
  matcher: productsApi.endpoints.createProduct.matchFulfilled,
  effect: async (action, listenerApi) => {
    // 상품 생성 성공 시 알림 표시
    const { dispatch } = listenerApi;
    dispatch(showNotification({
      message: '상품이 생성되었습니다',
      type: 'success',
    }));
  },
});

// Store에 미들웨어 추가
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
```

#### 3. 코드 분할 지원 (RTK Query 2.x+)

```typescript
// productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
  }),
});

// 코드 분할 지원
export const useGetProductsQuery = productsApi.useGetProductsQuery;
export const useLazyGetProductsQuery = productsApi.useLazyGetProductsQuery;
```

---

## 비동기 처리

### createAsyncThunk 활용

```typescript
// 상품 생성 과정
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: ProductFormData, { rejectWithValue }) => {
    try {
      // 1. API 호출
      const response = await productService.createProduct(productData);

      // 2. 응답 데이터 반환
      return response.data;
    } catch (error: any) {
      // 3. 에러 처리
      return rejectWithValue(
        error.response?.data?.message || '상품 생성에 실패했습니다'
      );
    }
  }
);

// Slice에서 처리
extraReducers: (builder) => {
  builder
    .addCase(createProduct.pending, (state) => {
      // 로딩 상태 설정
      state.loading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      // 성공: 상태 업데이트
      state.loading = false;
      state.items.push(action.payload);
    })
    .addCase(createProduct.rejected, (state, action) => {
      // 실패: 에러 저장
      state.loading = false;
      state.error = action.payload as string;
    });
}
```

### 컴포넌트에서 사용

```typescript
export function ProductForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.products);

  const handleSubmit = async (data: ProductFormData) => {
    // thunk 디스패치
    const result = await dispatch(createProduct(data));

    // 결과 확인
    if (createProduct.fulfilled.match(result)) {
      // 성공
      console.log('상품 생성 성공:', result.payload);
      router.push('/products');
    } else {
      // 실패
      console.error('상품 생성 실패:', result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? '생성 중...' : '상품 생성'}
      </button>
    </form>
  );
}
```

---

## 프로젝트 적용

### 프로젝트의 Redux 구조

```
redux/
├── config.ts              # Store 설정
├── hooks.ts               # 커스텀 훅
├── reducers/              # 리듀서 통합
├── registry/              # 동적 리듀서 레지스트리
│   └── reducer.ts
├── storage.ts             # Redux Persist 스토리지
└── middleware/            # 커스텀 미들웨어
```

### 실제 사용 예시

```typescript
// features/products/sections/ListSection.tsx
'use client';

import { useEffect } from 'react';
import { useInjectReducer } from '@/redux/hooks';
import productsReducer from '../store/productsSlice';

export default function ListSection() {
  // 동적 리듀서 주입
  useInjectReducer('products', productsReducer, {
    ejectOnUnmount: true,
  });

  return <ProductListContent />;
}
```

---

## 요약

### Redux Toolkit 핵심 개념

1. **configureStore**: 간단한 Store 설정
2. **createSlice**: 리듀서와 액션 동시 생성
3. **createAsyncThunk**: 비동기 작업 처리
4. **extraReducers**: 비동기 액션 리듀서
5. **Immer**: 불변성 자동 처리
6. **Selectors**: 상태 선택 및 메모이제이션

### 프로젝트 적용 가이드

- **Slice**: Feature별로 파일 분리
- **동적 로딩**: 페이지 진입 시 리듀서 로드
- **TypeScript**: 전체 타입 안전성
- **에러 처리**: rejectWithValue로 에러 관리

### 다음 학습 단계

1. [RTK Query 기본 지식](./rtk-query-fundamentals.md) - 데이터 페칭 및 캐싱
2. [Zod 기본 지식](./zod-fundamentals.md) - 스키마 검증

---

## 참고 자료

- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
- [Redux Toolkit 튜토리얼](https://redux-toolkit.js.org/tutorials/essentials/part-1-overview-concepts)
- [Immer 문서](https://immerjs.github.io/immer/)
