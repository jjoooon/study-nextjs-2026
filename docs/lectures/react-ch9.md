# React 교육 문서

## 📚 목차

### 9. 훅
- [9.1 React 빌트인 훅](#91-react-빌트인-훅)
- [9.2 커스텀 훅](#92-커스텀-훅)

---

## 9. 훅

## 9.1 React 빌트인 훅

React는 다양한 빌트인 훅을 제공하여 함수 컴포넌트에서 상태, 사이드 이펙트, 최적화 등을 처리할 수 있습니다. React 19 최신 버전 기준으로 주요 훅들을 알아봅시다.

---

### 기본 훅 (Basic Hooks)

#### useState

컴포넌트에 상태를 추가합니다.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(0)}>초기화</button>
    </div>
  );
}
```

**여러 State 사용:**
```jsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = () => {
    console.log({ name, email, age });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(e.target.value)} />
    </form>
  );
}
```

---

#### useEffect

사이드 이펙트를 처리합니다.

```jsx
import { useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 실행
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));

    // cleanup 함수
    return () => {
      console.log('컴포넌트 언마운트');
    };
  }, [userId]);  // userId가 변경될 때만 실행

  return user ? <h1>{user.name}</h1> : <p>로딩...</p>;
}
```

---

#### useContext

Context를 구독하여 가장 가까운 Provider의 값을 읽습니다.

```jsx
import { useContext, createContext } from 'react';

// Context 생성
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  // Context 구독
  const theme = useContext(ThemeContext);

  return (
    <button style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
      {theme} 모드
    </button>
  );
}
```

**여러 Context 사용:**
```jsx
function Header() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);

  return (
    <header className={theme}>
      <h1>{user.name}</h1>
      <span>{language}</span>
    </header>
  );
}
```

---

### 추가 훅 (Additional Hooks)

#### useRef

렌더링을 일으키지 않는 변경 가능한 값을 저장합니다.

```jsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>포커스</button>
    </div>
  );
}
```

**이전 값 기억:**
```jsx
function PreviousValue({ value }) {
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return (
    <p>
      현재: {value}, 이전: {prevRef.current}
    </p>
  );
}
```

---

#### useReducer

복잡한 상태 로직을 reducer로 관리합니다.

```jsx
import { useReducer } from 'react';

// reducer 함수
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>증가</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>감소</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>초기화</button>
    </div>
  );
}
```

**초기화 지연:**
```jsx
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(
    counterReducer,
    initialCount,
    init  // 초기화 함수
  );

  return <p>카운트: {state.count}</p>;
}
```

---

#### useCallback

메모이제이션된 콜백 함수를 반환합니다.

```jsx
import { useCallback } from 'react';

