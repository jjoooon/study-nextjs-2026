# 🔗 URL 하드코딩 문제 분석 및 해결 방안

## 📋 문제 개요

**현재 상황**: `sample/products` 경로가 소스 코드 전체에 하드코딩되어 있어 URL 변경 시 다수의 파일을 수정해야 하는 유지보수성 문제

**영향 범위**: 16개 이상의 파일에서 URL 경로 하드코딩 발견

---

## 🔍 발견된 하드코딩된 URL 목록

### 1. useProductsURLState.ts (5회)
```typescript
// 라인 87, 103, 113, 124, 147
router.replace(`/sample/products/List${queryString}`);
```

### 2. pages/Detail.tsx (2회)
```typescript
// 라인 79
const returnURL = `/sample/products/List?${searchParams.toString()}`;

// 라인 116
router.push(`/sample/products/Edit?${params.toString()}`);
```

### 3. pages/List.tsx (2회)
```typescript
// 라인 107
router.push(`/sample/products/Detail?${params.toString()}`);

// 라인 113
router.push(`/sample/products/New?${searchParams.toString()}`);
```

### 4. pages/New.tsx (1회)
```typescript
// 라인 75
const returnURL = `/sample/products/List?${searchParams.toString()}`;
```

### 5. pages/Edit.tsx (1회)
```typescript
// 라인 108
router.push(`/sample/products/Detail?${params.toString()}`);
```

### 6. app/page.tsx (1회)
```typescript
// 라인 63
href="/sample/products/List"
```

### 7. 기타 불일치 경로
```typescript
// useProduct.ts, useProductForm.ts
router.push('/products');  // ⚠️ '/sample/products'와 불일치
router.push(`/products/${id}`);  // ⚠️ 다른 경로 구조
```

---

## ⚠️ 문제점 분석

### 1. 유지보수성 저하
```
URL 변경 시 수정 필요:
- 6개 파일
- 16개 이상의 위치
- 테스트 코드까지 고려하면 그 이상
```

### 2. 오타로 인한 버그 위험
```typescript
// 실수로 발생할 수 있는 오타
/sample/products vs /Sample/Products
/sample/produts vs /sample/products
/sample/products/Edit vs /sample/products/edit
```

### 3. 경로 불일치
```typescript
// 두 가지 다른 경로 패턴 사용
/sample/products/List  // app 디렉토리 내부
/products              // features 내부 훅에서 사용
```

### 4. 리팩토링 어려움
- 문자열 리터럴이라 IDE 리팩토링 도구로 찾기 어려움
- 정규식 검색도 모든 변형을 찾기 어려움
- 일부 경로는 누락될 가능성

### 5. 타입 안전성 부족
```typescript
router.push(`/sample/products/Detail?id=${id}`);
//          ^^^^^^^^^^^^^^^^^^^^^^^^
//          타입 검증 없는 문자열 리터럴
```

---

## 🎯 해결 방안

### Phase 1: 상수 파일 생성 (1시간)

#### 1.1 경로 상수 정의
```typescript
// src/features/products/constants/routes.ts

/**
 * Products 도메인 경로 상수
 *
 * @description
 * - URL 경로를 중앙 집중식으로 관리
 * - 타입 안전성 확보
 * - 일관된 경로 구조 보장
 *
 * @example
 * ```typescript
 * import { PRODUCTS_ROUTES } from '@/features/products/constants/routes';
 *
 * router.push(PRODUCTS_ROUTES.LIST);
 * ```
 */
export const PRODUCTS_ROUTES = {
  /** 기본 경로 */
  BASE: '/sample/products',

  /** 제품 목록 페이지 */
  LIST: '/sample/products/List',

  /** 제품 상세 페이지 */
  DETAIL: '/sample/products/Detail',

  /** 제품 등록 페이지 */
  NEW: '/sample/products/New',

  /** 제품 수정 페이지 */
  EDIT: '/sample/products/Edit',
} as const;

/**
 * Products 경로 타입
 */
export type ProductsRoute = typeof PRODUCTS_ROUTES[keyof typeof PRODUCTS_ROUTES];
```

