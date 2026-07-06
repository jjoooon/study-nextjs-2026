# Field-Level JWE Encryption Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** React 프론트엔드에서 지정된 민감 필드만 표준 JWE(RSA-OAEP-256 + A256GCM)로 요청/응답 양방향 암호화하는 범용 유틸리티를 만들고, MSW 데모 엔드포인트로 전체 왕복을 수동 검증한다.

**Architecture:** 서버(백엔드)는 장기 RSA 키쌍의 공개키를 `/api/crypto/public-key`로 노출해 요청 필드 암호화에 사용되고, 클라이언트는 세션(페이지 로드)마다 임시 RSA 키쌍을 생성해 그 공개키를 요청에 동봉함으로써 서버가 응답 필드를 암호화할 수 있게 한다. `axiosBaseQuery`에 `encryptedFields` 옵션을 추가해 RTK Query 엔드포인트가 선언적으로 필드를 지정하면 인터셉터가 자동으로 암복호화한다. 실제 Spring 백엔드는 이 레포 범위 밖이므로, MSW로 계약(contract)을 흉내 낸 데모 엔드포인트를 만들어 검증한다.

**Tech Stack:** `jose` (JWE 구현), Web Crypto API, MSW(개발용 모킹), RTK Query/axios(기존 스택)

**참고 설계 문서:** `docs/plans/2026-07-06-field-level-jwe-encryption-design.md`

**테스트 방침:** 이 프로젝트에는 jest/vitest 등 테스트 러너가 없다(사용자 확인 완료, 새로 도입하지 않기로 함). 따라서 각 태스크는 "자동화 테스트 실행" 대신 **개발 서버를 띄운 상태에서 브라우저로 직접 확인**하는 방식으로 검증한다.

---

### Task 1: `jose` 의존성 설치

**Files:**
- Modify: `package.json`

**Step 1: 설치**

```bash
npm install jose
```

**Step 2: 설치 확인**

```bash
grep '"jose"' package.json
```

Expected: `"jose": "^..."` 한 줄이 `dependencies`에 나타남

**Step 3: 커밋**

```bash
git add package.json package-lock.json
git commit -m "chore: jose 라이브러리 추가 (JWE 암복호화)"
```

---

### Task 2: 클라이언트 임시 키쌍 모듈

**Files:**
- Create: `src/shared/lib/crypto/clientKeyPair.ts`

**Step 1: 파일 작성**

```ts
/**
 * 클라이언트 임시 키쌍 (세션당 1회 생성)
 *
 * @description
 * 서버가 응답 필드를 이 공개키로 암호화할 수 있도록, 페이지 로드마다
 * 임시 RSA-OAEP-256 키쌍을 생성해 모듈 스코프에 보관한다.
 * 개인키는 extractable: false로 생성되어 원본 키 데이터가 추출될 수 없다.
 */

import { generateKeyPair, exportJWK, type JWK } from 'jose';

interface ClientKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

let keyPairPromise: Promise<ClientKeyPair> | null = null;

async function createKeyPair(): Promise<ClientKeyPair> {
  const { publicKey, privateKey } = await generateKeyPair('RSA-OAEP-256', {
    extractable: false,
    modulusLength: 2048,
  });

  return {
    publicKey: publicKey as CryptoKey,
    privateKey: privateKey as CryptoKey,
  };
}

/**
 * 세션 내에서 재사용되는 임시 키쌍을 반환한다.
 * 최초 호출 시 생성하고, 이후 호출은 같은 Promise를 재사용한다.
 */
export function getClientKeyPair(): Promise<ClientKeyPair> {
  if (!keyPairPromise) {
    keyPairPromise = createKeyPair();
  }
  return keyPairPromise;
}

/** 요청에 동봉할 공개키를 JWK 형식으로 반환한다. */
export async function getClientPublicJwk(): Promise<JWK> {
  const { publicKey } = await getClientKeyPair();
  return exportJWK(publicKey);
}
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음

**Step 3: 커밋**

```bash
git add src/shared/lib/crypto/clientKeyPair.ts
git commit -m "feat: 클라이언트 임시 RSA 키쌍 생성 모듈 추가"
```

---

### Task 3: 서버 공개키 fetch/캐시 모듈

**Files:**
- Create: `src/shared/lib/crypto/serverPublicKey.ts`

**Step 1: 파일 작성**

```ts
/**
 * 서버 공개키 fetch 및 캐시
 *
 * @description
 * 요청 필드 암호화에 사용할 서버의 RSA 공개키를 가져와 세션 동안 캐시한다.
 * 서버가 키를 교체(kid 변경)하는 경우를 대비해 캐시 무효화 함수를 제공한다.
 */

