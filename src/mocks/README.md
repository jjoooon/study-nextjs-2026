# Mock Service Worker (MSW) 구조

이 폴더는 MSW (Mock Service Worker)를 사용하여 API 요청을 모킹하는 구조를 포함합니다. 개발 및 테스트 환경에서 실제 백엔드 API 없이 네트워크 요청을 시뮬레이션할 수 있습니다.

## 📁 폴더 구조

```
src/mocks/
├── README.md                    # 이 문서
├── browser.ts                   # 브라우저 worker 별칭 (기존 호환용)
├── server.ts                    # Node.js server 별칭 (기존 호환용)
│
├── setup/                       # MSW 설정 파일
│   ├── browser.ts              # 브라우저 환경 설정 (개발 모드)
│   └── server.ts               # Node.js 환경 설정 (테스트)
│
├── types/                       # 타입 정의
│   └── index.ts                # 공통 타입 (User, Request/Response 등)
│
├── data/                        # Mock 데이터 저장소
│   └── users.ts                # 사용자 Mock 데이터
│
└── handlers/                    # API 핸들러 (도메인별 분리)
    ├── index.ts                # 핸들러 통합
    ├── users.ts                # User API 핸들러
    └── errors.ts               # 에러 시뮬레이션 핸들러
```

## 🚀 시작하기

### 1. 개발 모드에서 사용

개발 모드에서는 MSW가 자동으로 시작됩니다 (`src/app/providers.tsx`):

```typescript
const { worker } = await import('@/mocks/browser');
await worker.start({
  onUnhandledRequest: 'bypass',
});
```

### 2. 테스트에서 사용

Jest 테스트에서는 MSW가 `tests/setup.ts`에서 자동으로 설정됩니다:

```typescript
import { server } from '@/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 📝 새로운 핸들러 추가하기

### 1. 타입 정의 (`types/index.ts`)

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  // ...
}

export interface CreateProductRequest {
  name: string;
  price: number;
  // ...
}
```

### 2. Mock 데이터 생성 (`data/products.ts`)

```typescript
import { Product } from '@/mocks/types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
  },
  // ...
];
```

### 3. 핸들러 작성 (`handlers/products.ts`)

```typescript
import { http, HttpResponse, delay } from 'msw';
import { mockProducts } from '@/mocks/data/products';
import { Product } from '@/mocks/types';

export const productHandlers = [
  // GET /api/products
  http.get('/api/products', async () => {
    await delay(300);
    return HttpResponse.json(mockProducts);
  }),

  // GET /api/products/:id
  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === Number(id));

    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(product);
  }),

  // POST /api/products
  http.post('/api/products', async ({ request }) => {
    const body = await request.json();
    // ... 생성 로직
  }),
];
```

### 4. 핸들러 등록 (`handlers/index.ts`)

```typescript
import { usersHandlers } from './users';
import { errorHandlers } from './errors';
import { productHandlers } from './products';

export const handlers = [
  ...usersHandlers,
  ...errorHandlers,
  ...productHandlers,  // 새 핸들러 추가
];
```

## 🎯 도메인별 분리 규칙

### 파일 명명 규칙

- **핸들러**: `{resource}s.ts` (복수형)
  - 예: `users.ts`, `products.ts`, `orders.ts`
- **타입**: `index.ts` (통합) 또는 `{resource}.ts` (단일)
- **데이터**: `data/{resource}s.ts`
  - 예: `data/users.ts`, `data/products.ts`

### 폴더 구조 확장 예시

프로젝트가 커지면 다음과 같이 확장할 수 있습니다:

```
handlers/
├── users/
│   ├── index.ts
│   ├── queries.ts      # GET 요청
│   └── mutations.ts    # POST, PATCH, DELETE
├── products/
│   ├── index.ts
│   ├── queries.ts
│   └── mutations.ts
└── auth/
    └── index.ts
```

## 🤝 협업 가이드라인

### 1. 도메인 소유권

- 각 핸들러 파일은 특정 팀/피처가 소유합니다
- PR은 도메인 오너가 승인해야 합니다
- 충돌을 방지하기 위해 다른 팀의 핸들러를 수정하지 마세요

### 2. 커밋 컨벤션

```
feat(mock): add product update handler
fix(mock): correct pagination logic
test(mock): add error scenario fixtures
docs(mock): update README with new handlers
```

### 3. 코드 리뷰 체크리스트

- [ ] 타입이 `types/`에 올바르게 정의되었나요?
- [ ] 데이터가 `data/`에 분리되었나요?
- [ ] 핸들러가 `handlers/`에 도메인별로 분리되었나요?
- [ ] 핸들러가 `handlers/index.ts`에 등록되었나요?
- [ ] 네트워크 지연이 적절히 시뮬레이션되었나요? (권장: 200-400ms)
- [ ] 에러 처리가 포함되었나요? (404, 500 등)

## 🔧 유용한 유틸리티

### 네트워크 지연 시뮬레이션

```typescript
import { delay } from 'msw';

// 일반적인 네트워크 요청
await delay(300);

// 느린 네트워크 시뮬레이션
await delay(800);

// 빠른 응답 (테스트용)
await delay(50);
```

### 페이지네이션

```typescript
const page = Number(url.searchParams.get('page')) || 1;
const pageSize = Number(url.searchParams.get('pageSize')) || 10;
const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;
const paginatedData = mockData.slice(startIndex, endIndex);
```

### 에러 응답

```typescript
import { HttpResponse } from 'msw';

// 404 Not Found
HttpResponse.json({ message: 'Not found' }, { status: 404 });

// 500 Internal Server Error
HttpResponse.json({ message: 'Server error' }, { status: 500 });

// 401 Unauthorized
HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
```

## 📚 참고 자료

- [MSW 공식 문서](https://mswjs.io/)
- [MSW 핸들러 API](https://mswjs.io/docs/api/handlers)
- [REST API 모킹 가이드](https://mswjs.io/docs/basics/mocking-rest-requests)

## 🐛 문제 해결

### 핸들러가 작동하지 않음

1. 핸들러가 `handlers/index.ts`에 등록되었는지 확인
2. MSW worker/server가 시작되었는지 확인
3. `onUnhandledRequest: 'bypass'` 설정 확인

### 타입 에러

1. `types/index.ts`에 타입이 정의되었는지 확인
2. import 경로가 정확한지 확인 (`@/mocks/types`)

### 테스트 실패

1. `server.listen()`이 호출되었는지 확인
2. `afterEach`에서 `server.resetHandlers()`가 호출되는지 확인
3. `afterAll`에서 `server.close()`가 호출되는지 확인

---

**마지막 업데이트**: 2025-01-04
**버전**: 2.0.0 (리팩터링)
