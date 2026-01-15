# 프로젝트 문서화 가이드라인

**버전:** 1.0.0
**작성일:** 2026-01-15
**적용 대상:** 50+명의 개발자가 협업하는 Next.js 프로젝트

---

## 📋 목차

1. [개요](#개요)
2. [문서화 유형별 가이드](#문서화-유형별-가이드)
3. [코드 문서화](#코드-문서화)
4. [아키텍처 문서](#아키텍처-문서)
5. [API 문서](#api-문서)
6. [사용자 가이드](#사용자-가이드)
7. [자동화 도구](#자동화-도구)
8. [문서 검토 및 유지보수](#문서-검토-및-유지보수)

---

## 개요

### 목적

대규모 프로젝트에서 문서화의 중요성과 표준을 정하여:
- **지식 공유:** 팀원 간 효율적인 정보 전달
- **온보딩 단축:** 신규 개발자의 빠른 적응
- **유지보수성:** 코드 이해도 향상 및 버그 감소
- **일관성:** 전체 프로젝트의 통일된 문서 스타일

### 문서화 원칙

1. **DRY (Don't Repeat Yourself):** 코드에서 명확한 내용은 중복 작성 금지
2. **최신 상태 유지:** 코드 변경 시 문서도 함께 업데이트
3. **가독성:** 명확하고 간결한 언어 사용
4. **예시 중심:** 실제 사용 예시 포함
5. **위치 적정성:** 문서는 가장 적절한 곳에 작성

### 문서화 수준

| 수준 | 대상 | 설명 | 예시 |
|------|------|------|------|
| **L1: 필수** | 공개 API, 복잡한 로직 | 모든 파라미터, 반환값, 예외 처리 | Redux Slice, Service |
| **L2: 권장** | 컴포넌트, 훅, 유틸리티 | 사용 목적, 기본 예시 | UI Components, Hooks |
| **L3: 선택** | 간단한 함수, 상수 | 명확한 이름으로 대체 가능 | Helper 함수 |

---

## 문서화 유형별 가이드

### 1. JSDoc/TSDoc (코드 내 문서)

**사용 시나리오:** 함수, 클래스, 인터페이스 문서화

```typescript
/**
 * 사용자 인증을 처리합니다.
 *
 * @description
 * 이메일과 비밀번호를 사용하여 사용자 인증을 수행합니다.
 * 인증 성공 시 JWT 토큰을 반환하고 실패 시 에러를 던집니다.
 *
 * @example
 * ```typescript
 * const user = await authenticate('user@example.com', 'password123');
 * console.log(user.token); // JWT 토큰
 * ```
 *
 * @param email - 사용자 이메일 주소
 * @param password - 비밀번호 (최소 8자)
 * @returns 인증된 사용자 정보와 토큰
 * @throws {AuthenticationError} 인증 실패 시
 * @throws {ValidationError} 유효성 검사 실패 시
 *
 * @see {@link https://api.example.com/docs/auth | API 문서}
 *
 * @author John Doe <john@example.com>
 * @since 1.0.0
 */
export async function authenticate(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  // 구현
}
```

**JSDoc 태그 가이드:**

| 태그 | 용도 | 필수 여부 |
|------|------|----------|
| `@description` | 상세 설명 | L1: 필수, L2: 권장 |
| `@example` | 사용 예시 | L1: 필수, L2: 권장 |
| `@param` | 파라미터 설명 | 모든 파라미터 필수 |
| `@returns` | 반환값 설명 | 반환값 있는 경우 필수 |
| `@throws` | 예외 처리 | 예외 던지는 경우 필수 |
| `@see` | 관련 문서 링크 | 선택 |
| `@author` | 작성자 | 선택 |
| `@since` | 버전 정보 | 선택 |

### 2. Component 문서화 (Storybook)

**사용 시나리오:** UI/비즈니스 컴포넌트 문서화

```typescript
/**
 * ProductForm Component
 *
 * @description
 * 제품 등록/수정 폼 컴포넌트
 * Zod 스키마를 사용한 실시간 폼 검증을 지원합니다.
 *
 * @features
 * - 실시간 필드 검증
 * - 제출 시 전체 폼 검증
 * - 에러 메시지 표시
 * - 로딩 상태 처리
 *
 * @example
 * ```tsx
 * <ProductForm
 *   mode="create"
 *   onSubmit={handleCreateProduct}
 *   isSubmitting={isLoading}
 * />
 * ```
 */
export default function ProductForm({
  initialData,
  mode,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProductFormProps) {
  // 구현
}
```

**Storybook Stories:**

```typescript
// src/features/products/components/ProductForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ProductForm from './ProductForm';

const meta = {
  title: 'Features/Products/ProductForm',
  component: ProductForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductForm>;

export default meta;
type Story = StoryObj<typeof ProductForm>;

/**
 * 생성 모드 기본 폼
 */
export const CreateMode: Story = {
  args: {
    mode: 'create',
    onSubmit: async (data) => {
      console.log('Create:', data);
      return null;
    },
  },
};

/**
 * 수정 모드 폼 (초기 데이터 포함)
 */
export const UpdateMode: Story = {
  args: {
    mode: 'update',
    initialData: {
      id: '1',
      name: 'Sample Product',
      price: 10000,
      description: 'Sample description',
      status: 'active',
      category: 'subscription',
    },
    onSubmit: async (data) => {
      console.log('Update:', data);
      return null;
    },
  },
};

/**
 * 제출 중 상태
 */
export const Submitting: Story = {
  args: {
    mode: 'create',
    isSubmitting: true,
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return null;
    },
  },
};
```

### 3. README.md (디렉토리/모듈 문서)

**사용 시나리오:** Feature, Shared 모듈 설명

```markdown
# Products Feature

제품 관리 기능을 담당하는 Feature 모듈입니다.

## 📦 구조

```
products/
├── components/      # 제품 관련 컴포넌트
├── hooks/          # 제품 관련 커스텀 훅
├── store/          # Redux 상태 관리
├── types/          # 타입 정의
└── utils/          # 유틸리티 함수
```

## 🎯 주요 기능

- 제품 목록 조회 (페이지네이션, 필터링)
- 제품 상세 조회
- 제품 등록/수정/삭제
- 제품 검색

## 🔗 관련 문서

- [API 문서](../../docs/api/products.md)
- [상태 관리](./store/README.md)
- [컴포넌트 문서](../../storybook-static/?path=/story/features-products)

## 🚀 사용 예시

\`\`\`typescript
import { useProducts } from '@/features/products/hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

## 📝 개발 노트

- Zod 스키마 검증 사용
- RTK Query for API calls
- Redux Persist for offline support
```

---

## 코드 문서화

### 함수 문서화

```typescript
/**
 * 제품 가격을 포맷팅합니다.
 *
 * @param price - 포맷팅할 가격 (원)
 * @param options - 포맷 옵션
 * @param options.currency - 통화 기호 (기본: '원')
 * @param options.decimal - 소수점 표시 여부 (기본: false)
 * @returns 포맷팅된 가격 문자열
 *
 * @example
 * ```typescript
 * formatPrice(10000) // '10,000원'
 * formatPrice(10000, { currency: '$' }) // '$10,000'
 * formatPrice(10000.5, { decimal: true }) // '10,000.50원'
 * ```
 */
export function formatPrice(
  price: number,
  options: { currency?: string; decimal?: boolean } = {}
): string {
  const { currency = '원', decimal = false } = options;

  const formatted = new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: decimal ? 2 : 0,
    maximumFractionDigits: decimal ? 2 : 0,
  }).format(price);

  return `${formatted}${currency}`;
}
```

### Interface/Type 문서화

```typescript
/**
 * 제품 엔티티
 *
 * @description
 * 시스템에서 관리하는 제품의 기본 정보를 나타냅니다.
 *
 * @example
 * ```typescript
 * const product: Product = {
 *   id: 'prod-001',
 *   name: 'Premium Plan',
 *   price: 99000,
 *   status: 'active',
 *   category: 'subscription',
 *   description: 'Premium subscription plan',
 *   createdAt: '2026-01-15T10:00:00Z',
 *   updatedAt: '2026-01-15T10:00:00Z',
 * };
 * ```
 */
export interface Product {
  /** 제품 고유 ID */
  id: string;

  /** 제품명 */
  name: string;

  /** 가격 (원) */
  price: number;

  /** 제품 상태 */
  status: 'active' | 'inactive' | 'archived';

  /** 제품 카테고리 */
  category: 'subscription' | 'one-time';

  /** 제품 설명 */
  description: string;

  /** 생성일시 (ISO 8601) */
  createdAt: string;

  /** 수정일시 (ISO 8601) */
  updatedAt: string;
}
```

### React Hook 문서화

```typescript
/**
 * 제품 목록을 가져오는 커스텀 훅
 *
 * @description
 * RTK Query를 사용하여 제품 목록을 조회합니다.
 * 페이지네이션, 필터링, 정렬을 지원합니다.
 *
 * @param options - 조회 옵션
 * @returns 제품 목록과 상태
 *
 * @example
 * ```tsx
 * function ProductList() {
 *   const { products, loading, error, refetch } = useProducts({
 *     page: 1,
 *     limit: 20,
 *     category: 'subscription',
 *   });
 *
 *   if (loading) return <Spinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return (
 *     <div>
 *       {products.map((product) => (
 *         <ProductCard key={product.id} product={product} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useProducts(
  options: ProductListOptions = {}
): UseQueryResult<Product[], Error> {
  const dispatch = useAppDispatch();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery(options);

  return {
    products: products ?? [],
    loading: isLoading,
    error,
    refetch: () => dispatch(refetch.initiate(undefined)),
  };
}
```

### Redux Slice 문서화

```typescript
/**
 * Products Slice
 *
 * @description
 * 제품 관련 UI 상태를 관리하는 Redux slice입니다.
 * API 상태는 RTK Query(`productsApi`)에서 별도 관리합니다.
 *
 * @state
 * - `selectedProductId`: 현재 선택된 제품 ID
 * - `filters`: 현재 적용된 필터
 * - `sortBy`: 정렬 기준
 *
 * @actions
 * - `setSelectedProduct`: 제품 선택
 * - `updateFilters`: 필터 업데이트
 * - `resetFilters`: 필터 초기화
 *
 * @selectors
 * - `selectSelectedProductId`: 선택된 제품 ID 가져오기
 * - `selectProductFilters`: 현재 필터 가져오기
 *
 * @example
 * ```typescript
 * // Component에서 사용
 * const selectedProductId = useAppSelector(selectSelectedProductId);
 * const dispatch = useAppDispatch();
 *
 * const handleProductClick = (productId: string) => {
 *   dispatch(setSelectedProduct(productId));
 * };
 * ```
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductsUIState {
  selectedProductId: string | null;
  filters: ProductFilters;
  sortBy: 'name' | 'price' | 'createdAt';
}

const initialState: ProductsUIState = {
  selectedProductId: null,
  filters: {},
  sortBy: 'createdAt',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * 선택된 제품 ID를 설정합니다.
     *
     * @param state - 현재 상태
     * @param action - 제품 ID 액션
     */
    setSelectedProduct: (state, action: PayloadAction<string | null>) => {
      state.selectedProductId = action.payload;
    },

    // ... other reducers
  },
});
```

---

## 아키텍처 문서

### 1. 시스템 아키텍처 개요

**파일:** `docs/architecture/overview.md`

```markdown
# 시스템 아키텍처 개요

## 📐 아키텍처 스타일

이 프로젝트는 **Feature-First 아키텍처**를 따릅니다.

### 핵심 원칙

1. **Feature-Based Organization**
   - 관련 코드를 Feature 단위로 묶어 관리
   - 각 Feature는 독립적으로 개발/테스트 가능

2. **Shared Layer**
   - 재사용 가능한 코드를 중앙 집중화
   - Feature 간 결합도 최소화

3. **Separated Presentation**
   - UI (App Router)
   - Business Logic (Features)
   - Infrastructure (Shared)

## 🏗️ 계층 구조

\`\`\`
┌─────────────────────────────────────┐
│       Presentation Layer            │
│  (App Router - Pages/Layouts)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Feature Layer                 │
│  (Business Logic & State)           │
│  ┌────────┐ ┌────────┐ ┌────────┐ │
│  │  Auth  │ │Product │ │Dashboard││
│  └────────┘ └────────┘ └────────┘ │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Shared Layer                   │
│  (Reusable Components & Utils)      │
│  Components, Hooks, Lib, Types      │
└─────────────────────────────────────┘
\`\`\`

## 🔄 데이터 흐름

\`\`\`mermaid
graph LR
    A[User Action] --> B[Component]
    B --> C[Hook/Event Handler]
    C --> D{Type?}
    D -->|State Update| E[Redux Action]
    D -->|API Call| F[RTK Query]
    E --> G[Reducer]
    G --> H[Store]
    H --> I[Selector]
    I --> B
    F --> J[API Response]
    J --> B
\`\`\`

## 🔒 보안 원칙

- 인증: JWT 토큰 기반
- 권한: Role-Based Access Control (RBAC)
- 데이터: 암호화된 통신 (HTTPS)
- 입력: Zod 스키마 검증

## 📊 상태 관리 전략

### Redux Store 구조

\`\`\`typescript
interface RootState {
  // Feature States (UI 상태)
  auth: AuthState;
  dashboard: DashboardState;
  products: ProductsUIState;

  // API States (서버 상태)
  authApi: ApiState;
  dashboardApi: ApiState;
  productsApi: ApiState;
}
\`\`\`

### 지속성 (Persistence)

- **Local Storage:** Redux Persist (사용자 설정, 필터)
- **Session Storage:** 일시적 데이터
- **Memory:** 실시간 상태만
```

### 2. 상태 관리 문서

**파일:** `docs/architecture/state-management.md`

```markdown
# 상태 관리 전략

## 🎯 상태 관리 도구

| 도구 | 용도 | 예시 |
|------|------|------|
| **Redux Toolkit** | 전역 UI 상태 | 사용자 정보, 필터, 정렬 |
| **RTK Query** | 서버 상태 | API 데이터, 캐싱 |
| **React State** | 지역 상태 | Modal, Form 입력 |
| **URL Params** | 공유 가능한 상태 | 페이지, 검색어 |

## 📦 Redux 구조

### Directory Layout

\`\`\`
src/
├── store/
│   ├── setup.ts          # Store 설정
│   ├── registry/         # 동적 Reducer 레지스트리
│   └── hooks.ts          # Typed 훅
└── features/
    └── {feature}/
        └── store/
            ├── {feature}Slice.ts     # UI 상태
            ├── {feature}Selectors.ts # 상태 선택자
            └── apiSlice.ts          # RTK Query API
\`\`\`

### 동적 Reducer Injection

\`\`\`typescript
// Feature에서 Reducer 동적 주입
import { injectReducer } from '@/store';
import { productsReducer } from './store/productsSlice';

// 페이지 진입 시 주입
useEffect(() => {
  store.dispatch(injectReducer('products', productsReducer));
}, []);
\`\`\`

## 🔄 상태 업데이트 패턴

### 1. 동기 상태 업데이트

\`\`\`typescript
// Redux Action
const handleSelectProduct = (productId: string) => {
  dispatch(setSelectedProduct(productId));
};
\`\`\`

### 2. 비동기 API 호출

\`\`\`typescript
// RTK Query Hook
const { data, error, isLoading } = useGetProductsQuery({
  page: 1,
  limit: 20,
});
\`\`\`

### 3. Optimistic Updates

\`\`\`typescript
// 즉시 UI 업데이트 후 API 호출
const handleUpdateProduct = async (product: Product) => {
  // 1. 낙관적 업데이트
  dispatch(
    productsApi.util.updateQueryData(
      'getProducts',
      undefined,
      (draft) => {
        const index = draft.findIndex((p) => p.id === product.id);
        if (index !== -1) draft[index] = product;
      }
    )
  );

  // 2. API 호출
  try {
    await updateProduct(product);
  } catch (error) {
    // 3. 실패 시 롤백
    dispatch(api.util.invalidateTags(['Products']));
  }
};
\`\`\`
```

### 3. API 통신 문서

**파일:** `docs/api/api-guide.md`

```markdown
# API 통신 가이드

## 🔌 HTTP Client 설정

### Axios Instance

\`\`\`typescript
// src/shared/lib/axios/axiosInstance.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 주입)
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// 응답 인터셉터 (에러 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      handleTokenExpired();
    }
    return Promise.reject(error);
  }
);
\`\`\`

## 📡 RTK Query 설정

### API Slice 생성

\`\`\`typescript
// src/features/products/store/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', \`Bearer \${token}\`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Product' as const, id })), 'Products']
          : ['Products'],
    }),

    createProduct: builder.mutation<Product, CreateProductInput>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation<Product, { id: string } & Partial<Product>>({
      query: ({ id, ...body }) => ({
        url: \`/\${id}\`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: \`/\${id}\`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
\`\`\`

## 🔄 캐싱 전략

### Cache Tags

| Tag Type | 용도 | 예시 |
|----------|------|------|
| `List Tag` | 전체 목록 무효화 | `'Products'` |
| `Item Tag` | 특정 항목 무효화 | `{ type: 'Product', id: '1' }` |

### Cache Invalidation

\`\`\`typescript
// 생성: 목록 캐시 무효화
invalidatesTags: ['Products']

// 수정: 해당 항목 + 목록 캐시 무효화
invalidatesTags: (result, error, { id }) => [
  { type: 'Product', id },
  'Products',
]

// 삭제: 해당 항목 + 목록 캐시 무효화
invalidatesTags: (result, error, id) => [
  { type: 'Product', id },
  'Products',
]
\`\`\`
```

---

## API 문서

### 1. OpenAPI/Swagger

```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: Products API
  version: 1.0.0
  description: 제품 관리 API

paths:
  /api/products:
    get:
      summary: 제품 목록 조회
      tags:
        - Products
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: 성공
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Product'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

    post:
      summary: 제품 생성
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateProductInput'
      responses:
        '201':
          description: 생성됨
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Product'

components:
  schemas:
    Product:
      type: object
      required:
        - id
        - name
        - price
      properties:
        id:
          type: string
        name:
          type: string
        price:
          type: number
```

### 2. API 사용 예시

```typescript
/**
 * GET /api/products
 *
 * 제품 목록을 조회합니다.
 *
 * @query
 * - page: 페이지 번호 (기본: 1)
 * - limit: 페이지 크기 (기본: 20, 최대: 100)
 * - category: 카테고리 필터 (선택)
 * - status: 상태 필터 (선택)
 *
 * @response
 * ```json
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "id": "prod-001",
 *       "name": "Premium Plan",
 *       "price": 99000,
 *       "status": "active",
 *       "category": "subscription"
 *     }
 *   ],
 *   "meta": {
 *     "page": 1,
 *     "limit": 20,
 *     "total": 100,
 *     "totalPages": 5
 *   }
 * }
 * ```
 *
 * @error
 * - 400: 잘못된 요청 파라미터
 * - 401: 인증되지 않음
 * - 403: 권한 없음
 * - 500: 서버 에러
 */
```

---

## 사용자 가이드

### 1. 개발자 온보딩 가이드

**파일:** `docs/onboarding/developer-onboarding.md`

```markdown
# 개발자 온보딩 가이드

## 🚀 빠른 시작

### 1. 환경 설정

\`\`\`bash
# 레포지토리 클론
git clone <repo-url>
cd study-nextjs-2026

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
\`\`\`

### 2. 프로젝트 구조 이해

\`\`\`
src/
├── app/            # Next.js App Router (페이지)
├── features/       # 기능 모듈 (비즈니스 로직)
├── shared/         # 공유 코드 (재사용 가능)
└── store/          # Redux 설정 (인프라)
\`\`\`

### 3. 첫 번째 Feature 추가

\`\`\`bash
# Feature 폴더 생성
mkdir -p src/features/my-feature/{components,hooks,store,types,utils}

# 기본 파일 생성
touch src/features/my-feature/components/MyComponent.tsx
touch src/features/my-feature/store/myFeatureSlice.ts
\`\`\`

### 4. 개발 도구

| 도구 | 용도 | 명령어 |
|------|------|--------|
| **ESLint** | 코드 린트 | \`npm run lint\` |
| **Prettier** | 코드 포맷팅 | \`npm run format\` |
| **TypeScript** | 타입 체크 | \`npx tsc --noEmit\` |
| **Storybook** | 컴포넌트 문서 | \`npm run storybook\` |
| **Jest** | 유닛 테스트 | \`npm test\` |

## 📚 학습 자료

### 필독 문서

1. [아키텍처 개요](../architecture/overview.md)
2. [Feature 간 의존성 규칙](../feature-dependency-rules.md)
3. [상태 관리 전략](../architecture/state-management.md)
4. [API 통신 가이드](../api/api-guide.md)

### 추천 학습 순서

1. **Week 1:** 기본 환경 설정 + 프로젝트 구조 이해
2. **Week 2:** Redux Toolkit + RTK Query
3. **Week 3:** Next.js App Router
4. **Week 4:** Storybook + 테스트

## 🔧 일반적인 작업

### 새로운 페이지 추가

\`\`\`typescript
// src/app/(dashboard)/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
\`\`\`

### 새로운 API 호출 추가

\`\`\`typescript
// src/features/my-feature/store/apiSlice.ts
export const myApi = createApi({
  // ...
  endpoints: (builder) => ({
    getData: builder.query<Data[], void>({
      query: () => '/data',
    }),
  }),
});
\`\`\`

## 💬 도움 받기

- **Slack:** #dev-help
- **Tech Lead:** @tech-lead
- **Issues:** GitHub Issues
```

---

## 자동화 도구

### 1. TypeDoc (API 문서 자동 생성)

```bash
# 설치
npm install -D typedoc

# 설정
# typedoc.json
{
  "entryPoints": ["src"],
  "out": "docs/api",
  "theme": "default",
  "excludePrivate": true
}

# 실행
npx typedoc
```

### 2. Storybook (컴포넌트 문서)

```bash
# 이미 설치됨
npm run storybook

# 빌드
npm run build-storybook
```

### 3. ESLint Plugin (문서화 검사)

```javascript
// eslint.config.js
export default [
  {
    rules: {
      // JSDoc 필수화 (공개 API)
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: ['FunctionExpression', 'FunctionDeclaration'],
          checkConstructors: true,
          checkGetters: true,
          checkSetters: true,
        },
      ],

      // @param 태그 필수화
      'jsdoc/require-param': 'error',

      // @returns 태그 필수화
      'jsdoc/require-returns': 'error',

      // @example 태그 권장
      'jsdoc/require-example': 'warn',
    },
  },
];
```

### 4. Markdown Linter

```bash
# 설치
npm install -D markdownlint-cli

# 실행
npx markdownlint 'docs/**/*.md'

# 자동 수정
npx markdownlint 'docs/**/*.md' --fix
```

---

## 문서 검토 및 유지보수

### 1. 문서 검토 체크리스트

- [ ] **최신성:** 코드와 일치하는가?
- [ ] **완전성:** 필요한 내용이 모두 포함되었는가?
- [ ] **명확성:** 이해하기 쉬운가?
- [ ] **예시:** 실제 사용 예시가 있는가?
- [ ] **링크:** 관련 문서 링크가 유효한가?
- [ ] **언어:** 일관된 용어를 사용하는가?

### 2. PR 템플릿

```markdown
## 문서 변경 사항

### 변경 유형
- [ ] 새로운 문서 추가
- [ ] 기존 문서 수정
- [ ] 문서 삭제
- [ ] 오타/문법 수정

### 변경 내용
<!-- 어떤 문서를 변경했는지 설명 -->

### 관련 이슈/PR
<!-- #issue 번호 -->

### 검토 요청
- [ ] 코드 변경 포함
- [ ] 문서 변경만

### 사진/스크린샷
<!-- 필요한 경우 -->
```

### 3. 정기 문서 감사

**매분기:**
- 오래된 문서 식별
- 더 이상 사용되지 않는 문서 아카이빙
- 누락된 문서 식별

**每月:**
- 최신 변경 사항 반영 확인
- 링크 유효성 검사

### 4. 문서 소유자

| 문서 | 소유자 | 검토 주기 |
|------|--------|----------|
| 아키텍처 문서 | @architects | 분기별 |
| API 문서 | @backend-team | 필요시 |
| 온보딩 가이드 | @tech-lead | 월별 |
| Feature 문서 | Feature Owner | 필요시 |

---

## 부록: 문서 템플릿

### Feature README 템플릿

```markdown
# {Feature Name}

## 📋 개요

{Feature에 대한 간단한 설명}

## 🎯 주요 기능

- 기능 1
- 기능 2
- 기능 3

## 📦 구조

\`\`\`
{feature-name}/
├── components/
├── hooks/
├── store/
├── types/
└── utils/
\`\`\`

## 🚀 사용 예시

\`\`\`typescript
// 예시 코드
\`\`\`

## 🔗 관련 문서

- [API 문서](../../docs/api/{feature}.md)
- [Storybook](../../storybook-static/?path=/story/features-{feature})

## 📝 개발 노트

{추가 정보}
```

### Component 문서 템플릿

```typescript
/**
 * {ComponentName}
 *
 * @description
 * {Component에 대한 상세 설명}
 *
 * @example
 * ```tsx
 * <{ComponentName} {...props} />
 * ```
 *
 * @author {작성자}
 * @since {버전}
 */
```

---

**버전 history:**
- v1.0.0 (2026-01-15): 초기 버전
