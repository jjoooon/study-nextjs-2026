# Types 디렉토리 구조 개선 가이드

**분석 대상**: 현재 types.ts 파일 구조 → types 디렉토리 구조로 개선
**작성 일시**: 2025-01-14
**목적**: 타입 정의의 확장성과 유지보수성 개선

---

## 📊 현재 상태 분석 (Current State Analysis)

### ❌ 현재 방식의 한계

#### 1. **Dashboard Feature: 타입이 분산되어 있음**

```typescript
// dashboardSlice.ts (3개 타입)
export interface Widget { ... }
export interface DashboardState { ... }

// apiSlice.ts (4개 타입)
export interface DashboardStats { ... }
export interface ActivityItem { ... }
export interface DashboardData { ... }
export interface Widget { ... } // 중복!
```

**문제점**:
- ❌ `Widget` 타입이 두 곳에 중복 정의
- ❌ UI 상태 타입과 API 타입이 혼재
- ❌ 타입을 찾으려면 여러 파일을 확인해야 함

#### 2. **Auth Feature: types.ts 파일이 존재**

```typescript
// auth/store/types.ts (8개 타입)
export interface LoginInput { ... }
export interface RegisterInput { ... }
export interface AuthResponse { ... }
export interface UserProfile { ... }
// ... 더 많은 타입
```

**장점**:
- ✅ 타입이 중앙 집중화

**단점**:
- ⚠️ 모든 타입이 한 파일에 있어서 파일이 커질 수 있음
- ⚠️ 관련성 없는 타입들이 섞여 있음 (Request/Response/UI)

#### 3. **Shared Types: 디렉토리는 비어 있음**

```bash
src/shared/types/
# (empty)
```

**문제점**:
- ❌ 공통 타입을 정의할 곳이 없음
- ❌ 각 feature에서 중복된 타입을 정의할 가능성

---

## ✅ 개선된 Types 디렉토리 구조 (Proposed Structure)

### 🎯 설계 원칙

1. **관심사 분리**: UI 타입 / API 타입 / 공통 타입 분리
2. **단일 책임**: 각 파일은 명확한 범위의 타입만 담당
3. **재사용성**: 공통 타입은 shared/types에서 관리
4. **확장성**: 새로운 타입 추가가 용이한 구조

---

## 📁 권장 구조 (Recommended Structure)

### 1. Dashboard Feature Types

```
src/features/dashboard/
└── types/
    ├── index.ts              # 통합 내보내기
    ├── ui.ts                 # UI 관련 타입
    ├── api.ts                # API 관련 타입
    ├── store.ts              # Store 상태 타입
    └── components.ts         # 컴포넌트 Props 타입
```

#### **ui.ts** - UI 관련 타입

```typescript
/**
 * Dashboard UI 관련 타입
 *
 * @description
 * 컴포넌트의 Props, UI 상태 등을 정의
 */

/**
 * 위젯 타입 정의
 */
export interface Widget {
  id: string;
  type: WidgetType;
  position: number;
  isVisible: boolean;
  title: string;
  config?: WidgetConfig;
}

/**
 * 위젯 종류
 */
export type WidgetType = 'stats' | 'chart' | 'activity' | 'custom';

/**
 * 위젯별 설정
 */
export interface WidgetConfig {
  /** 차트 타입 (line, bar, pie) */
  chartType?: 'line' | 'bar' | 'pie';
  /** 표시할 데이터 개수 */
  itemCount?: number;
  /** 새로고침 간격 (초) */
  refreshInterval?: number;
}

/**
 * 위젯 레이아웃 정보
 */
export interface WidgetLayout {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
```

#### **api.ts** - API 관련 타입

```typescript
/**
 * Dashboard API 관련 타입
 *
 * @description
 * API 요청/응답 타입을 정의
 */

/**
 * 대시보드 통계 데이터
 */
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  revenue: number;
  growthRate: number;
  period: {
    start: string;
    end: string;
  };
}

/**
 * 활동 항목
 */
export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  metadata?: Record<string, unknown>;
}

/**
 * 활동 유형
 */
export type ActivityType = 'user' | 'post' | 'comment' | 'login' | 'logout';

/**
 * 대시보드 전체 데이터
 */
export interface DashboardData {
  stats: DashboardStats;
  recentActivity: ActivityItem[];
  widgets: Widget[];
}

/**
 * 대시보드 데이터 요청 파라미터
 */
export interface DashboardQueryParams {
  /** 데이터 기간 (days, weeks, months) */
  period?: 'day' | 'week' | 'month' | 'year';
  /** 시작일 */
  startDate?: string;
  /** 종료일 */
  endDate?: string;
}
```

