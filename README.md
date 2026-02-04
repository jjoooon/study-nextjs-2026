# Next.js 프로젝트

확장 가능한 웹 애플리케이션 구축을 위한 React 19, TypeScript, Redux Toolkit 및 모범 사례를 보여주는 현대적인 Next.js 16 애플리케이션입니다.

## 기술 스택

### 핵심 프레임워크
- **Next.js 16.1.6** - App Router를 지원하는 React 프레임워크
- **React 19.2.4** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성과 개발자 경험

### 상태 관리
- **Redux Toolkit 2.11.2** - 상태 관리
- **React Redux 9.2.0** - Redux용 React 바인딩
- **Redux Persist 6.0.0** - 상태 지속성

### UI 및 스타일링
- **Tailwind CSS 4.1.18** - 유틸리티 퍼스트 CSS 프레임워크
- **Radix UI** - 접근 가능한 컴포넌트 프리미티브 (@radix-ui/react-slot, @radix-ui/react-dialog)
- **Lucide React 0.562.0** - 아이콘 라이브러리
- **class-variance-authority** - 컴포넌트 변형 관리
- **tailwind-merge** - Tailwind 클래스 병합 유틸리티

### 데이터 그리드
- **AG Grid 34.3.1** - 엔터프라이즈 데이터 그리드 컴포넌트

### 개발 도구
- **Storybook 10.2.3** - 컴포넌트 개발 및 테스트
- **ESLint 9.39.2** - 코드 린팅
- **Prettier 3.8.1** - 코드 포맷팅
- **MSW 2.12.7** - 개발용 API 모킹

### 유효성 검사 및 유틸리티
- **Zod 4.3.6** - 스키마 유효성 검사
- **Axios 1.13.2** - HTTP 클라이언트
- **loglevel 1.9.2** - 로깅 유틸리티

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── sample/            # 샘플 애플리케이션 페이지
│   │   ├── products/     # 상품 관리 (CRUD)
│   │   ├── dashboard/    # 대시보드
│   │   ├── xml/          # XML 처리 학습 예제
│   │   │   ├── case1/   # 기본 XML 파싱
│   │   │   ├── case2/   # XPath 쿼리
│   │   │   └── case3/   - 고급 XML 처리
│   │   ├── mdi/          # Multiple Data Interface 예제
│   │   └── mdi2/         # 고급 MDI 예제
│   ├── login/            # 로그인 페이지
│   ├── providers.tsx      # 애플리케이션 전체 Provider
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 홈 페이지
│   ├── loading.tsx        # 로딩 상태
│   ├── error.tsx         # 에러 처리
│   └── global-error.tsx  # 전역 에러 처리
├── features/              # 기능 기반 모듈
│   ├── dashboard/        # 대시보드 기능
│   │   ├── components/   # 대시보드 컴포넌트
│   │   ├── hooks/        # 커스텀 훅
│   │   ├── services/     # API 서비스
│   │   ├── store/        # Redux 슬라이스
│   │   ├── types/        # TypeScript 타입
│   │   ├── utils/        # 유틸리티 함수
│   │   └── constants/    # 상수
│   └── products/         # 상품 기능
│       ├── components/   # 상품 컴포넌트
│       ├── sections/     # 페이지 섹션 (목록, 상세, 생성, 수정)
│       ├── hooks/        # 커스텀 훅
│       ├── services/     # API 서비스
│       ├── store/        # Redux 슬라이스
│       ├── types/        # TypeScript 타입
│       ├── utils/        # 유틸리티 함수
│       └── constants/    # 상수
├── middleware/            # Next.js 미들웨어
│   ├── handlers/         # 미들웨어 핸들러
│   │   ├── debugLogLevel.ts    # 디버그 로그 레벨 설정
│   │   └── blockSourceMaps.ts  # 소스맵 접근 차단
│   ├── chain.ts          # 미들웨어 체인 (Chain of Responsibility)
│   └── types.ts          # 미들웨어 타입 정의
├── shared/               # 공유 유틸리티 및 컴포넌트
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/          # 기본 UI 컴포넌트 (Button, Skeleton, EmptyState 등)
│   │   ├── AuthGuard.tsx   # 인증 가드
│   │   └── Navigation.tsx  # 네비게이션
│   ├── config/          # 공유 설정 (env.ts 등)
│   ├── constants/       # 공유 상수
│   ├── lib/            # 공유 라이브러리 (shadcn/utils)
│   ├── services/       # 공유 서비스
│   ├── store/          # 공유 Redux 슬라이스 (auth, popup)
│   ├── styles/         # 공유 스타일
│   ├── types/          # 공유 TypeScript 타입
│   └── utils/          # 유틸리티 함수 (logger, validation, ipUtils 등)
├── redux/               # Redux 스토어 설정
│   ├── middleware/     # Redux 미들웨어 (performance)
│   ├── reducers/       # 리듀서 훅
│   ├── registry/       # 스토어 레지스트리 (base, reducer, middleware)
│   ├── api/            # API 설정 및 레지스트리
│   ├── config.ts       # 스토어 설정
│   ├── hooks.ts        # 커스텀 Redux 훅
│   ├── index.ts        # 스토어 메인 설정
│   ├── setup.ts        # 스토어 설정
│   ├── storage.ts      # Redux Persist 스토리지 설정
│   └── transforms.ts   # 스테이트 변환 함수
└── mocks/              # MSW API 모킹
    ├── handlers/       # 요청 핸들러 (auth, products, dashboard, errors)
    ├── data/          # 모의 데이터 (products, dashboard)
    ├── setup/         # MSW 설정 (browser, server)
    └── server.ts      # MSW 서버 설정
