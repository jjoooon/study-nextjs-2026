# 라우팅 상수 중앙화 리팩토링

## 개요

프로젝트 내의 하드코딩된 라우팅 경로들을 중앙 상수 파일(`src/shared/constants/routes.ts`)로 통합하여 유지보수성과 일관성을 개선했습니다.

---

## 변경 사항

### 1. 새로운 파일 생성

**`src/shared/constants/routes.ts`**
- 모든 라우팅 상수를 중앙 집중식으로 관리
- 공개 경로, 인증 경로, 메인 경로, 상품 경로 등을 포함
- TypeScript 타입 안정성 제공

#### 주요 상수

```typescript
// 공개 경로 (인증 불필요)
export const PUBLIC_ROUTES = ['/login'] as const;

// 인증 관련 경로
export const AUTH_ROUTES = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

// 메인/홈 경로
export const MAIN_ROUTES = {
  HOME: '/',
  DASHBOARD: '/sample/dashboard',
} as const;

// 상품 경로
export const PRODUCTS_ROUTES = {
  LIST: '/sample/products/List',
  DETAIL: (id: string) => `/sample/products/${id}`,
  CREATE: '/sample/products/new',
  EDIT: (id: string) => `/sample/products/${id}/edit`,
} as const;
```

#### 헬퍼 함수

```typescript
// 공개 경로 여부 확인
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route)
  );
};
```

---

### 2. AuthGuard 업데이트

**변경 전:**
```typescript
// src/shared/components/auth/AuthGuard.tsx

const PUBLIC_PATHS = ['/login'] as const;

const isPublicPath = (pathname: string): boolean => {
  return PUBLIC_PATHS.some((path) =>
    pathname === path || pathname.startsWith(path)
  );
};
```

**변경 후:**
```typescript
// src/shared/components/auth/AuthGuard.tsx

import { isPublicRoute } from '@/shared/constants/routes';

// isPublicRoute() 함수 사용
```

**개선점:**
- ✅ 로컬 상수 제거로 코드 간소화
- ✅ 중앙 집중식 관리로 일관성 확보
- ✅ 공개 경로 추가 시 routes.ts만 수정

---

### 3. Navigation 컴포넌트 업데이트

**변경 전:**
```typescript
// src/shared/components/layout/Navigation.tsx

const navigation: NavItem[] = [
  { name: '홈', href: '/', description: '메인 페이지' },
  { name: '대시보드', href: '/sample/dashboard', description: '사용자 대시보드' },
];

// 하드코딩된 경로 사용
<Link href="/login">로그인</Link>
window.location.href = '/';
```

**변경 후:**
```typescript
// src/shared/components/layout/Navigation.tsx

import { AUTH_ROUTES, MAIN_ROUTES } from '@/shared/constants/routes';

const navigation: NavItem[] = [
  { name: '홈', href: MAIN_ROUTES.HOME, description: '메인 페이지' },
  { name: '대시보드', href: MAIN_ROUTES.DASHBOARD, description: '사용자 대시보드' },
];

// 상수 사용
<Link href={AUTH_ROUTES.LOGIN}>로그인</Link>
window.location.href = MAIN_ROUTES.HOME;
```

**개선점:**
- ✅ 오타로 인한 버그 방지
- ✅ 경로 변경 시 한 곳만 수정
- ✅ IDE 자동완성 지원

---

## 이점

### 1. 유지보수성

**이전:**
```
경로 변경 시 5개 파일 수정 필요
├── AuthGuard.tsx
├── Navigation.tsx (3处)
├── login/page.tsx
├── page.tsx
└── 기타 컴포넌트...
```

**현재:**
```
경로 변경 시 1개 파일만 수정
└── routes.ts (PUBLIC_ROUTES, AUTH_ROUTES, etc.)
```

### 2. 재사용성

```typescript
// 어떤 컴포넌트에서도 import하여 사용
import { AUTH_ROUTES, PRODUCTS_ROUTES } from '@/shared/constants/routes';

<Link href={AUTH_ROUTES.LOGIN}>로그인</Link>
<Link href={PRODUCTS_ROUTES.LIST}>상품 목록</Link>
```

