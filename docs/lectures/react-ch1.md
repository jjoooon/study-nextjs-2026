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

### React의 정신 모델: UI = f(state)

React의 핵심 철학은 **UI가 상태(state)의 순수 함수**라는 것입니다.

```
UI = f(state)
```

이것이 의미하는 바:
- **f**: 컴포넌트 (UI를 만드는 함수)
- **state**: 현재 애플리케이션 상태 (데이터)
- **UI**: 렌더링된 화면

**왜 이것이 중요한가요?**

1. **예측 가능성**: 같은 상태는 항상 같은 UI를 만듭니다
   ```javascript
   // 상태가 { count: 5 }면 UI는 항상 "카운트: 5"
   function Counter({ count }) {
     return <span>카운트: {count}</span>;
   }
   ```

2. **테스트 용이성**: 상태만 넣고 UI를 확인하면 됩니다
   ```javascript
   // UI 테스트 = 특정 상태 입력 → 기대하는 UI 출력 확인
   expect(Counter({ count: 5 })).toBe("카운트: 5");
   ```

3. **디버깅 단순화**: UI가 이상하면 상태를 확인하면 됩니다
   ```
   문제: UI가 이상하게 보임
   해결: 상태를 확인 → 상태가 이상하면 데이터 소스 확인
   ```

4. **시간 추상화**: 상태 변경만 신경 쓰면 됩니다 (React가 DOM 업데이트를 처리)
   ```javascript
   // before: DOM 직접 조작
   button.addEventListener('click', () => {
     count++;
     countElement.textContent = count;  // 잊기 쉬움!
   });

   // after: 상태 변경만 (React가 UI를 업데이트)
   <button onClick={() => setCount(count + 1)}>
   ```

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
// Vanilla JS - 명령형 접근 (현대적인 방식)
function addTodo(text) {
  const list = document.querySelector('.todo-list');

  // insertAdjacentHTML로 간단하게 추가
  list.insertAdjacentHTML('beforeend', `
    <li>
      <span>${text}</span>
      <button class="delete-btn">삭제</button>
    </li>
  `);

  // 하지만 관련된 다른 DOM 요소는 여전히 수동으로 업데이트해야 함
  const count = document.querySelector('.count');
  count.textContent = list.children.length;
}

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

**비교 포인트**:
- Vanilla JS: 각 DOM 업데이트를 **명시적으로** 작성해야 함 (수동 동기화 필요)
- React: 상태를 변경하면 React가 **자동으로** UI 업데이트를 계산하고 실행

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
// Vanilla JS - 동기화 문제 (현대적인 해결 방법도 있음)
const checkbox = document.querySelector('.agree-checkbox');
const submitButton = document.querySelector('.submit-btn');
const errorMessage = document.querySelector('.error');

// 함수로 분리하여 재사용 가능
function updateFormState(isAgreed) {
  submitButton.disabled = !isAgreed;
  errorMessage.style.display = isAgreed ? 'none' : 'block';
}

checkbox.addEventListener('change', (e) => {
  updateFormState(e.target.checked);
});

// 하지만 여전히 문제: 다른 곳에서 체크박스를 변경하면
// 이 함수를 다시 호출해야 함을 기억해야 함
// 체크박스.checked = true; // updateFormState(true)을 호출해야 함!

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
// setAgreed(true)를 호출하면 어디서든 자동으로 모든 관련 UI 업데이트
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
- **스케줄링 (Scheduler)**: 우선순위 기반 렌더링 스케줄링 (React 18+)

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
- **ReactDOM.createRoot()**: React 18+ Concurrent 렌더링을 위한 루트 생성
- **ReactDOM.hydrateRoot()**: 서버 사이드 렌더링(SSR)된 HTML 활용
- **ReactDOM.createPortal()**: 컴포넌트를 DOM의 다른 위치에 렌더링
- **이벤트 처리**: 브라우저 이벤트를 React의 SyntheticEvent로 변환

