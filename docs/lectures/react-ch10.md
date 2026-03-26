# React 교육 문서

## 📚 목차

### 10. React 성능 및 최적화
- [10.1 렌더링 최적화](#101-렌더링-최적화)
- [10.2 컴포넌트 설계 최적화](#102-컴포넌트-설계-최적화)
- [10.3 번들 최적화](#103-번들-최적화)
- [10.4 State 관리 최적화](#104-state-관리-최적화)
- [10.5 네트워크 최적화](#105-네트워크-최적화)
- [10.6 이미지 최적화](#106-이미지-최적화)
- [10.7 메모이제이션 전략](#107-메모이제이션-전략)
- [10.8 DevTools 프로파일링](#108-devtools-프로파일링)
- [10.9 성능 체크리스트](#109-성능-체크리스트)
- [10.10 모벨 사례](#1010-모벨-사례)

---

## 10. React 성능 및 최적화

React 애플리케이션의 성능을 최적화하는 방법과 모벨 사례를 알아봅니다.

---

## 10.1 렌더링 최적화 {#101-렌더링-최적화}

### 불필요한 렌더링 방지

React에서 성능 문제의 가장 일반적인 원인은 불필요한 컴포넌트 재렌더링입니다.

#### 문제: 부모가 렌더링될 때 자식도 렌더링

```jsx
// ❌ 문제: 부모가 렌더링될 때마다 자식도 렌더링
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        카운트: {count}
      </button>
      <ExpensiveChild />  {/* count가 변경될 때마다 렌더링 */}
    </div>
  );
}

function ExpensiveChild() {
  console.log('ExpensiveChild 렌더링');
  // 비용이 큰 계산
  return <div>비용이 큰 자식 컴포넌트</div>;
}
```

#### 해결책 1: React.memo

```jsx
// ✅ React.memo로 메모이제이션
const ExpensiveChild = React.memo(function ExpensiveChild() {
  console.log('ExpensiveChild 렌더링');
  return <div>비용이 큰 자식 컴포넌트</div>;
});

// props가 변경될 때만 렌더링
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        카운트: {count}
      </button>
      <ExpensiveChild name={name} />
    </div>
  );
}
```

#### 해결책 2: Props 분리

```jsx
// ❌ 안 좋은 예시
function Parent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '철수', age: 25 });

  return (
    <Child user={user} count={count} />
  );
}

// ✅ 좋은 예시: 변경되는 props와 고정된 props 분리
function Parent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '철수', age: 25 });

  return (
    <>
      <Counter count={count} />
      <UserProfile user={user} />
    </>
  );
}
```

#### 해결책 3: State 내리기

```jsx
// ❌ 안 좋은 예시: 모든 State를 상위에 두기
function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  return (
    <div>
      <Input1 value={value1} onChange={setValue1} />
      <Input2 value={value2} onChange={setValue2} />
      <Input3 value={value3} onChange={setValue3} />
    </div>
  );
}

// ✅ 좋은 예시: State를 사용하는 곳 가까이 두기
function App() {
  return (
    <div>
      <Input1 />
      <Input2 />
      <Input3 />
    </div>
  );
}

function Input1() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

---

### useMemo와 useCallback

#### useMemo: 값 계산 최적화

```jsx
// ❌ 매 렌더링마다 다시 계산
function ProductList({ products, filter }) {
  const filtered = products.filter(p => p.name.includes(filter));
  const sorted = filtered.sort((a, b) => a.price - b.price);

  return sorted.map(product => <div key={product.id}>{product.name}</div>);
}

// ✅ useMemo로 메모이제이션
function ProductList({ products, filter }) {
  const filteredAndSorted = useMemo(() => {
    console.log('필터링 및 정렬 계산 중...');
    return products
      .filter(p => p.name.includes(filter))
      .sort((a, b) => a.price - b.price);
  }, [products, filter]);  // 의존성이 변경될 때만 계산

  return filteredAndSorted.map(product => <div key={product.id}>{product.name}</div>);
}
```

**useMemo 사용 가이드라인:**
```jsx
// ✅ 좋은 사용: 비용이 큰 계산
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ❌ 나쁜 사용: 단순한 계산
const sum = useMemo(() => a + b, [a, b]);  // 그냥 { a + b } 사용

// ❌ 나쁜 사용: useMemo 안에서 또 다른 useMemo 호출
const value = useMemo(() => {
  return anotherMemoizedValue + 1;  // 불필요한 중첩
}, [anotherMemoizedValue]);
```

#### useCallback: 함수 메모이제이션

```jsx
// ❌ 매 렌더링마다 새로운 함수 생성
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return <Child onClick={handleClick} />;
}

// ✅ useCallback로 메모이제이션
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);  // 함수형 업데이트
  }, []);  // 빈 배열 = 한 번만 생성

  return <Child onClick={handleClick} />;
}
```

**useCallback 사용 가이드라인:**
```jsx
// ✅ 좋은 사용: 자식 컴포넌트에 전달되는 콜백
const handleChange = useCallback((value) => {
  onChange(value);
}, [onChange]);

// ✅ 좋은 사용: useEffect의 의존성
useEffect(() => {
  fetchData();
}, [fetchData]);  // fetchData는 useCallback으로 감싼 함수

// ❌ 나쁜 사용: 단순히 함수를 감싸는 용도
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);  // 그냥 일반 함수 사용
```

---

### 리스트 렌더링 최적화

#### 가상화 (Virtualization)

```jsx
// ❌ 안 좋은 예시: 모든 항목 렌더링
function LongList({ items }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// ✅ 좋은 예시: react-window로 가상화
import { FixedSizeList } from 'react-window';

function LongList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

#### Key 최적화

```jsx
// ❌ 안 좋은 예시: 인덱스를 key로 사용
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>  {/* 순서가 바뀌면 문제 */}
      ))}
    </ul>
  );
}

// ✅ 좋은 예시: 고유한 ID를 key로 사용
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>  {/* 안정적인 key */}
      ))}
    </ul>
  );
}
```

---

## 10.2 컴포넌트 설계 최적화 {#102-컴포넌트-설계-최적화}

### 컴포넌트 분리

```jsx
// ❌ 안 좋은 예시: 하나의 큰 컴포넌트
function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  useEffect(() => {
    fetchComments().then(setComments);
  }, []);

  return (
    <div>
      <UserInfo user={user} />
      <UserPosts posts={posts} />
      <UserComments comments={comments} />
    </div>
  );
}

// ✅ 좋은 예시: 독립적인 컴포넌트로 분리
function UserProfile({ userId }) {
  return (
    <div>
      <UserInfo userId={userId} />
      <UserPosts userId={userId} />
      <UserComments userId={userId} />
    </div>
  );
}
```

### 컴포넌트 추출

```jsx
// ❌ 안 좋은 예시: 복잡한 로직이 포함
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// ✅ 좋은 예시: 커스텀 훅으로 로직 분리
function useData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

function App() {
  const { data, loading, error } = useData('/api/data');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

---

## 10.3 번들 최적화 {#103-번들-최적화}

### 코드 스플리팅 (Code Splitting)

```jsx
// ❌ 안 좋은 예시: 모든 코드를 한 번에 로드
import HeavyComponent from './HeavyComponent';

function App() {
  return <HeavyComponent />;
}

// ✅ 좋은 예시: React.lazy로 지연 로딩
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

#### 라우트 기반 코드 스플리팅

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

---

## 10.4 State 관리 최적화 {#104-state-관리-최적화}

### Context API 최적화

```jsx
// ❌ 안 좋은 예시: 하나의 큰 Context
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'ko',
  // ... 많은 값들
});

function App() {
  const [state, setState] = useState({
    user: null,
    theme: 'light',
    language: 'ko'
  });

  //任何一个值变化都会导致所有消费者重新渲染
  return (
    <AppContext.Provider value={state}>
      <Child />
    </AppContext.Provider>
  );
}

// ✅ 좋은 예시: Context 분리
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const LanguageContext = createContext('ko');

function App() {
  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <LanguageContext.Provider value={languageValue}>
          <Child />
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### 상태 끌어올리기 방지

```jsx
// ❌ 안 좋은 예시: 모든 State를 최상위에
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  return (
    <form>
      <Input value={name} onChange={setName} />
      <Input value={email} onChange={setEmail} />
      <Input value={age} onChange={setAge} />
    </form>
  );
}

// ✅ 좋은 예시: State를 사용하는 곳에 두기
function App() {
  return (
    <form>
      <Input label="이름" />
      <Input label="이메일" />
      <Input label="나이" />
    </form>
  );
}

function Input({ label }) {
  const [value, setValue] = useState('');
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  );
}
```

---

## 10.5 네트워크 최적화 {#105-네트워크-최적화}

### 데이터 prefetching

```jsx
function ProductList() {
  const navigate = useNavigate();

  const handleMouseEnter = (productId) => {
    // 마우스를 올리면 미리 데이터 로드
    prefetch(`/api/product/${productId}`);
  };

  return (
    <div>
      {products.map(product => (
        <div
          key={product.id}
          onMouseEnter={() => handleMouseEnter(product.id)}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </div>
      ))}
    </div>
  );
}
```

### 요청 중복 방지

```jsx
// ❌ 안 좋은 예시: 중복 요청
function UserProfiles({ userIds }) {
  return (
    <div>
      {userIds.map(id => (
        <UserProfile key={id} userId={id} />
      ))}
    </div>
  );
}

// ✅ 좋은 예시: 데이터 중복 제거
function UserProfiles({ userIds }) {
  // 한 번에 모든 사용자 데이터 요청
  const { data: users } = useQuery({
    queryKey: ['users', userIds],
    queryFn: () => fetchUsers(userIds)
  });

  return (
    <div>
      {users?.map(user => (
        <UserProfile key={user.id} user={user} />
      ))}
    </div>
  );
}
```

---

## 10.6 이미지 최적화 {#106-이미지-최적화}

### 이미지 지연 로딩

```jsx
// ✅ Intersection Observer API 사용
function LazyImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc || 'placeholder.jpg'}
      alt={alt}
      loading="lazy"
    />
  );
}
```

### 반응형 이미지

```jsx
function ResponsiveImage() {
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet="large.jpg" />
      <source media="(min-width: 768px)" srcSet="medium.jpg" />
      <img src="small.jpg" alt="반응형 이미지" />
    </picture>
  );
}
```

---

## 10.7 메모이제이션 전략 {#107-메모이제이션-전략}

#### React.memo 사용 시 주의사항

```jsx
// ❌ 안 좋은 예시: props 비교가 깊은 객체
const MyComponent = React.memo(function MyComponent({ data }) {
  return <div>{data.name}</div>;
});