function ProductList({ products, addToCart }) {
  const [filter, setFilter] = useState('');

  // filter가 변경될 때만 함수 재생성
  const filteredProducts = useCallback(() => {
    return products.filter(p => p.name.includes(filter));
  }, [products, filter]);

  // 의존성이 없으면 한 번만 생성
  const handleReset = useCallback(() => {
    setFilter('');
  }, []);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <button onClick={handleReset}>초기화</button>
      <ul>
        {filteredProducts().map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

#### useMemo

메모이제이션된 값을 계산합니다.

```jsx
import { useMemo } from 'react';

function ExpensiveCalculation({ numbers }) {
  // numbers가 변경될 때만 다시 계산
  const sortedNumbers = useMemo(() => {
    console.log('정렬 계산 중...');
    return numbers.slice().sort((a, b) => a - b);
  }, [numbers]);

  const sum = useMemo(() => {
    console.log('합계 계산 중...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);

  return (
    <div>
      <p>정렬: {sortedNumbers.join(', ')}</p>
      <p>합계: {sum}</p>
    </div>
  );
}
```

**비용이 큰 계산:**
```jsx
function Fibonacci({ n }) {
  const fibonacci = useMemo(() => {
    if (n <= 1) return n;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
      [prev, curr] = [curr, prev + curr];
    }
    return curr;
  }, [n]);

  return <p>Fibonacci({n}) = {fibonacci}</p>;
}
```

---

### 최적화 훅 (Performance Hooks)

#### useTransition

UI를 차단하지 않고 상태를 업데이트합니다.

```jsx
import { useTransition } from 'react';

function Search() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    // 긴급 업데이트 (즉시)
    setInput(value);

    // 긴급하지 않은 업데이트 (Transition)
    startTransition(() => {
      const results = heavyFiltering(value);
      setList(results);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <p>검색 중...</p>}
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

---

#### useDeferredValue

긴급하지 않은 업데이트를 지연시킵니다.

```jsx
import { useDeferredValue } from 'react';

function Typeahead({ suggestions }) {
  const [input, setInput] = useState('');

  // 입력 업데이트를 지연
  const deferredInput = useDeferredValue(input);

  // deferredInput이 변경될 때만 필터링
  const filteredSuggestions = suggestions.filter(s =>
    s.name.toLowerCase().includes(deferredInput.toLowerCase())
  );

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <Suggestions list={filteredSuggestions} />
    </div>
  );
}
```

---

### 유틸리티 훅 (Utility Hooks)

#### useId

고유한 ID를 생성합니다 (주로 접근성에 사용).

```jsx
import { useId } from 'react';

function Form() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-name`}>이름:</label>
      <input id={`${id}-name`} type="text" />

      <label htmlFor={`${id}-email`}>이메일:</label>
      <input id={`${id}-email`} type="email" />
    </div>
  );
}
```

**여러 ID 생성:**
```jsx
function CheckboxGroup() {
  const baseId = useId();

  return (
    <div>
      <input id={`${baseId}-option1`} type="checkbox" />
      <label htmlFor={`${baseId}-option1`}>옵션 1</label>

      <input id={`${baseId}-option2`} type="checkbox" />
      <label htmlFor={`${baseId}-option2`}>옵션 2</label>
    </div>
  );
}
```

---

#### useLayoutEffect

DOM 변이 후 동기적으로 실행됩니다 (주로 DOM 측정에 사용).

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip() {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // DOM 업데이트 후, 브라우저 그리기 전에 실행
    const rect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top,
      left: rect.left
    });
  }, []);

  return (
    <div ref={tooltipRef} style={{ position: 'absolute', ...position }}>
      툴팁
    </div>
  );
}
```

**useEffect와의 차이:**
```
useLayoutEffect:
1. 렌더링
2. DOM 업데이트
3. useLayoutEffect 실행 (동기)
4. 브라우저 그리기

useEffect:
1. 렌더링
2. DOM 업데이트
3. 브라우저 그리기
4. useEffect 실행 (비동기)
```

---

#### useSyncExternalStore

외부 저장소를 구독합니다.

```jsx
import { useSyncExternalStore } from 'react';

// 외부 저장소 (예: 브라우저 API)
function getSnapshot() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function subscribe(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function DarkModeIndicator() {
  const isDark = useSyncExternalStore(getSnapshot, subscribe);

  return <p>{isDark ? '다크 모드' : '라이트 모드'}</p>;
}
```

---

### Ref 관련 훅

#### useImperativeHandle

부모 컴포넌트에 노출될 ref를 커스터마이징합니다.

```jsx
import { useRef, forwardRef, useImperativeHandle } from 'react';

const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // 부모에게 노출할 메서드 정의
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => inputRef.current.value = '',
    getValue: () => inputRef.current.value
  }));

  return <input ref={inputRef} type="text" />;
});

// 사용
function Form() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();  // 커스텀 메서드 호출
    inputRef.current.clear();
  };

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleClick}>포커스 & 초기화</button>
    </div>
  );
}
```

---

### 디버깅 훅 (Debugging Hooks)

#### useDebugValue

React DevTools에서 커스텀 훅의 라벨을 표시합니다.

```jsx
import { useDebugValue } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // DevTools에 라벨 표시
  useDebugValue(isOnline ? 'Online' : 'Offline');

  useEffect(() => {
    // 친구 상태 구독 로직
  }, [friendID]);

  return isOnline;
}
```

**파생 값 디버깅:**
```jsx
function useCurrency(value, currency) {
  const formatted = useMemo(() => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency
    }).format(value);
  }, [value, currency]);

  // DevTools에 포맷된 값 표시
  useDebugValue(formatted);

  return formatted;
}
```

---

### 훅 사용 규칙 요약

#### 규칙 1: 최상위 수준에서만 호출

```jsx
// ❌ 조건문 안에서 호출
function Bad() {
  if (condition) {
    const [state, setState] = useState(0);
  }
}

// ✅ 항상 최상위
function Good() {
  const [state, setState] = useState(0);
  if (condition) {
    // 로직만
  }
}
```

#### 규칙 2: 함수 컴포넌트에서만 호출

```jsx
// ❌ 일반 함수에서 호출
function bad() {
  useState(0);
}

