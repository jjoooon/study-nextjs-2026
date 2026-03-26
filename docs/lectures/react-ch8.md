# React 교육 문서

## 📚 목차

### 8. 사이드 이펙트 다루기
- [8.1 무엇이 문제인가요?](#81-무엇이-문제인가요)
- [8.2 사이드 이펙트 이해하기](#82-사이드-이펙트-이해하기)
- [8.3 useEffect() 훅으로 사이드 이펙트 처리하기](#83-useeffect-훅으로-사이드-이펙트-처리하기)
- [8.4 Effect와 의존성](#84-effect와-의존성)

---

## 8. 사이드 이펙트 다루기

## 8.1 무엇이 문제인가요?

React 컴포넌트는 순수 함수처럼 동작해야 하지만, 실제 애플리케이션에서는 DOM 조작, 데이터 가져오기, 타이머 설정 등 "사이드 이펙트"가 필요합니다. 이를 안전하게 처리하는 방법을 알아봅시다.

---

### 렌더링 중 사이드 이펙트의 문제

#### 문제 1: 무한 루프

```jsx
// ❌ 문제: 무한 루프 발생
function Counter() {
  const [count, setCount] = useState(0);

  // 렌더링할 때마다 실행됨
  setCount(count + 1);  // State 변경 → 재렌더링 → 다시 실행 → 무한 루프

  return <h1>{count}</h1>;
}
```

#### 문제 2: DOM 직접 조작

```jsx
// ❌ 문제: React와 DOM 불일치
function Title() {
  const [count, setCount] = useState(0);

  // React가 관리하지 않는 DOM 조작
  document.title = `카운트: ${count}`;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

**문제점:**
- React의 Virtual DOM과 실제 DOM이 불일치
- 렌더링 타이밍과 DOM 업데이트 타이밍이 다름
- 예측 불가능한 동작

#### 문제 3: 구독/이벤트 리스너 중복

```jsx
// ❌ 문제: 이벤트 리스너가 계속 추가됨
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  // 렌더링할 때마다 새로운 리스너 추가
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });
  // 정리(cleanup)가 없어서 리스너가 계속 쌓임

  return <p>너비: {width}px</p>;
}
```

**문제점:**
- 메모리 누수
- 성능 저하
- 예상치 못한 동작

#### 문제 4: API 호출 중복

```jsx
// ❌ 문제: 렌더링할 때마다 API 호출
function UserProfile() {
  const [user, setUser] = useState(null);

  // 렌더링할 때마다 API 호출
  fetch('/api/user')
    .then(res => res.json())
    .then(data => setUser(data));
  // 무한 루프: user 변경 → 재렌더링 → 다시 호출 → user 변경...

  return user ? <h1>{user.name}</h1> : <p>로딩 중...</p>;
}
```

---

### 해결책: useEffect

React는 `useEffect` Hook을 통해 사이드 이펙트를 안전하게 처리할 수 있습니다.

```jsx
// ✅ 올바른 방법: useEffect 사용
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 컴포넌트가 렌더링된 후 실행
    document.title = `카운트: ${count}`;
  }, [count]);  // count가 변경될 때만 실행

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

---

### 왜 useEffect가 필요한가?

```
┌─────────────────────────────────────────────┐
│  React 컴포넌트의 렌더링 사이클              │
└─────────────────────────────────────────────┘

1. 렌더링 (순수 계산)
   - props → JSX 반환
   - 사이드 이펙트 없어야 함

2. useEffect 실행 (사이드 이펙트)
   - DOM 업데이트 완료 후
   - 비동기 작업 수행
   - 필요할 때만 실행
```

**useEffect의 역할:**
1. **렌더링과 사이드 이펙트 분리**: 순수 함수 유지
2. **실행 타이밍 제어**: 렌더링 후 실행
3. **의존성 추적**: 필요할 때만 실행
4. **정리(Cleanup) 지원**: 리소스 해제

---

### 요약

#### 사이드 이펙트 문제

| 문제 | 원인 | 결과 |
|------|------|------|
| **무한 루프** | 렌더링 중 State 변경 | 브라우저 중단 |
| **DOM 불일치** | 직접 DOM 조작 | 예측 불가능 |
| **메모리 누수** | 정리 없는 리스너 | 성능 저하 |
| **데이터 중복** | 반복 API 호출 | 불필요한 네트워크 |

