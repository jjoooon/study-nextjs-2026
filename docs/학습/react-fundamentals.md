# React 기본 지식

이 문서는 현재 프로젝트를 이해하기 위해 필요한 React의 핵심 개념과 Next.js 16 App Router 환경에서의 사용법을 설명합니다.

## 목차

1. [React란 무엇인가?](#react란-무엇인가)
2. [컴포넌트 기반 아키텍처](#컴포넌트-기반-아키텍처)
3. [JSX 문법](#jsx-문법)
4. [Props와 State](#props와-state)
5. [이벤트 처리](#이벤트-처리)
6. [생명주기와 useEffect](#생명주기와-useeffect)
7. [컴포넌트 타입](#컴포넌트-타입)
8. [훅(React Hooks)](#훅react-hooks)
9. [폼 처리](#폼-처리)
10. [성능 최적화](#성능-최적화)

---

## React란 무엇인가?

### 정의

React는 Meta(구 Facebook)에서 개발한 **사용자 인터페이스 구축을 위한 JavaScript 라이브러리**입니다.

### 핵심 특징

1. **선언형 (Declarative)**
   - 원하는 UI를 선언하면 React가 효율적으로 렌더링
   - 코드가 예측 가능하고 디버깅이 쉬움

2. **컴포넌트 기반 (Component-Based)**
   - 독립적인 컴포넌트로 UI 구성
   - 재사용 가능하고 유지보수 용이

3. **한 번 배워서 어디서든 사용 (Learn Once, Write Anywhere)**
   - React로 웹, 모바일, 서버 사이드 렌더링 가능

### 프로젝트에서의 React 버전

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

**React 19의 새로운 특징:**
- ✅ Server Components 지원 강화
- ✅ Actions와 Form 처리 개선
- ✅ `forwardRef` 없이 ref prop 직접 사용 가능
- ✅ Concurrent Features 기본 활성화
- ✅ 성능 및 개발자 경험 개선
- ✅ `useOptimistic` 낙관적 업데이트
- ✅ `useActionState` 폼 상태 관리
- ✅ `useFormStatus` 폼 제출 상태
- ✅ React Compiler (실험적)

### Strict Mode (개발 환경)

Next.js는 기본적으로 React Strict Mode를 활성화합니다.

```typescript
// 개발 환경에서의 동작
function MyComponent() {
  useEffect(() => {
    console.log('마운트');
    return () => console.log('언마운트');
  }, []);

  return <div>Component</div>;
}
```

**Strict Mode 활성화 시:**
```
마운트      // 첫 번째 렌더링
언마운트    // cleanup
마운트      // 두 번째 렌더링 (Strict Mode)
```

**목적:**
- 사이드 이펙트 감지
- 메모리 누수 발견
- 잘못된 생명주기 사용 식별
- **프로덕션 환경에서는 비활성화** (성능 영향 없음)

---

## 컴포넌트 기반 아키텍처

### 컴포넌트란?

컴포넌트는 **재사용 가능한 UI 조각**으로, props를 입력받아 React Element를 반환하는 함수입니다.

### 기본 컴포넌트 구조

```typescript
// 함수형 컴포넌트 (기본)
export function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// 화살표 함수 컴포넌트
export const Greeting = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};
```

### 프로젝트의 컴포넌트 구조

```
src/
├── features/
│   └── products/
│       ├── components/        # 도메인 컴포넌트
│       │   ├── ProductList.tsx
│       │   ├── ProductCard.tsx
│       │   └── ProductForm.tsx
│       └── sections/          # 페이지 섹션 컴포넌트
│           ├── ListSection.tsx
│           └── DetailSection.tsx
└── shared/
    └── components/
        └── ui/                # 재사용 가능한 UI 컴포넌트
            ├── button.tsx
            ├── Skeleton.tsx
            └── EmptyState.tsx
```

### 컴포넌트 예시: ProductCard

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
  variant?: 'default' | 'compact';
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  variant = 'default',
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
```

---

## JSX 문법

### JSX란?

JSX는 JavaScript의 확장 문법으로, JavaScript 코드 내에서 HTML과 유사한 마크업을 작성할 수 있게 해줍니다.

### JSX 기본 규칙

#### key prop (리스트 렌더링 시 필수)

리스트를 렌더링할 때 `key` prop은 필수입니다.

```typescript
// ✅ 올바른 key 사용
{products.map(product => (
  <div key={product.id}>
    {product.name}
  </div>
))}

// ❌ 인덱스를 key로 사용 (비권장)
{products.map((product, index) => (
  <div key={index}>
    {product.name}
  </div>
))}
```

**key prop의 중요성**:
- React가 각 항목을 식별하고 변경 사항을 추적
- 고유하고 안정적인 값이어야 함 (ID, UUID 등)
- 인덱스를 key로 사용하면 리스트 순서가 바뀔 때 문제 발생
- 중복된 key는 렌더링 오류를 일으킴

```typescript
// 1. 단일 루트 요소
✅ <div><p>Hello</p><p>World</p></div>
❌ <p>Hello</p><p>World</p>

// 2. React Fragment로 여러 요소 래핑
✅ <><p>Hello</p><p>World</p></>
✅ <React.Fragment><p>Hello</p><p>World</p></React.Fragment>

// 3. camelCase 프로퍼티
✅ className="text-blue"
❌ class="text-blue"

✅ onClick={handleClick}
❌ onclick={handleClick}

// 4. JavaScript 표현식: {} 사용
✅ <h1>Hello, {userName}!</h1>
✅ <div className={isActive ? 'active' : 'inactive'}>

// 5. 자체 닫는 태그
✅ <img src={logo} alt="logo" />
✅ <input type="text" />
❌ <img src={logo} alt="logo">
```

### JSX에서 스타일 적용

```typescript
// 1. className (Tailwind CSS)
<div className="bg-white rounded-lg p-4 shadow-md">

// 2. 인라인 스타일
<div style={{ color: 'red', fontSize: '16px' }}>

// 3. 동적 className
<div className={`card ${isActive ? 'active' : ''}`}>

// 4. clsx 또는 cn 유틸리티 사용 (권장)
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | boolean | undefined)[]) {
  return twMerge(clsx(inputs));
}

<div className={cn('base-class', isActive && 'active-class')}>
```

---

## Props와 State

### Props (Properties)

**Props는 부모 컴포넌트에서 자식 컴포넌트로 전달되는 데이터**입니다.

```typescript
// Props 인터페이스 정의
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Props 받기
export function Button({
  children,
  onClick,
  variant = 'primary',
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

// 사용
<Button variant="primary" onClick={() => alert('Clicked!')}>
  클릭
</Button>
```

### State (상태)

**State는 컴포넌트 내부에서 관리하는 데이터**로, 변경 시 컴포넌트가 재렌더링됩니다.

```typescript
import { useState } from 'react';

export function Counter() {
  // State 선언: [현재값, 설정함수]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </div>
  );
}
```

### State 사용 규칙

```typescript
// 1. State는 직접 수정하지 않기
❌ count = count + 1;
✅ setCount(count + 1);

// 2. 이전 상태 기반 업데이트
✅ setCount(prev => prev + 1);

// 3. 객체/배열 상태는 불변성 유지
❌ user.name = 'New Name';
✅ setUser({ ...user, name: 'New Name' });

❌ items.push(newItem);
✅ setItems([...items, newItem]);
```

### Props vs State 비교

| 특징 | Props | State |
|------|-------|--------|
| **소유권** | 부모 컴포넌트 | 컴포넌트 자체 |
| **변경 가능성** | 읽기 전용 (immutable) | setState로 변경 가능 |
| **전달 방향** | 부모 → 자식 (단방향) | 내부에서만 사용 |
| **사용 예시** | 설정값, 콜백 함수 | 폼 입력, 토글 상태 |

---

## 이벤트 처리

### 이벤트 핸들러 기본

```typescript
export function EventExample() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 기본 동작 방지
    console.log('Button clicked!', e.currentTarget);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value);
  };

  return (
    <div>
      <button onClick={handleClick}>클릭</button>
      <input
        type="text"
        onChange={handleChange}
        placeholder="입력"
      />
    </div>
  );
}
```

### 이벤트 핸들러 패턴

```typescript
// 1. 인라인 화살표 함수
<button onClick={() => console.log('Clicked')}>

// 2. 핸들러 함수 참조
const handleClick = () => console.log('Clicked');
<button onClick={handleClick}>

// 3. 파라미터 전달
const handleDelete = (id: string) => console.log('Delete', id);
<button onClick={() => handleDelete('123')}>

// 4. 이벤트 객체와 파라미터
const handleSubmit = (e: React.FormEvent, id: string) => {
  e.preventDefault();
  console.log('Submit', id);
};
<form onSubmit={(e) => handleSubmit(e, '123')}>

// ⚠️ 주의: 함수를 즉시 실행하지 않기
❌ <button onClick={handleClick(id)}>  // 렌더링 시 즉시 실행
✅ <button onClick={() => handleClick(id)}>  // 클릭 시 실행
```

### 자주 사용하는 이벤트 타입

```typescript
// 마우스 이벤트
React.MouseEvent<HTMLButtonElement>

// 폼 이벤트
React.FormEvent<HTMLFormElement>
React.ChangeEvent<HTMLInputElement>
React.FocusEvent<HTMLInputElement>

// 키보드 이벤트
React.KeyboardEvent<HTMLInputElement>

// 클립보드 이벤트
React.ClipboardEvent<HTMLDivElement>
```

---

## 생명주기와 useEffect

### useEffect란?

`useEffect`는 **컴포넌트의 부수 효과(Side Effects)를 처리**하는 훅입니다.

> **⚠️ 중요**: `useEffect`는 **Client Component**에서만 사용할 수 있습니다. Server Component에서는 사용할 수 없습니다.

### 기본 구조

```typescript
import { useEffect, useState } from 'react';

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 마운트 시 한 번 실행
  useEffect(() => {
    console.log('컴포넌트 마운트');
  }, []);

  // userId가 변경될 때마다 실행
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const data = await fetchUser(userId);
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [userId]); // 의존성 배열

  // 정리(Cleanup) 함수 반환
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 실행');
    }, 1000);

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearInterval(timer);
      console.log('타이머 정리');
    };
  }, []);

  return <div>{loading ? 'Loading...' : user?.name}</div>;
}
```

### useEffect 사용 패턴

```typescript
// 1. 의존성 배열 없음: 매 렌더링 시 실행
useEffect(() => {
  console.log('렌더링될 때마다 실행');
});

