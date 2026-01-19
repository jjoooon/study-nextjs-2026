# 개발 워크플로우

이 문서는 프로젝트의 개발 프로세스, 브랜치 전략, 및 협업 방법을 설명합니다.

## 목차

1. [개발 환경 설정](#개발-환경-설정)
2. [브랜치 전략](#브랜치-전략)
3. [개발 프로세스](#개발-프로세스)
4. [Pull Request 가이드라인](#pull-request-가이드라인)
5. [코드 리뷰 프로세스](#코드-리뷰-프로세스)
6. [이슈 관리](#이슈-관리)
7. [테스트 가이드라인](#테스트-가이드라인)
8. [배포 프로세스](#배포-프로세스)
9. [문제 해결](#문제-해결)

---

## 개발 환경 설정

### 1. 사전 요구사항

개발 환경을 구축하기 전에 다음 도구들이 설치되어 있어야 합니다:

- **Node.js** 18.x 이상
- **npm** 9.x 이상 또는 **yarn** / **pnpm**
- **Git** 2.x 이상
- **VS Code** (권장) 또는 다른 코드 에디터
- **Git CLI** 또는 **GitHub Desktop**

### 2. 프로젝트 클론

```bash
# 프로젝트 클론
git clone <repository-url>
cd study-nextjs-2026

# 의존성 설치
npm install
```

### 3. 개발 서버 시작

```bash
# 개발 서버 시작 (Turbo 모드)
npm run dev

# 또는
npm run storybook  # Storybook만 실행
```

### 4. 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# 환경 변수 설정
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### 5. VS Code 설정 (권장)

**추천 확장 프로그램:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "stylelint.vscode-stylelint",
    "eamodio.gitlens"
  ]
}
```

**VS Code 설정 (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 브랜치 전략

### Git Flow 기반 전략

```
main (배포)
  ↑
  merge
  ├─ develop (개발 통합)
  │   ↑
  │   merge
  │   ├─ feature/auth-login
  │   ├─ feature/product-list
  │   └─ feature/dashboard-stats
  │
  ├─ hotfix/critical-bug
  └─ release/v1.0.0
```

### 브랜치 종류

| 브랜치 | 접두사 | 용도 | 수명 |
|--------|--------|------|------|
| `main` | - | 프로덕션 배포용 | 영구 |
| `develop` | - | 개발 통합 브랜치 | 영구 |
| `feature/*` | `feature/` | 새로운 기능 개발 | 일시적 |
| `bugfix/*` | `bugfix/` | 버그 수정 (개발 중) | 일시적 |
| `hotfix/*` | `hotfix/` | 프로덕션 버그 수정 | 일시적 |
| `release/*` | `release/` | 릴리스 준비 | 일시적 |

### 브랜치 명명 규칙

```bash
# Feature 브랜치
feature/기능명-간단설명
feature/auth-login
feature/product-filter
feature-dashboard-stats

# Bugfix 브랜치
bugfix/문제-간단설명
bugfix/login-error
bugfix/product-sort

# Hotfix 브랜치 (긴급)
hotfix/심각한버그-설명
hotfix/security-vulnerability
hotfix-crash-fix

# Release 브랜치
release/v1.0.0
release/v1.1.0
```

---

## 개발 프로세스

### 1. 이슈 생성 및 할당

```
1. GitHub Issues에서 새 이슈 생성
2. 이슈에 라벨 추가 (feature, bug, enhancement 등)
3. 담당자 할당
4. 마일스톤 설정 (선택)
```

### 2. 브랜치 생성

```bash
# develop 브랜치 최신화
git checkout develop
git pull origin develop

# feature 브랜치 생성
git checkout -b feature/기능명

# 예시
git checkout -b feature/auth-login
```

### 3. 개발 사이클

```bash
# 1. 코드 작성
# - TypeScript, React 컴포넌트 개발
# - 스타일링 (Tailwind CSS)
# - 테스트 코드 작성

# 2. 코드 포맷팅 및 린팅
npm run format
npm run lint:fix

# 3. 빌드 테스트
npm run build

# 4. 로컬 테스트
npm run dev
# 또는
npm run storybook
```

### 4. 커밋 단위

**작은 단위로 자주 커밋하세요:**

```bash
# 기능 구현
git add .
git commit -m "feat(auth): 로그인 폼 UI 구현"

# 스타일링
git add .
git commit -m "style(auth): 로그인 폼 스타일 적용"

# 버그 수정
git add .
git commit -m "fix(auth): 로그인 버튼 disabled 처리 버그 수정"
```

### 5. 브랜치 푸시

```bash
# 원격 브랜치 푸시
git push origin feature/기능명

# 예시
git push origin feature/auth-login
```

---

## Pull Request 가이드라인

### PR 생성 시점

- ✅ 기능 구현이 완료되었을 때
- ✅ 코드 리뷰가 필요할 때
- ✅ 테스트가 통과했을 때
- ❌ 아직 구현 중인 코드 (WIP PR 제외)

### PR 제목 규칙

```
<type>: <간단한 설명>

예시:
feat: 로그인 기능 구현
fix: 상품 가격 계산 버그 수정
docs: README 업데이트
refactor: API 레이어 재구성
```

### PR 템플릿

```markdown
## 변경 사항
<!-- 구체적인 변경 사항을 설명하세요 -->

### 구현 기능
- [ ] 기능 1
- [ ] 기능 2

### 버그 수정
- [ ] 버그 1
- [ ] 버그 2

## 테스트
<!-- 테스트 방법을 설명하세요 -->

```bash
# 테스트 명령어
npm test
```

### 수동 테스트 체크리스트
- [ ] 로그인 정상 작동
- [ ] 에러 처리 확인
- [ ] 반응형 디자인 확인

## 관련 이슈
<!-- 연결된 이슈 번호 -->
Closes #123
Related to #456

## 스크린샷/데모
<!-- UI 변경이 있는 경우 스크린샷 추가 -->
## 배포 주의사항
<!-- 배포 시 확인이 필요한 사항 -->
- [ ] 마이그레이션 필요
- [ ] 환경 변수 추가 필요
```

### PR 검사리스트

제출 전 다음을 확인하세요:

- [ ] `npm run lint` 통과
- [ ] `npm run format` 적용
- [ ] `npm run build` 성공
- [ ] `npm test` (있는 경우) 통과
- [ ] 불필요한 console.log 제거
- [ ] 사용하지 않는 코드 제거
- [ ] TypeScript 에러 없음
- [ ] PR 템플릿 작성 완료

### PR 라벨

| 라벨 | 설명 | 색상 |
|------|------|------|
| `feature` | 새로운 기능 | 🟢 |
| `bug` | 버그 수정 | 🔴 |
| `enhancement` | 기능 개선 | 🔵 |
| `documentation` | 문서 업데이트 | 📚 |
| `refactor` | 코드 리팩토링 | ⚙️ |
| `performance` | 성능 개선 | ⚡ |
| `breaking` | breaking change | 💥 |
| `WIP` | 작업 중 | 🚧 |
| `DO NOT MERGE` | 머지 금지 | 🛑 |
| `ready for review` | 리뷰 대기 | 👀 |

---

## 코드 리뷰 프로세스

### 리뷰어 가이드라인

**좋은 리뷰어가 되기 위한 팁:**

1. **긍정적 피드백** - "좋은 아이디어입니다!", "잘 구현했습니다."
2. **구체적 피드백** - "이 부분을 이렇게 수정하면 더 좋을 것 같습니다."
3. **설명 포함** - 왜 변경이 필요한지 이유를 설명하세요.

### 리뷰 체크리스트

**기술적 측면:**
- [ ] 코드가 이해하기 쉬운가?
- [ ] 적절한 에러 처리가 있는가?
- [ ] 불필요한 복잡성이 없는가?
- [ ] 성능 문제가 없는가?
- [ ] 보안 이슈가 없는가?

**프로젝트 관점:**
- [ ] 아키텍처와 일치하는가?
- [ ] 재사용 가능한가?
- [ ] 테스트가 충분한가?

### 리뷰 요청 방법

```bash
# PR 생성 후 리뷰어 지정
# - GitHub 웹 인터페이스에서 Reviewers 선택
# - 또는 @mention으로 요청

@reviewer1 이 PR을 리뷰해주세요.
```

### 리뷰 피드백 처리

```bash
# 변경 사항 반영
git checkout feature/기능명
# 수정 작업
git add .
git commit -m "feat: 리뷰 피드백 반영"
git push origin feature/기능명
```

---

## 이슈 관리

### 이슈 템플릿

```markdown
## 이슈 유형
- [ ] 기능 요청
- [ ] 버그 신고
- [ ] 개선 제안

## 설명
<!-- 이슈에 대한 상세 설명 -->

## 재현 단계 (버그의 경우)
1. 단계 1
2. 단계 2
3. 단계 3

## 기대 동작
<!-- 기대했던 동작 설명 -->

## 실제 동작
<!-- 실제 일어난 동작 설명 -->

## 환경
- OS: [예: macOS, Windows]
- 브라우저: [예: Chrome 120, Safari 17]
- Node.js 버전: [예: 18.x]

## 스크린샷
<!-- 문제가 있다면 스크린샷 추가 -->

## 추가 정보
<!-- 기타 참고사항 -->
```

### 이슈 라벨

| 라벨 | 설명 |
|------|------|
| `priority: critical` | 긴급 |
| `priority: high` | 높음 |
| `priority: medium` | 중간 |
| `priority: low` | 낮음 |
| `status: in progress` | 진행 중 |
| `status: review` | 리뷰 중 |
| `status: done` | 완료 |
| `type: bug` | 버그 |
| `type: feature` | 기능 |
| `type: improvement` | 개선 |
| `type: documentation` | 문서 |

---

## 테스트 가이드라인

### 테스트 작성

```typescript
// 예시: Component 테스트
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders button text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    screen.getByText('Click').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 특정 파일 테스트
npm test Button.test.tsx

# 커버리지 확인
npm run test:coverage

# watch 모드
npm test -- --watch
```

### 테스트 커버리지 목표

| 타입 | 최소 커버리지 | 권장 |
|------|--------------|------|
| Statements | 70% | 80% |
| Branches | 60% | 75% |
| Functions | 70% | 80% |
| Lines | 70% | 80% |

---

## 배포 프로세스

### 릴리스 절차

#### 1. Release 브랜치 생성

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
```

#### 2. 릴리스 준비

```bash
# 버전 업데이트
npm version minor  # 또는 major, patch

# CHANGE.md 업데이트
# 릴리스 노트 작성

# 커밋
git add .
git commit -m "chore: v1.0.0 릴리스 준비"
```

#### 3. 배포 테스트

```bash
# 프로덕션 빌드 테스트
npm run build

# 프로덕션 모드 실행 테스트
npm start
```

#### 4. Merge

```bash
# develop으로 merge
git checkout develop
git merge release/v1.0.0

# main으로 merge
git checkout main
git merge release/v1.0.0

# 태그 생성
git tag -a v1.0.0 -m "Release version 1.0.0"
```

#### 5. 푸시

```bash
git push origin develop
git push origin main
git push origin v1.0.0
```

### 버전 규칙 (Semantic Versioning)

```
MAJOR.MINOR.PATCH

예: 1.2.3

MAJOR: 호환되지 않는 API 변경
MINOR: 새로운 기능 (후방 호환)
PATCH: 버그 수정 (후방 호환)
```

---

## 문제 해결

### 공통 문제

#### 1. 빌드 실패

```bash
# 문제: 타입 에러
# 해결:
npm run lint

# 문제: 의존성 충돌
# 해결:
rm -rf node_modules
rm package-lock.json
npm install
```

#### 2. Git 병합 충돌

```bash
# develop에서 병합 충돌 발생 시
git checkout develop
git pull origin develop
git checkout feature/your-feature
git merge develop

# 충돌 해결 후
git add .
git commit -m "resolve: develop과의 병합 충돌 해결"
```

#### 3. 환경 변수 문제

```bash
# .env.local이 로드되지 않을 때
# 해결: 파일명 확인 및 Next.js 재시작
ls -la | grep .env
rm -rf .next
npm run dev
```

### 개발 도구

#### Storybook

```bash
# Storybook 시작
npm run storybook

# Storybook 빌드
npm run build-storybook

# Storybook 정적 파일 배포
# .out/ 디렉토리를 호스팅 서버에 업로드
```

#### Bundle Analyzer

```bash
# 번들 크기 분석
ANALYZE=true npm run build

# 브라우저에서 자동으로 분석 결과 열림
```

---

## 일일 개발 루틴

### 1. 하루 시작 시

```bash
# 1. 최신 코드 가져오기
git checkout develop
git pull origin develop

# 2. 작업 브랜치로 이동
git checkout feature/your-feature

# 3. develop 최신화 병합
git merge develop

# 4. 개발 서버 시작
npm run dev

# 5. Storybook 시작 (다른 터미널)
npm run storybook
```

### 2. 작업 중

```bash
# 정기적으로 저장 및 커밋
git add .
git commit -m "feat: 진행 상황 저장"

# 주기적으로 푸시
git push origin feature/your-feature
```

### 3. 하루 종료 시

```bash
# 1. 코드 포맷팅
npm run format

# 2. 린팅
npm run lint:fix

# 3. 커밋 및 푸시
git add .
git commit -m "wip: 진행 중인 작업"
git push origin feature/your-feature
```

---

## 프로젝트 명령어 모음

### 개발

```bash
npm run dev              # 개발 서버 (Turbo)
npm run storybook        # Storybook
npm run build            # 프로덕션 빌드
npm start               # 프로덕션 서버
```

### 코드 품질

```bash
npm run lint            # ESLint 체크
npm run lint:fix        # ESLint 자동 수정
npm run format          # Prettier 포맷팅
npm run analyze         # 번들 분석
```

### 테스트 (설정 시)

```bash
npm test               # 전체 테스트
npm run test:coverage  # 커버리지 확인
```

---

## 추가 리소스

### 문서

- [프로젝트 README](../README.md)
- [디렉토리 구조](./directory-structure.md)
- [아키텍처 가이드](./architecture.md)
- [코딩 컨벤션](./coding-conventions.md)

### 외부 참고자료

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
