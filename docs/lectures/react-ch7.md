# React 교육 문서

## 📚 목차

### 7. Portals와 Ref
- [7.1 Ref가 없다면?](#71-ref가-없다면)
- [7.2 Ref vs State](#72-ref-vs-state)
- [7.3 DOM 직접 접근보다는 Ref 사용하기](#73-dom-직접-접근보다는-ref-사용하기)
- [7.4 Portal](#74-portal)

---

## 7. Portals와 Ref

## 7.1 Ref가 없다면?

React는 선언적인 UI 라이브러리로, 일반적으로 DOM에 직접 접근할 필요가 없습니다. 하지만 때로는 DOM 요소에 직접 접근해야 할 때가 있습니다. Ref가 없다면 어떤 문제가 발생하는지 알아봅시다.

---

### DOM 직접 접근의 문제점

#### 문제 1: 입력창에 포커스 주기

```jsx
// ❌ Ref 없이 시도하면 작동하지 않음
function Form() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(true);
    // 입력창이 나타난 직후 포커스를 주고 싶지만,
    // DOM 요소를 찾을 방법이 없음!
    document.getElementById('my-input')?.focus();  // 위험한 방식
  };

  return (
    <div>
      <button onClick={handleClick}>입력창 보기</button>
      {showInput && <input id="my-input" type="text" />}
    </div>
  );
}
```

#### 문제 2: 스크롤 위치 제어

```jsx
// ❌ DOM 직접 접근으로 스크롤 제어
function ChatMessages() {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // DOM을 직접 조작하는 비선언적 접근
    const element = document.getElementById('messages-end');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 메시지 목록 */}
      <div id="messages-end" />
    </div>
  );
}
```

#### 문제 3: 미디어 요소 제어

```jsx
// ❌ Ref 없이 비디오 제어하기 어려움
function VideoPlayer() {
  const playVideo = () => {
    // 비디오 요소에 접근해야 하는데 방법이 없음
    const video = document.querySelector('video');
    video?.play();  // 안전하지 않음
  };

  return (
    <div>
      <video src="movie.mp4" />
      <button onClick={playVideo}>재생</button>
    </div>
  );
}
```

---

### 기존 해결 방법의 한계

#### 방법 1: ID로 DOM 접근

```jsx
// ⚠️ 권장하지 않는 방식
function Form() {
  const handleFocus = () => {
    const input = document.getElementById('username-input');
    input?.focus();
  };

  return (
    <input id="username-input" type="text" />
  );
}
```

**문제점:**
- React와 DOM 간의 불일치 가능성
- 컴포넌트 재사용성 저하
- ID 충돌 위험
- React의 선언적 패러다임 위반

#### 방법 2: 콜백 Ref

```jsx
// ⚠️ 번거로운 방식
function Form() {
  let inputElement = null;

  const setInputRef = (element) => {
    inputElement = element;
  };

  const handleClick = () => {
    inputElement?.focus();
  };

  return (
    <div>
      <input ref={setInputRef} type="text" />
      <button onClick={handleClick}>포커스</button>
    </div>
  );
}
```

**문제점:**
- 코드가 복잡해짐
- Ref 관리가 어려움
- 컴포넌트 리렌더링 시 Ref가 초기화될 수 있음

---

### Ref가 필요한 상황

#### 1. 포커스 관리

```jsx
function SearchForm() {
  const inputRef = useRef(null);

  // 페이지 로드 시 자동 포커스
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form>
      <input
        ref={inputRef}
        type="text"
        placeholder="검색어 입력"
      />
    </form>
  );
}
```

#### 2. 텍스트 선택 및 미디어 재생 제어

```jsx
function MediaPlayer() {
  const videoRef = useRef(null);

  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();
  const seek = (time) => videoRef.current.currentTime = time;

  return (
    <div>
      <video ref={videoRef} src="movie.mp4" />
      <button onClick={play}>재생</button>
      <button onClick={pause}>일시정지</button>
    </div>
  );
}
```

#### 3. 애니메이션 트리거

```jsx
function AnimatedBox() {
  const boxRef = useRef(null);

  const triggerAnimation = () => {
    boxRef.current.classList.add('animate');
    setTimeout(() => {
      boxRef.current.classList.remove('animate');
    }, 1000);
  };

  return (
    <div ref={boxRef} className="box">
      박스
    </div>
  );
}
```

#### 4. 서드파티 라이브러리 통합

```jsx
// 차트 라이브러리, 지도 라이브러리 등
function ChartComponent() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef} />;
}
```

---

### Ref가 없을 때의 제약

```
┌─────────────────────────────────────────────┐
│  Ref가 없으면 못하는 것들                     │
└─────────────────────────────────────────────┘

❌ DOM 요소에 직접 접근 불가
❌ 포커스, 선택, 미디어 제어 불가
❌ 애니메이션 직접 트리거 불가
❌ 서드파티 DOM 라이브러리 사용 불가
❌ 크기, 위치 등 DOM 메트릭 확인 불가
❌ 스크롤 위치 제어 불가
```

---

### 요약

#### Ref의 필요성

```
Ref (Reference)는:
1. React 컴포넌트의 "탈출구"
2. DOM 요소에 직접 접근하는 안전한 방법
3. 렌더링을 일으키지 않는 값 저장
4. 선언적 React의 필요한 보완 도구
```

#### Ref가 필요한 상황

| 상황 | 예시 |
|------|------|
| **포커스 관리** | 입력창 자동 포커스 |
| **미디어 제어** | 비디오 재생/일시정지 |
| **애니메이션** | CSS 클래스 추가/제거 |
| **서드파티 통합** | 차트, 지도 라이브러리 |
| **DOM 메트릭** | 요소 크기, 위치 측정 |
| **스크롤 제어** | 채팅창 자동 스크롤 |

---

## 7.2 Ref vs State

Ref와 State는 모두 컴포넌트 내에서 데이터를 저장하지만, 목적과 동작 방식이 완전히 다릅니다.

---

### 기본 차이점

| 구분 | State | Ref |
|------|-------|-----|
| **목적** | 렌더링을 위한 데이터 | 렌더링 없는 값 저장 |
| **변경 시** | 컴포넌트 재렌더링 | 재렌더링 ❌ |
| **업데이트** | `setState` 함수 | `.current` 속성 |
| **동기성** | 비동기 (배치) | 동기 |
| **접근** | 렌더링 중 읽기 | 어디서든 접근 가능 |

---

### State: 렌더링을 위한 데이터

State는 컴포넌트의 출력(UI)에 영향을 미치는 데이터입니다.

```jsx
function Counter() {
  // State: 변경 시 재렌더링
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}
```

**State의 특징:**
- 변경하면 컴포넌트가 재렌더링됨
- UI에 표시되는 데이터
- 사용자 인터페이스 상태

---

### Ref: 렌더링 없는 값 저장

Ref는 렌더링과 무관한 값을 저장합니다.

```jsx
function Timer() {
  // Ref: 변경되어도 재렌더링 안 됨
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current++;
    console.log('클릭 횟수:', countRef.current);
    // UI는 업데이트되지 않음!
  };

  return (
    <div>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}
```

**Ref의 특징:**
- 변경해도 재렌더링되지 않음
- DOM 요소 참조
- 이전 값 기억 (렌더링 간)

---

### 렌더링 동작 비교

#### State로 구현

```jsx
function CounterWithState() {
  const [count, setCount] = useState(0);

  console.log('렌더링됨!');

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}

// 클릭 시:
// 1. setCount 호출
// 2. State 변경
// 3. 재렌더링
// 4. 콘솔: "렌더링됨!"
```

#### Ref로 구현

```jsx
function CounterWithRef() {
  const countRef = useRef(0);

  console.log('렌더링됨!');  // 최초 1번만 출력

  const handleClick = () => {
    countRef.current++;
    console.log('현재 값:', countRef.current);
    // 재렌더링 없음!
  };

  return (
    <div>
      <p>내부 카운트: {countRef.current}</p>
      <button onClick={handleClick}>증가</button>
    </div>
  );
}

// 클릭 시:
// 1. countRef.current++
// 2. 재렌더링 없음
// 3. 콘솔: "현재 값: 1", "현재 값: 2", ...
// 4. UI는 변하지 않음
```

---

### 언제 State를 사용할까?

```jsx
function TemperatureConverter() {
  // ✅ State: UI에 표시되는 값
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(32);

  const handleCelsiusChange = (e) => {
    const c = parseFloat(e.target.value);
    setCelsius(c);
    setFahrenheit((c * 9/5) + 32);
  };

  return (
    <div>
      <input
        value={celsius}
        onChange={handleCelsiusChange}
        placeholder="섭씨 온도"
      />
      <p>화씨: {fahrenheit}°F</p>
    </div>
  );
}
```

**State 사용 기준:**
- ✅ UI에 표시되어야 하는 데이터
- ✅ 변경 시 화면이 업데이트되어야 함
- ✅ 사용자 인터페이스 상태

---

### 언제 Ref를 사용할까?

#### 1. DOM 요소 참조

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current.focus();  // DOM 직접 접근
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focus}>포커스</button>
    </div>
  );
}
```

#### 2. 이전 값 기억

```jsx
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    // 렌더링마다 이전 값 저장
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>현재: {count}</p>
      <p>이전: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}