// ✅ 좋은 예시: 커스텀 비교 함수
const MyComponent = React.memo(
  function MyComponent({ data }) {
    return <div>{data.name}</div>;
  },
  (prevProps, nextProps) => {
    // 커스텀 비교 로직
    return prevProps.data.id === nextProps.data.id;
  }
);
```

---

## 10.8 DevTools 프로파일링 {#108-devtools-프로파일링}

### React DevTools Profiler

```jsx
import { Profiler } from 'react';

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) {
  console.log(`${id} ${phase} 렌더링`);
  console.log(`실제 시간: ${actualDuration}ms`);
  console.log(`기본 시간: ${baseDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Navigation />
      <MainContent />
    </Profiler>
  );
}
```

---

## 10.9 성능 체크리스트 {#109-성능-체크리스트}

### 컴포넌트 최적화

- [ ] 불필요한 렌더링 제거
- [ ] React.memo로 메모이제이션
- [ ] useMemo로 값 계산 최적화
- [ ] useCallback로 함수 메모이제이션
- [ ] 리스트 key 최적화
- [ ] 대용량 리스트 가상화

### 번들 최적화

- [ ] 코드 스플리팅 적용
- [ ] 라우트 기반 지연 로딩
- [ ] 트리 쉐이킹 (Tree Shaking)
- [ ] 번들 분석 및 최적화

### State 관리

- [ ] State 적절한 위치에 배치
- [ ] Context 분리
- [ ] 불필요한 State 제거
- [ ] 파생 값 State로 관리 안 함

### 네트워크 최적화

- [ ] 데이터 prefetching
- [ ] 요청 중복 방지
- [ ] 적절한 캐싱 전략
- [ ] 이미지 지연 로딩

---

## 10.10 모벨 사례 {#1010-모벨-사례}

### DO ✅

```jsx
// 1. 컴포넌트 분리
function UserCard({ user }) {
  return <div>{user.name}</div>;
}

// 2. useMemo로 비용이 큰 계산 최적화
const sortedList = useMemo(() =>
  items.sort((a, b) => a.price - b.price),
  [items]
);

// 3. useCallback로 콜백 메모이제이션
const handleClick = useCallback(() => {
  doSomething(dependency);
}, [dependency]);

// 4. Key로 안정적인 ID 사용
{items.map(item => <Item key={item.id} item={item} />)}

// 5. 코드 스플리팅
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

### DON'T ❌

```jsx
// 1. 컴포넌트에 로직 과부하
function BigComponent() {
  // 모든 로직을 한 컴포넌트에
}

// 2. 불필요한 useMemo
const simpleValue = useMemo(() => a + b, [a, b]);

// 3. 인덱스를 key로 사용
{items.map((item, index) => <Item key={index} />)}

// 4. 불필요한 익명 함수
<Child onClick={() => setValue(value + 1)} />

// 5. 모든 것을 메모이제이션
const everything = useMemo(() => ({ a, b, c }), [a, b, c]);
```

---

## 요약

### 성능 최적화 원칙

1. **측정 먼저**: 프로파일링으로 병목 찾기
2. **불필요한 렌더링 방지**: React.memo, useMemo, useCallback
3. **코드 분할**: 지연 로딩으로 초기 로드 시간 단축
4. **State 최적화**: 적절한 위치에 State 배치
5. **리스트 최적화**: key, 가상화, 페이지네이션

### 최적화 순서

```
1. 프로파일링으로 병목 식별
2. 불필요한 렌더링 제거
3. 비용이 큰 계산 메모이제이션
4. 코드 스플리팅 적용
5. 네트워크 최적화
```
