# 퍼블리싱 가이드

이 문서는 본 프로젝트의 퍼블리싱(퍼블) 관련 구조, 설계, 컴포넌트, 그리고 Storybook 활용에 대한 가이드입니다.

---

## 1. 퍼블 관련 주요 라이브러리 및 설계 파일 구조

### 사용 라이브러리
- **React**: UI 컴포넌트 기반 프레임워크
- **Radix UI**: 접근성 높은 UI 프리미티브 제공
- **shadcn/ui**: Radix 기반의 커스텀 UI 컴포넌트 세트
- **AG Grid**: 고성능 데이터 그리드 컴포넌트
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크

### 주요 퍼블 구조 및 위치
- **공통 컴포넌트**: `src/shared/components/`
- **스타일/토큰**: `src/shared/styles/`, `tailwind.config.js`
- **Radix/shadcn 컴포넌트**: `src/shared/components/ui/` 또는 각 feature별 `components/`
- **AG Grid 래퍼**: `src/shared/components/aggrid/` 또는 feature별 `components/`
- **유틸/헬퍼**: `src/shared/utils/`, `src/shared/lib/`
- **스토리북 스토리**: `src/stories/`, 각 feature/components 폴더 내 `*.stories.tsx`

---

## 2. 페이지 및 팝업 구조 설명

### 페이지 구조
- **Next.js App Router** 기반
- 각 페이지: `src/app/경로/page.tsx` (예: `/sample` → `src/app/sample/page.tsx`)
- 레이아웃: `src/app/경로/layout.tsx`
- 라우팅: 폴더 구조가 URL 구조와 1:1 매핑

### 팝업 구조
- **모달/팝업**: 주로 Radix UI Dialog, shadcn/ui Dialog 컴포넌트 활용
- 팝업 컴포넌트 위치: feature별 `components/`, 또는 `src/shared/components/popup/`
- 팝업 호출: 상태 관리(redux, context 등) 또는 props로 제어
- 팝업 라우팅: 필요시 `/modal` 등 별도 라우트로 분리 가능

---

## 3. Storybook 컴포넌트 구조 및 설명

### Storybook 위치 및 구성
- 스토리북 스토리: `src/stories/`, 각 feature/components 폴더 내 `*.stories.tsx`
- 스토리 파일 예시: `Button.stories.tsx`, `DataGrid.stories.tsx`
- 스토리북 문서화: 컴포넌트별 사용법, props, 예제, 상태별 렌더링 등 포함

### Storybook 작성 규칙
- 컴포넌트 단위로 스토리 작성 (공통/도메인별)
- 제네릭/재사용 컴포넌트는 다양한 케이스로 스토리 분리
- 퍼블리싱 가이드/디자인 시스템 문서화에 적극 활용

---

## 참고
- 실제 폴더/파일 구조는 프로젝트 내 디렉터리와 일치해야 하며, 필요시 `docs/` 내에 상세 가이드 추가 권장
- 각 라이브러리 공식 문서 및 내부 컨벤션 문서 참고
