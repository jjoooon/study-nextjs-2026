# 코딩 컨벤션

이 문서는 프로젝트에서 따라야 할 코딩 표준과 모범 사례를 정의합니다.

## 목차

1. [기본 원칙](#기본-원칙)
2. [TypeScript 규칙](#typescript-규칙)
3. [React/Next.js 규칙](#reactnextjs-규칙)
4. [파일 명명 규칙](#파일-명명-규칙)
5. [Import/Export 규칙](#importexport-규칙)
6. [상태 관리](#상태-관리)
7. [API 통합 패턴](#api-통합-패턴)
8. [테스트](#테스트)
9. [보안](#보안)
10. [접근성](#접근성)
11. [국제화 (i18n)](#국제화-i18n)
12. [코드 포맷팅](#코드-포맷팅)
13. [린트 규칙](#린트-규칙)
14. [주석 작성 가이드](#주석-작성-가이드)
15. [예외 처리](#예외-처리)
16. [성능 가이드라인](#성능-가이드라인)
17. [Git 커밋 메시지](#git-커밋-메시지)

---

## 기본 원칙

### 1. 가독성 우선

코드는 작성하는 것보다 읽는 시간이 더 많습니다. 명확하고 이해하기 쉬운 코드를 작성하세요.

```typescript
// ✅ 좋은 예: 명확한 변수명
const userAuthenticationToken = getUserToken()

// ❌ 나쁜 예: 의미 없는 약어
const uat = getTk()
```

### 2. 일관성 유지

프로젝트 전체에서 일관된 스타일과 패턴을 유지하세요.

### 3. DRY (Don't Repeat Yourself)

중복 코드를 피하고 재사용 가능한 함수/컴포넌트로 추출하세요.

```typescript
// ✅ 좋은 예: 재사용 가능한 함수
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR').format(date)
}

// ❌ 나쁜 예: 중복 코드
const date1 = new Date(date).toLocaleDateString('ko-KR')
const date2 = new Date(date2).toLocaleDateString('ko-KR')
```

### 4. KISS (Keep It Simple, Stupid)

단순한 해결책을 선호하세요. 과도한 추상화는 피하세요.

---

## TypeScript 규칙

### 1. 타입 정의

#### 1.1 인터페이스 vs 타입

**인터페이스 사용 (권장):**
- 객체의 구조를 정의할 때
- 확장 가능해야 할 때
- 클래스 구현을 정의할 때

**타입 별칭 사용 (권장):**
- 유니온 타입
- 교차 타입
- 함수 시그니처
- mapped types
- conditional types

```typescript
// ✅ 좋은 예: 인터페이스
interface User {
  id: string
  name: string
  email: string
}

interface Admin extends User {
  permissions: string[]
}

// ✅ 좋은 예: 타입 별칭
type Status = 'pending' | 'approved' | 'rejected'
type ID = string | number
type EventHandler = (event: Event) => void

// 참고: 최근 TypeScript 트렌드에서는 대부분의 경우 타입 별칭을 선호하는 경향이 있습니다.
// 프로젝트 내에서 일관성만 유지된다면 두 가지 방식 모두 사용 가능합니다.
```

#### 1.2 타입 import/export

```typescript
// ✅ 좋은 예: 타입 전용 import
import type { User } from '@/types/user'
import { UserService } from '@/services/UserService'

// ✅ 타입 export
export type { Product, ProductFilters }
```

#### 1.3 제네릭 사용

```typescript
// ✅ 좋은 예: 제네릭으로 재사용성 향상
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
}

// 사용
type UsersResponse = ApiResponse<User[]>
type ProductsResponse = PaginatedResponse<Product>
```

#### 1.4 엄격한 타입 사용

```typescript
// ✅ 좋은 예: 명시적 타입
const getUserById = (id: string): Promise<User> => {
  return api.get(`/users/${id}`)
}

// ⚠️ any 타입은 피하되, 예외적인 경우에는 unknown 사용
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    // 타입 가드 후 사용
  }
}

// ❌ 피하세요: 타입 단언 과용
const user = data as User

// ✅ 타입 가드 사용을 권장
const isUser = (data: unknown): data is User => {
  return typeof data === 'object' && data !== null && 'id' in data
}
```

**any 타입 사용이 허용되는 예외적인 경우:**

```typescript
// 1. 외부 라이브러리의 타입이 불완전할 때 (잠시 사용, 타입 정의 후 제거)
// 2. 마이그레이션 중일 때 (임시 조치)
// 3. 테스트 코드에서 의도적으로 느슨한 타입이 필요할 때
```

#### 1.5 Enum vs Union Types

**기본적으로 Union Types 선호:**

```typescript
// ✅ 좋은 예: Union Type
type Status = 'pending' | 'approved' | 'rejected'

const status: Status = 'pending'
```

**Enum을 사용해도 좋은 경우:**

```typescript
// ✅ 적절한 Enum 사용 사례

// 1. 값의 순회가 필요한 경우
enum Direction {
  North,
  East,
  South,
  West,
}

// 모든 값 순회
Object.values(Direction).forEach(d => console.log(d))

// 2. 관련 데이터와 함께 사용해야 할 때
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

// 3. 역호환성이 필요한 경우 (기존 코드와 통합)

// ⚠️ 주의: Enum은 번들 크기를 증가시키므로 실제로 필요한 경우에만 사용하세요.
```

### 2. 함수 규칙

#### 2.1 함수 시그니처

```typescript
// ✅ 좋은 예: 명확한 매개변수와 반환 타입
const calculateTotal = (
  price: number,
  quantity: number,
  discount: number = 0
): number => {
  return price * quantity * (1 - discount)
}
```

#### 2.2 매개변수 순서

```typescript
// ✅ 좋은 예: 데이터 필드 → 옵션 객체
const fetchUsers = (
  query: string,
  options: {
    page?: number
    limit?: number
    sortBy?: string
  } = {}
) => {
  // ...
}

// 사용
fetchUsers('john', { page: 1, limit: 10 })
```

#### 2.3 비동기 함수

```typescript
// ✅ 좋은 예: async/await
const loadData = async (): Promise<void> => {
  try {
    const data = await fetchData()
    processData(data)
  } catch (error) {
    handleError(error)
  }
}
```

### 3. 변수 규칙

#### 3.1 변수 선언

```typescript
// ✅ 좋은 예: const 우선, 변경 필요 시 let
const API_URL = 'https://api.example.com'
let currentUser: User | null = null

// ❌ 피하세요: var 사용
var data = []
```

#### 3.2 변수 명명

```typescript
// ✅ 좋은 예: camelCase
const userName = 'John'
const isLoggedIn = true
const maxRetries = 3

// 불리언: is/has/should 접두사
const isActive = true
const hasPermission = false
const shouldUpdate = true

// ✅ 상수: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'
```

---

## React/Next.js 규칙

### 1. 컴포넌트 규칙

#### 1.1 함수 컴포넌트 사용

```typescript
// ✅ 좋은 예: 함수 컴포넌트
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <div>{product.name}</div>
}

// 또는
export default function ProductCard({ product }: ProductCardProps) {
  return <div>{product.name}</div>
}
```

#### 1.2 Props 인터페이스

```typescript
// ✅ 좋은 예: 명확한 Props 정의
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
```

#### 1.3 defaultProps 대신 디폴트 매개변수

```typescript
// ✅ 좋은 예: 디폴트 매개변수
interface CardProps {
  title: string
  subtitle?: string
  showShadow?: boolean
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  showShadow = false, // 디폴트 값
}) => {
  return <div>{title}</div>
}

// ❌ 피하세요: defaultProps (deprecated)
Card.defaultProps = {
  showShadow: false,
}
```

### 2. Hooks 규칙

#### 2.1 Custom Hooks

```typescript
// ✅ 좋은 예: Custom Hook
// hooks/useProducts.ts
export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await productService.getProducts(filters)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}
```

#### 2.2 Hooks 규칙 준수

```typescript
// ✅ 좋은 예: Hooks 규칙 준수
export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null)

  // 최상위 레벨에서만 호출
  useEffect(() => {
    fetchUser()
  }, [])

  // 조건부 Hook은 함수 내부로
  const renderContent = () => {
    if (!user) return <Loading />

    return <UserDetail user={user} />
  }

  return <div>{renderContent()}</div>
}

// ❌ 나쁜 예: 조건부 Hook
if (someCondition) {
  useEffect(() => { /* ... */ }) // 위반!
}
```

#### 2.3 Hooks 명명

```typescript
// ✅ 좋은 예: use 접두사
const useProducts = () => { /* ... */ }
const useAuth = () => { /* ... */ }
const useForm = <T>() => { /* ... */ }

// ❌ 나쁜 예: 접두사 없음
const getProducts = () => { /* ... */ }
const authData = () => { /* ... */ }
```

### 3. JSX 규칙

#### 3.1 Fragment 사용

**기본적으로 Fragment 사용 권장:**

```typescript
// ✅ 좋은 예: Fragment (불필요한 DOM 노드 없음)
return (
  <>
    <Header />
    <Main />
    <Footer />
  </>
)

// 또는
return (
  <React.Fragment>
    <Header />
    <Main />
    <Footer />
  </React.Fragment>
)
```

**div 래퍼가 적절한 경우:**

```typescript
// ✅ 적절한 div 사용 사례

// 1. CSS 스타일링 경계가 필요할 때
return (
  <div className="card-container">
    <CardHeader />
    <CardBody />
    <CardFooter />
  </div>
)

// 2. Flexbox/Grid 컨테이너가 필요할 때
return (
  <div className="flex gap-4 items-center">
    <Avatar />
    <UserInfo />
  </div>
)

// 3. 레이아웃 구조를 위한 semantic wrapper
return (
  <section className="hero-section">
    <HeroContent />
  </section>
)

// ❌ 피하세요: 목적 없는 div 래퍼
return (
  <div>
    <Header />
    <Main />
  </div>
)
```

#### 3.2 조건부 렌더링

```typescript
// ✅ 좋은 예: 조건부 렌더링
return (
  <div>
    {isLoading && <LoadingSpinner />}
    {error && <ErrorMessage message={error} />}
    {data && <DataList items={data} />}
  </div>
)

// ✅ 삼항 연산자 (두 가지 경우)
return (
  <div>
    {isLoggedIn ? <Dashboard /> : <Login />}
  </div>
)

// ❌ 피하세요: IIFE (즉시 실행 함수)
return (
  <div>
    {(() => {
      if (isLoading) return <Loading />
      if (error) return <Error />
      return <Content />
    })()}
  </div>
)
```

#### 3.3 리스트 렌더링

```typescript
// ✅ 좋은 예: 명시적인 key
return (
  <ul>
    {products.map((product) => (
      <ProductCard
        key={product.id} // 고유한 key
        product={product}
      />
    ))}
  </ul>
)

// ❌ 나쁜 예: index key
{products.map((product, index) => (
  <ProductCard key={index} product={product} />
))}
```

#### 3.4 이벤트 핸들러

```typescript
// ✅ 좋은 예: 명명된 핸들러
export const ProductForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ...
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ...
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
    </form>
  )
}

// ✅ 인라인 핸들러 (간단한 경우)
<button onClick={() => setActiveTab('home')}>Home</button>
```

### 4. Next.js 특정 규칙

#### 4.0 Server Components vs Client Components (Next.js 14+)

**가장 중요한 아키텍처 결정:**

```typescript
// ✅ Server Component (기본값)
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await fetchProducts() // DB 호출 가능

  return <ProductList products={products} />
}

// ✅ Client Component (useContext, useState, useEffect 등 필요 시)
// components/ProductList.tsx
'use client'

export function ProductList({ products }: { products: Product[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div>
      {products.map(p => (
        <div key={p.id} onClick={() => setSelectedId(p.id)}>
          {p.name}
        </div>
      ))}
    </div>
  )
}
```

**결정 가이드라인:**

| 상황 | Server Component | Client Component |
|------|------------------|------------------|
| 데이터 페칭 | ✅ 기본 선택 | ❌ 불가능 (fetch/useEffect) |
| useState/useContext | ❌ 사용 불가 | ✅ 필요 시 |
| 이벤트 핸들러 | ❌ 불가능 | ✅ 필요 시 |
| 브라우저 API | ❌ 불가능 | ✅ 필요 시 |
| SEO 중요 콘텐츠 | ✅ 권장 | ⚠️ hydration 필요 |
| 초기 로딩 속도 | ✅ 번들 감소 | ⚠️ JS 증가 |

**패턴: Server Component 내부에 Client Component 조합**

```typescript
// ✅ 좋은 예: 경계 명확히 분리
// app/products/page.tsx (Server)
import { ProductFilters } from '@/components/ProductFilters' // Client
import { ProductGrid } from '@/components/ProductGrid' // Client

export default async function ProductsPage() {
  const products = await fetchProducts()

  return (
    <>
      <ProductFilters initialFilters={{}} />
      <ProductGrid products={products} />
    </>
  )
}

// ✅ Server Actions 사용 (폼 제출 등)
'use client'

export function DeleteButton({ productId }: { productId: string }) {
  async function handleDelete() {
    'use server'
    await deleteProduct(productId)
  }

  return <button formAction={handleDelete}>삭제</button>
}
```

#### 4.1 페이지 컴포넌트

```typescript
// ✅ 좋은 예: Page 컴포넌트
// app/sample/products/page.tsx
export default function ProductsPage() {
  return <ProductsList />
}

// ✅ async 서버 컴포넌트 (Next.js 14+)
export default async function ProductsPage() {
  const products = await fetchProducts()

  return <ProductsList products={products} />
}
```

#### 4.2 Layout 컴포넌트

```typescript
// ✅ 좋은 예: Layout 컴포넌트
// app/sample/layout.tsx
export default function SampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="sample-layout">
      <Navigation />
      <main>{children}</main>
    </div>
  )
}
```

#### 4.3 이미지 사용

```typescript
// ✅ 좋은 예: next/image 사용
import Image from 'next/image'

export const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={300}
      placeholder="blur"
      blurDataURL="/placeholder.jpg"
    />
  )
}

// ❌ 피하세요: 일반 img 태그 (최적화 안됨)
<img src={src} alt={alt} />
```

---

## 파일 명명 규칙

### 1. 파일명 케이스

| 파일 타입 | 명명 규칙 | 예시 |
|-----------|----------|------|
| 컴포넌트 | PascalCase | `UserProfile.tsx`, `ProductList.tsx` |
| 섹션 (Section) | PascalCase + Section 접미사 | `ListSection.tsx`, `DetailSection.tsx`, `EditSection.tsx` |
| 유틸리티/함수 | camelCase | `dateUtils.ts`, `formatCurrency.ts` |
| Hooks | camelCase (use 접두사) | `useProducts.ts`, `useAuth.ts` |
| 타입 정의 | camelCase | `userTypes.ts`, `apiTypes.ts` |
| 상수 | camelCase | `api.ts`, `route.ts` |
| 설정 | camelCase | `eslintConfig.js`, `tailwindConfig.ts` |

### 2. 디렉토리 구조

```
features/
├── auth/
│   ├── components/           # PascalCase 파일명 (재사용 가능한 UI 컴포넌트)
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── sections/             # PascalCase + Section 접미사 (페이지 단위 컴포넌트)
│   │   ├── LoginSection.tsx
│   │   ├── RegisterSection.tsx
│   │   └── ProfileSection.tsx
│   ├── hooks/                # camelCase + use 접두사
│   │   └── useAuth.ts
│   ├── services/             # camelCase + Service 접미사
│   │   └── authService.ts
│   └── types/                # camelCase
│       └── authTypes.ts
```

### 3. Components vs Sections

**components/** - 재사용 가능한 UI 컴포넌트
- 작은 단위의 UI 조각
- 여러 곳에서 재사용
- 독립적으로 렌더링 가능
- 예: `Button.tsx`, `ProductCard.tsx`, `DataTable.tsx`

**sections/** - 페이지 단위 컴포넌트
- 페이지 전체 또는 큰 단위의 레이아웃
- 특정 라우트와 연결
- 여러 components를 조합
- 예: `ListSection.tsx`, `DetailSection.tsx`, `EditSection.tsx`

### 4. 인덱스 파일

```typescript
// ✅ 좋은 예: barrels pattern
// features/products/components/index.ts
export { ProductList } from './ProductList'
export { ProductCard } from './ProductCard'
export { ProductForm } from './ProductForm'

// features/products/sections/index.ts
export { ListSection } from './ListSection'
export { DetailSection } from './DetailSection'
export { EditSection } from './EditSection'
export { NewSection } from './NewSection'

// 사용
import { ProductList, ProductCard, ProductForm } from '@/features/products/components'
import { ListSection, DetailSection } from '@/features/products/sections'
```

### 5. 실제 프로젝트 예시

```typescript
// ✅ 좋은 예: Products Feature 구조
features/products/
├── components/              # 재사용 가능한 UI 컴포넌트
│   ├── ProductCard.tsx      # 개별 제품 카드
│   ├── ProductGrid.tsx      # 제품 그리드 레이아웃
│   ├── ProductList.tsx      # 제품 테이블 뷰
│   ├── ProductFilters.tsx   # 필터 UI
│   └── index.ts
├── sections/                # 페이지 단위 컴포넌트
│   ├── ListSection.tsx      # 제품 목록 페이지
│   ├── DetailSection.tsx    # 제품 상세 페이지
│   ├── EditSection.tsx      # 제품 수정 페이지
│   ├── NewSection.tsx       # 제품 등록 페이지
│   └── index.ts
├── hooks/
│   └── useProducts.ts
├── services/
│   └── productService.ts
├── store/
│   └── productsUISlice.ts
├── types/
│   └── productTypes.ts
└── constants/
    └── routes.ts

// ListSection.tsx - 페이지 단위 컴포넌트
// 여러 components를 조합하여 페이지 구성
export default function ListSection() {
  return (
    <>
      <ProductFilters />
      <ProductList />
    </>
  )
}
```

### 6. 섹션 (Section) 컴포넌트 작성 가이드

```typescript
// ✅ 좋은 예: Section 컴포넌트 구조
// features/products/sections/ListSection.tsx

/**
 * List Section
 *
 * 제품 목록 페이지 컴포넌트
 *
 * @description
 * - 여러 components(ProductFilters, ProductList) 조합
 * - 페이지 단위의 상태 관리
 * - 라우팅 로직 처리
 */
export default function ListSection() {
  // 1. 페이지 단위 상태 관리
  const { products, filters, updateFilters } = useProducts()

  // 2. 이벤트 핸들러 (라우팅 포함)
  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`)
  }

  // 3. components 조합
  return (
    <div className="container">
      <ProductFilters filters={filters} onChange={updateFilters} />
      <ProductList products={products} onItemClick={handleProductClick} />
    </div>
  )
}
```

### 7. 파일명 선택 가이드라인

**Component로 분류하는 경우:**
- 단일 UI 요소 (버튼, 입력필드, 카드)
- 여러 페이지에서 재사용
- 독립적인 스타일과 동작
- props로 데이터 전달

**Section으로 분류하는 경우:**
- 페이지 전체 또는 주요 영역
- 특정 라우트와 1:1 매핑
- 여러 components를 포함
- 복잡한 상태 관리 및 라우팅 로직

---

## 상태 관리

### 1. 상태 관리 도구 선택 가이드

```typescript
// 상태 범위에 따른 도구 선택
┌─────────────────────────────────────────────────────────────┐
│ Local State (컴포넌트 내부)                                 │
│ → useState, useReducer                                       │
├─────────────────────────────────────────────────────────────┤
│ Cross-Component State (같은 feature 내)                     │
│ → Context API + useReducer                                   │
├─────────────────────────────────────────────────────────────┤
│ Global State (여러 feature 공유)                            │
│ → Zustand / Jotai (권장)                                    │
│ → Redux Toolkit (대규모 앱)                                  │
├─────────────────────────────────────────────────────────────┤
│ Server State (API 데이터)                                   │
│ → React Query / SWR (권장)                                  │
│ → Next.js Server Components (fetch)                         │
└─────────────────────────────────────────────────────────────┘
```

### 2. useState vs useReducer

```typescript
// ✅ useState: 독립적인 상태, 간단한 로직
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)

// ✅ useReducer: 복잡한 상태 로직, 여러 관련 상태
interface State {
  user: User | null
  isLoading: boolean
  error: string | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User }
  | { type: 'FETCH_ERROR'; payload: string }

const [state, dispatch] = useReducer(authReducer, initialState)
```

### 3. Context API 패턴

```typescript
// ✅ 좋은 예: Context + useReducer 조합
// features/auth/context/AuthContext.tsx
interface AuthContextValue {
  state: State
  dispatch: Dispatch<Action>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// 커스텀 Hook으로 컨텍스트 접근
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### 4. Zustand 사용 패턴 (권장)

```typescript
// ✅ 간단하고 타입 안전한 전역 상태
// stores/authStore.ts
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}))

// 사용
function Profile() {
  const { user, logout } = useAuthStore()
  // ...
}
```

### 5. Server State 관리 (React Query)

```typescript
// ✅ API 데이터는 React Query로 관리
// hooks/useProducts.ts
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// ✅ mutations
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
```

### 6. 상태 드릴링 피하기

```typescript
// ❌ 나쁜 예: props drilling
function App() {
  const [user, setUser] = useState<User>()
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }: Props) {
  return <Header user={user} setUser={setUser} />
}

function Header({ user, setUser }: Props) {
  return <UserMenu user={user} setUser={setUser} />
}

// ✅ 좋은 예: Context로 해결
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  )
}

function Layout() {
  return <Header />
}

function Header() {
  const { user, setUser } = useUser() // Context에서 직접 접근
  // ...
}
```

---

## API 통합 패턴

### 1. API 클라이언트 구조

```typescript
// ✅ 좋은 예: 계층형 API 구조
// lib/api/client.ts - 기본 클라이언트
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

// 요청/응답 인터셉터
apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 처리
      handleTokenRefresh()
    }
    return Promise.reject(error)
  }
)
```

### 2. Service Layer 패턴

```typescript
// ✅ 좋은 예: feature별 service
// features/products/services/productService.ts
import { apiClient } from '@/lib/api/client'
import type { Product, ProductFilters } from '../types'

export const productService = {
  // 목록 조회
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    return apiClient.get('/products', { params: filters })
  },

  // 단건 조회
  getProduct: async (id: string): Promise<Product> => {
    return apiClient.get(`/products/${id}`)
  },

  // 생성
  createProduct: async (data: CreateProductDTO): Promise<Product> => {
    return apiClient.post('/products', data)
  },

  // 수정
  updateProduct: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    return apiClient.put(`/products/${id}`, data)
  },

  // 삭제
  deleteProduct: async (id: string): Promise<void> => {
    return apiClient.delete(`/products/${id}`)
  },
}
```

### 3. 일관된 에러 처리

```typescript
// lib/api/errors.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// 에러 처리 유틸리티
export function handleAPIError(error: unknown): APIError {
  if (axios.isAxiosError(error)) {
    return new APIError(
      error.response?.data?.message || 'API 요청 실패',
      error.response?.status || 500,
      error.response?.data?.code
    )
  }
  return new APIError('알 수 없는 에러', 500)
}
```

### 4. 로딩/에러 상태 관리 패턴

```typescript
// ✅ 좋은 예: 일관된 상태 관리
export function useProducts(filters?: ProductFilters) {
  const [state, setState] = useState({
    data: null as Product[] | null,
    isLoading: false,
    error: null as string | null,
  })

  const fetchProducts = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await productService.getProducts(filters)
      setState({ data, isLoading: false, error: null })
    } catch (error) {
      const apiError = handleAPIError(error)
      setState({ data: null, isLoading: false, error: apiError.message })
    }
  }, [filters])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    ...state,
    refetch: fetchProducts,
  }
}

// React Query 사용 시 더 간단
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
  })
}
```

### 5. 타입 안전한 API 통신

```typescript
// ✅ 좋은 예: Zod와 함께 사용한 런타임 타입 검증
import { z } from 'zod'

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
})

