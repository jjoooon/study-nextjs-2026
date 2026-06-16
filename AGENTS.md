# Project Rules & Guidelines (AGENTS.md)

이 파일은 이 프로젝트의 코드를 분석하고 개발하는 AI 에이전트(Antigravity 등)가 준수해야 할 개발 표준, 아키텍처 및 행동 규칙을 정의합니다.

## 0. 언어

모든 질문에 대한 대답은 한글로 한다.

## 1. 프로젝트 개요 (Project Overview)

- **프로젝트명**: Next.js 2026 학습 및 개발 프로젝트 (`frontend`)
- **구조 방식**: 기능 기반(Feature-based) 모듈 아키텍처 및 전역 상태 관리를 적극 활용하는 고성능 웹 애플리케이션

## 2. 기술 스택 (Technology Stack)

코드를 작성하거나 제안할 때 아래 버전 및 라이브러리 스펙을 반드시 준수하세요.

- **Core**: Next.js 16.x (App Router, Turbopack 사용 `next dev --turbo`), React 19.x
- **Language**: TypeScript (엄격한 타입 체크 활성화)
- **Styling**: Tailwind CSS v4.x (포스트CSS 설정 포함), Radix UI, Shadcn/ui (`components.json` 설정 준수), Lucide React
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`), React Redux, Redux Persist
- **Forms & Validation**: React Hook Form, Zod
- **API Client**: Axios
- **Mocking & Testing**: MSW (Mock Service Worker v2), Playwright
- **Documentation**: Storybook v10
- **Lint & Format**: ESLint v9 (custom plugins: `boundaries`, `check-file`), Prettier

## 3. 디렉터리 구조 가이드 (Directory Structure)

모든 파일 생성 및 배치는 아래의 아키텍처 구조를 따릅니다.

- `src/app/`: Next.js App Router 기반의 페이지 및 라우팅 레이아웃 정의
- `src/features/`: 도메인/기능 단위 모듈. 각 피처 폴더 내부에 전용 컴포넌트, 훅, 슬라이스, API 호출 로직 등을 독립적으로 캡슐화합니다.
- `src/shared/`: 여러 기능에서 공통으로 재사용되는 컴포넌트(UI), 유틸리티 함수, 공통 커스텀 훅
- `src/redux/`: 전역 Redux 스토어 설정 및 글로벌 상태 관리 관련 코드
- `src/mocks/`: MSW 환경 구성 및 개발/테스트용 API 핸들러
- `src/stories/`: 컴포넌트용 스토리북 코드 및 관련 문서
- `scripts/`: 자동화 및 빌드 지원 유틸리티 스크립트

## 4. 에이전트 개발 및 검증 규칙 (Agent Rules)

### 4.1. 코드 작성 및 품질 규칙

1.  **일관성 최우선**: 새로운 코드를 작성하기 전에 반드시 기존 코드베이스 내 유사한 패턴(예: Redux Slice 구성 방식, API 핸들러 작성법 등)을 먼저 탐색하고 동일한 스타일로 작성하십시오.
2.  **엄격한 타입 정의 (Strict Typing)**: `any` 타입 사용을 철저히 금지하며, 모든 변수, 함수 매개변수, 반환 값 등에 명확한 타입을 정의하십시오. 부득이하게 타입 추론이 어렵거나 유연한 타입이 필요한 경우에도 `any` 대신 `unknown`, 제네릭(Generics), 혹은 구체적인 유니온/인터섹션 타입을 작성해야 합니다. React 19 및 Next.js 16의 표준 타입(예: `React.JSX.Element`, `Promise<void>`, `NextRequest` 등)을 적극적으로 사용하십시오.
3.  **컴포넌트 설계**: UI 컴포넌트 작성 시 Radix UI 및 Tailwind CSS v4 문법을 사용하여 스타일을 제어하십시오. 재사용성이 높은 디자인 요소는 `src/shared` 아래에 작성하고, 특정 비즈니스 로직에 종속된 컴포넌트는 `src/features` 아래에 두십시오.
4.  **컴포넌트와 훅의 역할 분리 (Separation of UI and Logic)**: UI 렌더링(Component)과 비즈니스 로직 및 상태 관리(Custom Hook)를 명확히 분리하여 설계하십시오. 사용자가 구조 설계를 잘 알지 못하거나 결정을 내리기 어려운 상황일 경우, 에이전트가 어떤 부분을 Hook으로 분리하고 어떤 부분을 UI Component로 가져갈지 주도적으로 제안하고 그 이유를 명확하게 설명해 주어야 합니다.
5.  **주석 보존**: 기존의 설명 주석, JSDoc, 라이선스 선언 등 기존 코드의 메타데이터를 불필요하게 삭제하지 마십시오.

### 4.2. 빌드 및 테스트 검증 규칙

1.  **빌드 및 타입 체크**: 코드를 대량으로 수정하거나 중요 변경 사항이 있을 때는 작업 완료 전 아래 명령어로 검증하십시오.
    - 타입 체크: `npm run type-check`
    - 빌드 검증: `npm run build`
2.  **포맷 및 린트**: 코드가 끝난 후에는 프리티어와 린트 포맷팅을 실행하거나 해당 규칙에 맞추어 제출하십시오.
    - `npm run format`
    - `npm run lint:fix`
3.  **MSW 및 Storybook 연동**: 백엔드 API와의 통신 로직을 작성할 때는 `src/mocks` 내에 MSW 핸들러를 추가하고, 필요시 Storybook 파일(`.stories.tsx`)을 작성하여 고립된 환경에서 컴포넌트가 정상 동작하는지 검토하십시오.
4.  **환경 변수 활용**: 빌드 환경별(`.env.development`, `.env.staging`, `.env.production`) 설정을 준수하고 API 도메인 등 환경별로 동적 제어가 필요한 변수는 적절하게 정의하십시오.
