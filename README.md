# Next.js 프로젝트

확장 가능한 웹 애플리케이션 구축을 위한 React 19, TypeScript, Redux Toolkit 및 모범 사례를 보여주는 현대적인 Next.js 16 애플리케이션입니다.

## 기술 스택

### 핵심 프레임워크
- **Next.js 16.1.1** - App Router를 지원하는 React 프레임워크
- **React 19.0.0** - UI 라이브러리
- **TypeScript 5.7.3** - 타입 안정성과 개발자 경험

### 상태 관리
- **Redux Toolkit 2.5.0** - 상태 관리
- **React Redux 9.2.0** - Redux용 React 바인딩
- **Redux Persist 6.0.0** - 상태 지속성

### UI 및 스타일링
- **Tailwind CSS 3.4.19** - 유틸리티 퍼스트 CSS 프레임워크
- **Radix UI** - 접근 가능한 컴포넌트 프리미티브
- **Lucide React 0.562.0** - 아이콘 라이브러리
- **class-variance-authority** - 컴포넌트 변형 관리
- **tailwind-merge** - Tailwind 클래스 병합 유틸리티

### 데이터 그리드
- **AG Grid 34.3.1** - 엔터프라이즈 데이터 그리드 컴포넌트

### 개발 도구
- **Storybook 10.1.11** - 컴포넌트 개발 및 테스트
- **ESLint 9.18.0** - 코드 린팅
- **Prettier 3.4.2** - 코드 포맷팅
- **MSW 2.7.0** - 개발용 API 모킹

### 유효성 검사 및 유틸리티
- **Zod 4.3.5** - 스키마 유효성 검사
- **Axios 1.13.2** - HTTP 클라이언트
- **loglevel 1.9.2** - 로깅 유틸리티

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── sample/            # 샘플 애플리케이션 페이지
│   ├── login/            # 로그인 페이지
│   ├── providers.tsx      # 애플리케이션 전체 Provider
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx          # 홈 페이지
│   ├── globals.css        # 전역 스타일
│   ├── error.tsx         # 에러 처리
│   └── global-error.tsx  # 전역 에러 처리
├── features/              # 기능 기반 모듈
│   ├── auth/             # 인증 기능
│   ├── dashboard/        # 대시보드 기능
│   └── products/         # 상품 기능
├── shared/               # 공유 유틸리티 및 컴포넌트
│   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/          # 기본 UI 컴포넌트 (Button, Skeleton 등)
│   │   ├── auth/        # 인증 관련 컴포넌트
│   │   └── layout/      # 레이아웃 컴포넌트
│   ├── config/          # 공유 설정
│   ├── constants/       # 공유 상수
│   ├── lib/            # 공유 라이브러리
│   ├── styles/         # 공유 스타일
│   ├── types/          # 공유 TypeScript 타입
│   └── utils/          # 유틸리티 함수
├── store/               # Redux 스토어 설정
│   ├── hooks.ts        # Redux 훅
│   ├── index.ts        # 스토어 설정
│   ├── config.ts       # 스토어 설정
│   ├── setup.ts        # 스토어 설정
│   ├── api/            # API 슬라이스
│   ├── reducers/       # 리듀서
│   ├── registry/       # 스토어 레지스트리
│   ├── middleware/     # Redux 미들웨어
│   ├── storage.ts      # 스토리지 설정
│   └── transforms.ts   # 상태 변환
└── mocks/              # MSW API 모킹
    ├── handlers/       # 요청 핸들러
    ├── data/          # 모의 데이터
    ├── setup/         # MSW 설정
    ├── browser.ts     # 브라우저 MSW 설정
    └── server.ts      # 서버 MSW 설정
```

## 아키텍처 원칙

### 기능 기반 아키텍처 (Feature-Based Architecture)
코드베이스는 각 기능이 자체 포함된 기능 기반 아키텍처를 따릅니다:

- **Features** (`src/features/`) - 도메인별 기능 (인증, 대시보드, 상품)
- **Shared** (`src/shared/`) - 재사용 가능한 컴포넌트, 유틸리티, 타입
- **Import 제한** - 기능 간 직접 import 불가 (ESLint로 강제)

### 상태 관리 전략
- **Redux Toolkit** - 전역 상태 관리
- **Redux Persist** - 세션 간 상태 지속
- **성능 모니터링** - 디버깅용 미들웨어
- **기능 기반 슬라이스** - 더 나은 구성

### 컴포넌트 설계
- **Shadcn/UI 영감** - Radix UI 프리미티브 기반 컴포넌트
- **복합 컴포넌트 패턴** - 복잡한 UI용
- **타입 안전한 props** - TypeScript로 구현
- **접근성** 고려사항 - jsx-a11y

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

### Next.js 설정
- **React Strict Mode** 활성화
- **Console 제거** - 프로덕션 환경
- **이미지 최적화** - AVIF/WebP 지원
- **패키지 import 최적화** - Redux, Lucide
- **CSS 최적화** 활성화

### ESLint 규칙
- Prettier 통합
- React 및 React Hooks 규칙
- TypeScript 엄격한 검사
- Import 순서 및 경로 제한
- 접근성 (jsx-a11y) 규칙
- 기능 import 제한 (기능 간 직접 import 불가)

## 개발 워크플로우

### 새로운 기능 추가

1. `src/features/feature-name` 아래에 기능 디렉토리 생성
2. 하위 디렉토리로 구성:
   - `components/` - 기능별 컴포넌트
   - `hooks/` - 커스텀 훅
   - `store/` - Redux 슬라이스 및 선택자
   - `types/` - TypeScript 타입
   - `utils/` - 유틸리티 함수

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

## 주요 기능

### 구현된 기능
- **로그인 시스템** - 인증 UI 및 상태 관리
- **샘플 애플리케이션** - AG Grid 기반 데이터 그리드
- **에러 처리** - 페이지 및 전역 에러 핸들링
- **로딩 상태** - UX 개선을 위한 로딩 UI

### UI 컴포넌트
- **Button** - CVA 기반 변형 관리
- **Skeleton** - 로딩 스켈레톤 UI
- **EmptyState** - 빈 상태 표시 컴포넌트
- **AuthGuard** - 인증 가드 컴포넌트
- **Navigation** - 네비게이션 컴포넌트

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
- API 상태 관리 (api/ 슬라이스)
- 성능 모니터링 미들웨어
- 타입 안전한 선택자 및 훅

## 학습 리소스

이 프로젝트는 다음을 보여줍니다:
- **Next.js 16** App Router 패턴
- **React 19** 최신 기능 및 모범 사례
- **TypeScript** 엄격 모드 설정
- **Redux Toolkit** 현대적 상태 관리
- **MSW** API 모킹 및 테스트
- **Storybook** 컴포넌트 주도 개발

## 라이선스

이 프로젝트는 교육 목적으로 만들어졌습니다.