export type Product = z.infer<typeof ProductSchema>

export async function getProduct(id: string): Promise<Product> {
  const response = await apiClient.get(`/products/${id}`)
  return ProductSchema.parse(response.data) // 런타임 검증
}
```

---

## 테스트

### 1. 테스트 파일 구조

```
features/
├── products/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   └── ProductCard.test.tsx       # 컴포넌트 테스트
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useProducts.test.ts        # Hook 테스트
│   ├── services/
│   │   ├── productService.ts
│   │   └── productService.test.ts     # Service 테스트
│   └── __tests__/
│       └── products.integration.test.ts  # 통합 테스트
```

### 2. 컴포넌트 테스트 (React Testing Library)

```typescript
// ✅ 좋은 예: 사용자 관점 테스트
// ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: '테스트 제품',
    price: 10000,
  }

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('테스트 제품')).toBeInTheDocument()
    expect(screen.getByText('10,000원')).toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', () => {
    const onEdit = vi.fn()
    render(<ProductCard product={mockProduct} onEdit={onEdit} />)

    fireEvent.click(screen.getByRole('button', { name: /수정/ }))

    expect(onEdit).toHaveBeenCalledWith('1')
  })
})
```

### 3. Hook 테스트

```typescript
// ✅ 좋은 예: @testing-library/react-hooks 사용
// useProducts.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useProducts } from './useProducts'
import { productService } from '../services/productService'

