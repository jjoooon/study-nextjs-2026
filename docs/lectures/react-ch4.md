# React 교육 문서

## 📚 목차

### 4. 이벤트와 상태
- [4.1 이벤트](#41-이벤트)
- [4.2 상태](#42-상태)

---

## 4. 이벤트와 상태

## 4.1 이벤트

이벤트는 사용자의 동작이나 시스템의 발생을 React 컴포넌트가 감지하고 반응할 수 있게 하는 메커니즘입니다. React에서 이벤트를 다루는 방법을 알아봅시다.

---

### HTML 이벤트 vs React 이벤트

#### HTML 이벤트

```html
<!-- HTML에서의 이벤트 핸들링 -->
<button onclick="handleClick()">클릭</button>
<button onclick="alert('클릭됨!')">클릭</button>

<script>
  function handleClick() {
    console.log('버튼이 클릭되었습니다.');
  }
</script>
```

**HTML 이벤트의 문제점:**
- 인라인 문자열로만 함수 호출 가능
- `return false`로 기본 동작 막기
- 소문자로 작성 (`onclick`, `onchange`)

#### React 이벤트

```jsx
// React에서의 이벤트 핸들링
function Button() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다.');
  };

  return <button onClick={handleClick}>클릭</button>;
}

// 또는 인라인 화살표 함수
function Button() {
  return (
    <button onClick={() => console.log('클릭됨!')}>
      클릭
    </button>
  );
}
```

**React 이벤트의 장점:**
- 함수를 직접 전달
- `preventDefault()`로 기본 동작 막기
- camelCase로 작성 (`onClick`, `onChange`)

---

### React 이벤트 시스템

#### SyntheticEvent (합성 이벤트)

React는 브라우저마다 다른 네이티브 이벤트를 **SyntheticEvent**로 감싸서 **크로스 브라우저 호환성**을 제공합니다.

```jsx
function Form() {
  const handleSubmit = (event) => {
    // event는 SyntheticEvent 객체
    event.preventDefault();  // 기본 동작 막기
    console.log(event.type);  // 'submit'
    console.log(event.target);  // 이벤트가 발생한 요소
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">제출</button>
    </form>
  );
}
```

**SyntheticEvent의 주요 속성:**

| 속성 | 설명 |
|------|------|
| `type` | 이벤트 타입 ('click', 'submit' 등) |
| `target` | 이벤트가 발생한 DOM 요소 |
| `currentTarget` | 이벤트 핸들러가 attached된 요소 |
| `preventDefault()` | 기본 동작 취소 |
| `stopPropagation()` | 이벤트 전파 중단 |
| `nativeEvent` | 원래 브라우저 이벤트 (거의 사용 안 함) |

---

### 주요 이벤트 타입

#### 1️⃣ 마우스 이벤트

```jsx
function MouseEvents() {
  return (
    <div>
      <button onClick={() => alert('클릭!')}>
        onClick
      </button>

      <button onDoubleClick={() => alert('더블 클릭!')}>
        onDoubleClick
      </button>

      <div
        onMouseEnter={() => console.log('마우스 진입')}
        onMouseLeave={() => console.log('마우스离开了')}
        style={{ padding: '20px', border: '1px solid black' }}
      >
        마우스를 올려보세요
      </div>

      <button onMouseDown={() => console.log('마우스 눌름')}>
        onMouseDown
      </button>

      <button onMouseUp={() => console.log('마우스 뗌어짐')}>
        onMouseUp
      </button>

      <div
        onMouseMove={(e) => console.log(`X: ${e.clientX}, Y: ${e.clientY}`)}
        style={{ padding: '20px', border: '1px solid black' }}
      >
        마우스를 움직이세요
      </div>
    </div>
  );
}
```

#### 2️⃣ 키보드 이벤트

```jsx
function KeyboardEvents() {
  const handleKeyDown = (event) => {
    console.log(`눌린 키: ${event.key}`);
    console.log(`키 코드: ${event.keyCode}`);

    // Enter 키 감지
    if (event.key === 'Enter') {
      console.log('Enter 키가 눌렸습니다!');
    }

    // ESC 키 감지
    if (event.key === 'Escape') {
      console.log('ESC 키가 눌렸습니다!');
    }
  };

  return (
    <div>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onKeyUp={() => console.log('키가 떼어짐')}
        onKeyPress={() => console.log('키가 눌려짐 (레거시)')}
        placeholder="키보드를 눌러보세요"
      />
    </div>
  );
}
```

#### 3️⃣ 폼 이벤트

```jsx
function FormEvents() {
  const handleSubmit = (event) => {
    event.preventDefault();  // 폼 제출 방지
    console.log('폼이 제출되었습니다.');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`${name}: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="사용자명"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="이메일"
      />
      <select onChange={(e) => console.log(e.target.value)}>
        <option value="option1">옵션 1</option>
        <option value="option2">옵션 2</option>
      </select>
      <textarea
        onChange={(e) => console.log(e.target.value)}
        placeholder="메시지"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

#### 4️⃣ 포커스 이벤트

```jsx
function FocusEvents() {
  const handleFocus = () => {
    console.log('입력창이 포커스되었습니다.');
  };

  const handleBlur = () => {
    console.log('입력창이 포커스를 잃었습니다.');
  };

  return (
    <div>
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="포커스를 얻고 잃어보세요"
      />
    </div>
  );
}
```

---

### 이벤트 핸들러 작성 방법

#### 방법 1: 인라인 화살표 함수

```jsx
function Button() {
  return (
    <button onClick={() => alert('클릭!')}>
      클릭
    </button>
  );
}
```

**장점:** 간단한 로직에 적합
**단점:** JSX가 복잡해지면 가독성 저하

#### 방법 2: 함수로 정의

```jsx
function Button() {
  const handleClick = () => {
    alert('클릭!');
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

**장점:** JSX가 깔끔해지고 재사용 가능
**단점:** props가 필요한 경우 추가 처리 필요

#### 방법 3: props로 받은 핸들러

```jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// 사용
function App() {
  const handleClick = () => {
    alert('클릭!');
  };

  return <Button onClick={handleClick}>클릭</Button>;
}
```

**장점:** 컴포넌트 재사용성 최대화
**단점:** props 전달 필요

---

### 이벤트 객체 활용

#### event.target으로 데이터 접근

```jsx
function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // form 내의 모든 input 요소 접근
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    console.log(data);  // { username: '철수', email: 'test@example.com' }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="사용자명" />
      <input name="email" placeholder="이메일" />
      <button type="submit">제출</button>
    </form>
  );
}
```

#### event.preventDefault() 사용

```jsx
function Link({ href, children }) {
  const handleClick = (event) => {
    event.preventDefault();  // 링크 이동 방지
    console.log(`${href}로 이동하는 대신 다른 동작 실행`);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
```

#### event.stopPropagation() 사용

```jsx
function Parent() {
  const handleParentClick = () => {
    console.log('부모 클릭');
  };

  const handleChildClick = (event) => {
    event.stopPropagation();  // 이벤트 전파 중단
    console.log('자식 클릭만 실행');
  };

  return (
    <div onClick={handleParentClick}>
      <button onClick={handleChildClick}>
        자식 버튼
      </button>
    </div>
  );
}
```

---

### 매개변수 전달하기

#### 방법 1: 화살표 함수로 감싸기

```jsx
function ButtonList() {
  const handleButtonClick = (buttonName) => {
    alert(`${buttonName} 버튼이 클릭되었습니다!`);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('저장')}>
        저장
      </button>
      <button onClick={() => handleButtonClick('로드')}>
        로드
      </button>
      <button onClick={() => handleButtonClick('삭제')}>
        삭제
      </button>
    </div>
  );
}
```

#### 방법 2: bind 사용

```jsx
function ButtonList() {
  const handleButtonClick = (buttonName) => {
    alert(`${buttonName} 버튼이 클릭되었습니다!`);
  };

  return (
    <div>
      <button onClick={handleButtonClick.bind(null, '저장')}>
        저장
      </button>
      <button onClick={handleButtonClick.bind(null, '로드')}>
        로드
      </button>
      <button onClick={handleButtonClick.bind(null, '삭제')}>
        삭제
      </button>
    </div>
  );
}
```

#### 방법 3: 커리어 함수 사용 (권장)

```jsx
function ButtonList() {
  const createClickHandler = (buttonName) => () => {
    alert(`${buttonName} 버튼이 클릭되었습니다!`);
  };

  return (
    <div>
      <button onClick={createClickHandler('저장')}>저장</button>
      <button onClick={createClickHandler('로드')}>로드</button>
      <button onClick={createClickHandler('삭제')}>삭제</button>
    </div>
  );
}
```

---

### 이벤트 핸들러와 State

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
}
```

---

### 이벤트 위임 (Event Delegation)

여러 자식 요소의 이벤트를 부모에서 처리하는 패턴입니다.

```jsx
// ❌ 각 버튼에 개별 핸들러
function ButtonList() {
  return (
    <div>
      <button onClick={() => console.log('버튼 1')}>버튼 1</button>
      <button onClick={() => console.log('버튼 2')}>버튼 2</button>
      <button onClick={() => console.log('버튼 3')}>버튼 3</button>
      {/* 버튼이 늘어날 때마다 핸들러 추가 필요 */}
    </div>
  );
}

// ✅ 이벤트 위임 사용
function ButtonList() {
  const handleClick = (event) => {
    const buttonName = event.target.name;
    console.log(`${buttonName} 버튼이 클릭되었습니다.`);
  };

  return (
    <div onClick={handleClick}>
      <button name="버튼 1">버튼 1</button>
      <button name="버튼 2">버튼 2</button>
      <button name="버튼 3">버튼 3</button>
      {/* 새로운 버튼이 추가되어도 핸들러 수정 불필요 */}
    </div>
  );
}
```

---

### 요약

#### HTML vs React 이벤트 비교

| 특징 | HTML | React |
|------|------|-------|
| **이벤트 이름** | 소문자 (`onclick`) | camelCase (`onClick`) |
| **함수 전달** | 문자열 또는 함수 이름 | 함수 직접 전달 |
| **기본 동작 막기** | `return false` | `preventDefault()` |
| **이벤트 객체** | 네이티브 이벤트 | SyntheticEvent |

#### 주요 이벤트 타입

| 타입 | 이벤트 | 사용 예시 |
|------|-------|----------|
| **마우스** | `onClick`, `onDoubleClick`, `onMouseEnter` | 버튼 클릭, hover 효과 |
| **키보드** | `onKeyDown`, `onKeyUp`, `onKeyPress` | 입력 유효성 검사 |
| **폼** | `onSubmit`, `onChange`, `onInput` | 폼 제출, 입력 처리 |
| **포커스** | `onFocus`, `onBlur` | 입력 검증, 스타일 적용 |

#### 핵심 개념

```
React 이벤트 핸들링:
1. camelCase 사용 (onClick, onChange)
2. 함수를 전달 (not 문자열)
3. SyntheticEvent로 크로스 브라우저 지원
4. preventDefault()로 기본 동작 제어
```

---

## 4.2 상태

**State(상태)**는 컴포넌트 내부에서 변경 가능한 데이터를 관리하는 React의 핵심 메커니즘입니다. State를 사용하여 동적인 UI를 만드는 방법을 알아봅시다.

---

### State란 무엇인가?

State는 **시간에 따라 변할 수 있는 값**으로, 컴포넌트의 렌더링에 영향을 미칩니다.

```
┌─────────────────────────────────────┐
│           Component                │
│                                     │
│  Props (읽기 전용)                   │
│  ┌─────────────────────────────┐   │
│  │ name = "철수"               │   │
│  │ age = 25                    │   │
│  └─────────────────────────────┘   │
│                                     │
│  State (변경 가능) ⭐                 │
│  ┌─────────────────────────────┐   │
│  │ count = 0  → 1  → 2 ...    │   │
│  │ isOpen = false → true       │   │
│  │ items = [...]                │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

#### Props vs State 차이점

| 구분 | Props | State |
|------|-------|-------|
| **소유자** | 부모 컴포넌트 | 컴포넌트 자신 |
| **변경 가능성** | ❌ 읽기 전용 | ✅ 변경 가능 |
| **데이터 흐름** | 부모 → 자식 (단방향) | 내부 상태 관리 |
| **용도** | 데이터 전달 | 동적 상태 관리 |
| **변경 방법** | 부모가 전달 | setState 함수 |

---

### useState Hook

React 16.8부터 도입된 **Hook**을 사용하여 함수 컴포넌트에서 State를 관리할 수 있습니다.

#### 기본 문법

```jsx
import { useState } from 'react';

function Counter() {
  // 1. State 선언: [현재값, 업데이트 함수]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

**useState 구조:**
```jsx
const [stateValue, setStateFunction] = useState(initialValue);
```

- **stateValue**: 현재 state 값
- **setStateFunction**: state를 업데이트하는 함수
- **initialValue**: state의 초기값

#### 다양한 타입의 State

```jsx
function VariousStates() {
  // 1. 문자열
  const [name, setName] = useState('철수');

  // 2. 숫자
  const [age, setAge] = useState(25);

  // 3. 불리언
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 4. 배열
  const [items, setItems] = useState([]);

  // 5. 객체
  const [user, setUser] = useState({
    name: '철수',
    age: 25,
    email: 'cheolsu@example.com'
  });

  // 6. null
  const [data, setData] = useState(null);

  return (
    <div>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
      <p>로그인: {isLoggedIn ? '예' : '아니오'}</p>
      <p>항목 수: {items.length}</p>
      <p>사용자: {user.name}</p>
    </div>
  );
}
```

---

### State 업데이트 방법

#### 방법 1: 직접 값 설정

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);  // 현재 값을 반대로 변경
  };

  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