```javascript
import ReactDOM from 'react-dom/client';

// react-dom은 웹 브라우저에서만 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**⚠️ 중요: 플랫폼별 렌더러의 차이**

React의 **핵심 로직**은 플랫폼 독립적이지만, **UI 컴포넌트는 플랫폼마다 다릅니다**:

| 플랫폼 | 렌더러 | UI 프리미티브 | 예시 |
|--------|--------|--------------|------|
| 웹 | react-dom | `<div>`, `<span>`, `<button>` | 웹 DOM 요소 |
| React Native | react-native | `<View>`, `<Text>`, `<Button>` | 네이티브 뷰 |
| React Three Fiber | @react-three/fiber | `<canvas>`, `<mesh>` | 3D WebGL |

```javascript
// 웹 (react-dom)
function App() {
  return <div>Hello</div>;  // HTML div
}

// React Native
function App() {
  return <View>Hello</View>;  // 네이티브 View
  // return <div>Hello</div>;  // ❌ 에러: div는 존재하지 않음
}
```

**따라서**: React 컴포넌트 로직은 재사용 가능하지만, UI 렌더링 부분은 플랫폼에 맞게 수정해야 합니다.

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

#### JSX의 공식 명세

JSX는 더 이상 단순한 "확장 문법"이 아닙니다. **TC39 표준화 제안**을 통해 정식 명세화되었습니다:

- JSX는 Facebook이 제안한 ECMAScript 표준
- 문법과 변환 규칙이 명확히 정의됨
- 모든 주요 트랜스파일러가 동일한 방식으로 처리

#### 변환 과정 (React 17+ New JSX Transform)

```jsx
// 🔵 작성하는 코드 (JSX)
function App() {
  return <h1 className="greeting">Hello, World!</h1>;
}

// 🟡 React 17+ 트랜스파일된 코드 (New JSX Transform)
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { className: 'greeting', children: 'Hello, World!' });
}
```

**변화된 점**:
- ✅ `import React` 더 이상 불필요
- ✅ 번들 크기 감소 (JSX 런타임만 포함)
- ✅ 나중에 더 나은 최적화 가능

**이전 방식 (React 16 및 그 이전)**:
```javascript
// React 16 이전 (Old JSX Transform)
import React from 'react';

function App() {
  return React.createElement('h1', {
    className: 'greeting',
    children: 'Hello, World!'
  });
}
```

#### 현대적 빌드 도구

**1. SWC (Speedy Web Compiler) - 기본 추천**
```javascript
// Next.js 13+, Vite 4+ 등에서 사용
// Rust로 작성되어 Babel보다 20-70배 더 빠름
// esbuild와 함께 현대적 빌드의 표준
```

**2. esbuild**
```javascript
// Go로 작성된 초고속 번들러
// 트랜스파일 + 번들링을 하나의 프로세스로 처리
// Vite, Remix 등에서 사용
```

**3. Babel**
```javascript
// .babelrc
{
  "presets": ["@babel/preset-react"]
}

// 여전히 널리 사용되지만, 새 프로젝트에서는 SWC/esbuild 추천
```

**4. Vite (개발용)**
```javascript
// 개발 중: esbuild로 즉시 JSX 처리 (极速 HMR)
// 빌드 시: Rollup으로 번들링
// 현대적 React 프로젝트의 표준 도구
```

#### 현대적 빌드 과정

```
┌─────────────┐
│  JSX 코드   │  function App() { return <div>Hello</div>; }
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SWC/esbuild │  트랜스파일 + 번들링 동시 처리 (초고속)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  최적화된    │  _jsx("div", { children: "Hello" })
│  번들 파일   │  tree-shaking, minification 완료된 상태
└─────────────┘
       │
       ▼
