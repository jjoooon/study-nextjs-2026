# 아키텍처 가이드

이 문서는 프로젝트의 아키텍처 설계, 원칙, 그리고 기술적 의사결정을 설명합니다.

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
├── dashboard/              # 대시보드 기능
│   ├── components/          # 대시보드 UI
│   ├── hooks/              # 대시보드 로직
│   ├── store/              # 대시보드 UI 상태
│   └── types/              # 대시보드 타입
│
├── products/               # 상품 기능
│   ├── components/          # 상품 UI 컴포넌트
│   ├── hooks/              # 상품 관련 커스텀 훅
│   ├── services/           # 상품 API 서비스
│   ├── store/              # 상품 UI 상태 관리
│   ├── types/              # 상품 타입 정의
│   ├── utils/              # 상품 유틸리티
│   ├── constants/          # 상품 상수
│   └── sections/           # 페이지 섹션 컴포넌트
│
├── poc/                    # POC (Proof of Concept)
│   └── ...
│
└── pub/                    # 공개 기능
    └── ...

src/shared/                 # 공유 레이어
├── components/             # 공유 UI 컴포넌트
├── store/                  # 공유 상태 (auth, popup 등)
├── config/                 # 환경 설정
├── utils/                  # 공유 유틸리티
└── types/                  # 공유 타입

