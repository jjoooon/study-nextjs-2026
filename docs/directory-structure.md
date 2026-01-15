# 프로젝트 디렉토리 구조

**버전:** 1.0.0
**작성일:** 2026-01-15
**프로젝트:** Next.js 16 + TypeScript + Redux Toolkit

---

## 📋 목차

1. [개요](#개요)
2. [최상위 구조](#최상위-구조)
3. [src/ 디렉토리](#src-디렉토리)
4. [features/ 구조](#features-구조)
5. [shared/ 구조](#shared-구조)
6. [app/ 구조](#app-구조)
7. [store/ 구조](#store-구조)
8. [설정 파일](#설정-파일)

---

## 개요

### 아키텍처 스타일

이 프로젝트는 **Feature-First 아키텍처**를 따릅니다:

- **Feature-Based:** 비즈니스 기능을 중심으로 코드 조직
- **Separated Presentation:** UI, Business Logic, Infrastructure 분리
- **Shared Layer:** 재사용 가능한 코드 중앙 집중화

### 핵심 원칙

1. **독립성:** 각 Feature는 독립적으로 개발/테스트 가능
2. **결합도 최소화:** Feature 간 직접 의존 최소화
3. **재사용성:** 공통 코드는 Shared Layer로
4. **명확성:** 파일 위치로 역할을 명확히 식별

---

## 최상위 구조

```
study-nextjs-2026/
├── .claude/                    # Claude Code 설정
├── .next/                      # Next.js 빌드 출력 (생성됨)
├── .storybook/                 # Storybook 설정
├── .swc/                       # SWC 캐시
├── node_modules/               # 의존성 패키지
│
├── docs/                       # 📚 프로젝트 문서
│   ├── README.md               # 문서화 구조 안내
│   ├── directory-structure.md  # 본 파일
│   ├── feature-dependency-rules.md  # 의존성 규칙
│   └── *.md                    # 기타 문서
│
├── public/                     # 🌐 정적 리소스
│   ├── images/                 # 이미지 파일
│   ├── icons/                  # 아이콘
│   └── favicon.ico             # 파비콘
│
├── src/                        # 💻 소스 코드 (메인)
│   ├── app/                    # Next.js App Router
│   ├── features/               # Feature 모듈
│   ├── shared/                 # 공유 코드
│   ├── store/                  # Redux 인프라
│   ├── mocks/                  # MSW Mock 데이터
│   └── stories/                # Storybook Stories
│
├── tests/                      # 🧪 테스트 코드
│   ├── e2e/                    # E2E 테스트
│   ├── integration/            # 통합 테스트
│   └── unit/                   # 유닛 테스트
│
├── .gitignore                  # Git 무시 파일
├── .prettierrc.cjs             # Prettier 설정
├── components.json             # Shadcn UI 설정
├── eslint.config.js            # ESLint 설정
├── jest.config.js              # Jest 설정
├── next.config.ts              # Next.js 설정
├── package.json                # 프로젝트 메타데이터
├── postcss.config.mjs          # PostCSS 설정
├── tailwind.config.ts          # Tailwind CSS 설정
└── tsconfig.json               # TypeScript 설정
```

---

## src/ 디렉토리

### 전체 구조

```
src/
├── app/                        # 📄 Next.js App Router (Presentation)
│   ├── (auth)/                 # 인증 관련 라우트 그룹
│   ├── (dashboard)/            # 대시보드 관련 라우트 그룹
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈 페이지
│   ├── providers.tsx           # Context Provider들
│   ├── error.tsx               # 에러 핸들링
│   └── global-error.tsx        # 전역 에러 핸들링
│
├── features/                   # 🎯 Feature 모듈 (Business Logic)
│   ├── auth/                   # 인증 Feature
│   ├── dashboard/              # 대시보드 Feature
│   └── products/               # 제품 관리 Feature
│
├── shared/                     # 🔧 공유 코드 (Infrastructure)
│   ├── components/             # 공통 컴포넌트
│   ├── hooks/                  # 커스텀 훅
│   ├── lib/                    # 라이브러리 설정
│   ├── styles/                 # 전역 스타일
│   ├── types/                  # 공유 타입
│   └── utils/                  # 유틸리티 함수
│
├── store/                      # 🗄️ Redux 인프라 (Configuration)
│   ├── api/                    # RTK Query API 설정
│   ├── middleware/             # Redux Middleware
│   ├── registry/               # Reducer/Middleware Registry
│   ├── config.ts               # Store 설정
│   ├── hooks.ts                # Typed Hooks
│   ├── setup.ts                # Store 초기화
│   └── index.ts                # Store 진입점
│
├── mocks/                      # 🎭 MSW Mock 핸들러
└── stories/                    # 📖 Storybook Stories
```

### src/ 역할

| 디렉토리 | 역할 | 책임 |
|---------|------|------|
| **app/** | Presentation | UI 조합, 라우팅, 페이지 |
| **features/** | Business Logic | 비즈니스 기능, 상태, API |
| **shared/** | Infrastructure | 재사용 코드, 유틸리티 |
| **store/** | Configuration | Redux 설정, Registry |

---

## features/ 구조

### 표준 Feature 구조

모든 Feature는 다음 구조를 따릅니다:

```
features/
└── {feature-name}/
    ├── components/          # 프레젠테이션 컴포넌트
    │   ├── {Feature}Detail.tsx
    │   ├── {Feature}Form.tsx
    │   ├── {Feature}List.tsx
    │   └── {Feature}Filters.tsx
    │
    ├── hooks/              # Feature 전용 훅
    │   ├── use{Feature}.ts
    │   └── use{Feature}Form.ts
    │
    ├── store/              # Redux 상태 관리
    │   ├── {feature}Slice.ts       # UI 상태 (Redux Toolkit)
    │   ├── {feature}Selectors.ts   # 상태 선택자
    │   ├── {feature}UISlice.ts     # UI 상태 (선택)
    │   └── apiSlice.ts             # RTK Query API
    │
    ├── types/              # Feature 타입 정의
    │   ├── api.ts          # API 요청/응답 타입
    │   ├── store.ts        # Redux 상태 타입
    │   └── ui.ts           # UI 관련 타입
    │
    ├── utils/              # Feature 유틸리티
    │   ├── validation.ts   # Zod 스키마
    │   └── helpers.ts      # 헬퍼 함수
    │
    ├── constants/          # Feature 상수
    │   └── index.ts        # Feature 전용 상수
    │
    └── index.ts            # Public API (선택)
```

### 실제 예시: products Feature

```
features/products/
├── components/
│   ├── ProductDetail.tsx         # 제품 상세
│   ├── ProductFilters.tsx        # 필터 컴포넌트
│   ├── ProductForm.tsx           # 제품 등록/수정 폼
│   └── ProductList.tsx           # 제품 목록
│
├── hooks/
│   ├── useProduct.ts             # 단일 제품 조회
│   ├── useProducts.ts            # 제품 목록 조회
│   ├── useProductForm.ts         # 폼 상태 관리
│   └── useProductsURLState.ts    # URL 상태 동기화
│
├── store/
│   ├── productsSlice.ts          # 제품 UI 상태
│   ├── productsSelectors.ts      # 상태 선택자
│   ├── productsUISlice.ts        # UI 상태 (필터, 정렬)
│   └── apiSlice.ts               # 제품 API
│
├── types/
│   ├── api.ts                    # API 타입
│   ├── store.ts                  # Redux 상태 타입
│   └── ui.ts                     # UI 타입
│
├── utils/
│   ├── validation.ts             # Zod 스키마
│   └── urlParams.ts              # URL 파라미터 처리
│
└── constants/
    └── index.ts                  # 제품 관련 상수
        ├── PRODUCT_STATUS        # 제품 상태
        ├── PRODUCT_CATEGORY      # 제품 카테고리
        └── PRODUCT_SORT_OPTIONS  # 정렬 옵션
```

### Feature 파일 역할

| 디렉토리 | 용도 | 예시 |
|---------|------|------|
| **components/** | Feature UI 컴포넌트 | ProductList, ProductForm |
| **hooks/** | Feature 상태 로직 | useProduct, useProducts |
| **store/** | Redux 상태 & API | productsSlice, apiSlice |
| **types/** | TypeScript 타입 | Product, CreateProductInput |
| **utils/** | Feature 유틸리티 | validation, helpers |
| **constants/** | Feature 전용 상수 | PRODUCT_STATUS, AUTH_STATUS |

---

## shared/ 구조

### 전체 구조

```
shared/
├── components/             # 공통 컴포넌트
│   ├── common/            # 범용 컴포넌트
│   │   ├── ContentLoader.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── PerformanceMonitor.tsx
│   │   └── SuspenseBoundary.tsx
│   ├── layout/            # 레이아웃 컴포넌트
│   │   └── Navigation.tsx
│   └── ui/                # 기본 UI 컴포넌트 (Shadcn)
│       ├── button.tsx
│       ├── input.tsx
│       ├── EmptyState.tsx
│       └── Skeleton.tsx
│
├── hooks/                 # 커스텀 훅
│   ├── useDebounce.ts     # 디바운스
│   ├── useMediaQuery.ts   # 미디어 쿼리
│   └── useLocalStorage.ts # 로컬 스토리지
│
├── lib/                   # 라이브러리 설정
│   ├── axios/             # Axios 설정
│   │   ├── axiosInstance.ts
│   │   └── axiosBaseQuery.ts
│   └── shadcn/            # Shadcn 유틸
│       └── utils.ts
│
├── styles/                # 전역 스타일
│   └── globals.css        # Tailwind + 커스텀
│
├── types/                 # 공유 타입
│   ├── api.ts             # API 공통 타입
│   │   - ApiError
│   │   - ApiResponse
│   ├── date.ts            # 날짜 타입
│   ├── pagination.ts      # 페이지네이션 타입
│   └── url.ts             # URL 타입
│
├── utils/                 # 유틸리티 함수
│   ├── date/              # 날짜 유틸
│   │   ├── dateRange.ts
│   │   └── dateSerialization.ts
│   ├── url/               # URL 유틸
│   │   └── params.ts
│   ├── validation/        # 검증 유틸
│   │   └── zodHelpers.ts
│   ├── error.ts           # 에러 처리
│   └── logger.ts          # 로깅
│
└── constants/             # 공통 상수
    ├── app.ts             # 애플리케이션 상수
    │   - API, ROUTES, STORAGE_KEYS
    ├── ui.ts              # UI/UX 상수
    │   - COLORS, BREAKPOINTS, Z_INDEX
    ├── validation.ts      # 검증 상수
    │   - REGEX, LENGTH, FILE
    └── index.ts           # 진입점
```

### shared/ 사용 원칙

✅ **Shared에 포함할 것:**
- 여러 Feature에서 재사용하는 컴포넌트
- 프레임워크/라이브러리 설정 (Axios, etc.)
- 범용 유틸리티 (date, url, validation)
- 공통 타입 정의
- 공통 상수 (API, UI, Validation)

❌ **Shared에 포함하지 말 것:**
- 특정 Feature에 종속된 코드
- 비즈니스 로직
- Feature 전용 컴포넌트
- Feature 전용 상수

---

## app/ 구조

### Next.js App Router 구조

```
app/
├── (auth)/                     # 인증 라우트 그룹
│   ├── layout.tsx              # 인증 레이아웃
│   ├── loading.tsx             # 로딩 UI
│   ├── login/
│   │   └── page.tsx            # 로그인 페이지
│   └── register/
│       └── page.tsx            # 회원가입 페이지
│
├── (dashboard)/                # 대시보드 라우트 그룹
│   ├── layout.tsx              # 대시보드 레이아웃
│   ├── loading.tsx             # 로딩 UI
│   ├── dashboard/
│   │   └── page.tsx            # 대시보드 홈
│   └── products/
│       ├── page.tsx            # 제품 목록
│       ├── new/
│       │   └── page.tsx        # 제품 등록
│       └── [id]/
│           ├── page.tsx        # 제품 상세
│           └── edit/
│               └── page.tsx    # 제품 수정
│
├── layout.tsx                  # 루트 레이아웃
├── page.tsx                    # 홈 페이지
├── loading.tsx                 # 전역 로딩
├── error.tsx                   # 에러 페이지
├── global-error.tsx            # 전역 에러 페이지
└── providers.tsx               # Context Provider
```

### 라우트 그룹 (Route Groups)

**`(auth)` 그룹:**
- 인증이 필요 없는 페이지
- 별도 레이아웃 (미니멀한 디자인)

**`(dashboard)` 그룹:**
- 인증이 필요한 페이지
- 공통 레이아웃 (네비게이션, 헤더)

### 페이지 구성 규칙

```typescript
// ✅ 좋은 예: Page는 조합만 담당
// app/(dashboard)/products/page.tsx
import { ProductList } from '@/features/products/components/ProductList';
import { ProductFilters } from '@/features/products/components/ProductFilters';

export default function ProductsPage() {
  return (
    <div>
      <ProductFilters />
      <ProductList />
    </div>
  );
}
```

---

## store/ 구조

### Redux 인프라 구조

```
store/
├── api/                        # RTK Query API 설정
│   ├── config.ts               # API 기본 설정
│   └── registry.ts             # API Slice 레지스트리
│
├── middleware/                 # 커스텀 Middleware
│   └── performance.ts          # 성능 모니터링
│
├── registry/                   # 동적 레지스트리
│   ├── base.ts                 # 베이스 레지스트리
│   ├── middleware.ts           # Middleware 레지스트리
│   └── reducer.ts              # Reducer 레지스트리
│
├── reducers/                   # 리듀서 헬퍼
│   └── hooks.ts                # Reducer Hooks
│
├── config.ts                   # Store 설정 (middleware, persist)
├── hooks.ts                    # Typed Hooks
├── setup.ts                    # Store 초기화
├── storage.ts                  # Persist Storage
├── transforms.ts               # Persist Transform
└── index.ts                    # 진입점
```

### store/ 역할

**`src/store/`의 목적:**
- Redux Store 설정 및 초기화
- Middleware & Reducer Registry (동적 주입)
- Typed Hooks (`useAppDispatch`, `useAppSelector`)
- Persist Configuration

**실제 상태 로직은 Feature에:**
- `features/*/store/` 에 각 Feature의 상태
- `src/store/`는 순수 인프라만

### 동적 Reducer Injection

```typescript
// store/registry/reducer.ts
export const reducerRegistry = createReducerRegistry();

// Feature에서 Reducer 동적 주입
import { injectReducer } from '@/store';
import { productsReducer } from './store/productsSlice';

// 페이지 진입 시 주입
useEffect(() => {
  store.dispatch(injectReducer('products', productsReducer));
}, []);
```

---

## 설정 파일

### 프로젝트 설정 파일

```
study-nextjs-2026/
├── next.config.ts              # Next.js 설정
├── tsconfig.json               # TypeScript 설정
├── tailwind.config.ts          # Tailwind CSS 설정
├── postcss.config.mjs          # PostCSS 설정
├── eslint.config.js            # ESLint 설정
├── .prettierrc.cjs             # Prettier 설정
├── jest.config.js              # Jest 설정
├── components.json             # Shadcn UI 설정
├── babel.config.js             # Babel 설정
└── package.json                # 프로젝트 의존성
```

### 주요 설정 파일 설명

#### 1. next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React 성능 실험적 기능
  reactStrictMode: true,

  // 번들 분석
  experimental: {
    turbo: {},
  },
};

export default nextConfig;
```

#### 2. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

**Path Alias:**
- `@/` → `src/`
- `@/features/*` → `src/features/*`
- `@/shared/*` → `src/shared/*`

#### 3. package.json

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src",
    "test": "jest",
    "storybook": "storybook dev -p 6006"
  }
}
```

---

## 파일 찾기 가이드

### "이 파일은 어디에?"

| 찾으려는 것 | 위치 | 예시 |
|------------|------|------|
| **페이지** | `src/app/` | `src/app/(dashboard)/products/page.tsx` |
| **Feature 컴포넌트** | `src/features/*/components/` | `src/features/products/components/ProductList.tsx` |
| **공통 컴포넌트** | `src/shared/components/` | `src/shared/components/ui/button.tsx` |
| **Redux Slice** | `src/features/*/store/` | `src/features/products/store/productsSlice.ts` |
| **Custom Hook** | `src/features/*/hooks/` | `src/features/products/hooks/useProducts.ts` |
| **공용 Hook** | `src/shared/hooks/` | `src/shared/hooks/useDebounce.ts` |
| **API 설정** | `src/shared/lib/axios/` | `src/shared/lib/axios/axiosInstance.ts` |
| **타입 정의** | `src/*/types/` | `src/features/products/types/api.ts` |
| **유틸리티** | `src/*/utils/` | `src/shared/utils/date/dateUtils.ts` |
| **공통 상수** | `src/shared/constants/` | `src/shared/constants/app.ts` |
| **Feature 상수** | `src/features/*/constants/` | `src/features/products/constants/index.ts` |

---

## 의존성 규칙

### 허용되는 Import

```
✅ app/ → features/      (Page에서 Component import)
✅ app/ → shared/        (Page에서 공통 컴포넌트)

✅ features/ → shared/   (Feature에서 공통 코드, 상수)

✅ features/ → store/    (Typed Hooks)

✅ shared/ → (none)      (Shared는 순수해야 함)
```

### 금지되는 Import

```
❌ features/ → features/ (직접 import 금지)
❌ shared/ → features/   (순환 의존성 위험)
```

**대신 Redux Selector 사용:**
```typescript
// ✅ 허용: Redux Selector로 통신
import { selectAuthUser } from '@/features/auth/store/authSelectors';
```

---

## 확장 가이드

### 새로운 Feature 추가

```bash
# 1. Feature 폴더 생성
mkdir -p src/features/my-feature/{components,hooks,store,types,utils,constants}

# 2. 기본 파일 생성
touch src/features/my-feature/components/MyComponent.tsx
touch src/features/my-feature/store/myFeatureSlice.ts
touch src/features/my-feature/types/api.ts
touch src/features/my-feature/constants/index.ts

# 3. 페이지 생성
mkdir -p src/app/(dashboard)/my-feature
touch src/app/(dashboard)/my-feature/page.tsx
```

### 새로운 공통 컴포넌트 추가

```
# UI 컴포넌트 (Shadcn 기반)
src/shared/components/ui/{name}.tsx

# 공통 컴포넌트
src/shared/components/common/{name}.tsx

# 레이아웃 컴포넌트
src/shared/components/layout/{name}.tsx
```

### 새로운 공통 상수 추가

```
# 애플리케이션 상수 (API, Routes, etc.)
src/shared/constants/app.ts

# UI 상수 (Colors, Breakpoints, etc.)
src/shared/constants/ui.ts

# 검증 상수 (Regex, Length, etc.)
src/shared/constants/validation.ts

# 새로운 상수 파일
src/shared/constants/my-new-constants.ts
```

**새로운 상수 추가 시 `src/shared/constants/index.ts`에 export 추가:**

---

## 참고 문서

### 관련 문서

- [프로젝트 구조 분석](./project-structure-analysis.md)
- [Feature 간 의존성 규칙](./feature-dependency-rules.md)
- [아키텍처 개요](./architecture/overview.md)
- [문서화 가이드라인](./documentation-guidelines.md)

### 추가 학습

1. **Next.js App Router:** [공식 문서](https://nextjs.org/docs/app)
2. **Redux Toolkit:** [공식 문서](https://redux-toolkit.js.org/)
3. **RTK Query:** [공식 문서](https://redux-toolkit.js.org/rtk-query/overview)
4. **TypeScript:** [공식 문서](https://www.typescriptlang.org/docs/)

---

**문서 버전:**
- v1.0.0 (2026-01-15): 초기 버전