// 2. 빈 의존성 배열: 마운트 시 한 번만 실행
useEffect(() => {
  console.log('마운트 시 한 번만 실행');
}, []);

// 3. 특정 의존성: 해당 값이 변경될 때만 실행
useEffect(() => {
  console.log('count가 변경될 때 실행:', count);
}, [count]);

// 4. 정리 함수: 언마운트 또는 다음 effect 실행 전
useEffect(() => {
  const subscription = subscribe();
  return () => {
    subscription.unsubscribe(); // 정리
  };
}, [source]);

// 5. 비동기 함수 사용 (주의)
useEffect(() => {
  // ❌ useEffect 콜백을 async로 만들지 않기
  // async () => { ... }

  // ✅ 내부에서 async 함수 정의
  const fetchData = async () => {
    const data = await fetchAPI();
    setState(data);
  };

  fetchData();
}, [dependency]);
```

### 프로젝트에서의 사용 예시

```typescript
// src/features/dashboard/hooks/useDashboard.ts
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { fetchDashboardStats } from '@/features/dashboard/dashboardSlice';
import { selectDashboard } from '@/features/dashboard/dashboardSelector';

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useAppSelector(selectDashboard);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  // 주기적으로 데이터 업데이트 (5분마다)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchDashboardStats());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return { stats, loading, error };
};
```

---

## React의 렌더링 모델 이해하기

### 렌더링이란?

렌더링은 React가 컴포넌트를 호출하여 UI가 어떻게 보여야 하는지 계산하는 과정입니다.

### 렌더링을 트리거하는 것

1. **State 변경**: `setState` 호출
2. **Props 변경**: 부모로부터 새 props 수신
3. **Context 변경**: Context 값 변경

### React의 렌더링 과정

```
1. Trigger (useState, 새 props)
   ↓