src/redux/                  # Redux 설정
├── api/                    # RTK Query API 슬라이스
├── registry/               # 리듀서/미들웨어 레지스트리
├── middleware/             # 커스텀 미들웨어
├── config.ts               # Redux 설정
├── storage.ts              # 보안 스토리지
└── setup.ts                # 리듀서 초기화
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
          default: 'disallow', // 기본: 모든 import 금지
          rules: [
            {
              from: 'shared',
              allow: ['shared'], // Shared는 Shared와 Features를 import 가능
              message: 'Shared는 Shared와 Features를 import할 수 있습니다.',
            },
            {
              from: 'features',
              allow: ['shared'], // Feature는 Shared만 import 가능
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
import { Button } from '@uiux/Button'

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
  // Shared Slices (src/shared/store/)
  auth: AuthState          // 인증 상태
  popup: PopupState        // 팝업 상태

  // Feature UI Slices (src/features/*/store/)
  dashboard: DashboardState // 대시보드 UI 상태
  products: ProductsUIState  // 상품 UI 상태 (선택, 뷰모드 등)

  // API Slices (src/redux/api/)
  // RTK Query로 관리되는 서버 데이터 상태
  // - productsApi: 상품 데이터
  // - dashboardApi: 대시보드 통계
}
```

**상태 분리 원칙:**
- **UI 상태**: Redux Slice (`features/*/store/*.ts`)
  - 폼 입력, 선택 항목, 모달 열기/닫기 등 일시적 상태
- **서버 데이터**: RTK Query (`src/redux/api/*.ts`)
  - API 호출, 캐싱, 재요청 등 서버 데이터 관리

### Redux Toolkit 패턴

#### 1. UI Slice 구조

```typescript
// features/products/store/productsUISlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductsUIState {
  selectedProducts: number[]
  // UI 전용 상태만 관리 (필터, 정렬은 URL로 관리)
}

const initialState: ProductsUIState = {
  selectedProducts: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleProductSelection: (state, action: PayloadAction<number>) => {
      const index = state.selectedProducts.indexOf(action.payload)
      if (index === -1) {
        state.selectedProducts.push(action.payload)
      } else {
        state.selectedProducts.splice(index, 1)
      }
    },
    clearProductSelection: (state) => {
      state.selectedProducts = []
    },
  },
})

export const { toggleProductSelection, clearProductSelection } = productsSlice.actions
export default productsSlice.reducer
```

**참고:** 서버 데이터는 RTK Query API 슬라이스에서 별도 관리됩니다.

#### 2. Selector 패턴

```typescript
// features/products/store/productsSelectors.ts
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/redux'

// Base Selectors
export const selectProductsState = (state: RootState) => state.products

// Memoized Selectors
export const selectSelectedProducts = createSelector(
  [selectProductsState],
  (products) => products.selectedProducts
)

export const selectSelectedProductsCount = createSelector(
  [selectSelectedProducts],
  (selectedProducts) => selectedProducts.length
)
```

**참고:** 서버 데이터 선택자는 RTK Query가 자동 생성합니다:
```typescript
// RTK Query 자동 생성 선택자
const { data: products, isLoading, error } = useGetProductsQuery()
```

#### 3. Registry Pattern

동적 리듀서 등록을 위한 레지스트리 패턴:

```typescript
// src/redux/registry/reducer.ts
import { Reducer } from '@reduxjs/toolkit'

class ReducerRegistry {
  private entries: Map<string, ReducerEntry> = new Map()
  // ... 전체 구현은 실제 파일 참조
}

export const reducerRegistry = new ReducerRegistry({
  validateKeys: true,
  warnOnDuplicate: true,
  mergeStrategy: 'replace',
})
```

**주요 기능:**
- 동적 리듀서 등록/제거 (Code Splitting 지원)
- 우선순위 기반 리듀서 실행 순서
- 런타임 리듀서 주입 (injectReducer/ejectReducer 액션)

### Redux Persist

**⚠️ sessionStorage에 상태 지속 (학습용 설정):**

> **보안 경고**: 이 설정은 학습 목적입니다. sessionStorage는 XSS 공격에 취약합니다. 실제 서비스에서는 httpOnly 쿠키와 서버 사이드 세션을 사용하세요.

```typescript
// src/redux/storage.ts
export const createSecureStorage = () => {
  if (typeof window === 'undefined') {
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

// src/redux/config.ts
const persistConfig = {
  key: 'root',
  storage: secureStorage, // ⚠️ sessionStorage 사용 (학습용, 프로덕션에서는 httpOnly 쿠키 권장)
  version: 1,
  whitelist: ['auth'], // 지속할 상태
  // transforms: [], // TODO: auth 구현 후 민감 데이터 필터링 활성화
  blacklist: [],
}
```

**보안 특징:**
- ⚠️ **sessionStorage 한계**: XSS 공격에 취약함 (localStorage와 동일한 보안 수준)
- ✅ **탭 수명 주기**: 탭 닫으면 자동 삭제 (일회성 세션에 적합)
- ✅ **SSR 호환**: 서버 사이드 렌더링 대응
- 🔒 **프로덕션 필수**: httpOnly 쿠키 사용 (XSS 방지, 서버 사이드)

**보안 경고**: sessionStorage와 localStorage는 둘 다 XSS 공격에 취약합니다. `sessionStorage`는 토큰 저장소가 아니라 개발/학습용 임시 저장소로만 사용해야 합니다. 실제 보안이 필요한 프로덕션에서는 반드시 httpOnly 쿠키를 사용하세요.

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

**위치:** `/src/shared/components/uiux/**/*.tsx`

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
├── providers.tsx           # Redux Provider 등
├── login/
│   └── page.tsx            # 로그인 페이지 (/login)
├── poc/                    # POC (Proof of Concept)
│   ├── [pageId]/page.tsx   # 동적 라우트
│   └── pages/Main.tsx      # 메인 페이지
├── pub/                    # 공개 페이지
│   └── poc/                # 공개 POC
└── sample/                 # 샘플 앱
    ├── layout.tsx          # 샘플 레이아웃
    ├── dashboard/
    │   └── page.tsx        # 대시보드 (/sample/dashboard)
    ├── products/           # 제품 관리
    │   ├── [pageId]/
    │   │   └── page.tsx    # 동적 라우트 (/sample/products/:pageId)
    │   └── pages/          # 페이지 컴포넌트들
    │       ├── List.tsx
    │       ├── Detail.tsx
    │       ├── Edit.tsx
    │       └── New.tsx
    ├── mdi/                # MDI (Multiple Document Interface) 샘플
    ├── xml/                # XML 처리 샘플
    └── ...
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
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const AuthGuard = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // 또는 로딩 컴포넌트
  }

  return <>{children}</>
}
```

**참고:** 서버 컴포넌트에서는 `redirect()` 함수 사용:
```typescript
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/login')
  }

  return <Dashboard />
}
```

### 동적 라우팅

```typescript
// app/sample/products/[pageId]/page.tsx
import { fileURLToPath } from 'url';
import dynamic from 'next/dynamic';
import { getPageFiles } from '@/shared/utils/file/getPageFiles';

// 🔒 페이지 파일들 동적으로 발견 (현재 파일 기준 ../pages)
const PAGE_IDS = getPageFiles(fileURLToPath(import.meta.url));
type PageId = (typeof PAGE_IDS)[number];

// 정적 생성: 빌드 시 HTML 미리 생성
export function generateStaticParams(): Array<{ pageId: PageId }> {
  return PAGE_IDS.map((pageId) => ({
    pageId,
  }));
}

export default async function Page({ params }: { params: { pageId: string } }) {
  const { pageId } = await params;

  // 동적 import로 페이지 컴포넌트 로드
  const PageComponent = dynamic(() => import(`../pages/${pageId}`), {
    ssr: true,
  });

  return <PageComponent />;
}
```

**특징:**
- **동적 페이지 발견**: `getPageFiles` 유틸리티로 `pages/` 디렉토리의 파일 자동 탐지
- **정적 생성**: `generateStaticParams`로 빌드 시 HTML 미리 생성
- **유연한 확장**: 새 페이지 파일 추가 시 코드 수정 불필요

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

#### 1. RTK Query 사용 (실제 구현)

```typescript
// features/products/hooks/useProducts.ts
export const useProducts = () => {
  const dispatch = useAppDispatch();

  // URL 기반 필터/정렬 상태
  const { filters, sort, viewMode, updateFilters, updateSort, updateViewMode } =
    useProductsURLState();

  // 쿼리 파라미터 안정화 (Vercel Best Practices)
  const queryParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      search: filters.search || undefined,
      status: filters.status || undefined,
      category: filters.category || undefined,
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
    }),
    [filters, sort]
  );

  // RTK Query 자동 fetching
  const { data: productsData, isLoading, isError, error, refetch } =
    useGetProductsQuery(queryParams);

  return {
    products: productsData?.products || [],
    total: productsData?.total || 0,
    isLoading,
    isError,
    error,
    updateFilters,
    updateSort,
    refetch,
  };
};
```

#### 2. 컴포넌트에서 사용

```typescript
export default function ListSection() {
  const { products, isLoading, error, filters, updateFilters } = useProducts();

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;

  return <ProductList products={products} />;
}
```

### 에러 처리 전략

```typescript
// 1. Next.js Error Boundary (app/error.tsx)
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>에러가 발생했습니다</h2>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}

// 2. RTK Query Error Handling
export const useProducts = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery(queryParams);

  return {
    products: data?.products || [],
    isLoading,
    isError: !!error,
    error, // RTK Query가 제공하는 에러 객체
    refetch, // 재시도 함수
  };
};

// 3. 컴포넌트에서 에러 처리
export default function ProductListSection() {
  const { products, isLoading, error, refetch } = useProducts();

  if (isLoading) return <Skeleton />;
  if (error) {
    return (
      <ErrorState
        message="제품을 불러올 수 없습니다"
        onRetry={refetch}
      />
    );
  }

  return <ProductList products={products} />;
}
```

---

## 성능 최적화

### 1. 코드 분할 (Code Splitting)

```typescript
// AG Grid 동적 import (Vercel Best Practices - bundle-dynamic-imports)
const ProductGrid = dynamic(
  () => import('@/features/products/components/ProductGrid').then((mod) => ({ default: mod.ProductGrid })),
  {
    loading: () => <div>Loading...</div>,
    ssr: false, // AG Grid는 클라이언트 사이드 전용
  }
);

// 조건부 렌더링으로 on-demand loading
{viewMode === 'grid' ? <ProductGrid products={products} /> : <ProductList products={products} />}
```

**이점:**
- 초기 번더 크기 ~500KB 감소 (AG Grid)
- LCP (Largest Contentful Paint) 개선
- 테이블 뷰 사용자에게 불필요한 코드 전송 방지

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
// Vercel Best Practices - rerender-dependencies
// useMemo로 쿼리 파라미터 안정화
const queryParams = useMemo(
  () => ({
    page: 1,
    pageSize: 10,
    search: filters.search || undefined,
    status: filters.status || undefined,
    category: filters.category || undefined,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  }),
  [filters, sort] // filters 또는 sort가 변경될 때만 재생성
);

// React.memo로 렌더링 최적화
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return <div>{product.name}</div>
})

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