```

#### 3. 타이머 ID 저장

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Ref에 타이머 ID 저장
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 정리 시 Ref 사용
    return () => clearInterval(intervalRef.current);
  }, []);

  return <p>경과 시간: {seconds}초</p>;
}
```

**Ref 사용 기준:**
- ✅ DOM 요소 직접 접근
- ✅ 렌더링과 무관한 값 저장
- ✅ 타이머 ID, 소켓 등 레퍼런스
- ✅ 이전 렌더링 값 기억

---

### State와 Ref 함께 사용하기

```jsx
function Chat() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // State로 새 메시지 추가
  const addMessage = (text) => {
    setMessages([...messages, { id: Date.now(), text }]);
  };

  // 메시지 추가 후 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div>
      <div className="messages">
        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
        {/* Ref로 스크롤 위치 제어 */}
        <div ref={messagesEndRef} />
      </div>
      <button onClick={() => addMessage('안녕!')}>
        메시지 추가
      </button>
    </div>
  );
}
```

---

### 일반적인 실수

#### 실수 1: Ref로 UI 상태 관리

```jsx
// ❌ 나쁜 예시: Ref로 UI 상태 관리
function ToggleButton() {
  const isOnRef = useRef(false);

  const handleClick = () => {
    isOnRef.current = !isOnRef.current;
    // UI가 업데이트되지 않음!
  };

  return (
    <button onClick={handleClick}>
      {isOnRef.current ? 'ON' : 'OFF'}  {/* 항상 'OFF' 표시 */}
    </button>
  );
}

// ✅ 올바른 예시: State로 UI 상태 관리
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}  {/* 정상 작동 */}
    </button>
  );
}
```