2. Render (컴포넌트 함수 호출, JSX 반환)
   ↓
3. Commit (DOM 업데이트)
```

### 중요: 렌더링 ≠ DOM 변경

```typescript
function Counter() {
  const [count, setCount] = useState(0);

  // 이 부분은 렌더링 시마다 실행됨
  console.log('렌더링됨:', count);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

React는 Virtual DOM을 사용하여 실제 DOM 변경을 최소화합니다:
1. 이전 Virtual DOM과 새 Virtual DOM 비교
2. 달라진 부분만 실제 DOM에 적용

### 불필요한 리렌더링 방지

```typescript
// ❌ 매 렌더링 시 새 함수 생성
function Parent() {
  return <Child onClick={() => console.log('click')} />;
}

// ✅ 함수 참조 안정화
function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  return <Child onClick={handleClick} />;
}
```

---

## 컴포넌트 타입

### Server Components vs Client Components

Next.js 13+ App Router에서 도입된 개념입니다.

#### Server Component (기본)

```typescript
// 기본적으로 Server Component
// 서버에서만 렌더링되고 클라이언트로 JS가 전송되지 않음
export default function ProductList() {
  // ✅ DB 접근 가능
  const products = await db.products.findMany();

  // ✅ 파일 시스템 접근 가능
  const data = fs.readFileSync('data.json');

  // ❌ useState, useEffect 등 클라이언트 훅 사용 불가
  // ❌ onClick 등 이벤트 핸들러 사용 불가

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

#### Client Component

```typescript
// 'use client' 지시어로 명시
'use client';

import { useState } from 'react';

export function ProductForm() {
  // ✅ useState, useEffect 사용 가능
  const [value, setValue] = useState('');

  // ✅ 이벤트 핸들러 사용 가능
  const handleSubmit = () => {
    console.log('Submit:', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

### 언제 어느 것을 사용해야 할까요?

| 상황 | Server Component | Client Component |
|------|------------------|------------------|
| **기본값** | ✅ | - |
| **데이터 가져오기** | ✅ | ⚠️ (가능하지만 권장하지 않음) |
| **백엔드 리소스 접근** | ✅ | ❌ |
| **이벤트 핸들러** | ❌ | ✅ |
| **State/Effect 사용** | ❌ | ✅ |
| **브라우저 API 사용** | ❌ | ✅ |
| **서드파티 라이브러리** | ⚠️ (제한적) | ✅ |

### 프로젝트의 예시

```typescript
// app/page.tsx - Server Component (기본)
export default function Home() {
  // 서버에서 데이터 가져오기
  const products = await getProducts();

  return (
    <main>
      <h1>상품 목록</h1>
      {/* Client Component 사용 */}
      <ProductFilter products={products} />
    </main>
  );
}

// features/products/components/ProductFilter.tsx - Client Component
'use client';

export function ProductFilter({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {/* 필터링 로직 */}
    </div>
  );
}
```

---

## 훅(React Hooks)

### 기본 훅

#### useState

```typescript
const [state, setState] = useState(initialValue);

// 예시
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', age: 0 });
const [items, setItems] = useState<string[]>([]);
```

#### useEffect

```typescript
useEffect(() => {
  // 부수 효과
  return () => {
    // 정리 함수
  };
}, [dependencies]);
```

#### useContext

```typescript
// Context 생성
const ThemeContext = createContext<'light' | 'dark'>('light');

// Context 제공
<ThemeContext.Provider value="light">
  <App />
</ThemeContext.Provider>

// Context 사용
const theme = useContext(ThemeContext);
```

#### useReducer

```typescript
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });

// 사용
dispatch({ type: 'increment' });
```

#### useRef

```typescript
// DOM 요소 참조
const inputRef = useRef<HTMLInputElement>(null);

inputRef.current?.focus();

// 값 보존 (재렌더링 없이)
const timerRef = useRef<NodeJS.Timeout | null>(null);

timerRef.current = setTimeout(() => {
  console.log('Timer');
}, 1000);
```

#### useMemo

```typescript
// 비용이 큰 계산 결과 캐싱
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]); // a 또는 b가 변경될 때만 재계산
```

#### useCallback

```typescript
// 함수 참조 안정화
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // a 또는 b가 변경될 때만 함수 재생성
```

### React 19 새로운 훅

#### useOptimistic (낙관적 업데이트)

서버 응답을 기다리는 동안 UI를 즉시 업데이트합니다.

```typescript
'use client';

import { useOptimistic } from 'react';

type Message = {
  id: string;
  text: string;
  sending?: boolean;
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  // 낙관적 상태
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        id: Math.random().toString(),
        text: newMessage,
        sending: true,
      },
    ]
  );

  const handleSubmit = async (formData: FormData) => {
    const message = formData.get('message') as string;

    // 즉시 UI 업데이트
    addOptimisticMessage(message);

    // 서버 전송
    await sendMessage(message);
    setMessages(await getMessages());
  };

  return (
    <div>
      {optimisticMessages.map((msg) => (
        <div key={msg.id}>
          {msg.text}
          {msg.sending && <span> (전송 중...)</span>}
        </div>
      ))}

      <form action={handleSubmit}>
        <input name="message" type="text" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
```

#### useActionState (폼 상태 관리)

폼의 제출 상태를 관리하는 훅입니다.

```typescript
'use client';

import { useActionState } from 'react';

async function submitForm(prevState: any, formData: FormData) {
  const name = formData.get('name');

  // 서버 액션
  await createUser(name);

  return { success: true, message: '생성 완료!' };
}

export function UserForm() {
  const [state, formAction, isPending] = useActionState(submitForm, null);

  return (
    <form action={formAction}>
      <input name="name" type="text" />
      <button type="submit" disabled={isPending}>
        {isPending ? '제출 중...' : '제출'}
      </button>

      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

#### useFormStatus (폼 제출 상태)

폼의 제출 상태를 자식 컴포넌트에서 확인합니다.

```typescript
'use client';

import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '제출 중...' : '제출'}
    </button>
  );
}

export function Form() {
  async function handleSubmit(formData: FormData) {
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" />
      <SubmitButton />
    </form>
  );
}
```

### 커스텀 훅 (Custom Hooks)

재사용 가능한 로직을 훅으로 추출합니다.

```typescript
// useLocalStorage.ts
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}

