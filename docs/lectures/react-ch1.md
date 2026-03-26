# React 교육 문서

## 📚 목차

### 1. React는 무엇이고 왜 사용하나요?
- [1.1 React는 무엇인가요?](#11-react는-무엇인가요)
- [1.2 Vanilla Javascript의 문제](#12-vanilla-javascript의-문제)
- [1.3 React가 DOM을 조작하는 방법](#13-react가-dom을-조작하는-방법)

---

## 1.1 React는 무엇인가요

### 정의

**React(리액트)**는 Meta(구 Facebook)에서 개발한 **사용자 인터페이스(UI)를 구축하기 위한 JavaScript 라이브러리**입니다.

### 핵심 특징

1. **컴포넌트 기반 (Component-Based)**
   - UI를 독립적이고 재사용 가능한 조각(컴포넌트)으로 분리하여 구현
   - 각 컴포넌트는 자신의 상태와 렌더링 로직을 관리

2. **선언적 (Declarative)**
   - "어떻게(How)"가 아니라 "무엇(What)"을 원하는지 선언
   - 복잡한 DOM 조작을 직접 수행하지 않고, 상태에 따라 UI가 자동으로 업데이트

3. **한 방향 데이터 흐름 (Unidirectional Data Flow)**
   - 데이터는 상위 컴포넌트에서 하위 컴포넌트로 단방향으로 전달
   - 예측 가능한 데이터 흐름으로 디버깅과 유지보수가 용이

4. **가상 DOM (Virtual DOM)**
   - 실제 DOM의 가벼운 복사본인 Virtual DOM을 사용하여 효율적인 렌더링
   - 변경된 부분만 실제 DOM에 반영하여 성능 최적화

### 사용 사례

- **단일 페이지 애플리케이션(SPA)**: React Router와 함께 전체 웹 애플리케이션 구축
- **모바일 앱**: React Native를 사용하여 iOS/Android 앱 개발
- **데스크톱 앱**: Electron과 함께 크로스 플랫폼 데스크톱 애플리케이션
- **정적 사이트**: Next.js, Gatsby 등과 함께 SSR/SSG 기반 사이트 구축

### 라이브러리 vs 프레임워크

React는 **프레임워크가 아니라 라이브러리**입니다:

| 구분 | 라이브러리 (React) | 프레임워크 (Angular) |
|------|-------------------|---------------------|
| **범위** | 뷰 레이어만 담당 | 풀 스택 기능 제공 |
| **유연성** | 필요한 도구 선택 가능 | 정해진 구조와 패턴 |
| **학습 곡선** | 핵심만 빠르게 학습 가능 | 전체 생태계 이해 필요 |

React는 라우팅, 상태 관리, 빌드 도구 등을 **개발자가 직접 선택**할 수 있는 유연함을 제공합니다.

---

## 1.2 Vanilla Javascript의 문제

### Vanilla JS로 UI를 만들 때의 어려움

Vanilla JavaScript(순수 자바스크립트)로 복잡한 UI를 개발할 때 발생하는 주요 문제점들을 살펴보겠습니다.

#### 1. 명령형 코드의 복잡성

Vanilla JS는 **명령형(Imperative)** 프로그래밍입니다. "무엇을 원하는지"가 아니라 "어떻게 수행할지"를 단계별로 작성해야 합니다.

**예시: 할 일 목록에 아이템 추가하기**

```javascript
// Vanilla JS - 명령형 접근
function addTodo(text) {
  // 1. DOM 요소 찾기
  const list = document.querySelector('.todo-list');

  // 2. 새 요소 생성
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');

  // 3. 텍스트와 속성 설정
  span.textContent = text;
  button.textContent = '삭제';
  button.className = 'delete-btn';

  // 4. 요소 조립
  li.appendChild(span);
  li.appendChild(button);

  // 5. DOM에 추가
  list.appendChild(li);

  // 6. 카운터 업데이트 (수동으로!)
  const count = document.querySelector('.count');
  count.textContent = list.children.length;
}
```

```javascript
// React - 선언형 접근
function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button className="delete-btn">삭제</button>
        </li>
      ))}
    </ul>
  );
}
// 데이터(todos)만 변경하면 UI는 자동으로 업데이트됨
```

#### 2. 수동 DOM 업데이트

데이터가 변경될 때마다 DOM을 **직접 찾아서 수정**해야 합니다.

```javascript
// Vanilla JS - 데이터 변경 시 DOM 수동 업데이트
let count = 0;
const countElement = document.querySelector('.count');
const button = document.querySelector('.increment-btn');

button.addEventListener('click', () => {
  count++;  // 상태 변경

  // DOM 수동 업데이트 (잊기 쉬움!)
  countElement.textContent = count;

  // 관련된 다른 DOM 요소도 수동으로 업데이트해야 함
  document.querySelector('.status').textContent = count > 10 ? '많음' : '적음';
});
```

```javascript
// React - 상태 변경 시 자동 업데이트
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>카운트: {count}</span>
      <span>상태: {count > 10 ? '많음' : '적음'}</span>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
// setCount만 호출하면 모든 관련 UI가 자동으로 업데이트됨
```

#### 3. 코드 중복과 재사용성

복잡한 UI 컴포넌트를 재사용하기 어렵습니다.

```javascript
// Vanilla JS - 중복되는 코드
function createUserCard1(user) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${user.avatar}" alt="${user.name}">
    <h3>${user.name}</h3>
    <p>${user.email}</p>
  `;
  return div;
}

// 비슷한 카드를 다른 곳에서 만들려면 코드 복사
function createUserCard2(user) {
  const div = document.createElement('div');
  div.className = 'card different-style';
  div.innerHTML = `
    <img src="${user.avatar}" alt="${user.name}">
    <h3>${user.name}</h3>
    <p>${user.email}</p>
  `;
  return div;
}
```

```javascript
// React - 재사용 가능한 컴포넌트
function UserCard({ user, variant = 'default' }) {
  return (
    <div className={`card ${variant}`}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// 어디서든 재사용 가능
<UserCard user={user1} variant="default" />
<UserCard user={user2} variant="different-style" />
```

#### 4. 상태 관리의 어려움

여러 DOM 요소가 서로 의존하는 경우 동기화가 복잡해집니다.

```javascript
// Vanilla JS - 동기화 문제
const checkbox = document.querySelector('.agree-checkbox');
const submitButton = document.querySelector('.submit-btn');
const errorMessage = document.querySelector('.error');

checkbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    submitButton.disabled = false;
    errorMessage.style.display = 'none';
  } else {
    submitButton.disabled = true;
    errorMessage.style.display = 'block';
  }
});

// 다른 곳에서 체크박스를 변경하면?
// 이벤트 핸들러를 다시 작성하거나 직접 DOM을 수정해야 함
```

```javascript
// React - 상태 기반 자동 동기화
function Form() {
  const [agreed, setAgreed] = useState(false);

  return (
    <form>
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      <button type="submit" disabled={!agreed}>
        제출
      </button>
      {!agreed && <p className="error">동의가 필요합니다</p>}
    </form>
  );
}
// agreed 상태 하나로 모든 UI가 자동 동기화됨
```

### Vanilla JS vs React 비교표

| 구분 | Vanilla JavaScript | React |
|------|-------------------|-------|
| **코드 스타일** | 명령형 (어떻게) | 선언형 (무엇을) |
| **DOM 업데이트** | 수동으로 직접 제어 | 상태 변경 시 자동 업데이트 |
| **데이터 흐름** | 양방향, 예측 어려움 | 단방향, 예측 가능 |
| **코드 재사용** | 함수로 묶지만 제한적 | 컴포넌트로 완전 재사용 |
| **상태 관리** | DOM과 직접 동기화 | 상태와 UI 분리 |
| **복잡성 증가** | 기능 추가 시 급격히 증가 | 컴포넌트로 캡슐화하여 관리 |
| **버그 발생** | DOM 동기화 실수로 자주 발생 | 상태 기반으로 버그 감소 |

### 결론

Vanilla JavaScript는 간단한 UI에는 적합하지만, **복잡한 상호작용이 많은 현대적 웹 애플리케이션**에서는 다음과 같은 문제가 발생합니다:

- 🔴 코드가 길어지고 복잡해짐
- 🔴 DOM 업데이트를 수동으로 관리해야 함
- 🔴 상태 동기화가 어렵고 버그 발생
- 🔴 코드 재사용과 유지보수가 어려움

**React**는 이러한 문제들을 **컴포넌트 기반 아키텍처**와 **선언적 프로그래밍**으로 해결합니다.

---

## 1.3 React가 DOM을 조작하는 방법

React가 효율적으로 UI를 렌더링하고 업데이트하는 내부 메커니즘을 이해해 봅시다.

### React 패키지 구조

React는 두 개의 주요 패키지로 나뉘어 있습니다:

#### 1️⃣ `react` 패키지

React의 **핵심 로직**이 포함되어 있으며, 플랫폼에 독립적입니다.

```bash
npm install react
```

**주요 기능:**
- **컴포넌트**: React.createElement(), 컴포넌트 로직
- **Hooks**: useState, useEffect, useContext 등
- **상태 관리**: 상태 생성 및 업데이트 로직
- **Virtual DOM**: 가상 DOM 생성 및 비교 알고리즘

```javascript
import { useState, useEffect } from 'react';

// react 패키지는 플랫폼에 상관없이 동일한 코드 사용
function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

#### 2️⃣ `react-dom` 패키지

React를 **웹 브라우저**에서 사용하기 위한 DOM 렌더링 엔진입니다.

```bash
npm install react-dom
```

**주요 기능:**
- **ReactDOM.render()**: React 컴포넌트를 실제 DOM에 마운트
- **ReactDOM.hydrate()**: 서버 사이드 렌더링(SSR)된 HTML 활용
- **ReactDOM.createPortal()**: 컴포넌트를 DOM의 다른 위치에 렌더링
- **이벤트 처리**: 브라우저 이벤트를 React의 SyntheticEvent로 변환

```javascript
import ReactDOM from 'react-dom/client';

// react-dom은 웹 브라우저에서만 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**비교: React Native**
```javascript
// React Native는 react-dom 대신 별도 패키지 사용
import { AppRegistry } from 'react-native';

// 동일한 React 컴포넌트를 모바일 앱으로 렌더링
AppRegistry.registerComponent('MyApp', () => App);
```

### JSX (JavaScript XML)

**JSX**는 JavaScript 내에서 HTML 같은 문법을 사용할 수 있는 확장 문법입니다.

#### JSX란?

```javascript
// JSX 없이 (권장하지 않음)
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);