#### 실수 2: State로 DOM 참조

```jsx
// ❌ 나쁜 예시: State로 DOM 참조
function InputFocus() {
  const [input, setInput] = useState(null);

  useEffect(() => {
    input?.focus();  // 불필요한 재렌더링
  }, [input]);

  return <input ref={setInput} />;
}

// ✅ 올바른 예시: Ref로 DOM 참조
function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();  // 재렌더링 없음
  }, []);

  return <input ref={inputRef} />;
}
```

---

### 요약

#### 선택 가이드

```
State vs Ref 선택:

데이터가 UI에 표시되나요?
  YES → State 사용
  NO  → 아래로

렌더링을 트리거해야 하나요?
  YES → State 사용
  NO  → 아래로

DOM 요소에 접근해야 하나요?
  YES → Ref 사용
  NO  → 아래로

렌더링 간에 값을 유지해야 하나요?
  YES → Ref 사용
  NO  → 지역 변수 사용
```

#### 비교표

| 구분 | State | Ref |
|------|-------|-----|
| **용도** | UI 상태 관리 | DOM 참조, 렌더링 없는 값 |
| **렌더링** | 변경 시 재렌더링 | 재렌더링 없음 |
| **접근 방법** | 렌더링 중에만 | 어디서든 가능 |
| **초기화** | 재렌더링 시 유지됨 | 재렌더링 시 유지됨 |
| **예시** | 카운트, 입력 값 | DOM 요소, 타이머 ID |

---

## 7.3 DOM 직접 접근보다는 Ref 사용하기

React에서 DOM 요소에 직접 접근해야 할 때, `document.getElementById`나 `querySelector` 같은 방식 대신 `useRef` Hook을 사용하는 것이 권장됩니다.

---

### Ref의 기본 사용법

#### useRef Hook

```jsx
import { useRef } from 'react';

function MyComponent() {
  // Ref 생성
  const myRef = useRef(null);

  return (
    <div ref={myRef}>
      내용
    </div>
  );
}
```

**useRef의 반환값:**
```javascript
{
  current: null  // 현재 값
}
```

