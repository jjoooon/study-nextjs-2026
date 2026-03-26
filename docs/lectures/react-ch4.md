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

---

## 4.3 React Server Components와 이벤트/상태

React 18+의 **Server Components**에서는 이벤트 핸들링과 상태 관리가 **완전히 다르게 작동**합니다. 이는 React 2026에서 필수적으로 이해해야 하는 개념입니다.

---

### Server Components에서의 제약사항

#### ❌ Server Components는 이벤트 핸들러 사용 불가

```jsx
// ❌ Server Component - 이벤트 핸들러 사용 불가
function UserList() {
  const [users, setUsers] = useState([]);  // 에러!

  return (
    <div>
      <button onClick={() => setUsers([...users, newUser])}>
        추가  // 에러! onClick 사용 불가
      </button>
    </div>
  );
}
```

#### ✅ Client Components로 상호작용 구현

```jsx
// ✅ Client Component - 이벤트 핸들러 사용 가능
'use client';

function UserList() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <button onClick={() => setUsers([...users, newUser])}>
        추가
      </button>
    </div>
  );
}
```

---

### Server Component와 Client Component 분리

**핵심 원칙**: Server Components는 데이터를 패칭하고, Client Components는 상호작용을 담당합니다.

```jsx
// ✅ 올바른 패턴: Server + Client 분리
async function UserPage() {
  // Server Component: 데이터 패칭
  const users = await db.users.findMany();

  return (
    <div>
      <h1>사용자 목록</h1>
      <UserListClient initialUsers={users} />
    </div>
  );
}

// Client Component: 상호작용 관리
'use client';

function UserListClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.includes(filter)
  );

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="이름으로 검색"
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => setUsers([...users, newUser])}>
        사용자 추가
      </button>
    </div>
  );
}
```

---

### Server Component에서 Client Component로 Props 전달

```jsx
// ✅ 올바른 전달 패턴
async function ServerParent() {
  const data = await fetchData();

  return (
    <div>
      {/* 직렬화 가능한 데이터만 전달 가능 */}
      <ClientChild
        data={data}
        onAction={handleAction}  // ❌ 에러! 함수는 Server→Client 전송 불가
      />
    </div>
  );
}
```

**해결 방법**: 핸들러는 Client Component 내부에서 정의하거나 Context API를 사용하세요.

```jsx
// ✅ 해결 방법 1: 핸들러를 Client Component 내부에 정의
'use client';

function ClientParent() {
  const [data, setData] = useState([]);

  const handleAction = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  return <ClientChild data={data} onAction={handleAction} />;
}

// ✅ 해결 방법 2: Context API 사용
'use client';

const ActionContext = createContext();

function ServerParent() {
  return (
    <ActionProvider>
      <ClientChild />
    </ActionProvider>
  );
}

function ClientChild() {
  const { handleAction } = useContext(ActionContext);
  return <button onClick={handleAction}>액션</button>;
}
```

---

### 상태 관리: Server vs Client

| 구분 | Server Component | Client Component |
|------|------------------|------------------|
| **useState** | ❌ 사용 불가 | ✅ 사용 가능 |
| **useReducer** | ❌ 사용 불가 | ✅ 사용 가능 |
| **useEffect** | ❌ 사용 불가 | ✅ 사용 가능 |
| **이벤트 핸들러** | ❌ 사용 불가 | ✅ 사용 가능 |
| **데이터 패칭** | ✅ 가능 | ❌ useEffect 필요 |
| **용도** | 데이터 렌더링 | 상호작용 관리 |

---

### 실전 예시: 검색 가능한 사용자 목록

```jsx
// Server Component: 데이터 패칭
async function UserListPage() {
  const users = await db.users.findMany();

  return (
    <div>
      <h1>사용자 검색</h1>
      <SearchableUserList initialUsers={users} />
    </div>
  );
}

// Client Component: 상태와 이벤트 관리
'use client';

function SearchableUserList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;

    // 입력 즉시 반영 (긴급)
    setSearchTerm(value);

    // 필터링은 transition으로 (비긴급)
    startTransition(() => {
      // 원본 데이터는 변경하지 않음
    });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="이름으로 검색..."
      />
      {isPending && <p>검색 중...</p>}
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 모범 사례: 경계 설정하기

```jsx
// ✅ 좋은 예시: 명확한 경계
async function Page() {
  const data = await fetchData();

  return (
    <div>
      {/* Server: 정적 콘텐츠 */}
      <Header />
      <h1>데이터 페이지</h1>

      {/* Client: 상호작용 */}
      <InteractiveSection initialData={data} />
    </div>
  );
}

'use client';