// 사용
const [name, setName] = useLocalStorage('name', '');
```

### 프로젝트의 커스텀 훅 예시

```typescript
// src/features/dashboard/hooks/useDashboard.ts
export const useDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useAppSelector(selectDashboard);

  const fetchDashboard = useCallback(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { stats, loading, error, refetch: fetchDashboard };
};
```

---

## Server Actions (React 19 + Next.js)

Server Actions는 React 19와 Next.js 16에서 도입된 기능으로, 클라이언트에서 직접 서버 쪽 함수를 호출할 수 있게 해줍니다.

### 기본 Server Action

```typescript
// app/actions/products.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));

  // 서버에서 직접 DB 접근
  const product = await db.products.create({
    data: { name, price }
  });

  // 캐시 무효화
  revalidatePath('/products');

  return { success: true, product };
}
```

### Server Action 사용

```typescript
// app/products/new/page.tsx
import { createProduct } from '@/app/actions/products';

export default function NewProductPage() {
  return (
    <form action={createProduct}>
      <input name="name" type="text" required />
      <input name="price" type="number" required />
      <button type="submit">생성</button>
    </form>
  );
}
```

### Server Actions 장점

1. **클라이언트 JS 감소**: 폼 제출 로직이 서버에서 실행
2. **Progressive Enhancement**: JS가 비활성화되어도 작동
3. **타입 안전성**: TypeScript와 함께 사용 가능
4. **자동 로딩 상태**: `useFormStatus` 훅으로 접근

### Server Actions vs Client-side Form Handling

| 특징 | Server Actions | Client-side (React Hook Form) |
|-----|----------------|-------------------------------|
| **번들 크기** | 작음 | ~25KB 추가 |
| **SEO** | 우수 | 보통 |
| **복잡한 검증** | 서버에서 처리 | 클라이언트 + 서버 |
| **실시간 피드백** | 제한적 | 우수 |
| **사용 시점** | 간단한 폼, SEO 중요 | 복잡한 폼, 실시간 검증 |

---

## 폼 처리

### 제어된 컴포넌트 (Controlled Components)

```typescript
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="메시지"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