```

## 아키텍처 원칙

### 기능 기반 아키텍처 (Feature-Based Architecture)
코드베이스는 각 기능이 자체 포함된 기능 기반 아키텍처를 따릅니다:

- **Features** (`src/features/`) - 도메인별 기능 (dashboard, products)
  - 각 기능은 독립적인 components, hooks, services, store, types, utils, constants를 가짐
- **Shared** (`src/shared/`) - 재사용 가능한 컴포넌트, 유틸리티, 타입
- **Import 제한** - 기능 간 직접 import 불가 (ESLint로 강제)

### 상태 관리 전략
- **Redux Toolkit** - 전역 상태 관리
- **Redux Persist** - 세션 간 상태 지속
- **기능 기반 슬라이스** - 각 feature/store에 독립적인 슬라이스
- **Selectors 패턴** - 타입 안전한 상태 선택자 (store/selectors.ts)

### 컴포넌트 설계
- **Radix UI 기반** - 접근 가능한 컴포넌트 프리미티브 사용
- **섹션 기반 구조** - 페이지별 섹션 컴포넌트 (ListSection, DetailSection, NewSection, EditSection)
- **타입 안전한 props** - TypeScript로 구현
- **접근성 고려** - jsx-a11y 규칙 준수

### 미들웨어 아키텍처
- **Chain of Responsibility 패턴** - 순차적 미들웨어 실행 (`middleware/chain.ts`)
- **조건부 실행** - 핸들러별 실행 조건 지원
- **핸들러 기반 모듈화** - 독립적인 미들웨어 핸들러 (`middleware/handlers/`)
  - **DebugLogLevel** - IP 기반 디버그 로그 레벨 동적 설정
  - **BlockSourceMaps** - 프로덕션 환경에서 소스맵 접근 차단
- **타입 안전성** - TypeScript 기반 미들웨어 핸들러 타입 (`middleware/types.ts`)

**미들웨어 사용법:**
```typescript
// src/middleware.ts (루트 미들웨어 파일)
import { composeMiddleware } from '@/middleware/chain';
import { debugLogLevelHandler } from '@/middleware/handlers/debugLogLevel';
import { blockSourceMapsHandler } from '@/middleware/handlers/blockSourceMaps';

const middlewareChain = composeMiddleware([
  { handler: debugLogLevelHandler, config: { name: 'DebugLogLevel' } },
  { handler: blockSourceMapsHandler, config: { name: 'BlockSourceMaps' } },
]);

export default middlewareChain;
```

## 시작하기

### 사전 요구사항
- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발

```bash
# Turbo 모드로 개발 서버 시작
npm run dev

# Storybook 시작
npm run storybook
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 번들 크기 분석
npm run analyze
```

### 코드 품질

```bash
# 코드 린트
npm run lint

