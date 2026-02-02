# Next.js Micro Frontend 리서치 종합 분석

## 개요

Next.js에 Micro Frontend 아키텍처를 도입하기 위해 리서치한 4가지 방안을 비교 분석한 문서입니다.

---

## 1️⃣ Route-based Monorepo

### 개요
라우팅 경로를 기반으로 코드를 조직화하는 Monorepo 아키텍처 패턴. 특히 Next.js App Router와 결합하여 폴더 구조가 URL 경로와 직접 매핑되는 방식

### ✅ 장점
- **코드 공유**: UI 컴포넌트, 유틸리티, 타입을 패키지로 쉽게 재사용
- **일관된 배포**: 변경 사항을 원자적으로 통합 배포 가능
- **단일 개발 환경**: 하나의 IDE 설정으로 전체 프로젝트 관리
- **타입 안정성**: TypeScript 타입이 앱 간에 공유되어 안정성 보장
- **단순한 구조**: Multi-Zones보다 설정이 간단

### ⚠️ 단점
- **초기 설정 복잡성**: Monorepo 도구(Turborepo, pnpm) 설정 필요
- **빌드 시간**: 전체 빌드 시간이 길어질 수 있음 (캐싱으로 완화)
- **학습 곡선**: 팀원들이 Workspace 개념을 학습해야 함
- **독립 배포 불가**: 각 앱을 완전히 독립적으로 배포하기 어려움

### 📋 적용 시나리오
```
monorepo/
├── apps/
│   ├── web/              # 메인 웹 앱
│   ├── admin/            # 관리자 앱
│   └── docs/             # 문서 사이트
├── packages/
│   ├── ui/               # 공유 UI 컴포넌트 (Button, Card...)
│   ├── auth/             # 인증 로직
│   ├── config/           # 공유 설정 (ESLint, TypeScript...)
│   └── types/            # 공유 타입 정의
└── package.json          # 루트 workspace 설정

# Turborepo + pnpm workspaces
```

**Route Groups 활용**:
```
apps/web/app/
├── (marketing)/          # URL에 영향 없는 그룹
│   ├── about/
│   └── contact/
├── dashboard/            # /dashboard/*
│   └── [id]/            # 동적 라우트
└── api/                  # /api/* (Route Handlers)
```

### 🔄 Multi-Zones와의 차이

| 측면 | Route-based Monorepo | Multi-Zones |
|------|---------------------|-------------|
| **목적** | 코드 공유 & 재사용 | 런타임 트래픽/권한 분리 |
| **앱 수** | 단일 앱 또는 Monorepo 내 여러 앱 | 여러 독립 Next.js 인스턴스 |
| **배포** | 통합 배포 | 각 Zone 독립 배포 |
| **URL 구조** | 라우팅 경로 기반 | 단일 도메인, 다중 앱 |
| **설정 복잡도** | 중간 | 높음 (rewrite rules 필요) |
| **상태 공유** | 패키지로 쉬운 공유 | Zone 간 까다로움 |
| **적합 팀 규모** | 소~중규모 | 대규모 (여러 팀) |

### 🎯 추천 대상
- 여러 프론트엔드 앱이 공유 컴포넌트를 사용할 때
- 마이크로프론트엔드를 고려하나 초기엔 통합된 상태로 시작하고 싶을 때
- 공통 인증/UI 시스템을 여러 앱에서 재사용해야 할 때
- 단일 팀이나 소규모 팀이 일관된 배포를 원할 때

### 💡 결합 가능성
**가장 강력한 패턴**: Route-based Monorepo + Multi-Zones 결합
```
monorepo/
├── apps/
│   ├── main-zone/      (Next.js Zone A)
│   │   └── app/        (/blog, /about)
│   ├── shop-zone/      (Next.js Zone B)
│   │   └── app/        (/shop, /products)
│   └── admin-zone/     (Next.js Zone C)
│       └── app/        (/admin)
└── packages/
    ├── ui/             # 모든 Zone이 공유
    ├── auth/           # 모든 Zone이 공유
    └── types/          # 모든 Zone이 공유
```
→ Multi-Zones의 런타임 분리 이점 + Monorepo의 코드 공유 이점