### React Hook Form 사용

복잡한 폼의 경우 React Hook Form을 고려해보세요.

```bash
npm install react-hook-form zod @hookform/resolvers
```

**장점:**
- 렌더링 간 수행 감소 (성능 향상)
- 복잡한 검증 로직 지원
- Zod 등과의 쉬운 통합

**단점:**
- 번들 크기 약 25KB 추가
- 간단한 폼에는 과도함

**사용 권장:**
- ✅ 복잡한 다단계 폼
- ✅ 실시간 검증이 필요한 폼
- ✅ 동적 필드가 많은 폼
- ⚠️ 간단한 폼에는 Server Actions 권장

프로젝트에서는 React Hook Form을 사용하는 것이 좋습니다.

```bash
npm install react-hook-form zod @hookform/resolvers
```

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

export function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('name')}
        placeholder="이름"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register('email')}
        placeholder="이메일"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">제출</button>
    </form>
  );
}
```

---

## 성능 최적화

### 최적화 우선순위

```
1. Server Components (가장 중요)
   ↓ 클라이언트 JS 번들 0%
2. Code Splitting (dynamic import)
   ↓ 초기 로딩 시간 감소
3. React.memo, useMemo, useCallback
   ↓ 불필요한 리렌더링 방지
```

**가장 중요한 최적화**: Server Component를 기본으로 사용하세요. 클라이언트로 전송되는 JavaScript가 0에 가까워지는 것이 가장 큰 성능 향상입니다.

### React.memo

```typescript
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return <div>{product.name}</div>;
});