// ✅ 컴포넌트나 커스텀 훅에서만
function good() {
  useState(0);
}

function useCustom() {
  useState(0);
}
```

#### 규칙 3: 같은 순서로 호출

```jsx
function Component() {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useEffect
  useEffect(() => {}, []);

  // 3. useContext
  const theme = useContext(ThemeContext);

  // 항상 같은 순서!
}
```

---

### 훅 선택 가이드

```
어떤 훅을 사용할까요?

상태 관리가 필요한가?
  → 복잡한 로직? useReducer
  → 단순한 상태? useState

사이드 이펙트가 필요한가?
  → DOM 측정? useLayoutEffect
  → 일반적? useEffect

성능 최적화가 필요한가?
  → 값 계산? useMemo
  → 함수? useCallback
  → 긴급하지 않은 업데이트? useTransition, useDeferredValue

외부 저장소를 구독해야 하나요?
  → useSyncExternalStore

고유한 ID가 필요한가?
  → useId
```

---

## 9.2 커스텀 훅

커스텀 훅은 컴포넌트 로직을 재사용 가능한 함수로 추출하는 강력한 패턴입니다.

---

### 커스텀 훅이란?

**정의:**
- `use`로 시작하는 함수
- 다른 훅을 호출할 수 있음
- 상태 로직과 사이드 이펙트를 캡슐화

**기본 구조:**
```jsx
function useCustomHook(initialValue) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // 사이드 이펙트
  }, [state]);

  // 필요한 값이나 함수 반환
  return [state, setState];
}
```

---

### 왜 커스텀 훅을 사용하는가?

#### 1. 로직 재사용

```jsx
// ❌ 중복 코드
function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  // ...
}

function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  // ...
}

// ✅ 커스텀 훅으로 재사용
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

function ProductList() {
  const { data, loading, error } = useFetch('/api/products');
  // ...
}

function UserList() {
  const { data, loading, error } = useFetch('/api/users');
  // ...
}
```

#### 2. 관심사 분리

```jsx
// UI와 로직 분리
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

function ResponsiveComponent() {
  // 로직은 훅이 담당
  const { width, height } = useWindowSize();

  // 컴포넌트는 UI만 담당
  return (
    <div>
      <p>너비: {width}px</p>
      <p>높이: {height}px</p>
    </div>
  );
}
```

#### 3. 테스트 용이성

```jsx
// 커스텀 훅은 독립적으로 테스트 가능
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 훅 테스트 가능
```

---

### 일반적인 커스텀 훅 패턴

#### 1. useLocalStorage

로컬 스토리지와 State를 동기화합니다.

```jsx
function useLocalStorage(key, initialValue) {
  // 초기화 함수로 localStorage에서 값 읽기
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 값 변경 시 localStorage에 저장
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 사용
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [preferences, setPreferences] = useLocalStorage('preferences', {
    theme: 'light',
    language: 'ko'
  });

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <button onClick={() => setPreferences({ ...preferences, theme: 'dark' })}>
        다크 모드
      </button>
    </div>
  );
}
```

---

#### 2. useFetch

API 요청을 처리합니다.

```jsx
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

// 사용
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/user/${userId}`);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**더 많은 기능:**
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch_data = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 수동으로 다시 가져오기
  const refetch = () => {
    fetch_data();
  };

  useEffect(() => {
    fetch_data();
  }, [url]);

  return { data, loading, error, refetch };
}
```

---

#### 3. useToggle

불리언 값을 토글합니다.

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, setValue, toggle, setTrue, setFalse };
}

// 사용
function Modal() {
  const { value: isOpen, toggle, setTrue: open, setFalse: close } = useToggle(false);

  return (
    <>
      <button onClick={open}>모달 열기</button>

      {isOpen && (
        <div className="modal">
          <p>모달 내용</p>
          <button onClick={close}>닫기</button>
        </div>
      )}

      <button onClick={toggle}>토글</button>
    </>
  );
}
```

---

#### 4. useWindowSize

윈도우 크기를 추적합니다.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 사용
function ResponsiveLayout() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>화면 크기: {width} x {height}</p>
      {width < 768 ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

---

#### 5. useDebounce

값을 디바운스합니다.

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// 사용
function Search() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // 디바운스된 값으로 API 요청
    if (debouncedSearch) {
      fetch(`/api/search?q=${debouncedSearch}`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="검색..."
    />
  );
}
```

---

#### 6. useEventListener

이벤트 리스너를 쉽게 관리합니다.