import { importJWK, type JWK } from 'jose';

interface ServerPublicKey {
  key: CryptoKey;
  kid: string;
}

let cached: Promise<ServerPublicKey> | null = null;

async function fetchServerPublicKey(): Promise<ServerPublicKey> {
  const response = await fetch('/api/crypto/public-key');

  if (!response.ok) {
    throw new Error(`서버 공개키 조회 실패: ${response.status}`);
  }

  const jwk = (await response.json()) as JWK & { kid?: string };

  if (!jwk.kid) {
    throw new Error('서버 공개키 응답에 kid가 없습니다.');
  }

  const key = (await importJWK(jwk, 'RSA-OAEP-256')) as CryptoKey;

  return { key, kid: jwk.kid };
}

/** 캐시된 서버 공개키를 반환하고, 없으면 fetch한다. */
export function getServerPublicKey(): Promise<ServerPublicKey> {
  if (!cached) {
    cached = fetchServerPublicKey().catch((error) => {
      cached = null; // 실패 시 캐시하지 않아 다음 호출에서 재시도되게 함
      throw error;
    });
  }
  return cached;
}

/** kid 불일치 등으로 캐시를 무효화해야 할 때 호출한다. */
export function invalidateServerPublicKey(): void {
  cached = null;
}
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음

**Step 3: 커밋**

```bash
git add src/shared/lib/crypto/serverPublicKey.ts
git commit -m "feat: 서버 공개키 fetch/캐시 모듈 추가"
```

---

### Task 4: JWE 필드 암복호화 유틸리티

**Files:**
- Create: `src/shared/lib/crypto/jwe.ts`

**Step 1: 파일 작성**

```ts
/**
 * 지정 필드 JWE 암복호화 유틸리티
 *
 * @description
 * 객체의 특정 필드 값만 JWE(RSA-OAEP-256 + A256GCM)로 암호화/복호화한다.
 * 대상이 아닌 필드는 그대로 둔다.
 */

import { CompactEncrypt, compactDecrypt } from 'jose';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * payload의 fieldNames에 해당하는 값들을 publicKey로 JWE 암호화해 치환한다.
 * 값이 문자열이 아니면 JSON.stringify 후 암호화한다.
 */
export async function encryptFields<T extends Record<string, unknown>>(
  payload: T,
  fieldNames: Array<keyof T>,
  publicKey: CryptoKey,
  kid?: string
): Promise<T> {
  const result = { ...payload };

  for (const field of fieldNames) {
    const value = result[field];
    if (value === undefined) continue;

    const plaintext = typeof value === 'string' ? value : JSON.stringify(value);

    const jwe = await new CompactEncrypt(encoder.encode(plaintext))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM', ...(kid ? { kid } : {}) })
      .encrypt(publicKey);

    result[field] = jwe as T[keyof T];
  }

  return result;
}

/**
 * payload의 fieldNames에 해당하는 JWE 문자열을 privateKey로 복호화해 치환한다.
 * 복호화된 텍스트가 JSON으로 파싱 가능하면 원래 타입으로, 아니면 문자열로 복원한다.
 */
export async function decryptFields<T extends Record<string, unknown>>(
  payload: T,
  fieldNames: Array<keyof T>,
  privateKey: CryptoKey
): Promise<T> {
  const result = { ...payload };

  for (const field of fieldNames) {
    const value = result[field];
    if (typeof value !== 'string') continue;

    const { plaintext } = await compactDecrypt(value, privateKey);
    const text = decoder.decode(plaintext);

    try {
      result[field] = JSON.parse(text);
    } catch {
      result[field] = text as T[keyof T];
    }
  }

  return result;
}
```

**Step 2: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음

**Step 3: 커밋**

```bash
git add src/shared/lib/crypto/jwe.ts
git commit -m "feat: JWE 필드 암복호화 유틸리티 추가"
```

---

### Task 5: MSW 데모 핸들러 (백엔드 계약 모킹)

실제 Spring 백엔드는 이 레포 범위 밖이므로, 백엔드가 구현해야 할 계약(공개키 노출 + 요청 복호화 + 응답 재암호화)을 MSW로 흉내 낸다. 이 핸들러 자체가 백엔드 팀에 전달할 참고 예시 역할도 한다.

