# Shared Element Extraction Analysis

## 📊 분석 개요

**분석 대상**: `src/features/products` feature의 공통 요소
**목표**: Feature 간 중복 패턴 식별 및 `@src/shared`로의 추천 이동

**분석 날짜**: 2026-01-15
**분석 범위**: Products, Dashboard, Auth features

---

## 🎯 발견된 공통 패턴

### 1. URL 파라미터 관리 패턴 ⭐⭐⭐ (우선순위: 높음)

**현재 위치**: `src/features/products/utils/urlParams.ts`

**공통 요소**:
```typescript
// URL 파라미터 키 상수
export const URL_PARAMS = {
  SEARCH: 'search',
  STATUS: 'status',
  CATEGORY: 'category',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
  DATE_START: 'dateStart',
  DATE_END: 'dateEnd',
} as const;

// 파싱/빌드 함수
parseFiltersFromURL(searchParams: URLSearchParams)
parseSortFromURL(searchParams: URLSearchParams)
buildQueryString(filters, sort)
```

**중복 가능성**: 🔴 **높음**
- Dashboard, Auth, Products 모두 URL 상태 관리 필요
- 필터/정렬 패턴이 거의 동일함
- 날짜 범위, 검색어, 페이지네이션 파라미터 공통

**추천 이동**:
```
src/shared/utils/url/urlParams.ts
src/shared/types/url.ts
```

**구현 제안**:
```typescript
// src/shared/utils/url/urlParams.ts
export interface URLParamKeys {
  SEARCH: 'search';
  PAGE: 'page';
  PAGE_SIZE: 'pageSize';
  SORT_BY: 'sortBy';
  SORT_ORDER: 'sortOrder';
  // ... 공통 파라미터
}

export function parseURLParams<T>(
  searchParams: URLSearchParams,
  paramConfig: Record<keyof T, string>
): T

export function buildQueryString<T>(
  params: Partial<T>,
  paramConfig: Record<keyof T, string>
): string
```

---

### 2. 날짜 직렬화 유틸리티 ⭐⭐⭐ (우선순위: 높음)

**현재 위치**: `src/features/dashboard/utils/dateUtils.ts`

**공통 요소**:
```typescript
// Date ↔ ISO 문자열 변환
dateToISOString(date: Date): string
isoStringToDate(isoString: string): Date
getCurrentDateISOString(): string

// DateRange 타입 및 변환
interface DateRange { start: string; end: string; }
interface DateRangeObject { start: Date; end: Date; }

// 날짜 범위 프리셋
todayRange(), thisWeekRange(), thisMonthRange()
last7DaysRange(), last30DaysRange()
```

**중복 가능성**: 🔴 **높음**
- Redux에 Date 저장 시 직렬화 필수
- 모든 feature에서 날짜 범위 필터 사용
- 이미 Dashboard에 구현됨

**추천 이동**:
```
src/shared/utils/date/dateSerialization.ts
src/shared/utils/date/dateRange.ts
src/shared/types/date.ts
```

**구현 제안**:
```typescript
// src/shared/utils/date/dateSerialization.ts
export const dateToISOString = (date: Date): string => { /* ... */ }
export const isoStringToDate = (isoString: string): Date => { /* ... */ }

// src/shared/utils/date/dateRange.ts
export const todayRange = (): DateRange => { /* ... */ }
export const last30DaysRange = (): DateRange => { /* ... */ }
```

---

### 3. Zod 검증 패턴 ⭐⭐ (우선순위: 중간)

**현재 위치**: `src/features/products/utils/validation.ts`

**공통 요소**:
```typescript
// Zod 스키마 패턴
z.enum([...], { error: 'message' })
z.object({
  name: z.string().min(1).max(100).trim(),
  // ...
}).refine((data) => Object.keys(data).length > 0)

// 에러 변환
zodToFieldErrors(error: unknown): FieldErrors
```

**중복 가능성**: 🟡 **중간**
- 모든 feature에 CRUD 폼 필요
- 공통 검증 패턴: string, number, enum
- Zod 에러 → UI 에러 변환 재사용