vi.mock('../services/productService')

describe('useProducts', () => {
  it('fetches products on mount', async () => {
    const mockProducts = [{ id: '1', name: '제품1' }]
    vi.mocked(productService.getProducts).mockResolvedValue(mockProducts)

    const { result } = renderHook(() => useProducts())

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.data).toEqual(mockProducts)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('handles errors', async () => {
    vi.mocked(productService.getProducts).mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.error).toBe('API Error')
    })
  })
})
```

### 4. API 서비스 테스트

```typescript
// ✅ 좋은 예: MSW (Mock Service Worker) 사용
// productService.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { productService } from './productService'

const server = setupServer(
  http.get('/api/products', () => {
    return HttpResponse.json([
      { id: '1', name: '제품1', price: 10000 },
    ])
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('productService', () => {
  it('fetches products', async () => {
    const products = await productService.getProducts()

    expect(products).toEqual([
      { id: '1', name: '제품1', price: 10000 },
    ])
  })

  it('handles errors', async () => {
    server.use(
      http.get('/api/products', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    await expect(productService.getProducts()).rejects.toThrow()
  })
})
```

### 5. 통합 테스트

```typescript
// ✅ 좋은 예: Playwright를 사용한 E2E 테스트
// tests/e2e/products.spec.ts
import { test, expect } from '@playwright/test'

test('product list page', async ({ page }) => {
  await page.goto('/products')

  // 로딩 상태 확인
  await expect(page.locator('[data-testid="loading"]')).toBeVisible()

  // 제품 목록 렌더링 확인
  await expect(page.locator('[data-testid="product-list"]')).toBeVisible()

  // 검색 기능 테스트
  await page.fill('[data-testid="search-input"]', '테스트')
  await page.click('[data-testid="search-button"]')

  await expect(page.locator('text=테스트')).toBeVisible()
})
```

### 6. 테스트 작성 원칙

```typescript
// ✅ 좋은 예: AAA 패턴 (Arrange-Act-Assert)
it('calculates total price', () => {
  // Arrange: 준비
  const price = 10000
  const quantity = 3
  const discount = 0.1

  // Act: 실행
  const total = calculateTotal(price, quantity, discount)

  // Assert: 검증
  expect(total).toBe(27000)
})

// ✅ 좋은 예: 사용자 관점 테스트 (구현 내용이 아닌 행동 테스트)
it('allows user to add product to cart', () => {
  // 사용자가 버튼을 클릭하면
  // 카트에 제품이 추가되어야 함
})

// ❌ 나쁜 예: 구현 내용 테스트
it('calls useState with initial value', () => {
  // 구현 세부사항에 집중하면 리팩토링 시 테스트가 깨짐
})
```

---

## 보안

### 1. XSS 방지

```typescript
// ✅ 좋은 예: React 기본 XSS 방지
function UserInput({ content }: { content: string }) {
  // React는 기본적으로 HTML 이스케이프 처리
  return <div>{content}</div>
}

// ❌ 위험: dangerouslySetInnerHTML (신중하게 사용)
function UserContent({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// ✅ 안전한 사용: DOMPurify로 sanitize
import DOMPurify from 'dompurify'

function SafeHtmlContent({ html }: { html: string }) {
  const cleanHtml = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
}
```

### 2. CSRF 방지

```typescript
// ✅ 좋은 예: CSRF 토큰 처리
// lib/api/client.ts
apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken()
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken
  }
  return config
})
```

### 3. 인증/인가

```typescript
// ✅ 좋은 예: 미들웨어 기반 라우트 보호
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 역할 기반 접근 제어
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const user = verifyToken(token)
    if (user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', request.url))
    }
  }
}
```

### 4. 입력 검증

```typescript
// ✅ 좋은 예: Zod를 사용한 입력 검증
import { z } from 'zod'

const CreateProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive().max(1000000),
  description: z.string().max(1000).optional(),
})

