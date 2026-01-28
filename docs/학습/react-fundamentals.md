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

### 기본 구조

```typescript
import { useEffect, useState } from 'react';

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
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

### React Hook Form 사용 (권장)

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

### React.memo

```typescript
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return <div>{product.name}</div>;
}, (prevProps, nextProps) => {
  // 커스텀 비교 함수
  return prevProps.product.id === nextProps.product.id;
});
```

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
6. **useEffect**: 생명주기 및 부수 효과 처리
7. **Hooks**: 상태와 생명주기 기능 사용

### 프로젝트 적용 가이드

- **Server Component**: 데이터 가져오기, SEO 중요 페이지
- **Client Component**: 이벤트 핸들링, State 관리 필요한 곳
- **커스텀 훅**: 비즈니스 로직 재사용
- **성능 최적화**: React.memo, useMemo, useCallback 적절히 사용

### 다음 학습 단계

1. [Next.js 기본 지식](./nextjs-fundamentals.md) - Next.js 프레임워크 이해
2. [프로젝트 아키텍처](./architecture.md) - 프로젝트 구조 파악
3. [코딩 컨벤션](./coding-conventions.md) - 코드 스타일 가이드

---

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [React 19 변경 사항](https://react.dev/blog/2024/12/05/react-19)
- [Next.js React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