**추천 이동**:
```
src/shared/utils/validation/zodHelpers.ts
src/shared/utils/validation/commonSchemas.ts
```

**구현 제안**:
```typescript
// src/shared/utils/validation/commonSchemas.ts
export const baseFieldSchemas = {
  requiredString: (fieldName: string, min: number, max: number) =>
    z.string()
      .min(min, { message: `${fieldName}은 ${min}자 이상이어야 합니다.` })
      .max(max, { message: `${fieldName}은 ${max}자 이하여야 합니다.` })
      .trim(),

  positiveNumber: (fieldName: string) =>
    z.number()
      .min(0, { message: `${fieldName}은 0보다 커야 합니다.` }),

  statusEnum: <T extends readonly [string, ...string[]]>(
    statuses: T,
    typeName: string
  ) => z.enum(statuses, { message: `유효하지 않은 ${typeName}입니다.` }),
};

// src/shared/utils/validation/zodHelpers.ts
export function zodToFieldErrors(error: unknown): FieldErrors { /* ... */ }
export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown) { /* ... */ }
```

---

### 4. 로딩 스켈레톤 UI 패턴 ⭐⭐ (우선순위: 중간)

**현재 위치**: `src/features/products/components/ProductList.tsx`

**공통 요소**:
```typescript
if (isLoading) {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}
```

**중복 가능성**: 🟡 **중간**
- 모든 리스트 컴포넌트에서 로딩 상태 필요
- 스켈레톤 UI 패턴이 반복됨
- Tailwind animate-pulse 클래스 공통

**추천 이동**:
```
src/shared/components/ui/Skeleton.tsx
src/shared/components/ui/LoadingState.tsx
```

**구현 제안**:
```typescript
// src/shared/components/ui/Skeleton.tsx
interface SkeletonProps {
  count?: number;
  className?: string;
  height?: string;
}

export function Skeleton({
  count = 5,
  className = 'h-24',
  height = 'h-24'
}: SkeletonProps) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`${className} ${height} bg-gray-200 rounded-lg animate-pulse`} />
      ))}
    </div>
  );
}

// src/shared/components/ui/LoadingState.tsx
export function LoadingList() {
  return <Skeleton count={5} height="h-24" />;
}

export function LoadingCard() {
  return <Skeleton count={1} height="h-64" />;
}
```

---

### 5. 빈 상태 메시지 패턴 ⭐⭐ (우선순위: 낮음)

**현재 위치**: 여러 컴포넌트

**공통 요소**:
```typescript
if (products.length === 0) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500">제품이 없습니다.</p>
    </div>
  );
}
```

**중복 가능성**: 🟡 **중간**
- 모든 리스트 컴포넌트에서 빈 상태 처리
- 메시지, 아이콘, 액션 버튼 패턴 공통

**추천 이동**:
```
src/shared/components/ui/EmptyState.tsx
```

**구현 제안**:
```typescript
// src/shared/components/ui/EmptyState.tsx
interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ message, icon, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && <div className="mb-4">{icon}</div>}
      <p className="text-gray-500">{message}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
```

---

### 6. 페이지네이션 타입 패턴 ⭐⭐ (우선순위: 중간)

**현재 위치**: `src/features/products/types/api.ts`

**공통 요소**:
```typescript
export interface ProductListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProductsListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}
```

**중복 가능성**: 🟡 **중간**
- 모든 리스트 API에 페이지네이션 필요
- 요청/응답 타입 구조가 유사함

**추천 이동**:
```
src/shared/types/api.ts
src/shared/types/pagination.ts
```

**구현 제안**:
```typescript
// src/shared/types/pagination.ts
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  search?: string;
}

export interface ListParams extends PaginationParams, SortParams, SearchParams {}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number;
}
```

---

### 7. 상태 배지 컴포넌트 패턴 ⭐ (우선순위: 낮음)

**현재 위치**: `src/features/products/components/ProductList.tsx`