**Zod를 사용한 타입 안전한 환경 변수 검증 (실제 구현):**

```typescript
// src/shared/config/env.ts
import { z } from 'zod';

// 환경 변수 스키마 정의
const envSchema = z.object({
  // Node.js 환경
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // 애플리케이션 설정 (공개)
  NEXT_PUBLIC_APP_NAME: z.string().default('Next.js App'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.0.0'),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().default(''),

  // API 설정 (공개)
  NEXT_PUBLIC_API_URL: z.string().default('/api'),
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
  NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS: z
    .string()
    .transform((val) => val === 'true')
    .default(false),
  NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING: z
    .string()
    .transform((val) => val === 'true')
    .default(true),

  // 개발 도구 설정 (공개)
  NEXT_PUBLIC_STORYBOOK_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .default(true),
  NEXT_PUBLIC_REDUX_DEVTOOLS: z
    .string()
    .transform((val) => val === 'true')
    .default(true),
  NEXT_PUBLIC_LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('debug'),

  // 디버그 설정 (비공개 - 서버 전용)
  DEBUG_IPS: z.string().optional(),
  DEBUG_LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('debug'),
});

// 환경 변수 검증 및 파싱
const config = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT,
  NEXT_PUBLIC_API_RETRY_COUNT: process.env.NEXT_PUBLIC_API_RETRY_COUNT,
  NEXT_PUBLIC_FEATURE_DARK_MODE: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE,
  NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS: process.env.NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS,
  NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING: process.env.NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING,
  NEXT_PUBLIC_STORYBOOK_ENABLED: process.env.NEXT_PUBLIC_STORYBOOK_ENABLED,
  NEXT_PUBLIC_REDUX_DEVTOOLS: process.env.NEXT_PUBLIC_REDUX_DEVTOOLS,
  NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
  DEBUG_IPS: process.env.DEBUG_IPS,
  DEBUG_LOG_LEVEL: process.env.DEBUG_LOG_LEVEL,
});

// 편의 속성들
export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
export const isTest = config.NODE_ENV === 'test';

// 공개 설정 (클라이언트에서 접근 가능)
export const publicConfig = {
  appName: config.NEXT_PUBLIC_APP_NAME,
  appVersion: config.NEXT_PUBLIC_APP_VERSION,
  appDescription: config.NEXT_PUBLIC_APP_DESCRIPTION,
  apiUrl: config.NEXT_PUBLIC_API_URL,
  apiTimeout: config.NEXT_PUBLIC_API_TIMEOUT,
  apiRetryCount: config.NEXT_PUBLIC_API_RETRY_COUNT,
  features: {
    darkMode: config.NEXT_PUBLIC_FEATURE_DARK_MODE,
    realtimeNotifications: config.NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS,
    performanceMonitoring: config.NEXT_PUBLIC_FEATURE_PERFORMANCE_MONITORING,
  },
  devtools: {
    storybook: config.NEXT_PUBLIC_STORYBOOK_ENABLED,
    redux: config.NEXT_PUBLIC_REDUX_DEVTOOLS,
    logLevel: config.NEXT_PUBLIC_LOG_LEVEL,
  },
} as const;

// 비공개 설정 (서버에서만 접근 가능)
export const serverConfig = {
  debugIps: config.DEBUG_IPS?.split(',').map((ip) => ip.trim()).filter(Boolean) ?? [],
  debugLogLevel: config.DEBUG_LOG_LEVEL,
} as const;
```