```jsx
function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// 사용
function ShortcutHandler() {
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('ESC pressed!');
    }
  });

  return <div>ESC 키를 눌러보세요</div>;
}

function ClickOutside({ children, onClickOutside }) {
  const ref = useRef();

  useEventListener('mousedown', (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClickOutside();
    }
  }, window);

  return <div ref={ref}>{children}</div>;
}
```

---

#### 7. usePrevious

이전 값을 기억합니다.

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// 사용
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>현재: {count}</p>
      <p>이전: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

---

#### 8. useIntersectionObserver

요소의 가시성을 감지합니다.

```jsx
function useIntersectionObserver(ref, options) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
}

// 사용
function LazyImage({ src, alt }) {
  const imgRef = useRef();
  const isVisible = useIntersectionObserver(imgRef, {
    threshold: 0.1
  });

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
      style={{ opacity: isVisible ? 1 : 0.5 }}
    />
  );
}
```

---

#### 9. useDarkMode

다크 모드를 관리합니다.

```jsx
function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage('darkMode', false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark(!isDark) };
}

// 사용
function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <div>
      <button onClick={toggle}>
        {isDark ? '라이트 모드' : '다크 모드'}
      </button>
      {/* ... */}
    </div>
  );
}
```

---

#### 10. useFormInput

폼 입력을 관리합니다.

```jsx
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (touched) {
      validate(e.target.value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validate(value);
  };

  const validate = (val) => {
    // 커스텀 유효성 검사 로직
    setError(null);  // 또는 setError('에러 메시지');
  };

  const reset = () => {
    setValue(initialValue);
    setTouched(false);
    setError(null);
  };

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    reset,
    touched,
    error,
    setError
  };
}

// 사용
function LoginForm() {
  const username = useFormInput('');
  const password = useFormInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username: username.value,
      password: password.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        {...username}
        type="text"
        placeholder="사용자명"
      />
      {username.touched && username.error && <p>{username.error}</p>}

      <input
        {...password}
        type="password"
        placeholder="비밀번호"
      />
      {password.touched && password.error && <p>{password.error}</p>}

      <button type="submit">로그인</button>
    </form>
  );
}
```

---

### 커스텀 훅 작성 가이드

#### 1. 단일 책임 원칙

```jsx
// ❌ 너무 많은 책임
function useEverything() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [windowSize, setWindowSize] = useState({});

  // ... 로직이 섞여 있음
}

// ✅ 각 훅은 하나의 책임
function useUser() { /* ... */ }
function useTheme() { /* ... */ }
function useWindowSize() { /* ... */ }
```

#### 2. 명확한 네이밍

```jsx
// ✅ 동사를 사용
useFetch()
useLocalStorage()
useToggle()

// ✅ 목적을 명확히
useDebounce()
useIntersectionObserver()
useMediaQuery()
```

#### 3. 의존성 관리

```jsx
// ✅ 의존성 명시
function useCustomHook(value) {
  useEffect(() => {
    // value가 변경될 때만 실행
  }, [value]);
}

// ✅ 함수 안정화
function useCustomHook(callback) {
  const stableCallback = useCallback(callback, []);
  // ...
}
```

#### 4. 타입 안전성 (TypeScript)

```typescript
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  // ...
}
```

---

### 요약

#### 커스텀 훅 장점

| 장점 | 설명 |
|------|------|
| **재사용성** | 로직을 여러 컴포넌트에서 재사용 |
| **관심사 분리** | UI와 로직 분리 |
| **테스트 용이** | 독립적으로 테스트 가능 |
| **추상화** | 복잡한 로직을 숨김 |
| **유지보수** | 중앙화된 로직 관리 |

#### 커스텀 훅 패턴

```
일반적인 패턴:

1. 로컬 스토리지 동기화 → useLocalStorage
2. API 요청 → useFetch
3. 토글 로직 → useToggle
4. 윈도우 이벤트 → useWindowSize, useEventListener
5. 값 디바운싱 → useDebounce
6. 이전 값 기억 → usePrevious
7. 가시성 감지 → useIntersectionObserver
8. 테마 관리 → useDarkMode
9. 폼 관리 → useFormInput
```

#### 핵심 takeaways

> 💡 **커스텀 훅**
>
> - `use`로 시작하는 함수
> - 상태 로직과 사이드 이펙트 캡슐화
> - 컴포넌트 로직 재사용의 핵심
> - 단일 책임 원칙 따르기
> - 명확한 네이밍과 의존성 관리