// JSX 사용 (권장)
const element = <h1 className="greeting">Hello, world!</h1>;
```

#### JSX 특징

1. **JavaScript의 확장**
   ```javascript
   // JavaScript 표현식 사용 가능
   const name = 'John';
   const greeting = <h1>Hello, {name}!</h1>;

   // 함수 호출도 가능
   const formatDate = (date) => date.toLocaleDateString();
   const element = <span>{formatDate(new Date())}</span>;
   ```

2. **속성 명명 규칙 (camelCase)**
   ```javascript
   // HTML
   <div class="container" onclick="handleClick()">

   // JSX
   <div className="container" onClick={handleClick}>
   ```

3. **자식 요소 표현**
   ```javascript
   // 단일 태그는 닫기 필요
   <img src={avatarUrl} alt={name} />

   // 여러 요소는 하나로 감싸야 함
   return (
     <div>
       <h1>Title</h1>
       <p>Content</p>
     </div>
   );

   // Fragment로 감쌀 수도 있음
   return (
     <>
       <h1>Title</h1>
       <p>Content</p>
     </>
   );
   ```

### JSX Preprocessing (트랜스파일링)

브라우저는 JSX를 직접 이해하지 못하므로, **트랜스파일러(Transpiler)**가 JSX를 일반 JavaScript로 변환해야 합니다.

#### 변환 과정

```jsx
// 🔵 작성하는 코드 (JSX)
function App() {
  return <h1>Hello, World!</h1>;
}