**Files:**
- Create: `src/mocks/handlers/crypto.ts`
- Modify: `src/mocks/handlers/index.ts`

**Step 1: 파일 작성**

```ts
/**
 * 크립토 데모용 MSW 핸들러
 *
 * @description
 * 실제 백엔드(Spring)가 구현해야 할 JWE 계약을 모킹으로 보여주는 참고용 핸들러.
 * - GET /api/crypto/public-key: 서버 공개키 노출
 * - POST /api/crypto/echo-demo: 요청 필드(secret) 복호화 후,
 *   요청에 동봉된 클라이언트 공개키로 응답 필드(secret)를 재암호화해서 반환
 */

import { http, HttpResponse } from 'msw';
import { generateKeyPair, exportJWK, importJWK, compactDecrypt, CompactEncrypt, type JWK } from 'jose';

const SERVER_KID = 'dev-key-1';

let serverKeyPairPromise: Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }> | null = null;

function getServerKeyPair() {
  if (!serverKeyPairPromise) {
    serverKeyPairPromise = generateKeyPair('RSA-OAEP-256', {
      extractable: true,
      modulusLength: 2048,
    }) as Promise<{ publicKey: CryptoKey; privateKey: CryptoKey }>;
  }
  return serverKeyPairPromise;
}

export const cryptoHandlers = [
  http.get('/api/crypto/public-key', async () => {
    const { publicKey } = await getServerKeyPair();
    const jwk = await exportJWK(publicKey);
    return HttpResponse.json({ ...jwk, kid: SERVER_KID });
  }),

  http.post('/api/crypto/echo-demo', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown> & {
      clientPublicKey: JWK;
      secret: string;
    };
    const { clientPublicKey, secret, ...rest } = body;

    const { privateKey } = await getServerKeyPair();
    const { plaintext } = await compactDecrypt(secret, privateKey);
    const decryptedSecret = new TextDecoder().decode(plaintext);

    const clientKey = (await importJWK(clientPublicKey, 'RSA-OAEP-256')) as CryptoKey;
    const encryptedSecret = await new CompactEncrypt(new TextEncoder().encode(`echo:${decryptedSecret}`))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(clientKey);

    return HttpResponse.json({ ...rest, secret: encryptedSecret });
  }),
];
```

**Step 2: `index.ts`에 등록**

`src/mocks/handlers/index.ts`를 다음과 같이 수정:

```ts
import { authHandlers } from './auth';
import { cryptoHandlers } from './crypto';
import { customersHandlers } from './customers';
import { dashboardHandlers } from './dashboard';
import { errorHandlers } from './errors';
import { productsHandlers } from './products';

export const handlers = [
  ...authHandlers,
  ...cryptoHandlers,
  ...customersHandlers,
  ...dashboardHandlers,
  ...productsHandlers,
  ...errorHandlers,
];
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음

**Step 4: 커밋**

```bash
git add src/mocks/handlers/crypto.ts src/mocks/handlers/index.ts
git commit -m "feat: 크립토 데모용 MSW 핸들러 추가"
```

---

### Task 6: `axiosBaseQuery`에 `encryptedFields` 연동

**Files:**
- Modify: `src/shared/lib/axios/axiosBaseQuery.ts`

**Step 1: import 추가**

파일 상단 import 목록에 추가:

```ts
import { getClientKeyPair, getClientPublicJwk } from '@/shared/lib/crypto/clientKeyPair';
import { decryptFields, encryptFields } from '@/shared/lib/crypto/jwe';
import { getServerPublicKey } from '@/shared/lib/crypto/serverPublicKey';
```

**Step 2: `BaseQueryArgs`에 옵션 추가**

```ts
interface BaseQueryArgs {
  url: string;
  method?: string;
  body?: unknown;
  data?: unknown;
  params?: unknown;
  showSpinner?: boolean;
  spinnerMessage?: string;
  delayShow?: number;
  transparentBackground?: boolean;
  hideLoadingIndicator?: boolean;
  /** 요청/응답에서 JWE로 암복호화할 필드명 목록 */
  encryptedFields?: string[];
}
```

**Step 3: 요청 전 필드 암호화 처리**

`axiosBaseQuery` 함수 내부, `const requestData = body ?? data;` 아래에 추가:

```ts
const requestData = body ?? data;
const requestMethod = method?.toLowerCase() as Method;
const { encryptedFields } = parsedArgs as { encryptedFields?: string[] };