┌─────────────┐
│  브라우저    │  즉시 실행 가능
│  실행        │
└─────────────┘
```

**과거와의 차이점**:
- 과거: Babel(트랜스파일) → Webpack(번들링) - 2단계 처리
- 현재: SWC/esbuild - 트랜스파일 + 번들링을 한 번에 처리

---

### React 18+의 새로운 기능들

React 18(2022년 6월 출시)과 그 이후 버전에서 도입된 중요한 개념들을 이해해야 합니다.

#### 1️⃣ Concurrent Rendering (동시성 렌더링)

**Concurrent Rendering**은 React가 **여러 렌더링 작업을 동시에 준비**하고, 더 중요한 업데이트를 우선 처리할 수 있는 기능입니다.

```javascript
import { startTransition } from 'react';

// 사용자 입력 - 즉시 반응 필요
setSearchQuery(input);

// UI 업데이트 - 나중에 처리해도 됨
startTransition(() => {
  setSearchResults(filterLargeList(input));
});
```

**동작 방식**:
- 사용자 입력 → 즉시 렌더링 (우선순위 높음)
- 리스트 필터링 → 백그라운드에서 렌더링 (우선순위 낮음)
- 사용자가 다시 입력하면 → 이전 필터링 작업 중단

**장점**:
- UI가 끊기지 않고 부드러움
- 복잡한 렌더링 작업 중에도 사용자 입력 반응
- 사용자 경험 개선

#### 2️⃣ Automatic Batching (자동 배칭)

React 18은 **모든 상태 업데이트를 자동으로 배칭**합니다.

```javascript
// React 17 이전
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);  // Promise/타이머 내에서는 배칭 안됨 → 2번 렌더링
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);  // 배칙 안됨 → 2번 렌더링
}, 1000);

// React 18+ - 자동 배칭
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);  // 항상 배칭됨 → 1번 렌더링 ✅
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);  // Promise/타이머에서도 배칭됨 → 1번 렌더링 ✅
}, 1000);
```

#### 3️⃣ Suspense (서스펜스)

**Suspense**는 데이터가 로딩 중일 때 **대기(fallback) UI를 보여주는** 기능입니다.

```javascript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Comments />  {/* 데이터 로딩 중이면 fallback 표시 */}
    </Suspense>
  );
}

async function Comments() {
  const comments = await fetchComments();  // 데이터가 로딩될 때까지 대기
  return <div>{comments.map(/* ... */)}</div>;
}
```

**장점**:
- 비동기 데이터 로딩을 선언적으로 처리
- 로딩 상태 관리 코드 (`if (loading) return ...`) 제거
- 스켈레톤 UI 쉽게 구현

#### 4️⃣ 새로운 Hooks

React 18+에서 추가된 주요 Hooks들:

**useTransition**: 낮은 우선순위 상태 업데이트
```javascript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setHeavyComputationResult(compute(data));
});

// isPending === true면 로딩 중 표시
```

**useDeferredValue**: 렌더링을 지연시킬 값
```javascript
const deferredQuery = useDeferredValue(query);
// query가 자주 변경되도, deferredQuery는 지연되어 업데이트
```

**useId**: 고유한 ID 생성 (서버 사이드 렌더링에서 안전)
```javascript
const id = useId();
return <label htmlFor={id}>...</label>;
```

#### 5️⃣ React Server Components (RSC)

**Server Components**는 서버에서만 렌더링되는 컴포넌트로, **클라이언트 번들 크기를 줄입니다**.

```javascript
// 서버 컴포넌트 (클라이언트로 전송되지 않음)
async function BlogPost({ id }) {
  const post = await db.query(`SELECT * FROM posts WHERE id = ${id}`);
  // 데이터베이스 직접 접근 가능

  return <article>{post.content}</article>;
}

// 클라이언트 컴포넌트 ("use client" 지시어)
"use client";
function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(l => l + 1)}>{likes}</button>;
}
```

**장점**:
- 번들 크기 감소 (서버 로직은 클라이언트로 전송 안 됨)
- 서버 리소스 직접 접근 (DB, 파일 시스템)
- 더 나은 SEO (초기 HTML에 포함)

#### 6️⃣ Hooks 규칙

React Hooks를 사용할 때 반드시 따라야 할 규칙들:

**✅ 규칙 1: 최상위 레벨에서만 호출**
```javascript
// ✅ 좋음
function Counter() {
  const [count, setCount] = useState(0);  // 최상위 레벨
  useEffect(() => { /* ... */ });         // 최상위 레벨
}