#### useEffect의 필요성

```
useEffect:
- 렌더링과 사이드 이펙트 분리
- React 선언적 패러다임 유지
- 안전한 타이밍 보장
- 자동 정리 메커니즘
```

---

## 8.2 사이드 이펙트 이해하기

사이드 이펙트(Side Effect)는 함수의 입력 외에 외부 상태를 변경하는 모든 작업을 말합니다. React에서 HTTP 요청만이 유일한 사이드 이펙트가 아닙니다.

---

### 사이드 이펙트란?

**수학적 함수 (Pure Function):**
```javascript
// 같은 입력 → 항상 같은 출력
function add(a, b) {
  return a + b;  // 순수 함수
}

add(1, 2);  // 항상 3
add(1, 2);  // 항상 3
```

**사이드 이펙트가 있는 함수:**
```javascript
// 외부 상태를 변경
let count = 0;

function increment() {
  count = count + 1;  // 사이드 이펙트!
  return count;
}

increment();  // 1
increment();  // 2 (다른 결과)
```

---

### 다양한 사이드 이펙트 유형

#### 1. 데이터 가져오기 (HTTP 요청)

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // HTTP 요청 사이드 이펙트
    fetch('/api/user/123')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return user ? <h1>{user.name}</h1> : <p>로딩...</p>;
}
```

#### 2. DOM 직접 조작

```jsx
function ScrollToTop() {
  useEffect(() => {
    // DOM 조작 사이드 이펙트
    window.scrollTo(0, 0);
  }, []);

  return <div>페이지 내용</div>;
}
```

#### 3. 타이머 설정

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 타이머 설정 사이드 이펙트
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);  // 정리
  }, []);

  return <p>{seconds}초 경과</p>;
}
```

#### 4. 이벤트 리스너 등록

```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 이벤트 리스너 등록 사이드 이펙트
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);  // 정리
  }, []);

  return <p>너비: {width}px</p>;
}
```

#### 5. 로깅/분석

```jsx
function Button() {
  const handleClick = () => {
    // 로깅 사이드 이펙트
    console.log('버튼 클릭!');
    analytics.track('button_clicked');
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

#### 6. 웹 소켓 연결

```jsx
function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 웹 소켓 연결 사이드 이펙트
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    return () => socket.close();  // 정리
  }, []);

  return (
    <ul>
      {messages.map((msg, i) => <li key={i}>{msg}</li>)}
    </ul>
  );
}
```

#### 7. 로컬 스토리지 접근

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // 로컬 스토리지 읽기 사이드 이펙트
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // 로컬 스토리지 쓰기 사이드 이펙트
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme} 모드
    </button>
  );
}
```

#### 8. 문서 타이틀 변경

```jsx
function Notification({ count }) {
  useEffect(() => {
    // 문서 타이틀 변경 사이드 이펙트
    document.title = count > 0
      ? `(${count}) 새 알림`
      : '애플리케이션';
  }, [count]);

  return <div>알림: {count}</div>;
}
```

#### 9. 캔버스/서드파티 라이브러리 초기화

```jsx
function Chart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Chart.js 초기화 사이드 이펙트
    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data
    });

    return () => chart.destroy();  // 정리
  }, [data]);

  return <canvas ref={canvasRef} />;
}
```

#### 10. 브라우저 알림

```jsx
function NotificationButton() {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    // 알림 권한 요청 사이드 이펙트
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  const showNotification = () => {
    // 알림 표시 사이드 이펙트
    if (permission === 'granted') {
      new Notification('안녕하세요!');
    }
  };

  return <button onClick={showNotification}>알림</button>;
}
```

---

### 사이드 이펙트 분류

#### 동기 vs 비동기

```jsx
// 동기 사이드 이펙트
function Example() {
  useEffect(() => {
    document.title = '제목';  // 즉시 실행
  }, []);
}

// 비동기 사이드 이펙트
function Example() {
  useEffect(() => {
    fetch('/api/data')  // 비동기 실행
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);
}
```

#### 일회성 vs 반복성

```jsx
// 일회성 사이드 이펙트
function Example() {
  useEffect(() => {
    console.log('컴포넌트 마운트');  // 한 번만 실행
  }, []);
}

// 반복성 사이드 이펙트
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('카운트:', count);  // count마다 실행
  }, [count]);
}
```