let finalRequestData = requestData;

if (encryptedFields?.length && requestData && typeof requestData === 'object') {
  try {
    const [{ key: serverKey, kid }, clientPublicKey] = await Promise.all([
      getServerPublicKey(),
      getClientPublicJwk(),
    ]);

    const encrypted = await encryptFields(requestData as Record<string, unknown>, encryptedFields, serverKey, kid);

    finalRequestData = { ...encrypted, clientPublicKey };
  } catch (error) {
    return {
      error: {
        status: 0,
        data: { message: '요청 암호화에 실패했습니다.', cause: error },
      },
    };
  }
}
```

**Step 4: axios 호출에 `finalRequestData` 사용**

기존:

```ts
const result = await instance({
  url,
  method: requestMethod,
  data: requestData,
  params,
});
```

변경:

```ts
const result = await instance({
  url,
  method: requestMethod,
  data: finalRequestData,
  params,
});
```

**Step 5: 응답 후 필드 복호화 처리**

`return { data: result.data };`를 다음으로 교체:

```ts
let responseData = result.data;

if (encryptedFields?.length && responseData && typeof responseData === 'object') {
  try {
    const { privateKey } = await getClientKeyPair();
    responseData = await decryptFields(responseData as Record<string, unknown>, encryptedFields, privateKey);
  } catch (error) {
    return {
      error: {
        status: 0,
        data: { message: '응답 복호화에 실패했습니다.', cause: error },
      },
    };
  }
}

return { data: responseData };
```

> 평문 폴백 없음: 암호화/복호화가 실패하면 요청 자체를 에러로 반환한다 (설계 문서의 에러 처리 원칙 참고).

**Step 6: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음. `encryptedFields`가 없는 기존 모든 API 호출(로그인 등)은 동작에 변화가 없어야 함.

**Step 7: 커밋**

```bash
git add src/shared/lib/axios/axiosBaseQuery.ts
git commit -m "feat: axiosBaseQuery에 encryptedFields 옵션 추가"
```

---

### Task 7: 데모 RTK Query 서비스

**Files:**
- Create: `src/shared/services/cryptoDemoService.ts`
- Modify: `src/redux/api/config.ts`

**Step 1: 파일 작성**

```ts
/**
 * Crypto Demo Service
 *
 * @description
 * axiosBaseQuery의 encryptedFields 연동을 수동 검증하기 위한 데모 서비스.
 * 실제 기능이 아니라 참고/검증용 예시이며, 검증 완료 후 제거해도 무방하다.
 */

import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiConfig } from '@/shared/lib/rtkQuery/createApiConfig';

export const cryptoDemoService = createApi({
  ...createApiConfig({
    reducerPath: 'cryptoDemoService',
    tagTypes: [],
  }),

  endpoints: (builder) => ({
    echoSecret: builder.mutation<{ secret: string }, { secret: string }>({
      query: (body) => ({
        url: '/crypto/echo-demo',
        method: 'POST',
        body,
        encryptedFields: ['secret'],
      }),
    }),
  }),
});

export const { useEchoSecretMutation } = cryptoDemoService;
```

**Step 2: `src/redux/api/config.ts`에 등록**

import 추가:

```ts
import { cryptoDemoService } from '@/shared/services/cryptoDemoService';
```

`API_REGISTRY` 배열에 데모 항목 추가 (Feature APIs 아래):

```ts
  // Demo/Sample APIs (우선순위 90번대)
  { api: cryptoDemoService, priority: 90, name: 'cryptoDemoService' },
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음

**Step 4: 커밋**

```bash
git add src/shared/services/cryptoDemoService.ts src/redux/api/config.ts
git commit -m "feat: 크립토 데모 RTK Query 서비스 추가"
```

---

### Task 8: 데모 페이지 (수동 검증용 UI)

**Files:**
- Create: `src/features/sample/cryptoDemo/sections/CryptoDemoSection.tsx`
- Create: `src/app/sample/crypto-demo/page.tsx`

**Step 1: 섹션 컴포넌트 작성**

