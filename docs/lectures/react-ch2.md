# React 교육 문서

## 📚 목차

### 2. React 컴포넌트와 JSX 이해하기
- [2.1 컴포넌트가 무엇인가요?](#21-컴포넌트가-무엇인가요)
- [2.2 React가 컴포넌트들을 가지고 정확히 무엇을 하나요?](#22-react가-컴포넌트들을-가지고-정확히-무엇을-하나요)
- [2.3 JSX vs HTML vs Vanilla JavaScript](#23-jsx-vs-html-vs-vanilla-javascript)
- [2.4 동적 컨텐츠](#24-동적-컨텐츠)
- [2.5 컴포넌트는 언제 분리해야 하나요?](#25-컴포넌트는-언제-분리해야-하나요)

---

## 2. React 컴포넌트와 JSX 이해하기

## 2.1 컴포넌트가 무엇인가요?

### 정의

**컴포넌트(Component)**는 UI를 구성하는 **독립적이고 재사용 가능한 조각**입니다. 마치 레고 블록처럼, 작은 컴포넌트들을 조합하여 복잡한 사용자 인터페이스를 구축합니다.

```javascript
// 간단한 컴포넌트 예시
function Welcome() {
  return <h1>안녕하세요!</h1>;
}

// 사용
<Welcome />
```

---

### 왜 컴포넌트를 사용해야 하나요?

#### 1️⃣ 재사용성 (Reusability)

한 번 작성한 컴포넌트를 여러 곳에서 재사용할 수 있습니다.

```javascript
// 버튼 컴포넌트 정의
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

// 여러 곳에서 재사용
function App() {
  return (
    <div>
      <Button onClick={() => alert('저장!')}>저장</Button>
      <Button onClick={() => alert('취소!')}>취소</Button>
      <Button onClick={() => alert('제출!')}>제출</Button>
    </div>
  );
}
```

**컴포넌트를 사용하지 않으면:**
```javascript
// 코드 중복 발생 🔴
function App() {
  return (
    <div>
      <button className="btn" onClick={() => alert('저장!')}>저장</button>
      <button className="btn" onClick={() => alert('취소!')}>취소</button>
      <button className="btn" onClick={() => alert('제출!')}>제출</button>
    </div>
  );
}
```

#### 2️⃣ 캡슐화 (Encapsulation)

각 컴포넌트는 자신만의 **상태(state)**와 **로직**을 캡슐화합니다.

```javascript
function Counter() {
  // 이 상태는 Counter 컴포넌트에 캡슐화됨
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

// 다른 곳에서 Counter를 사용해도 내부 상태는 독립적
function App() {
  return (
    <div>
      <Counter />  {/* 카운트: 0 */}
      <Counter />  {/* 카운트: 0 (독립적) */}
      <Counter />  {/* 카운트: 0 (독립적) */}
    </div>
  );
}
```

#### 3️⃣ 관심사 분리 (Separation of Concerns)

복잡한 UI를 작은 단위로 나누어 각각에 집중할 수 있습니다.

```javascript
// 복잡한 페이지를 컴포넌트로 분리
function ProductPage() {
  return (
    <div>
      <Header />          {/* 네비게이션 */}
      <ProductList />     {/* 상품 목록 */}
      <ShoppingCart />    {/* 장바구니 */}
      <Footer />          {/* 푸터 */}
    </div>
  );
}

// 각 컴포넌트는 자신의 역할에만 집중
function Header() { /* ... */ }
function ProductList() { /* ... */ }
function ShoppingCart() { /* ... */ }
function Footer() { /* ... */ }
```

#### 4️⃣ 유지보수성 (Maintainability)

컴포넌트 단위로 수정, 테스트, 디버깅이 가능합니다.

```javascript
// UserCard 컴포넌트만 수정하면
// 사용하는 모든 곳에 자동으로 반영됨
function UserCard({ user }) {
  return (
    <div className="user-card v2">  {/* v2 스타일로 변경 */}
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

#### 5️⃣ 협업 효율성 (Team Collaboration)

팀원들이 서로 다른 컴포넌트를 동시에 작업할 수 있습니다.

```
프로젝트 구조 예시:
src/
├── components/
│   ├── Header/          # 김개발 담당
│   ├── ProductList/     # 이개발 담당
│   ├── ShoppingCart/    # 백개발 담당
│   └── Footer/          # 최개발 담당
```

---

### 컴포넌트의 핵심 개념

#### 1️⃣ Props (속성)

부모 컴포넌트에서 자식 컴포넌트로 **데이터를 전달**하는 방법입니다.

```javascript
// 자식 컴포넌트 (props 받기)
function Greeting(props) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}

// 또는 구조 분해 할당 (권장)
function Greeting({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}

// 부모 컴포넌트 (props 전달)
function App() {
  return (
    <div>
      <Greeting name="철수" />
      <Greeting name="영희" />
      <Greeting name="민수" />
    </div>
  );
}
```

**Props 특징:**
- ✅ **읽기 전용 (Immutable)**: 자식 컴포넌트에서 수정 불가
- ✅ **단방향 흐름**: 부모 → 자식으로만 전달

```javascript
// ❌ 잘못된 사용: props 수정 시도
function Greeting({ name }) {
  name = "변경";  // Error! props는 읽기 전용
  return <h1>{name}</h1>;
}

// ✅ 올바른 사용: 상태(state) 사용
function Greeting({ initialName }) {
  const [name, setName] = useState(initialName);
  return <h1>{name}</h1>;
}
```

#### 2️⃣ State (상태)

컴포넌트 내부에서 **변경 가능한 데이터**를 관리합니다.

```javascript
import { useState } from 'react';

function Counter() {
  // state 선언: [현재값, 업데이트 함수]
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

**State 특징:**
- ✅ **컴포넌트 내부 소유**: 외부에서 직접 접근 불가
- ✅ **변경 가능**: setState로 업데이트
- ✅ **렌더링 트리거**: state 변경 시 재렌더링

#### 3️⃣ 렌더링 (Rendering)

컴포넌트 함수가 호출되어 **UI를 반환**하는 과정입니다.

```javascript
function UserCard({ user }) {
  // 1. props/state 계산
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // 2. JSX 반환 (렌더링)
  return (
    <div className="card">
      <div className="avatar">{initials}</div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

**렌더링이 발생하는 경우:**
1. 컴포넌트가 처음 마운트될 때
2. state가 변경될 때
3. 부모 컴포넌트가 재렌더링될 때 (props 변경)

#### 4️⃣ 컴포넌트 조합 (Composition)

작은 컴포넌트들을 조합하여 복잡한 UI를 만듭니다.

```javascript
// 기본 컴포넌트들
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Avatar({ src, alt }) {
  return <img className="avatar" src={src} alt={alt} />;
}

function UserInfo({ name, email }) {
  return (
    <div className="user-info">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

// 조합하여 복잡한 컴포넌트 생성
function UserProfile({ user }) {
  return (
    <Card>
      <Avatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} email={user.email} />
    </Card>
  );
}
```

---

### 컴포넌트 함수는 정확히 무엇을 하나요?

#### React 컴포넌트 함수의 역할

React 컴포넌트 함수는 **UI를 설명하는 JavaScript 함수**입니다. 다음 세 가지 핵심 작업을 수행합니다:

```
┌─────────────────────────────────────────────────────────┐
│  React 컴포넌트 함수가 하는 일                          │
├─────────────────────────────────────────────────────────┤
│  1️⃣  데이터 계산                                       │
│     • props, state, context 등에서 필요한 데이터 계산    │
│     • 파생 데이터 계산 (예: filtered items)              │
├─────────────────────────────────────────────────────────┤
│  2️⃣  이벤트 핸들러 정의                               │
│     • 사용자 인터랙션 처리 함수 정의                    │
│     • 상태 업데이트 로직 포함                           │
├─────────────────────────────────────────────────────────┤
│  3️⃣  JSX 반환 (UI 설명)                               │
│     • 렌더링할 UI를 JSX로 반환                          │
│     • React가 이를 사용하여 Virtual DOM 생성            │
└─────────────────────────────────────────────────────────┘
```

#### 실제 동작 예시

```javascript
function TodoList({ todos }) {  // ← props 받기
  // 1️⃣ 데이터 계산
  const [filter, setFilter] = useState('all');
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 2️⃣ 이벤트 핸들러 정의
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // 3️⃣ JSX 반환 (UI 설명)
  return (
    <div>
      <div className="filters">
        <button onClick={() => handleFilterChange('all')}>전체</button>
        <button onClick={() => handleFilterChange('active')}>진행중</button>
        <button onClick={() => handleFilterChange('completed')}>완료</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### React가 컴포넌트를 사용하는 방법

```javascript
// 1. 컴포넌트 호출 (React가 수행)
const result = TodoList({ todos: [{ id: 1, text: '할 일' }] });

// 2. 반환된 JSX를 React.createElement로 변환
// <li key={todo.id}>{todo.text}</li>
// ↓ 변환됨
// React.createElement('li', { key: todo.id }, todo.text)

// 3. Virtual DOM 트리 생성
{
  type: 'div',
  props: {
    children: [
      { type: 'div', props: { className: 'filters', children: [...] }},
      { type: 'ul', props: { children: [...] }}
    ]
  }
}

// 4. 실제 DOM에 렌더링 (react-dom)
```

#### 순수 함수로서의 컴포넌트

React 컴포넌트는 **순수 함수(Pure Function)**처럼 동작해야 합니다:

```javascript
// ✅ 순수 함수: 같은 입력 = 같은 출력
function Double({ number }) {
  return <span>{number * 2}</span>;
}

// 항상 예측 가능
<Double number={5} />  // 항상 <span>10</span> 반환

// ❌ 비순수 함수: 부작용(Side Effect) 있음
function Double({ number }) {
  // 외부 상태 변경 (나쁜 예시)
  window.lastNumber = number * 2;
  return <span>{number * 2}</span>;
}
```

---

### 컴포넌트 작성 가이드

#### ✅ 좋은 컴포넌트의 특징

1. **단일 책임 (Single Responsibility)**
   ```javascript
   // ✅ 좋음: 하나의 명확한 역할
   function UserAvatar({ user }) {
     return <img src={user.avatar} alt={user.name} />;
   }

   // ❌ 나쁨: 너무 많은 역할
   function User Everything({ user }) {
     // 프로필, 게시글, 댓글, 친구 목록까지...
   }
   ```

2. **재사용 가능성 (Reusability)**
   ```javascript
   // ✅ 좋음: props로 유연하게 재사용
   function Button({ variant, size, children, onClick }) {
     return (
       <button className={`btn ${variant} ${size}`} onClick={onClick}>
         {children}
       </button>
     );
   }

   // 사용
   <Button variant="primary" size="large">저장</Button>
   <Button variant="secondary" size="small">취소</Button>
   ```

3. **명확한 인터페이스 (Clear Interface)**
   ```javascript
   // ✅ 좋음: 명확한 props와 기본값
   function UserCard({ user, onEdit, onDelete = () => {} }) {
     return (
       <div className="card">
         <h3>{user.name}</h3>
         <button onClick={() => onEdit(user)}>편집</button>
         <button onClick={() => onDelete(user.id)}>삭제</button>
       </div>
     );
   }
   ```

#### 컴포넌트 분리 기준

```
복잡한 UI가 있나요?
    ↓
   YES
    ↓
한 번에 파악하기 어려운가요?
    ↓
   YES
    ↓
여러 곳에서 재사용할 수 있나요?
    ↓
   YES
    ↓
👉 컴포넌트로 분리하세요!
```

---

### 요약

1. **컴포넌트**: UI의 독립적이고 재사용 가능한 조각
2. **사용 이유**: 재사용성, 캡슐화, 관심사 분리, 유지보수성, 협업 효율성
3. **핵심 개념**:
   - **Props**: 읽기 전용 데이터 전달 (부모 → 자식)
   - **State**: 컴포넌트 내부 변경 가능 데이터
   - **렌더링**: UI를 반환하는 과정
   - **조합**: 작은 컴포넌트로 큰 UI 구성
4. **컴포넌트 함수 역할**:
   - 데이터 계산
   - 이벤트 핸들러 정의
   - JSX로 UI 반환

컴포넌트는 React의 핵심 빌딩 블록으로, 잘 설계된 컴포넌트는 유지보수가 쉽고 재사용 가능한 코드를 만듭니다.

---

## 2.2 React가 컴포넌트들을 가지고 정확히 무엇을 하나요?

React가 컴포넌트들을 실제 DOM으로 변환하여 화면에 표시하는 전체 과정을 이해해 봅시다.

### 엔트리 포인트 (Entry Point)

React 애플리케이션은 **HTML 파일의 하나의 요소**에서 시작합니다.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>React App</title>
</head>
<body>
  <!-- React가 이 안에 모든 것을 렌더링합니다 -->
  <div id="root"></div>
</body>
</html>
```

이 `#root` 요소가 React 애플리케이션의 **유일한 진입점**입니다.

---

### createRoot와 render

React 18부터는 `createRoot` API를 사용하여 렌더링을 시작합니다.

```javascript
// src/index.js 또는 src/main.jsx
import ReactDOM from 'react-dom/client';
import App from './App';

// 1️⃣ React Root 생성
const root = ReactDOM.createRoot(document.getElementById('root'));

// 2️⃣ 컴포넌트 렌더링
root.render(<App />);
```

#### 단계별 동작

**1️⃣ `ReactDOM.createRoot()`**
```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
```

- **역할**: DOM의 `#root` 요소에 React 컨테이너를 생성
- **반환값**: Root 객체 (React 렌더링을 제어하는 인터페이스)
- **특징**:
  - Concurrent Features 지원 (React 18 새 기능)
  - 자동 배칭 (Automatic Batching)
  - Suspense 개선

```javascript
// React 17 이전 (레거시)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 이후 (현재)
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**2️⃣ `root.render()`**
```javascript
root.render(<App />);
```

- **역할**: 컴포넌트를 Virtual DOM으로 변환하고 실제 DOM에 렌더링
- **프로세스**:
  1. `<App />` 컴포넌트 함수 호출
  2. 반환된 JSX를 Virtual DOM으로 변환
  3. Virtual DOM을 실제 DOM에 반영
  4. 브라우저에 화면 표시

---

### React의 렌더링 과정 상세

React가 `<App />`을 받아서 실제 화면에 표시하기까지의 전체 과정을 살펴보겠습니다.

```
┌─────────────────────────────────────────────────────────────┐
│  1. 컴포넌트 함수 호출 (Component Function Call)            │
│     • <App /> → App() 함수 실행                             │
│     • JSX 반환                                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  2. JSX → createElement 변환 (JSX Transformation)          │
│     • <div>Hello</div>                                      │
│     • → React.createElement('div', null, 'Hello')          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Virtual DOM 트리 생성 (Virtual DOM Construction)      │
│     • JavaScript 객체로 DOM 구조 표현                       │
│     • 가볍고 빠른 계산 가능                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Reconciliation (재조정)                                │
│     • 이전 Virtual DOM과 비교 (첫 렌더링 시 없음)          │
│     • 변경된 부분 식별                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Commit Phase (커밋 단계)                               │
│     • Virtual DOM을 실제 DOM에 반영                         │
│     • DOM API 직접 호출 (createElement, appendChild 등)    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  6. 브라우저 렌더링 (Browser Rendering)                   │
│     • 리플로우(Reflow): 요소 위치/크기 계산                 │
│     • 리페인트(Repaint): 픽셀 그리기                        │
│     • Composite: GPU 레이어 합성                            │
└─────────────────────────────────────────────────────────────┘
```

---

### 실제 예시로 따라가기

```javascript
// App 컴포넌트
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>카운터: {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

// 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

#### 첫 번째 렌더링 (Initial Render)

```
1. root.render(<App />) 호출
   ↓
2. React가 App() 함수 호출
   ↓
3. JSX 반환:
   <div>
     <h1>카운터: 0</h1>
     <button>증가</button>
   </div>
   ↓
4. JSX → React.createElement 변환:
   React.createElement('div', null,
     React.createElement('h1', null, '카운터: 0'),
     React.createElement('button', { onClick: ... }, '증가')
   )
   ↓
5. Virtual DOM 생성:
   {
     type: 'div',
     props: {
       children: [
         { type: 'h1', props: { children: '카운터: 0' }},
         { type: 'button', props: { onClick: ..., children: '증가' }}
       ]
     }
   }
   ↓
6. 실제 DOM 생성:
   <div>
     <h1>카운터: 0</h1>
     <button>증가</button>
   </div>
   ↓
7. #root 요소에 DOM 추가:
   document.getElementById('root').appendChild(divElement)
```

#### 업데이트 (Update)

```javascript
// 버튼 클릭 → setCount(1) 호출
```

```
1. setCount(1) 호출 → 상태 변경
   ↓
2. React가 재렌더링 예약
   ↓
3. App() 함수 다시 호출
   ↓
4. 새로운 JSX 반환:
   <div>
     <h1>카운터: 1</h1>  ← 변경됨!
     <button>증가</button>
   </div>
   ↓
5. 새로운 Virtual DOM 생성
   ↓
6. Reconciliation (이전 Virtual DOM과 비교)
   - 이전: <h1>카운트: 0</h1>
   - 새로운: <h1>카운트: 1</h1>
   - 변경: <h1>의 텍스트만 수정
   ↓
7. 실제 DOM 업데이트:
   h1Element.textContent = '카운트: 1';
   (button과 div는 그대로)
```

---

### 컴포넌트 트리 (Component Tree)

React 애플리케이션은 **컴포넌트 트리**로 구성됩니다.

```javascript
function App() {
  return (
    <div>
      <Header />
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </div>
  );
}
```

이것은 다음과 같은 트리 구조를 형성합니다:

```
App (Root)
├── div
│   ├── Header
│   ├── Main
│   │   ├── Sidebar
│   │   └── Content
│   └── Footer
```

#### Virtual DOM 트리로의 변환

```javascript
{
  type: 'div',
  props: {
    children: [
      { type: Header, props: {} },
      {
        type: 'div',  // Main
        props: {
          children: [
            { type: Sidebar, props: {} },
            { type: Content, props: {} }
          ]
        }
      },
      { type: Footer, props: {} }
    ]
  }
}
```

---

### React의 내부 처리 흐름

```javascript
// React가 내부적으로 하는 일 (개념적 표현)

function render(jsxElement, container) {
  // 1. JSX → Virtual DOM
  const virtualDOM = createVirtualDOM(jsxElement);

  // 2. Virtual DOM → 실제 DOM
  const domElement = createDOMElement(virtualDOM);

  // 3. 컨테이너에 추가
  container.appendChild(domElement);
}

function createVirtualDOM(jsx) {
  // JSX가 실제로는 React.createElement 호출임
  // React.createElement는 Virtual DOM 노드를 반환
  if (typeof jsx !== 'object') {
    return { type: 'TEXT', props: { value: jsx }};
  }

  return {
    type: jsx.type,      // 'div', 'span', App 등
    props: jsx.props,    // className, children 등
    key: jsx.key,        // list key
    ref: jsx.ref         // ref
  };
}

function createDOMElement(virtualNode) {
  // 1. DOM 요소 생성
  const domElement = document.createElement(virtualNode.type);

  // 2. 속성 적용
  Object.keys(virtualNode.props).forEach(propName => {
    if (propName === 'children') return;
    if (propName === 'className') {
      domElement.setAttribute('class', virtualNode.props[propName]);
    } else if (propName.startsWith('on')) {
      // 이벤트 핸들러
      const eventType = propName.toLowerCase().substring(2);
      domElement.addEventListener(eventType, virtualNode.props[propName]);
    } else {
      domElement.setAttribute(propName, virtualNode.props[propName]);
    }
  });

  // 3. 자식 요소 재귀적으로 처리
  const children = virtualNode.props.children;
  if (Array.isArray(children)) {
    children.forEach(child => {
      const childDOM = createDOMElement(child);
      domElement.appendChild(childDOM);
    });
  } else if (children) {
    const childDOM = createDOMElement(children);
    domElement.appendChild(childDOM);
  }

  return domElement;
}
```

---

### 업데이트 최적화 (Update Optimization)

React는 다음과 같은 방법으로 업데이트를 최적화합니다:

#### 1️⃣ 배칭 (Batching)

```javascript
function handleClick() {
  setCount(1);    // 재렌더링 예약
  setName('A');   // 재렌더링 예약
  setAge(20);     // 재렌더링 예약

  // React가 이들을 하나로 묶어서 한 번만 렌더링!
}
```

#### 2️⃣ Diffing Algorithm

```javascript
// 이전 Virtual DOM
<div className="container">
  <p>Hello</p>
</div>

// 새로운 Virtual DOM
<div className="container">
  <p>World</p>
</div>

// React의 diffing:
// - div: 동일 (타입, className 모두 동일)
//   - p: 동일 (타입 동일)
//     - 텍스트: "Hello" → "World" (변경! 이것만 DOM 업데이트)
```

#### 3️⃣ 키(Key)를 활용한 리스트 최적화

```javascript
// ❌ 나쁨: key가 없음
function List({ items }) {
  return (
    <ul>
      {items.map(item => <li>{item.text}</li>)}
    </ul>
  );
}

// ✅ 좋음: key가 있음
function List({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.text}</li>)}
    </ul>
  );
}
```

---

### Concurrent Features (React 18)

React 18의 `createRoot`는 새로운 동시성 기능을 제공합니다:

#### Automatic Batching

```javascript
// React 17
setTimeout(() => {
  setCount(c => c + 1);  // 즉시 재렌더링
  setName(n => 'A');     // 즉시 재렌더링
  // 총 2번 렌더링
}, 0);

// React 18
setTimeout(() => {
  setCount(c => c + 1);  // 예약
  setName(n => 'A');     // 예약
  // 자동으로 배칭 → 총 1번 렌더링!
}, 0);
```

#### Transitions

```javascript
import { startTransition } from 'react';

// 긴급한 업데이트
setInputValue(input);  // 즉시 반영

// 덜 긴급한 업데이트
startTransition(() => {
  setSearchQuery(input);  // 나중에 반영 (사용자 인터랙션 방해 안 함)
});
```

#### Suspense

```javascript
<Suspense fallback={<Loading />}>
  <DataFetcher />
</Suspense>
```

---

### 전체 렌더링 사이클 요약

```
┌─────────────────────────────────────────────────────────┐
│  1. 렌더링 트리거 (Render Trigger)                     │
│     • root.render(<App />)                              │
│     • setState() 호출                                   │
│     • 부모 컴포넌트 재렌더링                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  2. 컴포넌트 렌더 (Render Phase)                       │
│     • 컴포넌트 함수 호출                                │
│     • JSX 반환                                          │
│     • Virtual DOM 트리 생성                             │
│     • (중단 가능 in Concurrent Mode)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  3. Reconciliation (재조정)                            │
│     • 이전 Virtual DOM과 비교                           │
│     • 변경된 부분 식별                                  │
│     • Diffing Algorithm 적용                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  4. 커밋 (Commit Phase)                                │
│     • 실제 DOM 업데이트                                 │
│     • useEffect 호출                                   │
│     • 브라우저 페인트                                   │
│     • (중단 불가능)                                     │
└─────────────────────────────────────────────────────────┘
```

---

### 요약

1. **`createRoot`**: React 컨테이너 생성 및 렌더링 제어 인터페이스 반환
2. **`root.render()`**: 컴포넌트를 Virtual DOM으로 변환하고 실제 DOM에 렌더링
3. **렌더링 과정**:
   - 컴포넌트 함수 호출 → JSX 반환
   - JSX → createElement 변환
   - Virtual DOM 트리 생성
   - Reconciliation (이전 상태와 비교)
   - 실제 DOM 업데이트
   - 브라우저 렌더링
4. **최적화**: 배칭, Diffing, Key 활용
5. **React 18**: Concurrent Features, Automatic Batching, Transitions, Suspense

React는 이러한 과정을 통해 선언적인 컴포넌트 코드를 실제 화면에 표시되는 DOM으로 변환합니다.

---

## 2.3 JSX vs HTML vs Vanilla JavaScript

React 개발에서 JSX, HTML, Vanilla JavaScript를 비교하고 언제 무엇을 사용해야 하는지 이해해 봅시다.

---

### 개요

| 구분 | JSX | HTML | Vanilla JavaScript |
|------|-----|------|-------------------|
| **사용 맥락** | React 컴포넌트 내부 | 정적 웹 페이지 | DOM 조작 스크립트 |
| **문법** | JavaScript + HTML 혼합 | 마크업 언어 | 프로그래밍 언어 |
| **동적 데이터** | `{variable}`로 표현 | 직접 표현 불가 | 문자열 조합 |
| **이벤트** | `onClick={handler}` | `onclick="handler()"` | `addEventListener` |
| **속성 명명** | camelCase (`className`) | kebab-case (`class-name`) | camelCase |

---

### 1. JSX vs HTML

#### 기본 문법 차이

**HTML:**
```html
<!-- index.html -->
<div class="container">
  <h1 id="title">안녕하세요</h1>
  <input type="text" placeholder="이름 입력" />
  <label for="email">이메일</label>
  <button onclick="handleClick()">클릭</button>
</div>
```

**JSX:**
```jsx
// App.jsx
<div className="container">
  <h1 id="title">안녕하세요</h1>
  <input type="text" placeholder="이름 입력" />
  <label htmlFor="email">이메일</label>
  <button onClick={handleClick}>클릭</button>
</div>
```

#### 주요 차이점

##### 1️⃣ 속성 명명 (camelCase)

| HTML 속성 | JSX 속성 | 설명 |
|-----------|----------|------|
| `class` | `className` | JavaScript 예약어 `class`와 충돌 방지 |
| `for` | `htmlFor` | JavaScript 예약어 `for`와 충돌 방지 |
| `onclick` | `onClick` | camelCase 관례 |
| `onchange` | `onChange` | camelCase 관례 |
| `tabindex` | `tabIndex` | camelCase 관례 |
| `readonly` | `readOnly` | camelCase 관례 |
| `maxlength` | `maxLength` | camelCase 관례 |

```jsx
// ❌ HTML 속성 사용 (에러)
<div class="container" onclick="handler()">
  <label for="input">라벨</label>
</div>

// ✅ JSX 속성 사용
<div className="container" onClick={handler}>
  <label htmlFor="input">라벨</label>
</div>
```

##### 2️⃣ 자체 닫는 태그

**HTML:**
```html
<!-- 닫는 태그 생략 가능 -->
<img src="image.jpg" alt="이미지">
<input type="text">
<br>
<hr>
```

**JSX:**
```jsx
{/* 반드시 닫아야 함 */}
<img src="image.jpg" alt="이미지" />
<input type="text" />
<br />
<hr />
```

##### 3️⃣ 중괄호 `{}` 표현식

**HTML:**
```html
<!-- 동적 데이터 표현 불가 -->
<div>
  <p>이름: 사용자</p>
</div>
```

**JSX:**
```jsx
// JavaScript 표현식 사용 가능
const name = "철수";
const age = 25;

<div>
  <p>이름: {name}</p>
  <p>나이: {age}세</p>
  <p>내년 나이: {age + 1}세</p>  {/* 계산 가능 */}
  <p>성인: {age >= 19 ? '예' : '아니오'}</p>  {/* 조건부 표현 */}
</div>
```

##### 4️⃣ 인라인 스타일

**HTML:**
```html
<div style="color: red; background-color: blue; font-size: 16px;">
  텍스트
</div>
```

**JSX:**
```jsx
// 객체로 전달 (camelCase)
<div style={{ color: 'red', backgroundColor: 'blue', fontSize: '16px' }}>
  텍스트
</div>

// 또는 변수로 분리
const styles = {
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '16px'
};

<div style={styles}>텍스트</div>
```

##### 5️⃣ 주석

**HTML:**
```html
<!-- HTML 주석 -->
<div>내용</div>
```

**JSX:**
```jsx
{/* JSX 주석 */}
<div>
  {/* 여러 줄 주석도 가능 */}
  내용
</div>
```

---

### 2. JSX vs Vanilla JavaScript

#### DOM 생성 방식

**Vanilla JavaScript:**
```javascript
// 명령형 (Imperative)
function createCard(user) {
  // 1. 요소 생성
  const card = document.createElement('div');
  card.className = 'card';

  // 2. 자식 요소 생성
  const avatar = document.createElement('img');
  avatar.src = user.avatar;
  avatar.alt = user.name;

  const name = document.createElement('h3');
  name.textContent = user.name;

  const email = document.createElement('p');
  email.textContent = user.email;

  // 3. 조립
  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(email);

  // 4. DOM에 추가
  document.getElementById('root').appendChild(card);

  return card;
}
```

**JSX:**
```jsx
// 선언적 (Declarative)
function Card({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

#### 이벤트 처리

**Vanilla JavaScript:**
```javascript
// 방법 1: HTML 인라인 (권장하지 않음)
<button onclick="handleClick()">클릭</button>

// 방법 2: DOM 요소에 직접 할당 (권장하지 않음)
const button = document.querySelector('button');
button.onclick = handleClick;

// 방법 3: addEventListener (권장)
button.addEventListener('click', handleClick);

// 이벤트 핸들러
function handleClick(event) {
  console.log('클릭됨!');
  console.log('이벤트 타입:', event.type);
  console.log('타겟:', event.target);
}
```

**JSX:**
```jsx
// 이벤트 핸들러 함수 직접 전달
function Button() {
  const handleClick = (event) => {
    console.log('클릭됨!');
    console.log('이벤트 타입:', event.type);
    console.log('타겟:', event.target);
  };

  return <button onClick={handleClick}>클릭</button>;
}

// 또는 인라인 화살표 함수
function Button() {
  return (
    <button onClick={(e) => {
      console.log('클릭됨!');
    }}>
      클릭
    </button>
  );
}
```

#### 조건부 렌더링

**Vanilla JavaScript:**
```javascript
// if-else로 DOM 조작
function renderUser(user) {
  const container = document.getElementById('user-container');

  if (user) {
    container.innerHTML = `
      <div class="user">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      </div>
    `;
  } else {
    container.innerHTML = '<p>사용자 없음</p>';
  }
}
```

**JSX:**
```jsx
// if-else
function UserCard({ user }) {
  if (user) {
    return (
      <div className="user">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    );
  } else {
    return <p>사용자 없음</p>;
  }
}

// 또는 삼항 연산자 (더 간결)
function UserCard({ user }) {
  return (
    user ? (
      <div className="user">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ) : (
      <p>사용자 없음</p>
    )
  );
}

// 또는 논리 연산자 (&&)
function UserCard({ user }) {
  return (
    <div>
      {user && (
        <div className="user">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
```

#### 리스트 렌더링

**Vanilla JavaScript:**
```javascript
function renderTodoList(todos) {
  const ul = document.createElement('ul');

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'completed' : '';
    ul.appendChild(li);
  });

  document.getElementById('todo-list').appendChild(ul);
}
```

**JSX:**
```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

### 3. 실제 비교 예시

#### 간단한 카드 컴포넌트

**HTML:**
```html
<div class="card">
  <img src="avatar.jpg" alt="프로필" class="avatar">
  <div class="info">
    <h3 class="name">홍길동</h3>
    <p class="email">hong@example.com</p>
    <button class="btn-follow">팔로우</button>
  </div>
</div>
```

**Vanilla JavaScript:**
```javascript
function createCard(user) {
  const card = document.createElement('div');
  card.className = 'card';

  const avatar = document.createElement('img');
  avatar.src = user.avatar;
  avatar.alt = '프로필';
  avatar.className = 'avatar';

  const info = document.createElement('div');
  info.className = 'info';

  const name = document.createElement('h3');
  name.className = 'name';
  name.textContent = user.name;

  const email = document.createElement('p');
  email.className = 'email';
  email.textContent = user.email;

  const button = document.createElement('button');
  button.className = 'btn-follow';
  button.textContent = '팔로우';
  button.addEventListener('click', () => {
    console.log(`${user.name} 팔로우`);
  });

  info.appendChild(name);
  info.appendChild(email);
  info.appendChild(button);

  card.appendChild(avatar);
  card.appendChild(info);

  return card;
}

// 사용
const root = document.getElementById('root');
const user = { name: '홍길동', email: 'hong@example.com', avatar: 'avatar.jpg' };
root.appendChild(createCard(user));
```

**JSX (React):**
```jsx
function Card({ user }) {
  const handleFollow = () => {
    console.log(`${user.name} 팔로우`);
  };

  return (
    <div className="card">
      <img src={user.avatar} alt="프로필" className="avatar" />
      <div className="info">
        <h3 className="name">{user.name}</h3>
        <p className="email">{user.email}</p>
        <button className="btn-follow" onClick={handleFollow}>
          팔로우
        </button>
      </div>
    </div>
  );
}

// 사용
const root = ReactDOM.createRoot(document.getElementById('root'));
const user = { name: '홍길동', email: 'hong@example.com', avatar: 'avatar.jpg' };
root.render(<Card user={user} />);
```

---

### 4. 언제 무엇을 사용해야 하나요?

#### 사용 가이드

```
┌─────────────────────────────────────────────────────────┐
│  HTML 사용                                             │
├─────────────────────────────────────────────────────────┤
│  ✅ 정적 콘텐츠 (블로그, 문서)                           │
│  ✅ SEO가 중요한 페이지                                 │
│  ✅ JavaScript 비활성화 환경                            │
│  ❌ 복잡한 상호작용                                     │
│  ❌ 동적 데이터                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Vanilla JavaScript 사용                                │
├─────────────────────────────────────────────────────────┤
│  ✅ 간단한 DOM 조작                                     │
│  ✅ 기존 프로젝트에 작은 기능 추가                     │
│  ✅ 번들링/트랜스파일링 없이 빠르게 구현               │
│  ❌ 대규모 애플리케이션                                 │
│  ❌ 복잡한 상태 관리                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  JSX (React) 사용                                      │
├─────────────────────────────────────────────────────────┤
│  ✅ 복잡한 UI와 상호작용                                │
│  ✅ 대규모 애플리케이션                                 │
│  ✅ 컴포넌트 재사용                                      │
│  ✅ 상태 기반 UI                                        │
│  ❌ 아주 간단한 정적 페이지 (과도할 수 있음)           │
└─────────────────────────────────────────────────────────┘
```

---

### 5. JSX와 Vanilla JavaScript 혼용

React 프로젝트에서도 Vanilla JavaScript를 사용해야 할 때가 있습니다.

#### useRef로 DOM 접근

```jsx
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Vanilla JavaScript로 DOM에 직접 접근
    inputRef.current.focus();
    inputRef.current.style.border = '2px solid blue';
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

#### 서드파티 라이브러리 통합

```jsx
import { useRef, useEffect } from 'react';

function Chart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Vanilla JavaScript로 캔버스 조작
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 차트 그리기 로직
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} />;
}
```

---

### 요약

#### HTML vs JSX

| 특징 | HTML | JSX |
|------|------|-----|
| **문맥** | 정적 웹페이지 | React 컴포넌트 |
| **속성** | `class`, `for`, `onclick` | `className`, `htmlFor`, `onClick` |
| **동적 데이터** | 불가능 | `{variable}` |
| **자체 닫기** | 선택적 | 필수 (`/>`) |
| **주석** | `<!-- -->` | `{/* */}` |

#### Vanilla JavaScript vs JSX

| 특징 | Vanilla JS | JSX |
|------|-----------|-----|
| **패러다임** | 명령형 (Imperative) | 선언적 (Declarative) |
| **코드 양** | 많음 | 적음 |
| **복잡성** | DOM 조작 직접 | 상태 중심 |
| **재사용** | 함수로 제한적 | 컴포넌트로 완전 |
| **학습 곡선** | 낮음 | 높음 (초기) |

#### 선택 기준

1. **단순 정적 페이지**: HTML만 충분
2. **간단한 인터랙션**: Vanilla JavaScript 적합
3. **복잡한 애플리케이션**: JSX (React) 권장

각각의 장단점을 이해하고 프로젝트 요구사항에 맞게 선택하는 것이 중요합니다!

---

### JSX 없이 React 사용하기

JSX는 선택 사항입니다. JSX 없이도 React를 사용할 수 있지만, 왜 JSX를 사용하는지 이해해 봅시다.

#### React.createElement: JSX의 본질

JSX는 실제로는 **`React.createElement`** 함수 호출을 편리하게 작성하는 문법적 설탕(Syntactic Sugar)입니다.

**JSX 변환 예시:**
```jsx
// 작성하는 코드 (JSX)
const element = <h1 className="greeting">안녕하세요!</h1>;

// 실제 실행되는 코드
const element = React.createElement(
  'h1',           // 태그 이름
  { className: 'greeting' },  // 속성 (props)
  '안녕하세요!'   // 자식 요소 (children)
);
```

**간단한 컴포넌트 비교:**

JSX 사용 (일반적):
```jsx
function Greeting({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}
```

JSX 없이 작성:
```javascript
function Greeting({ name }) {
  return React.createElement('h1', null, `안녕하세요, ${name}님!`);
}
```

**복잡한 컴포넌트 비교:**

JSX 사용:
```jsx
function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} className="avatar" />
      <div className="info">
        <h3 className="name">{user.name}</h3>
        <p className="email">{user.email}</p>
        <button onClick={() => alert('팔로우!')} className="btn-follow">
          팔로우
        </button>
      </div>
    </div>
  );
}
```

JSX 없이 작성:
```javascript
function UserCard({ user }) {
  return React.createElement('div', { className: 'card' },
    React.createElement('img', {
      src: user.avatar,
      alt: user.name,
      className: 'avatar'
    }),
    React.createElement('div', { className: 'info' },
      React.createElement('h3', { className: 'name' }, user.name),
      React.createElement('p', { className: 'email' }, user.email),
      React.createElement('button', {
        className: 'btn-follow',
        onClick: () => alert('팔로우!')
      }, '팔로우')
    )
  );
}
```

#### React.createElement 상세

**함수 시그니처:**
```javascript
React.createElement(
  type,      // 태그 이름 또는 컴포넌트 함수
  props,     // 속성 객체 (null 가능)
  ...children  // 자식 요소들 (가변 인자)
)
```

**매개변수 설명:**

1. **type**: 문자열(HTML 태그) 또는 함수(React 컴포넌트)
   ```javascript
   'div'                          // HTML 태그
   'span'                         // HTML 태그
   UserCard                       // 컴포넌트 함수
   ```

2. **props**: 속성 객체
   ```javascript
   { className: 'container', id: 'app' }
   null                           // 속성 없음
   ```

3. **children**: 자식 요소
   ```javascript
   '텍스트'                       // 텍스트 노드
   React.createElement('span')     // 단일 자식
   [child1, child2, child3]       // 여러 자식
   ```

#### JSX를 사용해야 하는 이유

| 장점 | 설명 |
|------|------|
| **가독성** | HTML과 유사한 구조로 코드를 쉽게 이해 |
| **생산성** | 더 적은 코드로 같은 결과 달성 |
| **안전성** | JSX 컴파일러가 문법 오류를 미리 감지 |
| **생태계** | 대부분의 React 도구와 라이브러리가 JSX를 기본 지원 |
| **개발자 경험** | HTML을 아는 개발자에게 더 친숙한 문법 |

#### JSX vs createElement 비교

| 구분 | JSX | React.createElement |
|------|-----|-------------------|
| **가독성** | 높음 (HTML 유사) | 낮음 (중첩 복잡) |
| **코드 길이** | 짧음 | 김 |
| **학습 곡선** | 낮음 | 높음 |
| **빌드 도구** | 필요 (Babel 등) | 불필요 |
| **생산성** | 높음 | 낮음 |
| **유연성** | 제한적 | 높음 |

**결론**: JSX는 선택 사항이지만, **거의 모든 React 프로젝트에서 JSX를 사용**합니다. 가독성, 생산성, 개발자 경험에서 압도적인 장점이 있기 때문입니다.

---

## 2.4 동적 컨텐츠

React에서 동적인 UI를 만드는 가장 기본적인 방법을 알아봅시다.

---

### 1️⃣ 중괄호 `{}` 로 동적 컨텐츠 추가

JSX에서 `{}` 중괄호를 사용하여 JavaScript 표현식을 렌더링할 수 있습니다.

#### 기본 사용법

**텍스트에 변수 삽입:**
```jsx
function Greeting() {
  const name = "철수";
  const age = 25;

  return (
    <div>
      <h1>안녕하세요, {name}님!</h1>
      <p>나이: {age}세</p>
      <p>내년 나이: {age + 1}세</p>  {/* 계산 가능 */}
    </div>
  );
}
```

**속성 값으로 사용:**
```jsx
function Image() {
  const imageUrl = "https://example.com/image.jpg";
  const altText = "프로필 이미지";

  return (
    <img src={imageUrl} alt={altText} className="profile-image" />
  );
}
```

**조건부 표현:**
```jsx
function Status({ user }) {
  return (
    <div>
      <p>이름: {user.name}</p>
      <p>상태: {user.isLoggedIn ? '로그인됨' : '로그인 필요'}</p>
      <p>레벨: {user.level >= 10 ? '고급' : '초급'}</p>
    </div>
  );
}
```

#### 중괄호 안에서 할 수 있는 것

| 가능한 것 | 예시 |
|-----------|------|
| **변수** | `{name}` |
| **객체 속성** | `{user.name}` |
| **배열 요소** | `{items[0]}` |
| **함수 호출** | `{getFullName()}` |
| **수식 계산** | `{a + b}` |
| **삼항 연산자** | `{condition ? 'A' : 'B'}` |
| **논리 연산자** | `{isLoggedIn && <Logout />}` |

```jsx
function Example() {
  const user = { firstName: '김', lastName: '철수' };
  const items = ['사과', '바나나', '오렌지'];
  const count = 5;

  return (
    <div>
      <p>{user.firstName}{user.lastName}</p>
      <p>첫 번째: {items[0]}</p>
      <p>개수: {count * 2}</p>
      <p>{count > 10 ? '많음' : '적음'}</p>
    </div>
  );
}
```

#### 중괄호 안에서 할 수 없는 것

```jsx
function Example() {
  // ❌ 불가능한 것들
  return (
    <div>
      {/* ❌ 객체 직접 렌더링 */}
      {/* {{ name: '철수' }} */}

      {/* ❌ if 문 직접 사용 */}
      {/* {if (condition) { return 'A' }} */}

      {/* ❌ for 루프 직접 사용 */}
      {/* {for (let i = 0; i < 10; i++) { }} */}
    </div>
  );
}

// ✅ 올바른 방법
function CorrectExample({ items, condition }) {
  // 객체는 속성으로 접근
  const user = { name: '철수' };

  // 조건부는 삼항 연산자 또는 && 사용
  const showContent = condition ? <p>내용</p> : null;

  // 리스트는 map 사용
  const listItems = items.map(item => <li key={item.id}>{item.name}</li>);

  return (
    <div>
      <p>{user.name}</p>
      {showContent}
      <ul>{listItems}</ul>
    </div>
  );
}
```

---

### 2️⃣ 이미지 렌더링

React에서 이미지를 렌더링하는 다양한 방법을 알아봅시다.

#### HTML `<img>` 태그 사용

**기본 사용:**
```jsx
function ImageExample() {
  return (
    <div>
      <h1>이미지 예시</h1>

      {/* 1. 외부 URL */}
      <img
        src="https://via.placeholder.com/300"
        alt="플레이스홀더 이미지"
        width="300"
        height="200"
      />

      {/* 2. 로컬 이미지 (import 사용) */}
      <img
        src={require('./images/logo.png')}
        alt="로고"
      />

      {/* 3. 변수에 저장된 URL */}
      <ProfileImage />
    </div>
  );
}

function ProfileImage() {
  const imageUrl = "https://example.com/profile.jpg";
  return <img src={imageUrl} alt="프로필" />;
}
```

**동적 속성:**
```jsx
function ProductCard({ product }) {
  return (
    <div className="card">
      <img
        src={product.imageUrl}
        alt={product.name}
        width={product.imageWidth}
        height={product.imageHeight}
        className={product.isFeatured ? 'featured' : 'normal'}
      />
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
    </div>
  );
}
```

#### import로 이미지 불러오기

**Create React App / Vite:**
```jsx
// 이미지 import
import myImage from './images/my-image.png';
import logo from './assets/logo.jpg';

function ImageExample() {
  return (
    <div>
      {/* import한 이미지 사용 */}
      <img src={myImage} alt="내 이미지" />
      <img src={logo} alt="로고" />

      {/* 배경 이미지로도 사용 가능 */}
      <div style={{
        backgroundImage: `url(${myImage})`,
        width: '300px',
        height: '200px',
        backgroundSize: 'cover'
      }} />
    </div>
  );
}
```

**Next.js (Image 컴포넌트 사용 권장):**
```jsx
import Image from 'next/image';
import myImage from './images/my-image.png';

function ImageExample() {
  return (
    <div>
      {/* Next.js Image 컴포넌트 - 최적화됨 */}
      <Image
        src={myImage}
        alt="최적화된 이미지"
        width={500}
        height={300}
        // placeholder="blur"  // 블러 효과
        // priority           // 우선 로딩
      />

      {/* 외부 URL 사용시 */}
      <Image
        src="https://example.com/image.jpg"
        alt="외부 이미지"
        width={500}
        height={300}
      />
    </div>
  );
}
```

#### public 폴더 사용

**Create React App:**
```jsx
// public/images/logo.png 에 이미지가 있는 경우

function Logo() {
  return (
    <img src="/images/logo.png" alt="로고" />
  );
}

// 또는 변수로
function LogoWithVariable() {
  const logoPath = process.env.PUBLIC_URL + '/images/logo.png';
  return <img src={logoPath} alt="로고" />;
}
```

**Vite:**
```jsx
// public/images/logo.png

function Logo() {
  return <img src="/images/logo.png" alt="로고" />;
}
```

**Next.js:**
```jsx
// public/images/logo.png

function Logo() {
  return <img src="/images/logo.png" alt="로고" />;
}

// 또는 Image 컴포넌트로
import Image from 'next/image';

function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="로고"
      width={200}
      height={100}
    />
  );
}
```

#### 조건부 이미지 렌더링

```jsx
function UserProfile({ user }) {
  return (
    <div className="profile">
      {user.avatar ? (
        <img src={user.avatar} alt={`${user.name}의 프로필`} />
      ) : (
        <div className="default-avatar">
          {user.name[0]}
        </div>
      )}
      <h2>{user.name}</h2>
    </div>
  );
}
```

#### 이미지 로딩 상태 처리

```jsx
import { useState } from 'react';

function ImageWithLoading({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div>
      {isLoading && <p>이미지 로딩 중...</p>}
      {hasError && <p>이미지 로딩 실패</p>}

      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}
```

#### 여러 이미지 렌더링

```jsx
function ImageGallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="gallery-item">
          <img
            src={image.url}
            alt={image.title}
            width={image.width}
            height={image.height}
          />
          <p>{image.title}</p>
        </div>
      ))}
    </div>
  );
}

// 사용
const images = [
  { id: 1, url: 'image1.jpg', title: '이미지 1', width: 300, height: 200 },
  { id: 2, url: 'image2.jpg', title: '이미지 2', width: 300, height: 200 },
  { id: 3, url: 'image3.jpg', title: '이미지 3', width: 300, height: 200 },
];

function App() {
  return <ImageGallery images={images} />;
}
```

---

### 요약

#### 동적 컨텐츠 `{}`

| 특징 | 설명 |
|------|------|
| **용도** | JavaScript 표현식을 JSX에 삽입 |
| **사용 가능** | 변수, 계산, 함수 호출, 조건부 표현 |
| **사용 불가** | if문, for루프, 객체 직접 렌더링 |
| **대안** | 삼항 연산자, map(), 논리 연산자(&&) |

#### 이미지 렌더링 방식

| 방식 | 사용 예시 | 특징 |
|------|----------|------|
| **img 태그** | `<img src="url" />` | 기본 HTML 방식 |
| **import** | `import img from './img.png'` | 번들링 시 최적화 |
| **public 폴더** | `<img src="/path/to/img" />` | 정적 리소스 |
| **Next.js Image** | `<Image src="..." />` | 자동 최적화 |

**선택 가이드:**
- **개발용/프로토타입**: public 폴더 + img 태그
- **프로덕션 (CRAP/Vite)**: import + img 태그
- **프로덕션 (Next.js)**: Image 컴포넌트 권장

---

## 2.5 컴포넌트는 언제 분리해야 하나요?

컴포넌트를 언제 어떻게 분리해야 하는지에 대한 명확한 가이드라인을 알아봅시다.

---

### 🔍 컴포넌트 분리가 필요한 신호들

다음과 같은 상황이 발생하면 컴포넌트 분리를 고려해야 합니다.

#### 1️⃣ 한 번에 파악하기 어려운 복잡한 UI

```jsx
// ❌ 분리 전: 너무 복잡함
function UserDashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="profile">
          <img src={user.avatar} alt={user.name} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <div className="stats">
            <div className="stat">
              <span>게시물</span>
              <strong>{user.postsCount}</strong>
            </div>
            <div className="stat">
              <span>팔로워</span>
              <strong>{user.followersCount}</strong>
            </div>
          </div>
        </div>
        <nav>
          <a href="/profile">프로필</a>
          <a href="/settings">설정</a>
          <a href="/messages">메시지</a>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <h1>대시보드</h1>
          <button>로그아웃</button>
        </header>
        <div className="feed">
          {user.posts.map(post => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="meta">
                <span>{post.date}</span>
                <span>{post.comments}개 댓글</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
```

```jsx
// ✅ 분리 후: 각 역할이 명확함
function UserDashboard({ user }) {
  return (
    <div className="dashboard">
      <Sidebar>
        <UserProfile user={user} />
        <Navigation />
      </Sidebar>
      <MainContent>
        <DashboardHeader />
        <Feed posts={user.posts} />
      </MainContent>
    </div>
  );
}

// 작은 컴포넌트들
function UserProfile({ user }) {
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <UserStats stats={user.stats} />
    </div>
  );
}

function UserStats({ stats }) {
  return (
    <div className="stats">
      <div className="stat">
        <span>게시물</span>
        <strong>{stats.postsCount}</strong>
      </div>
      <div className="stat">
        <span>팔로워</span>
        <strong>{stats.followersCount}</strong>
      </div>
    </div>
  );
}
```

#### 2️⃣ 여러 곳에서 재사용되는 UI

```jsx
// ❌ 분리 전: 코드 중복
function HomePage() {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => alert('저장!')}>
        저장
      </button>
      <button className="btn btn-secondary" onClick={() => alert('취소!')}>
        취소
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <button className="btn btn-primary" onClick={() => alert('적용!')}>
        적용
      </button>
      <button className="btn btn-secondary" onClick={() => alert('초기화!')}>
        초기화
      </button>
    </div>
  );
}
```

```jsx
// ✅ 분리 후: 재사용 가능한 컴포넌트
function Button({ variant, children, onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// 사용
function HomePage() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('저장!')}>저장</Button>
      <Button variant="secondary" onClick={() => alert('취소!')}>취소</Button>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <Button variant="primary" onClick={() => alert('적용!')}>적용</Button>
      <Button variant="secondary" onClick={() => alert('초기화!')}>초기화</Button>
    </div>
  );
}
```

#### 3️⃣ 독립적인 상태를 가진 부분

```jsx
// ❌ 분리 전: 상태가 섞여 있음
function FormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
        />
        약관 동의
      </label>
      <label>
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
        뉴스레터 구독
      </label>
    </form>
  );
}
```

```jsx
// ✅ 분리 후: 독립적인 상태 관리
function FormPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <TextInput value={name} onChange={setName} label="이름" />
      <TextInput value={email} onChange={setEmail} label="이메일" />
      <TextInput value={password} onChange={setPassword} label="비밀번호" type="password" />
      <PreferencesSection />
    </form>
  );
}