#### 방법 2: 이전 값 기반 업데이트

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);  // 현재 count에 1 더하기
  };

  const decrement = () => {
    setCount(count - 1);  // 현재 count에서 1 빼기
  };

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

#### 방법 3: 함수형 업데이트 (권장) ⭐

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ 문제: 여러 번 호출되면 덮어씀 수 있음
  const badIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);  // count + 1이 아니라 원래 count 기준
  };

  // ✅ 올바른 방법: 함수형 업데이트
  const goodIncrement = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);  // 2가 증가
  };

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={goodIncrement}>증가 (2번)</button>
    </div>
  );
}
```

**함수형 업데이트가 필요한 경우:**
- 새로운 값이 이전 값에 의존할 때
- 여러 번 연속으로 업데이트할 때
- 비동기 작업 후 업데이트할 때

---

### React State 업데이트 흐름

State가 변경되면 어떻게 UI가 업데이트되는지 알아봅시다.

#### 전체 흐름

```
┌─────────────────────────────────────────────────┐
│  1. 사용자 이벤트 발생                        │
│     (버튼 클릭, 입력 등)                       │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  2. 이벤트 핸들러 실행                          │
│     setState(newValue) 호출                     │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  3. State 변경                               │
│     count: 0 → 1                               │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  4. 리렌더링 트리거                            │
│     React가 재렌더링 필요하다고 판단           │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  5. 컴포넌트 함수 재실행                        │
│     함수 컴포넌트를 다시 호출                  │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  6. 새로운 JSX 반환                            │
│     업데이트된 state로 JSX 생성                │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  7. Virtual DOM 비교 (Reconciliation)         │
│     이전 Virtual DOM과 새 Virtual DOM 비교     │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  8. 실제 DOM 업데이트                           │
│     변경된 부분만 DOM에 반영                   │
└─────────────────────────────────────────────────┘
```

#### 실제 예시

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('1. 컴포넌트 렌더링');

  // 2. 버튼 클릭 → 핸들러 실행
  const handleClick = () => {
    console.log('2. setState 호출 전:', count);

    setCount(count + 1);  // 3. State 변경 → 리렌더링 트리거

    console.log('4. setState 호출 후:', count);
  };

  console.log('3. 현재 count:', count);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={handleClick}>증가</button>
    </div>
  );
}

// 첫 렌더링:
// 1. 컴포넌트 렌더링
// 3. 현재 count: 0

// 버튼 클릭 시:
// 2. setState 호출 전: 0
// 3. State 변경: 0 → 1
// 4. setState 호출 후: 0 (아직 반영 안 됨)
// 5. 컴포넌트 재렌더링
// 6. 현재 count: 1 (새로운 값 반영)
```