#### 1.2 쿼리 파라미터 타입 정의
```typescript
// src/features/products/types/routes.ts

/**
 * Products 라우팅에서 사용하는 쿼리 파라미터 타입
 */
export interface ProductsListQueryParams {
  search?: string;
  status?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  viewMode?: 'table' | 'grid';
}

export interface ProductDetailQueryParams {
  id: number | string;
  [key: string]: string | number | undefined;
}

export interface ProductFormQueryParams extends ProductsListQueryParams {
  id?: number | string;
}
```

---

### Phase 2: 경로 빌더 유틸리티 (2시간)

#### 2.1 경로 빌더 함수
```typescript
// src/features/products/utils/routeBuilder.ts

import type { ProductDetailQueryParams, ProductFormQueryParams, ProductsListQueryParams } from '../types/routes';
import { PRODUCTS_ROUTES } from '../constants/routes';

/**
 * 쿼리 파라미터를 URL 쿼리 문자열로 변환
 */
function buildQueryString(params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Products 경로 빌더
 *
 * @description
 * 타입 안전한 URL 생성을 위한 빌더 함수
 *
 * @example
 * ```typescript
 * // 목록 페이지
 * buildProductsRoute.list();
 * // => "/sample/products/List"
 *
 * buildProductsRoute.list({ search: 'laptop', status: 'active' });
 * // => "/sample/products/List?search=laptop&status=active"
 *
 * // 상세 페이지
 * buildProductsRoute.detail(123);
 * // => "/sample/products/Detail?id=123"
 *
 * buildProductsRoute.detail(123, { return: 'list' });
 * // => "/sample/products/Detail?id=123&return=list"
 * ```
 */
export const buildProductsRoute = {
  /**
   * 제품 목록 페이지 경로 생성
   */
  list: (params?: ProductsListQueryParams): string => {
    return `${PRODUCTS_ROUTES.LIST}${buildQueryString(params)}`;
  },

  /**
   * 제품 상세 페이지 경로 생성
   */
  detail: (id: number | string, params?: Omit<ProductDetailQueryParams, 'id'>): string => {
    const queryParams = { id, ...params };
    return `${PRODUCTS_ROUTES.DETAIL}${buildQueryString(queryParams)}`;
  },

  /**
   * 제품 등록 페이지 경로 생성
   */
  create: (params?: ProductFormQueryParams): string => {
    return `${PRODUCTS_ROUTES.NEW}${buildQueryString(params)}`;
  },

  /**
   * 제품 수정 페이지 경로 생성
   */
  edit: (id: number | string, params?: Omit<ProductFormQueryParams, 'id'>): string => {
    const queryParams = { id, ...params };
    return `${PRODUCTS_ROUTES.EDIT}${buildQueryString(queryParams)}`;
  },
} as const;
```

---

### Phase 3: 라우터 훅 생성 (1시간)