#### 정리 필요 vs 정리 불필요

```jsx
// 정리가 필요한 사이드 이펙트
function Example() {
  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000);
    return () => clearInterval(timer);  // 정리
  }, []);
}

// 정리가 불필요한 사이드 이펙트
function Example() {
  useEffect(() => {
    console.log('로그');  // 정리 불필요
  }, []);
}
```

---

### 모든 사이드 이펙트가 useEffect에 필요한가?

#### ❌ useEffect가 필요한 경우

```jsx
// 이벤트 핸들러는 useEffect 불필요
function Button() {
  const handleClick = () => {
    console.log('클릭!');  // 이벤트 핸들러에서 바로 처리
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

#### ✅ useEffect가 필요한 경우

```jsx
// 컴포넌트 렌더링 후 실행되어야 할 때
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 컴포넌트 마운트 후 데이터 가져오기
    fetchData().then(setData);
  }, []);

  return data ? <div>{data}</div> : <div>로딩...</div>;
}
```

---

### 요약

#### 사이드 이펙트 유형

| 유형 | 예시 | 정리 필요 |
|------|------|----------|
| **데이터 가져오기** | API 호출, 웹 소켓 | ✅ |
| **DOM 조작** | 제목 변경, 포커스 | ❌ |
| **타이머** | setInterval, setTimeout | ✅ |
| **이벤트 리스너** | resize, scroll | ✅ |
| **구독** | WebSocket, Store | ✅ |
| **로깅** | console.log, analytics | ❌ |
| **브라우저 API** | localStorage, notification | ❌ |
| **서드파티 라이브러리** | Chart.js, Map | ✅ |

#### 핵심 개념

```
사이드 이펙트:
- 함수의 외부 상태를 변경하는 모든 작업
- HTTP 요청만이 유일한 사이드 이펙트가 아님
- DOM 조작, 타이머, 이벤트, 로깅 등 모두 포함
- useEffect로 안전하게 처리

useEffect 필요 여부:
이벤트 핸들러? → NO
렌더링 후 실행? → YES
정리 필요? → cleanup 함수
```

---

## 8.3 useEffect() 훅으로 사이드 이펙트 처리하기

`useEffect` Hook을 사용하여 React 컴포넌트에서 사이드 이펙트를 안전하게 처리하는 방법을 알아봅시다.

---

### useEffect 기본 문법

```jsx
useEffect(setup, dependencies?)
```

**매개변수:**
- `setup`: 사이드 이펙트를 설정하는 함수
  - 선택적으로 cleanup 함수를 반환
- `dependencies`: 의존성 배열 (선택)

---

### useEffect 사용 패턴

#### 1. 의존성 없는 useEffect (매 렌더링 후 실행)

```jsx
function Logger() {
  const [count, setCount] = useState(0);

  // 매 렌더링 후 실행
  useEffect(() => {
    console.log('컴포넌트가 렌더링되었습니다.');
  });

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

#### 2. 빈 의존성 배열 (컴포넌트 마운트 시 한 번만 실행)

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);  // 빈 배열 = 한 번만 실행

  if (loading) return <p>로딩 중...</p>;
  return <div>{data.name}</div>;
}
```

#### 3. 특정 의존성이 변경될 때만 실행

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // userId가 변경될 때만 실행
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);  // userId가 변경되면 다시 실행

  return user ? <h1>{user.name}</h1> : <p>로딩...</p>;
}
```

#### 4. Cleanup 함수 (정리)

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 사이드 이펙트 설정
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // cleanup 함수 반환
    return () => {
      clearInterval(interval);  // 정리
    };
  }, []);  // 빈 배열

  return <p>{seconds}초</p>;
}
```

---

### useEffect 실행 타이밍

```
┌─────────────────────────────────────────────┐
│  렌더링 사이클                              │
└─────────────────────────────────────────────┘

1. React가 컴포넌트 렌더링
   ↓
2. 브라우저가 화면 업데이트 (Paint)
   ↓
3. useEffect 실행
   - setup 함수 실행
   - cleanup이 있다면 먼저 실행 (이전 effect의)
```

**예시:**

```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('1. Effect 실행');
    document.title = `카운트: ${count}`;
  }, [count]);

  console.log('2. 렌더링');

  return <h1>{count}</h1>;
}