export async function createProduct(data: unknown) {
  const validated = CreateProductSchema.parse(data) // 자동 검증
  return productService.create(validated)
}
```

### 5. 환경 변수 및 시크릿 관리

```typescript
// ✅ 좋은 예: 서버 전용 환경 변수
const API_KEY = process.env.API_SECRET_KEY // 서버에서만 접근 가능

// ❌ 위험: 클라이언트에 노출
const apiKey = process.env.NEXT_PUBLIC_API_SECRET_KEY // 절대 X

// ✅ 클라이언트가 필요한 경우: API 라우트 통해 프록시
// app/api/products/route.ts
export async function GET() {
  const data = await fetchExternalAPI(process.env.API_SECRET_KEY)
  return Response.json(data)
}
```

### 6. 의존성 보안

```bash
# 정기적인 보안 업데이트
npm audit
npm audit fix

# 자동화된 보안 스캔 (CI/CD)
npm install -D audit-ci
npx audit-ci --config .audit-ci.json
```

---

## 접근성 (Accessibility)

### 1. 시맨틱 HTML 사용

```typescript
// ✅ 좋은 예: 시맨틱 HTML
function Article({ title, content, author }) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <address>
          <span>{author.name}</span>
        </address>
      </header>
      <main>{content}</main>
    </article>
  )
}

