# Zod 기본 지식

이 문서는 Zod의 핵심 개념과 프로젝트에서의 사용법을 설명합니다.

## 목차

1. [Zod란?](#zod란)
2. [핵심 개념](#핵심-개념)
3. [기본 스키마](#기본-스키마)
4. [객체 스키마](#객체-스키마)
5. [커스텀 에러 메시지](#커스텀-에러-메시지)
6. [Transformations](#transformations)
7. [프로젝트 적용](#프로젝트-적용)

---

## Zod란?

### 정의

Zod는 **TypeScript-first 스키마 검증 라이브러리**입니다. 런타임 데이터 검증과 TypeScript 타입 추론을 동시에 제공합니다.

### 왜 Zod인가?

**기존 방식의 문제점:**
- ❌ TypeScript는 컴파일 시간에만 작동
- ❌ 런타임에 외부 데이터(API, 폼)가 안전한지 확인 불가
- ❌ PropTypes나 Yup은 별도의 타입 정의 필요

**Zod의 해결책:**
- ✅ TypeScript 타입 자동 추론 (중복 정의 불필요)
- ✅ 런타임 데이터 검증
- ✅ 에러 메시지 자동 생성
- ✅ 복잡한 스키마 조합 가능
- ✅ TypeScript 완벽 지원
- ✅ 가벼움 (번들 크기 작음)

### 프로젝트의 버전

```json
{
  "zod": "^4.3.5"
}
```

**Zod 4.x의 새로운 특징:**
- ✅ 더 나은 TypeScript 타입 추론
- ✅ 개선된 에러 메시지
- ✅ 성능 최적화
- ✅ 새로운 유틸리티 메서드
- ✅ 커스텀 에러 맵 지원

---

## 핵심 개념

### 1. 스키마 정의와 타입 추론

```typescript
import { z } from 'zod';

// 스키마 정의
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

// TypeScript 타입 자동 추론
type Product = z.infer<typeof productSchema>;
// ↑ 별도로 interface를 정의할 필요 없음!

// 사용
const product: Product = {
  id: '1',
  name: '상품',
  price: 10000,
};
```

### 2. 런타임 검증

```typescript
// API 응답 검증
try {
  const validatedProduct = productSchema.parse(apiResponse);
  // ✅ 검증 성공: 타입 안전성 보장
} catch (error) {
  // ❌ 검증 실패: 상세 에러 정보 제공
  console.error(error.errors);
}
```

### 3. 안전한 파싱

```typescript
import { z } from 'zod';

const result = productSchema.safeParse(apiResponse);

if (result.success) {
  // 성공: result.data 사용
  console.log(result.data);
} else {
  // 실패: result.error로 에러 처리
  console.error(result.error.errors);
}
```

---

## 기본 스키마

### 1. 기본 타입

```typescript
// 문자열
z.string();
z.string().min(3); // 최소 3글자
z.string().max(20); // 최대 20글자
z.string().email(); // 이메일 형식
z.string().url(); // URL 형식
z.string().uuid(); // UUID 형식
z.string().regex(/^[a-z]+$/); // 정규식

// 숫자
z.number();
z.number().min(0); // 최소값
z.number().max(100); // 최대값
z.number().int(); // 정수
z.number().positive(); // 양수
z.number().nonnegative(); // 0 이상

// 불리언
z.boolean();

// 날짜
z.date();
z.date().min(new Date('2024-01-01')); // 특정 날짜 이후

// 배열
z.array(z.string());
z.array(z.number()).min(1); // 최소 1개 요소
z.array(z.number()).max(10); // 최대 10개 요소
z.array(z.number()).length(5); // 정확히 5개 요소

// Enum
z.enum(['admin', 'user', 'guest']);

// 리터럴
z.literal('hello');
z.literal(42);
z.literal(true);

// Nullish
z.null();
z.undefined();
z.nullable(z.string()); // string | null
z.optional(z.string()); // string | undefined
z.nullable(z.string().optional()); // string | null | undefined

// Any & Unknown
z.any(); // 모든 값 허용
z.unknown(); // 타입 안전한 모든 값

// Never
z.never(); // 어떤 값도 허용하지 않음

// Void
z.void(); // undefined만 허용
```

### 2. 고급 타입

```typescript
// 유니온 (OR)
z.union([z.string(), z.number()]); // string | number
z.discriminatedUnion('type', [
  z.object({ type: z.literal('a'), a: z.string() }),
  z.object({ type: z.literal('b'), b: z.number() }),
]);

// 인터섹션 (AND)
z.intersection(
  z.object({ name: z.string() }),
  z.object({ age: z.number() })
);
// { name: string } & { age: number }

// 튜플
z.tuple([z.string(), z.number(), z.boolean()]);
// [string, number, boolean]

// 레코드 (Record)
z.record(z.string(), z.number()); // { [key: string]: number }
z.record(z.enum(['a', 'b']), z.string()); // { a: string, b: string }

// Map & Set
z.map(z.string(), z.number()); // Map<string, number>
z.set(z.string()); // Set<string>

// Promise
z.promise(z.string()); // Promise<string>

// Function
z.function(); // Function
z.function().args(z.string(), z.number()).returns(z.boolean());
// (arg1: string, arg2: number) => boolean
```

---

## 객체 스키마

### 기본 객체 스키마

```typescript
import { z } from 'zod';

// 사용자 스키마
const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(0).max(120),
  isActive: z.boolean().default(true),
  role: z.enum(['admin', 'user', 'guest']).default('user'),
  createdAt: z.date().default(() => new Date()),
});

// 타입 추론
type User = z.infer<typeof userSchema>;
```

### 중첩 객체

```typescript
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  tags: z.array(z.string()),
});

type Product = z.infer<typeof productSchema>;
```

### 선택적 필드

```typescript
const schema = z.object({
  // 항상 필요
  requiredField: z.string(),

  // 선택적 (undefined 가능)
  optionalField: z.string().optional(),

  // Null 허용
  nullableField: z.string().nullable(),

  // 둘 다 허용
  nullishField: z.string().nullish(),
});
```

### 확장과 병합

```typescript
// 기본 스키마
const baseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
});

// 확장
const userSchema = baseSchema.extend({
  name: z.string(),
  email: z.string(),
});

// 병합
const schemaA = z.object({ a: z.string() });
const schemaB = z.object({ b: z.number() });
const mergedSchema = schemaA.merge(schemaB);
// { a: string, b: number }
```

### Partial & Required & Pick

```typescript
// Partial (모든 필드를 선택적으로)
const partialUserSchema = userSchema.partial();

// Required (모든 필드를 필수로)
const requiredUserSchema = userSchema.required();

// Pick (특정 필드만)
const pickedSchema = userSchema.pick(['name', 'email']);

// Omit (특정 필드 제외)
const omittedSchema = userSchema.omit(['password']);
```

---

## 커스텀 에러 메시지

### 기본 에러 메시지

```typescript
const schema = z.object({
  name: z.string().min(3, '이름은 최소 3글자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  age: z.number().min(0, '나이는 0 이상이어야 합니다'),
});
```

### refine로 커스텀 검증

```typescript
const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8글자 이상이어야 합니다')
  .refine((password) => /[A-Z]/.test(password), {
    message: '비밀번호에 최소 1개의 대문자가 포함되어야 합니다',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: '비밀번호에 최소 1개의 숫자가 포함되어야 합니다',
  });

const schema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'], // 에러 위치 지정
});
```

### superRefine으로 복잡한 검증

```typescript
const schema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.startDate > data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '종료일은 시작일 이후여야 합니다',
        path: ['endDate'],
      });
    }
  });
```

---

## Transformations

### transform으로 데이터 변환

```typescript
// 문자열을 숫자로 변환
const schema = z.string().transform((val) => parseInt(val, 10));

// 소문자로 변환
const emailSchema = z
  .string()
  .email()
  .transform((val) => val.toLowerCase());

// 날짜 문자열을 Date 객체로
const dateSchema = z
  .string()
  .transform((val) => new Date(val));

// 파이프라인
const schema = z
  .string()
  .transform((val) => val.trim())
  .transform((val) => val.toLowerCase());
```

### 객체 변환

```typescript
// 입력 스키마 (API 응답)
const inputSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  age: z.string(),
});

// 출력 스키마 (내부 사용)
const outputSchema = inputSchema.transform((data) => ({
  fullName: `${data.first_name} ${data.last_name}`,
  age: parseInt(data.age, 10),
}));

type OutputUser = z.infer<typeof outputSchema>;
// { fullName: string, age: number }
```

### 출력 입력 분리

```typescript
// 입력 (받아들일 데이터)
const inputSchema = z.object({
  name: z.string(),
  birthDate: z.string(), // "2000-01-01"
});

// 스키마 변환
const schema = inputSchema.transform((data) => ({
  name: data.name,
  birthDate: new Date(data.birthDate),
}));

// 출력 (사용할 데이터)
type OutputData = z.output<typeof schema>;
// { name: string, birthDate: Date }
```

---

## 프로젝트 적용

### 1. 환경 변수 검증

프로젝트에서 이미 사용 중인 Zod 환경 변수 검증:

```typescript
// shared/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Node.js 환경
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // 애플리케이션 설정
  NEXT_PUBLIC_API_URL: z.string().url().default('/api'),
  NEXT_PUBLIC_API_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default(10000),
});

// 검증 및 파싱
const config = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // ...
});

export const publicConfig = {
  apiUrl: config.NEXT_PUBLIC_API_URL,
  apiTimeout: config.NEXT_PUBLIC_API_TIMEOUT,
};
```

### 2. API 응답 검증

```typescript
// features/products/types/product.ts
import { z } from 'zod';

// 상품 스키마
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string(),
  imageUrl: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 상품 목록 스키마
export const productsListSchema = z.array(productSchema);

// 타입 추론
export type Product = z.infer<typeof productSchema>;
export type ProductsList = z.infer<typeof productsListSchema>;

// API 응답 검증 함수
export function validateProduct(data: unknown): Product {
  return productSchema.parse(data);
}

export function validateProductsList(data: unknown): ProductsList {
  return productsListSchema.parse(data);
}

// 안전한 검증 함수
export function safeValidateProduct(data: unknown) {
  return productSchema.safeParse(data);
}
```

### 3. 폼 데이터 검증 (React Hook Form + Zod)

```typescript
// features/products/components/ProductForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 스키마 정의
const productFormSchema = z.object({
  name: z
    .string()
    .min(1, '상품명을 입력해주세요')
    .max(100, '상품명은 100글자 이하여야 합니다'),
  description: z.string().optional(),
  price: z
    .number({ invalid_type_error: '가격을 입력해주세요' })
    .positive('가격은 0보다 커야 합니다'),
  category: z.enum(['electronics', 'clothing', 'food', 'other'], {
    required_error: '카테고리를 선택해주세요',
  }),
  imageUrl: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
});

// 타입 추론
type ProductFormData = z.infer<typeof productFormSchema>;

// React Hook Form과 함께 사용
export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    // data는 이미 검증된 타입 안전한 데이터
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input type="number" {...register('price', { valueAsNumber: true })} />
      {errors.price && <span>{errors.price.message}</span>}

      <button type="submit">제출</button>
    </form>
  );
}
```

### 4. MSW Mock 데이터 검증

```typescript
// mocks/handlers/products.ts
import { z } from 'zod';
import { productSchema } from '@/features/products/types/product';

// Mock 데이터 생성 함수
function createMockProduct(overrides?: Partial<Product>): Product {
  const mockData = {
    id: '1',
    name: '테스트 상품',
    price: 10000,
    category: 'electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };

  // 스키마 검증
  return productSchema.parse(mockData);
}

// Mock 핸들러
export const productsHandlers = [
  http.get('/api/products', () => {
    const mockProducts = [
      createMockProduct({ id: '1', name: '상품 1' }),
      createMockProduct({ id: '2', name: '상품 2' }),
    ];

    return HttpResponse.json(mockProducts);
  }),
];
```

### 5. Zod 4.x 고급 패턴

#### discriminateUnion (판별된 유니온)

```typescript
// Zod 3.x+의 discriminatedUnion
const eventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('click'),
    x: z.number(),
    y: z.number(),
  }),
  z.object({
    type: z.literal('keydown'),
    key: z.string(),
  }),
  z.object({
    type: z.literal('scroll'),
    scrollTop: z.number(),
  }),
]);

type Event = z.infer<typeof eventSchema>;
/*
type Event =
  | { type: 'click'; x: number; y: number; }
  | { type: 'keydown'; key: string; }
  | { type: 'scroll'; scrollTop: number; }
*/

// 타입 안전한 처리
function handleEvent(event: Event) {
  if (event.type === 'click') {
    console.log(`Clicked at ${event.x}, ${event.y}`);
  } else if (event.type === 'keydown') {
    console.log(`Key pressed: ${event.key}`);
  } else {
    console.log(`Scrolled to ${event.scrollTop}`);
  }
}
```

#### passthrough (통과 검증)

```typescript
// 데이터 검증 후 원본 데이터 유지
const schema = z.object({
  name: z.string(),
  age: z.number(),
  metadata: z.passthrough(z.record(z.unknown())), // 추가 필드 허용
});

const result = schema.parse({
  name: 'John',
  age: 30,
  metadata: { extra: 'data', count: 10 }, // 유지됨
});
```

#### readonly와 shallow (Zod 3.x+)

```typescript
// 읽기 전용 스키마
const readonlySchema = z.object({
  id: z.string(),
  items: z.array(z.object({
    name: z.string(),
  })).readonly(),
}).readonly();

// 얕은 readonly (depth: 1만)
const shallowReadonlySchema = z.object({
  id: z.string(),
  items: z.array(z.object({
    name: z.string(),
  })),
}).readonly();
```

#### async/refine 결합 (비동기 검증)

```typescript
const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
}).refine(
  async (data) => {
    // 비동기로 중복 검사
    const exists = await checkUserExists(data.email);
    return !exists;
  },
  {
    message: '이미 등록된 이메일입니다',
    path: ['email'],
  }
);

async function checkUserExists(email: string): Promise<boolean> {
  // DB 조회 로직
  return false;
}
```

#### 재귀적 스키마 (Recursive Schema)

```typescript
// Zod 3.x+의 재귀적 스키마
const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  subcategories: z.lazy(() => z.array(categorySchema)),
});

type Category = z.infer<typeof categorySchema>;
/*
type Category = {
  id: string;
  name: string;
  subcategories: Category[];
}
*/
```

---

## 요약

### Zod 핵심 개념

1. **스키마 정의**: 데이터 구조 명시
2. **타입 추론**: TypeScript 타입 자동 생성
3. **런타임 검증**: parse()로 데이터 검증
4. **에러 처리**: 상세한 에러 정보 제공
5. **Transform**: 데이터 변환 가능
6. **React Hook Form과 통합**: 폼 검증에 사용

### 프로젝트 적용 가이드

- **환경 변수**: .env 검증
- **API 응답**: 외부 데이터 검증
- **폼 데이터**: React Hook Form과 통합
- **Mock 데이터**: MSW 데이터 검증

### 다음 학습 단계

1. [Redux Toolkit 기본 지식](./redux-toolkit-fundamentals.md) - 상태 관리
2. [RTK Query 기본 지식](./rtk-query-fundamentals.md) - 데이터 페칭

---

## 참고 자료

- [Zod 공식 문서](https://zod.dev/)
- [Zod GitHub](https://github.com/colinhacks/zod)
- [React Hook Form + Zod](https://react-hook-form.com/get-started#SchemaValidation)
