# shadcn/ui Components

이 디렉토리는 [shadcn/ui](https://ui.shadcn.com/) 컴포넌트들을 포함합니다.

## 🎯 용도

재사용 가능한 기본 UI 컴포넌트들이 위치합니다.
- 모든 Feature에서 공통으로 사용
- 비즈니스 로직이 없는 순수 UI 컴포넌트
- shadcn CLI를 통해 설치 및 관리

## 📦 컴포넌트 추가 방법

```bash
# shadcn CLI를 통해 컴포넌트 추가
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
```

## 📁 import 경로

```typescript
// ✅ 올바른 import
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

// ❌ 피해야 할 import (이제 사용하지 않음)
import { Button } from '@/components/ui/button';
```

## 🔧 관련 설정

- `components.json`: shadcn/ui 설정 파일
  - aliases.ui: `@/shared/components/ui`
  - aliases.components: `@/shared/components`

## 📂 전체 구조

```
src/
├── shared/
│   ├── components/
│   │   ├── ui/                    # ✅ 여기 (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   └── ContentLoader.tsx      # 다른 공통 컴포넌트
│   └── utils.ts
│
└── features/
    ├── auth/components/
    │   └── LoginForm.tsx           # Feature 전용 컴포넌트
    ├── users/components/
    │   └── UserList.tsx
    └── dashboard/components/
        └── DashboardStats.tsx
```

## 🎨 컴포넌트 분류 가이드

### 여기에 추가 (shadcn/ui)
- Button, Input, Select, Checkbox 등 기본 폼 요소
- Card, Dialog, Sheet 등 레이아웃 요소
- Table, Dropdown 등 데이터 표시 요소

### Feature components에 추가
- LoginForm, UserList 등 도메인 특화 컴포넌트
- 비즈니스 로직이 포함된 컴포넌트

### shared/components에 추가 (루트)
- ContentLoader, ErrorBoundary 등 앱 전체 공통 컴포넌트
- shadcn/ui가 아닌 재사용 컴포넌트
