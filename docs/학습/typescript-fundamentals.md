# TypeScript 기본 지식

이 문서는 현재 프로젝트를 이해하기 위해 필요한 TypeScript의 핵심 개념과 Next.js 16 App Router 환경에서의 사용법을 설명합니다.

## 목차

1. [TypeScript란 무엇인가?](#typescript란-무엇인가)
2. [기본 타입](#기본-타입)
3. [인터페이스와 타입](#인터페이스와-타입)
4. [함수 타입](#함수-타입)
5. [클래스와 타입](#클래스와-타입)
6. [제네릭](#제네릭)
7. [타입 추론과 타입 단언](#타입-추론과-타입-단언)
8. [유틸리티 타입](#유틸리티-타입)
9. [React와 TypeScript](#react와-typescript)
10. [프로젝트 설정](#프로젝트-설정)

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

4. **최준 표준 준수**
   - ECMAScript 표준을 따름
   - 최신 JavaScript 기능을 빠르게 지원

### 프로젝트의 TypeScript 버전

```json
{
  "typescript": "^5.7.3"
}
```

**TypeScript 5.7의 새로운 특징:**
- ✅ 성능 및 안정성 개선
- ✅ 향상된 타입 추론
- ✅ 새로운 유틸리티 타입 추가
- ✅ 개선된 에러 메시지

### TypeScript vs JavaScript

| 특징 | JavaScript | TypeScript |
|------|-----------|-----------|
| **타입 시스템** | 동적 타이핑 | 정적 타이핑 |
| **에러 발견** | 런타임 | 컴파일 시점 |
| **IDE 지원** | 기본 | 우수 |
| **학습 곡선** | 낮음 | 중간 |
| **코드량** | 적음 | 많음 (타입 정의) |
| **생산성** | 소규모에 적합 | 대규모에 적합 |

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
interface Counter {
  (start: number): string; // 함수 타입
  interval: number; // 프로퍼티
  reset(): void; // 메서드
}

function getCounter(): Counter {
  let counter = (function (start: number) {
    return start.toString();
  }) as Counter;

  counter.interval = 123;
  counter.reset = function () {
    console.log("Reset!");
  };

  return counter;
}
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

// 4. 조건부 타입
type NonNullable<T> = T extends null | undefined ? never : T;

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
function parseInput<T>(input: string): T {
  return JSON.parse(input) as T;
}

const user = parseInput<User>('{"id":1,"name":"홍길동"}');
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

```typescript
// 1. angle-bracket 문법 (JSX와 함께 사용 불가)
let value: any = "Hello, World!";
let length: number = (<string>value).length;

// 2. as 문법 (권장)
let length2: number = (value as string).length;

// 3. 비-null 단언
function printLength(str: string | null) {
  console.log(str!.length); // null이 아님을 단언
}

// 4. DOM 요소 단언
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

### TypeScript 5.x新增유틸리티

```typescript
// 1. NoInfer<T>: 타입 추론 방지 (TypeScript 5.4+)
function createPair<T extends string | number>(first: T, second: NoInfer<T>) {
  return [first, second] as const;
}

// second는 T로 추론되지 않고 명시적으로 지정해야 함
const pair = createPair("hello", "world"); // ✅
const pair2 = createPair("hello", 123); // ❌

// 2. Tuple 유형 개선
type NameOrNameArray = string | [string, ...string[]];

function processNames(names: NameOrNameArray) {
  if (Array.isArray(names)) {
    // names: [string, ...string[]]
    console.log(names[0]);
  } else {
    // names: string
    console.log(names.toUpperCase());
  }
}

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
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

const [name, setName] = useLocalStorage<string>("name", "");
```

### 프로젝트에서의 사용 예시

```typescript
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
