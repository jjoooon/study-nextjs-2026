# 프로젝트 시작 가이드

이 문서는 현재 프로젝트를 이해하고 시작하기 위한 실전 가이드입니다.

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [개발 환경 설정](#개발-환경-설정)
3. [프로젝트 구조 파악](#프로젝트-구조-파악)
4. [핵심 기술 스택](#핵심-기술-스택)
5. [주요 파일별 설명](#주요-파일별-설명)
6. [개발 워크플로우](#개발-워크플로우)
7. [일반적인 작업 가이드](#일반적인-작업-가이드)
8. [문제 해결](#문제-해결)

---

## 프로젝트 개요

### 프로젝트 정보

- **이름**: study-nextjs-2026
- **목적**: Next.js 16 + React 19 최신 기능 학습
- **아키텍처**: Feature-Based Architecture
- **라우터**: App Router (Next.js 13+)
- **상태 관리**: Redux Toolkit + Redux Persist
- **스타일링**: Tailwind CSS
- **테스트**: Storybook + MSW
- **타입**: TypeScript

### 기술 스택 버전

```json
{
  "next": "16.1.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.7.3",
  "tailwindcss": "^3.4.19",
  "@reduxjs/toolkit": "^2.5.0"
}
```

---

## 개발 환경 설정

### 사전 요구 사항

- **Node.js**: 18.17.0 이상
- **npm**: 9.0.0 이상 또는 **yarn/pnpm**
- **Git**: 최신 버전
- **코드 에디터**: VS Code 추천

### 설치 단계

```bash
# 1. 프로젝트 클론
git clone <repository-url>
cd study-nextjs-2026

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작 (Turbopack 활성화)
npm run dev

# 4. 브라우저에서 확인
# http://localhost:3000
```

### VS Code 설정 (권장)

```json
// .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### 권장 확장 프로그램

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar 지원)
- Redux DevTools
- Error Lens

---

## 프로젝트 구조 파악

### 핵심 디렉토리

```
src/
├── app/              # Next.js App Router (페이지 및 라우팅)
├── features/         # 도메인별 기능 모듈
├── shared/           # 공유 컴포넌트 및 유틸리티
├── redux/            # Redux 설정 및 스토어
└── mocks/            # MSW Mock 데이터
```

### 디렉토리별 상세

#### 1. app/ (Next.js App Router)

```
app/
├── layout.tsx        # 루트 레이아웃
├── page.tsx          # 홈 페이지
├── error.tsx         # 에러 바운더리
├── loading.tsx       # 로딩 UI
├── login/
│   └── page.tsx      # /login
└── sample/           # 샘플 애플리케이션
    ├── layout.tsx    # 샘플 레이아웃
    ├── dashboard/
    │   ├── page.tsx  # /sample/dashboard
    │   └── loading.tsx
    └── products/
        ├── [pageId]/
        │   └── page.tsx  # 동적 라우트
        └── pages/        # 페이지 컴포넌트
```

**특징:**
- 파일 시스템 기반 라우팅
- Server Component 기본
- `loading.tsx`, `error.tsx`로 사용자 경험 개선

#### 2. features/ (기능별 모듈)

```
features/
├── dashboard/        # 대시보드 기능
│   ├── components/   # 대시보드 UI 컴포넌트
│   └── hooks/        # 대시보드 커스텀 훅
│
└── products/         # 상품 기능
    ├── components/   # 상품 UI 컴포넌트
    │   ├── ProductList.tsx
    │   ├── ProductCard.tsx
    │   ├── ProductForm.tsx
    │   ├── ProductFilters.tsx
    │   └── ProductGrid.tsx
    ├── sections/     # 페이지 섹션 컴포넌트
    │   ├── ListSection.tsx
    │   ├── DetailSection.tsx
    │   ├── NewSection.tsx
    │   └── EditSection.tsx
    ├── hooks/        # 상품 관련 훅
    ├── services/     # 상품 API 서비스
    ├── store/        # 상품 Redux 슬라이스
    ├── types/        # 상품 타입 정의
    ├── utils/        # 상품 유틸리티
    └── constants/    # 상품 상수
```

**특징:**
- 도메인별로 독립적인 모듈 구성
- 관련 코드를 한 곳에 모음
- Feature 간 의존성 최소화 (ESLint로 강제)

#### 3. shared/ (공유 리소스)

```
shared/
├── components/       # 공유 컴포넌트
│   ├── Navigation.tsx
│   ├── AuthGuard.tsx
│   └── ui/          # 기본 UI 컴포넌트
│       ├── button.tsx
│       ├── Skeleton.tsx
│       └── EmptyState.tsx
├── config/           # 환경 설정
│   └── env.ts       # 환경 변수 (Zod로 검증)
├── lib/             # 유틸리티 라이브러리
│   └── utils.ts     # cn() 함수 등
├── services/        # 공유 API 서비스
├── types/           # 공유 타입
└── utils/           # 공유 유틸리티 함수
```

**특징:**
- 여러 Feature에서 공유하는 코드
- UI 컴포넌트, 유틸리티, 설정 등
- 도메인 독립적이어야 함

#### 4. redux/ (상태 관리)

```
redux/
├── config.ts        # Redux 설정
├── hooks.ts         # 커스텀 Redux 훅
├── reducers/        # 리듀서 등록
├── registry/        # 동적 리듀서 레지스트리
├── storage.ts       # Redux Persist 스토리지
└── middleware/      # 커스텀 미들웨어
```

**특징:**
- Redux Toolkit 사용
- 동적 리듀서 로딩 (Code Splitting)
- Redux Persist로 상태 지속

---

## 핵심 기술 스택

### 1. React 19 + Next.js 16

**주요 특징:**
- Server Components (기본)
- Actions (폼 처리)
- React Compiler 사용 (Babel 플러그인)
- 향상된 TypeScript 지원

**예시:**

```typescript
// app/page.tsx (Server Component)
export default async function Home() {
  const products = await fetch('/api/products').then(r => r.json());

  return (
    <main>
      <h1>상품 목록</h1>
      <ProductList products={products} /> {/* Client Component */}
    </main>
  );
}
```

### 2. Redux Toolkit + Redux Persist

**특징:**
- 중앙 집중식 상태 관리
- 동적 리듀서 로딩 (페이지별)
- sessionStorage에 상태 지속

**사용 예시:**

```typescript
// features/products/store/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    // ...
  },
});

// 사용 (컴포넌트에서)
const { products } = useAppSelector(selectAllProducts);
const dispatch = useDispatch();
dispatch(setProducts(newProducts));
```

### 3. Tailwind CSS

**특징:**
- 유틸리티 퍼스트 CSS
- 커스텀 디자인 시스템
- 다크 모드 지원

**사용 예시:**

```typescript
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    제목
  </h2>
  <p className="text-gray-600">
    내용
  </p>
</div>
```

### 4. TypeScript

**특징:**
- 정적 타입 검사
- 향상된 IDE 지원
- 안정적인 코드

**사용 예시:**

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  // ...
}
```

### 5. MSW (Mock Service Worker)

**특징:**
- API 요청을 가로채서 mock 응답
- 개발/테스트 환경에서 네트워크 요청 시뮬레이션
- 실제 API 완료 전에 프론트엔드 개발 가능

---

## 주요 파일별 설명

### 1. App Router 파일들

#### app/layout.tsx

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Study App',
  description: 'Next.js 학습 프로젝트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**역할:**
- 루트 레이아웃 정의
- 메타데이터 설정
- 전역 스타일 적용
- Redux Provider 등 전역 컴포넌트 래핑

#### app/page.tsx

```typescript
import Link from 'next/link';
import { Navigation } from '@/shared/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen p-8 bg-gray-50">
        <h1>메인 페이지</h1>
        <Link href="/sample/dashboard">대시보드</Link>
      </main>
    </>
  );
}
```

**역할:**
- 홈 페이지 UI
- Server Component (기본)
- 데이터를 서버에서 가져올 수 있음

#### app/providers.tsx

```typescript
'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/config';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
```

**역할:**
- Redux Provider 제공
- Client Component여야 함 ('use client')
- 전역 상태 관리 설정

### 2. Feature 파일들

#### features/products/sections/ListSection.tsx

```typescript
'use client';

import { useInjectReducer } from '@/redux/hooks';
import { productsReducer } from './store/productsSlice';

export default function ListSection() {
  // 동적 리듀서 주입
  const { isReady } = useInjectReducer('products', productsReducer, {
    ejectOnUnmount: true,
  });

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return <Content />;
}
```

**역할:**
- 페이지 섹션 컴포넌트
- 동적 리듀서 로딩
- Client Component (상태 관리 필요)

#### features/products/components/ProductList.tsx

```typescript
interface ProductListProps {
  products: Product[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="grid gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
```

**역할:**
- 도메인 UI 컴포넌트
- Props로 데이터 받음
- 재사용 가능하도록 설계

### 3. Shared 파일들

#### shared/components/ui/button.tsx

```typescript
import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'destructive' | 'outline-solid';
}

export function Button({
  className,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'default' && 'bg-blue-600 text-white',
        variant === 'outline-solid' && 'border border-gray-300',
        className
      )}
      {...props}
    />
  );
}
```

**역할:**
- 재사용 가능한 UI 컴포넌트
- variant prop로 스타일 변경
- React 19의 새로운 ref prop 지원

---

## 개발 워크플로우

### 1. 새 페이지 만들기

```bash
# 1. 페이지 파일 생성
# app/sample/[feature-name]/page.tsx

# 2. 해당 Feature의 섹션 컴포넌트 생성
# features/[feature-name]/sections/[PageName]Section.tsx

# 3. 페이지에서 섹션 컴포넌트 import
# page.tsx: export default function Page() { return <PageSection />; }
```

**예시:**

```typescript
// app/sample/users/page.tsx
import UserListSection from '@/features/users/sections/ListSection';

export default function UsersPage() {
  return <UserListSection />;
}
```

### 2. 새 Feature 만들기

```bash
# 1. Feature 디렉토리 생성
features/new-feature/
├── components/
├── sections/
├── hooks/
├── services/
├── store/
├── types/
└── constants/

# 2. Redux Slice 생성
features/new-feature/store/newFeatureSlice.ts

# 3. 페이지 섹션 생성
features/new-feature/sections/ListSection.tsx

# 4. App Router 페이지 생성
app/sample/new-feature/page.tsx
```

### 3. 새 UI 컴포넌트 만들기

```bash
# 1. Feature 컴포넌트
features/my-feature/components/MyComponent.tsx

# 2. 공유 UI 컴포넌트
shared/components/ui/my-component.tsx
```

**선택 기준:**
- **Feature 컴포넌트**: 도메인 특화, 재사용 필요 없음
- **공유 UI 컴포넌트**: 여러 Feature에서 사용, 범용적

### 4. 스타일 추가하기

```typescript
// Tailwind CSS 클래스 사용
<div className="bg-white rounded-lg p-4 shadow-md">

// cn() 함수로 동적 클래스
import { cn } from '@/shared/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  isError && 'error-class',
  className
)}>
```

---

## 일반적인 작업 가이드

### 작업 1: 새로운 상품 추가 기능 구현

1. **Redux Slice에 Action 추가**
   ```typescript
   // features/products/store/productsSlice.ts
   addProduct: (state, action: PayloadAction<Product>) => {
     state.items.push(action.payload);
   };
   ```

2. **Service에 API 호출 추가**
   ```typescript
   // features/products/services/productService.ts
   async createProduct(data: ProductFormData) {
     const response = await axios.post('/api/products', data);
     return response.data;
   }
   ```

3. **컴포넌트에서 사용**
   ```typescript
   // features/products/components/ProductForm.tsx
   const handleSubmit = async (data: ProductFormData) => {
     const newProduct = await createProduct(data);
     dispatch(addProduct(newProduct));
     router.push('/sample/products/List');
   };
   ```

### 작업 2: 로딩 상태 표시하기

1. **loading.tsx 파일 생성**
   ```typescript
   // app/sample/products/loading.tsx
   export default function Loading() {
     return (
       <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
       </div>
     );
   }
   ```

2. **또는 Skeleton 사용**
   ```typescript
   import { Skeleton } from '@/shared/components/ui/Skeleton';

   export function ProductCardSkeleton() {
     return (
       <div className="bg-white rounded-lg p-4">
         <Skeleton className="h-4 w-3/4 mb-2" />
         <Skeleton className="h-4 w-1/2" />
       </div>
     );
   }
   ```

### 작업 3: 에러 처리하기

1. **error.tsx 파일 생성**
   ```typescript
   // app/sample/products/error.tsx
   'use client';

   export default function Error({
     error,
     reset,
   }: {
     error: Error;
     reset: () => void;
   }) {
     return (
       <div className="p-8 text-center">
         <h2 className="text-2xl font-bold text-red-600 mb-4">
           에러가 발생했습니다
         </h2>
         <p className="text-gray-600 mb-4">{error.message}</p>
         <button onClick={reset} className="bg-blue-600 text-white px-4 py-2 rounded">
           다시 시도
         </button>
       </div>
     );
   }
   ```

2. **또는 컴포넌트 레벨 에러 처리**
   ```typescript
   const { error, refetch } = useProducts();

   if (error) {
     return (
       <div className="p-4 bg-red-50 text-red-600 rounded">
         에러: {error}
         <button onClick={refetch}>다시 시도</button>
       </div>
     );
   }
   ```

---

## 문제 해결

### 문제 1: 빌드 오류

```bash
# 타입 체크
npm run type-check

# Lint
npm run lint

# Lint 자동 수정
npm run lint:fix
```

### 문제 2: 스타일이 적용되지 않음

**해결:**
1. Tailwind CSS 클래스 확인
2. `tailwind.config.ts` 경로 설정 확인
3. `globals.css` import 확인

### 문제 3: Redux 상태가 초기화됨

**원인:** 페이지 이동 시 리듀서가 언마운트됨

**해결:**
```typescript
// persistConfig whitelist 확인
const persistConfig = {
  key: 'root',
  storage: secureStorage,
  whitelist: ['auth', 'products'], // 지속할 상태
};
```

### 문제 4: Server Component에서 Hook 사용 오류

**에러:** React Hook "useState" cannot be called in Server Component

**해결:**
```typescript
'use client'; // 파일 상단에 추가

import { useState } from 'react';
```

---

## 요약

### 핵심 개념

1. **App Router**: 파일 시스템 기반 라우팅
2. **Feature-Based Architecture**: 도메인별 모듈 구성
3. **Server Component**: 기본 렌더링 방식
4. **동적 리듀서 로딩**: 페이지별 상태 관리
5. **MSW**: Mock API로 개발

### 빠른 시작

```bash
# 1. 설치
npm install

# 2. 개발 서버 시작
npm run dev

# 3. 브라우저에서 확인
http://localhost:3000

# 4. Storybook 시작 (UI 컴포넌트 개발용)
npm run storybook
```

### 다음 단계

1. [React 기본 지식](./react-fundamentals.md) 학습
2. [Next.js 기본 지식](./nextjs-fundamentals.md) 학습
3. [아키텍처 가이드](./architecture.md) 숙지
4. [코딩 컨벤션](./coding-conventions.md) 확인
5. 예제 코드 확인하며 실습

---

## 참고 자료

- [프로젝트 아키텍처](./architecture.md)
- [코딩 컨벤션](./coding-conventions.md)
- [React Best Practices](./react%20best%20practice(by%20vercel)/)