function InteractiveSection({ initialData }) {
  const [state, setState] = useState(initialData);
  const [filter, setFilter] = useState('');

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <button onClick={() => setState(prev => [...prev, newItem])}>
        추가
      </button>
      {/* ... */}
    </div>
  );
}
```

---

### 요약

**Server Components**:
- 데이터 패칭용 (async/await 직접 사용)
- 이벤트 핸들러 ❌
- useState/useReducer ❌
- 렌더링 전용

**Client Components**:
- 상호작용 담당 ('use client' 지시어)
- 이벤트 핸들러 ✅
- useState/useReducer ✅
- 사용자 입력 처리

**핵심 원칙**:
> 💡 Server Components는 **보여주기**만 하고, Client Components가 **상호작용**을 담당합니다. 이 경계를 명확히 하는 것이 React 2026의 핵심입니다.

---

## 4.4 useReducer와 복잡한 상태 관리

복잡한 상태 로직은 **useReducer**로 관리하는 것이 좋습니다. useState보다 예측 가능하고 테스트하기 쉽습니다.

---

### useState vs useReducer

#### useState: 단순한 상태

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </>
  );
}
```

#### useReducer: 복잡한 상태 로직

```jsx
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + state.step, step: state.step };
    case 'DECREMENT':
      return { count: state.count - state.step, step: state.step };
    case 'SET_STEP':
      return { count: state.count, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>카운트: {state.count} (단계: {state.step})</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        증가
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        감소
      </button>
      <button onClick={() => dispatch({ type: 'SET_STEP', payload: 5 })}>
        단계 5로 설정
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        리셋
      </button>
    </>
  );
}
```

---

### 언제 useReducer를 사용해야 할까?

#### ✅ useReducer가 적합한 경우

**1. 관련된 상태 조각들**

```jsx
// ❌ useState: 관련 상태를 분리
function Form() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  // 4개의 독립된 state...
}

// ✅ useReducer: 관련 상태를 통합
const initialState = {
  username: '',
  email: '',
  status: 'idle', // 'idle' | 'submitting' | 'success' | 'error'
  error: null
};

function formReducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return { ...state, [action.field]: action.value };
    case 'SUBMIT_START':
      return { ...state, status: 'submitting', error: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success' };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', error: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });

    try {
      await submitForm(state);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SUBMIT_ERROR', error });
    }
  };

  const handleChange = (field) => (e) => {
    dispatch({ type: 'FIELD_CHANGE', field, value: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.username}
        onChange={handleChange('username')}
        placeholder="사용자명"
      />
      <input
        value={state.email}
        onChange={handleChange('email')}
        placeholder="이메일"
      />
      {state.status === 'submitting' && <p>제출 중...</p>}
      {state.status === 'error' && <p>에러: {state.error.message}</p>}
      {state.status === 'success' && <p>성공!</p>}
      <button type="submit" disabled={state.status === 'submitting'}>
        제출
      </button>
    </form>
  );
}
```

**2. 복잡한 상태 전이 로직**

```jsx
// todo 앱 상태 관리
const initialState = {
  todos: [],
  filter: 'all', // 'all' | 'active' | 'completed'
  editingId: null
};

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    case 'START_EDITING':
      return {
        ...state,
        editingId: action.payload
      };

    case 'FINISH_EDITING':
      return {
        ...state,
        editingId: null,
        todos: state.todos.map(todo =>
          todo.id === state.editingId
            ? { ...todo, text: action.payload }
            : todo
        )
      };

    default:
      return state;
  }
}
```

**3. 다음 상태가 이전 상태에 의존할 때**

```jsx
// ❌ useState: 여러 업데이트가 충돌할 수 있음
function Counter() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    setCount(count + 1); // count: 0 → 1
    setCount(count + 1); // count: 0 → 1 (원래 count 사용)
    setCount(count + 1); // count: 0 → 1 (원래 count 사용)
  };
  // 결과: 1 (원하는 3이 아님!)
}

// ✅ useReducer: 예측 가능한 상태 업데이트
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT_BY':
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const incrementThreeTimes = () => {
    dispatch({ type: 'INCREMENT_BY', payload: 1 });
    dispatch({ type: 'INCREMENT_BY', payload: 1 });
    dispatch({ type: 'INCREMENT_BY', payload: 1 });
  };
  // 결과: 3 (정확!)
}
```

---

### useReducer와 TypeScript

```tsx
type State = {
  count: number;
  step: number;
};

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

const initialState: State = { count: 0, step: 1 };

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + state.step, step: state.step };
    case 'DECREMENT':
      return { count: state.count - state.step, step: state.step };
    case 'SET_STEP':
      return { count: state.count, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'SET_STEP', payload: 5 })}>
        Step: 5
      </button>
    </>
  );
}
```