---

## 2️⃣ Next.js Multi-Zones + Monorepo

### 개요
Next.js의 여러 독립적인 애플리케이션을 단일 도메인에서 실행하는 아키텍처

### ✅ 장점
- **공식 지원**: Next.js 네이티브 기능, 안정적
- **단일 도메인**: SEO 친화적, 공통 세션 공유 가능
- **독립적 배포**: 각 zone이 독립적으로 배포 가능
- **기술적 유연성**: 서로 다른 Next.js 버전 사용 가능
- **Monorepo 시너지**: Turborepo, Lerna와 결합하여 코드 공유

### ⚠️ 단점
- **복잡한 설정**: rewrite rules, path aliasing 필요
- **공유 상태 관리**: zone 간 상태 공유 까다로움
- **빌드 복잡도**: 각 zone을 별도로 빌드해야 함
- **CORS 문제**: API route 간 호출에 주의 필요

### 📋 적용 시나리오
```
domain.com
├── /app/* (Zone A: 메인 애플리케이션)
├── /dashboard/* (Zone B: 대시보드)
└── /admin/* (Zone C: 관리자)
```

### 🎯 추천 대상
- 대규모 조직에서 여러 팀이 각자의 앱을 개발할 때
- 배포 주기가 다른 앱들을 운영해야 할 때
- Zone마다 다른 기술 스택이 필요할 때

---

## 3️⃣ Next.js-MF (Deprecated)

### 개요
Module Federation을 사용한 Next.js 마이크로프론트엔드 구현 (현재 공식 지원 중단)

### ❌ 현재 상태
- **Deprecated**: 더 이상 유지보스되지 않음
- **대안**: Module Federation 2.0 또는 공식 Next.js 기능 권장

### 📊 과거 특징
- **런타임 통합**: Webpack Module Federation 사용
- **코드 공유**: 의존성 공유로 번들 크기 최적화
- **독립 배포**: 각 마이크로프론트를 독립적으로 배포

### ⚠️ 현재 권장사항
```bash
# ❌ 권장하지 않음
npm install @module-federation/nextjs-mf

# ✅ 대안
# 1) Next.js Multi-Zones 사용
# 2) Module Federation 2.0 (Webpack 5 +)
# 3) 단일 Next.js 앱 + Route Groups
```

---

## 4️⃣ Modern.js 도입

### 개요
ByteDance에서 개발한 마이크로프론트엔드 네이티브 프레임워크

### ✅ 장점
- **마이크로프론트엔드 네이티브**: 설계부터 MFP 지원
- **Garfish 통합**: 강력한 MFP 엔진 내장
- **타입스크립트 풀지원**: 완벽한 타입 안전성
- **성능 최적화**: 코드 스플리팅, 로딩 최적화
- **통합 도구**: 빌드, 배포, 모니터링 통합

### ⚠️ 단점
- **생태계 작음**: Next.js에 비해 커뮤니티 작음
- **학습 곡선**: 새로운 프레임워크 학습 필요
- **마이그레이션 비용**: 기존 Next.js 코드 이주 비용
- **중국 중심**: 문화적/언어적 장벽 있을 수 있음

### 🔧 핵심 기능
```typescript
// Modern.js 마이크로프론트엔드 설정
export default {
  // 통합 모드 (Single App)
  integrations: [
    {
      name: 'main-app',
      microFrontends: [
        {
          name: 'dashboard',
          entry: 'http://localhost:3001',
          // ... 설정
        }
      ]
    }
  ]
}
```

---

## 📊 비교 분석

