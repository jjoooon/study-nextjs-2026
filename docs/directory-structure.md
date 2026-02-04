# 디렉토리 구조

이 문서는 프로젝트의 디렉토리 구조와 각 디렉토리의 역할을 설명합니다.

## 전체 구조

```
study-nextjs-2026/
├── docs/                          # 프로젝트 문서
├── public/                        # 정적 파일 (이미지, 폰트 등)
├── src/                          # 소스 코드
│   ├── app/                      # Next.js App Router
│   ├── features/                 # 기능 기반 모듈
│   ├── shared/                   # 공유 코드
│   ├── redux/                    # Redux 상태 관리
│   └── mocks/                    # MSW API 모킹
├── .storybook/                   # Storybook 설정
├── .gitignore
├── next.config.ts               # Next.js 설정
├── tsconfig.json                # TypeScript 설정
├── eslint.config.js             # ESLint 설정
├── tailwind.config.ts           # Tailwind CSS 설정
├── package.json                 # 프로젝트 의존성
└── README.md                    # 프로젝트 설명
```

## 상세 구조

### `/src` - 소스 코드 루트

애플리케이션의 모든 소스 코드가 위치하는 곳입니다.

```
src/
├── app/                          # Next.js App Router (App Router)
├── features/                     # 기능 기반 모듈 (Feature-based)
├── middleware/                   # Next.js 미들웨어
├── shared/                       # 공유 코드 (Shared Layer)
├── redux/                        # Redux 상태 관리
└── mocks/                        # MSW API 모킹
```

---

### `/src/app` - Next.js App Router

Next.js 16의 App Router를 사용하는 페이지와 레이아웃이 위치합니다.

```
app/
├── layout.tsx                   # 루트 레이아웃
├── page.tsx                     # 홈 페이지
├── loading.tsx                  # 전역 로딩 UI
├── error.tsx                    # 에러 바운더리
├── global-error.tsx             # 전역 에러 바운더리
├── providers.tsx                # 애플리케이션 Provider (Redux, Theme 등)
├── globals.css                  # 전역 스타일
│
├── login/                       # 로그인 페이지
│   └── page.tsx
│
└── sample/                      # 샘플 애플리케이션
    ├── layout.tsx               # 샘플 레이아웃
    ├── loading.tsx              # 샘플 로딩 UI
    ├── dashboard/
    │   └── page.tsx             # 대시보드 페이지
    └── products/
        ├── [pageId]/            # 동적 라우트
        │   └── page.tsx         # 상품 상세/수정 페이지
        └── pages/               # 페이지 컴포넌트
            ├── List.tsx         # 상품 목록
            ├── Detail.tsx       # 상품 상세
            ├── Edit.tsx         # 상품 수정
            └── New.tsx          # 상품 등록
```

**주요 파일:**
- `layout.tsx` - 전체 애플리케이션 레이아웃
- `page.tsx` - 루트 페이지 (`/`)
- `providers.tsx` - Redux Provider, Theme Provider 등
- `error.tsx`, `global-error.tsx` - 에러 핸들링

---

### `/src/features` - 기능 기반 모듈 (Feature Layer)

도메인별로 기능을 그룹화한 디렉토리입니다. 각 기능은 독립적으로 구성됩니다.