# 린팅 issues 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 검사
npm run type-check
```

## 사용 가능한 스크립트

| 스크립트 | 설명 |
|--------|-------------|
| `npm run dev` | Turbo 모드로 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint 실행 |
| `npm run lint:fix` | ESLint issues 수정 |
| `npm run format` | Prettier로 코드 포맷팅 |
| `npm run type-check` | TypeScript 타입 검사 |
| `npm run analyze` | 빌드 및 번들 크기 분석 |
| `npm run storybook` | Storybook 개발 서버 시작 |
| `npm run build-storybook` | 프로덕션용 Storybook 빌드 |

## 설정

### 경로 별칭
```typescript
@/*          -> ./src/*
@/features/* -> ./src/features/*
@/shared/*   -> ./src/shared/*
```

### 환경 변수
환경별 설정을 위해 `.env.local` 파일을 생성하세요.

**예시:**
```bash
# .env.local

# 디버그 로그 설정 (선택사항)
DEBUG_IPS=127.0.0.1,192.168.1.100
DEBUG_LOG_LEVEL=debug

# 소스맵 접근 허용 IP (선택사항, 하드코딩되어 있음)
# 현재: 127.0.0.1, ::1 만 허용
```

**환경 변수 설명:**
- `DEBUG_IPS` - 디버그 로그 레벨을 설정할 수 있는 IP 목록 (쉼표로 구분)
- `DEBUG_LOG_LEVEL` - 지정된 IP에서 적용할 로그 레벨 (debug, info, warn, error)

### Next.js 설정
- **React Strict Mode** 활성화
- **Console 제거** - 프로덕션 환경
- **이미지 최적화** - AVIF/WebP 지원
- **패키지 import 최적화** - Redux, React Redux, Lucide
- **CSS 최적화** 활성화

### ESLint 규칙
- Prettier 통합
- React 및 React Hooks 규칙
- TypeScript 엄격한 검사
- Import 순서 및 경로 제한 (eslint-plugin-boundaries)
- 접근성 (jsx-a11y) 규칙
- 기능 import 제한 (기능 간 직접 import 불가)

## 개발 워크플로우

### 새로운 기능 추가

1. `src/features/feature-name` 아래에 기능 디렉토리 생성
2. 하위 디렉토리로 구성:
   - `components/` - 기능별 컴포넌트
   - `sections/` - 페이지 섹션 (필요시)
   - `hooks/` - 커스텀 훅
   - `services/` - API 서비스
   - `store/` - Redux 슬라이스 및 선택자
   - `types/` - TypeScript 타입
   - `utils/` - 유틸리티 함수
   - `constants/` - 상수

### 공유 컴포넌트 추가

1. `src/shared/components/`에 컴포넌트 생성
2. Storybook으로 컴포넌트 개발
3. 적절한 index 파일에서 export
4. props 및 사용법 문서화

### MSW로 API 통합

1. `src/mocks/handlers/`에 핸들러 생성
2. `src/mocks/data/`에 모의 데이터 추가
3. `src/mocks/handlers/index.ts`에 핸들러 등록
4. 브라우저 및 서버 환경용 MSW 설정

### 미들웨어 핸들러 추가

1. `src/middleware/handlers/`에 핸들러 파일 생성
2. `MiddlewareHandler` 타입 구현 (request, response 매개변수)
3. `src/middleware/chain.ts`의 `composeMiddleware`에 핸들러 등록
4. 필요한 경우 조건부 실행을 위해 `MiddlewareHandlerConfig` 설정

## 주요 기능

### 구현된 기능
- **로그인 시스템** - 인증 UI 및 상태 관리
- **상품 관리** - CRUD 기능 (목록, 상세, 생성, 수정)
- **대시보드** - 통계 및 최근 활동
- **Popup 시스템** - 전역 팝업 상태 관리
- **에러 처리** - 페이지 및 전역 에러 핸들링
- **로딩 상태** - UX 개선을 위한 로딩 UI
- **XML 처리 예제** - 다양한 XML 파싱 기법 학습 (case1, case2, case3)
- **MDI 예제** - Multiple Data Interface 패턴 구현

### UI 컴포넌트
- **Button** - CVA 기반 변형 관리
- **AuthGuard** - 인증 가드 컴포넌트
- **Navigation** - 네비게이션 컴포넌트
- **ProductGrid** - 상품 그리드 컴포넌트
- **DashboardStats** - 대시보드 통계 컴포넌트
- **RecentActivity** - 최근 활동 컴포넌트

### 성능 최적화
- Turbo 모드 개발 환경
- 번들 분석
- 패키지 import 최적화
- 이미지 최적화 (AVIF/WebP)
- CSS 최적화
- 프로덕션 환경 console 제거

### 개발자 경험
- 타입 안정성을 위한 TypeScript
- 코드 품질을 위한 ESLint + Prettier
- 컴포넌트 개발을 위한 Storybook
- API 모킹을 위한 MSW
- 깔끔한 import를 위한 경로 별칭
- 확장 가능한 기능 기반 아키텍처

### 상태 관리
- 전역 상태를 위한 Redux Toolkit
- 상태 지속성을 위한 Redux Persist
- 공유 슬라이스 (auth, popup)
- 기능별 슬라이스 (dashboard, products)
- 타입 안전한 선택자 및 훅

### 학습 예제
- **XML 처리** - `/sample/xml/*`
  - **case1**: 기본 XML 파싱 (xml2js)
  - **case2**: XPath 쿼리 활용 (xpath, defiant.js)
  - **case3**: 대용량 XML 처리 및 최적화
- **Multiple Data Interface (MDI)** - `/sample/mdi/*`
  - 탭 기반 다중 데이터 인터페이스 구현
  - 동적 컴포넌트 로딩
- **고급 MDI** - `/sample/mdi2/*`
  - 컴포넌트 기반 MDI 패턴
  - 탭 패널 및 페이지 렌더러

## 학습 리소스

이 프로젝트는 다음을 보여줍니다:
- **Next.js 16** App Router 패턴
- **React 19** 최신 기능 및 모범 사례
- **TypeScript** 엄격 모드 설정
- **Redux Toolkit** 현대적 상태 관리
- **MSW** API 모킹 및 테스트
- **Storybook** 컴포넌트 주도 개발
- **기능 기반 아키텍처** 확장 가능한 구조
- **Chain of Responsibility** 미들웨어 패턴
- **Next.js Middleware** 요청/응답 처리

## 라이선스

이 프로젝트는 교육 목적으로 만들어졌습니다.