// 🟡 트랜스파일된 코드 (JavaScript)
function App() {
  return React.createElement('h1', null, 'Hello, World!');
}
```

#### 트랜스파일 도구

**1. Babel**
```javascript
// .babelrc
{
  "presets": ["@babel/preset-react"]
}

// JSX → ES5 JavaScript로 변환
```

**2. SWC (Speedy Web Compiler)**
```javascript
// Next.js, Vite 등에서 사용
// Babel보다 20배 더 빠름
```

**3. Vite (개발용)**
```javascript
// 개발 중: 즉시 JSX 처리
// 빌드 시: Rollup으로 번들링
```

#### 빌드 과정 흐름도

```
┌─────────────┐
│  JSX 코드   │  function App() { return <div>Hello</div>; }
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  트랜스파일 │  Babel/SWC가 JS로 변환
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  변환된 JS  │  React.createElement("div", null, "Hello")
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   번들링    │  Webpack/Rollup이 묶음
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  실행 파일   │  브라우저에서 실행
└─────────────┘
```

### Virtual DOM (가상 DOM)

React의 핵심 성능 최적화 기술인 Virtual DOM을 이해해 봅시다.

#### DOM 조작의 비용

```
실제 DOM 조작은 비쌉니다:

1. DOM 트리 탐색
2. 리플로우(Reflow): 요소 위치와 크기 재계산
3. 리페인트(Repaint): 화면 다시 그리기
4. Composite 레이어: GPU 합성

