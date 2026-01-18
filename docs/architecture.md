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
│                        Presentation Layer                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App Router (Pages/Layouts)       │  │
│  └───────────────────────────────────────────────────────┘  │
│                              ↓                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Feature Components (UI)                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  Auth    │  │ Dashboard│  │ Products │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Business Logic Layer                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Custom Hooks (useXXX)                     │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Services (API Calls)                      │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        State Management Layer                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Redux Store (Global State)                │  │
│  │  ┌─────────────────────────────────────────┐          │  │
│  │  │  Slices │ Selectors │ Middleware         │          │  │
│  │  └─────────────────────────────────────────┘          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     MSW      │  │    Axios     │  │   RTK Query  │     │
│  │  (Dev Mock)  │  │  (HTTP)      │  │  (Caching)   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
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
    └── ...
```

### 장점

1. **높은 응집도**: 관련 코드가 한 곳에 모임
2. **낮은 결합도**: Feature 간 의존성 최소화
3. **재사용성**: Shared Layer를 통한 코드 공유
4. **확장성**: 새 Feature 추가 용이
5. **유지보수**: 특정 기능 수정이 다른 기능에 영향 최소화

### Import 제한

**ESLint 규칙으로 강제:**

```javascript
// eslint.config.js
'import/no-restricted-paths': [
  'error',
  {
    zones: [
      {
        target: './src/features/**/*.{ts,tsx}',
        from: './src/features/**/components/**',
        except: ['./src/shared/**'],
        message: 'Feature는 다른 Feature의 Component를 직접 import할 수 없습니다.',
      },
    ],
  },
]
```

**사용 예시:**

```typescript
// ✅ 올바른 import
import { Button } from '@/shared/components/ui/Button'

// ❌ 잘못된 import (다른 Feature의 컴포넌트)
import { ProductCard } from '@/features/products/components/ProductCard'
```

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
│  State Management Layer (상태 관리 계층)        │
│  - Redux Store                                  │
│  - Redux Slices                                 │
│  - Selectors                                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  Data Layer (데이터 계층)                       │
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

로컬 스토리지에 상태 지속:

```typescript
// store/storage.ts
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // 지속할 상태
  transforms: [
    // 데이터 변환 (날짜 직렬화 등)
  ],
}
```

---

## 컴포넌트 아키텍처

### 컴포넌트 분류

#### 1. Page Components

**위치:** `/src/app/**/*.tsx`

**역할:**
- 라우팅 경로에 매핑
- 데이터 fetching 조율
- 레이아웃 구성

```typescript
// app/sample/products/pages/List.tsx
export default function ProductsListPage() {
  const { products, loading, fetchProducts } = useProducts()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (loading) return <Loading />

  return <ProductList products={products} />
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
// 예시: Button 컴포넌트
const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button, buttonVariants }
```

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
export default function ProductPage({ params }: { params: { pageId: string } }) {
  const { pageId } = params

  switch (pageId) {
    case 'list':
      return <ProductsListPage />
    case 'new':
      return <ProductNewPage />
    default:
      return <ProductDetailPage id={pageId} />
  }
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

```typescript
// shared/config/env.ts
const getEnvVar = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`환경 변수 ${key}가 설정되지 않았습니다.`)
  }
  return value
}

export const config = {
  apiBaseUrl: getEnvVar('NEXT_PUBLIC_API_BASE_URL'),
}
```

### 2. XSS 방지

```typescript
// React의 기본 XSS 방지 활용
<div>{userInput}</div> // ✅ 자동 이스케이프

// 명시적 HTML 렌더링 시 주의
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
```

### 3. CSRF 보호

```typescript
// Axios 인터셉터로 CSRF 토큰 처리
axios.interceptors.request.use((config) => {
  const token = getCsrfToken()
  if (token) {
    config.headers['X-CSRF-Token'] = token
  }
  return config
})
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

## 향후 개선 방향

### 1. RTK Query 도입

서버 상태 관리를 위해 RTK Query 도입 고려:
- 자동 캐싱
- 재요청 최적화
- Optimistic Updates

### 2. Server Actions 도입

Next.js 16의 Server Actions 활용:
- 클라이언트-서버 경계 단순화
- 보안 향상
- 성능 최적화

### 3. 컴포넌트 Storybook 확장

모든 공유 컴포넌트 Storybook 문서화:
- 컴포넌트 카탈로그
- 시각적 회귀 테스트
- 디자인 시스템 문서

---

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Redux Toolkit 문서](https://redux-toolkit.js.org/)
- [React 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