---

### useReducer + Context 패턴

전역 상태 관리를 위한 강력한 패턴입니다.

```jsx
const TodoContext = createContext();

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

// 사용
function App() {
  return (
    <TodoProvider>
      <TodoList />
      <AddTodo />
    </TodoProvider>
  );
}

function TodoList() {
  const { state, dispatch } = useTodos();

  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          />
          {todo.text}
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

### 요약

**useState 사용**:
- ✅ 단순한 상태 (boolean, number, string)
- ✅ 독립적인 상태 조각
- ✅ 상태 업데이트 로직이 단순할 때

**useReducer 사용**:
- ✅ 관련된 상태 조각들
- ✅ 복잡한 상태 전이 로직
- ✅ 다음 상태가 이전 상태에 복잡하게 의존할 때
- ✅ 여러 값에 대한 다양한 업데이트
- ✅ 테스트 가능한 상태 로직

---

## 4.5 React 18+ Concurrent Features

React 18의 **Concurrent Features**를 사용하여 더 나은 사용자 경험을 만들 수 있습니다.

---

### useTransition: 비긴급 업데이트

**useTransition**은 업데이트를 긴급/비긴급으로 분리하여 UI 반응성을 높입니다.

```jsx
import { useTransition } from 'react';

function SearchFilter({ items }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [filteredItems, setFilteredItems] = useState(items);

  const handleChange = (e) => {
    const value = e.target.value;

    // 긴급: 입력창 즉시 업데이트
    setQuery(value);

    // 비긴급: 필터링을 transition으로
    startTransition(() => {
      setFilteredItems(
        items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
      );
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="검색..."
      />
      {isPending && <p style={{ opacity: 0.5 }}>검색 중...</p>}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**장점**:
- 입력 반응성 유지 (입력창은 즉시 반응)
- 무거운 계산을 백그라운드에서 처리
- 사용자 경험 향상

---

### useDeferredValue: 값 지연 처리

**useDeferredValue**는 값의 업데이트를 지연시켜 성능을 최적화합니다.

```jsx
import { useDeferredValue, useState } from 'react';

function Typeahead({ suggestions }) {
  const [query, setQuery] = useState('');

  // query 업데이트를 지연
  const deferredQuery = useDeferredValue(query);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력..."
      />
      <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}
```

**useTransition vs useDeferredValue**:

| 구분 | useTransition | useDeferredValue |
|------|---------------|-------------------|
| **용도** | 업데이트 자체를 지연 | 값의 반영을 지연 |
| **사용** | `startTransition(() => setState(...))` | `const deferred = useDeferredValue(value)` |
| **적합** | 명시적인 액션 (버튼 클릭 등) | 연속적인 값 업데이트 (입력, 스크롤) |

---

### 실전 예시: 대용량 리스트 렌더링

```jsx
function LargeList({ items }) {
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  // 필터링된 리스트 지연
  const deferredFilter = useDeferredValue(filter);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(deferredFilter.toLowerCase())
    );
  }, [items, deferredFilter]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => {
          // 입력은 즉시
          setFilter(e.target.value);
        }}
        placeholder="필터..."
        style={{ marginBottom: '10px' }}
      />

      {isPending && <div className="loading">필터링 중...</div>}

      <ul style={{ opacity: isPending ? 0.7 : 1 }}>
        {filteredItems.map(item => (
          <li key={item.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Automatic Batching (React 18+)

React 18에서는 모든 상태 업데이트가 **자동으로 batched** 됩니다.

```jsx
// React 17 이전: setTimeout, Promise 등에서 batching 안 됨
function handleClick() {
  setCount(count + 1);
  setName('updated');
  // 2번 리렌더링
}

// React 18+: 자동으로 batching
function handleClick() {
  setCount(count + 1);
  setName('updated');
  // 1번만 리렌더링!
}

setTimeout(() => {
  setCount(count + 1);
  setName('updated');
  // React 18+: 여전히 1번만 리렌더링
}, 1000);
```

**flushSync**로 동기적 업데이트:

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(count + 1);
  });
  // 즉시 DOM 업데이트 보장

  setName('updated');
}
```

---

### Concurrent Features 사용 가이드

```
Concurrent Features 필요 여부:

1. 대용량 데이터 필터링 (1000+ 항목)
   └─> useTransition + useDeferredValue

2. 검색 입력 자동완성
   └─> useDeferredValue

3. 무거운 계산이 필요한 UI
   └─> useTransition

4. 리스트/테이블 렌더링
   └─> useDeferredValue + memo

5. 애니메이션 도중 입력
   └─> useTransition

단순한 폼이나 작은 리스트:
   └─> useState만으로 충분
```

---

## 4.6 상태 관리 라이브러리

복잡한 상태 관리를 위해 Context, Zustand 등을 활용하세요.

---

### Context API + useReducer

**장점**: React 내장, 추가 의존성 없음
**단점**: 불필요한 리렌더링,Provider 중첩 복잡

```jsx
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth within AuthProvider');
  return context;
}

// 사용
function LoginButton() {
  const { dispatch } = useAuth();
  return <button onClick={() => dispatch({ type: 'LOGIN' })}>로그인</button>;
}
```

---

### Zustand (권장 2026)

**장점**:
- 간결한 API
- 불필요한 리렌더링 없음 (selector)
- TypeScript 완벽 지원
- Context API보다 성능 좋음

```bash
npm install zustand
```

```jsx
import create from 'zustand';

// Store 생성
const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// 사용
function LoginButton() {
  const login = useAuthStore(state => state.login);

  return <button onClick={() => login({ name: '철수' })}>로그인</button>;
}

function UserProfile() {
  // user가 변경될 때만 리렌더링
  const user = useAuthStore(state => state.user);

  return <div>{user?.name}</div>;
}

function AuthStatus() {
  // isAuthenticated만 구독 (user 변경 시 리렌더링 안 됨)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return <div>{isAuthenticated ? '로그인됨' : '로그인 필요'}</div>;
}
```

---

### Server State vs Client State

**Client State** (Zustand, Context):
- UI 상태 (modal open, tab active)
- 임시 입력 (form field values)
- 클라이언트 전용 데이터

**Server State** (TanStack Query):
- API 데이터
- 데이터베이스 레코드
- 캐싱 필요한 서버 데이터

```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  // Server State: TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });

  const queryClient = useQueryClient();

  // Client State: Zustand
  const selectedUserId = useUserSelection(state => state.selectedUserId);
  const setSelectedUserId = useUserSelection(state => state.setSelectedUserId);

  const deleteUser = useMutation({
    mutationFn: (id) => fetch(`/api/users/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      // Server state invalidation
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러!</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          <button onClick={() => setSelectedUserId(user.id)}>
            {user.name}
          </button>
          <button onClick={() => deleteUser.mutate(user.id)}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

### 상태 관리 선택 가이드

```
상태 관리 도구 선택:

1. 단순한 UI 상태
   └─> useState

2. 관련된 UI 상태 (여러 필드, 복잡한 전이)
   └─> useReducer

3. 전역 UI 상태 (theme, auth)
   ├─> 소규모: Context + useReducer
   └─> 대규모: Zustand (권장)

4. 서버 데이터 (API)
   └─> TanStack Query (React Query)

5. 폼 상태
   └─> React Hook Form + Zod

6. URL 상태
   └─> Next.js useSearchParams
```

---

## 4.7 Events & State Anti-patterns

React에서 흔히 발생하는 안티패턴과 해결 방법입니다.

---

### Anti-pattern 1: 이벤트 핸들러 인라인 함수 생성 ❌

**문제**: 매 렌더링마다 새로운 함수가 생성되어 자식 컴포넌트가 불필요하게 리렌더링됩니다.

```jsx
// ❌ 매번 새 함수 생성
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <Child onClick={() => console.log('clicked')} />
    </div>
  );
}

// ✅ useCallback로 안정화
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleChildClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={handleClick}>증가</button>
      <Child onClick={handleChildClick} />
    </div>
  );
}
```

---

### Anti-pattern 2: State 직접 수정 ❌

**문제**: State를 직접 수정하면 리렌더링되지 않습니다.

```jsx
// ❌ State 직접 수정
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: false }
  ]);

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;  // 직접 수정!
    // 리렌더링 안 됨
  };

  // ✅ 새로운 배열 생성
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
}
```

---

### Anti-pattern 3: useEffect에서 State 동기화 ❌

**문제**: useEffect로 state를 동기화하면 불필요한 렌더링과 복잡성이 증가합니다.

```jsx
// ❌ useEffect로 파생 state 계산
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);  // user가 변경될 때마다 실행

  // ✅ 렌더링 중 계산
  const fullName = user ? `${user.firstName} ${user.lastName}` : '';

  return <div>{fullName}</div>;
}
```

---

### Anti-pattern 4: useState로 복잡한 상태 관리 ❌

```jsx
// ❌ 여러 useState로 관련 상태 분리
function Form() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 상태 업데이트가 분산되어 있음
}

// ✅ useReducer로 통합
const initialState = {
  username: '',
  email: '',
  status: 'idle',
  error: null,
  isLoading: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SUBMIT_START':
      return { ...state, status: 'loading', isLoading: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success', isLoading: false };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', error: action.error, isLoading: false };
    default:
      return state;
  }
}
```

---

### Anti-pattern 5: props로 전달된 state 업데이트 ❌

```jsx
// ❌ props로 전달된 state를 직접 사용
function Child({ count, setCount }) {
  return (
    <button onClick={() => setCount(count + 1)}>
      증가
    </button>
  );
}

// 문제: count가 변경되면 Child도 리렌더링됨

// ✅ 함수형 업데이트 사용
function Child({ setCount }) {
  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      증가
    </button>
  );
}
```

---

### Anti-pattern 6: Server Component에서 useState 사용 ❌

```jsx
// ❌ Server Component에서 시도
function UserList() {
  const [users, setUsers] = useState([]);  // 에러!
  const [filter, setFilter] = useState('');  // 에러!

  return <div>{/* ... */}</div>;
}

// ✅ 'use client' 지시어 추가
'use client';

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  return <div>{/* ... */}</div>;
}
```

---

### Anti-pattern 7: 폼 제출을 preventDefault로만 처리 ❌

```jsx
// ❌ 수동 폼 처리
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    // 수동으로 추출하고 변환...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <button>제출</button>
    </form>
  );
}

// ✅ React Hook Form 사용
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // 이미 타입 변환됨
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: true })} />
      {errors.username && <span>필수 필드입니다</span>}
      <button>제출</button>
    </form>
  );
}
```

---

### Anti-pattern 8: useTransition 남용 ❌

```jsx
// ❌ 모든 state 업데이트에 useTransition
function Component() {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    startTransition(() => {
      setValue(e.target.value);  // 불필요!
    });
  };

  return <input value={value} onChange={handleChange} />;
}

// ✅ 필요할 때만 사용
function Component() {
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);  // 즉시 반영

    // 무거운 필터링만 transition
    startTransition(() => {
      setFiltered(items.filter(item => item.includes(newValue)));
    });
  };
}
```

---

### 요약

**이벤트 핸들러**:
- ✅ useCallback으로 안정화
- ❌ 인라인 함수 생성 피하기
- ❌ 불필요한 의존성 피하기

**State 관리**:
- ✅ useReducer for 복잡한 로직
- ❌ State 직접 수정 금지
- ❌ useEffect for 파생 state 금지 (useMemo 사용)
- ✅ Server Components에서는 'use client'

**성능**:
- ✅ Concurrent features 적절히 사용
- ❌ useTransition 남용 금지
- ✅ Server state vs Client state 구분

---

## 4.8 요약

### React 2026 Events & State 핵심 개념

#### Server Components vs Client Components

| 구분 | Server Component | Client Component |
|------|------------------|------------------|
| **이벤트 핸들러** | ❌ 사용 불가 | ✅ 사용 가능 |
| **useState** | ❌ 사용 불가 | ✅ 사용 가능 |
| **useEffect** | ❌ 사용 불가 | ✅ 사용 가능 |
| **용도** | 데이터 패칭, 렌더링 | 상호작용, 상태 관리 |

**핵심**: Server는 데이터, Client는 상호작용

---

#### 상태 관리 도구 선택

```
1. 단순 상태
   └─> useState

2. 복잡한 상태 로직
   └─> useReducer

3. 전역 상태
   ├─> 소규모: Context + useReducer
   └─> 대규모: Zustand (권장 2026)

4. 서버 데이터
   └─> TanStack Query

5. 폼 상태
   └─> React Hook Form
```

---

#### Concurrent Features (React 18+)

| 훅 | 용도 | 예시 |
|----|------|------|
| **useTransition** | 비긴급 업데이트 | 검색 필터링 |
| **useDeferredValue** | 값 지연 | 자동완성 입력 |
| **flushSync** | 동기 업데이트 | 즉시 DOM 반영 필요 시 |

---

#### 핵심 Takeaways

> 💡 **React 2026의 핵심 변화**
>
> **Server Components**:
> - 이벤트/상태는 Client Components에서만
> - 'use client' 지시어로 명시
> - Server는 데이터 패칭, Client는 상호작용
>
> **상태 관리**:
> - useState: 단순한 상태
> - useReducer: 복잡한 로직
> - Zustand: 전역 상태 (권장)
> - TanStack Query: 서버 상태
>
> **성능**:
> - Concurrent Features로 UX 향상
> - useCallback로 참조 안정화
> - 파생 state는 useMemo, not useEffect
>
> **"2026의 React는 Server와 Client의 경계입니다"**