**사용 예시:**
```typescript
// 컴포넌트에서 사용
import { publicConfig, isDevelopment } from '@/shared/config/env';

const apiUrl = publicConfig.apiUrl;
const isDev = isDevelopment;
```

**⚠️ 참고:** 이 프로젝트는 Zod 검증을 사용합니다. 단순화된 대안보다 타입 안전성과 런타임 검증이 중요한 경우 Zod 사용을 권장합니다.

### 2. XSS 방지

```typescript
// React의 기본 XSS 방지 활용
<div>{userInput}</div> // ✅ 자동 이스케이프

// 명시적 HTML 렌더링 시 주의
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
```

### 3. 인증 토큰 저장소 보안

> **중요**: 이 프로젝트의 Redux Persist 설정은 학습 목적입니다.

#### 저장소별 보안 비교

| 저장소 | XSS 취약성 | CSRF 취약성 | 지속성 | 용도 |
|--------|-----------|-------------|--------|------|
| **localStorage** | ⚠️ 취약 | ⚠️ 가능 | 영구 | ❌ 토큰 저장 부적합 |
| **sessionStorage** | ⚠️ 취약 | ✅ 방지됨 | 탭만료 | ⚠️ 학습용만 |
| **httpOnly 쿠키** | ✅ 방지됨 | ⚠️ 가능 | 설정가능 | ✅ 토큰 저장 최선 |
| **메모리 (useState)** | ✅ 방지됨 | ✅ 방지됨 | 새로고침시소실 | ✅ 최단 수명용 |