// ❌ 나쁨
function Counter() {
  if (count > 0) {
    const [count, setCount] = useState(0);  // 조건문 내부 ❌
  }
}
```

**✅ 규칙 2: React 함수 내에서만 호출**
```javascript
// ✅ 좋음
function Component() {
  useState();  // React 컴포넌트
}

// ❌ 나쁨
function regularFunction() {
  useState();  // 일반 함수 ❌
}
```

**⚠️ Hook 의존성 배열**
```javascript
// useEffect의 의존성 배열은 정확해야 함
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);  // ✅ props.source를 의존성에 포함

// ❌ 의존성 누락 - 버그 발생
useEffect(() => {
  console.log(props.source.value);  // props.source 사용하지만
}, []);  // 의존성 배열이 비어있음 ❌
```

### Virtual DOM (가상 DOM)

Virtual DOM을 이해하기 전에 중요한 점을 알아야 합니다:

**⚠️ Virtual DOM이 더 빠른 것이 아닙니다**

Virtual DOM은 **CPU를 사용해서 DOM 조작을 줄이는 방식**입니다.:
- Virtual DOM 생성 → CPU 소모
- Diffing 알고리즘 → CPU 소모
- 실제 DOM 업데이트 → DOM 조작

**성능상의 이점**:
1. **배칭(Batching)**: 여러 상태 변경을 하나로 묶어 DOM 조작 최소화
2. **리플로우 최소화**: 변경된 부분만 DOM에 업데이트
3. **예측 가능성**: 직접 DOM 조작보다 디버깅이 쉬움

**Trade-off**:
- ✅ 복잡한 UI에서는 DOM 조작 감소로 전체적으로 빠름
- ❌ 간단한 업데이트에서는 Virtual DOM의 오버헤드로 느릴 수 있음
- ❌ 직접 DOM 업데이트(`textContent = "x"`)는 Virtual DOM보다 빠름

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

React는 **안정적인 key를 제공하면** O(n) 복잡도로 두 트리를 효율적으로 비교합니다:

**✅ 좋은 key 사용 (안정적 ID)**:

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

// React는 key로 비교하여 O(n)으로 처리:
// - Item 1: key="1" → 변경 없음 (유지)
// - Item 2: key="2"가 없음 → 삭제 (DOM 제거)
// - Item 3: key="3" → 변경 없음 (유지)
```

**❌ 나쁜 key 사용 (배열 인덱스)**:

```javascript
// ❌ 안티패턴: 배열 인덱스를 key로 사용
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>  {/* ❌ 문제 발생 */}
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// 문제: 첫 번째 아이템 삭제 시
// 이전: [{id: 1, text: "A"}, {id: 2, text: "B"}]
//       key: 0                    key: 1
// 이후: [{id: 2, text: "B"}]
//       key: 0 (이전의 B가 아니라 A였던 위치!)

// React의 관점에서:
// - key 0: 여전히 존재 → 내용만 업데이트 (B의 내용을 A 위치에)
// - key 1: 삭제됨
// 결과: 불필요한 업데이트 발생, 성능 저하
```

**⚠️ O(n²) 최악의 경우**:

- 나쁜 key를 사용하면 React는 모든 자식을 다시 비교
- 각 비교는 O(n)이고, 모든 항목에 대해 수행 → O(n²)
- 항상 **안정적이고 고유한 key**를 사용해야 합니다

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

#### Virtual DOM의 장점 (과 실제)