// 실행 순서:
// 1. 렌더링 (console.log 실행)
// 2. 화면 업데이트
// 3. Effect 실행 (console.log 실행)
```

---

### 실전 예시

#### 1. 문서 타이틀 업데이트

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `카운트: ${count}`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      카운트: {count}
    </button>
  );
}
```

#### 2. 윈도우 이벤트 리스너

```jsx
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // cleanup: 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <p>너비: {width}px</p>;
}
```

#### 3. API 요청

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('에러:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

#### 4. 타이머

```jsx
function Countdown({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    // timeLeft가 0이 되면 타이머 정지
    if (timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // cleanup: 타이머 취소
    return () => clearTimeout(timer);
  }, [timeLeft]);  // timeLeft가 변경될 때마다 실행

  return <p>남은 시간: {timeLeft}초</p>;
}
```

#### 5. 포커스 관리

```jsx
function SearchInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 자동 포커스
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="검색..." />;
}
```

#### 6. localStorage 동기화

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // 초기화 시 localStorage에서 값 읽기
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // theme가 변경될 때마다 localStorage에 저장
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme} 모드
    </button>
  );
}
```

---

### 여러 Effect 사용

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Effect 1: 사용자 정보 가져오기
  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);

  // Effect 2: 사용자 게시글 가져오기
  useEffect(() => {
    fetch(`/api/user/${userId}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, [userId]);

  // Effect 3: 페이지 타이틀 업데이트
  useEffect(() => {
    if (user) {
      document.title = `${user.name}의 프로필`;
    }
  }, [user]);

  return (
    <div>
      <h1>{user?.name}</h1>
      <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
}
```

---

### 조건부 Effect

```jsx
function Notification({ show, message }) {
  useEffect(() => {
    if (!show) return;  // 조건부 실행

    const timer = setTimeout(() => {
      console.log(message);
    }, 1000);

    return () => clearTimeout(timer);
  }, [show, message]);

  return show ? <div>{message}</div> : null;
}
```

---

### 요약

#### useEffect 사용 패턴

| 패턴 | 의존성 | 실행 시점 | 사용 예시 |
|------|---------|----------|----------|
| **매 렌더링 후** | 없음 또는 `undefined` | 모든 렌더링 후 | 로깅, 디버깅 |
| **한 번만 실행** | `[]` | 컴포넌트 마운트 시 | 초기 데이터 가져오기 |
| **특정 값 변경 시** | `[dep1, dep2]` | 의존성 변경 시 | props 기반 업데이트 |

#### 실행 순서

```
1. 컴포넌트 렌더링
2. 브라우저 화면 업데이트
3. useEffect 실행
   - 이전 effect의 cleanup (있으면)
   - 현재 effect의 setup
```

#### 모벨 사례

1. **필요한 의존성만 포함**: 모든 의존성 명시
2. **cleanup 함수 활용**: 리소스 해제
3. **Effect 분리**: 각 Effect는 하나의 책임
4. **조건부 실행**: early return으로 조건 처리

---

## 8.4 Effect와 의존성

Effect의 의존성을 올바르게 관리하는 것은 React의 핵심 개념입니다. 의존성을 잘못 관리하면 버그와 성능 문제가 발생할 수 있습니다.

---

### 필요한 의존성들

Effect에서 사용하는 모든 반응형 값(reactive values)은 의존성 배열에 포함해야 합니다.

#### 반응형 값의 종류

```jsx
function Example() {
  // 반응형 값들
  const [state, setState] = useState(0);        // State
  const [props, setProps] = useState({});       // Props
  const derived = state * 2;                    // State에서 파생된 값
  const context = useContext(MyContext);        // Context

  useEffect(() => {
    // 이 Effect는 state, props, derived, context에 의존
    console.log(state, props, derived, context);
  }, [state, props, derived, context]);  // 모두 명시
}
```

#### 의존성 누락의 문제

```jsx
// ❌ 의존성 누락
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // step을 사용하지만 의존성 배열에 없음
      setCount(c => c + step);  // 항상 step = 1로 고정됨!
    }, 1000);

    return () => clearInterval(interval);
  }, []);  // step이 누락됨

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setStep(s => s + 1)}>단계 증가</button>
    </div>
  );
}