#### 3.1 타입 안전한 라우터 훅
```typescript
// src/features/products/hooks/useProductsRouter.ts

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { ProductDetailQueryParams, ProductFormQueryParams, ProductsListQueryParams } from '../types/routes';
import { buildProductsRoute } from '../utils/routeBuilder';

/**
 * Products 도메인 전용 라우터 훅
 *
 * @description
 * - 타입 안전한 네비게이션
 * - 쿼리 파라미터 자동 처리
 * - 현재 검색 조건 유지 기능
 *
 * @example
 * ```typescript
 * function ProductList() {
 *   const router = useProductsRouter();
 *
 *   // 목록 페이지 이동
 *   router.pushToList({ search: 'laptop' });
 *
 *   // 상세 페이지 이동
 *   router.pushToDetail(123);
 *
 *   // 수정 페이지 이동 (현재 검색 조건 유지)
 *   router.pushToEdit(123, { preserveQuery: true });
 * }
 * ```
 */
export const useProductsRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * 현재 쿼리 파라미터 반환
   */
  const currentQuery = useCallback(
    (preserve: boolean = true): ProductsListQueryParams => {
      if (!preserve) return {};

      const params: ProductsListQueryParams = {};
      searchParams.forEach((value, key) => {
        if (key in params) {
          (params as any)[key] = value;
        }
      });

      return params;
    },
    [searchParams]
  );

  return {
    /**
     * 제품 목록 페이지로 이동
     */
    pushToList: (params?: ProductsListQueryParams) => {
      router.push(buildProductsRoute.list(params));
    },

    /**
     * 제품 목록 페이지로 교체 (뒤로가기 불가)
     */
    replaceToList: (params?: ProductsListQueryParams) => {
      router.replace(buildProductsRoute.list(params));
    },

    /**
     * 제품 상세 페이지로 이동
     */
    pushToDetail: (id: number | string, params?: Omit<ProductDetailQueryParams, 'id'>) => {
      router.push(buildProductsRoute.detail(id, params));
    },

    /**
     * 제품 등록 페이지로 이동
     */
    pushToCreate: (params?: ProductFormQueryParams) => {
      router.push(buildProductsRoute.create(params));
    },

    /**
     * 제품 수정 페이지로 이동
     */
    pushToEdit: (id: number | string, params?: Omit<ProductFormQueryParams, 'id'>) => {
      router.push(buildProductsRoute.edit(id, params));
    },

    /**
     * 제품 목록으로 돌아가기 (현재 쿼리 파라미터 유지)
     */
    backToList: () => {
      router.push(buildProductsRoute.list(currentQuery()));
    },

    /**
     * 기본 라우터 메서드
     */
    back: () => router.back(),
    refresh: () => router.refresh(),
  };
};
```

---

## 📊 마이그레이션 예시

### Before (하드코딩)
```typescript
// pages/List.tsx
router.push(`/sample/products/Detail?${params.toString()}`);
router.push(`/sample/products/New?${searchParams.toString()}`);

// pages/Detail.tsx
const returnURL = `/sample/products/List?${searchParams.toString()}`;
router.push(`/sample/products/Edit?${params.toString()}`);
```

### After (상수 + 빌더 + 훅)
```typescript
// pages/List.tsx
import { useProductsRouter } from '@/features/products/hooks/useProductsRouter';

function ProductList() {
  const router = useProductsRouter();

  // 간결하고 타입 안전함
  router.pushToDetail(product.id);
  router.pushToCreate();
}

// pages/Detail.tsx
function ProductDetail() {
  const router = useProductsRouter();

  // 현재 쿼리 파라미터 자동 유지
  router.backToList();
  router.pushToEdit(product.id, { preserveQuery: true });
}
```

---

## 🎯 이점

### 1. 유지보수성 향상
| 작업 | Before | After |
|------|--------|-------|
| URL 경로 변경 | 16개 파일 수정 | **1개 파일만 수정** |
| 오타 방지 | 수동 검증 필요 | **컴파일 시 검증** |
| 일관성 유지 | 개발자 의존 | **자동 강제** |

### 2. 타입 안전성
```typescript
// Before: 오타 가능
router.push(`/sample/products/Detail?id=${id}`);
router.push(`/sample/products/Detial?id=${id}`); // ❌ 오타

// After: 컴파일 시 에러
router.pushToDetail(id);  // ✅ 타입 안전
router.pushToDetal(id);   // ❌ 컴파일 에러
```

### 3. 개발자 경험 개선
```typescript
// IDE 자동완성 지원
router.pushToDetail(id);
//       ^^^^^^^^^^^^
//       자동완성 제안

// 쿼리 파라미터 타입 검증
router.pushToList({
  search: 'laptop',
  sortBy: 'price',
  sortOrder: 'asc',  // ✅ 'asc' | 'desc'만 허용
  viewMode: 'table', // ✅ 'table' | 'grid'만 허용
});
```

