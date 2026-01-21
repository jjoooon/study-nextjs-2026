# Products Feature Workflow

**제품 관리 기능의 아키텍처, 데이터 흐름, 구현 패턴**

## 📋 목차

1. [아키텍처 개요](#아키텍처-개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [페이지 워크플로우](#페이지-워크플로우)
4. [상태 관리 아키텍처](#상태-관리-아키텍처)
5. [컴포넌트 계층 구조](#컴포넌트-계층-구조)
6. [데이터 흐름](#데이터-흐름)
7. [핵심 패턴](#핵심-패턴)

---

## 🏗️ 아키텍처 개요

### 기술 스택

```
Next.js 16 App Router
├── Client Components ('use client')
├── Dynamic Reducer Injection (Redux)
├── RTK Query (API State Management)
├── URL-based State (Filters, Sort, ViewMode)
└── Zod (Form Validation)
```

### 레이어 구조

```
┌─────────────────────────────────────────────────┐
│  Pages Layer (app/sample/products/pages/)       │
│  - List.tsx, Detail.tsx, Edit.tsx, New.tsx      │
│  (래퍼 컴포넌트 → features/sections import)      │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Hooks Layer (features/products/hooks/)     │
│  - useProducts, useProduct, useProductForm  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Components Layer (features/products/...)   │
│  - ProductFilters, ProductForm, ProductList │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Services Layer (features/products/...)     │
│  - productService (RTK Query)               │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│  Store Layer (features/products/store/)     │
│  - productsUISlice (Redux UI State)         │
└─────────────────────────────────────────────┘
```

---

## 📁 디렉토리 구조

```
src/
├── app/sample/products/               # App Router 페이지
│   ├── [pageId]/                      # 동적 라우트
│   │   └── page.tsx                   # 진입점 (../pages/${pageId} import)
│   │
│   └── pages/                         # 페이지 래퍼 컴포넌트
│       ├── List.tsx                   # → ListSection
│       ├── Detail.tsx                 # → DetailSection
│       ├── Edit.tsx                   # → EditSection
│       └── New.tsx                    # → NewSection
│
└── features/products/                 # 제품 기능 모듈
    ├── sections/                      # 페이지 섹션 컴포넌트
    │   ├── ListSection.tsx            # 목록 페이지
    │   ├── DetailSection.tsx          # 상세 페이지
    │   ├── EditSection.tsx            # 수정 페이지
    │   └── NewSection.tsx             # 등록 페이지
    │
    ├── components/                    # UI 컴포넌트
    │   ├── ProductFilters.tsx         # 필터 컴포넌트
    │   ├── ProductForm.tsx            # 폼 컴포넌트
    │   ├── ProductList.tsx            # 테이블 뷰
    │   ├── ProductGrid.tsx            # 그리드 뷰
    │   └── ProductDetail.tsx          # 상세 정보
    │
    ├── hooks/                         # 비즈니스 로직 훅
    │   ├── useProducts.ts             # 목록 조회
    │   ├── useProduct.ts              # 단일 제품 조회
    │   ├── useProductForm.ts          # 폼 관리
    │   └── useProductsURLState.ts     # URL 상태 관리
    │
    ├── services/                      # API 서비스
    │   └── productService.ts          # RTK Query API
    │
    ├── store/                         # 상태 관리
    │   ├── productsUISlice.ts         # UI 상태 (Redux)
    │   └── productsSelectors.ts       # 상태 선택자
    │
    ├── types/                         # 타입 정의
    │   ├── apiTypes.ts                # API 타입
    │   ├── storeTypes.ts              # Store 타입
    │   └── uiTypes.ts                      # UI 타입
    │
    ├── constants/                     # 상수
    │   └── routes.ts                  # 경로 상수
    │
    └── utils/                         # 유틸리티
        ├── validation.ts              # Zod 스키마
        └── formatters.ts              # 데이터 포맷팅
```

---

### 페이지 래퍼 구조

**목적:** Next.js App Router와 Feature Sections 간의 계층 분리

```
[pageId]/page.tsx (동적 라우트)
    ↓
pages/XXXX.tsx (래퍼 컴포넌트)
    ↓
sections/XXXXSection.tsx (실제 컴포넌트)
```

**래퍼 파일 예시:**
```typescript
// app/sample/products/pages/Detail.tsx
import DetailSection from '@/features/products/sections/DetailSection';

export default function Page() {
  return <DetailSection />;
}
```

**장점:**
- ✅ Next.js 라우팅과 Feature 로직 분리
- ✅ 유연한 페이지 구조 변경 가능
- ✅ Feature 코드를 `features/`에 중앙화
- ✅ 테스트와 재사용성 향상

---

## 🔄 페이지 워크플로우

**아키텍처 개요: Page Wrapper Pattern**

```
src/app/sample/products/[pageId]/page.tsx (Page Wrapper)
  ↓
src/app/sample/products/pages/{List,Detail,Edit,New}.tsx (Page Wrapper)
  ↓
src/features/products/sections/{List,Detail,Edit,New}Section.tsx (실제 구현)
```

- **pages/**: Next.js App Router용 thin wrapper
- **sections/**: 실제 비즈니스 로직과 UI가 구현된 섹션 컴포넌트
- **장점**: 코드 분할, 재사용성, 테스트 용이성

---

### 1. 제품 목록 페이지 (List)

```
┌─────────────────────────────────────────────────────────────┐
│  /sample/products/List (List.tsx)                           │
│    ↓                                                        │
│  ListSection Import                                         │
│    ↓                                                        │
│  sections/ListSection.tsx                                   │
│    ↓                                                        │
│  useInjectReducer (Dynamic Reducer Injection)               │
│    ↓                                                        │
│  Content 컴포넌트                                            │
│    ↓                                                        │
│  useProducts Hook                                           │
│    ├────────────────────────────────────┐                   │
│    ↓                                    ↓                   │
│  useProductsURLState           useGetProductsQuery          │
│    ↓                                    ↓                   │
│  URL에서 필터/정렬/뷰모드         RTK Query API 호출          │
│    ↓                                    ↓                   │
│  ProductFilters                    ProductList/ProductGrid  │
│  정렬/뷰모드 컨트롤                       ↓                   │
│                                          │                  │
│                                    제품 클릭                 │
│                                          ↓                  │
│                                    Detail 페이지 이동        │
│                                    (쿼리 파라미터 보존)      │
└─────────────────────────────────────────────────────────────┘
```

**파일 구조:**

1. **Page Wrapper** (`src/app/sample/products/pages/List.tsx`)
   ```typescript
   import ListSection from '@/features/products/sections/ListSection';

   export default function Page() {
     return <ListSection />;
   }
   ```

2. **Section Component** (`src/features/products/sections/ListSection.tsx`)

**실행 흐름:**

1. **Dynamic Reducer Injection**
   ```typescript
   const { isReady } = useInjectReducer('products', productsReducer, {
     ejectOnUnmount: true,  // 페이지 이탈 시 리듀서 제거
   });
   ```

2. **useProducts Hook 호출**
   ```typescript
   const {
     products,        // API 데이터 (RTK Query)
     filters,         // URL 기반 필터
     sort,            // URL 기반 정렬
     viewMode,        // URL 기반 뷰모드
     updateFilters,   // URL 업데이트
     updateSort,      // 정렬 업데이트
     updateViewMode,  // 뷰모드 업데이트
   } = useProducts();
   ```

3. **URL 기반 상태 관리**
   ```
   /sample/products/List?search=laptop&category=subscription&sortBy=price&sortOrder=asc&viewMode=table
   ```
   - 페이지 새로고침해도 상태 유지
   - URL 공유 가능
   - 브라우저 뒤로/앞으로 가기 지원
   - **페이지 이동 간 쿼리 파라미터 보존**

4. **컴포넌트 렌더링**
   - `ProductFilters`: 검색, 상태, 카테고리 필터
   - `ProductList` (table) 또는 `ProductGrid` (grid)
   - 정렬 버튼 (이름, 가격, 등록일)
   - 뷰 모드 전환 (테이블/그리드)

5. **페이지 이동 시 쿼리 파라미터 보존**
   ```typescript
   const handleProductClick = (product) => {
     const params = new URLSearchParams(searchParams.toString());
     params.set('id', product.id);
     router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);
   };
   ```

### 2. 제품 상세 페이지 (Detail)

```
┌─────────────────────────────────────────────────────────────┐
│  /sample/products/Detail (Detail.tsx)                      │
│    ↓                                                        │
│  DetailSection Import                                       │
│    ↓                                                        │
│  sections/DetailSection.tsx                                │
│    ↓                                                        │
│  URL에서 id 추출 (쿼리 파라미터)                            │
│    ↓                                                        │
│  useInjectReducer                                          │
│    ↓                                                        │
│  Content 컴포넌트                                            │
│    ↓                                                        │
│  useProduct Hook                                            │
│    ↓                                                        │
│  useGetProductByIdQuery                                     │
│    ↓                                                        │
│  ProductDetail 컴포넌트                                     │
│    ↓                                                        │
│  사용자 액션                                                │
│    ├─ 수정 → Edit 페이지 이동 (쿼리 파라미터 보존)          │
│    ├─ 삭제 → deleteProduct → 목록 페이지 이동 (상태 보존)    │
│    └─ 뒤로 → 목록 페이지 이동 (필터 상태 보존)               │
└─────────────────────────────────────────────────────────────┘
```

**파일 구조:**

1. **Page Wrapper** (`src/app/sample/products/pages/Detail.tsx`)
   ```typescript
   import DetailSection from '@/features/products/sections/DetailSection';

   export default function Page() {
     return <DetailSection />;
   }
   ```

2. **Section Component** (`src/features/products/sections/DetailSection.tsx`)

**실행 흐름:**

1. **쿼리 파라미터에서 ID 추출**
   ```typescript
   const searchParams = useSearchParams();
   const id = searchParams.get('id') as string;
   ```

2. **useProduct Hook**
   ```typescript
   const { product, isLoading, isDeleting, deleteProduct } = useProduct(id);
   ```

3. **삭제 처리**
   ```typescript
   const handleDelete = () => {
     deleteProduct();  // → 목록 페이지로 자동 이동
   };
   ```

4. **쿼리 파라미터 보존**
   ```typescript
   // 목록 → 상세 이동 시 필터 상태 유지
   router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);

   // 상세 → 목록 복귀 시 필터 상태 유지
   const returnURL = `${PRODUCTS_ROUTES.LIST}?${searchParams.toString()}`;
   router.push(returnURL);

   // 상세 → 수정 이동 시 필터 상태 유지
   const params = new URLSearchParams(searchParams.toString());
   params.set('id', product.id);
   router.push(`${PRODUCTS_ROUTES.EDIT}?${params.toString()}`);
   ```

### 3. 제품 수정 페이지 (Edit)

```
┌─────────────────────────────────────────────────────────────┐
│  /sample/products/Edit (Edit.tsx)                          │
│    ↓                                                        │
│  EditSection Import                                         │
│    ↓                                                        │
│  sections/EditSection.tsx                                  │
│    ↓                                                        │
│  URL에서 id 추출 (쿼리 파라미터)                            │
│    ↓                                                        │
│  useInjectReducer                                          │
│    ↓                                                        │
│  Content 컴포넌트                                            │
│    ↓                                                        │
│  useProductForm Hook                                        │
│    ↓                                                        │
│  useGetProductByIdQuery                                     │
│    ↓                                                        │
│  initialData 로드                                           │
│    ↓                                                        │
│  ProductForm 초기값                                         │
│    ↓                                                        │
│  사용자 수정                                                 │
│    ↓                                                        │
│  handleSubmit                                               │
│    ↓                                                        │
│  Zod 검증                                                   │
│    ├─ 검증 성공 → updateProduct → 목록 이동 (상태 보존)       │
│    └─ 검증 실패 → 에러 표시                                 │
│                                                           │
│  취소 → Detail 페이지 이동 (쿼리 파라미터 보존)              │
└─────────────────────────────────────────────────────────────┘
```

**파일 구조:**

1. **Page Wrapper** (`src/app/sample/products/pages/Edit.tsx`)
   ```typescript
   import EditSection from '@/features/products/sections/EditSection';

   export default function Page() {
     return <EditSection />;
   }
   ```

2. **Section Component** (`src/features/products/sections/EditSection.tsx`)

**실행 흐름:**

1. **제품 데이터 로드**
   ```typescript
   const { initialData, isLoading, isSubmitting, updateProduct } = useProductForm(id);
   ```

2. **ProductForm 초기화**
   ```typescript
   <ProductForm
     initialData={initialData}  // 제품 데이터로 초기화
     mode="update"
     onSubmit={handleSubmit}
     onCancel={handleCancel}
     isSubmitting={isSubmitting}
   />
   ```

3. **Zod 검증** (ProductForm 내부)
   ```typescript
   const validate = (): boolean => {
     const result = createProductSchema.safeParse(formData);
     if (!result.success) {
       setErrors(zodToFieldErrors(result.error));
       return false;
     }
     return true;
   };
   ```

4. **제출 처리**
   ```typescript
   const handleSubmit = async (data: UpdateProductInput) => {
     const result = await updateProduct(data);
     if (result) {
       router.push(returnURL);  // 필터 상태 유지하며 목록으로
     }
     return result;
   };
   ```

5. **취소 처리**
   ```typescript
   const handleCancel = () => {
     const params = new URLSearchParams(searchParams.toString());
     router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);
   };
   ```

---

### 4. 제품 등록 페이지 (New)

```
┌─────────────────────────────────────────────────────────────┐
│  /sample/products/New (New.tsx)                            │
│    ↓                                                        │
│  NewSection Import                                          │
│    ↓                                                        │
│  sections/NewSection.tsx                                   │
│    ↓                                                        │
│  useInjectReducer                                          │
│    ↓                                                        │
│  Content 컴포넌트                                            │
│    ↓                                                        │
│  useProductForm Hook                                        │
│    ↓                                                        │
│  ProductForm 빈 상태                                        │
│    ↓                                                        │
│  사용자 입력                                                 │
│    ↓                                                        │
│  handleSubmit                                               │
│    ↓                                                        │
│  Zod 검증                                                   │
│    ├─ 검증 성공 → createProduct → 목록 이동 (상태 보존)       │
│    └─ 검증 실패 → 에러 표시                                 │
│                                                           │
│  취소 → 목록 페이지 이동 (쿼리 파라미터 보존)                │
└─────────────────────────────────────────────────────────────┘
```

**파일 구조:**

1. **Page Wrapper** (`src/app/sample/products/pages/New.tsx`)
   ```typescript
   import NewSection from '@/features/products/sections/NewSection';

   export default function Page() {
     return <NewSection />;
   }
   ```

2. **Section Component** (`src/features/products/sections/NewSection.tsx`)

**실행 흐름:**

1. **빈 폼 생성**
   ```typescript
   const { createProduct, isSubmitting } = useProductForm();

   <ProductForm
     mode="create"
     onSubmit={handleSubmit}
     onCancel={handleCancel}
     isSubmitting={isSubmitting}
   />
   ```

2. **제출 처리**
   ```typescript
   const handleSubmit = async (data: CreateProductInput) => {
     const result = await createProduct(data);
     if (result) {
       router.push(returnURL);  // 필터 상태 유지하며 목록으로
     }
     return result;
   };
   ```

3. **취소 처리**
   ```typescript
   const handleCancel = () => {
     router.push(returnURL);  // 필터 상태 유지하며 목록으로
   };
   ```

---

## 🗄️ 상태 관리 아키텍처

### 하이브리드 상태 관리 전략

```
┌─────────────────────────────────────────────────────┐
│  URL Query Parameters (영구적 상태)                  │
│  - filters.search, filters.status, filters.category │
│  - sort.sortBy, sort.sortOrder                      │
│  - viewMode (table | grid)                          │
│                                                     │
│  관리: useProductsURLState Hook                     │
│  저장소: URL (브라우저 주소창)                       │
│  지속성: 페이지 새로고침, URL 공유, 북마크            │
└─────────────────────────────────────────────────────┘
                        ↕ (useProducts URL State)
┌─────────────────────────────────────────────────────┐
│  RTK Query Cache (API 상태)                         │
│  - products, product (API 데이터)                    │
│  - isLoading, isError (API 상태)                    │
│                                                     │
│  관리: productService (RTK Query)                   │
│  저장소: Redux Store (normalized cache)              │
│  지속성: 5-10분 캐시, 자동 refetch                   │
└─────────────────────────────────────────────────────┘
                        ↕ (useAppSelector)
┌─────────────────────────────────────────────────────┐
│  Redux UI State (일시적 상태)                       │
│  - selectedProducts (선택된 제품 IDs)                │
│                                                     │
│  관리: productsUISlice (Redux Toolkit)              │
│  저장소: Redux Store                                │
│  지속성: 페이지 이탈 시 소멂                         │
└─────────────────────────────────────────────────────┘
```

### 상태 관리 코드 흐름

#### 1. URL 상태 (filters, sort, viewMode)

```typescript
// hooks/useProductsURLState.ts
export const useProductsURLState = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 상태 읽기
  const filters = {
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    category: searchParams.get('category') || '',
  };

  const sort = {
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
  };

  const viewMode = (searchParams.get('viewMode') || 'table') as 'table' | 'grid';

  // URL 업데이트
  const updateFilters = (newFilters: typeof filters) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', newFilters.search);
    params.set('status', newFilters.status);
    params.set('category', newFilters.category);
    router.push(`?${params.toString()}`);
  };

  return { filters, sort, viewMode, updateFilters, updateSort, updateViewMode };
};
```

#### 2. API 상태 (RTK Query)

```typescript
// services/productService.ts
export const productService = createApi({
  reducerPath: 'productsService',
  baseQuery,

  tagTypes: ['Products-LIST', 'Products-ITEM'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => `/products?${buildQueryString(params)}`,
      providesTags: ['Products-LIST'],
      keepUnusedDataFor: 300,  // 5분 캐시
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products-LIST'],  // 목록 자동 refetch
    }),
  }),
});

// 자동 생성된 Hook
export const { useGetProductsQuery, useCreateProductMutation } = productService;
```

#### 3. UI 상태 (Redux)

```typescript
// store/productsUISlice.ts
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    selectedProducts: [] as number[],
  },
  reducers: {
    toggleProductSelection: (state, action) => {
      const index = state.selectedProducts.indexOf(action.payload);
      if (index === -1) {
        state.selectedProducts.push(action.payload);
      } else {
        state.selectedProducts.splice(index, 1);
      }
    },
  },
});
```

#### 4. 통합 Hook (useProducts)

```typescript
// hooks/useProducts.ts
export const useProducts = () => {
  // 1️⃣ URL 상태
  const { filters, sort, viewMode, updateFilters, updateSort, updateViewMode } =
    useProductsURLState();

  // 2️⃣ Redux UI 상태
  const selectedProducts = useAppSelector(selectSelectedProducts);

  // 3️⃣ RTK Query API 상태 (URL 상태를 쿼리 파라미터로 전달)
  const { data: productsData, isLoading, refetch } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
    search: filters.search || undefined,
    status: filters.status || undefined,
    category: filters.category || undefined,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  });

  return {
    // API 데이터
    products: productsData?.products || [],
    total: productsData?.total || 0,
    isLoading,

    // URL 상태 (필터, 정렬, 뷰모드)
    filters,
    sort,
    viewMode,
    updateFilters,  // URL 업데이트
    updateSort,
    updateViewMode,

    // Redux UI 상태 (선택된 제품)
    selectedProducts,
    toggleProductSelection: (id) =>
      dispatch({ type: 'products/toggleProductSelection', payload: id }),

    // API Actions
    refetch,
  };
};
```

---

## 🎨 컴포넌트 계층 구조

### List 페이지 컴포넌트 트리

```
[pageId]/page.tsx (Dynamic Route)
└── List.tsx (Wrapper)
    └── ListSection
        ├── ProductsPageContent
            ├── ProductFilters
    │   ├── 검색 입력
    │   ├── 상태 선택
    │   └── 카테고리 선택
    │
    ├── 정렬/뷰모드 컨트롤
    │   ├── 정렬 버튼 (이름, 가격, 등록일)
    │   └── 뷰 모드 전환 (테이블/그리드)
    │
    └── ProductList (table) 또는 ProductGrid (grid)
        ├── ProductListItem
        └── ...
```

### Detail 페이지 컴포넌트 트리

```
[pageId]/page.tsx (Dynamic Route)
└── Detail.tsx (Wrapper)
    └── DetailSection
        └── ProductDetailPageContent
            └── ProductDetail
        ├── 제품 정보 표시
        ├── 버튼 그룹
        │   ├── 수정 버튼 → Edit 페이지
        │   ├── 삭제 버튼 → deleteProduct()
        │   └── 뒤로 버튼 → List 페이지
        └── 삭제 중 로딩 오버레이
```

### Edit/New 페이지 컴포넌트 트리

```
[pageId]/page.tsx (Dynamic Route)
└── Edit.tsx / New.tsx (Wrapper)
    └── EditSection / NewSection
        └── EditProductPageContent / NewProductPageContent
            └── ProductForm
        ├── 제품명 입력
        ├── 가격 입력
        ├── 카테고리 선택
        ├── 상태 선택
        ├── 설명 입력
        └── 버튼 그룹
            ├── 제출 버튼 → handleSubmit()
            └── 취소 버튼 → handleCancel()
```

---

## 📊 데이터 흐름

### 1. 목록 조회 데이터 흐름

```
┌─────────────────────────────────────────────────────┐
│  1. 사용자 필터 변경                                 │
│     filters.search = 'laptop'                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  2. updateFilters() 호출                             │
│     URL ?search=laptop 업데이트                     │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  3. useProducts URL State 변경 감지                 │
│     filters.search = 'laptop'                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  4. useGetProductsQuery 자동 refetch                │
│     useGetProductsQuery({ search: 'laptop' })       │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  5. productService.getProducts() API 호출           │
│     GET /products?search=laptop                     │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  6. RTK Query 캐시 업데이트                         │
│     productsData.products = [...]                   │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  7. ProductList/ProductGrid 자동 리렌더링          │
│     products prop로 전달된 새 데이터 반영            │
└─────────────────────────────────────────────────────┘
```

### 2. 제품 생성 데이터 흐름

```
┌─────────────────────────────────────────────────────┐
│  1. 사용자 폼 제출                                   │
│     handleSubmit(formData)                          │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  2. Zod 검증                                         │
│     createProductSchema.safeParse(formData)         │
└─────────────────┬───────────────────────────────────┘
                  │
          ┌───────┴───────┐
          │               │
     검증 성공        검증 실패
          │               │
          ▼               ▼
┌─────────────────┐  ┌─────────────────┐
│ 3. createProduct│  │ 에러 메시지 표시 │
│    mutation     │  └─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  4. POST /products API 호출                         │
│     productService.createProduct(data)             │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  5. RTK Query 자동 캐시 무효화                       │
│     invalidatesTags: ['Products-LIST']             │
│     → 목록 자동 refetch                              │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  6. 목록 페이지로 이동                               │
│     router.push(returnURL)                          │
│     (필터 상태 유지)                                 │
└─────────────────────────────────────────────────────┘
```

### 3. 제품 삭제 데이터 흐름

```
┌─────────────────────────────────────────────────────┐
│  1. 사용자 삭제 버튼 클릭                            │
│     handleDelete()                                  │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  2. 확인 다이얼로그                                   │
│     confirm('정말 이 제품을 삭제하시겠습니까?')     │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  3. deleteProduct mutation                          │
│     useDeleteProductMutation()                      │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  4. DELETE /products/:id API 호출                   │
│     productService.deleteProduct(id)                │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  5. RTK Query 자동 캐시 무효화                       │
│     invalidatesTags: ['Products-LIST',              │
│                       { type: 'Products-ITEM', id }]│
│     → 목록 자동 refetch                              │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│  6. 목록 페이지로 이동                               │
│     router.push('/products')                         │
└─────────────────────────────────────────────────────┘
```

---

## 🔑 핵심 패턴

### 1. Dynamic Reducer Injection

**목적:** Code Splitting으로 초기 번들 크기 최적화

```typescript
// List.tsx
export default function ProductsPage() {
  const { isReady } = useInjectReducer('products', productsReducer, {
    ejectOnUnmount: true,  // 페이지 이탈 시 리듀서 제거
  });

  if (!isReady) {
    return <LoadingSpinner />;  // 리듀서 로딩 대기
  }

  return <ProductsPageContent />;
}
```

**장점:**
- 필요한 시점에 리듀서 로드
- 메모리 효율성
- 초기 로딩 속도 향상

### 2. URL-based State Management

**목적:** 영구적 상태를 URL에 저장하여 페이지 새로고침에도 유지

```typescript
// URL에 상태 저장
/sample/products/List?search=laptop&status=active&category=subscription&sortBy=price&sortOrder=asc&viewMode=table

// 코드에서 URL 업데이트
const updateFilters = (newFilters) => {
  const params = new URLSearchParams();
  params.set('search', newFilters.search);
  params.set('status', newFilters.status);
  router.push(`?${params.toString()}`);
};

// URL에서 상태 복원
const filters = {
  search: searchParams.get('search') || '',
  status: searchParams.get('status') || '',
};
```

**장점:**
- 페이지 새로고침해도 상태 유지
- URL 공유 가능 (상태 포함)
- 브라우저 뒤로/앞으로 가기 지원
- 북마크 가능

### 3. RTK Query 자동 캐싱

**목적:** API 데이터 자동 캐싱 및 refetch

```typescript
// 서비스 정의
export const productService = createApi({
  tagTypes: ['Products-LIST', 'Products-ITEM'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      providesTags: ['Products-LIST'],
      keepUnusedDataFor: 300,  // 5분 캐시
    }),

    createProduct: builder.mutation({
      invalidatesTags: ['Products-LIST'],  // 생성 후 목록 자동 refetch
    }),

    deleteProduct: builder.mutation({
      invalidatesTags: ['Products-LIST', { type: 'Products-ITEM', id }],
    }),
  }),
});

// ⚠️ 중요: RTK Query service 생성 후 API_REGISTRY에 등록 필수!
// src/redux/api/config.ts의 API_REGISTRY 배열에 추가
// { api: productService, priority: 50, name: 'productsService' }
// 자세한 내용은 "7. Registry Pattern" 참조
```

**장점:**
- 자동 캐싱 (불필요한 API 호출 감소)
- 자동 refetch (mutation 후)
- 캐시 무효화 전략 (tagTypes)

### 4. Zod 폼 검증

**목적:** 타입 안전한 폼 검증

```typescript
// Zod 스키마 정의
export const createProductSchema = z.object({
  name: z.string().min(1, '제품명을 입력하세요'),
  price: z.number().min(0, '가격은 0 이상이어야 합니다'),
  category: z.enum(['subscription', 'one-time']),
  status: z.enum(['active', 'inactive', 'archived']),
  description: z.string().min(10, '설명은 10자 이상이어야 합니다'),
});

// 실시간 검증
const handleChange = (field, value) => {
  const fieldSchema = createProductSchema.shape[field];
  fieldSchema.parse(value);  // 검증
};

// 제출 시 전체 검증
const handleSubmit = async (data) => {
  const result = createProductSchema.safeParse(data);
  if (!result.success) {
    setErrors(zodToFieldErrors(result.error));
    return;
  }
  await onSubmit(data);
};
```

**장점:**
- 타입 안전성 (TypeScript와 자동 연동)
- 실시간 필드 검증
- 사용자 정의 에러 메시지
- 재사용 가능한 스키마

### 5. 쿼리 파라미터 보존

**목적:** 페이지 이동 간 필터 상태 유지

```typescript
// List → Detail 이동 시 필터 보존
const handleProductClick = (product) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set('id', product.id);
  router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);
  // /sample/products/Detail?search=laptop&category=subscription&id=123
};

// Detail → List 복귀 시 필터 복원
const returnURL = `${PRODUCTS_ROUTES.LIST}?${searchParams.toString()}`;
const handleBack = () => {
  router.push(returnURL);
  // /sample/products/List?search=laptop&category=subscription
};
```

**장점:**
- 사용자 경험 향상 (필터 재설정 불필요)
- 탐색 흐름 유지
- 상태 공유 가능

### 6. Custom Hook 패턴

**목적:** 비즈니스 로직 재사용 및 테스트 용이성

```typescript
// 목록 조회 로직 캡슐화
export const useProducts = () => {
  const { filters, sort, viewMode, updateFilters, updateSort, updateViewMode } =
    useProductsURLState();

  const { data, isLoading } = useGetProductsQuery({
    search: filters.search,
    sortBy: sort.sortBy,
    // ...
  });

  return {
    products: data?.products || [],
    isLoading,
    filters,
    sort,
    viewMode,
    updateFilters,
    updateSort,
    updateViewMode,
  };
};

// 페이지에서 사용
function ProductsPageContent() {
  const { products, filters, updateFilters } = useProducts();
  // 복잡한 상태 관리 로직이 숨겨짐
}
```

**장점:**
- 로직 재사용성
- 테스트 용이성 (Hooks 단위 테스트)
- 컴포넌트 간결성
- 관심사 분리

---

### 7. Registry Pattern (Reducer + Middleware)

**목적:** 중앙 집중식 store config 수정 없이 동적 등록

**두 가지 Registry:**
1. **API_REGISTRY**: RTK Query services 중앙 등록 (`src/redux/api/config.ts`)
2. **middlewareRegistry**: Custom middleware 동적 등록 (`src/redux/registry/middleware.ts`)

```typescript
// 1️⃣ RTK Query Service 생성
// services/productService.ts
import { createApi } from '@reduxjs/toolkit/query/react';

export const productsService = createApi({
  reducerPath: 'productsService',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProducts: builder.query({ ... }),
    createProduct: builder.mutation({ ... }),
  }),
});

// 2️⃣ API_REGISTRY에 등록 (src/redux/api/config.ts)
import { productsService } from '@/features/products/services/productService';

export const API_REGISTRY = [
  // Core APIs (우선순위 10-19)
  { api: authService, priority: 10, name: 'authService' },

  // Feature APIs (우선순위 50-59)
  { api: dashboardService, priority: 50, name: 'dashboardService' },
  { api: productsService, priority: 50, name: 'productsService' }, // ✅ 새 API 추가
  // { api: analyticsApiSlice, priority: 54, name: 'analyticsApi' },
] as const;

// 3️⃣ 자동 처리 (src/redux/api/registry.ts)
// - registerAllApiReducers(): reducer 자동 등록
// - getAllApiMiddleware(): middleware 자동 반환
// - 수동으로 middlewareRegistry.registerMiddleware() 호출 불필요!
```

**주요 사용처:**

**1️⃣ API_REGISTRY (RTK Query Services):**
- ✅ **가장 일반적인 용도**: 새 RTK Query service 추가
- 📍 위치: `src/redux/api/config.ts`
- 🔄 자동 처리: reducer + middleware 모두 자동 등록

**2️⃣ middlewareRegistry (Custom Middleware):**
- Performance monitoring middleware
- Custom logging middleware
- Error handling middleware
- Analytics middleware

**우선순위 가이드 (API_REGISTRY):**
- **10-19**: Core APIs (authService 등)
- **50-59**: Feature APIs (dashboardService, productsService 등)

**우선순위 가이드 (middlewareRegistry):**
- **0-9**: 핵심 체크 (직렬화, 불변성)
- **10-29**: 성능 및 모니터링
- **30-49**: 로깅
- **50-99**: API 미들웨어 (수동 등록 시)
- **100+**: 에러 처리, 분석

**아키텍처 통합:**
```
[RTK Query Service 추가 시]
1. Service 생성 (createApi)
   ↓
2. API_REGISTRY에 등록 (src/redux/api/config.ts)
   ↓
3. 자동 처리 (src/redux/api/registry.ts)
   - registerAllApiReducers() → reducer 자동 등록
   - getAllApiMiddleware() → middleware 자동 반환

[Custom Middleware 추가 시]
1. Middleware 생성
   ↓
2. middlewareRegistry.registerMiddleware(name, middleware, priority)
   ↓
3. configureMiddleware() → middlewareRegistry.getAllMiddleware()
   ↓
4. Store에 합체
```

**장점:**
- **RTK Query Services**: API_REGISTRY에 한 줄 추가하면 reducer + middleware 자동 처리
- **Custom Middleware**: 수동으로 middlewareRegistry에 등록 가능
- 팀별 독립적 개발 (merge conflict 방지)
- 우선순위 기반 순서 관리
- 스토어 설정 파일 수정 불필요

**연관 패턴:**
- **3. RTK Query 자동 캐싱**: RTK Query service 생성 후 API_REGISTRY에 등록 필요
- **1. Dynamic Reducer Injection**: companion pattern, 런타임 extensibility

---

## 🎯 요약

### 아키텍처 핵심 원칙

1. **하이브리드 상태 관리**
   - URL: 필터, 정렬, 뷰모드 (영구적)
   - RTK Query: API 데이터 (자동 캐싱)
   - Redux: UI 상태 (일시적)

2. **계층형 아키텍처**
   - Pages → Hooks → Components → Services → Store
   - 상위 계층은 하위 계층에 의존하지 않음
   - 각 계층의 독립적인 테스트 가능

3. **코드 분할**
   - Dynamic Reducer Injection
   - Registry Pattern (API_REGISTRY + middlewareRegistry)
   - 페이지별 lazy loading
   - 초기 번들 크기 최적화

4. **사용자 경험**
   - 쿼리 파라미터 보존으로 상태 유지
   - URL 공유 가능
   - 페이지 새로고침 내성

5. **타입 안전성**
   - Zod 스키마로 런타임 검증
   - TypeScript 타입 추론
   - 컴파일 타임 + 런타임 이중 안전장치

---

## 📚 참고

- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
- [RTK Query 공식 문서](https://redux-toolkit.js.org/rtk-query/overview)
- [Zod 공식 문서](https://zod.dev/)