#### **store.ts** - Store 상태 타입

```typescript
/**
 * Dashboard Store 상태 타입
 *
 * @description
 * Redux Slice 상태 구조를 정의
 */

import type { Widget } from './ui';

/**
 * Dashboard UI 상태
 */
export interface DashboardState {
  widgets: Widget[];
  layout: {
    isDragging: boolean;
    selectedWidget: string | null;
  };
  filters: {
    dateRange: {
      start: Date;
      end: Date;
    };
  };
}

/**
 * Dashboard 액션 Payload 타입
 */
export interface ToggleWidgetPayload {
  widgetId: string;
  isVisible: boolean;
}

export interface ReorderWidgetsPayload {
  sourceIndex: number;
  destIndex: number;
}
```

#### **components.ts** - 컴포넌트 Props 타입

```typescript
/**
 * Dashboard 컴포넌트 Props 타입
 *
 * @description
 * 컴포넌트의 인터페이스를 정의
 */

import type { DashboardStats } from './api';
import type { Widget } from './ui';

/**
 * DashboardStats 컴포넌트 Props
 */
export interface DashboardStatsProps {
  stats: DashboardStats;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

/**
 * RecentActivity 컴포넌트 Props
 */
export interface RecentActivityProps {
  activities: ActivityItem[];
  loading?: boolean;
  maxItems?: number;
  onViewAll?: () => void;
}

/**
 * Widget 컴포넌트 Props
 */
export interface WidgetProps {
  widget: Widget;
  onToggle?: (widgetId: string) => void;
  onEdit?: (widgetId: string) => void;
  onDelete?: (widgetId: string) => void;
}
```

#### **index.ts** - 통합 내보내기

```typescript
/**
 * Dashboard Feature Types 통합 내보내기
 *
 * @description
 * 모든 타입을 한 곳에서 import 가능
 */

// UI 타입
export * from './ui';

// API 타입
export * from './api';

// Store 타입
export * from './store';

// 컴포넌트 Props 타입
export * from './components';
```

---

### 2. Shared Types 구조

```
src/shared/types/
├── index.ts              # 통합 내보내기
├── common.ts             # 일반 공통 타입
├── api.ts                # API 관련 공통 타입
├── models.ts             # 도메인 모델 공통 타입
└── utils.ts              # 유틸리티 타입
```

#### **common.ts** - 일반 공통 타입

```typescript
/**
 * 공통 타입 정의
 *
 * @description
 * 애플리케이션 전체에서 사용하는 기본 타입
 */

/**
 * 기본 엔티티 인터페이스
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * ID 타입
 */
export type ID = string;

/**
 * 선택적 ID 타입 (null 허용)
 */
export type NullableID = ID | null;

/**
 * 날짜 타입
 */
export type DateString = string;

/**
 * URL 타입
 */
export type URL = string;

/**
 * 이메일 타입
 */
export type Email = string;

/**
 * 전화번호 타입
 */
export type PhoneNumber = string;
```

#### **api.ts** - API 관련 공통 타입

```typescript
/**
 * API 공통 타입
 *
 * @description
 * 모든 API 요청/응답의 공통 구조를 정의
 */

import type { ID } from './common';

/**
 * API 응답 기본 구조 (성공)
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * API 응답 기본 구조 (실패)
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * API 응답 타입 (통합)
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * 페이지네이션 메타데이터
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 페이지네이션된 응답
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * 정렬 옵션
 */
export interface SortOption {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * 필터 옵션
 */
export interface FilterOption {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'like' | 'in';
  value: unknown;
}

/**
 * 쿼리 파라미터 기본 구조
 */
export interface QueryParams {
  page?: number;
  pageSize?: number;
  sort?: SortOption;
  filters?: FilterOption[];
}
```

#### **models.ts** - 도메인 모델 공통 타입

```typescript
/**
 * 도메인 모델 공통 타입
 *
 * @description
 * 여러 feature에서 공통으로 사용하는 도메인 모델
 */

import type { BaseEntity } from './common';

/**
 * 사용자 기본 정보
 */
export interface User extends BaseEntity {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: UserRole;
}

/**
 * 사용자 역할
 */
export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';

/**
 * 권한 집합
 */
export interface Permissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canShare: boolean;
}
```

