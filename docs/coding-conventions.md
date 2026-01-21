# 코딩 컨벤션

이 문서는 프로젝트에서 따라야 할 코딩 표준과 모범 사례를 정의합니다.

## 목차

1. [기본 원칙](#기본-원칙)
2. [TypeScript 규칙](#typescript-규칙)
3. [React/Next.js 규칙](#reactnextjs-규칙)
4. [파일 명명 규칙](#파일-명명-규칙)
5. [Import/Export 규칙](#importexport-규칙)
6. [코드 포맷팅](#코드-포맷팅)
7. [린트 규칙](#린트-규칙)
8. [주석 작성 가이드](#주석-작성-가이드)
9. [예외 처리](#예외-처리)
10. [성능 가이드라인](#성능-가이드라인)
11. [Git 커밋 메시지](#git-커밋-메시지)

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

**인터페이스 사용:**
- 객체의 구조를 정의할 때
- 확장 가능해야 할 때

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
```

**타입 별칭 사용:**
- 유니온 타입
- 교차 타입
- 함수 시그니처

```typescript
// ✅ 좋은 예: 타입 별칭
type Status = 'pending' | 'approved' | 'rejected'
type ID = string | number
type EventHandler = (event: Event) => void
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

// ❌ 피하세요: any 타입
const getData = (id: any): any => {
  return api.get(`/data/${id}`)
}

// ❌ 피하세요: 타입 단언 과용
const user = data as User
```

#### 1.5 Enum vs Union Types

**Union Types 선호:**

```typescript
// ✅ 좋은 예: Union Type
type Status = 'pending' | 'approved' | 'rejected'

const status: Status = 'pending'

// ❌ 피하세요: Enum (번들 크기 증가)
enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}
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

```typescript
// ✅ 좋은 예: Fragment
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

// ❌ 피하세요: 불필요한 div
return (
  <div>
    <Header />
    <Main />
    <Footer />
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
| 상수 | camelCase | `apiConstants.ts`, `routeConstants.ts` |
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

```typescript
// ✅ 허용: Feature → Shared
import { Button } from '@/shared/components/ui/Button'

// ✅ 허용: Feature → 자신의 내부
import { ProductForm } from './components/ProductForm'

// ❌ 금지: Feature → 다른 Feature (ESLint 에러)
import { UserCard } from '@/features/auth/components/UserCard'

// ✅ 해결: Shared로 이동 후 import
import { UserCard } from '@/shared/components/common/UserCard'
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

    // Import
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      alphabetize: { order: 'asc' }
    }],

    // Import 경로 제한
    'import/no-restricted-paths': ['error', {
      zones: [{
        target: './src/features/**/*.{ts,tsx}',
        from: './src/features/**/components/**',
        except: ['./src/shared/**'],
        message: 'Feature는 다른 Feature를 import할 수 없습니다.'
      }]
    }]
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

```typescript
// ✅ 좋은 예: Error Boundary
// shared/components/common/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error }>
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
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
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

### 1. React.memo 사용

```typescript
// ✅ 좋은 예: 자주 리렌더링되는 컴포넌트
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
    // 커스텀 비교 (필요 시)
    return prevProps.product.id === nextProps.product.id
  }
)
```

### 2. useMemo/useCallback 사용

```typescript
// ✅ 좋은 예: useMemo로 값 메모이제이션
const sortedProducts = useMemo(
  () => products.sort((a, b) => a.name.localeCompare(b.name)),
  [products]
)

// ✅ 좋은 예: useCallback로 함수 메모이제이션
const handleDelete = useCallback(
  (id: string) => {
    dispatch(deleteProduct(id))
  },
  [dispatch]
)
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

### PR 제출 전 확인사항

- [ ] `npm run lint` 통과
- [ ] `npm run format` 적용
- [ ] `npm run build` 성공
- [ ] 불필요한 console.log 제거
- [ ] 사용하지 않는 import 제거
- [ ] any 타입 제거 또는 구체적 타입으로 변경
- [ ] 복잡한 로직에 주석 추가
- [ ] 에러 처리 적절히 구현
- [ ] 성능 최적화 고려 (memo, useMemo, useCallback)
- [ ] 접근성 확인 (alt 속성, aria-label 등)

---

## 참고 자료

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