**공통 요소**:
```typescript
<span className={`px-3 py-1 rounded-full text-sm font-medium ${
  product.status === 'active'
    ? 'bg-green-100 text-green-800'
    : product.status === 'inactive'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-gray-100 text-gray-800'
}`}>
  {product.status}
</span>
```

**중복 가능성**: 🟢 **낮음**
- 상태별 색상 매핑이 다를 수 있음
- 그러나 컴포넌트 구조는 동일

**추천 이동**:
```
src/shared/components/ui/StatusBadge.tsx
```

**구현 제안**:
```typescript
// src/shared/components/ui/StatusBadge.tsx
type StatusColor = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: string;
  color?: StatusColor;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses: Record<StatusColor, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  neutral: 'bg-gray-100 text-gray-800',
};

export function StatusBadge({ status, color = 'neutral', size = 'sm' }: StatusBadgeProps) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <span className={`rounded-full font-medium ${sizeClasses[size]} ${colorClasses[color]}`}>
      {status}
    </span>
  );
}
```

---

### 8. RTK Query API Slice 설정 패턴 ⭐⭐ (우선순위: 중간)

**현재 위치**: `src/features/*/store/apiSlice.ts`

**공통 요소**:
```typescript
export const xxxApiSlice = createApi({
  reducerPath: 'xxxApi',
  baseQuery: axiosBaseQuery(),

  tagTypes: ['XXX-LIST', 'XXX-ITEM'] as const,

  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({ /* ... */ }),
});
```

**중복 가능성**: 🟡 **중간**
- 모든 API Slice에 동일한 설정
- 캐시 설정이 반복됨
- 태그 네이밍 패턴 공통

**추천 이동**:
```
src/shared/lib/rtk-query/apiSliceConfig.ts
src/shared/lib/rtk-query/tagTypes.ts
```

**구현 제안**:
```typescript
// src/shared/lib/rtk-query/apiSliceConfig.ts
export interface ApiSliceConfig {
  reducerPath: string;
  tagTypes: readonly string[];
  keepUnusedDataFor?: number;
  refetchOnMountOrArgChange?: number | boolean;
}

export const createApiSlice = <T extends ApiSliceConfig>(config: T) => {
  return createApi({
    ...config,
    baseQuery: axiosBaseQuery(),
    keepUnusedDataFor: config.keepUnusedDataFor ?? 300,
    refetchOnMountOrArgChange: config.refetchOnMountOrArgChange ?? 30,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
};

// src/shared/lib/rtk-query/tagTypes.ts
export const createTagTypes = (domain: string) => ({
  LIST: `${domain.toUpperCase()}-LIST`,
  ITEM: `${domain.toUpperCase()}-ITEM`,
}) as const;
```

---

## 📋 추천 추출 우선순위

### 🔴 Phase 1: 즉시 추천 (높은 중복, 높은 가치)

1. **날짜 직렬화 유틸리티** (`dateSerialization`, `dateRange`)
   - 이미 Dashboard에 구현됨
   - 모든 feature에서 사용
   - Redux 직렬화 문제 해결

2. **URL 파라미터 관리**
   - Products에 구현됨
   - Dashboard, Auth에서도 필요
   - URL 상태 관리 패턴 표준화

### 🟡 Phase 2: 단계적 추천 (중간 중복, 중간 가치)

3. **Zod 검증 헬퍼** (`zodHelpers`, `commonSchemas`)
   - 폼 검증 패턴 공통화
   - 에러 변환 로직 재사용

4. **페이지네이션 타입** (`ListParams`, `PaginatedResponse`)
   - API 타입 표준화
   - 일관된 페이지네이션 UI

5. **로딩/빈 상태 컴포넌트** (`Skeleton`, `EmptyState`)
   - UI 일관성 향상
   - 개발 시간 단축

### 🟢 Phase 3: 선택적 추천 (낮은 중복, 낮은 가치)

6. **상태 배지 컴포넌트** (`StatusBadge`)
   - UI 컴포넌트 라이브러리 확장
   - 필요시 도입

7. **RTK Query 설정 헬퍼**
   - Boilerplate 감소
   - API Slice 표준화

---

## 🎯 구현 계획