// ✅ 올바른 의존성
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + step);  // 최신 step 사용
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);  // step 포함

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setStep(s => s + 1)}>단계 증가</button>
    </div>
  );
}
```

---

### Effect 이후 Cleanup (정리)

Cleanup 함수는 Effect가 다시 실행되거나 컴포넌트가 언마운트되기 전에 실행됩니다.

#### Cleanup 실행 시점

```
Effect 실행 (의존성 변경)
  ↓
Cleanup 함수 실행 (이전 Effect의)
  ↓
새로운 Effect의 setup 함수 실행
```

#### 실전 예시: 채팅 앱

```jsx
function Chat({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log(`${roomId} 방에 연결 중...`);

    // setup: 연결 생성
    const connection = createConnection(roomId);
    connection.connect();
    connection.on('message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    // cleanup: 연결 해제
    return () => {
      connection.disconnect();
      console.log(`${roomId} 방 연결 해제`);
    };
  }, [roomId]);  // roomId가 변경되면 cleanup → 새 연결

  return (
    <ul>
      {messages.map((msg, i) => <li key={i}>{msg}</li>)}
    </ul>
  );
}
```

#### 실행 순서

```
roomId가 "general"에서 "random"으로 변경:

1. Cleanup 실행 ("general" 연결 해제)
2. Setup 실행 ("random" 연결 생성)
```

---

### 여러 Effect 다루기

하나의 컴포넌트에서 여러 Effect를 사용할 때 각 Effect는 독립적으로 실행됩니다.

#### 독립적인 Effect

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [theme, setTheme] = useState('light');

  // Effect 1: 사용자 정보
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Effect 2: 사용자 게시글
  useEffect(() => {
    fetchPosts(userId).then(setPosts);
  }, [userId]);

  // Effect 3: 테마 적용
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Effect 4: 페이지 타이틀
  useEffect(() => {
    if (user) {
      document.title = user.name;
    }
  }, [user]);

  // 각 Effect는 독립적으로 실행됨
  return <div>...</div>;
}
```

#### Effect 실행 순서

```
렌더링 후:
1. Effect 1 cleanup (있으면)
2. Effect 1 setup
3. Effect 2 cleanup (있으면)
4. Effect 2 setup
5. Effect 3 cleanup (있으면)
6. Effect 3 setup
...
```

---

### Function as 의존성

함수를 의존성으로 사용할 때 주의해야 합니다.

#### 문제: 함수 재생성

```jsx
// ❌ 함수가 매 렌더링마다 재생성됨
function Chat({ roomId }) {
  const [message, setMessage] = useState('');

  // handleMessage이 매 렌더링마다 새로운 함수
  const handleMessage = (msg) => {
    showMessage(msg);
  };

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('message', handleMessage);

    return () => connection.disconnect();
  }, [roomId, handleMessage]);  // handleMessage가 계속 변경됨!

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}
```

#### 해결책 1: useEffect 내부 정의

```jsx
// ✅ Effect 내부에서 함수 정의
function Chat({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Effect 내부에서 함수 정의
    const handleMessage = (msg) => {
      showMessage(msg);
    };

    const connection = createConnection(roomId);
    connection.on('message', handleMessage);

    return () => connection.disconnect();
  }, [roomId]);  // handleMessage가 의존성에 필요 없음

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}
```

#### 해결책 2: useCallback 사용

```jsx
// ✅ useCallback로 함수 메모이제이션
import { useCallback } from 'react';

function Chat({ roomId }) {
  const [message, setMessage] = useState('');

  const handleMessage = useCallback((msg) => {
    showMessage(msg);
  }, []);  // 의존성이 없으므로 재생성 안 됨

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('message', handleMessage);

    return () => connection.disconnect();
  }, [roomId, handleMessage]);  // handleMessage가 안정적

  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}
```

---

### 불필요한 Effect 실행 피하기

Effect를 최소화하여 성능을 개선할 수 있습니다.

#### 1. 렌더링 중 계산 가능

```jsx
// ❌ 불필요한 Effect
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // 렌더링 중에 계산 가능한데 Effect 사용
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return <input value={fullName} />;
}

// ✅ 렌더링 중 계산
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // 렌더링 중에 직접 계산
  const fullName = `${firstName} ${lastName}`;

  return <input value={fullName} />;
}
```

#### 2. State 업데이트 중 복잡한 로직