```tsx
'use client';

import { useState } from 'react';

import { useEchoSecretMutation } from '@/shared/services/cryptoDemoService';

/**
 * 필드 레벨 JWE 암복호화 수동 검증용 데모 화면
 *
 * @description
 * "secret" 필드를 서버로 보내면 서버가 복호화 후 "echo:" 접두어를 붙여
 * 다시 암호화해 응답한다. 개발자 도구 Network 탭에서 실제 요청/응답 바디에
 * 평문이 아닌 JWE 문자열이 실리는지 확인하는 용도.
 */
export default function CryptoDemoSection() {
  const [input, setInput] = useState('hello-world');
  const [echoSecret, { data, isLoading, error }] = useEchoSecretMutation();

  return (
    <div style={{ padding: 24 }}>
      <h1>JWE 암복호화 데모</h1>
      <p>Network 탭에서 /api/crypto/echo-demo 요청/응답 바디가 JWE 문자열인지 확인하세요.</p>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => echoSecret({ secret: input })} disabled={isLoading}>
        전송
      </button>

      {isLoading && <p>요청 중...</p>}
      {error && <p style={{ color: 'red' }}>에러: {JSON.stringify(error)}</p>}
      {data && <p>복호화된 응답: {data.secret}</p>}
    </div>
  );
}
```

**Step 2: 페이지 작성**

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import CryptoDemoSection from '@/features/sample/cryptoDemo/sections/CryptoDemoSection';

export default function Page() {
  return <CryptoDemoSection />;
}
```

**Step 3: 타입 체크**

```bash
npm run type-check
```

Expected: 에러 없음

**Step 4: 커밋**

```bash
git add src/features/sample/cryptoDemo src/app/sample/crypto-demo
git commit -m "feat: JWE 암복호화 수동 검증용 데모 페이지 추가"
```

---

### Task 9: 수동 검증 (개발 서버 + 브라우저)

**Step 1: 개발 서버 실행**

```bash
npm run dev
```

**Step 2: 데모 페이지 접속**

브라우저(또는 chrome-devtools 도구)로 `http://localhost:3000/sample/crypto-demo` 접속

**Step 3: 확인 항목**

1. "전송" 버튼 클릭 후 화면에 `복호화된 응답: echo:hello-world`가 표시되는지 확인 → 왕복 암복호화가 정상 동작함을 의미
2. 개발자 도구 Network 탭에서 `POST /api/crypto/echo-demo` 요청을 열어:
   - Request Payload의 `secret` 필드가 `eyJ...`로 시작하는 JWE 문자열이고 원문(`hello-world`)이 그대로 보이지 않는지 확인
   - `clientPublicKey` 필드가 JWK 객체로 동봉되어 있는지 확인
   - Response의 `secret` 필드도 JWE 문자열인지 확인 (원문 `echo:hello-world`가 그대로 보이면 안 됨)
3. 콘솔에 에러가 없는지 확인

Expected: 위 3가지 모두 충족

**Step 4: 문제 발생 시**

- `type-check`는 통과했는데 런타임 에러가 나면 `getClientKeyPair`/`getServerPublicKey`가 브라우저 환경(Web Crypto API)에서만 동작함을 확인 (SSR 중 호출되지 않는지 점검)
- MSW가 개발 모드에서 활성화되어 있는지 확인 (`src/mocks/setup/browser.ts` 관련 초기화 로직)

---

### Task 10: 데모 아티팩트 정리 결정

Task 7~8에서 만든 `cryptoDemoService`, 데모 페이지는 검증 목적의 참고 예시다. 검증이 끝나면 다음 중 하나를 선택한다:

- **유지**: 이 프로젝트에 자동화 테스트가 없으므로, 향후 크립토 유틸리티를 수정할 때 회귀 확인용으로 계속 쓸 수 있음. 유지한다면 그대로 커밋 완료 상태로 둔다.
- **제거**: 실제 기능이 아니므로 워크스페이스를 깔끔하게 유지하고 싶다면 Task 7, 8에서 만든 파일을 삭제하고 `API_REGISTRY`, `handlers/index.ts` 등록을 되돌린다.

```bash
# 제거를 선택한 경우
git rm -r src/features/sample/cryptoDemo src/app/sample/crypto-demo src/shared/services/cryptoDemoService.ts
# src/redux/api/config.ts에서 cryptoDemoService 등록 라인 제거
git add src/redux/api/config.ts
git commit -m "chore: JWE 검증용 데모 아티팩트 제거"
```

이 결정은 구현자/리뷰어가 검증 완료 후 판단한다.