#### Ref로 DOM 요소 참조

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Ref를 통해 DOM 요소에 접근
    inputRef.current.focus();
    inputRef.current.select();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="입력해주세요"
      />
      <button onClick={handleClick}>포커스</button>
    </div>
  );
}
```

---

### Ref 사용 패턴

#### 1. 입력창 포커스

```jsx
function Form() {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleSubmit = () => {
    // 이름 입력창이 비어있으면 포커스
    if (!nameInputRef.current.value) {
      nameInputRef.current.focus();
      return;
    }

    // 이메일 입력창이 비어있으면 포커스
    if (!emailInputRef.current.value) {
      emailInputRef.current.focus();
      return;
    }

    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={nameInputRef}
        type="text"
        placeholder="이름"
      />
      <input
        ref={emailInputRef}
        type="email"
        placeholder="이메일"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

#### 2. 자동 스크롤

```jsx
function ChatMessages() {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="chat-container">
      <div className="messages">
        {/* 메시지 목록 */}
        <p>안녕!</p>
        <p>반가워!</p>
        {/* 스크롤 위치 참조 */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
```

#### 3. 미디어 제어

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (volume) => {
    videoRef.current.volume = volume;
  };

  const handleSeek = (time) => {
    videoRef.current.currentTime = time;
  };

  return (
    <div>
      <video
        ref={videoRef}
        src="movie.mp4"
        width="640"
      />
      <div>
        <button onClick={togglePlay}>
          {isPlaying ? '일시정지' : '재생'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
      </div>
    </div>
  );
}
```

#### 4. 캔버스 그리기

```jsx
function DrawingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 사각형 그리기
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);

    // 원 그리기
    ctx.beginPath();
    ctx.arc(200, 75, 50, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={200}
    />
  );
}
```

#### 5. DOM 크기 측정

```jsx
function BoxSize() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const measureBox = () => {
    if (boxRef.current) {
      const { offsetWidth, offsetHeight } = boxRef.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  };

  useEffect(() => {
    measureBox();
    window.addEventListener('resize', measureBox);
    return () => window.removeEventListener('resize', measureBox);
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '50%',
          height: '200px',
          backgroundColor: 'lightblue'
        }}
      >
        박스
      </div>
      <p>너비: {size.width}px</p>
      <p>높이: {size.height}px</p>
    </div>
  );
}
```

---

### 콜백 Ref

Ref 값을 설정할 때 추가 로직을 실행해야 할 때 사용합니다.

```jsx
function InputWithCallback() {
  const inputRef = useCallback((node) => {
    if (node !== null) {
      // DOM 요소가 마운트될 때 실행
      node.focus();
      console.log('입력창이 생성되었습니다.');
    }
  }, []);

  return <input ref={inputRef} />;
}
```

#### 조건부 콜백 Ref

```jsx
function ConditionalRef() {
  const [show, setShow] = useState(true);
  const nodeRef = useCallback((node) => {
    if (node) {
      console.log('노드가 마운트됨:', node);
    } else {
      console.log('노드가 언마운트됨');
    }
  }, []);

  return (
    <div>
      {show && <div ref={nodeRef}>조건부 요소</div>}
      <button onClick={() => setShow(!show)}>
        토글
      </button>
    </div>
  );
}
```

---

### 여러 Ref 관리

```jsx
function Form() {
  const refs = useRef({
    username: null,
    email: null,
    password: null
  });

  const handleSubmit = () => {
    const { username, email, password } = refs.current;

    if (!username.value) {
      username.focus();
      return;
    }

    if (!email.value) {
      email.focus();
      return;
    }

    if (!password.value) {
      password.focus();
      return;
    }

    // 폼 제출
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={(node) => refs.current.username = node}
        name="username"
        placeholder="사용자명"
      />
      <input
        ref={(node) => refs.current.email = node}
        name="email"
        placeholder="이메일"
      />
      <input
        ref={(node) => refs.current.password = node}
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

---

### Ref와 useEffect 조합

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);

  // 컴포넌트 마운트 시 포커스
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="자동 포커스"
    />
  );
}
```

#### 의존성과 함께 사용

```jsx
function ScrollToItem({ items, selectedIndex }) {
  const selectedItemRef = useRef(null);

  // 선택된 항목이 변경되면 스크롤
  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }, [selectedIndex]);

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item.id}
          ref={index === selectedIndex ? selectedItemRef : null}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

---

### 주의사항

#### 1. Ref와 State 혼동