```
features/
├── dashboard/                   # 대시보드 기능
│   ├── components/              # 대시보드 컴포넌트
│   │   ├── DashboardStats.tsx  # 통계 카드
│   │   └── RecentActivity.tsx  # 최근 활동
│   ├── hooks/                   # 대시보드 훅
│   │   └── useDashboard.ts     # 대시보드 데이터 훅
│   ├── services/                # 대시보드 API 서비스
│   │   └── dashboardService.ts
│   ├── store/                   # 대시보드 상태
│   │   ├── dashboardSlice.ts
│   │   └── dashboardSelectors.ts
│   ├── types/                   # 타입 정의
│   │   ├── apiTypes.ts         # API 응답 타입
│   │   ├── storeTypes.ts       # Store 타입
│   │   └── uiTypes.ts          # UI 관련 타입
│   ├── utils/                   # 유틸리티
│   │   └── dateUtils.ts        # 날짜 유틸리티
│   └── constants/               # 상수
│       └── index.ts
│
└── products/                    # 상품 기능
    ├── components/              # 상품 컴포넌트
    │   ├── ProductForm.tsx     # 상품 폼
    │   ├── ProductList.tsx     # 상품 목록
    │   ├── ProductGrid.tsx     # 상품 그리드
    │   ├── ProductDetail.tsx   # 상품 상세
    │   └── ProductFilters.tsx  # 상품 필터
    ├── sections/                # 페이지 섹션 컴포넌트
    │   ├── ListSection.tsx     # 목록 페이지 섹션
    │   ├── DetailSection.tsx   # 상세 페이지 섹션
    │   ├── EditSection.tsx     # 수정 페이지 섹션
    │   └── NewSection.tsx      # 등록 페이지 섹션
    ├── hooks/                   # 상품 훅
    │   ├── useProducts.ts      # 상품 목록 훅
    │   ├── useProduct.ts       # 단일 상품 훅
    │   ├── useProductForm.ts   # 상품 폼 훅
    │   └── useProductsURLState.ts # URL 상태 훅
    ├── services/                # 상품 API 서비스
    │   └── productService.ts
    ├── store/                   # 상품 상태
    │   ├── productsUISlice.ts  # UI 상태 Slice
    │   └── productsSelectors.ts # 상품 Selectors
    ├── types/                   # 타입 정의
    │   ├── apiTypes.ts         # API 타입
    │   ├── storeTypes.ts       # Store 타입
    │   └── uiTypes.ts          # UI 타입
    ├── utils/                   # 유틸리티
    │   ├── urlParams.ts        # URL 파라미터 처리
    │   └── validation.ts       # 검증 로직
    └── constants/               # 상수
        └── routes.ts           # 라우트 상수
```

**기능별 구조 패턴:**
```
feature-name/
├── components/          # 재사용 가능한 UI 컴포넌트
├── sections/            # 페이지 단위 섹션 컴포넌트
├── hooks/              # 기능 전용 커스텀 훅
├── services/           # API 서비스
├── store/              # Redux 상태 (Slice, Selectors)
├── types/              # 타입 정의
├── utils/              # 유틸리티 함수
└── constants/          # 상수
```

**중요:** Feature 간 import 제한 (ESLint 규칙)
- Feature는 다른 Feature의 컴포넌트를 직접 import할 수 없습니다
- 반드시 Shared Layer를 통해서만 재사용 가능합니다