function TextInput({ value, onChange, label, type = 'text' }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function PreferencesSection() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div>
      <Checkbox
        checked={acceptTerms}
        onChange={setAcceptTerms}
        label="약관 동의"
      />
      <Checkbox
        checked={newsletter}
        onChange={setNewsletter}
        label="뉴스레터 구독"
      />
    </div>
  );
}
```

#### 4️⃣ 자주 변경되는 UI 부분

```jsx
// ✅ 자주 변경되는 부분을 분리하면 유지보수가 쉬움
function ProductList({ products }) {
  return (
    <div>
      <ProductsHeader /> {/* 변경될 수 있는 헤더 */}
      <ProductFilters /> {/* 변경될 수 있는 필터 */}
      <ProductGrid products={products} />
      <Pagination /> {/* 변경될 수 있는 페이지네이션 */}
    </div>
  );
}
```

---

### 🎯 컴포넌트 분리 기준 체크리스트

다음 질문 중 **하나라도 "예"**라면 컴포넌트로 분리하는 것을 고려하세요.

```
□ UI를 한 번에 파악하기 어렵나요?
□ 코드가 100줄 이상인가요?
□ 중첩된 JSX가 3단계 이상인가요?
□ 여러 곳에서 재사용할 수 있나요?
□ 독립적인 상태를 가지고 있나요?
□ 자주 수정되는 부분인가요?
□ 특정 역할에 집중하는 부분인가요?
□ 테스트를 따로 하고 싶은 부분인가요?
```

---

### 📐 컴포넌트 분리 원칙

#### 1️⃣ 단일 책임 원칙 (Single Responsibility Principle)

한 컴포넌트는 **하나의 명확한 역할**만 가져야 합니다.

```jsx
// ❌ 나쁨: 너무 많은 역할
function UserEverything({ user }) {
  return (
    <div>
      <img src={user.avatar} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <UserPosts posts={user.posts} />
      <UserComments comments={user.comments} />
      <UserFriends friends={user.friends} />
      <UserSettings settings={user.settings} />
    </div>
  );
}