// 커스텀 비교 함수가 필요한 경우 (신중하게 사용)
export const ProductCardWithCustomCompare = React.memo(
  ({ product }: ProductCardProps) => {
    return <div>{product.name}</div>;
  },
  (prevProps, nextProps) => {
    // 모든 관련 필드를 비교해야 함
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.price === nextProps.product.price
    );
  }
);
```

> **⚠️ 주의**: 대부분의 경우 커스텀 비교 함수 없이 기본 `React.memo`만 사용하는 것이 좋습니다. 커스텀 비교 함수는 실수로 업데이트를 건너뛸 위험이 있습니다.

### useMemo

```typescript
const sortedProducts = useMemo(() => {
  return products
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => a.price - b.price);
}, [products, selectedCategory]);
```

### useCallback

```typescript
const handleEdit = useCallback((id: string) => {
  router.push(`/products/${id}/edit`);
}, [router]);
```

### 최적화하지 말아야 할 때

```typescript
// ❌ 불필요한 최적화
const value = useMemo(() => x + y, [x, y]);  // 단순 연산

// ✅ 필요한 최적화
const sortedProducts = useMemo(() => {
  return products
    .filter(p => p.category === selectedCategory)
    .sort((a, b) => a.price - b.price);
}, [products, selectedCategory]);  // 비용이 큰 연산
```

**원칙**: 측정 후 최적화하세요. React DevTools Profiler로 병목을 먼저 확인하세요.

### 코드 분할 (Code Splitting)

```typescript
import dynamic from 'next/dynamic';

// 지연 로딩
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // 클라이언트 사이드 렌더링만
});
```

---

## 요약

### React 핵심 개념

1. **컴포넌트**: 재사용 가능한 UI 조각
2. **JSX**: JavaScript 내에서 HTML 작성
3. **Props**: 부모 → 자식 데이터 전달
4. **State**: 컴포넌트 내부 상태 관리
5. **이벤트 처리**: 사용자 인터랙션 반응
6. **useEffect**: 생명주기 및 부수 효과 처리 (Client Component only)
7. **Hooks**: 상태와 생명주기 기능 사용

### 프로젝트 적용 가이드

- **Server Component (기본)**: 데이터 가져오기, SEO 중요 페이지, 최고의 성능
- **Client Component**: 이벤트 핸들링, State 관리 필요한 곳
- **Server Actions**: 간단한 폼 제출, mutation 작업
- **React Hook Form**: 복잡한 폼, 실시간 검증 필요시
- **커스텀 훅**: 비즈니스 로직 재사용
- **성능 최적화**: Server Component > Code Splitting > React.memo/useMemo/useCallback

### React 19 주요 변경사항

- Server Actions로 폼 처리 간소화
- `useOptimistic`, `useActionState`, `useFormStatus` 새로운 훅
- Concurrent Features 기본 활성화
- React Compiler로 자동 최적화 (선택적)

### 다음 학습 단계

1. [Next.js 기본 지식](./nextjs-fundamentals.md) - Next.js 프레임워크 이해
2. [프로젝트 아키텍처](./architecture.md) - 프로젝트 구조 파악
3. [코딩 컨벤션](./coding-conventions.md) - 코드 스타일 가이드

---

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [React 19 변경 사항](https://react.dev/blog/2024/12/05/react-19)
- [Next.js React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