### Step 1: 기본 유틸리티 이동

```
src/shared/utils/date/
├── dateSerialization.ts    # Date ↔ ISO 변환
├── dateRange.ts            # 날짜 범위 프리셋
└── index.ts

src/shared/utils/url/
├── urlParams.ts            # URL 파라미터 파싱/빌드
├── queryString.ts          # 쿼리 문자열 빌더
└── index.ts
```

### Step 2: 공통 타입 정의

```
src/shared/types/
├── api.ts                  # API 공통 타입
├── pagination.ts           # 페이지네이션 타입
├── date.ts                 # 날짜 타입
├── url.ts                  # URL 상태 타입
└── index.ts
```

### Step 3: 검증 헬퍼

```
src/shared/utils/validation/
├── zodHelpers.ts           # Zod 에러 변환
├── commonSchemas.ts        # 공통 스키마
└── index.ts
```

### Step 4: UI 컴포넌트

```
src/shared/components/ui/
├── Skeleton.tsx            # 로딩 스켈레톤
├── EmptyState.tsx          # 빈 상태
├── StatusBadge.tsx         # 상태 배지
└── index.ts
```

### Step 5: RTK Query 헬퍼

```
src/shared/lib/rtk-query/
├── apiSliceConfig.ts       # API Slice 설정 헬퍼
├── tagTypes.ts             # 태그 타입 생성기
└── index.ts
```

---

## 🔄 기존 Feature에서의 사용 예시

### Before (현재):
```typescript
// src/features/products/utils/urlParams.ts
export const URL_PARAMS = { /* ... */ };
export function parseFiltersFromURL(searchParams: URLSearchParams) { /* ... */ }

// src/features/dashboard/utils/dateUtils.ts
export const dateToISOString = (date: Date): string => { /* ... */ }
```

### After (추천):
```typescript
// src/features/products/utils/urlParams.ts
import { parseURLParams, buildQueryString } from '@/shared/utils/url';
import type { ListParams } from '@/shared/types/pagination';

// Products 전용 파라미터 키 정의만
export const PRODUCTS_URL_PARAMS = {
  ...URL_PARAMS,
  STATUS: 'status',
  CATEGORY: 'category',
} as const;
```

---

## 📊 예상 이점

### 1. 코드 중복 감소
- **현재**: 3개 feature × 공통 코드 = 3배 중복
- **개선후**: 1개 shared 코드 + feature별 설정만

### 2. 일관성 향상
- 모든 feature에서 동일한 URL 상태 관리
- 일관된 페이지네이션 패턴
- 표준화된 에러 처리

### 3. 개발 속도 향상
- 새 feature 개발 시 공통 코드 작성 불필요
- 타입 안전성 보장
- 테스트된 코드 재사용

### 4. 유지보수 용이성
- 버그 수정은 한 곳에서만
- API 변경 시 shared 타입만 수정
- 문서화가集中化됨

---

## ⚠️ 주의사항

1. **과도한 추상화 피하기**
   - 실제로 사용되는 패턴만 추출
   - "미래에 필요할 수도"는 이유로 추출하지 않기

2. **Feature 특화 로직 유지**
   - Products 특정 로직은 유지
   - Shared는 순수 유틸리티/타입만

3. **점진적 이동**
   - 한 번에 모두 이동하지 않기
   - 새 feature 개발 시 이동 기회로 활용

4. **테스트 커버리지**
   - Shared 코드는 테스트 필수
   - 모든 feature에서 사용 전 테스트 완료

---

## 🚀 다음 단계

1. **Phase 1 구현**: 날짜/URL 유틸리티 이동
2. **Products 리팩토링**: Shared 사용으로 변경
3. **Dashboard/Auth 적용**: 공통 패턴 적용
4. **문서화**: Wiki에 사용 예시 추가
5. **새 Feature 개발**: Shared 패턴 적용 가이드

---

**분석 완료일**: 2026-01-15
**분석자**: Claude Code Analysis
**우선순위**: Phase 1 (높은 중복) → Phase 2 (중간 중복) → Phase 3 (낮은 중복)