// ✅ 좋음: 각각의 역할 분리
function UserProfile({ user }) {
  return (
    <div>
      <UserAvatar user={user} />
      <UserBio user={user} />
      <UserActivityFeed user={user} />
      <UserSettingsPanel settings={user.settings} />
    </div>
  );
}
```

#### 2️⃣ 재사용성 원칙

반복되는 UI 패턴은 컴포넌트로 추출하세요.

```jsx
// ✅ 재사용 가능한 컴포넌트
function Card({ children, className = '', ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

function Badge({ count, max = 99 }) {
  return (
    <span className="badge">
      {count > max ? `${max}+` : count}
    </span>
  );
}

// 사용
function NotificationItem({ notification }) {
  return (
    <Card className="notification">
      <h3>{notification.title}</h3>
      <p>{notification.message}</p>
      {notification.unread > 0 && <Badge count={notification.unread} />}
    </Card>
  );
}
```

#### 3️⃣ 컴포넌트 크기 가이드라인

| 크기 | 라인 수 | 역할 |
|------|---------|------|
| **Atomic** | 1-20줄 | 가장 작은 단위 (Button, Input) |
| **Small** | 20-50줄 | 간단한 조합 (Card, ListItem) |
| **Medium** | 50-100줄 | 복잡한 조합 (FormSection, Widget) |
| **Large** | 100-200줄 | 페이지 레벨 (Dashboard, Settings) |
| **Too Large** | 200줄+ | 분리 필요! |

> 💡 **팁**: 대부분의 컴포넌트는 **50줄 이내**로 유지하는 것이 좋습니다.

#### 4️⃣ props 인터페이스 명확성

컴포넌트의 props가 너무 많으면 분리를 고려하세요.

```jsx
// ❌ props가 너무 많음 (유지보수 어려움)
function UserCard({
  id,
  name,
  email,
  avatar,
  bio,
  postsCount,
  followersCount,
  followingCount,
  isVerified,
  isOnline,
  joinDate,
  lastActive,
  onFollow,
  onMessage,
  onBlock,
  variant,
  size,
  showStats,
  showActions
}) {
  // ...
}

// ✅ 데이터 객체로 전달
function UserCard({ user, onFollow, onMessage, onBlock, variant, size }) {
  return (
    <div className={`user-card ${variant} ${size}`}>
      <UserBasicInfo user={user} />
      {showStats && <UserStats user={user} />}
      {showActions && <UserActions user={user} onFollow={onFollow} />}
    </div>
  );
}
```

---

### 🔧 실전 분리 예시

#### 예시 1: 복잡한 폼 분리하기

**분리 전:**
```jsx
function CheckoutForm() {
  const [shipping, setShipping] = useState({});
  const [billing, setBilling] = useState({});
  const [payment, setPayment] = useState({});
  const [sameAsShipping, setSameAsShipping] = useState(true);

  return (
    <form>
      {/* 배송 정보 - 50줄 */}
      <section>
        <h2>배송 정보</h2>
        <input name="name" value={shipping.name} onChange={...} />
        <input name="address" value={shipping.address} onChange={...} />
        <input name="city" value={shipping.city} onChange={...} />
        {/* ... 더 많은 필드들 */}
      </section>

      {/* 청구 정보 - 30줄 */}
      <section>
        <h2>청구 정보</h2>
        <label>
          <input
            type="checkbox"
            checked={sameAsShipping}
            onChange={(e) => setSameAsShipping(e.target.checked)}
          />
          배송 정보와 동일
        </label>
        {!sameAsShipping && (
          <>
            <input name="name" value={billing.name} onChange={...} />
            <input name="address" value={billing.address} onChange={...} />
          </>
        )}
      </section>

      {/* 결제 정보 - 40줄 */}
      <section>
        <h2>결제 정보</h2>
        <input name="cardNumber" value={payment.cardNumber} onChange={...} />
        <input name="expiry" value={payment.expiry} onChange={...} />
        <input name="cvv" value={payment.cvv} onChange={...} />
      </section>
    </form>
  );
}
```

**분리 후:**
```jsx
function CheckoutForm() {
  const [shipping, setShipping] = useState({});
  const [billing, setBilling] = useState({});
  const [payment, setPayment] = useState({});
  const [sameAsShipping, setSameAsShipping] = useState(true);

  return (
    <form>
      <ShippingSection data={shipping} onChange={setShipping} />
      <BillingSection
        data={billing}
        onChange={setBilling}
        sameAsShipping={sameAsShipping}
        onToggleSame={() => setSameAsShipping(!sameAsShipping)}
      />
      <PaymentSection data={payment} onChange={setPayment} />
    </form>
  );
}

// 각 섹션은 독립적으로 테스트 and 재사용 가능
```

#### 예시 2: 리스트 아이템 분리하기

```jsx
// ❌ 분리 전: 중첩이 깊음
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} className={user.isOnline ? 'online' : 'offline'}>
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span className={`status ${user.isOnline ? 'online' : 'offline'}`}>
                {user.isOnline ? '온라인' : '오프라인'}
              </span>
            </div>
          </div>
          <div className="actions">
            <button onClick={() => handleFollow(user.id)}>팔로우</button>
            <button onClick={() => handleMessage(user.id)}>메시지</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ✅ 분리 후: 명확한 구조
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <UserListItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

function UserListItem({ user }) {
  return (
    <li className={`user-item ${user.isOnline ? 'online' : 'offline'}`}>
      <UserInfo user={user} />
      <UserActions user={user} />
    </li>
  );
}

function UserInfo({ user }) {
  return (
    <div className="user-info">
      <UserAvatar src={user.avatar} alt={user.name} />
      <UserDetails name={user.name} email={user.email} />
      <UserStatus isOnline={user.isOnline} />
    </div>
  );
}

function UserActions({ user }) {
  return (
    <div className="actions">
      <FollowButton userId={user.id} />
      <MessageButton userId={user.id} />
    </div>
  );
}
```

---

### ⚠️ 분리하지 말아야 할 때

다음과 같은 경우는 굳이 분리하지 않는 것이 좋습니다.

#### 1️⃣ 너무 간단한 UI

```jsx
// ❌ 과도한 분리
function Name({ children }) {
  return <span>{children}</span>;
}

function Greeting({ name }) {
  return (
    <div>
      안녕하세요, <Name>{name}</Name>님!
    </div>
  );
}

// ✅ 간단한 경우는 그대로
function Greeting({ name }) {
  return <div>안녕하세요, {name}님!</div>;
}
```

#### 2️⃣ 재사용될 가능성이 거의 없는 UI

```jsx
// ✅ 한 번만 사용되고 매우 구체적인 경우는 분리 안 해도 됨
function AdminDashboardHeader() {
  return (
    <header>
      <h1>관리자 대시보드</h1>
      <nav>
        <Link to="/admin/users">사용자</Link>
        <Link to="/admin/settings">설정</Link>
        <Link to="/admin/logs">로그</Link>
      </nav>
    </header>
  );
}
```

#### 3️⃣ 강한 결합이 있는 경우

```jsx
// 부모-자식이 너무 밀접하게 연결되어 있으면 분리하지 않는 게 나을 수 있음
function PasswordResetForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 이런 경우는 각 스텝을 분리하면 props drilling이 심해질 수 있음
  // context나 상태 관리 라이브러리 사용을 고려
}
```

---

### 📊 요약

#### 컴포넌트 분리 결정 트리

```
복잡한 UI인가?
  ↓ YES