#### **utils.ts** - 유틸리티 타입

```typescript
/**
 * 유틸리티 타입
 *
 * @description
 * 타입 조작 및 유틸리티 타입
 */

/**
 * Partial을 중첩 객체에도 적용
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

/**
 * Required를 중첩 객체에도 적용
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object
    ? DeepRequired<T[P]>
    : T[P];
};

/**
 * 특정 키를 선택하여 타입 생성
 */
export type PickByValue<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/**
 * Nullable 타입 생성
 */
export type Nullable<T> = T | null;

/**
 * Optional 타입 생성
 */
export type Optional<T> = T | undefined;
```

#### **index.ts** - 통합 내보내기

```typescript
/**
 * Shared Types 통합 내보내기
 *
 * @description
 * 애플리케이션 전체에서 사용하는 공통 타입
 */

// 일반 공통 타입
export * from './common';

// API 관련 공통 타입
export * from './api';

// 도메인 모델 공통 타입
export * from './models';

// 유틸리티 타입
export * from './utils';
```

---

## 🔄 마이그레이션 가이드 (Migration Guide)

### 단계 1: Shared Types 생성 (우선순위: 높음)

```bash
# 1. types 디렉토리에 파일 생성
mkdir -p src/shared/types

# 2. 파일 생성
touch src/shared/types/index.ts
touch src/shared/types/common.ts
touch src/shared/types/api.ts
touch src/shared/types/models.ts
touch src/shared/types/utils.ts
```

**예상 시간**: 1시간

### 단계 2: Dashboard Feature Types 재구성 (우선순위: 높음)

```bash
# 1. types 디렉토리 생성
mkdir -p src/features/dashboard/types

# 2. 파일 생성
touch src/features/dashboard/types/index.ts
touch src/features/dashboard/types/ui.ts
touch src/features/dashboard/types/api.ts
touch src/features/dashboard/types/store.ts
touch src/features/dashboard/types/components.ts
```

**마이그레이션 단계**:

1. **기존 타입 이동**
   ```typescript
   // dashboardSlice.ts에서 → ui.ts로 이동
   export interface Widget { ... }
   export interface DashboardState { ... }

   // apiSlice.ts에서 → api.ts로 이동
   export interface DashboardStats { ... }
   export interface ActivityItem { ... }
   ```

2. **import 경로 변경**
   ```typescript
   // 변경 전
   import { Widget } from '@/features/dashboard/store/dashboardSlice';
   import { DashboardStats } from '@/features/dashboard/store/apiSlice';

   // 변경 후
   import { Widget } from '@/features/dashboard/types';
   import { DashboardStats } from '@/features/dashboard/types';
   ```

**예상 시간**: 2시간

### 단계 3: Auth Feature Types 개선 (우선순위: 중간)

```bash
# 이미 types.ts가 있으므로 분리 작업만 진행
mkdir -p src/features/auth/types

# 파일 생성
touch src/features/auth/types/index.ts
touch src/features/auth/types/ui.ts
touch src/features/auth/types/api.ts
touch src/features/auth/types/store.ts
```

**분리 작업**:

```typescript
// 기존: auth/store/types.ts (혼재)
export interface LoginInput { ... }        // API
export interface AuthResponse { ... }      // API
export interface AuthState { ... }         // Store

// 개선 후:
// api.ts
export interface LoginInput { ... }
export interface AuthResponse { ... }

// store.ts
export interface AuthState { ... }
```

**예상 시간**: 1.5시간

### 단계 4: 다른 Features 적용 (우선순위: 낮음)

```bash
# Posts, Users features에도 동일하게 적용
mkdir -p src/features/posts/types
mkdir -p src/features/users/types
```

**예상 시간**: 2시간

---

## 📋 타입 분류 기준 (Type Classification Guidelines)

### 1. UI 타입 (ui.ts)

**대상**:
- ✅ 컴포넌트 Props
- ✅ UI 상태 (loading, error, modal 등)
- ✅ 사용자 인터랙션 관련 타입
- ✅ 시각적 요소 (theme, color, layout)

**예시**:
```typescript
interface ButtonProps { ... }
interface ModalState { ... }
type Theme = 'light' | 'dark';
```

### 2. API 타입 (api.ts)

**대상**:
- ✅ API Request Payload
- ✅ API Response Data
- ✅ Query Parameters
- ✅ API Error 타입