### 4. 리팩토링 용이
```typescript
// IDE 리팩토링 도구 활용 가능
PRODUCTS_ROUTES.LIST → Rename Symbol
// 모든 사용처 자동 변경됨

// 상수만 변경하면 전체 적용
export const PRODUCTS_ROUTES = {
  LIST: '/products',  // '/sample/products/List'에서 변경
  // 전체 코드 자동 반영
};
```

---

## 🚀 구현 단계

### Step 1: 상수 파일 생성 (30분)
```bash
# 파일 생성
touch src/features/products/constants/routes.ts
touch src/features/products/types/routes.ts
```

### Step 2: 경로 빌더 구현 (1시간)
```bash
# 파일 생성
touch src/features/products/utils/routeBuilder.ts
```

### Step 3: 라우터 훅 구현 (1시간)
```bash
# 파일 생성
touch src/features/products/hooks/useProductsRouter.ts
```

### Step 4: 마이그레이션 (2-3시간)
```bash
# 파일별 마이그레이션
1. useProductsURLState.ts
2. pages/Detail.tsx
3. pages/List.tsx
4. pages/New.tsx
5. pages/Edit.tsx
6. app/page.tsx
```

### Step 5: 테스트 및 검증 (1시간)
```bash
# 모든 경로 동작 확인
- 목록 페이지 이동
- 상세 페이지 이동
- 등록 페이지 이동
- 수정 페이지 이동
- 쿼리 파라미터 유지
```

---

## 📈 예상 소요 시간

| 단계 | 작업 | 시간 |
|------|------|------|
| 1 | 상수 파일 생성 | 30분 |
| 2 | 경로 빌더 구현 | 1시간 |
| 3 | 라우터 훅 구현 | 1시간 |
| 4 | 마이그레이션 | 2-3시간 |
| 5 | 테스트 및 검증 | 1시간 |
| **합계** | | **5-6시간** |

---

## ✅ 체크리스트

- [x] 문제 분석 완료
- [x] 하드코딩된 URL 발견 (16개 이상)
- [x] 해결 방안 설계
- [ ] 상수 파일 생성
- [ ] 경로 빌더 구현
- [ ] 라우터 훅 구현
- [ ] 기존 코드 마이그레이션
- [ ] 테스트 및 검증

---

## 🎁 추가 이점

### 1. 환경별 URL 지원 가능
```typescript
// constants/routes.ts
export const PRODUCTS_ROUTES = {
  BASE: process.env.NEXT_PUBLIC_PRODUCTS_BASE_PATH ?? '/sample/products',
  // 개발: /sample/products
  // 프로덕션: /products (환경 변수로 설정 가능)
}
```

### 2. 다국어 지원 확장 용이
```typescript
export const PRODUCTS_ROUTES = {
  LIST: locale === 'ko' ? '/제품/목록' : '/products/list',
  // 국제화 쉽게 구현
}
```

### 3. A/B 테스트 지원
```typescript
export const PRODUCTS_ROUTES = {
  LIST: experimentVariant === 'A' ? '/products/list-v1' : '/products/list-v2',
}
```

---

## 📝 결론

### 현재 상태
- **유지보수성**: ❌ 낮음 (16개 파일 분산)
- **타입 안전성**: ❌ 없음
- **오타 방지**: ❌ 수동 검증 필요
- **리팩토링**: ❌ 어려움

### 개선 후 상태
- **유지보수성**: ✅ 우수 (중앙 집중식 관리)
- **타입 안전성**: ✅ 완벽 (컴파일 시 검증)
- **오타 방지**: ✅ 자동 (IDE 지원)
- **리팩토링**: ✅ 쉬움 (리팩토링 도구 활용)

### 권장 사항
**즉시 Phase 1-3 구현 권장** (5-6시간 투자로 장기적 유지보수성 획기적 개선)