### 3. 타입 안정성

```typescript
// TypeScript 타입 지원
export type PublicRoute = (typeof PUBLIC_ROUTES)[number];
export type AuthRoute = keyof typeof AUTH_ROUTES;

// 컴파일 타임에 오타 감지
const route: AuthRoute = 'LOGIN'; // ✅
const wrongRoute: AuthRoute = 'LOGN'; // ❌ TypeScript 에러
```

### 4. 자동완성

```typescript
import { AUTH_ROUTES } from '@/shared/constants/routes';

AUTH_ROUTES. // IDE가 자동완성 제공
// ├── LOGIN
// ├── LOGOUT
// ├── REGISTER
// ├── FORGOT_PASSWORD
// └── RESET_PASSWORD
```

---

## 사용 가이드

### 공개 경로 추가

```typescript
// src/shared/constants/routes.ts

export const PUBLIC_ROUTES = [
  '/login',
  '/about',       // 추가
  '/help',        // 추가
] as const;
```

### 새로운 경로 그룹 추가

```typescript
// src/shared/constants/routes.ts

/**
 * 사용자 설정 관련 경로
 */
export const SETTINGS_ROUTES = {
  PROFILE: '/settings/profile',
  ACCOUNT: '/settings/account',
  NOTIFICATIONS: '/settings/notifications',
} as const;
```

### 동적 경로 생성

```typescript
// src/shared/constants/routes.ts

export const PRODUCTS_ROUTES = {
  // 정적 경로
  LIST: '/products',

  // 동적 경로 (함수)
  DETAIL: (id: string) => `/products/${id}`,
  EDIT: (id: string) => `/products/${id}/edit`,
} as const;

// 사용 예시
<Link href={PRODUCTS_ROUTES.DETAIL('123')}>상품 상세</Link>
```

---

## 마이그레이션 체크리스트

다음 파일들의 하드코딩된 경로를 상수로 변경할 수 있습니다:

- [ ] `src/app/page.tsx` - 링크 경로
- [ ] `src/app/login/page.tsx` - returnUrl 처리
- [ ] `src/features/*/pages/*.tsx` - 네비게이션 경로
- [ ] `src/features/*/constants/*.ts` - 기능별 경로 상수 (중앙화)

---

## TypeScript 지원

### 타입 내보내기

```typescript
// 공개 경로 타입
export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

// 인증 경로 타입
export type AuthRoute = keyof typeof AUTH_ROUTES;

// 메인 경로 타입
export type MainRoute = keyof typeof MAIN_ROUTES;

// 상품 경로 타입
export type ProductRoute = keyof typeof PRODUCTS_ROUTES;
```

### 타입 가드

```typescript
// 공개 경로 여부 확인 (타입 가드)
export const isPublicRoute = (pathname: string): pathname is PublicRoute => {
  return PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route)
  );
};

// 사용 예시
if (isPublicRoute(pathname)) {
  // pathname은 PublicRoute 타입으로 좁혀짐
  console.log('Public route:', pathname);
}
```

---

## ESLint 규칙 (추천)

프로젝트에 하드코딩된 경로를 방지하는 커스텀 규칙 추가:

```json
// .eslintrc.json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "Literal[value=/^\\/([a-z0-9-]+\\/?)*$/]",
        "message": "Use route constants from @/shared/constants/routes instead of hardcoded paths"
      }
    ]
  }
}
```

---

## 참고 자료

- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [TypeScript Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [Constant Naming Conventions](https://typescript-eslint.io/rules/naming-convention/)

---

## 관련 문서

- [라우트 보호 구현 가이드](./route-protection-implementation.md)
- [프로젝트 디렉토리 구조](../프로젝트%20디렉토리%20구조.md)
- [신규 Feature 작성 워크플로우](../신규%20Feature%20작성%20워크플로우.md)