// ❌ 나쁜 예: div 남용
function Article({ title, content, author }) {
  return (
    <div>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  )
}
```

### 2. ARIA 속성 사용

```typescript
// ✅ 좋은 예: 명확한 ARIA 라벨
function SearchButton() {
  return (
    <button aria-label="검색하기">
      <SearchIcon aria-hidden="true" />
    </button>
  )
}

// ✅ 좋은 예: 동적 콘텐츠 안내
function LiveRegion({ message }: { message: string }) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  )
}

// ✅ 좋은 예: 폼 접근성
function FormField({ error }: { error?: string }) {
  return (
    <div>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        aria-describedby={error ? 'email-error' : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id="email-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
```

### 3. 키보드 네비게이션

```typescript
// ✅ 좋은 예: 키보드 접근 가능한 컴포넌트
function Dropdown({ items }: { items: Item[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(i => Math.min(i + 1, items.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(i => Math.max(i - 1, 0))
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'Enter':
        if (focusedIndex >= 0) {
          items[focusedIndex].onClick()
        }
        break
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        옵션
      </button>
      {isOpen && (
        <ul role="menu" onKeyDown={handleKeyDown}>
          {items.map((item, index) => (
            <li
              key={item.id}
              role="menuitem"
              tabIndex={index === focusedIndex ? 0 : -1}
              onClick={item.onClick}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### 4. 색상 대비

```typescript
// ✅ 좋은 예: WCAG AA 준수 색상
const colors = {
  text: '#1a1a1a', // 흰색 배경에서 대비 15.8:1
  primary: '#0052cc', // 대비 4.5:1 이상
  error: '#de350b', // 대비 4.5:1 이상
}

// ✅ 좋은 예: 색상만으로 정보 전달하지 않기
function Status({ status }: { status: 'success' | 'error' }) {
  return (
    <span className={`${status} status`}>
      {status === 'success' && <CheckIcon aria-hidden="true" />}
      {status === 'error' && <ErrorIcon aria-hidden="true" />}
      {status === 'success' ? '완료' : '실패'}
    </span>
  )
}
```

### 5. 포커스 관리

```typescript
// ✅ 좋은 예: 모달 포커스 트랩
function Modal({ isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // 모달 열리면 첫 번째 포커스 가능 요소로 포커스
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      firstFocusable?.focus()

      // 포커스 트랩
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }

      document.addEventListener('keydown', handleTab)
      return () => document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  return (
    <dialog ref={modalRef} open={isOpen}>
      <button onClick={onClose}>닫기</button>
    </dialog>
  )
}
```

---

## 국제화 (i18n)

### 1. 다국어 지원 구조

```typescript
// ✅ 좋은 예: next-intl 또는 next-i18next 사용
// i18n/config.ts
export const locales = ['ko', 'en', 'ja'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ko'

// messages/ko.json
{
  "common": {
    "save": "저장",
    "cancel": "취소"
  },
  "products": {
    "title": "제품 목록",
    "search": "검색"
  }
}

// messages/en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel"
  },
  "products": {
    "title": "Product List",
    "search": "Search"
  }
}
```

### 2. 사용 방법

```typescript
// ✅ 좋은 예: 훅을 통한 번역 사용
import { useTranslations } from 'next-intl'

function ProductList() {
  const t = useTranslations('products')

  return (
    <div>
      <h1>{t('title')}</h1>
      <input placeholder={t('search')} />
    </div>
  )
}

// ✅ 서버 컴포넌트에서
import { getTranslations } from 'next-intl/server'

export default async function ProductsPage() {
  const t = await getTranslations('products')

  return <h1>{t('title')}</h1>
}
```

### 3. 날짜/숫자 포맷

```typescript
// ✅ 좋은 예: Intl API 사용
function formatPrice(price: number, locale: string = 'ko-KR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'KRW',
  }).format(price)
}

function formatDate(date: Date, locale: string = 'ko-KR') {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
```

### 4. RTL (Right-to-Left) 지원

```typescript
// ✅ 좋은 예: RTL 언어 지원
// app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const direction = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html dir={direction}>
      <body>{children}</body>
    </html>
  )
}
```

---

## Import/Export 규칙

### 1. Import 순서

```typescript
// 1. 외부 라이브러리
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// 2. 내부 모듈 (@/ 별칭 사용)
import { Button } from '@/shared/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { formatDate } from '@/shared/utils/date'

// 3. 타입 import (type 키워드)
import type { User } from '@/types/user'
import type { ProductFilters } from '@/features/products/types'

// 4. 상대 경로 import (같은 모듈 내)
import { LocalComponent } from './LocalComponent'
import { localHelper } from './utils'
```

### 2. Export 규칙

```typescript
// ✅ 좋은 예: Named export
export const ProductService = { /* ... */ }
export const formatPrice = (price: number) => { /* ... */ }
export type { Product, ProductFilters }

// ✅ Default export (Page/Layout 컴포넌트)
export default function ProductsPage() { /* ... */ }

// ✅ 둘 다 사용 가능
export const ProductCard = (props: ProductCardProps) => { /* ... */ }
export default ProductCard
```

### 3. Import 제한

```typescript
// ✅ 좋은 예: 경로 별칭 사용
import { Button } from '@/shared/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'

// ❌ 피하세요: 깊은 상대 경로
import { Button } from '../../../../shared/components/ui/Button'
```

### 4. Feature Import 규칙

**기본 원칙: Feature 간 직접 import 지양**

```typescript
// ✅ 권장: Feature → Shared
import { Button } from '@/shared/components/ui/Button'

// ✅ 권장: Feature → 자신의 내부
import { ProductForm } from './components/ProductForm'

// ⚠️ 일반적으로 지양: Feature → 다른 Feature 직접 import
import { UserCard } from '@/features/auth/components/UserCard'
```

**예외적인 허용 사례:**

```typescript
// ✅ 허용: 공유 UI가 shared로 이동하는 것이 과도한 경우
// - 특정 feature에만 필요한 UI
// - 다른 feature에서 거의 사용되지 않는 컴포넌트
// 예: AdminDashboard에서만 사용되는 UserCard

// ✅ 허용: 기능적으로 관련된 feature 간 통합
// 예: Order feature가 Product 정보를 표시해야 할 때
import { ProductDisplay } from '@/features/products/components/ProductDisplay'

// ✅ 해결책: 공유 레벨 결정 가이드라인
// 1. 3개 이상 feature에서 사용 → shared로 이동
// 2. 2개 feature에서 사용 → 비용/이득 분석 후 결정
// 3. 1개 feature에서만 사용 → 해당 feature 내 유지
```

**순환 의존성 방지:**

```typescript
// ❌ 위험: 순환 의존성
// features/orders/components/OrderList.tsx
import { ProductCard } from '@/features/products/components/ProductCard'

// features/products/components/ProductCard.tsx
import { OrderList } from '@/features/orders/components/OrderList'

// ✅ 해결: 공유 타입/인터페이스 분리
// shared/types/product.ts
export interface Product { /* ... */ }

// 각 feature에서 공유 타입 import
import type { Product } from '@/shared/types/product'
```

---

## 코드 포맷팅

### Prettier 설정

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "auto"
}
```

**설정 선택 이유:**

| 설정 | 값 | 이유 |
|------|------|------|
| `printWidth` | 120 | 넓은 모니터 환경 고려. 팀에서 100-120 사이로 조정 가능. 더 좁게 선호 시 80-100 권장 |
| `singleQuote` | true | JavaScript/TypeScript 표준 |
| `semi` | true | 자동 세미콜론 삽입 오류 방지 |
| `trailingComma` | "es5" | Git diff 가독성 향상, ES5 호환성 |
| `tabWidth` | 2 | React/JavaScript 표준 |

**참고: 프로젝트 팀 합의 하에 이 값들을 조정할 수 있습니다.**

### 포맷팅 예시

```typescript
// ✅ 좋은 예: Prettier 포맷팅
const fetchProducts = async (
  query: string,
  options: {
    page?: number
    limit?: number
  } = {}
): Promise<Product[]> => {
  try {
    const response = await axios.get('/api/products', {
      params: { query, ...options },
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}
```

### 실행 명령어

```bash
# 코드 포맷팅
npm run format

# 린트 + 포맷팅
npm run lint:fix
```

---

## 린트 규칙

### ESLint 규칙

프로젝트에서 적용되는 주요 ESLint 규칙:

```javascript
// eslint.config.js
{
  rules: {
    // TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',

    // React
    'react/react-in-jsx-scope': 'off', // React 19
    'react/prop-types': 'off', // TypeScript 사용

    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import 순서
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      alphabetize: { order: 'asc' }
      // ⚠️ 참고: 순환 의존성 방지를 위해 가끔 위배해야 할 수 있음
      // 그럴 경우 eslint-disable 주석과 함께 사유를 명시하세요
    }],

    // Feature import 제한 (권장, 필수 아님)
    // 'import/no-restricted-paths': ['warn', { // warn으로 설정하여 유연성 확보
    //   zones: [{
    //     target: './src/features/**/*.{ts,tsx}',
    //     from: './src/features/**/components/**',
    //     except: ['./src/shared/**'],
    //     message: 'Feature는 다른 Feature를 import할 수 없습니다. Shared로 이동하거나 필요성을 검토하세요.'
    //   }]
    // }]
    // 참고: 이 규칙은 프로젝트 성격에 따라 조정 필요
    // - 소규모 프로젝트: 제한 완화
    // - 대규모 프로젝트: 제한 강화
  }
}
```

### 자주 발생하는 린트 에러

#### 1. 사용하지 않는 변수

```typescript
// ❌ Lint 에러
const data = fetchData() // 사용하지 않음

// ✅ 해결
const data = fetchData()
console.log(data)

// 또는
fetchData() // 변수 불필요 시 제거
```

#### 2. any 타입

```typescript
// ⚠️ Lint 경고
const processData = (data: any) => { /* ... */ }

// ✅ 해결
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    // ...
  }
}

// 또는 구체적 타입
const processData = (data: UserData) => { /* ... */ }
```

#### 3. React Hooks 의존성

```typescript
// ⚠️ Lint 경고
useEffect(() => {
  fetchData(userId)
}, []) // userId 누락

// ✅ 해결
useEffect(() => {
  fetchData(userId)
}, [userId])

// 또는 의도적 무시 (주석 필수)
useEffect(() => {
  fetchData(userId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
```

---

## 주석 작성 가이드

### 1. JSDoc 사용

```typescript
/**
 * 사용자 목록을 가져옵니다.
 *
 * @param options - 조회 옵션
 * @param options.page - 페이지 번호 (기본값: 1)
 * @param options.limit - 페이지당 항목 수 (기본값: 10)
 * @returns 사용자 목록과 메타데이터
 * @throws {Error} API 호출 실패 시
 *
 * @example
 * ```typescript
 * const users = await fetchUsers({ page: 1, limit: 20 })
 * ```
 */
const fetchUsers = async (options: {
  page?: number
  limit?: number
} = {}): Promise<UsersResponse> => {
  // ...
}
```

### 2. 복잡한 로직 설명

```typescript
// ✅ 좋은 예: 복잡한 로직 설명
// Redux Persist의 날짜 직렬화 문제를 해결하기 위해
// Date 객체를 ISO 문자열로 변환하여 저장
const dateTransform: Transform = {
  inbound: (state) => {
    // 저장 시: Date → ISO string
    return JSON.parse(JSON.stringify(state, (key, value) =>
      value instanceof Date ? value.toISOString() : value
    ))
  },
  outbound: (state) => {
    // 로드 시: ISO string → Date
    return JSON.parse(JSON.stringify(state, (key, value) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
      if (typeof value === 'string' && dateRegex.test(value)) {
        return new Date(value)
      }
      return value
    }))
  },
}
```

### 3. TODO 주석

```typescript
// TODO: 인증 로직이 구현되면 주석 제거
const isAuthenticated = true

// TODO(@developer): 성능 최적화 필요 - 현재 O(n^2) 복잡도
// FIXME: 페이지네이션 버그 수정 필요
// HACK: 임시 해결책, 근본적인 해결 필요
```

### 4. 주석 사용 원칙

```typescript
// ❌ 나쁜 예: 명백한 코드 설명
// 사용자 이름을 설정합니다
user.name = 'John'

// ❌ 나쁜 예: 주석으로 코드 숨기기
// /* 복잡한 로직... */
const result = complexLogic(data)

// ✅ 좋은 예: 왜(WHY)를 설명
// 브라우저의 이미지 로딩 최적화를 위해 AVIF 우선 사용
const imageFormat = supportsAVIF ? 'avif' : 'webp'
```

---

## 예외 처리

### 1. Error 클래스 정의

```typescript
// ✅ 좋은 예: 커스텀 Error 클래스
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

### 2. 비동기 에러 처리

```typescript
// ✅ 좋은 예: async/await with try-catch
const fetchProducts = async (): Promise<void> => {
  try {
    const data = await productService.getProducts()
    dispatch(setProducts(data))
  } catch (error) {
    if (error instanceof APIError) {
      // API 에러 처리
      showToast(error.message, 'error')
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error('Unexpected error:', error.message)
    } else {
      // 알 수 없는 에러
      console.error('Unknown error:', error)
    }
  }
}
```

### 3. React Error Boundary

**참고: Next.js 14+에서는 app/error.tsx와 app/global-error.tsx를 우선 사용하세요.**

**Class Component Error Boundary (레거시 또는 특수한 경우):**

```typescript
// ✅ 필요한 경우: Class Component Error Boundary
// shared/components/common/ErrorBoundary.tsx
// 용도: 특정 하위 트리만 감싸야 할 때, 또는 pages router 사용 시

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 에러 리포팅 서비스로 전송
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)

    // Sentry 등에 에러 전송
    // Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

// 사용 예시
function ComponentWithBoundary() {
  return (
    <ErrorBoundary
      fallback={({ error }) => <ErrorFallback error={error} />}
      onError={(error) => logErrorToService(error)}
    >
      <RiskyComponent />
    </ErrorBoundary>
  )
}
```

**추천: 에러 리포팅 통합**

```typescript
// ✅ 좋은 예: Sentry와 같은 에러 트래킹 서비스 통합
// lib/errorTracking.ts
import * as Sentry from '@sentry/nextjs'

export function initErrorTracking() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  })
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  Sentry.captureException(error, {
    extra: context,
  })
}

// ErrorBoundary에서 사용
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  captureError(error, {
    componentStack: errorInfo.componentStack,
  })
}
```

### 4. Next.js 에러 처리

```typescript
// ✅ 좋은 예: Next.js Error 페이지
// app/error.tsx
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
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  )
}

// app/global-error.tsx - 전역 에러
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>치명적인 에러가 발생했습니다</h2>
        <button onClick={reset}>다시 시도</button>
      </body>
    </html>
  )
}
```

---

## 성능 가이드라인

### ⚠️ 가장 중요한 원칙: 측정 후 최적화

```typescript
// ❌ 나쁜 예: 측정 없이 최적화 (premature optimization)
export const ProductCard = React.memo(({ product }) => {
  return <div>{product.name}</div>
})

// ✅ 좋은 예: 먼저 측정
// 1. React DevTools Profiler로 병목 확인
// 2. 실제 성능 문제 확인 후 최적화 적용
// 3. 최적화 전후 비교로 효과 검증
```

**성능 최적화 프로세스:**
1. 측정 (React DevTools Profiler, Lighthouse, Performance API)
2. 병목 식별
3. 최적화 적용
4. 다시 측정하여 효과 확인
5. 효과 없다면 되돌리기

### 1. React.memo 사용

**사용 전 고려사항:**

```typescript
// ✅ React.memo가 도움이 되는 경우
// - 부모가 자주 리렌더링됨
// - props가 거의 변하지 않음
// - 렌더링 비용이 높음

// ⚠️ React.memo가 해가 되는 경우
// - props가 자주 변함 (비용 > 이득)
// - 간단한 컴포넌트 (memo 비용 > 렌더링 비용)
// - 비교 함수가 복잡함

// ✅ 측정 후 사용 예시
export const ProductCard = React.memo<ProductCardProps>(
  ({ product, onEdit, onDelete }) => {
    return (
      <div>
        <h3>{product.name}</h3>
        <button onClick={() => onEdit(product.id)}>Edit</button>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // ⚠️ 커스텀 비교는 더 비쌉니다.
    // 기본 얕은 비교로 충분한지 먼저 확인하세요.
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name
    )
  }
)
```

### 2. useMemo/useCallback 사용

**⚠️ 기본적으로 사용하지 마세요. 대부분의 경우 필요하지 않습니다.**

```typescript
// ❌ 나쁜 예: 측정 없이 useMemo 남용
const value = useMemo(() => x + y, [x, y]) // 더하기는 충분히 빠름

// ❌ 나쁜 예: 모든 함수를 useCallback으로 감싸기
const handleClick = useCallback(() => {
  console.log('clicked')
}, []) // 참조 안정성이 필요 없는 경우
```

**useMemo를 사용해도 좋은 경우:**

```typescript
// ✅ 비싼 계산
const sortedProducts = useMemo(
  () => {
    console.log('Sorting products...') // 측정용 로그
    return [...products].sort((a, b) => a.name.localeCompare(b.name))
  },
  [products]
) // products가 같으면 정렬 재사용
```

**useCallback을 사용해도 좋은 경우:**

```typescript
// ✅ 자식 컴포넌트가 React.memo로 감싸져 있고 참조 비교가 중요할 때
const Parent = () => {
  const heavyCallback = useCallback(
    (id: string) => {
      // 무거운 작업
    },
    [/* 의존성 */]
  )

  return <MemoizedChild onSave={heavyCallback} />
}
```

**측정 방법:**
```typescript
// React DevTools Profiler로 렌더링 횟수 확인
// 콘솔 로그로 실행 빈도 확인
useEffect(() => {
  console.log('Expensive computation ran')
}, [/* dependency */])
```

### 3. 코드 분할

```typescript
// ✅ 좋은 예: 동적 import
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false, // 클라이언트 사이드 렌더링만
  }
)

// 라우트 기반 코드 분할은 Next.js가 자동으로 처리
```

### 4. 이미지 최적화

```typescript
// ✅ 좋은 예: next/image 사용
import Image from 'next/image'

export const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      placeholder="blur"
      loading="lazy"
    />
  )
}
```

---

## Git 커밋 메시지

### 커밋 메시지 규칙

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 카테고리

| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 | `feat(auth): 로그인 기능 추가` |
| `fix` | 버그 수정 | `fix(products): 상품 가격 계산 버그 수정` |
| `docs` | 문서 | `docs(readme): 설치 가이드 추가` |
| `style` | 코드 포맷팅 | `style: Prettier 포맷팅 적용` |
| `refactor` | 리팩토링 | `refactor(api): 코드 구조 개선` |
| `perf` | 성능 개선 | `perf(list): 가상 스크롤로 렌더링 최적화` |
| `test` | 테스트 | `test(auth): 로그인 테스트 추가` |
| `chore` | 빌드/설정 | `chore(deps): 의존성 업데이트` |

### 예시

```
feat(products): 상품 필터링 기능 추가

- 카테고리별 필터링
- 가격 범위 필터
- 검색 기능

Closes #123
```

```
fix(auth): 인증 토큰 갱신 버그 수정

토큰 만료 5분 전에 자동 갱신되도록 수정

Fixes #456
```

---

## 검사리스트 (Checklist)

### 규칙과 예외

이 문서의 규칙들은 **지침(guide)**이지 절대 법칙(law)이 아닙니다. 실무에서는 여러 원칙이 충돌할 수 있으며, 상황에 따라 올바른 결정이 다를 수 있습니다.

### 규칙을 어겨도 좋은 경우

**1. 사용자 경험이 더 중요할 때**
```typescript
// ❌ 규칙: div 대신 Fragment 사용
// ✅ 예외: CSS 스타일링 경계가 필요한 경우
<div className="card-container">
  <Header />
  <Body />
</div>
```

**2. 성능 측정 결과가 다른 결정을 가리킬 때**
```typescript
// ❌ 규칙: React.memo 사용
// ✅ 예외: Profiler가 memo가 더 느리다고 확인하는 경우
export const SimpleComponent = ({ value }) => <div>{value}</div>
```

**3. 접근성이 더 중요할 때**
```typescript
// ❌ 규칙: Feature 간 import 제한
// ✅ 예외: 공유 컴포넌트가 접근성 요구사항을 충족하지 못할 때
import { AccessibleComponent } from '@/features/other/AccessibleComponent'
```

**4. 일관성이 더 중요할 때**
```typescript
// ❌ 규칙: Type alias 선호
// ✅ 예외: 기존 코드베이스가 interface를 사용하고 일관성 유지가 중요할 때
interface User { /* ... */ }
```

### 결정 프레임워크

```
1. 사용자 경험 우선
2. 측정 가능한 이득 확인
3. 팀 합의와 문서화
4. 기술 부채로 인지하고 추후 개선 계획
```

### TODO 정책

```typescript
// ✅ 좋은 예: TODO에 이슈 링크
// TODO(@developer): 성능 최적화 필요 - 현재 O(n^2) 복잡도
// https://github.com/org/repo/issues/123

// ✅ 좋은 예: 일시적인 해결책임을 명시
// FIXME: 임시 해결책, 근본적인 해결 필요 (v2.0에서 재검토)

// ❌ 나쁜 예: 링크나 컨텍스트 없는 TODO
// TODO: 나중에 고치기
```

TODO 주석은 다음과 같을 때 사용하세요:
- 즉시 해결할 수 없는 알려진 문제
- 향후 개선이 필요하지만 현재는 작동하는 코드
- 이슈 트래커에 이미 등록된 문제 참조

---

## 검사리스트 (Checklist)

### PR 제출 전 확인사항

#### 코드 품질
- [ ] `npm run lint` 통과
- [ ] `npm run format` 적용
- [ ] `npm run build` 성공
- [ ] `npm run test` 통과 (테스트 추가/수정 시)
- [ ] 불필요한 console.log 제거 (개발용 로그는 logger 사용)
- [ ] 사용하지 않는 import 제거
- [ ] any 타입 제거 또는 구체적 타입으로 변경

#### 기능 검증
- [ ] 요구사항 모두 구현 완료
- [ ] 에러 처리 적절히 구현
- [ ] 로딩 상태 처리
- [ ] 경고 케이스 처리 (빈 배열, null, undefined)

#### 성능 (측정 후 적용)
- [ ] 성능 병목 확인 (Profiler 사용)
- [ ] 필요한 경우에만 최적화 적용 (memo, useMemo, useCallback)
- [ ] 이미지 최적화 확인
- [ ] 번들 크기 확인 (증가 분석)

#### 접근성
- [ ] 시맨틱 HTML 사용
- [ ] 적절한 ARIA 속성 (aria-label, role 등)
- [ ] 키보드 네비게이션 가능
- [ ] 색상 대비율 확인 (WCAG AA)
- [ ] 스크린 리더 테스트

#### 보안
- [ ] 입력 검증 (Zod 등)
- [ ] XSS 취약점 확인
- [ ] 민감 정보가 클라이언트에 노출되지 않음
- [ ] 환경 변수 적절히 사용

#### 문서
- [ ] 복잡한 로직에 주석 추가
- [ ] JSDoc 작성 (공개 API)
- [ ] PR 설명 작성
- [ ] 마이그레이션 가이드 (필요 시)

#### Next.js 특정
- [ ] Server vs Client Component 적절히 사용
- [ ] async/await 적절히 사용
- [ ] 이미지: next/image 사용
- [ ] 링크: next/link 사용
- [ ] 폼: Server Actions 고려

---

## 참고 자료

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