#### 프로덕션 권장사항

```typescript
// ⚠️ 학습용 (현재 프로젝트)
// 취약점: XSS 공격으로 토큰 탈취 가능
sessionStorage.setItem('token', accessToken)

// ✅ 프로덕션용 (서버 구현 필요)
// 1. httpOnly 쿠키로 토큰 저장 (서버 사이드)
// 2. JWT Access Token (짧은 수명: 15분)
// 3. Refresh Token Rotation (httpOnly 쿠키)
// 4. CSRF 토큰 또는 SameSite 쿠키 속성

// 예시: Next.js API Route에서 쿠키 설정
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const accessToken = generateJWT({ userId })
  cookies().set('access_token', accessToken, {
    httpOnly: true,        // ✅ JavaScript 접근 불가 (XSS 방지)
    secure: true,          // ✅ HTTPS 전용
    sameSite: 'strict',    // ✅ CSRF 방지
    maxAge: 60 * 15,       // 15분
    path: '/',
  })
}
```

#### 보안 검증 체크리스트

- [ ] httpOnly 쿠키 사용중인가?
- [ ] HTTPS 환경에서만 `secure: true` 쿠키 사용?
- [ ] Access Token 수명이 15-30분 이내인가?
- [ ] Refresh Token은 별도의 rotation 로직이 있는가?
- [ ] SameSite 속성으로 CSRF 방지?
- [ ] 민감 정보를 클라이언트 스토리지에 저장하지 않는가?

---

## 기술적 의사결정

### 1. 왜 Redux Toolkit + RTK Query인가?

**이유:**
- ✅ 복잡한 상태 로직 관리 용이
- ✅ DevTools로 디버깅 편리
- ✅ 미들웨어 생태계 풍부
- ✅ TypeScript 지원 우수
- ✅ RTK Query로 서버 데이터 캐싱 자동화

**실제 구현:**
- **Redux Toolkit**: UI 상태 관리 (선택, 필터, 정렬 등)
- **RTK Query**: 서버 데이터 fetching, 캐싱, 재요청

**⚠️ 학습 고려사항:**
Redux Toolkit은 강력하지만 학습 곡선이 있습니다. 프로젝트에서는 다음 단계적 접근을 권장합니다:

1. **1단계**: `useState`, `useReducer`로 기본 개념 학습
2. **2단계**: React Context API로 전역 상태 관리 경험
3. **3단계**: Redux Toolkit + RTK Query 도입 (현재 프로젝트)

**대안 고려:**
- **Zustand**: 더 간단한 API, 보일러플레이트 적음, 학습에 더 적합
- **Jotai**: 원자적 상태 관리, React 개념과 더 유사
- **TanStack Query (React Query)**: 서버 데이터 전용, Redux 없이 사용 가능
- **Redux Toolkit + RTK Query**: 복잡한 상태 로직, 대규모 앱에 적합

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

**⚠️ 학습 고려사항:**
MSW는 강력한 도구지만, Next.js 학습 초반에는 다음 간단한 대안으로 시작하는 것을 권장:

```typescript
// 학습용 간단 mock (추천)
export const mockApi = {
  getProducts: async () => mockProducts,
  createProduct: async (data) => ({ ...data, id: Date.now() })
}
```

**학습 단계:**
1. **단순 mock 함수**: API 통신 기본 개념 학습
2. **MSW 도입**: 네트워크 인터셉팅, 테스트 통합 학습
3. **실제 API 연동**: 프로덕션 환경 경험

**대안 고려:**
- **간단 mock 함수**: 학습 초반에 적합, 설정 불필요
- **MSW**: 테스트 작성, 네트워크 로직 검증에 적합
- **JSON Server**: REST API 경험 필요 시, 실제 서버와 유사

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

## 아키텍처 거래와 제한사항