**Components vs Sections:**
- **components/**: 재사용 가능한 작은 UI 컴포넌트 (ProductCard, ProductFilters 등)
- **sections/**: 페이지 단위의 큰 컴포넌트 (ListSection, DetailSection 등)

---

### `/src/shared` - 공유 코드 (Shared Layer)

모든 기능에서 공통으로 사용하는 코드가 위치합니다.

```
shared/
├── components/                 # 공유 컴포넌트
│   ├── auth/                  # 인증 관련 컴포넌트
│   │   └── AuthGuard.tsx     # 인증 가드
│   ├── layout/                # 레이아웃 컴포넌트
│   │   └── Navigation.tsx    # 네비게이션
│   └── ui/                    # UI 컴포넌트 (Shadcn/UI 스타일)
│       └── Button.tsx        # 버튼
│
├── lib/                       # 라이브러리
│   └── utils.ts             # 유틸리티 함수
│
├── services/                  # 공유 서비스
│   └── api/                 # API 설정
│
├── store/                     # 공유 Redux 설정
│   ├── hooks.ts             # 커스텀 훅
│   ├── index.ts             # 스토어 설정
│   └── config.ts            # 스토어 설정
│
├── styles/                    # 공유 스타일
│   └── globals.css          # 전역 CSS
│
├── types/                     # 공유 타입
│   └── index.ts             # 공유 타입 정의
│
├── utils/                     # 공유 유틸리티
│   └── index.ts             # 유틸리티 함수
│
├── config/                    # 설정
│   └── env.ts               # 환경 변수 설정
│
└── constants/                 # 공유 상수
    └── index.ts             # 상수 정의
```

**Shared 컴포넌트 특징:**
- 모든 Feature에서 import 가능
- Redux 상태(selector, slice)에 접근 가능
- 재사용 가능한 범용 컴포넌트

---

### `/src/middleware` - Next.js 미들웨어

Next.js 미들웨어를 사용한 요청/응답 처리가 위치합니다.

```
middleware/
├── chain.ts                    # 미들웨어 체인 (Chain of Responsibility)
├── types.ts                    # 미들웨어 타입 정의
└── handlers/                   # 미들웨어 핸들러
    ├── debugLogLevel.ts       # 디버그 로그 레벨 설정
    └── blockSourceMaps.ts     # 소스맵 접근 차단
```

**미들웨어 아키텍처:**
- **Chain of Responsibility 패턴** - 순차적 미들웨어 실행
- **조건부 실행** - 핸들러별 실행 조건 지원
- **핸들러 기반 모듈화** - 독립적인 미들웨어 핸들러

**주요 핸들러:**
- **debugLogLevel** - IP 기반 디버그 로그 레벨 동적 설정
- **blockSourceMaps** - 프로덕션 환경에서 소스맵 접근 차단

---

### `/src/redux` - Redux 상태 관리

Redux Toolkit과 Redux Persist를 사용한 전역 상태 관리가 위치합니다.

```
redux/
├── hooks.ts                   # 커스텀 Redux 훅
├── index.ts                   # 스토어 메인 설정
├── config.ts                  # 스토어 설정
│
├── middleware/                # 커스텀 미들웨어
│   └── performance.ts       # 성능 모니터링 미들웨어
│
├── reducers/                  # 리듀서
│   └── hooks.ts             # 리듀서 훅
│
├── registry/                  # 스토어 레지스트리
│   ├── base.ts              # 기본 레지스트리
│   ├── reducer.ts           # 리듀서 레지스트리
│   └── middleware.ts        # 미들웨어 레지스트리
│
└── api/                       # API 설정
    ├── config.ts             # API 설정
    └── registry.ts           # API 레지스트리
```

**Redux 아키텍처:**
- **Redux Toolkit** - 상태 관리
- **Redux Persist** - 로컬 스토리지 지속성
- **Registry 패턴** - 동적 리듀서/미들웨어 등록
- **성능 모니터링 미들웨어** - 상태 변경 성능 모니터링

---

### `/src/mocks` - MSW API 모킹

MSW (Mock Service Worker)를 사용한 API 모킹이 위치합니다.

```
mocks/
├── browser.ts                 # 브라우저용 MSW 설정
├── server.ts                  # 서버용 MSW 설정
│
├── setup/                     # MSW 설정
│   ├── browser.ts            # 브라우저 설정
│   └── server.ts             # 서버 설정
│
├── handlers/                  # 요청 핸들러
│   ├── index.ts              # 핸들러 통합
│   ├── auth.ts               # 인증 API 핸들러
│   ├── products.ts           # 상품 API 핸들러
│   ├── dashboard.ts          # 대시보드 API 핸들러
│   └── errors.ts             # 에러 핸들러
│
└── data/                      # 모의 데이터
    ├── products.ts           # 상품 데이터
    └── dashboard.ts          # 대시보드 데이터
```

**MSW 사용 목적:**
- 개발 환경에서 실제 API 없이 개발
- 일관된 모의 데이터로 테스트
- 에러 시나리오 시뮬레이션

---

## 경로 별칭 (Path Aliases)

TypeScript 설정에서 정의된 경로 별칭을 사용하여 import를 간소화합니다.

```typescript
@/*          -> ./src/*
@/features/* -> ./src/features/*
@/shared/*   -> ./src/shared/*
```

**사용 예시:**
```typescript
// 기본 import
import { Button } from '../../../shared/components/ui/Button'

// 경로 별칭 사용
import { Button } from '@/shared/components/ui/Button'
```

---

## 아키텍처 원칙

### 1. 기능 기반 아키텍처 (Feature-Based Architecture)

```
Features (도메인별 기능)
  ↓
Shared (재사용 가능한 코드)
  ↓
App (Next.js App Router)
```

**장점:**
- 기능 간 결합도 최소화
- 코드 재사용성 향상
- 유지보수 용이성

### 2. Import 제한 규칙

**허용:**
- Feature → Shared import ✓
- Feature → 자신의 내부 import ✓
- Shared → Feature import (Redux 상태만) ✓

**금지:**
- Feature → 다른 Feature import ✗
  - ESLint가 자동으로 감지하고 에러 표시

### 3. 레이어별 책임

| 레이어 | 책임 | 예시 |
|--------|------|------|
| **Features** | 도메인별 비즈니스 로직 | 대시보드, 상품 관리 |
| **Shared** | 재사용 가능한 코드 | UI 컴포넌트, 유틸리티, 타입 |
| **Middleware** | 요청/응답 처리 | IP 기반 로그 설정, 소스맵 차단 |
| **App** | 라우팅, 레이아웃 | 페이지, 레이아웃, 에러 처리 |
| **Redux** | 전역 상태 관리 | Redux 설정, 미들웨어 |
| **Mocks** | API 모킹 | MSW 핸들러, 모의 데이터 |

---

## 파일 명명 규칙

### 컴포넌트 파일
- **PascalCase**: `UserProfile.tsx`, `ProductList.tsx`
- **Section 접미사**: `ListSection.tsx`, `DetailSection.tsx`
- 컴포넌트 파일은 `.tsx` 확장자

### 유틸리티/함수 파일
- **camelCase**: `dateUtils.ts`, `urlParams.ts`
- 유틸리티 파일은 `.ts` 확장자

### 타입 파일
- **camelCase**: `apiTypes.ts`, `storeTypes.ts`, `uiTypes.ts`
- 타입 정의 전용 파일

### Hook 파일
- **camelCase**, `use` 접두사: `useDashboard.ts`, `useProducts.ts`

### Redux 파일
- Slice: `[name]Slice.ts` (예: `dashboardSlice.ts`)
- Selector: `[name]Selectors.ts` (예: `dashboardSelectors.ts`)

---

## 디렉토리 추가 가이드

### 새로운 Feature 추가

1. `/src/features/feature-name` 디렉토리 생성
2. 표준 구조로 하위 디렉토리 생성:
   ```
   feature-name/
   ├── components/       # 재사용 가능한 UI 컴포넌트
   ├── sections/         # 페이지 단위 섹션 컴포넌트
   ├── hooks/           # 커스텀 훅
   ├── services/        # API 서비스
   ├── store/           # Redux 슬라이스 및 선택자
   ├── types/           # TypeScript 타입
   ├── utils/           # 유틸리티 함수
   └── constants/       # 상수
   ```
3. 필요한 컴포넌트, 로직 구현

### 새로운 Shared 컴포넌트 추가

1. 적절한 위치에 컴포넌트 생성:
   - UI 컴포넌트: `/src/shared/components/ui/`
   - 레이아웃: `/src/shared/components/layout/`
   - 인증: `/src/shared/components/auth/`
2. Storybook으로 개발 및 테스트
3. export 추가

### 새로운 미들웨어 핸들러 추가

1. `/src/middleware/handlers/`에 핸들러 파일 생성
2. `MiddlewareHandler` 타입 구현:
   ```typescript
   import type { MiddlewareHandler } from '../types';

   export function createMyHandler(): MiddlewareHandler {
     return (request, response) => {
       // 미들웨어 로직
       return response;
     };
   }
   ```
3. 미들웨어 체인에 핸들러 등록 (`chain.ts`의 `composeMiddleware`)
4. 필요한 경우 조건부 실행 설정 (`MiddlewareHandlerConfig`)

---

## 관련 문서

- [README.md](../README.md) - 프로젝트 개요
- [아키텍처 가이드](./architecture.md) - 상세 아키텍처 설명
- [코딩 컨벤션](./coding-conventions.md) - 코딩 표준
- [Products Feature Workflow](./products-feature-workflow.md) - 상품 기능 상세 가이드
