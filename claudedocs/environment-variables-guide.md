# 환경 변수 (.env) 관리 가이드

**버전:** 1.0.0
**작성일:** 2026-01-15
**목적:** 환경 변수 안전한 관리 및 사용법

---

## 📋 목차

1. [개요](#개요)
2. [.env 파일 구조](#env-파일-구조)
3. [환경 변수 사용법](#환경-변수-사용법)
4. [보안 가이드라인](#보안-가이드라인)
5. [추가/수정 절차](#추가수정-절차)

---

## 개요

### .env 파일이 필요한 이유

1. **보안:** 민감한 정보 (API Key, DB 비밀번호 등)를 코드에서 분리
2. **환경 분리:** development, staging, production 환경별 설정 관리
3. **유연성:** 설정을 코드 수정 없이 변경 가능
4. **표준:** 12-Factor App의 Config 원칙 준수

### 제공되는 파일

```
.env.example          # 환경 변수 템플릿 (모든 주석 포함)
.env.development      # 개발 환경 설정
.env.production       # 프로덕션 환경 설정
.env.test             # 테스트 환경 설정
```

---

## .env 파일 구조

### 1. .env.example

**용도:** 환경 변수 템플릿
- 모든 가능한 환경 변수 나열
- 각 변수의 설명과 기본값 포함
- **Git에 커밋됨** (민감한 정보 없음)

### 2. .env.development

**용도:** 로컬 개발 환경
- 로컬 개발용 설정
- **Git에 커밋하지 않음**
- 개발자 각자가 복사하여 사용

### 3. .env.production

**용도:** 프로덕션 환경
- 실제 운영 환경 설정
- **Git에 커밋하지 않음**
- 배포 시 서버에 직접 설정

### 4. .env.test

**용도:** 테스트 환경
- 테스트용 모의 데이터
- **Git에 커밋하지 않음**

---

## 환경 변수 사용법

### 1. 프로젝트 설정

#### Step 1: .env.example 복사

```bash
# 개발 환경
cp .env.example .env.development

# 또는 프로덕션 환경
cp .env.example .env.production
```

#### Step 2: 실제 값으로 변경

```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://dev:dev@localhost:5432/app_dev
```

### 2. TypeScript에서 사용

```typescript
// ✅ 타입 안전한 환경 변수 접근
import { config, publicConfig, isDevelopment } from '@/shared/config/env';

// 1. 개별 환경 변수
const apiUrl = config.NEXT_PUBLIC_API_URL;
const isDev = isDevelopment;

// 2. 공개 설정 객체
const appName = publicConfig.appName;
const features = publicConfig.features;

// 3. 조건부 로직
if (config.NODE_ENV === 'development') {
  console.log('Development mode');
}

// 4. Feature Flag 확인
if (publicConfig.features.advancedFilters) {
  // 고급 필터링 활성화
}
```

### 3. 클라이언트에서 사용 (Next.js)

```tsx
// ✅ NEXT_PUBLIC_ 접두사가 붙은 변수만 클라이언트에서 접근 가능
export default function HomePage() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <div>
      <h1>{appName}</h1>
    </div>
  );
}
```

### 4. 서버에서 사용

```typescript
// ✅ 서버 전용 환경 변수 (비공개)
import { serverConfig } from '@/shared/config/env';

export async function GET() {
  const dbUrl = serverConfig.databaseUrl;

  // 데이터베이스 연결
  const db = connect(dbUrl);

  return Response.json({ success: true });
}
```

---

## 보안 가이드라인

### ⚠️ 절대 Git에 커밋하지 않을 것

**민감한 정보:**
- 데이터베이스 비밀번호
- API Secret Key
- OAuth Client Secret
- AWS Secret Access Key
- JWT Secret Key
- SMTP 비밀번호

### ✅ Git에 커밋해도 되는 것

**공개 가능한 정보:**
- 애플리케이션 이름
- 버전 정보
- 공개 API URL
- OAuth Client ID (일부)
- Feature Flags

### .gitignore 설정

```gitignore
# 환경 변수 파일
.env*.local
.env

# 단, 템플릿은 커밋
!.env.example
!.env.development.example
!.env.production.example
```

---

## 환경 변수 카테고리

### 1. 애플리케이션 설정

| 변수명 | 설명 | 기본값 | 예시 |
|--------|------|--------|------|
| `NEXT_PUBLIC_APP_NAME` | 앱 이름 | Next.js App | My App |
| `NEXT_PUBLIC_APP_VERSION` | 버전 | 1.0.0 | 2.0.0 |
| `NEXT_PUBLIC_APP_DESCRIPTION` | 설명 | - | Description |

### 2. API 설정

| 변수명 | 설명 | 기본값 | 예시 |
|--------|------|--------|------|
| `NEXT_PUBLIC_API_URL` | API 기본 URL | /api | https://api.example.com |
| `NEXT_PUBLIC_API_TIMEOUT` | 타임아웃 (ms) | 10000 | 5000 |
| `NEXT_PUBLIC_API_RETRY_COUNT` | 재시도 횟수 | 3 | 3 |

### 3. 인증 설정

| 변수명 | 설명 | 기본값 | 예시 |
|--------|------|--------|------|
| `NEXT_PUBLIC_ACCESS_TOKEN_EXPIRY` | 액세스 토큰 만료 (분) | 15 | 15 |
| `NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY` | 리프레시 토큰 만료 (일) | 7 | 7 |

### 4. OAuth 설정

| 변수명 | 설명 | 필수 여부 | 예시 |
|--------|------|-----------|------|
| `NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID` | Google Client ID | 선택 | google-client-id |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Google Secret | 필수 | google-secret |
| `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` | GitHub Client ID | 선택 | github-client-id |
| `GITHUB_OAUTH_CLIENT_SECRET` | GitHub Secret | 필수 | github-secret |

### 5. Feature Flags

| 변수명 | 설명 | 기본값 | 용도 |
|--------|------|--------|------|
| `NEXT_PUBLIC_FEATURE_ADVANCED_FILTERS` | 고급 필터링 | false | 기능 활성화/비활성화 |
| `NEXT_PUBLIC_FEATURE_DARK_MODE` | 다크 모드 | true | 테마 설정 |
| `NEXT_PUBLIC_FEATURE_REALTIME_NOTIFICATIONS` | 실시간 알림 | false | 알림 기능 |

### 6. 데이터베이스 설정 (서버 전용)

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `DATABASE_URL` | DB 연결 URL | postgresql://user:pass@localhost:5432/db |
| `DATABASE_POOL_MIN` | 연결 풀 최소 | 2 |
| `DATABASE_POOL_MAX` | 연결 풀 최대 | 10 |

---

## 추가/수정 절차

### 새로운 환경 변수 추가

#### 1. .env.example에 추가

```bash
# .env.example
NEXT_PUBLIC_MY_NEW_VAR=default_value
```

#### 2. Zod 스키마에 추가

```typescript
// src/shared/config/env.ts
const envSchema = z.object({
  // ...
  NEXT_PUBLIC_MY_NEW_VAR: z.string().default('default_value'),
});
```

#### 3. 사용

```typescript
import { config } from '@/shared/config/env';

const myVar = config.NEXT_PUBLIC_MY_NEW_VAR;
```

### 환경별 다른 값 설정

```bash
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.production
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 모범 사례

### ✅ 좋은 예시

```typescript
// ✅ 타입 안전성 보장
import { config } from '@/shared/config/env';

const apiUrl = config.NEXT_PUBLIC_API_URL;
const timeout = config.NEXT_PUBLIC_API_TIMEOUT;

// ✅ 기본값 제공
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_API_TIMEOUT=10000

// ✅ 환경별 파일 분리
.env.development
.env.production
.env.test
```

### ❌ 나쁜 예시

```typescript
// ❌ 직접 process.env 접근 (타입 없음)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ 민감한 정보를 코드에 하드코딩
const apiKey = 'sk-1234567890abcdef';

// ❌ .env 파일을 Git에 커밋
git add .env.development
```

---

## 문제 해결

### 환경 변수가 undefined인 경우

**원인:** .env 파일이 존재하지 않거나, NEXT_PUBLIC_ 접두사 누락

**해결:**
```bash
# 1. .env 파일 생성
cp .env.example .env.development

# 2. Next.js 개발 서버 재시작
npm run dev
```

### Zod 검증 에러

**에러 메시지:**
```
❌ Invalid environment variables:
  - NEXT_PUBLIC_API_URL: Invalid URL
```

**해결:** .env 파일의 값 수정

### 클라이언트에서 접근 안 되는 경우

**원인:** NEXT_PUBLIC_ 접두사 누락

**해결:**
```bash
# ❌ 잘못된 예
API_URL=http://localhost:3000/api

# ✅ 올바른 예
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 참고 문서

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Zod Documentation](https://zod.dev/)
- [12-Factor App: Config](https://12factor.net/config)

---

**버전 history:**
- v1.0.0 (2026-01-15): 초기 버전