| 항목 | Route-based Monorepo | Multi-Zones | Next.js-MF | Modern.js |
|------|---------------------|-------------|-------------|-----------|
| **안정성** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐☆ (Deprecated) | ⭐⭐⭐⭐ |
| **생태계** | Node.js/Turborepo 생태계 | Next.js 생태계 | 더 이상 지원 안됨 | 성장 중 |
| **학습 곡선** | 낮음~중간 | 낮음 (Next.js 기본) | 중간 | 높음 (새 프레임워크) |
| **마이그레이션** | 쉬움 | 쉬움 | 권장하지 않음 | 어려움 |
| **성능** | 우수 (캐싱으로 최적화) | 우수 | 우수 (과거) | 우수 |
| **운영 복잡도** | 중간 | 중간-높음 | 높음 | 중간-높음 |
| **코드 공유** | ⭐⭐⭐⭐⭐ (패키지로 완벽) | ⭐⭐⭐ (zone 간 제한적) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **독립 배포** | ⭐⭐ (통합 배포) | ⭐⭐⭐⭐⭐ (완전 독립) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🎯 추천사항

### 1단계: Next.js 유지 (Route-based Monorepo 또는 Multi-Zones)
```bash
✅ 추천 1: Route-based Monorepo (소~중규모 팀, 코드 공유 중시)
✅ 추천 2: Multi-Zones (대규모 팀, 독립 배포 중시)
```

**Route-based Monorepo 적용 방법:**
```
monorepo/
├── apps/
│   ├── web/ (Next.js 15 - 메인 앱)
│   ├── admin/ (Next.js 15 - 관리자)
│   └── docs/ (Next.js 15 - 문서)
├── packages/
│   ├── ui/          # 공유 Button, Card, Layout
│   ├── auth/        # 공유 인증 로직
│   ├── config/      # ESLint, TypeScript 공유 설정
│   ├── utils/       # 공유 유틸리티 함수
│   └── types/       # 공유 TypeScript 타입
└── package.json

# Turborepo + pnpm workspaces
```

**Multi-Zones 적용 방법:**
```
monorepo/
├── apps/
│   ├── main/ (Next.js 15)
│   ├── dashboard/ (Next.js 14)
│   └── admin/ (Next.js 15)
├── packages/
│   ├── ui/
│   ├── config/
│   └── utils/
└── package.json

# Turborepo + pnpm workspaces
# + rewrite rules 설정
```

### 2단계: 점진적 전환 (필요 시)
```yaml
Next.js Multi-Zones 시작
    ↓
안정화 후 검토
    ↓
Modern.js 이전 (필요시)
```

---

## 🔍 결론

**현재 상황에서의 최적 선택:**

1. **코드 공유/단순함**: Route-based Monorepo (Turborepo) ⭐ 기본 추천
2. **독립 배포/대규모 팀**: Multi-Zones + Monorepo (Turborepo)
3. **미래 지향성**: Modern.js (단, 마이그레이션 비용 감안)
4. **비추천**: Next.js-MF (Deprecated)

**결합 전략** (가장 강력):
```
Route-based Monorepo 구조 + 필요시 Multi-Zones 도입
→ 초기엔 단순한 Monorepo로 시작
→ 규모가 커지면 Zone으로 분리
→ 패키지는 계속 공유
```

**시작 제안:**

**Option 1: Route-based Monorepo (기본 추천)**
```bash
# 1. Turborepo 기반 Monorepo 생성
npx create-turbo@latest

# 2. 공유 패키지 구조 설정
mkdir -p packages/ui packages/auth packages/types

# 3. 앱 간 코드 공유 시작
# apps/web, apps/admin에서 packages/ui import

# 4. 필요시 Route Groups로 라우팅 구조화
```

**Option 2: Multi-Zones (대규모 팀)**
```bash
# 1. Turborepo 기반 Monorepo 생성
npx create-turbo@latest

# 2. 각 Zone을 독립 앱으로 구성
# apps/main-zone, apps/shop-zone, apps/admin-zone

# 3. rewrite rules로 경로 분리
# 4. 각 Zone 독립 배포 파이프라인 구성
```

---

## 📚 참고 자료

- [Next.js Multi-Zones 문서](https://nextjs.org/docs/pages/guides/multi-zones)
- [Turborepo 문서](https://turbo.build/repo/docs)
- [Module Federation 2.0](https://module-federation.io/)
- [Modern.js 문서](https://modernjs.dev/)
- [Monorepo 패턴](https://monorepo.tools/)