```jsx
// ❌ Ref를 State처럼 사용 (UI 업데이트 안 됨)
function Counter() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current++;
  };

  return (
    <div>
      <p>카운트: {countRef.current}</p>  {/* 항상 0 표시 */}
      <button onClick={increment}>증가</button>
    </div>
  );
}

// ✅ State를 사용하여 UI 업데이트
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

#### 2. Ref 초기화 타이밍

```jsx
function MyComponent() {
  const divRef = useRef(null);

  // ❌ ref.current는 아직 null일 수 있음
  console.log(divRef.current);  // null

  useEffect(() => {
    // ✅ 여기서는 ref가 설정됨
    console.log(divRef.current);  // DOM 요소
  }, []);

  return <div ref={divRef}>내용</div>;
}
```

---

### 요약

#### Ref 사용 모벨 사례

| 용도 | 예시 |
|------|------|
| **포커스 관리** | `inputRef.current.focus()` |
| **스크롤 제어** | `elementRef.current.scrollIntoView()` |
| **미디어 제어** | `videoRef.current.play()` |
| **크기 측정** | `boxRef.current.offsetWidth` |
| **캔버스 조작** | `canvasRef.current.getContext()` |
| **텍스트 선택** | `inputRef.current.select()` |

#### Ref 사용 가이드

```
Ref 사용 시 주의사항:

1. DOM에 직접 접근해야 할 때만 사용
2. State로 충분한 경우 Ref 사용 자제
3. ref.current는 초기에 null일 수 있음
4. useEffect에서 Ref 접근이 안전함
5. 서드파티 라이브러리 통합에 활용
```

---

## 7.4 Portal

React Portal은 컴포넌트를 부모 컴포넌트의 DOM 계층 외부에 렌더링하는 기능입니다. 주로 모달, 툴팁, 드롭다운 같은 오버레이 UI를 구현할 때 사용됩니다.

---

### Portal이란?

Portal은 컴포넌트를 부모 DOM 계층 구조 밖에 있는 DOM 노드로 렌더링할 수 있게 해줍니다.

```jsx
// 일반적인 렌더링
<div>
  <ParentComponent>
    <ChildComponent />  {/* 부모 안에 렌더링 */}
  </ParentComponent>
</div>

// Portal을 사용한 렌더링
<div>
  <ParentComponent />
  {/* 자식이 body 바로 아래에 렌더링 */}
  <div id="portal-root">
    <ChildComponent />
  </div>
</div>
```

---

### Portal 기본 사용법

#### createPortal API

```jsx
import { createPortal } from 'react';

function Modal({ children }) {
  return createPortal(
    children,                           // 렌더링할 컨텐츠
    document.getElementById('modal-root')  // 렌더링할 DOM 노드
  );
}
```

#### HTML 설정

```html
<!-- public/index.html -->
<div id="root"></div>
<div id="modal-root"></div>
```

#### 완전한 예시

```jsx
import { createPortal } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// 사용
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        모달 열기
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2>모달 제목</h2>
        <p>모달 내용입니다.</p>
      </Modal>
    </div>
  );
}
```

---

### Portal이 필요한 이유

#### 1. z-index 문제 해결

```jsx
// ❌ Portal 미사용: z-index가 부모에 의해 제한됨
function App() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="content">
        내용
      </div>
      {showModal && (
        <div style={{ position: 'absolute', zIndex: 1000 }}>
          모달  {/* z-index가 제한됨 */}
        </div>
      )}
    </div>
  );
}

// ✅ Portal 사용: z-index가 자유로움
function Modal({ children }) {
  return createPortal(
    <div style={{ position: 'fixed', zIndex: 1000 }}>
      {children}  {/* 최상위 레벨로 렌더링 */}
    </div>,
    document.body
  );
}
```

#### 2. CSS overflow 문제 해결

```jsx
// ❌ Portal 미사용: 부모의 overflow로 잘림
function App() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <div className="sidebar">
        사이드바
      </div>
      {showDropdown && (
        <div className="dropdown">
          드롭다운  {/* 잘림! */}
        </div>
      )}
    </div>
  );
}

// ✅ Portal 사용: overflow 영향 없음
function Dropdown({ children }) {
  return createPortal(
    <div className="dropdown">
      {children}  {/* 부모의 영향 받지 않음 */}
    </div>,
    document.body
  );
}
```

#### 3. 이벤트 버블링 유지

Portal로 렌더링해도 React 이벤트 시스템은 정상 작동합니다.

```jsx
function Parent() {
  const handleClick = () => {
    console.log('부모 클릭!');
  };

  return (
    <div onClick={handleClick}>
      <h1>부모 컴포넌트</h1>
      <Modal>
        <button onClick={() => console.log('모달 버튼')}>
          클릭
        </button>
      </Modal>
    </div>
  );
}