**예시**:
```typescript
interface LoginInput { email, password }
interface UserResponse { id, name, email }
interface QueryParams { page, limit }
```

### 3. Store 타입 (store.ts)

**대상**:
- ✅ Redux State 구조
- ✅ Action Payload 타입
- ✅ Reducer 관련 타입

**예시**:
```typescript
interface AuthState { isAuthenticated, user }
interface LoginPayload { email, password }
```

### 4. Components 타입 (components.ts)

**대상**:
- ✅ 컴포넌트 Props 인터페이스
- ✅ 컴포넌트 Ref 타입
- ✅ 컴포넌트 이벤트 핸들러 타입

**예시**:
```typescript
interface DashboardStatsProps { stats, onRefresh }
interface ButtonRef { focus: () => void }
```

---

## 🎯 네이밍 규칙 (Naming Conventions)

### 파일 네이밍

| 범주 | 파일명 | 설명 |
|------|---------|------|
| UI 타입 | `ui.ts` | UI 관련 모든 타입 |
| API 타입 | `api.ts` | API 요청/응답 타입 |
| Store 타입 | `store.ts` | Redux 상태 타입 |
| Components 타입 | `components.ts` | 컴포넌트 Props |

### 타입 네이밍

#### Interface 네이밍
```typescript
// ✅ 좋은 예
interface UserProfile { ... }
interface DashboardStats { ... }
interface ApiResponse<T> { ... }

// ❌ 나쁜 예
interface IUserProfile { ... }  // I 접두사 불필요
interface dashboardStats { ... } // PascalCase 사용
```

#### Type Alias 네이밍
```typescript
// ✅ 좋은 예
type WidgetType = 'stats' | 'chart';
type UserRole = 'admin' | 'user';

// ❌ 나쁜 예
type widgetType = ... // PascalCase 사용
type Widget_Type = ... // 밑줄 불필요
```

#### Generic 타입 네이밍
```typescript
// ✅ 좋은 예
interface ApiResponse<T> { ... }
type PaginatedItems<T> = ...

// ❌ 나쁜 예
interface ApiResponse<t> { ... } // 대문자 사용
interface ApiResponse<TData> { ... } // 간결한 T 권장
```

---

## ✅ Benefits (장점)

### 1. **가독성 향상**
- ✅ 타입이 논리적으로 분류됨
- ✅ 필요한 타입을 빠르게 찾을 수 있음

### 2. **확장성**
- ✅ 새로운 타입 추가 시 어떤 파일에 추가할지 명확
- ✅ 파일이 너무 커지는 문제 방지

### 3. **재사용성**
- ✅ Shared types로 중복 제거
- ✅ Feature 간 타입 공유 용이

### 4. **유지보수성**
- ✅ 관련 타입이 함께 모여 있어 수정 용이
- ✅ 순환 의존성 방지

---

## 📊 Before vs After 비교

### Before (현재)
```typescript
// dashboardSlice.ts
export interface Widget { ... }
export interface DashboardState { ... }

// apiSlice.ts
export interface DashboardStats { ... }
export interface ActivityItem { ... }
export interface Widget { ... } // 중복!
```

**문제점**:
- ❌ Widget 타입 중복
- ❌ 타입이 여러 파일에 분산
- ❌ 찾기 어려움

### After (개선 후)
```typescript
// types/ui.ts
export interface Widget { ... }

// types/api.ts
export interface DashboardStats { ... }
export interface ActivityItem { ... }

// 사용처
import { Widget, DashboardStats } from '@/features/dashboard/types';
```

**장점**:
- ✅ 중복 제거
- ✅ 한 곳에서 import
- ✅ 명확한 분류

---

## 🚀 다음 단계 (Next Steps)

### 1. 즉시 실행 (이번 주)
- [ ] Shared types 구조 생성
- [ ] Dashboard feature types 재구성
- [ ] Auth feature types 개선

### 2. 단계적 적용 (다음 주)
- [ ] Posts, Users features 적용
- [ ] UI feature types 분리
- [ ] 공통 타입 표준화

### 3. 문서화 (2주 내)
- [ ] 타입 정의 가이드라인 작성
- [ ] 사용 예시 추가
- [ ] 팀 교육

---

## 📚 참고 자료

### TypeScript Best Practices
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### 프로젝트 관련
- `docs/architecture/types-organization.md`
- `docs/guides/feature-structure.md`

---

**문서 작성일**: 2025-01-14
**작성자**: Claude Code AI Assistant
**버전**: 1.0