| 장점 | 설명 | ⚠️ 주의사항 |
|------|------|-----------|
| **배칭(Batching)** | 여러 상태 변경을 하나로 묶어 DOM 조작 최소화 | React 18+에서 자동으로 적용됨 |
| **최소 업데이트** | 변경된 부분만 실제 DOM에 반영 | 안정적인 key가 필요함 |
| **예측 가능성** | 선언적 UI로 디버깅이 쉬움 | 직접 DOM 조작보다 추적하기 쉬움 |
| **플랫폼 추상화** | React Native, React Three Fiber 등 | UI 컴포넌트는 플랫폼별로 다름 |
| **개발 도구** | React DevTools로 상태 확인 | Virtual DOM 자체는 개발자에게 보이지 않음 |

**성능 비교**:
```javascript
// 간단한 업데이트 - Vanilla JS가 더 빠름
document.getElementById('count').textContent = '5';  // ~0.1ms

// 같은 작업 - React는 Virtual DOM 오버헤드 있음
setCount(5);  // ~1-5ms (VDOM 생성, diffing, patching)

// 복잡한 업데이트 - React가 더 빠름
// 100개의 요소 중 5개만 변경
// Vanilla: 수동으로 5개만 업데이트 (복잡한 로직)
// React: 자동으로 5개만 식별해서 업데이트 (간단한 상태 변경)
```

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

---

## ⚠️ React 개발 시 피해야 할 안티패턴

React를 효과적으로 사용하기 위해 피해야 할 일반적인 실수들입니다.

### 1. Props Drilling (props 전달 지옥)

**문제**: 데이터가 여러 컴포넌트를 거쳐 전달되어야 할 때

```javascript
// ❌ 안티패턴
function App() {
  const [user, setUser] = useState(null);
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserMenu user={user} />;  // user를 사용하지만 중간 컴포넌트가 전달해야 함
}

function UserMenu({ user }) {
  return <div>{user.name}</div>;  // 여기서 실제로 사용
}
```

**해결책**: Context API 또는 상태 관리 라이브러리 사용

```javascript
// ✅ Context API 사용
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext);  // 어디서든 직접 접근
  return <div>{user.name}</div>;
}
```

### 2. useEffect滥用 (useEffect 과도 사용)

**문제**: useEffect를 데이터 페칭, 이벤트 핸들링, 파생 상태 계산 등 모든 곳에 사용

```javascript
// ❌ 안티패턴
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // 문제 1: 데이터 페칭에 useEffect 사용
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // 문제 2: 파생 상태 계산에 useEffect 사용
  useEffect(() => {
    if (user?.role === 'admin') {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);
}
```

**해결책**:
- 데이터 페칭: React Query, SWR, 서버 컴포넌트 사용
- 파생 상태: useMemo 또는 직접 계산

```javascript
// ✅ 개선된 버전
function UserProfile({ userId }) {
  // React Query로 데이터 페칭
  const { data: user } = useQuery(['user', userId], () => fetchUser(userId));

  // 파생 상태는 직접 계산
  const admin = user?.role === 'admin';

  return <div>{admin ? 'Admin' : 'User'}</div>;
}
```

### 3. 거대한 컴포넌트

**문제**: 하나의 컴포넌트가 너무 많은 책임을 가짐

```javascript
// ❌ 안티패턴 - 500줄 짜리 컴포넌트
function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  // ... 50줄 더

  return (
    <div>
      {/* 300줄의 JSX */}
    </div>
  );
}
```

**해결책**: 작은 컴포넌트로 분리

```javascript
// ✅ 개선된 버전
function UserDashboard() {
  const { users, loading, error } = useUsers();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  return (
    <div>
      <UserFilter filter={filter} onFilterChange={setFilter} />
      <UserSort sortBy={sortBy} onSortChange={setSortBy} />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <UserList users={users} filter={filter} sortBy={sortBy} />
      )}
    </div>
  );
}

// 각각의 작은 컴포넌트로 분리
function UserFilter({ filter, onFilterChange }) { /* ... */ }
function UserSort({ sortBy, onSortChange }) { /* ... */ }
function UserList({ users, filter, sortBy }) { /* ... */ }
```