⏱️ 일반적으로 10-50ms 소요 (브라우저마다 다름)
```

#### Virtual DOM이란?

실제 DOM의 **가벼운 JavaScript 복사본**입니다:

```javascript
// 실제 DOM
<div id="app">
  <h1 class="title">Hello</h1>
</div>

// Virtual DOM (JavaScript 객체)
{
  type: 'div',
  props: {
    id: 'app',
    children: [
      {
        type: 'h1',
        props: {
          className: 'title',
          children: 'Hello'
        }
      }
    ]
  }
}
```

#### Reconciliation (재조정) 과정

React는 상태가 변경되면 다음 세 단계를 수행합니다:

```
┌─────────────────────────────────────────────────────┐
│  1️⃣  렌더 (Render)                                │
│     • 새 Virtual DOM 트리 생성                      │
│     • 이전 Virtual DOM와 비교                       │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  2️⃣  비교 (Diff)                                   │
│     • 두 Virtual DOM 트리 비교                      │
│     • 변경된 부분(또는 Dirty) 식별                  │
│     • O(n) 알고리즘 사용 (효율적)                   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  3️⃣  커밋 (Commit)                                 │
│     • 변경된 부분만 실제 DOM에 업데이트             │
│     • 최소한의 DOM 조작으로 성능 최적화              │
└─────────────────────────────────────────────────────┘
```

#### Diffing 알고리즘

React는 O(n) 복잡도로 두 트리를 효율적으로 비교합니다:

```javascript
// 이전 상태
[
  <li key="1">Item 1</li>,
  <li key="2">Item 2</li>,
  <li key="3">Item 3</li>
]

// 새로운 상태 (아이템 2 삭제)
[
  <li key="1">Item 1</li>,
  <li key="3">Item 3</li>
]

// React는 key로 비교하여:
// - Item 1: 변경 없음 (유지)
// - Item 2: 삭제됨 (DOM 제거)
// - Item 3: 변경 없음 (유지)
```

#### Virtual DOM 동작 예시

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

// 버튼 클릭 시:
// 1. setCount 호출 → 상태 변경
// 2. React가 새 Virtual DOM 생성
// 3. 이전 Virtual DOM과 비교
// 4. <h1>의 텍스트만 변경된 것을 감지
// 5. 실제 DOM의 <h1> 텍스트만 업데이트
//    (버튼과 div는 업데이트하지 않음)
```

#### Virtual DOM의 장점

| 장점 | 설명 |
|------|------|
| **효율적 업데이트** | 변경된 부분만 실제 DOM에 반영 |
| **배칭(Batching)** | 여러 상태 변경을 하나로 묶어 한 번에 업데이트 |
| **추상화** | 플랫폼 독립적 (React Native, React ART 등) |
| **디버깅 용이** | React DevTools로 Virtual DOM 상태 확인 |

### 전체 렌더링 흐름

```
┌────────────────────────────────────────────────────────┐
│  1. 사용자 인터랙션 (클릭, 입력 등)                    │
└────────────────────┬───────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│  2. 이벤트 핸들러 실행                                 │
│     setState() 또는 상태 업데이트 함수 호출            │
└────────────────────┬───────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│  3. React 재렌더링 예약                               │
│     • 여러 상태 변경을 배칭                            │
│     • 비동기적으로 처리                                │
└────────────────────┬───────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│  4. 컴포넌트 렌더 (Render Phase)                      │
│     • 새로운 Virtual DOM 트리 생성                     │
│     • JavaScript로 빠르게 계산                         │
└────────────────────┬───────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│  5. Reconciliation (Diffing)                          │
│     • 이전 Virtual DOM와 비교                          │
│     • 변경된 부분 식별                                 │
└────────────────────┬───────────────────────────────────┘
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│  6. 커밋 (Commit Phase)                               │
│     • 변경된 부분만 실제 DOM에 업데이트                │
│     • 브라우저가 화면을 다시 그리기 (리플로우/리페인트)│
└────────────────────────────────────────────────────────┘
```

### 요약

1. **`react` 패키지**: 플랫폼 독립적 핵심 로직 (컴포넌트, Hooks, 상태 관리)
2. **`react-dom` 패키지**: 웹 브라우저 DOM 렌더링 (렌더링, 이벤트 처리)
3. **JSX**: JavaScript의 HTML 같은 문법 확장
4. **JSX Preprocessing**: Babel/SWC가 JSX를 일반 JavaScript로 변환
5. **Virtual DOM**: 실제 DOM의 가벼운 복사본으로 효율적인 업데이트 수행

이러한 메커니즘들이 결합하여 React가 빠르고 효율적인 UI 업데이트를 가능하게 합니다.
