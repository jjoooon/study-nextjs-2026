# 아키텍처 가이드

이 문서는 Next.js 스터디 프로젝트의 아키텍처 설계, 원칙, 그리고 기술적 의사결정을 설명합니다.

## 목차

1. [아키텍처 개요](#아키텍처-개요)
2. [핵심 설계 원칙](#핵심-설계-원칙)
3. [Feature-Based Architecture](#feature-based-architecture)
4. [레이어 구조](#레이어-구조)
5. [상태 관리 전략](#상태-관리-전략)
6. [컴포넌트 아키텍처](#컴포넌트-아키텍처)
7. [라우팅 전략](#라우팅-전략)
8. [데이터 흐름](#데이터-흐름)
9. [성능 최적화](#성능-최적화)
10. [보안](#보안)
11. [기술적 의사결정](#기술적-의사결정)

---

## 아키텍처 개요

### 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App Router (Pages/Layouts)       │  │
│  └───────────────────────────────────────────────────────┘  │
│                              ↓                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Feature Components (UI)                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │  Auth    │  │ Dashboard│  │ Products │             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Business Logic Layer                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Custom Hooks (useXXX)                    │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Services (API Calls)                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        State Management Layer               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Redux Store (Global State)               │  │
│  │  ┌─────────────────────────────────────────┐          │  │
│  │  │  Slices │ Selectors │ Middleware        │          │  │
│  │  └─────────────────────────────────────────┘          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │     MSW      │  │    Axios     │  │   RTK Query  │       │
│  │  (Dev Mock)  │  │  (HTTP)      │  │  (Caching)   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 아키텍처 스타일

이 프로젝트는 **Feature-Based Architecture (기능 기반 아키텍처)** 를 채택합니다.

**특징:**
- 도메인 주도 설계 (DDD) 영감
- 기능별 독립적인 모듈 구성
- 명확한 레이어 분리
- 높은 응집도, 낮은 결합도

---

## 핵심 설계 원칙

### 1. 관심사의 분리 (Separation of Concerns)

각 레이어와 모듈은 명확하게 정의된 책임을 가집니다:

| 레이어 | 책임 | 예시 |
|--------|------|------|
| **Presentation** | UI 렌더링, 사용자 인터랙션 | Pages, Components |
| **Business Logic** | 비즈니스 규칙, 데이터 변환 | Hooks, Services |
| **State** | 상태 저장, 업데이트 | Redux Store |
| **Data** | 데이터 통신, 캐싱 | Axios, MSW |

### 2. 단일 책임 원칙 (Single Responsibility Principle)

각 컴포넌트, 함수, 모듈은 하나의 명확한 책임만 가집니다:

```typescript
// ✅ 좋은 예: 단일 책임
const useProducts = () => {
  // 상품 데이터를 가져오는 책임만 담당
  const dispatch = useDispatch()
  // ...
}

// ❌ 나쁜 예: 여러 책임
const useProductsAndUsersAndOrders = () => {
  // 여러 도메인의 데이터를 처리 - 책임이 너무 많음
}
```

### 3. 의존성 역전 원칙 (Dependency Inversion)

고수준 모듈은 저수준 모듈에 의존하지 않습니다:

```
Feature Layer (고수준)
    ↓ 의존
Shared Layer (저수준)
```

**Import 규칙:**
- ✅ Feature → Shared
- ❌ Feature → Feature (ESLint로 강제)

### 4. 개방-폐쇄 원칙 (Open/Closed Principle)

확장에는 열려 있고, 수정에는 닫혀 있어야 합니다:

```typescript
// 확장 가능한 구조
interface ProductFilter {
  apply(products: Product[]): Product[]
}

class CategoryFilter implements ProductFilter {
  apply(products: Product[]): Product[] {
    // 카테고리 필터링 로직
  }
}

class PriceFilter implements ProductFilter {
  apply(products: Product[]): Product[] {
    // 가격 필터링 로직
  }
}
```

---

## Feature-Based Architecture

### 개념

기능(Feature)을 기준으로 코드를 조직화하는 아키텍처 패턴입니다.

### 구조

```
src/features/
├── auth/                    # 인증 기능
│   ├── components/          # 인증 UI
│   ├── hooks/              # 인증 로직
│   ├── services/           # 인증 API
│   ├── store/              # 인증 상태
│   └── types/              # 인증 타입
│
├── dashboard/              # 대시보드 기능
│   └── ...
│
└── products/               # 상품 기능
    ├── components/          # 상품 UI 컴포넌트
    ├── hooks/              # 상품 관련 커스텀 훅
    ├── services/           # 상품 API 서비스
    ├── store/              # 상품 상태 관리
    ├── types/              # 상품 타입 정의
    ├── utils/              # 상품 유틸리티
    ├── constants/          # 상품 상수
    └── sections/           # 페이지 섹션 컴포넌트
```

### 장점

1. **높은 응집도**: 관련 코드가 한 곳에 모임
2. **낮은 결합도**: Feature 간 의존성 최소화
3. **재사용성**: Shared Layer를 통한 코드 공유
4. **확장성**: 새 Feature 추가 용이
5. **유지보수**: 특정 기능 수정이 다른 기능에 영향 최소화

### Import 제한

**eslint-plugin-boundaries로 강제:**

```javascript
// eslint.config.js
import boundaries from 'eslint-plugin-boundaries';

export default [
  {
    plugins: {
      boundaries,
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          rules: [
            {
              from: 'features',
              disallow: ['features'],
              message: 'Feature는 다른 Feature를 import할 수 없습니다. Shared Layer를 사용하세요.',
            },
          ],
        },
      ],
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'features',
          pattern: 'src/features/**/*',
          mode: 'folder',
        },
        {
          type: 'shared',
          pattern: 'src/shared/**/*',
          mode: 'folder',
        },
      ],
    },
  },
];
```

**설명:**
- `type: 'features'` - features 디렉토리를 하나의 element로 정의
- `from: 'features'` - features에서
- `disallow: ['features']` - 다른 features import 금지
- 같은 feature 내 import는 허용 (eslint-plugin-boundaries의 장점)

**사용 예시:**

```typescript
// ✅ 올바른 import (Shared Layer)
import { Button } from '@/shared/components/ui/Button'

// ✅ 올바른 import (같은 Feature 내)
import { ProductFilters } from '@/features/products/components/ProductFilters'

// ❌ 잘못된 import (다른 Feature의 컴포넌트)
import { ProductCard } from '@/features/dashboard/components/DashboardCard'
```

**eslint-plugin-boundaries 장점:**
- ✅ 같은 feature 내 import 허용 (기존 문제 해결)
- ✅ 직관적인 설정 구조
- ✅ TypeScript path alias 지원 (@/features, @/shared)
- ✅ 유지보수 용이 (새 feature 추가 시 설정 변경 불필요)

---

## 레이어 구조

### 레이어 정의

```
┌─────────────────────────────────────────────────┐
│  Presentation Layer (표현 계층)                  │
│  - Next.js Pages/Layouts                        │
│  - Feature Components                           │
│  - Shared UI Components                         │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  Business Logic Layer (비즈니스 로직 계층)       │
│  - Custom Hooks                                 │
│  - Services (API calls)                         │
│  - Utilities                                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  State Management Layer (상태 관리 계층)         │
│  - Redux Store                                  │
│  - Redux Slices                                 │
│  - Selectors                                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  Data Layer (데이터 계층)                        │
│  - Axios (HTTP client)                          │
│  - MSW (API mocking)                            │
│  - RTK Query (optional)                         │
└─────────────────────────────────────────────────┘
```

### 레이어별 책임

#### 1. Presentation Layer

**역할:** 사용자 인터페이스 렌더링 및 사용자 인터랙션 처리

**구성요소:**
- Next.js Pages/Layouts
- Feature Components
- Shared UI Components

**원칙:**
- 비즈니스 로직을 포함하지 않음
- Props로 데이터를 받음
- 이벤트를 상위 계층으로 전달

```typescript
// 예시: Presentation Component
export const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
```

#### 2. Business Logic Layer

**역할:** 비즈니스 규칙 구현 및 데이터 처리

**구성요소:**
- Custom Hooks
- Services
- Utilities

**원칙:**
- UI 프레임워크 독립적
- 재사용 가능해야 함
- 순수 함수 선호

```typescript
// 예시: Business Logic Hook
export const useProducts = () => {
  const dispatch = useDispatch()
  const products = useAppSelector(selectAllProducts)

  const fetchProducts = useCallback(async () => {
    try {
      const data = await productService.getProducts()
      dispatch(setProducts(data))
    } catch (error) {
      // 에러 처리
    }
  }, [dispatch])

  return { products, fetchProducts }
}
```

#### 3. State Management Layer

**역할:** 전역 상태 관리 및 상태 업데이트

**구성요소:**
- Redux Store
- Redux Slices
- Selectors
- Middleware

**원칙:**
- 상태 변경 예측 가능
- 상태 불변성 유지
- 순수 리듀서 사용

#### 4. Data Layer

**역할:** 외부 시스템과의 데이터 통신

**구성요소:**
- Axios (HTTP client)
- MSW (Development mocking)
- RTK Query (Caching, optional)

**원칙:**
- 통신 로직 캡슐화
- 에러 처리 표준화
- 개발/프로덕션 환경 분리

---

## 상태 관리 전략

### 상태 관리 철학

**"가능한 로컬 상태를 사용하고, 필요할 때만 전역 상태를 사용한다"**

### 상태 분류

#### 1. 로컬 상태 (Local State)

**사용 기준:**
- 단일 컴포넌트에서만 사용
- 자식 컴포넌트로만 전파
- 일시적 데이터 (폼 입력, 모달 열기/닫기 등)

**구현:** `useState`, `useReducer`

```typescript
// ✅ 로컬 상태로 처리
const [isModalOpen, setIsModalOpen] = useState(false)
const [formData, setFormData] = useState(initialForm)
```

#### 2. 전역 상태 (Global State)

**사용 기준:**
- 여러 컴포넌트에서 공유
- 서버 데이터 캐싱
- 복잡한 상태 로직

**구현:** Redux Toolkit

```typescript
// ✅ 전역 상태로 처리
// 1. 인증 정보 (여러 페이지에서 필요)
// 2. 사용자 프로필
// 3. 캐시된 서버 데이터
```

### Redux Store 구조

```typescript
interface RootState {
  // Feature Slices
  auth: AuthState          // 인증 상태
  dashboard: DashboardState // 대시보드 상태
  products: ProductsState  // 상품 상태
  productsUI: ProductsUIState // 상품 UI 상태
}
```

### Redux Toolkit 패턴

#### 1. Slice 구조

```typescript
// features/products/store/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
    },
    // ... other reducers
  },
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer
```

#### 2. Selector 패턴

```typescript
// features/products/store/productsSelectors.ts
import { RootState } from '@/store'

export const selectAllProducts = (state: RootState) =>
  state.products.items

export const selectProductById = (state: RootState, id: string) =>
  state.products.items.find((p) => p.id === id)

export const selectProductsLoading = (state: RootState) =>
  state.products.loading
```

#### 3. Registry Pattern

동적 리듀서 등록을 위한 레지스트리 패턴:

```typescript
// store/registry/reducer.ts
import { Reducer } from '@reduxjs/toolkit'

interface ReducerRegistry {
  [key: string]: Reducer
}

const reducerRegistry: ReducerRegistry = {}

export const registerReducer = (key: string, reducer: Reducer) => {
  reducerRegistry[key] = reducer
}

export const getReducers = () => reducerRegistry
```

### Redux Persist

**보안 강화된 sessionStorage에 상태 지속:**

```typescript
// store/storage.ts
export const createSecureStorage = () => {
  if (typeof window === 'undefined') {
    // SSR 대체 처리
    return {
      getItem: (_key: string) => Promise.resolve(null),
      setItem: (_key: string, _value: string) => Promise.resolve(),
      removeItem: (_key: string) => Promise.resolve(),
    };
  }

  return {
    getItem: (key: string) => Promise.resolve(sessionStorage.getItem(key)),
    setItem: (key: string, value: string) => Promise.resolve(sessionStorage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(sessionStorage.removeItem(key)),
  };
};

export const secureStorage = createSecureStorage();

// store/config.ts
const persistConfig = {
  key: 'root',
  storage: secureStorage, // 🔒 sessionStorage 사용 (localStorage보다 안전)
  version: 1,
  whitelist: ['auth'], // 지속할 상태
  // transforms: [], // TODO: auth 구현 후 민감 데이터 필터링 활성화
  blacklist: [],
}
```

**보안 특징:**
- ✅ **sessionStorage 사용**: 탭 닫으면 자동 삭제 (localStorage보다 안전)
- ✅ **XSS 공격 방지**: 토큰이 브라우저에 장기간 노출되지 않음
- ✅ **SSR 호환**: 서버 사이드 렌더링 대응
- ⚠️ **프로덕션 권장**: httpOnly 쿠키 사용 (서버 사이드)

---

## 컴포넌트 아키텍처

### 컴포넌트 분류

#### 1. Page Components

**위치:** `/src/app/**/*.tsx`

**역할:**
- 라우팅 경로에 매핑
- 레이아웃 구성

```typescript
// app/sample/products/pages/List.tsx (래퍼)
import ListSection from '@/features/products/sections/ListSection';

export default function Page() {
  return <ListSection />;
}

// features/products/sections/ListSection.tsx (실제 컴포넌트)
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
```

#### 2. Feature Components

**위치:** `/src/features/[feature]/components/**/*.tsx`

**역할:**
- 도메인별 UI
- 도메인 로직과 연결

**예시:**
- `ProductForm.tsx`
- `DashboardStats.tsx`

#### 3. Shared UI Components

**위치:** `/src/shared/components/ui/**/*.tsx`

**역할:**
- 재사용 가능한 UI 컴포넌트
- 도메인 독립적

**예시:**
- `Button.tsx`
- `Skeleton.tsx`
- `EmptyState.tsx`

### 컴포넌트 설계 원칙

#### 1. Props 인터페이스 명확성

```typescript
// ✅ 좋은 예: 명확한 Props 인터페이스
interface ProductCardProps {
  product: Product
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  variant?: 'default' | 'compact'
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  variant = 'default'
}) => {
  // ...
}
```

#### 2. 컴포넌트 합성

```typescript
// ✅ 컴포넌트 합성 패턴
export const ProductList = ({ products }) => {
  return (
    <div>
      <ProductFilters />
      <ProductGrid products={products} />
      <ProductPagination />
    </div>
  )
}
```

#### 3. 컴포넌트 분리

```typescript
// ✅ 관심사 분리
export const ProductForm = () => {
  const { register, handleSubmit } = useForm()
  const { createProduct } = useProductForm()

  return (
    <form onSubmit={handleSubmit(createProduct)}>
      <ProductFormFields register={register} />
      <FormActions />
    </form>
  )
}
```

### Compound Component 패턴

복잡한 UI를 위한 패턴:

```typescript
// 예시: Button 컴포넌트 (React 19+)
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'destructive' | 'outline-solid' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = ({
  className,
  variant = 'default',
  size = 'default',
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

**React 19 개선사항:**
- ✅ **`forwardRef` 불필요**: 직접 `ref` prop 받기 가능
- ✅ **간결한 코드**: HSA(Higher-Order Component) 패턴 제거
- ✅ **타입 추론 개선**: `React.ComponentProps<'button'>`로 기본 prop 상속

---

## 라우팅 전략

### Next.js App Router

Next.js 16의 App Router를 사용:

```
app/
├── layout.tsx              # 루트 레이아웃
├── page.tsx                # 홈 페이지 (/)
├── login/
│   └── page.tsx            # 로그인 페이지 (/login)
└── sample/
    ├── layout.tsx          # 샘플 레이아웃
    ├── dashboard/
    │   └── page.tsx        # 대시보드 (/sample/dashboard)
    └── products/
        ├── [pageId]/
        │   └── page.tsx    # 동적 라우트 (/sample/products/:pageId)
        └── pages/          # 페이지 컴포넌트들
```

### 라우팅 원칙

#### 1. 파일 시스템 기반 라우팅

```
파일 구조                    → URL 경로
app/sample/products/page.tsx → /sample/products
app/sample/products/[id]/page.tsx → /sample/products/:id
```

#### 2. 레이아웃 계층 구조

```typescript
// app/layout.tsx - 루트 레이아웃
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// app/sample/layout.tsx - 샘플 레이아웃
export default function SampleLayout({ children }) {
  return (
    <div className="sample-layout">
      <Navigation />
      <main>{children}</main>
    </div>
  )
}
```

#### 3. 라우트 보호 (Route Guards)

```typescript
// shared/components/auth/AuthGuard.tsx
export const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
```

### 동적 라우팅

```typescript
// app/sample/products/[pageId]/page.tsx
import dynamic from 'next/dynamic';

export default async function ProductPage({ params }: { params: { pageId: string } }) {
  const { pageId } = await params;

  // 동적으로 pages/${pageId}.tsx import
  const PageComponent = dynamic(() => import(`../pages/${pageId}`), {
    ssr: true,
  });

  return <PageComponent />;
}
```

---

## 데이터 흐름

### 단방향 데이터 흐름

```
User Action
    ↓
Event Handler
    ↓
Dispatch Action
    ↓
Reducer
    ↓
State Update
    ↓
Component Re-render
```

### 데이터 가져오기 패턴

#### 1. 컴포넌트 마운트 시

```typescript
export default function DashboardPage() {
  const { fetchDashboard, loading } = useDashboard()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (loading) return <Loading />

  return <DashboardStats />
}
```

#### 2. 사용자 액션 시

```typescript
export const ProductForm = () => {
  const { createProduct } = useProductForm()

  const handleSubmit = async (data: ProductFormData) => {
    await createProduct(data)
    router.push('/products')
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### 에러 처리 전략

```typescript
// 1. Component Level (Error Boundary)
// app/error.tsx
export default function Error({ error, reset }: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>에러가 발생했습니다</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}

// 2. Hook Level
const useProducts = () => {
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      // ...
    } catch (err) {
      setError(err.message)
    }
  }

  return { error, fetchProducts }
}

// 3. Service Level
export const productService = {
  async getProducts() {
    try {
      const response = await axios.get('/api/products')
      return response.data
    } catch (error) {
      throw new APIError('상품을 불러올 수 없습니다', error)
    }
  }
}
```

---

## 성능 최적화

### 1. 코드 분할 (Code Splitting)

```typescript
// 동적 import로 컴포넌트 지연 로딩
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

### 2. 이미지 최적화

```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

### 3. 패키지 Import 최적화

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: [
    '@reduxjs/toolkit',
    'react-redux',
    'lucide-react',
  ],
}
```

### 4. 메모이제이션

```typescript
// React.memo로 렌더링 최적화
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return <div>{product.name}</div>
})

// useMemo로 값 메모이제이션
const sortedProducts = useMemo(() =>
  products.sort((a, b) => a.name.localeCompare(b.name)),
  [products]
)

// useCallback으로 함수 메모이제이션
const handleEdit = useCallback((id: string) => {
  router.push(`/products/${id}`)
}, [router])
```

### 5. Redux DevTools 최적화

```typescript
// 개발 환경에서만 성능 모니터링
const middleware = [
  ...(process.env.NODE_ENV === 'development'
    ? [performanceMiddleware]
    : []),
]
```

---

## 보안

### 1. 환경 변수 관리

**Zod를 사용한 타입 안전한 환경 변수 검증:**

```typescript
// shared/config/env.ts
import { z } from 'zod';

// 환경 변수 스키마 정의
const envSchema = z.object({
  // Node.js 환경
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // 애플리케이션 설정 (공개)
  NEXT_PUBLIC_APP_NAME: z.string().default('Next.js App'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.0.0'),

  // API 설정 (공개)
  NEXT_PUBLIC_API_URL: z.string().url().default('/api'),
  NEXT_PUBLIC_API_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default(10000),
  NEXT_PUBLIC_API_RETRY_COUNT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(0).max(10))
    .default(3),

  // Feature Flags (공개)
  NEXT_PUBLIC_FEATURE_DARK_MODE: z
    .string()
    .transform((val) => val === 'true')
    .default(true),
  NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING: z
    .string()
    .transform((val) => val === 'true')
    .default(true),

  // 개발 도구 설정 (공개)
  NEXT_PUBLIC_REDUX_DEVTOOLS: z
    .string()
    .transform((val) => val === 'true')
    .default(true),
  NEXT_PUBLIC_LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('debug'),
});

// 환경 변수 검증 및 파싱
const config = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  // ... 기타 환경 변수
});

// 편의 속성들
export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';

// 공개 설정 (클라이언트에서 접근 가능)
export const publicConfig = {
  appName: config.NEXT_PUBLIC_APP_NAME,
  appVersion: config.NEXT_PUBLIC_APP_VERSION,
  apiUrl: config.NEXT_PUBLIC_API_URL,
  apiTimeout: config.NEXT_PUBLIC_API_TIMEOUT,
  apiRetryCount: config.NEXT_PUBLIC_API_RETRY_COUNT,
  features: {
    darkMode: config.NEXT_PUBLIC_FEATURE_DARK_MODE,
    performanceMonitoring: config.NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING,
  },
  devtools: {
    redux: config.NEXT_PUBLIC_REDUX_DEVTOOLS,
    logLevel: config.NEXT_PUBLIC_LOG_LEVEL,
  },
} as const;
```

**사용 예시:**
```typescript
// 컴포넌트에서 사용
import { publicConfig, isDevelopment } from '@/shared/config/env';

const apiUrl = publicConfig.apiUrl;
const isDev = isDevelopment;
```

### 2. XSS 방지

```typescript
// React의 기본 XSS 방지 활용
<div>{userInput}</div> // ✅ 자동 이스케이프

// 명시적 HTML 렌더링 시 주의
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
```
 
---

## 기술적 의사결정

### 1. 왜 Redux Toolkit인가?

**이유:**
- ✅ 복잡한 상태 로직 관리 용이
- ✅ DevTools로 디버깅 편리
- ✅ 미들웨어 생태계 풍부
- ✅ TypeScript 지원 우수

**대안 고려:**
- Zustand: 더 가볍지만 기능 적음
- Jotai: 원자적 상태 관리지만 학습 곡선
- Context API: 재렌더링 이슈

### 2. 왜 Feature-Based Architecture인가?

**이유:**
- ✅ 도메인 주도 개발 (DDD)과 연계
- ✅ 팀 협업에 유리 (Feature별 담당)
- ✅ 코드 재사용성 향상
- ✅ 유지보수 용이

**대안 고려:**
- Layer-Based Architecture: 계층 간 의존성 복잡
- Atomic Design: 구조가 너무 세분화됨

### 3. 왜 MSW인가?

**이유:**
- ✅ 실제 API 호출을 가로채서 mock
- ✅ 네트워크 레벨에서 동작
- ✅ 개발/테스트 환경 통합

**대안 고려:**
- 직접 mock 함수 구현: 네트워크 로직 테스트 불가
- JSON Server: 실제 서버 필요

### 4. 왜 Tailwind CSS인가?

**이유:**
- ✅ 유틸리티 퍼스트로 빠른 개발
- ✅ 일관된 디자인 시스템
- ✅ 커스텀 CSS 최소화
- ✅ JIT 모드로 빌드 크기 최적화

**대안 고려:**
- CSS Modules: 전역 스타일 관리 어려움
- Styled Components: 런타임 오버헤드

---

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Redux Toolkit 문서](https://redux-toolkit.js.org/)
- [React 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