### 4. 의존성 배열 누락

**문제**: useEffect/useCallback/useMemo의 의존성 배열을 빈 값으로 두거나 불완전하게 작성

```javascript
// ❌ 안티패턴
function Chat({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createChatConnection(roomId);
    connection.on('message', setMessages);

    return () => connection.disconnect();
  }, []);  // ❌ roomId가 의존성에 없음!
  // roomId가 변경되어도 이전 연결이 유지됨
}
```

**해결책**: ESLint react-hooks 플러그인 사용 또는 정확한 의존성 작성

```javascript
// ✅ 개선된 버전
function Chat({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createChatConnection(roomId);
    connection.on('message', setMessages);

    return () => connection.disconnect();
  }, [roomId]);  // ✅ roomId를 의존성에 포함
}
```

### 5. useState의 잘못된 초기값

**문제**: 복잡한 계산을 useState 초기값으로 직접 수행

```javascript
// ❌ 안티패턴 - 매 렌더링时 계산 수행
function List({ items }) {
  const [sorted, setSorted] = useState(
    items.sort((a, b) => a.id - b.id)  // ❌ 매 렌더링时 실행됨
  );
}
```

**해결책**: Lazy Initialization

```javascript
// ✅ 개선된 버전
function List({ items }) {
  const [sorted, setSorted] = useState(() =>
    items.sort((a, b) => a.id - b.id)  // ✅ 초기에 한 번만 실행
  );
}
```

### 요약

#### React의 핵심 개념

1. **`react` 패키지**: 플랫폼 독립적 핵심 로직 (컴포넌트, Hooks, 상태 관리, 스케줄러)
2. **`react-dom` 패키지**: 웹 브라우저 DOM 렌더링 (Concurrent 렌더링, 이벤트 처리)
3. **JSX**: JavaScript 내에서 HTML 같은 문법을 사용할 수 있는 공식 표준 명세
4. **JSX Preprocessing**: SWC/esbuild가 JSX를 `_jsx()` 호출로 변환 (React 17+ New JSX Transform)
5. **Virtual DOM**: 실제 DOM의 JavaScript 복사본으로, **CPU를 사용해 DOM 조작을 최소화** (단, 항상 빠른 것은 아님)

#### React의 정신 모델

```
UI = f(state)
```

- **예측 가능성**: 같은 상태는 항상 같은 UI 생성
- **테스트 용이성**: 상태 입력 → UI 출력 확인
- **디버깅 단순화**: UI 문제 = 상태 문제
- **시간 추상화**: 상태 변경만 관리, React가 DOM 업데이트 처리

#### React 18+의 중요한 변화

- **Concurrent Rendering**: 여러 렌더링 작업 동시 준비, 중요한 업데이트 우선 처리
- **Automatic Batching**: 모든 상태 업데이트 자동 배칭 (Promise/타이머 포함)
- **Suspense**: 데이터 로딩 시 선언적 대기 UI 처리
- **Server Components**: 서버 전용 컴포넌트로 번들 크기 감소
- **새로운 Hooks**: `useTransition`, `useDeferredValue`, `useId`

#### 성능 이해

- ✅ **복잡한 UI에서 빠름**: 배칭, 리플로우 최소화, 예측 가능성
- ❌ **간단한 업데이트에서 느림**: Virtual DOM 오버헤드 존재
- ⚡ **핵심은 배칭**: React 18+의 Auto Batching이 진짜 성능 향상

#### 학습 다음 단계

이 문서를 학습한 후 다음을 학습하세요:

1. **Hooks 심화**: `useReducer`, `useContext`, `useMemo`, `useCallback`
2. **상태 관리**: Context API, Zustand, Jotai, Redux
3. **데이터 페칭**: React Query, SWR, Server Components
4. **성능 최적화**: `useMemo`, `React.memo`, 코드 분할
5. **테스팅**: Jest, React Testing Library, Playwright