// Portal 사용 시에도 이벤트가 부모까지 버블링됨
```

---

### Portal 사용 시나리오

#### 1. 모달 (Modal)

```jsx
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}  // 오버레이 클릭 방지
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
```

#### 2. 툴팁 (Tooltip)

```jsx
function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);

  const handleMouseEnter = () => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 40,
        left: rect.left
      });
    }
    setIsVisible(true);
  };

  return (
    <>
      <span
        ref={targetRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>

      {isVisible && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`
          }}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
}
```

#### 3. 알림/토스트 (Toast)

```jsx
function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts([...toasts, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return createPortal(
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>,
    document.getElementById('toast-root')
  );
}
```

#### 4. 드롭다운 메뉴

```jsx
function Dropdown({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        메뉴
      </button>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="dropdown-menu"
          style={{
            position: 'fixed',
            top: `${buttonPosition.top + buttonHeight}px`,
            left: `${buttonPosition.left}px`
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="dropdown-item">
              {item}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
```

---

### Portal과 이벤트

#### 이벤트 버블링

Portal에서 발생한 이벤트는 React 컴포넌트 트리를 따라 버블링됩니다.

```jsx
function App() {
  const handleClick = () => {
    console.log('App 클릭!');
  };

  return (
    <div onClick={handleClick}>
      <h1>App</h1>
      <PortalModal>
        <button onClick={() => console.log('모달 버튼')}>
          클릭
        </button>
      </PortalModal>
    </div>
  );
}

// 클릭 시:
// 1. "모달 버튼"
// 2. "App 클릭!" (Portal에도 버블링됨)
```

#### 이벤트 캡처링 차단

```jsx
function Modal({ onClose, children }) {
  return createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}  // 오버레이 클릭 시 닫기
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}  // 모달 내부 클릭은 닫지 않음
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
```

---

### Portal과 포커스 관리

```jsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  // 열릴 때 포커스
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // 포커스 트랩
  const handleTab = (e) => {
    if (e.key === 'Tab') {
      // 모달 내부에서만 포커스 순환
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  return createPortal(
    <div
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={handleTab}
      className="modal"
    >
      {children}
    </div>,
    document.getElementById('modal-root')
  );
}
```

---

### Portal 사용 시 주의사항

#### 1. Portal 루트 확인

```jsx
// ❌ 안전하지 않음
function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')  // null일 수 있음
  );
}

// ✅ 안전한 방법
function Modal({ children }) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('modal-root를 찾을 수 없습니다.');
    return null;
  }

  return createPortal(children, modalRoot);
}
```

#### 2. Portal 정리

```jsx
function PortalExample({ children }) {
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    // DOM에 루트 생성
    const root = document.createElement('div');
    root.id = 'dynamic-portal-root';
    document.body.appendChild(root);

    setPortalRoot(root);

    // 정리
    return () => {
      document.body.removeChild(root);
    };
  }, []);

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
}
```

---

### 요약

#### Portal 사용 시나리오

| 상황 | 예시 |
|------|------|
| **모달/다이얼로그** | 경고 모달, 확인 다이얼로그 |
| **오버레이 UI** | 툴팁, 드롭다운, 팝오버 |
| **알림 메시지** | 토스트, 스낵바 |
| **전체 화면** | 라이트박스, 슬라이드 쇼 |
| **z-index 문제** | 부모 스타일 제한 회피 |

#### Portal 장단점

**장점:**
- ✅ CSS 계층 구조에서 자유로움
- ✅ z-index, overflow 문제 해결
- ✅ React 이벤트 시스템 유지
- ✅ 부모 스타일 영향 없음

**단점:**
- ❌ 추가적인 DOM 노드 필요
- ❌ 포커스 관리가 복잡해짐
- ❌ 접근성 고려 필요
- ❌ 테스트가 어려울 수 있음

#### Portal 사용 가이드

```
Portal 사용 여부 결정:

1. 오버레이 UI인가?
   → YES: Portal 고려

2. 부모의 CSS 영향을 받아선 안 되는가?
   → YES: Portal 사용

3. z-index 충돌이 있는가?
   → YES: Portal 사용

4. 단순한 자식 요소인가?
   → YES: 일반 렌더링 사용
```