---

### Two-Way Data Binding (양방향 데이터 바인딩)

React는 기본적으로 **단방향 데이터 흐름**을 따르지만, 입력 필드에서 **양방향 바인딩처럼 동작**하게 만들 수 있습니다.

#### 양방향 바인딩 구현

```jsx
function FormInput() {
  const [value, setValue] = useState('');

  // 입력 → State
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {/* State → 입력 (value prop) */}
      {/* 입력 → State (onChange handler) */}
      <input
        type="text"
        value={value}           {/* State를 입력의 값으로 설정 */}
        onChange={handleChange}  {/* 입력 변경을 State에 반영 */}
      />
      <p>입력한 값: {value}</p>
    </div>
  );
}
```

#### 동작 흐름

```
┌─────────────────────────────────────────────────┐
│  1. 사용자가 "a" 입력                          │
│     input.value = "a"                           │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  2. onChange 이벤트 발생                       │
│     handleChange("a") 호출                      │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  3. State 업데이트                            │
│     setValue("a") → state = "a"                │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  4. 리렌더링                                  │
│     컴포넌트 재실행                             │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  5. 새로운 value로 input 업데이트                │
│     <input value="a" />                         │
└─────────────────────────────────────────────────┘
```

#### 실전 예시: 로그인 폼

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,  // 기존 데이터 유지
      [name]: value  // 변경된 필드만 업데이트
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('제출된 데이터:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="사용자명"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
    </form>
  );
}
```

---

### 여러 State 관리

#### 독립적인 State

```jsx
function Form() {
  // 각 State는 독립적으로 관리됨
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="사용자명"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="비밀번호"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

#### 관련 State 그룹화

```jsx
// ❌ 좋지 않은 예시: 관련 State를 분리
function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  // State가 너무 많음
  return <div>...</div>;
}

// ✅ 좋은 예시: 관련 State를 객체로 그룹화
function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  return <div>...</div>;
}
```

---

### State와 렌더링

#### State 변경 시 리렌더링

```jsx
function Clock() {
  const [time, setTime] = useState(new Date());

  // 1초마다 time 업데이트 → 리렌더링
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);  // 정리
  }, []);

  return (
    <div>
      <h1>현재 시간</h1>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
}
```

#### 불필요한 리렌더링 방지

```jsx
function Form() {
  const [value, setValue] = useState('');

  // ❌ 매번 렌더링마다 새로운 함수 생성
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // ✅ useCallback으로 최적화 (불극한 경우)
  const handleChangeOptimized = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <input
      value={value}
      onChange={handleChange}  // 일반적으로는 이것만으로 충분
      placeholder="입력하세요"
    />
  );
}
```

---

### State 업데이트 모벨 사례

#### ✅ 좋은 예시

```jsx
// 1. 간단한 업데이트
const [count, setCount] = useState(0);
setCount(count + 1);

// 2. 객체 업데이트 (전개 연산자 사용)
const [user, setUser] = useState({ name: '철수', age: 25 });
setUser({ ...user, age: 26 });

// 3. 배열 업데이트
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]);  // 추가
setItems(items.filter(item => item !== 2));  // 삭제

// 4. 함수형 업데이트
const [count, setCount] = useState(0);
setCount(prevCount => prevCount + 1);
```

#### ❌ 나쁜 예시

```jsx
// 1. State 직접 수정 (절대 하지 말기!)
const [user, setUser] = useState({ name: '철수' });
user.name = '영희';  // ❌ 리렌더링 안 됨
setUser({ ...user, name: '영희' });  // ✅

// 2. 이전 값 무시하고 업데이트
const [count, setCount] = useState(0);
const increment = () => {
  setCount(count + 1);
  setCount(count + 1);  // ❌ 1만 증가
};

// ✅ 함수형 업데이트 사용
const increment = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);  // ✅ 2 증가
};
```

---

### 요약

#### State 핵심 개념

```
State:
- 컴포넌트 내부에서 관리하는 변경 가능한 데이터
- useState Hook으로 선언
- setState 함수로만 업데이트 가능

useState:
const [state, setState] = useState(initialValue);
```

#### State 업데이트 흐름

```
이벤트 발생
  ↓
핸들러 실행
  ↓
setState 호출
  ↓
State 변경
  ↓
리렌더링 트리거
  ↓
컴포넌트 재실행
  ↓
Virtual DOM 비교
  ↓
실제 DOM 업데이트
```

#### Two-Way Binding 구현

```jsx
<input
  value={stateValue}        {/* State → Input */}
  onChange={handleChange}   {/* Input → State */}
/>

const handleChange = (e) => {
  setState(e.target.value);
};
```

#### 모벨 사례

1. **관련 State는 그룹화**: 객체로 관리
2. **함수형 업데이트**: 이전 값 기반일 때 사용
3. **불극형 패턴**: 이전 값 `prev` 사용
4. **불극형 객체**: 전개 연산자로 복사 후 수정

#### 핵심 takeaways

> 💡 **State는 컴포넌트의 기억**
>
> - State = 컴포넌트가 시간에 따라 변하는 데이터
> - State 변경 = 자동 리렌더링
> - setState만 사용하여 State 변경 (직접 수정 금지)
> - Two-way binding = value + onChange 조합