한 번에 파악하기 어려운가?
  ↓ YES
👉 분리하세요!

재사용이 필요한가?
  ↓ YES
여러 곳에서 사용되나?
  ↓ YES
👉 분리하세요!

독립적인 상태인가?
  ↓ YES
부모와 독립적으로 관리되나?
  ↓ YES
👉 분리하세요!

자주 변경되나?
  ↓ YES
수정이 잦은 부분인가?
  ↓ YES
👉 분리하세요!
```

#### 핵심 원칙

| 원칙 | 설명 |
|------|------|
| **단일 책임** | 한 컴포넌트 = 한 역할 |
| **적절한 크기** | 대부분 50줄 이내 |
| **재사용성** | 중복되는 UI는 컴포넌트로 |
| **명확한 인터페이스** | props가 너무 많으면 분리 고려 |
| **테스트 용이성** | 독립적으로 테스트 가능해야 함 |

#### 기억할 점

> 💡 **" prematurely optimize is the root of all programming evil"**
>
> 컴포넌트 분리도 마찬가지입니다. **처음부터 완벽하게 분리하려 하지 마세요.**
>
> 1. 먼저 작동하는 코드를 작성합니다
> 2. 복잡해지면 점진적으로 리팩토링합니다
> 3. 필요할 때 분리합니다 (need-to-separate basis)
>
> **Over-abstraction**은 **under-abstraction**만큼 해롭습니다.

**경험칙**: 컴포넌트가 **복잡해지거나 재사용 필요성이 생길 때** 분리하세요. 처음부터 완벽하게 분리하려 하지 마세요!