```jsx
// ❌ 불필요한 Effect
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // State 업데이트 중에 처리 가능
    setCount(c => c + 1);
  }, []);

  return <p>{count}</p>;
}

// ✅ 초기값으로 처리
function Counter() {
  const [count, setCount] = useState(1);  // 초기값을 1로 설정

  return <p>{count}</p>;
}
```

#### 3. props 기반 파생 값

```jsx
// ❌ 불필요한 Effect
function UserCard({ user }) {
  const [name, setName] = useState('');

  useEffect(() => {
    // props에서 파생 가능
    setName(user.name);
  }, [user.name]);

  return <h1>{name}</h1>;
}

// ✅ props 직접 사용
function UserCard({ user }) {
  return <h1>{user.name}</h1>;
}
```

---

### Effect와 비동기 코드

Effect에서 비동기 작업을 처리할 때 주의해야 합니다.

#### async/await 사용

```jsx
// ❌ cleanup을 처리할 수 없음
useEffect(async () => {
  const data = await fetchData();
  setState(data);
}, []);

// ✅ async 함수 내부 정의
useEffect(() => {
  const fetchDataAsync = async () => {
    const data = await fetchData();
    setState(data);
  };

  fetchDataAsync();
}, []);
```

#### 비동기 cleanup

```jsx
// ✅ AbortController로 취소 가능
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          signal: controller.signal  // 취소 신호 연결
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('에러:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // cleanup: 요청 취소
    return () => {
      controller.abort();
    };
  }, [userId]);

  if (loading) return <p>로딩 중...</p>;
  return <h1>{user?.name}</h1>;
}
```

---

### Hook의 규칙

React Hook에는 반드시 따라야 할 규칙들이 있습니다.

#### 규칙 1: 최상위 수준에서만 호출

```jsx
// ❌ 조건문 안에서 Hook 호출
function BadComponent() {
  const [count, setCount] = useState(0);

  if (count > 0) {
    useEffect(() => {  // 조건문 안에서 호출!
      console.log('count > 0');
    }, [count]);
  }

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ✅ 조건을 Hook 안으로 이동
function GoodComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {  // Hook 안에서 조건 처리
      console.log('count > 0');
    }
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 규칙 2: 함수 컴포넌트에서만 호출

```jsx
// ❌ 일반 함수에서 Hook 호출
function badFunction() {
  const [state, setState] = useState(0);  // ❌
  useEffect(() => {}, []);  // ❌
}

// ✅ 컴포넌트나 커스텀 Hook에서만 호출
function goodComponent() {
  const [state, setState] = useState(0);  // ✅
  useEffect(() => {}, []);  // ✅
}
```

#### 규칙 3: 같은 순서로 호출

```jsx
// ❌ Hook 순서가 바뀜
function BadComponent() {
  const [count, setCount] = useState(0);

  if (someCondition) {
    const [name, setName] = useState('');  // 조건부 Hook
  }

  useEffect(() => {}, []);  // 순서가 일정하지 않음
}

// ✅ 항상 같은 순서
function GoodComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  useEffect(() => {}, []);  // 항상 같은 순서

  if (someCondition) {
    // 로직만 처리
  }
}
```

---

### ESLint 규칙

React Hook 규칙을 자동으로 검사하는 ESLint 규칙을 사용하세요.

```json
{
  "eslintConfig": {
    "extends": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
}
```

---

### 요약

#### 의존성 관리 원칙

```
1. 모든 반응형 값을 의존성에 포함
2. Effect 내부에서 함수 정의 (불필요한 의존성 방지)
3. useCallback로 함수 안정화
4. 불필요한 Effect 제거
5. ESLint 규칙 활용
```

#### Effect 최적화 체크리스트

| 항목 | 확인 방법 |
|------|----------|
| **불필요한 Effect** | 렌더링 중 계산 가능? |
| **의존성 누락** | ESLint 경고 확인 |
| **함수 의존성** | Effect 내부 정의 또는 useCallback |
| **비동기 처리** | AbortController로 취소 가능 |
| **cleanup** | 타이머, 이벤트, 구독 정리 |

#### 핵심 takeaways

> 💡 **Effect와 의존성**
>
> - 모든 반응형 값은 의존성에 포함
> - Effect 내부에서 함수 정의로 의존성 최소화
> - Cleanup으로 리소스 해제
> - 비동기 작업은 취소 가능하게
> - Hook 규칙을 항상 준수