> 실제 개발에서 아키텍처는 이상적인 규칙이 아니라, 현실적인 거래(trade-off)의 결과입니다.

### Feature-Based vs Layer-Based 긴장

**본질적 긴장**:
- **Feature-Based**: 기능별로 코드를 모으기 → 관련 코드가 한 곳에
- **Layer-Based**: 레이어별로 코드를 분리하기 → 관심사 분리

이 두 원칙은 완벽하게 조화될 수 없습니다:

```
문제 상황: Product 컴포넌트에서 User 데이터 필요
┌─────────────────────────────────────────┐
│ products/feature/                       │
│   components/ProductCard.tsx            │
│     → User 데이터 필요!                  │
│                                         │
│ 옵션 1: products에서 auth import        │
│   ❌ eslint-plugin-boundaries 에러      │
│                                         │
│ 옵션 2: props로 User 데이터 전달         │
│   ✅ 규칙 준수                          │
│   ⚠️ props drilling 문제                 │
│                                         │
│ 옵션 3: Shared Layer에서 가져오기        │
│   ✅ 규칙 준수                          │
│   ⚠️ Shared가 비대해짐                   │
└─────────────────────────────────────────┘
```

**실무 지침**:

1. **엄격한 기능 분리는 작은 프로젝트에서 과도할 수 있습니다**
2. **교차 기능 데이터는 Shared Layer를 통해 전달하세요**
3. **Props drilling 과정을 피하고 싶다면 Context API를 고려하세요**
4. **ESLint 규칙은 가이드라이지, 절대 법칙은 아닙니다**

### Registry Pattern의 필요성

본 문서의 Registry Pattern (동적 리듀서 등록)은 **코드 분할(code-splitting)** 시나리오를 위해 설계되었습니다:

**언제 유용한가:**
- 대규모 앱에서 초기 번들 크기를 최적화해야 할 때
- 특정 기능이 사용되기 전까지 리듀서를 로드하지 않을 때
- 라우트 기반 코드 분할을 구현할 때

**소규모 프로젝트에서는:**
```typescript
// 간단한 구현으로 충분합니다
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    dashboard: dashboardReducer,
  }
})
```

### 환경 변수 검증의 복잡성

Zod 스키마 검증은 프로덕션 환경에서 환경 변수 구성 오류를 조기에 발견하는 데 유용합니다.

**학습 프로젝트에서는 더 간단하게:**

```typescript
// 간단한 구현 (학습용)
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  apiTimeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  isDev: process.env.NODE_ENV === 'development',
}

export default config
```

**Zod 검증이 필요한 경우:**
- 팀 규모가 크고 환경 변수 실수 방지가 중요할 때
- CI/CD 파이프라인에서 구성 유효성 검증이 필요할 때
- TypeScript 타입 안전성과 런타임 검증이 모두 필요할 때

### 단계적 학습 접근

이 문서의 아키텍처는 **프로덕션 레벨 패턴**을 포함하고 있습니다. 학습에는 다음 단계를 권장:

**1단계: 기본 개념 (1-2주)**
- Next.js App Router 기본
- React Hooks (useState, useEffect)
- 기본 라우팅
- 간단한 API 통신

**2단계: 상태 관리 (2-3주)**
- useState, useReducer
- React Context API
- 전역 상태 관리 개념

**3단계: 아키텍처 패턴 (3-4주)**
- Feature-Based 구조
- Redux Toolkit + RTK Query 도입
- 레이어 분리

**4단계: 고급 패턴 (필요 시)**
- 코드 분할, 동적 import
- 복잡한 보안 패턴
- 성능 최적화

### 현실적인 조언

> "완벽한 아키텍처"보다 "작동하는 소프트웨어"가 먼저입니다.

- ✅ 이 문서의 패턴들은 **프로덕션에서 검증된 사례**입니다
- ✅ 하지만 **모든 패턴을 한 번에 적용할 필요는 없습니다**
- ✅ **프로젝트 요구사항과 팀 역량**에 맞게 선택적으로 적용하세요
- ⚠️ 과도한 엔지니어링은 학습을 방해할 수 있습니다

---

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Redux Toolkit 문서](https://redux-toolkit.js.org/)
- [RTK Query 문서](https://redux-toolkit.js.org/rtk-query/overview)
- [React 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
