# TypeScript 기본 지식

이 문서는 현재 프로젝트를 이해하기 위해 필요한 TypeScript의 핵심 개념과 Next.js App Router 환경에서의 사용법을 설명합니다.

> **학습 가이드**: 이 문서는 기본부터 고급까지 다룹니다. 초보자는 [기본 타입](#기본-타입)부터 시작하고, 경험이 있는 개발자는 [유틸리티 타입](#유틸리티-타입)이나 [고급 주제](#declare와-타입-정의)로 바로 이동하세요.

## 목차

1. [TypeScript란 무엇인가?](#typescript란-무엇인가)
2. [기본 타입](#기본-타입)
3. [Enum 타입](#enum-타입)
4. [Declare와 타입 정의](#declare와-타입-정의)
5. [인터페이스와 타입](#인터페이스와-타입)
6. [함수 타입](#함수-타입)
7. [클래스와 타입](#클래스와-타입)
8. [제네릭](#제네릭)
9. [타입 추론과 타입 단언](#타입-추론과-타입-단언)
10. [유틸리티 타입](#유틸리티-타입)
11. [React와 TypeScript](#react와-typescript)
12. [프로젝트 설정](#프로젝트-설정)

---

## TypeScript란 무엇인가?

### 정의

TypeScript는 Microsoft에서 개발한 **JavaScript의 상위집합(Superset) 언어**로, 정적 타이핑과 객체 지향 프로그래밍 기능을 추가합니다.

### 핵심 특징

1. **정적 타이핑 (Static Typing)**
   - 컴파일 시점에 타입 에러 발견
   - 코드 자동완성 및 리팩토링 지원
   - 안정적인 코드 작성 가능

2. **JavaScript 상위집합**
   - 기존 JavaScript 코드는 그대로 사용 가능
   - 점진적 도입 가능 (JavaScript → TypeScript)
   - 최신 JS 문법 지원

3. **강력한 도구 지원**
   - VS Code, WebStorm 등 IDE와의 완벽한 통합
   - IntelliSense, 자동 import, 리팩토링 지원

4. **최신 표준 준수**
   - ECMAScript 표준을 따름
   - 최신 JavaScript 기능을 빠르게 지원

### 프로젝트의 TypeScript 버전

```json
{
  "typescript": "^5.7.3"
}
```

**TypeScript 5.7의 주요 특징:**
- ✅ `NoInfer` 유틸리티 타입 개선 (타입 추론 제어)
- ✅ 조건부 타입 관련 에러 메시지 개선
- ✅ `--moduleResolution bundler` 기본값 변경
- ✅ 성능 및 안정성 개선

> **참고**: TypeScript 5.7의 구체적인 변경사항은 [공식 릴리스 노트](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/)를 확인하세요.

### TypeScript vs JavaScript

| 특징 | JavaScript | TypeScript |
|------|-----------|-----------|
| **타입 시스템** | 동적 타이핑 | 정적 타이핑 |
| **에러 발견** | 런타임 | 컴파일 시점 |
| **IDE 지원** | 기본 | 우수 |
| **학습 곡선** | 낮음 | 중간 |
| **코드량** | 적음 | 많음 (타입 정의) |
| **생산성** | 소규모에 적합 | 대규모에 적합 |

### TypeScript 사용 권장 패턴

| 상황 | 권장 방식 | 대안 |
|------|-----------|------|
| 상수 값 집합 | `as const` 객체 또는 유니온 타입 | Enum (특수한 경우만) |
| 런타임 검증 | Zod 등 스키마 라이브러리 | `as` 타입 단언 (지양) |
| null 체크 | 타입 가드 (`if (x !== null)`) | `!` 비-null 단언 (지양) |
| 타입 검증 | `satisfies` 연산자 | 타입 단언 `as` |
| 함수 컴포넌트 | 함수 선언식 | `React.FC` (지양) |
| SSR 안전성 | `typeof window !== 'undefined'` 체크 | 직접 사용 (에러 발생) |

---

## 기본 타입

### 원시 타입 (Primitive Types)

```typescript
// 1. 문자열 (string)
let name: string = "홍길동";
let greeting: string = `안녕하세요, ${name}님!`;

// 2. 숫자 (number)
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 3. 불리언 (boolean)
let isActive: boolean = true;
let hasPermission: boolean = false;

// 4. undefined와 null
let undefinedValue: undefined = undefined;
let nullValue: null = null;

// 5. symbol (ES6)
let symbol1: symbol = Symbol('id');
let symbol2: symbol = Symbol.for('id');

// 6. bigint (ES2020)
let bigNumber: bigint = 100n;
let anotherBigNumber: bigint = BigInt(100);
```

### 특수 타입

```typescript
// 1. any: 모든 타입 허용 (타입 검사 안 함)
let anything: any = 42;
anything = "문자열도 가능";
anything = { id: 1, name: "홍길동" };

// ⚠️ 주의: any는 최후의 수단으로만 사용
function processValue(value: any) {
  // 타입 검사가 우회됨
  return value.someMethod(); // 런타임 에러 가능성
}

// 2. unknown: any의 타입 안전한 버전
let value: unknown = 42;

// 사용 전 타입 확인 필요
if (typeof value === "number") {
  console.log(value * 2); // ✅ 안전
}

// ❌ 컴파일 에러
// value.someMethod();

// 3. void: 반환값이 없는 함수
function log(message: string): void {
  console.log(message);
}

// 4. never: 절대 발생하지 않는 값
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // 무한 루프
  }
}

// 5. object: 비원시 타입
let user: object = { id: 1, name: "홍길동" };

// ⚠️ 주의: object는 null, array도 포함
```

### 배열과 튜플

```typescript
// 1. 배열 타입
// 방법 1: 타입[]
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: string[] = ["a", "b", "c"];

// 방법 2: Array<타입>
let moreNumbers: Array<number> = [1, 2, 3];
let matrix: number[][] = [[1, 2], [3, 4]];

// 2. 튜플 (Tuple): 고정된 길이와 타입 순서
let tuple: [string, number] = ["홍길동", 25];
// tuple[0]은 string, tuple[1]은 number

// named tuple (TypeScript 4.0+)
let user: [name: string, age: number] = ["홍길동", 25];

// 3. readonly 배열
const readOnlyNumbers: readonly number[] = [1, 2, 3];
// readOnlyNumbers.push(4); // ❌ 에러

const readOnlyTuple: readonly [string, number] = ["a", 1];
// readOnlyTuple[0] = "b"; // ❌ 에러

// 4. mixed 타입 배열
let mixedArray: (string | number)[] = [1, "two", 3, "four"];
```

### 객체 타입

```typescript
// 1. 기본 객체 타입
let user: {
  id: number;
  name: string;
  email?: string; // 선택적 프로퍼티
} = {
  id: 1,
  name: "홍길동",
  // email은 선택적이므로 생략 가능
};

// 2. 읽기 전용 프로퍼티
let config: {
  readonly apiUrl: string;
  readonly timeout: number;
} = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

// config.apiUrl = "new-url"; // ❌ 에러

// 3. 인덱스 시그니처
let dictionary: {
  [key: string]: string | number;
} = {
  name: "홍길동",
  age: 25,
  city: "서울",
};

// 4. 봉인된 객체 (Excess Property Checks)
type User = {
  name: string;
  email: string;
};

// ✅ 올바른 사용
const user1: User = {
  name: "홍길동",
  email: "hong@example.com",
};

// ❌ 에러: 초과 프로퍼티
// const user2: User = {
//   name: "홍길동",
//   email: "hong@example.com",
//   age: 25, // User 타입에 없는 프로퍼티
// };
```

---

## Enum 타입

> **⚠️ 권장 사항**: 대부분의 경우 **문자열 리터럴 타입** 또는 **`as const` 객체**를 사용하는 것이 좋습니다.
>
> ```typescript
> // ✅ 권장: 문자열 리터럴 타입
> type Status = 'pending' | 'approved' | 'rejected';
>
> // ✅ 권장: as const 객체
> const Status = {
>   Pending: 'pending',
>   Approved: 'approved',
>   Rejected: 'rejected',
> } as const;
>
> // ⚠️ Enum은 다음 경우에만 고려하세요:
> // - 비트 플래그 패턴이 필요할 때
> // - 역방향 접근(숫자 → 이름)이 필요할 때
> // - 기존 코드베이스와의 호환성이 필요할 때
> ```

Enum(Enumerated Type)은 이름이 있는 상수들의 집합을 정의하는 타입입니다. enum을 사용하면 의미 있는 이름을 부여하여 코드의 가독성과 안전성을 높일 수 있습니다.

### 숫자형 Enum (Numeric Enum)

```typescript
// 1. 기본 숫자형 enum
enum Direction {
  Up,    // 0 (자동 할당)
  Down,  // 1
  Left,  // 2
  Right, // 3
}

// 사용
let move: Direction;
move = Direction.Up;    // 0
move = Direction.Right; // 3

// 역방향 접근 (숫자로 이름 접근)
console.log(Direction[0]); // "Up"
console.log(Direction[1]); // "Down"

// 2. 초기값 설정
enum Status {
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

// 3. 사용자 지정 값
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

// 4. 계산된 값 (Computed Values)
enum FileAccess {
  // 상수 멤버
  None,
  Read = 1 << 1,    // 2 (비트 시프트)
  Write = 1 << 2,   // 4
  ReadWrite = Read | Write, // 6 (비트 OR 연산)
  // 계산된 멤버 뒤에는 초기화되지 않은 멤버가 올 수 없음
  // G = '123'.length, // ❌ 에러
}
```

### 문자형 Enum (String Enum)

```typescript
// 1. 기본 문자형 enum
enum Colors {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

// 2. 혼합 enum (권장하지 않음)
enum MixedEnum {
  No = 0,
  Yes = 'YES',
}

// ⚠️ 주의: 문자형 enum은 역방향 접근이 불가능
// Colors['RED'] // ❌ 에러
```

### const Enum

```typescript
// 1. const enum 선언
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}

// 2. 사용 (컴파일 시 인라인화됨)
let dir = Directions.Up; // 컴파일 결과: let dir = 0

// 3. 일반 enum과 const enum의 차이
// 일반 enum:
enum RegularEnum {
  A = 1,
}

// 컴파일 결과:
// var RegularEnum;
// (function (RegularEnum) {
//   RegularEnum[RegularEnum["A"] = 1] = "A";
// })(RegularEnum || (RegularEnum = {}));

// const enum:
const enum ConstEnum {
  A = 1,
}

// 컴파일 결과:
// var x = 1; // 완전히 인라인화됨
```

### Enum 멤버 유형

```typescript
// 1. 상수 멤버 (Constant Members)
enum ConstantEnum {
  // 1. 초기화자가 없는 첫 번째 멤버 = 0
  A,
  // 2. 초기화자가 없고 숫자형 상수 멤버가 앞에 있는 경우 = 이전 값 + 1
  B,
  C = 5,
  D = 5 + 3, // 8
  // 3. enum 상수 멤버 참조
  E = C, // 5
  // 4. 괄호로 감싼 상수 표현식
  F = 'test'.length, // 4
}

// 2. 계산된 멤버 (Computed Members)
// 런타임에 계산되는 표현식
enum ComputedEnum {
  A = Math.random(),
  B = 'test'.length,
  C = ['a', 'b', 'c'].length,
}
// ⚠️ 계산된 멤버 뒤에는 초기화되지 않은 멤버가 올 수 없음
// enum ErrorEnum {
//   A = Math.random(),
//   B, // ❌ 에러: 계산된 멤버 뒤에 초기화되지 않은 멤버
// }
```

### Enum과 유니온 타입

```typescript
// 1. enum을 유니온 타입처럼 사용
enum Status {
  Pending,
  Approved,
  Rejected,
}

type StatusKeys = Status.Pending | Status.Approved | Status.Rejected;

function handleStatus(status: StatusKeys) {
  switch (status) {
    case Status.Pending:
      console.log('대기 중');
      break;
    case Status.Approved:
      console.log('승인됨');
      break;
    case Status.Rejected:
      console.log('거부됨');
      break;
  }
}

// 2. enum 기반 타입 좁히기 (Type Narrowing)
enum Color {
  Red,
  Green,
  Blue,
}

function getColorName(color: Color): string {
  switch (color) {
    case Color.Red:
      return '빨간색';
    case Color.Green:
      return '초록색';
    case Color.Blue:
      return '파란색';
    // ⚠️ 모든 케이스를 처리하면 TypeScript가 자동으로 추론
    // default:
    //   return '알 수 없음';
  }
}
```

### Ambient Enum

```typescript
// 1. declare enum (정의만 하고 구현은 없음)
declare enum AmbientEnum {
  A = 1,
  B = 2,
  C = 3,
}

// 사용 (런타임에 정의되어 있다고 가정)
let x = AmbientEnum.A;

// 2. 사용 사례: 전역 변수로 정의된 enum
// window.js 에서:
// window.MyEnum = { A: 1, B: 2 };

// TypeScript에서:
declare enum MyEnum {
  A,
  B,
}
```

### 고급 Enum 패턴

```typescript
// 1. Enum 메서드 추가
enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

namespace LogLevel {
  export function toString(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return 'DEBUG';
      case LogLevel.INFO:
        return 'INFO';
      case LogLevel.WARN:
        return 'WARN';
      case LogLevel.ERROR:
        return 'ERROR';
    }
  }

  export function fromString(str: string): LogLevel {
    switch (str.toUpperCase()) {
      case 'DEBUG':
        return LogLevel.DEBUG;
      case 'INFO':
        return LogLevel.INFO;
      case 'WARN':
        return LogLevel.WARN;
      case 'ERROR':
        return LogLevel.ERROR;
      default:
        return LogLevel.INFO;
    }
  }
}

// 사용
const level: LogLevel = LogLevel.INFO;
console.log(LogLevel.toString(level)); // "INFO"

// 2. Enum과 객체 매핑
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.Admin]: ['read', 'write', 'delete'],
  [UserRole.User]: ['read', 'write'],
  [UserRole.Guest]: ['read'],
};

function getPermissions(role: UserRole): string[] {
  return rolePermissions[role];
}

// 3. Enum 플래그 패턴 (비트 플래그)
enum FilePermission {
  None = 0,
  Read = 1 << 0,      // 1 (0001)
  Write = 1 << 1,     // 2 (0010)
  Execute = 1 << 2,   // 4 (0100)
  All = Read | Write | Execute, // 7 (0111)
}

// 비트 연산으로 조합
let myPermissions: FilePermission = FilePermission.Read | FilePermission.Write;

// 권한 확인
function hasPermission(permissions: FilePermission, flag: FilePermission): boolean {
  return (permissions & flag) === flag;
}

if (hasPermission(myPermissions, FilePermission.Read)) {
  console.log('읽기 권한 있음');
}

// 권한 추가
myPermissions |= FilePermission.Execute; // 읽기 + 쓰기 + 실행

// 권한 제거
myPermissions &= ~FilePermission.Write; // 읽기 + 실행만 남음

// 4. Enum과 문자열 리터럴 타입 결합
enum ApiEndpoint {
  Users = '/api/users',
  Products = '/api/products',
  Orders = '/api/orders',
}

type ApiEndpoints = `${ApiEndpoint}`;

function fetchFromApi(endpoint: ApiEndpoints): Promise<any> {
  return fetch(endpoint).then(res => res.json());
}

// 사용
fetchFromApi(ApiEndpoint.Users);
```

### Enum vs 문자열 리터럴 타입

```typescript
// 1. Enum 장점
// - 이름 충돌 방지 (네임스페이스 제공)
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
}

// - 리팩토링 용이
// - IDE 자동완성 지원
// - 타입 안정성

// 2. 문자열 리터럴 타입 장점
type DirectionLiteral = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// - 더 간결한 코드
// - enum보다 가벼움 (번들 크기 감소)
// - union 타입과의 호환성

// 3. 선택 가이드
// ✅ Enum 사용:
// - 관련된 상수들이 그룹으로 필요할 때
// - 리팩토링이 자주 필요한 경우
// - 역방향 접근이 필요할 때 (숫자형 enum)
// - 비트 플래그 패턴이 필요할 때

// ✅ 문자열 리터럴 타입 사용:
// - 단순한 값 제한이 필요할 때
// - 번들 크기를 최적화해야 할 때
// - union 타입과 자주 결합할 때
```

### 실전 사용 예시

```typescript
// 1. API 상태 코드 관리
enum ApiStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

interface ApiResponse<T> {
  status: ApiStatus;
  data?: T;
  error?: string;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  return {
    status: ApiStatus.Loading,
  };
}

// 2. 사용자 권한 관리
enum Permission {
  // 사용자 관리
  CreateUser = 'create_user',
  ReadUser = 'read_user',
  UpdateUser = 'update_user',
  DeleteUser = 'delete_user',

  // 게시물 관리
  CreatePost = 'create_post',
  ReadPost = 'read_post',
  UpdatePost = 'update_post',
  DeletePost = 'delete_post',

  // 관리자 기능
  ManageUsers = 'manage_users',
  ManageSettings = 'manage_settings',
}

interface Role {
  name: string;
  permissions: Permission[];
}

const adminRole: Role = {
  name: 'Admin',
  permissions: [
    Permission.CreateUser,
    Permission.ReadUser,
    Permission.UpdateUser,
    Permission.DeleteUser,
    Permission.ManageUsers,
    Permission.ManageSettings,
  ],
};

function hasPermission(role: Role, permission: Permission): boolean {
  return role.permissions.includes(permission);
}

// 3. 애플리케이션 환경 설정
enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

class AppConfig {
  constructor(private env: Environment) {}

  get apiUrl(): string {
    switch (this.env) {
      case Environment.Development:
        return 'http://localhost:3000';
      case Environment.Staging:
        return 'https://staging.example.com';
      case Environment.Production:
        return 'https://api.example.com';
    }
  }

  get isProduction(): boolean {
    return this.env === Environment.Production;
  }
}

// 4. UI 상태 관리 (React에서의 사용)
enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
  Ghost = 'ghost',
}

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
}

export function Button({ variant, children }: ButtonProps) {
  const className = `btn btn-${variant}`;
  return <button className={className}>{children}</button>;
}

// 사용
<Button variant={ButtonVariant.Primary}>클릭하세요</Button>

// 5. 정렬 옵션
enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

enum SortField {
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

interface SortOptions {
  field: SortField;
  order: SortOrder;
}

function sortUsers(users: User[], options: SortOptions): User[] {
  return [...users].sort((a, b) => {
    const aValue = a[options.field];
    const bValue = b[options.field];

    if (options.order === SortOrder.Ascending) {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

// 사용
const sortedUsers = sortUsers(users, {
  field: SortField.Name,
  order: SortOrder.Ascending,
});
```

### Enum 사용 시 주의사항

```typescript
// 1. ⚠️ enum 값 직접 할당 주의
enum Status {
  Pending = 1,
  Approved = 2,
}

// ❌ 문제: 숫자가 자동으로 enum 멤버로 인식됨
let status: Status = 1; // Status.Pending으로 처리됨
status = 999; // 타입 에러 없이 할당됨

// ✅ 해결: 문자형 enum 사용
enum StringStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
}

let strStatus: StringStatus = 'PENDING'; // StringStatus.Pending
// strStatus = 'INVALID'; // ❌ 타입 에러

// 2. ⚠️ 역방향 접근 주의
enum NumericEnum {
  A = 1,
  B = 2,
}

console.log(NumericEnum[1]); // "A"
console.log(NumericEnum[2]); // "B"

// 문제: 값과 이름이 충돌할 수 있음
enum ConflictingEnum {
  A = 0,
  B = 1,
  C = 2,
  '0' = 'ZERO', // ⚠️ 충돌 가능
}

// 3. ⚠️ const enum의 import 문제
// some.ts
export const enum ConstEnum {
  A = 1,
}

// other.ts (isolatedModules: true인 경우)
import { ConstEnum } from './some';
let x = ConstEnum.A; // ❌ 에러 발생 가능

// ✅ 해결: 일반 enum 사용
export enum RegularEnum {
  A = 1,
}

// 4. ✅ enum 사용 권장 사례
// - 관련된 상수들을 그룹화할 때
// - 리팩토링이 자주 필요한 경우
// - 비트 플래그 패턴이 필요할 때
// - 역방향 접근이 필요할 때

// 5. ✅ 문자열 리터럴 타입 사용 권장 사례
// - 단순한 값 제한만 필요할 때
// - 번들 크기 최적화가 중요할 때
// - union 타입과 자주 결합할 때
```

---

## Declare와 타입 정의

`declare` 키워드는 TypeScript 컴파일러에게 특정 변수, 함수, 클래스 등이 존재한다는 것을 알려주지만, 실제 구현은 컴파일 결과에 포함하지 않도록 합니다. 주로 JavaScript 라이브러리나 외부 모듈에 타입 정보를 제공할 때 사용합니다.

### Declare 기본 개념

```typescript
// 1. declare 키워드의 목적
// - JavaScript 코드에 타입 정보 추가
// - 런타임 코드 생성 없이 타입 검사만 수행
// - 외부 라이브러리 타이핑

// 2. 기본 사용법
declare const API_URL: string;
declare function fetchData(url: string): Promise<any>;
declare class MyClass {
  constructor(value: number);
  getValue(): number;
}

// 사용
console.log(API_URL); // 런타임에 존재해야 함
const data = await fetchData('https://api.example.com');
const instance = new MyClass(42);
```

### Declare 변수와 함수

```typescript
// 1. declare 변수
// 전역 변수 선언 (window 객체 등)
declare const VERSION: string;
declare let debugMode: boolean;
declare var globalConfig: {
  apiUrl: string;
  timeout: number;
};

// 2. declare 함수
declare function log(message: string): void;
declare function parseJson(json: string): unknown;
declare async function fetchUser(id: number): Promise<User>;

// 3. 오버로드 함수 선언
declare function createElement(tag: 'div'): HTMLDivElement;
declare function createElement(tag: 'span'): HTMLSpanElement;
declare function createElement(tag: 'a'): HTMLAnchorElement;
declare function createElement(tag: string): HTMLElement;

// 사용
const div = createElement('div'); // HTMLDivElement
const span = createElement('span'); // HTMLSpanElement

// 4. 화살표 함수는 declare 사용 불가
// ❌ 에러
// declare const arrowFunc = () => void;

// ✅ 함수 표현식 사용
declare const arrowFunc: () => void;
```

### Declare 클래스

```typescript
// 1. 기본 클래스 선언
declare class Animal {
  name: string;
  constructor(name: string);
  speak(): void;
  static getSpecies(): string;
}

// 2. 추상 클래스 선언
declare abstract class Shape {
  abstract getArea(): number;
  toString(): string;
}

// 3. 제네릭 클래스 선언
declare class Storage<T> {
  private items: T[];
  addItem(item: T): void;
  getItem(index: number): T;
}

// 사용
const stringStorage = new Storage<string>();
```

### Declare Enum

```typescript
// 1. Ambient Enum (선언만 있는 enum)
declare enum HttpStatus {
  OK = 200,
  NotFound = 404,
  Error = 500,
}

// 2. 사용 사례: 서버에서 정의된 enum
// 서버 코드 (JavaScript):
// const Color = { Red: 0, Green: 1, Blue: 2 };

// 클라이언트 타입 정의:
declare enum Color {
  Red,
  Green,
  Blue,
}

// 사용
let c: Color = Color.Red;
```

### Declare Namespace

```typescript
// 1. 네임스페이스 선언
declare namespace MyLibrary {
  function init(): void;
  class Utility {
    helper(): string;
  }
  interface Options {
    debug: boolean;
    version: string;
  }
}

// 사용
MyLibrary.init();
const util = new MyLibrary.Utility();
const options: MyLibrary.Options = {
  debug: true,
  version: '1.0.0',
};

// 2. 중첩 네임스페이스
declare namespace Utils {
  export namespace String {
    export function capitalize(str: string): string;
    export function lowercase(str: string): string;
  }
  export namespace Number {
    export function round(num: number): number;
    export function floor(num: number): number;
  }
}

// 사용
Utils.String.capitalize('hello'); // "Hello"
Utils.Number.round(3.7); // 4
```

### Declare Module

```typescript
// 1. 모듈 선언 (module.d.ts)
declare module 'my-library' {
  export function initialize(): void;
  export class MyClass {
    constructor();
    method(): string;
  }
  export interface Options {
    debug?: boolean;
  }
}

// 2. 모듈 확장 (기존 모듈에 타입 추가)
declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

// 사용 (Express 요청)
app.get('/profile', (req, res) => {
  console.log(req.user?.id); // 이제 타입 안전함
});

// 3. 전역 모듈 선언
declare module '*';
declare module '*.css';
declare module '*.png';
declare module '*.svg';

// 4. 모듈의 특정 export만 선언
declare module 'lodash' {
  export function debounce(func: Function, wait: number): Function;
  export function throttle(func: Function, limit: number): Function;
}
```

### Declare Global

```typescript
// 1. 전역 변수 확장
declare global {
  interface Window {
    myCustomProperty: string;
    myApp: {
      version: string;
      config: Record<string, any>;
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      MY_CUSTOM_ENV: string;
      DATABASE_URL: string;
    }
  }
}

// 사용
window.myCustomProperty = 'value';
window.myApp.version = '1.0.0';
process.env.MY_CUSTOM_ENV = 'development';

// 2. 전역 함수 추가
declare global {
  function myGlobalFunction(): void;
  const MY_GLOBAL_CONSTANT: number;
}

// ⚠️ 주의: declare global은 외부 모듈에서만 사용 가능
// (파일에 import나 export가 있어야 함)
export {};
```

### Declare 파일 구조

```typescript
// 1. .d.ts 파일의 구조
// types/index.d.ts

// 전역 타입 선언
declare interface MyGlobalInterface {
  id: string;
  name: string;
}

// 전역 변수
declare const MY_GLOBAL: MyGlobalInterface;

// 모듈 선언
declare module 'my-module' {
  export function doSomething(): void;
  export class MyClass {
    constructor();
    method(): string;
  }
}

// 2. 여러 .d.ts 파일 구성
// types/global.d.ts - 전역 타입
// types/express.d.ts - Express 확장
// types/utils.d.ts - 유틸리티 함수
// types/index.d.ts - 모든 타입 모음

// types/index.d.ts
/// <reference path="global.d.ts" />
/// <reference path="express.d.ts" />
/// <reference path="utils.d.ts" />
```

### Declare와 타입 정의 파일

```typescript
// 1. @types 패키지 구조
// @types/node/index.d.ts
declare module 'node' {
  export interface Buffer {
    // ...
  }
  export function readFile(path: string): Buffer;
}

// 2. 프로젝트 내 타입 정의
// src/types/custom.d.ts

// 전역으로 사용할 타입
declare namespace MyApp {
  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
  }

  type UserRole = 'admin' | 'user' | 'guest';

  enum Status {
    Pending = 'pending',
    Approved = 'approved',
    Rejected = 'rejected',
  }
}

// 사용
const user: MyApp.User = {
  id: '1',
  name: '홍길동',
  email: 'hong@example.com',
};

const response: MyApp.ApiResponse<MyApp.User> = {
  success: true,
  data: user,
};
```

### 실전 사용 예시

```typescript
// 1. CDN 라이브러리 타이핑
// HTML에서 로드한 라이브러리
// <script src="https://cdn.example.com/library.js"></script>

// library.d.ts
declare namespace MyLibrary {
  interface Config {
    apiKey: string;
    debug?: boolean;
  }

  function init(config: Config): void;
  function getData(id: string): Promise<any>;
  export const version: string;
}

// TypeScript 코드에서 사용
MyLibrary.init({ apiKey: 'xxx' });
const data = await MyLibrary.getData('123');

// 2. 웹팩 플러그인 타이핑
// webpack.config.ts에서 사용하는 플러그인
declare module 'my-custom-loader' {
  interface MyCustomLoaderOptions {
    option1: string;
    option2?: number;
  }

  const loader: (content: string, map: any) => string;
  export = loader;
}

// webpack.config.ts
import loader from 'my-custom-loader';

module.exports = {
  module: {
    rules: [
      {
        test: /\.custom$/,
        use: [
          {
            loader: 'my-custom-loader',
            options: {
              option1: 'value',
              option2: 42,
            },
          },
        ],
      },
    ],
  },
};

// 3. Next.js 커스텀 타입 확장
// next-env.d.ts 또는 types/next.d.ts
declare module 'next/image' {
  interface ImageProps {
    // 사용자 정의 프로퍼티 추가
    customProp?: string;
  }
}

declare module 'next/link' {
  interface LinkProps {
    // 커스텀 프롭 추가
    analytics?: boolean;
  }
}

// 사용
import Image from 'next/image';
import Link from 'next/link';

<Image src="/logo.png" customProp="value" />
<Link href="/about" analytics>소개</Link>

// 4. API 라우트 타입 정의
// types/api.d.ts
declare namespace API {
  namespace Users {
    interface GetUserRequest {
      userId: string;
    }

    interface GetUserResponse {
      id: string;
      name: string;
      email: string;
    }

    interface CreateUserRequest {
      name: string;
      email: string;
      password: string;
    }

    interface CreateUserResponse {
      success: boolean;
      user?: GetUserResponse;
      error?: string;
    }
  }
}

// 사용
type GetUserHandler = (
  req: API.Users.GetUserRequest
) => Promise<API.Users.GetUserResponse>;

// 5. 환경 변수 타입 정의
// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // Node.js 기본 환경 변수
    NODE_ENV: 'development' | 'production' | 'test';

    // 데이터베이스
    DATABASE_URL: string;
    DATABASE_POOL_SIZE?: number;

    // API
    API_BASE_URL: string;
    API_KEY: string;

    // 인증
    JWT_SECRET: string;
    JWT_EXPIRES_IN?: string;

    // 서버
    PORT?: number;
    HOST?: string;

    // 기타
    LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';
  }
}

// 사용
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

// 6. 브라우저 확장 타이핑
// types/browser.d.ts
declare namespace Chrome {
  interface Extension {
    getURL(path: string): string;
    sendMessage(message: any): void;
  }

  namespace Runtime {
    interface MessageSender {
      id?: string;
      url?: string;
    }

    type MessageHandler = (
      message: any,
      sender: MessageSender,
      sendResponse: (response?: any) => void
    ) => void;

    function onMessage.addListener(
      callback: MessageHandler
    ): void;
  }
}

// 사용
Chrome.Runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  sendResponse({ success: true });
});
```

### tsconfig와 Declare 설정

```json
{
  "compilerOptions": {
    // 타입 선언 파일 검색 경로
    "typeRoots": [
      "./node_modules/@types",
      "./src/types"
    ],

    // 자동으로 포함할 타입 선언
    "types": [
      "node",
      "jest",
      "react"
    ],

    // 모든 타입 선언 자동 포함 (기본값)
    // "types": []
  },

  // 포함할 파일
  "include": [
    "src/**/*",
    "src/**/*.d.ts"
  ],

  // 제외할 파일
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

### Declare 사용 시 주의사항

```typescript
// 1. ⚠️ declare와 구현의 분리
// declare는 타입 정보만 제공, 실제 구현은 따로 필요
declare function calculateTax(amount: number): number;

// 실제 구현 (JavaScript 또는 TypeScript)
function calculateTax(amount: number): number {
  return amount * 0.1;
}

// 2. ⚠️ declare global 사용 조건
// 파일이 모듈로 처리되어야 함 (import/export 필요)
// ❌ 에러: declare global을 모듈이 아닌 파일에서 사용
// declare global {
//   interface Window {
//     custom: string;
//   }
// }

// ✅ 올바른 사용
export {}; // 빈 export로 모듈 처리

declare global {
  interface Window {
    custom: string;
  }
}

// 3. ⚠️ 중복 선언 주의
// 여러 파일에서 같은 것을 declare하면 충돌 가능
// 해결: namespace나 module로 감싸기

// 4. ⚠️ declare module '*'
// 너무 광범위한 모듈 선언은 피하기
// ❌ 피해야 할 패턴
// declare module '*' {
//   const value: any;
//   export default value;
// }

// ✅ 구체적인 모듈 선언
declare module 'specific-library' {
  export function specificFunction(): void;
}

// 5. ✅ declare 사용 권장 사례
// - JavaScript 라이브러리에 타입 추가
// - CDN으로 로드한 외부 스크립트
// - 환경별 전역 변수/함수
// -第三方 라이브러리 타이핑
// - 빌드 도구/플러그인 확장

// 6. ✅ declare 대안 고려 사례
// - 자체 라이브러리는 .d.ts 파일과 .ts 파일 분리
// - npm 패키지는 DefinitelyTyped (@types/*) 사용
// - 프로젝트 내부 코드는 declare 대신 직접 import
```

### Declare와 타입 내보내기

```typescript
// 1. .d.ts 파일에서 타입 내보내기
// src/types/user.d.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

export declare function getUser(id: string): User;
export declare class UserService {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
}

// 2. 사용
import { User, UserRole, UserService } from '@/types/user';

const user: User = {
  id: '1',
  name: '홍길동',
  email: 'hong@example.com',
};

const service = new UserService();

// 3. default export와 named export 혼합
// src/types/index.d.ts
export default interface AppConfig {
  apiUrl: string;
  timeout: number;
}

export { User } from './user';
export { Product } from './product';

// 사용
import AppConfig, { User } from '@/types';
```

---

## 인터페이스와 타입

### 인터페이스 (Interface)

```typescript
// 1. 기본 인터페이스
interface User {
  id: number;
  name: string;
  email: string;
}

// 사용
const user: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
};

// 2. 선택적 프로퍼티
interface Product {
  id: number;
  name: string;
  description?: string; // 선택적
  price?: number; // 선택적
}

// 3. 읽기 전용 프로퍼티
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// 4. 메서드 정의
interface Calculator {
  add(a: number, b: number): number;
  subtract: (a: number, b: number) => number;
}

// 5. 인터페이스 확장 (상속)
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const dog: Dog = {
  name: "바둑이",
  age: 3,
  breed: "진돗개",
  bark() {
    console.log("멍멍!");
  },
};

// 6. 다중 상속
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Animal, Flyable, Swimmable {
  quack(): void;
}

// 7. 하이브리드 타입 (함수 + 객체)
// ⚠️ 주의: 하이브리드 타입은 함수와 객체 프로퍼티를 모두 가질 수 있는 특수한 패턴입니다.
// 이 패턴은 JavaScript의 함수가 객체라는 특성을 활용하지만, 타입 안정성을 위해 신중하게 사용해야 합니다.

interface Counter {
  (start: number): string; // 호출 시그니처 (함수처럼 호출 가능)
  interval: number; // 프로퍼티
  reset(): void; // 메서드
}

// 구현 방법 1: 함수에 프로퍼티 추가 (가장 일반적인 방법)
function getCounter(): Counter {
  const counter = function (start: number): string {
    // 함수 본문에서 this를 통해 프로퍼티에 접근
    return `Count: ${start}, Interval: ${(counter as any).interval}`;
  } as Counter;

  // JavaScript에서는 함수 객체에 프로퍼티를 추가할 수 있습니다
  counter.interval = 123;
  counter.reset = function () {
    console.log("Reset!");
    (this as any).interval = 0;
  };

  return counter;
}

// 사용 예시
const myCounter = getCounter();
console.log(myCounter(5)); // "Count: 5, Interval: 123"
console.log(myCounter.interval); // 123
myCounter.reset(); // "Reset!"

// 구현 방법 2: 클래스로 구현 (더 타입 안전한 방법)
class SafeCounter implements Counter {
  interval: number;

  constructor(interval: number = 123) {
    this.interval = interval;
  }

  reset(): void {
    console.log("Reset!");
    this.interval = 0;
  }

  // 호출 시그니처 구현
  (start: number): string {
    return `Count: ${start}, Interval: ${this.interval}`;
  }
}

function getSafeCounter(): Counter {
  const counter = new SafeCounter(100);
  return counter as unknown as Counter;
}

const safeCounter = getSafeCounter();
console.log(safeCounter(10)); // "Count: 10, Interval: 100"
console.log(safeCounter.interval); // 100
```

### 타입 별칭 (Type Alias)

```typescript
// 1. 기본 타입 별칭
type ID = number | string;
type Name = string;
type User = {
  id: ID;
  name: Name;
};

// 2. 유니온 타입
type Status = "pending" | "approved" | "rejected";
type Result = Success | Error;

interface Success {
  status: "success";
  data: any;
}

interface Error {
  status: "error";
  message: string;
}

// 3. 인터섹션 타입
type Employee = Person & {
  employeeId: number;
  department: string;
};

interface Person {
  name: string;
  age: number;
}

// 4. 조건부 타입 (Conditional Types)

// 📘 조건부 타입이란?
// 타입 수준에서 if-else 논리를 수행하는 TypeScript의 강력한 기능
// 기본 문법: T extends Condition ? TrueType : FalseType

// 기본 예시 1: null/undefined 필터링
type NonNullable<T> = T extends null | undefined ? never : T;

// 사용 예시
type UserId = string | null;
type CleanUserId = NonNullable<UserId>; // string (null 제거됨)

// 기본 예시 2: 타입 이름 반환
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T1 = TypeName<string>; // "string"
type T2 = TypeName<number[]>; // "object"

// 실전 사용 사례 1: 배열/비배열 타입 구분
type Unpacked<T> = T extends (infer U)[]
  ? U                    // 배열이면 요소 타입 추출
  : T extends (...args: any[]) => infer U
  ? U                    // 함수면 반환 타입 추출
  : T extends Promise<infer U>
  ? U                    // Promise면 resolve 타입 추출
  : T;                   // 그 외는 원본 타입

// 사용 예시
type T0 = Unpacked<string>;              // string
type T1 = Unpacked<string[]>;            // string (배열 언패킹)
type T2 = Unpacked<() => string>;        // string (함수 반환 타입)
type T3 = Unpacked<Promise<string>>;     // string (Promise 언패킹)

// 실전 사용 사례 2: API 응답 타입 분리
type ApiResponse<T, E = Error> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: E };

type ExtractData<T> = T extends { status: 'success'; data: infer D }
  ? D
  : never;

type ExtractError<T> = T extends { status: 'error'; error: infer E }
  ? E
  : never;

// 사용 예시
type SuccessResult = ApiResponse<User>;
type DataType = ExtractData<SuccessResult>; // User

type ErrorResult = ApiResponse<never, NetworkError>;
type ErrorType = ExtractError<ErrorResult>; // NetworkError

// 실전 사용 사례 3: React 이벤트 핸들러 타입
type EventType<T extends React.ElementType> =
  T extends 'input'
    ? React.ChangeEvent<HTMLInputElement>
    : T extends 'button'
    ? React.MouseEvent<HTMLButtonElement>
    : React.Event;

// 사용 예시
function handleEvent<T extends 'input' | 'button'>(
  element: T,
  handler: (e: EventType<T>) => void
) {
  // element 타입에 따라 handler의 이벤트 타입이 자동 결정됨
}

// 실전 사용 사례 4: 픽셀/백분율 단위 처리
type CssUnit = 'px' | '%' | 'em' | 'rem';

type ValueType<T extends CssUnit> =
  T extends 'px' | 'em' | 'rem'
    ? number           // 절대 단위는 숫자
    : T extends '%'
    ? number           // 백분율도 숫자
    : never;

function setStyle<T extends CssUnit>(
  property: string,
  value: ValueType<T>,
  unit: T
): string {
  return `${property}: ${value}${unit}`;
}

// 고급 패턴: infer 키워드로 타입 추출
// ReturnType 구현 (내장 유틸리티와 동일)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User {
  return { id: 1, name: '홍길동' };
}

type UserReturn = MyReturnType<typeof getUser>;  // User

// Promise의 unwrap 타입
type UnwrappedPromise<T> = T extends Promise<infer U> ? U : T;

type Data = UnwrappedPromise<Promise<User>>;  // User

// 💡 조건부 타입을 사용해야 할 때
// ✅ 적합한 경우:
// - 제네릭 타입에 따라 분기가 필요할 때
// - 타입 필터링이 필요할 때 (null 제거, 특정 타입 추출)
// - 복잡한 타입 변환이 필요할 때
// - API 응답 타입 분리가 필요할 때
//
// ❌ 부적합한 경우:
// - 간단한 유니온 타입으로 충분할 때
// - 런타임 로직과 관계없을 때 (조건부 타입은 컴파일 시점에만 작동)

// 5. 맵드 타입 (Mapped Types)
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type UserWithPartial = Partial<User>;

// 6. 템플릿 리터럴 타입
type Greeting = `안녕하세요, ${string}님!`;
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">; // "onClick"
type HoverEvent = EventName<"hover">; // "onHover"
```

### 인터페이스 vs 타입 별칭

| 특징 | interface | type |
|------|-----------|------|
| **확장 방식** | `extends` | `&` (intersection) |
| **다중 상속** | ✅ 가능 | ✅ 가능 |
| **선언 병합** | ✅ 가능 | ❌ 불가능 |
| **복잡한 타입** | 제한적 | ✅ 유연함 |
| **사용 권장** | 객체, 클래스 | 유니온, 조건부, 맵드 |

```typescript
// 인터페이스 선언 병합
interface User {
  name: string;
}

interface User {
  email: string;
}

// User: { name: string; email: string; }

// 타입 별칭은 병합되지 않음
type User1 = {
  name: string;
};

// ❌ 에러: 중복된 이름
// type User1 = {
//   email: string;
// };
```

---

## 함수 타입

### 기본 함수 타입

```typescript
// 1. 함수 선언식
function add(a: number, b: number): number {
  return a + b;
}

// 2. 함수 표현식
const multiply = function (a: number, b: number): number {
  return a * b;
};

// 3. 화살표 함수
const divide = (a: number, b: number): number => {
  return a / b;
};

// 4. 함수 타입 표현
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => {
  return a - b;
};

// 5. 선택적 매개변수
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

greet("홍길동"); // "Hello, 홍길동!"
greet("홍길동", "안녕하세요"); // "안녕하세요, 홍길동!"

// 6. 기본 매개변수
function createGreeting(
  name: string,
  greeting: string = "Hello"
): string {
  return `${greeting}, ${name}!`;
}

// 7. 나머지 매개변수 (Rest Parameters)
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

sum(1, 2, 3, 4, 5); // 15

// 8. 매개변수 해체 (Destructuring)
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserInfo({ id, name, email }: User): string {
  return `ID: ${id}, Name: ${name}, Email: ${email}`;
}

// 9. 함수 오버로딩 (Overloading)
function processInput(input: string): string;
function processInput(input: number): number;
function processInput(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}

processInput("hello"); // "HELLO"
processInput(5); // 10
```

### 반환 타입

```typescript
// 1. 명시적 반환 타입
function getUserId(): number {
  return 123;
}

// 2. void 반환 타입
function logMessage(message: string): void {
  console.log(message);
}

// 3. never 반환 타입
function handleError(message: string): never {
  throw new Error(message);
}

// 4. 유니온 반환 타입
function getValue(id: number): string | number {
  if (id > 0) {
    return "positive";
  }
  return 0;
}

// 5. Promise 반환 타입
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// 6. 조건부 반환 타입
// ⚠️ 주의: 아래 코드는 타입 안전하지 않습니다!
function parseInput<T>(input: string): T {
  return JSON.parse(input) as T; // 런타임 검사 없음
}

const user = parseInput<User>('{"id":1,"name":"홍길동"}');

// ✅ 권장: 런타임 검증 라이브러리 사용 (Zod 등)
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

function parseUserSafe(input: string): User {
  return UserSchema.parse(JSON.parse(input)); // 런타임 검사 포함
}
```

### 함수 타입과 고계 함수

```typescript
// 1. 고계 함수 (Higher-Order Function)
function withLogging<T extends (...args: any[]) => any>(
  fn: T
): T {
  return ((...args: any[]) => {
    console.log("Arguments:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  }) as T;
}

const addWithLogging = withLogging((a: number, b: number) => a + b);

// 2. 커링 (Currying)
function curry<A, B, C>(
  fn: (a: A, b: B) => C
): (a: A) => (b: B) => C {
  return (a) => (b) => fn(a, b);
}

const curriedAdd = curry((a: number, b: number) => a + b);
const add5 = curriedAdd(5);
add5(3); // 8

// 3. 함수 합성 (Composition)
function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C {
  return (a) => f(g(a));
}

const toUpperCase = (s: string) => s.toUpperCase();
const exclaim = (s: string) => `${s}!`;
const shout = compose(exclaim, toUpperCase);
shout("hello"); // "HELLO!"
```

---

## 클래스와 타입

### 기본 클래스

```typescript
// 1. 클래스 정의
class Person {
  // 프로퍼티 (접근 제어자)
  private id: number;
  protected name: string;
  public email: string;

  // 정적 프로퍼티
  static species: string = "Homo sapiens";

  // 생성자
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // 메서드
  introduce(): string {
    return `안녕하세요, ${this.name}입니다.`;
  }

  // 정적 메서드
  static getSpecies(): string {
    return Person.species;
  }

  // 접근자 (getter/setter)
  get Id(): number {
    return this.id;
  }

  set Name(newName: string) {
    this.name = newName;
  }
}

// 2. 상속
class Employee extends Person {
  private position: string;

  constructor(
    id: number,
    name: string,
    email: string,
    position: string
  ) {
    super(id, name, email);
    this.position = position;
  }

  // 메서드 오버라이딩
  introduce(): string {
    return `${super.introduce()} 저는 ${this.position}입니다.`;
  }

  work(): void {
    console.log(`${this.name}이(가) 업무를 수행합니다.`);
  }
}

// 3. 추상 클래스
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name}이(가) 움직입니다.`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("멍멍!");
  }
}

// 4. 인터페이스 구현
interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  fly(): void {
    console.log("날고 있습니다!");
  }
}
```

### 접근 제어자

```typescript
class BankAccount {
  // public: 어디서든 접근 가능 (기본값)
  public owner: string;

  // private: 클래스 내부에서만 접근 가능
  private balance: number;

  // protected: 클래스와 서브클래스에서 접근 가능
  protected accountNumber: string;

  // readonly: 읽기 전용
  readonly bankName: string;

  constructor(owner: string, balance: number, accountNumber: string) {
    this.owner = owner;
    this.balance = balance;
    this.accountNumber = accountNumber;
    this.bankName = "한국은행";
  }

  getBalance(): number {
    return this.balance;
  }

  private calculateInterest(): number {
    return this.balance * 0.05;
  }
}
```

### 클래스와 인터페이스

```typescript
// 1. 인터페이스로 클래스 타입 정의
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  start(): void;
  stop(): void;
}

class Car implements Vehicle {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  start(): void {
    console.log("자동차가 시동됩니다.");
  }

  stop(): void {
    console.log("자동차가 멈춥니다.");
  }
}

// 2. 인터페이스 확장
interface ElectricVehicle extends Vehicle {
  batteryCapacity: number;
  charge(): void;
}

class Tesla extends Car implements ElectricVehicle {
  batteryCapacity: number;

  constructor(brand: string, model: string, year: number) {
    super(brand, model, year);
    this.batteryCapacity = 100;
  }

  charge(): void {
    console.log("충전 중...");
  }
}
```

---

## 제네릭

### 기본 제네릭

```typescript
// 1. 제네릭 함수
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello"); // "hello"
identity<number>(123); // 123
identity("hello"); // 타입 추론으로 인해 <string> 생략 가능

// 2. 제네릭 인터페이스
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// 3. 제네릭 클래스
class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  getItem(index: number): T {
    return this.items[index];
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}

const numberStorage = new Storage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);

const stringStorage = new Storage<string>();
stringStorage.addItem("a");
stringStorage.addItem("b");

// 4. 제네릭 제약 조건
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength("hello"); // ✅ 문자열은 length 프로퍼티 있음
logLength([1, 2, 3]); // ✅ 배열은 length 프로퍼티 있음
// logLength(123); // ❌ 숫자는 length 프로퍼티 없음

// 5. keyof와 제네릭
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "홍길동",
  age: 25,
  email: "hong@example.com",
};

getProperty(user, "name"); // "홍길동"
getProperty(user, "age"); // 25
// getProperty(user, "address"); // ❌ 에러: 'address'는 User의 키가 아님
```

### 고급 제네릭 패턴

```typescript
// 1. 조건부 타입
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<number[]>; // true
type Test2 = IsArray<number>; // false

// 2. 추론 조건부 타입
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T0 = Unpacked<string>; // string
type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<() => string>; // string
type T3 = Unpacked<Promise<string>>; // string

// 3. 제네릭 기본 타입
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

createArray(3, "a"); // ["a", "a", "a"]
createArray(3, 1); // [1, 1, 1]

// 4. 다중 타입 변수
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

pair<string, number>("hello", 123); // ["hello", 123]

// 5. 제네릭 팩토리 함수
interface Product {
  id: number;
  name: string;
  price: number;
}

function createProduct<T extends new (...args: any[]) => Product>(
  ProductClass: T,
  ...args: ConstructorParameters<T>
): Product {
  return new ProductClass(...args);
}

class ElectronicProduct implements Product {
  id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

const product = createProduct(ElectronicProduct, 1, "TV", 1000000);
```

---

## 타입 추론과 타입 단언

### 타입 추론

```typescript
// 1. 기본 추론
let age = 25; // number로 추론
let name = "홍길동"; // string으로 추론

// 2. 배열 추론
let numbers = [1, 2, 3]; // number[]로 추론
let mixed = [1, "two", 3]; // (number | string)[]으로 추론

// 3. 객체 추론
const user = {
  name: "홍길동",
  age: 25,
  email: "hong@example.com",
};
// { name: string; age: number; email: string; }으로 추론

// 4. 함수 반환 타입 추론
function add(a: number, b: number) {
  return a + b; // number로 추론
}

// 5. 최적 공통 타입 (Best Common Type)
let arr = [0, 1, null]; // (number | null)[]으로 추론
```

### 타입 단언 (Type Assertion)

> **⚠️ 타입 단언 사용 주의사항**: 타입 단언은 TypeScript의 타입 검사를 우회합니다. 가능하면 타입 가드, 타입 좁히기, `satisfies` 연산자를 먼저 고려하세요.

```typescript
// 1. angle-bracket 문법 (JSX와 함께 사용 불가)
let value: any = "Hello, World!";
let length: number = (<string>value).length;

// 2. as 문법 (권장)
let length2: number = (value as string).length;

// 3. 비-null 단언 (!) - 신중하게 사용
function printLength(str: string | null) {
  // ⚠️ ! 연산자는 null/undefined 검사를 우회합니다
  // 실제로 null이면 런타임 에러 발생
  console.log(str!.length); // null이 아님을 단언
}

// ✅ 더 안전한 방법: 명시적 null 체크
function printLengthSafe(str: string | null) {
  if (str !== null) {
    console.log(str.length); // 타입 가드로 좁혀짐
  }
}
const button = document.querySelector("button") as HTMLButtonElement;
button.addEventListener("click", () => {
  console.log("Button clicked!");
});

// 5. const 단언 (TypeScript 3.4+)
const config = {
  url: "https://api.example.com",
  timeout: 5000,
} as const;
// readonly로 추론됨

// 6. satisfies 연산자 (TypeScript 4.9+)
// 💡 satisfies는 타입 검증만 수행하고, 값의 구체적인 타입을 유지합니다
interface Config {
  url: string;
  timeout: number;
}

// 타입 검증만 수행, 값의 타입은 유지
const serverConfig = {
  url: "https://api.example.com",
  timeout: 5000,
  mode: "secure", // 추가 프로퍼티 허용
} satisfies Config;

// serverConfig.mode는 여전히 "secure"로 추론됨

// ✅ satisfies vs as const vs 타입 단언 비교

// 방법 1: 타입 단언 (as) - 타입 변환, 검사 없음
const config1 = {
  url: "https://api.example.com",
  timeout: 5000,
} as Config;
// ❌ 잘못된 값도 통과됨
const config2 = {
  urll: "typo", // 오탈지만 타입 단언으로 통과
} as Config;

// 방법 2: satisfies - 타입 검증, 구체적 타입 유지
const config3 = {
  url: "https://api.example.com",
  timeout: 5000,
} satisfies Config;
// ✅ 오탈 있으면 에러 발생
// const config4 = { urll: "typo" } satisfies Config; // Error

// 방법 3: as const - 최대한 구체적인 타입
const config5 = {
  url: "https://api.example.com",
  timeout: 5000,
} as const;
// url: "https://api.example.com" (리터럴 타입)
// timeout: 5000 (리터럴 타입)

// 7. 타입 가드
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // string으로 처리됨
  }
}

// 8. 디스크리미네이티드 유니온 (Discriminated Unions)
interface Success {
  status: "success";
  data: any;
}

interface Error {
  status: "error";
  message: string;
}

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data); // Success 타입으로 좁혀짐
  } else {
    console.log(result.message); // Error 타입으로 좁혀짐
  }
}
```

---

## 유틸리티 타입

### 자주 사용하는 유틸리티 타입

```typescript
// 1. Partial<T>: 모든 프로퍼티를 선택적으로
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

function updateUser(id: number, updates: Partial<User>) {
  // 사용자 업데이트 로직
}

// 2. Required<T>: 모든 프로퍼티를 필수로
interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; }

// 3. Readonly<T>: 모든 프로퍼티를 읽기 전용으로
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }

// 4. Record<K, T>: 특정 키 타입을 가진 객체
type UserRecord = Record<string, User>;
// { [key: string]: User; }

const users: UserRecord = {
  user1: { id: 1, name: "홍길동", email: "hong@example.com" },
  user2: { id: 2, name: "김철수", email: "kim@example.com" },
};

// 5. Pick<T, K>: 특정 프로퍼티만 선택
type UserSummary = Pick<User, "id" | "name">;
// { id: number; name: string; }

// 6. Omit<T, K>: 특정 프로퍼티 제외
type UserWithoutEmail = Omit<User, "email">;
// { id: number; name: string; }

// 7. Exclude<T, U>: 유니온에서 특정 타입 제외
type T = Exclude<string | number | boolean, boolean>;
// string | number

// 8. Extract<T, U>: 유니온에서 특정 타입만 추출
type T2 = Extract<string | number | boolean, string | number>;
// string | number

// 9. NonNullable<T>: null과 undefined 제외
type T3 = NonNullable<string | null | undefined>;
// string

// 10. ReturnType<T>: 함수 반환 타입 추출
function getUser(): User {
  return { id: 1, name: "홍길동", email: "hong@example.com" };
}

type GetUserReturn = ReturnType<typeof getUser>;
// User

// 11. Parameters<T>: 함수 매개변수 타입 추출
function updateUser(id: number, name: string, email: string): void {
  // ...
}

type UpdateUserParams = Parameters<typeof updateUser>;
// [id: number, name: string, email: string]

// 12. Awaited<T>: Promise 타입 추출 (TypeScript 4.5+)
type AsyncResult = Awaited<Promise<User>>;
// User
```

### TypeScript 5.x 유틸리티

```typescript
// 1. NoInfer<T>: 타입 추론 방지 (TypeScript 5.4+)
// NoInfer는 특정 매개변수가 타입 추론의 "후보"가 되는 것을 방지합니다
// 여러 매개변수가 있을 때, 어떤 매개변수로부터 타입을 추론할지 제어할 수 있습니다

// TypeScript 5.4 공식 문서의 createStreetLight 예제
function createStreetLight<C extends string>(
  colors: C[],              // ✅ C 타입 추론의 주요 출처
  defaultColor?: NoInfer<C>  // ✅ NoInfer로 인해 타입 추론에서 제외
) {
  return {
    colors,
    defaultColor: defaultColor ?? colors[0]
  };
}

// ✅ colors 배열에서 C = "red" | "yellow" | "green"으로 추론
// defaultColor "red"는 이 추론된 타입의 일부이므로 OK
const light1 = createStreetLight(["red", "yellow", "green"], "red");
//   ^? const light1: { colors: ("red" | "yellow" | "green")[]; defaultColor: "red" | "yellow" | "green" }

// ❌ "blue"는 colors 배열에 없는 값
// NoInfer로 인해 defaultColor가 C 타입을 확장할 수 없음
// Error: Argument of type '"blue"' is not assignable to parameter of type '"red" | "yellow" | "green" | undefined'
// const light2 = createStreetLight(["red", "yellow", "green"], "blue");

// 예제 2: NoInfer의 실제 사용 사례
function configureOptions<T extends string>(
  commands: T[],           // ✅ T 타입 추론의 출처
  defaultCommand?: NoInfer<T>,  // ✅ 추론에서 제외
  timeout?: NoInfer<number>     // ✅ T와 무관한 독립 타입
) {
  return {
    commands,
    defaultCommand: defaultCommand ?? commands[0],
    timeout: timeout ?? 5000
  };
}

// ✅ commands에서 T = "start" | "stop" | "restart"로 추론
const options1 = configureOptions(["start", "stop", "restart"], "start", 3000);
//   ^? const options1: { commands: ("start" | "stop" | "restart")[]; defaultCommand: "start" | "stop" | "restart"; timeout: number }

// ❌ "pause"는 commands 배열에 없음
// const options2 = configureOptions(["start", "stop", "restart"], "pause");

// 2. Tuple 유형 개선
// TypeScript의 튜플은 고정된 수의 요소를 가진 배열로, 각 요소의 타입이 명확히 지정됩니다

// 기본 튜플 타입
let tuple1: [string, number] = ["hello", 42];
//   ^? let tuple1: [string, number]

// 요소 접근 시 타입 보존
const first = tuple1[0];  // string
const second = tuple1[1]; // number
//   ^? const second: number

// 💡 Leading Rest Element: 첫 번째 요소가 가변일 때 유용
type NameOrNameArray = string | [string, ...string[]];

function processNames(names: NameOrNameArray) {
  if (Array.isArray(names)) {
    // names: [string, ...string[]] - 첫 번째 요소는 string, 나머지도 string[]
    // 이 패턴은 "최소 1개의 문자열이 있는 배열"을 표현
    console.log(names[0]);  // 첫 번째 이름
    console.log(names.length); // 전체 길이
  } else {
    // names: string - 단일 문자열
    console.log(names.toUpperCase());
  }
}

// 사용 예시
processNames("John");           // 단일 이름
processNames(["John"]);         // 이름 배열 (1개)
processNames(["John", "Jane"]); // 이름 배열 (2개 이상)

// 💡 Optional Tuple Elements: 선택적 요소를 가진 튜플
type KeyValuePair = [string, number?];

const pair1: KeyValuePair = ["age", 30];
const pair2: KeyValuePair = ["name"];  // number은 선택적

// 💡 Readonly Tuple: 불변 튜플 (배열 메서드 사용 제한)
type ReadonlyTuple = readonly [string, number];

const readonlyTuple: ReadonlyTuple = ["fixed", 100];
// readonlyTuple.push(200); // ❌ Error: 'push' does not exist on 'readonly [string, number]'

// 💡 Named Tuple Elements: 튜플 요소에 이름 지정 (가독성 향상)
type User = [name: string, age: number, isActive: boolean];

const user: User = ["Alice", 25, true];
// 각 위치의 의미가 명확해짐
const userName = user[0];   // name
const userAge = user[1];    // age
const userActive = user[2]; // isActive

// 💡 Tuple Union: 다양한 튜플 타입의 유니온
type Response =
  | [status: 200, data: string]
  | [status: 404, error: string]
  | [status: 500, error: string, details?: string];

function handleResponse(response: Response) {
  const [status, payload] = response;

  if (status === 200) {
    console.log("Success:", payload); // payload: string
  } else if (status === 404) {
    console.log("Not Found:", payload); // payload: string
  } else {
    console.log("Server Error:", payload); // payload: string
  }
}

// 💡 Practical Use Case: API 응답 타입 정의
type ApiResult<T, E = Error> =
  | [success: true, data: T]
  | [success: false, error: E];

async function fetchData(url: string): Promise<ApiResult<User, string>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return [true, data];  // Success case
  } catch (error) {
    return [false, "Network error"];  // Error case
  }
}

// 사용
const result = await fetchData("/api/user/1");
if (result[0]) {
  const userData = result[1]; // User 타입
  console.log("User:", userData.name);
} else {
  const errorMsg = result[1]; // string 타입
  console.log("Error:", errorMsg);
}

// 💡 Tuple Utility: 튜플 조작 유틸리티 타입
type First<T extends unknown[]> = T extends [infer F, ...unknown[]] ? F : never;
type Rest<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;

type Numbers = [number, string, boolean];
type FirstElement = First<Numbers>; // number
type RestElements = Rest<Numbers>;  // [string, boolean]

// 3. Keyof 타입 개선
type Colors = {
  red: string;
  blue: string;
  green: string;
};

type ColorKeys = keyof Colors;
// "red" | "blue" | "green"

// 4. Template Literal Types 활용
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<"click">; // "onClick"
type MouseEvent = EventName<"mouse">; // "onMouse"
```

### 맵드 타입 (Mapped Types)

```typescript
// 1. 기본 맵드 타입
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 2. 맵드 타입 수정자 (+, -, readonly, ?)
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// 3. 템플릿 리터럴 맵드 타입
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }

// 4. 키 재매핑 (Key Remapping)
type GettersWithType<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

type Users = {
  [K in string as `user_${K}`]: User;
};
// { user_1: User; user_2: User; ... }
```

---

## React와 TypeScript

### 컴포넌트 타입 정의

```typescript
// 1. FC 타입 사용 (권장하지 않음)
// const MyComponent: React.FC<Props> = ({ name }) => {
//   return <div>Hello, {name}!</div>;
// };

// 2. 함수 선언식 (권장)
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// 3. JSX.Element 타입
export function Container({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div className="container">{children}</div>;
}

// 4. 화살표 함수 컴포넌트
export const Card = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};
```

### 이벤트 핸들러 타입

```typescript
// 1. 클릭 이벤트
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  console.log("Button clicked!");
}

// 2. 입력 변경 이벤트
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log("Input value:", e.target.value);
}

// 3. 폼 제출 이벤트
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("Form submitted!");
}

// 4. 키보드 이벤트
function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter") {
    console.log("Enter pressed!");
  }
}

// 5. 포커스 이벤트
function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
  console.log("Input focused!");
}

// 6. 커스텀 이벤트 핸들러 타입
interface FormProps {
  onSubmit: (data: { name: string; email: string }) => void;
}

export function Form({ onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: "홍길동", email: "hong@example.com" });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Hooks와 TypeScript

```typescript
// 1. useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// 2. useEffect
useEffect(() => {
  console.log("Component mounted");
  return () => {
    console.log("Component unmounted");
  };
}, []);

// 3. useContext
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// 4. useReducer
type State = {
  count: number;
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });

// 5. useRef
const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();

// 6. useMemo
const expensiveValue = useMemo<number>(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 7. useCallback
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// 8. 커스텀 훅
// ⚠️ localStorage는 브라우저 전용 API입니다.
// Server Component에서 사용하면 에러가 발생합니다.
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // ✅ SSR 안전성 확보
    if (typeof window === "undefined") return initialValue;

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    // ⚠️ 여기서도 체크 필요 (Edge cases)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [storedValue, setValue];
}

// ✅ 더 안전한 버전 (런타임 검증 포함)
function useLocalStorageSafe<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

const [name, setName] = useLocalStorage<string>("name", "");
```

### Next.js App Router 타이핑

Next.js 13+ App Router에서의 TypeScript 사용법입니다.

#### 1. Server Components (기본값)

```typescript
// app/users/page.tsx
// Server Component는 'use client'가 없음

interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ async 함수로 데이터 페칭
async function getUsers(): Promise<User[]> {
  const res = await fetch('https://api.example.com/users', {
    cache: 'no-store', // 또는 next: { revalidate: 60 }
  });
  return res.json();
}

// ✅ Server Component는 async 가능
export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>사용자 목록</h1>
      <UserList users={users} />
    </div>
  );
}
```

#### 2. Route Segment 타입

```typescript
// app/users/[id]/page.tsx

interface PageProps {
  params: Promise<{ id: string }>; // ⚠️ Next.js 15+: Promise로 감싸짐
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UserPage({ params, searchParams }: PageProps) {
  const { id } = await params; // await 필요
  const { tab } = await searchParams;

  const user = await fetchUser(id);
  return <UserProfile user={user} activeTab={tab} />;
}
```

#### 3. generateStaticParams 타이핑

```typescript
// app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  const posts = await getPosts(); // Promise<{ slug: string }[]>

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

#### 4. Server Actions 타이핑

```typescript
// 'use server' 지시자

import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  'use server'; // ✅ 서버 액션임을 표시

  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten() };
  }

  // DB 저장 로직...
  return { success: true };
}
```

#### 5. Metadata API

```typescript
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 | 우리 사이트',
  description: '우리 사이트에 대해 알아보세요',
  openGraph: {
    title: '소개 페이지',
    images: ['/og-image.png'],
  },
};

export default function AboutPage() {
  return <div>소개 페이지</div>;
}
```

#### 6. Middleware 타이핑

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
```

### 프로젝트에서의 사용 예시

```typescript
### 프로젝트에서의 사용 예시

> **SSR 안전성 패턴**: 브라우저 전용 API(localStorage, window 등)를 사용할 때는 항상 `typeof window !== 'undefined'` 체크가 필요합니다.

```typescript
// app/users/[id]/page.tsx
// src/features/products/components/ProductCard.tsx
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  variant?: "default" | "compact";
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  variant = "default",
}: ProductCardProps) {
  return (
    <div className={`product-card ${variant}`}>
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
      <p>{product.category}</p>
      <div className="actions">
        {onEdit && (
          <button onClick={() => onEdit(product.id)}>편집</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(product.id)}>삭제</button>
        )}
      </div>
    </div>
  );
}

// src/shared/components/ui/Button.tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "btn",
          `btn-${variant}`,
          `btn-${size}`,
          isLoading && "btn-loading",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? "로딩 중..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

---

## 프로젝트 설정

### tsconfig.json 주요 옵션

```json
{
  "compilerOptions": {
    // 기본 옵션
    "target": "ES2020", // 컴파일 타겟
    "lib": ["ES2020", "DOM", "DOM.Iterable"], // 포함될 라이브러리
    "jsx": "preserve", // JSX 처리 방식

    // 모듈 관련
    "module": "ESNext", // 모듈 시스템
    "moduleResolution": "bundler", // 모듈 해석 방식
    "resolveJsonModule": true, // JSON 모듈 import 허용

    // 경로 관련
    "baseUrl": ".", // 기본 경로
    "paths": {
      "@/*": ["./src/*"] // 경로 별칭
    },

    // 타입 검사
    "strict": true, // 엄격한 타입 검사
    "noUncheckedIndexedAccess": true, // 인덱스 접근 시 undefined 체크
    "noImplicitOverride": true, // override 명시적 선언 요구

    // 추가 검사
    "esModuleInterop": true, // ES 모듈 호환성
    "skipLibCheck": true, // 정의 파일 타입 검사 건너뜀
    "forceConsistentCasingInFileNames": true, // 파일명 대소문자 일치

    // 기타
    "incremental": true, // 증분 컴파일
    "noEmit": true, // 출력 파일 생성 안 함 (Next.js가 처리)
    "isolatedModules": true, // 각 파일을 독립적으로 처리
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### 엄격 모드 옵션

```typescript
// 1. strict: true가 활성화하는 옵션들
{
  "strict": true,
  // noImplicitAny: any 타입 암시적 사용 금지
  "noImplicitAny": true,
  // strictNullChecks: null/undefined 엄격 검사
  "strictNullChecks": true,
  // strictFunctionTypes: 함수 타입 엄격 검사
  "strictFunctionTypes": true,
  // strictBindCallApply: bind/call/apply 엄격 검사
  "strictBindCallApply": true,
  // strictPropertyInitialization: 클래스 프로퍼티 초기화 검사
  "strictPropertyInitialization": true,
  // noImplicitThis: this 타입 암시적 any 금지
  "noImplicitThis": true,
  // alwaysStrict: 엄격 모드로 파싱
  "alwaysStrict": true
}

// 2. 추가 엄격 옵션
{
  // noUnusedLocals: 사용하지 않는 지역 변수 금지
  "noUnusedLocals": true,
  // noUnusedParameters: 사용하지 않는 매개변수 금지
  "noUnusedParameters": true,
  // noImplicitReturns: 모든 코드 경로에서 반환값 명시
  "noImplicitReturns": true,
  // noFallthroughCasesInSwitch: switch 문의 fallthrough 금지
  "noFallthroughCasesInSwitch": true,
  // noUncheckedIndexedAccess: 인덱스 접근 시 undefined 체크
  "noUncheckedIndexedAccess": true
}
```

### 프로젝트별 설정 예시

```typescript
// next.config.ts - TypeScript 통합
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript 에러 시 빌드 실패 (권장)
  typescript: {
    ignoreBuildErrors: false, // true로 설정하면 에러 무시
  },

  // ESLint 통합
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

// tsconfig paths - 절대 경로 설정
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/shared/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/shared/lib/*"],
      "@/utils/*": ["./src/shared/utils/*"],
      "@/types/*": ["./src/shared/types/*"],
      "@/hooks/*": ["./src/shared/hooks/*"]
    }
  }
}

// 사용 예시
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/dateUtils";
import type { User } from "@/types/user";
```

---

## 요약

### TypeScript 핵심 개념

1. **정적 타이핑**: 컴파일 시점에 타입 에러 발견
2. **인터페이스/타입**: 객체 구조 정의
3. **제네릭**: 재사용 가능한 타입 작성
4. **유틸리티 타입**: 타입 변환 및 조작
5. **클래스**: 객체 지향 프로그래밍 지원

### 프로젝트 적용 가이드

- **엄격 모드**: `strict: true`로 설정하여 타입 안정성 확보
- **인터페이스**: 객체, 클래스에는 인터페이스 사용
- **타입 별칭**: 유니온, 조건부, 맵드 타입에 사용
- **제네릭**: 재사용 가능한 컴포넌트/함수 작성
- **타입 가드**: 런타임 타입 검증

### 다음 학습 단계

1. [React 기본 지식](./react-fundamentals.md) - React 이해하기
2. [Next.js 기본 지식](./nextjs-fundamentals.md) - Next.js 프레임워크 이해
3. [프로젝트 아키텍처](../architecture.md) - 프로젝트 구조 파악
4. [코딩 컨벤션](../coding-conventions.md) - 코드 스타일 가이드

---

## 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript 5.7 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/)
