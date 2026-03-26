# React 교육 문서

## 📚 목차

### 5. 리스트와 조건부 컨텐츠 렌더링
- [5.1 리스트와 조건부 컨텐츠가 무엇인가요?](#51-리스트와-조건부-컨텐츠가-무엇인가요)
- [5.2 조건부 컨텐츠 렌더링](#52-조건부-컨텐츠-렌더링)
- [5.3 리스트 데이터 다루기](#53-리스트-데이터-다루기)

---

## 5. 리스트와 조건부 컨텐츠 렌더링

## 5.1 리스트와 조건부 컨텐츠가 무엇인가요?

React에서 동적인 UI를 만들 때, **조건에 따라 다른 내용을 보여주거나(조건부 렌더링)**, **여러 개의 항목을 반복해서 보여줘야(리스트 렌더링)** 할 때가 있습니다. 이 두 가지 개념은 React 컴포넌트에서 가장 자주 사용되는 패턴입니다.

---

### 조건부 컨텐츠란?

**조건부 컨텐츠(Conditional Rendering)**는 특정 조건에 따라 다른 UI를 보여주는 기법입니다.

```
사용자가 로그인했나?
  ├── YES → "환영합니다, 사용자님!" 메시지 표시
  └── NO  → "로그인이 필요합니다." 메시지 표시

장바구니에 상품이 있나?
  ├── YES → 장바구니 목록 표시
  └── NO  → "장바구니가 비었습니다." 메시지 표시
```

**실전 예시:**

```jsx
// 사용자 로그인 상태에 따라 다른 UI 표시
function Welcome({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>환영합니다, 사용자님!</h1>;
  } else {
    return <h1>로그인이 필요합니다.</h1>;
  }
}
```

---

### 리스트 컨텐츠란?

**리스트 렌더링(List Rendering)**은 배열 데이터를 순회하며 여러 개의 컴포넌트를 생성하는 기법입니다.

```
사용자 목록
  ├── 철수 → <UserCard name="철수" />
  ├── 영희 → <UserCard name="영희" />
  ├── 민수 → <UserCard name="민수" />
  └── ...
```

**실전 예시:**

```jsx
// 사용자 목록을 리스트로 렌더링
function UserList() {
  const users = ['철수', '영희', '민수', '수진'];

  return (
    <ul>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
}
```

---

### 언제 사용하나요?

#### 조건부 렌더링 사용 시나리오

| 상황 | 예시 |
|------|------|
| **인증 상태** | 로그인/로그아웃 UI 변경 |
| **권한 체크** | 관리자/일반 사용자 메뉴 표시 |
| ** 데이터 유무** | 데이터가 있을 때/없을 때 메시지 |
| **로딩 상태** | 로딩 중/완료/에러 메시지 |
| **사용자 설정** | 다크모드/라이트모드 전환 |
| **UI 상태** | 모달 열기/닫기, 메뉴 확장/축소 |

#### 리스트 렌더링 사용 시나리오

| 상황 | 예시 |
|------|------|
| **데이터 목록** | 사용자 리스트, 상품 목록 |
| **메뉴/네비게이션** | 메뉴 아이템, 브레드크럼 |
| **게시판** | 게시글 목록, 댓글 목록 |
| **이미지 갤러리** | 사진 목록, 썸네일 |
| **태그/키워드** | 태그 목록, 카테고리 |
| **타임라인** | 활동 내역, 이벤트 로그 |

---

### 함께 사용하는 예시

조건부 렌더링과 리스트 렌더링은 자주 함께 사용됩니다.

```jsx
function TodoList({ todos }) {
  // 1. 조건부: 데이터가 없는 경우
  if (todos.length === 0) {
    return <p>할 일이 없습니다!</p>;
  }

  // 2. 리스트: 데이터가 있는 경우
  return (
    <ul>
      {todos.map((todo) => (
        // 3. 조건부: 완료 상태에 따른 스타일
        <li key={todo.id} style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

### 왜 중요한가요?

#### 1. **동적 UI 구현**

정적인 HTML과 달리, React는 데이터에 따라 UI를 자동으로 변경합니다.

```jsx
// ❌ 정적 HTML (수동으로 변경해야 함)
<div>
  <p>철수</p>
  <p>영희</p>
  <p>민수</p>
</div>

// ✅ 동적 React (데이터에 따라 자동 변경)
<div>
  {users.map(user => <p key={user.id}>{user.name}</p>)}
}
```

#### 2. **코드 재사용성**

반복되는 UI를 컴포넌트로 만들어 재사용할 수 있습니다.

```jsx
// 재사용 가능한 UserCard 컴포넌트
function UserCard({ name }) {
  return <div className="card">{name}</div>;
}

// 여러 번 재사용
function UserList() {
  return (
    <div>
      {users.map(user => <UserCard key={user.id} name={user.name} />)}
    </div>
  );
}
```

#### 3. **데이터 중심 설계**

UI를 데이터로 표현할 수 있어 상태 관리가 쉬워집니다.

```jsx
// 데이터로 UI 제어
const tabs = [
  { id: 1, label: '홈', active: true },
  { id: 2, label: '프로필', active: false },
  { id: 3, label: '설정', active: false },
];

// 데이터에 따라 자동 렌더링
{tabs.map(tab => (
  <button
    key={tab.id}
    className={tab.active ? 'active' : ''}
  >
    {tab.label}
  </button>
))}
```

---

### 요약

#### 조건부 vs 리스트 렌더링

| 구분 | 조건부 렌더링 | 리스트 렌더링 |
|------|--------------|--------------|
| **목적** | 조건에 따라 다른 UI 표시 | 여러 항목을 반복 표시 |
| **데이터** | 불리언 값 (true/false) | 배열 데이터 |
| **주요 패턴** | if, &&, ?: 연산자 | map() 함수 |
| **사용 예시** | 로그인 상태, 에러 메시지 | 사용자 목록, 상품 리스트 |

#### 핵심 개념

```
조건부 렌더링:
- 조건에 따라 UI 결정
- if, &&, ?: 연산자 사용
- 불리언 값으로 제어

리스트 렌더링:
- 배열 데이터를 UI로 변환
- map() 함수로 각 항목 렌더링
- key prop으로 식별

함께 사용:
- 데이터 유무 체크 + 리스트 표시
- 필터링된 결과 표시
- 동적인 UI 구현
```

---

## 5.2 조건부 컨텐츠 렌더링

조건부 렌더링은 특정 조건에 따라 다른 컴포넌트나 요소를 렌더링하는 기법입니다. React에서 조건부 렌더링을 구현하는 다양한 방법을 알아봅시다.

---

### if 문 사용하기

가장 기본적인 조건부 렌더링 방법입니다.

#### 기본 패턴

```jsx
function Welcome({ isLoggedIn }) {
  // if 문으로 조건부 렌더링
  if (isLoggedIn) {
    return <h1>환영합니다!</h1>;
  }
  return <h1>로그인이 필요합니다.</h1>;
}
```

#### if-else 문

```jsx
function Message({ type }) {
  if (type === 'success') {
    return <div className="success">성공!</div>;
  } else if (type === 'error') {
    return <div className="error">에러!</div>;
  } else if (type === 'warning') {
    return <div className="warning">경고!</div>;
  } else {
    return <div className="info">정보</div>;
  }
}
```

#### 중첩 if 문

```jsx
function UserDashboard({ user, isLoading, isError }) {
  // 1. 로딩 상태
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 2. 에러 상태
  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  // 3. 사용자 데이터 확인
  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  // 4. 정상 렌더링
  return (
    <div>
      <h1>{user.name}님의 대시보드</h1>
      <p>이메일: {user.email}</p>
    </div>
  );
}
```

---

### 삼항 연산자 (?:)

조건부 렌더링을 간결하게 표현할 수 있습니다.

#### 기본 문법

```jsx
condition ? true : false
```

#### 간단한 조건부 렌더링

```jsx
function UserStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
```

#### 여러 줄 JSX와 함께 사용

```jsx
function UserGreeting({ user }) {
  return (
    <div>
      {user ? (
        <div>
          <h1>환영합니다, {user.name}님!</h1>
          <p>마지막 로그인: {user.lastLogin}</p>
          <button>로그아웃</button>
        </div>
      ) : (
        <div>
          <h1>로그인이 필요합니다.</h1>
          <button>로그인</button>
        </div>
      )}
    </div>
  );
}
```

#### 중첩 삼항 연산자

```jsx
function Grade({ score }) {
  return (
    <div>
      {score >= 90 ? 'A' :
       score >= 80 ? 'B' :
       score >= 70 ? 'C' :
       score >= 60 ? 'D' : 'F'}
    </div>
  );
}
```

**⚠️ 주의:** 너무 많이 중첩하면 가독성이 떨어지니, 3개 이상 중첩될 때는 if 문이나 변수 추출을 고려하세요.

---

### 논리 AND 연산자 (&&)

조건이 `true`일 때만 렌더링하고, `false`일 때는 아무것도 렌더링하지 않을 때 사용합니다.

#### 기본 패턴

```jsx
condition && <Component />
```

#### 사용 예시

```jsx
function Notification({ hasNewMessages }) {
  return (
    <div>
      <h1>알림</h1>
      {/* hasNewMessages가 true일 때만 표시 */}
      {hasNewMessages && <span>🔔 새 메시지가 있습니다!</span>}
    </div>
  );
}
```

#### 여러 조건 결합

```jsx
function AdminPanel({ user, settings }) {
  return (
    <div>
      <h1>관리자 패널</h1>

      {/* 조건 1: 관리자 여부 */}
      {user.isAdmin && <AdminMenu />}

      {/* 조건 2: 설정 가능 여부 */}
      {user.isAdmin && settings.canEdit && <EditButton />}

      {/* 조건 3: 특정 기능 활성화 */}
      {user.isAdmin && settings.betaMode && <BetaFeatures />}
    </div>
  );
}
```

#### falsy 값 처리

```jsx
function UserCount({ count }) {
  return (
    <div>
      {/* count가 0이면 "사용자 없음" 표시 */}
      <p>사용자: {count || '사용자 없음'}</p>

      {/* count가 0보다 클 때만 메시지 표시 */}
      {count > 0 && <p>{count}명의 사용자가 있습니다.</p>}
    </div>
  );
}
```

**⚠️ 주의:** `0`, `""`, `false`, `null`, `undefined`는 모두 falsy 값으로 처리됩니다.

---

### 논리 OR 연산자 (||)

기본값(fallback)을 제공할 때 사용합니다.

#### 기본 패턴

```jsx
value || fallback
```

#### 사용 예시

```jsx
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user?.name || '이름 없음'}</h1>
      <p>{user?.email || '이메일 없음'}</p>
      <p>{user?.bio || '자기소개가 없습니다.'}</p>
    </div>
  );
}
```

#### Nullish Coalescing 연산자 (??)

`null`과 `undefined`일 때만 기본값을 사용하고, `0`이나 `""`는 유효한 값으로 처리합니다.

```jsx
function ScoreDisplay({ score }) {
  return (
    <div>
      {/* || 연산자: 0도 falsy로 처리 */}
      <p>점수 (||): {score || '점수 없음'}</p>

      {/* ?? 연산자: 0은 유효한 값으로 처리 */}
      <p>점수 (??): {score ?? '점수 없음'}</p>
    </div>
  );
}

// score가 0일 때:
// || 연산자: "점수 없음" 표시
// ?? 연산자: "0" 표시
```

---

### 조건부로 속성 적용하기

조건에 따라 다른 CSS 클래스나 속성을 적용할 수 있습니다.

#### 삼항 연산자로 클래스 적용

```jsx
function Button({ isActive }) {
  return (
    <button className={isActive ? 'active' : 'inactive'}>
      {isActive ? '활성' : '비활성'}
    </button>
  );
}
```

#### 템플릿 리터럴로 여러 클래스 적용

```jsx
function Button({ isActive, isDisabled }) {
  return (
    <button className={`
      base-button
      ${isActive ? 'active' : ''}
      ${isDisabled ? 'disabled' : ''}
    `}>
      버튼
    </button>
  );
}
```

#### 객체로 스타일 적용

```jsx
function Text({ isImportant, isHidden }) {
  return (
    <p style={{
      color: isImportant ? 'red' : 'black',
      display: isHidden ? 'none' : 'block'
    }}>
      텍스트
    </p>
  );
}
```

---

### 조건부로 children 렌더링하기

컴포넌트의 children을 조건부로 렌더링할 수 있습니다.

```jsx
function Panel({ header, children }) {
  return (
    <div className="panel">
      {/* header가 있을 때만 표시 */}
      {header && <div className="panel-header">{header}</div>}

      {/* children이 있을 때만 표시 */}
      {children && <div className="panel-body">{children}</div>}
    </div>
  );
}

// 사용
function App() {
  return (
    <div>
      <Panel header="제목">
        <p>내용입니다.</p>
      </Panel>

      <Panel>
        <p>헤더 없이 내용만 표시</p>
      </Panel>
    </div>
  );
}
```

---

### early return 패턴

복잡한 조건부 로직을 간결하게 만드는 패턴입니다.

#### 기본 예시

```jsx
function UserDashboard({ user, isLoading, isError }) {
  // early return: 로딩 상태
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // early return: 에러 상태
  if (isError) {
    return <ErrorMessage />;
  }

  // early return: 사용자 없음
  if (!user) {
    return <NotFound />;
  }

  // 메인 로직: 모든 조건이 통과한 경우
  return (
    <div>
      <h1>{user.name}님의 대시보드</h1>
      <DashboardContent user={user} />
    </div>
  );
}
```

#### 권한 체크 예시

```jsx
function AdminPage({ user }) {
  // early return: 로그인 여부 체크
  if (!user) {
    return <LoginPage />;
  }

  // early return: 관리자 권한 체크
  if (!user.isAdmin) {
    return <AccessDenied />;
  }

  // 메인 로직: 관리자만 접근 가능
  return (
    <div>
      <h1>관리자 페이지</h1>
      <AdminPanel />
    </div>
  );
}
```

---

### 컴포넌트 추출로 조건부 로직 간소화

복잡한 조건부 로직을 별도 컴포넌트로 분리하여 가독성을 높입니다.

```jsx
// ❌ 좋지 않은 예시: 모든 조건부 로직이 한 컴포넌트에
function UserCard({ user }) {
  return (
    <div className="card">
      {user ? (
        user.isPremium ? (
          <div className="premium-card">
            <h1>{user.name} (프리미엄)</h1>
            <p>{user.email}</p>
            <button>프리미엄 혜택 보기</button>
          </div>
        ) : (
          <div className="normal-card">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <button>프리미엄 업그레이드</button>
          </div>
        )
      ) : (
        <div className="guest-card">
          <h1>로그인이 필요합니다</h1>
          <button>로그인</button>
        </div>
      )}
    </div>
  );
}

// ✅ 좋은 예시: 컴포넌트로 분리
function PremiumUserCard({ user }) {
  return (
    <div className="premium-card">
      <h1>{user.name} (프리미엄)</h1>
      <p>{user.email}</p>
      <button>프리미엄 혜택 보기</button>
    </div>
  );
}

function NormalUserCard({ user }) {
  return (
    <div className="normal-card">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button>프리미엄 업그레이드</button>
    </div>
  );
}

function GuestCard() {
  return (
    <div className="guest-card">
      <h1>로그인이 필요합니다</h1>
      <button>로그인</button>
    </div>
  );
}

function UserCard({ user }) {
  if (!user) return <GuestCard />;
  return user.isPremium ? <PremiumUserCard user={user} /> : <NormalUserCard user={user} />;
}
```

---

### 요약

#### 조건부 렌더링 방법 비교

| 방법 | 문법 | 사용 시나리오 | 예시 |
|------|------|--------------|------|
| **if 문** | `if (condition)` | 복잡한 로직, early return | 로딩/에러 상태 처리 |
| **삼항 연산자** | `condition ? A : B` | 두 가지 옵션 중 선택 | 로그인/로그아웃 버튼 |
| **&& 연산자** | `condition && A` | 조건이 true일 때만 렌더링 | 알림 표시, 메시지 |
| **\|\| 연산자** | `value \|\| fallback` | 기본값 제공 | 이름 없음 표시 |
| **?? 연산자** | `value ?? fallback` | null/undefined일 때만 기본값 | 0도 유효한 값으로 처리 |

#### 선택 가이드

```
조건부 렌더링 방법 선택:

1. early return이 필요한가?
   → YES: if 문 사용

2. 두 가지 옵션 중 하나를 선택?
   → YES: 삼항 연산자 (?:)

3. true일 때만 렌더링?
   → YES: && 연산자

4. 기본값이 필요한가?
   → YES: || 또는 ?? 연산자
      - 0, ""도 유효한 값? → ??
      - 그 외? → ||
```

#### 모벨 사례

1. **간단한 조건**: && 연산자 사용
2. **두 가지 선택**: 삼항 연산자 사용
3. **복잡한 로직**: if 문과 early return 사용
4. **중첩 방지**: 컴포넌트로 분리
5. **가독성**: 조건부 로직을 별도 함수/컴포넌트로 추출

---

## 5.3 리스트 데이터 다루기

리스트 렌더링은 배열 데이터를 UI로 변환하는 필수 기능입니다. React에서 리스트를 효율적으로 다루는 방법을 알아봅시다.

---

### map()으로 리스트 렌더링하기

React에서 리스트를 렌더링하는 가장 일반적인 방법은 `map()` 함수를 사용하는 것입니다.

#### 기본 문법

```jsx
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];

  return (
    <ul>
      {numbers.map((number) => (
        <li key={number}>{number}</li>
      ))}
    </ul>
  );
}
```

#### 객체 배열 렌더링

```jsx
function UserList() {
  const users = [
    { id: 1, name: '철수', email: 'cheolsu@example.com' },
    { id: 2, name: '영희', email: 'younghee@example.com' },
    { id: 3, name: '민수', email: 'minsu@example.com' },
  ];

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </li>
      ))}
    </ul>
  );
}
```

#### 복잡한 컴포넌트 렌더링

```jsx
function ProductList() {
  const products = [
    { id: 1, name: '노트북', price: 1500000, inStock: true },
    { id: 2, name: '마우스', price: 25000, inStock: false },
    { id: 3, name: '키보드', price: 80000, inStock: true },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>가격: {product.price.toLocaleString()}원</p>
          <button disabled={!product.inStock}>
            {product.inStock ? '장바구니에 담기' : '품절'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

### Key Prop의 중요성

React가 리스트의 각 항목을 식별하고 효율적으로 업데이트하기 위해 `key` prop이 필수적입니다.

#### Key가 필요한 이유

```
┌─────────────────────────────────────────────┐
│  React의 Reconciliation (비교/동기화)        │
└─────────────────────────────────────────────┘

Key가 없을 때:
  철수 영희 민수  →  영희 민수 철수
  ❌ 철수를 제거하고 영희,민수,철수를 다시 생성
  ↓ 비효율적

Key가 있을 때:
  [1:철수] [2:영희] [3:민수]  →  [2:영희] [3:민수] [1:철수]
  ✅ 위치만 변경 (DOM 재사용)
  ↓ 효율적
```

#### 좋은 Key vs 나쁜 Key

```jsx
function TodoList({ todos }) {
  // ❌ 나쁜 Key: 인덱스 사용 (순서가 바뀌면 문제)
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );

  // ❌ 나쁜 Key: 동적이거나 중복 가능한 값
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.text}>{todo.text}</li>
      ))}
    </ul>
  );

  // ✅ 좋은 Key: 고유한 ID
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

#### Key 사용 가이드

| 상황 | Key | 설명 |
|------|-----|------|
| **DB 데이터** | `item.id` | 데이터베이스 고유 ID (최상) |
| **클라이언트 생성** | `nanoid()`/`uuid` | 고유 ID 생성 라이브러리 |
| **고정된 리스트** | 인덱스 (`index`) | 순서가 절대 안 바뀔 때만 |
| **중복 없는 값** | `item.email` | 중복이 보장되는 값 |

---

### 리스트 필터링

조건에 따라 리스트를 필터링하여 렌더링합니다.

#### filter() 사용

```jsx
function ActiveTodos() {
  const todos = [
    { id: 1, text: 'React 공부', completed: false },
    { id: 2, text: '운동하기', completed: true },
    { id: 3, text: '책 읽기', completed: false },
  ];

  // 완료되지 않은 할 일만 필터링
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <ul>
      {activeTodos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

#### inline으로 필터링

```jsx
function UserList() {
  const users = [
    { id: 1, name: '철수', isActive: true },
    { id: 2, name: '영희', isActive: false },
    { id: 3, name: '민수', isActive: true },
  ];

  return (
    <ul>
      {/* 활성 사용자만 렌더링 */}
      {users
        .filter(user => user.isActive)
        .map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
    </ul>
  );
}
```

#### 다중 조건 필터링

```jsx
function ProductList() {
  const products = [
    { id: 1, name: '노트북', price: 1500000, category: '전자기기', inStock: true },
    { id: 2, name: '마우스', price: 25000, category: '전자기기', inStock: false },
    { id: 3, name: '책상', price: 200000, category: '가구', inStock: true },
  ];

  return (
    <div>
      <h2>전자기기 (50만원 이하, 재고 있음)</h2>
      <ul>
        {products
          .filter(p => p.category === '전자기기')
          .filter(p => p.price < 500000)
          .filter(p => p.inStock)
          .map(product => (
            <li key={product.id}>
              {product.name} ({product.price.toLocaleString()}원)
            </li>
          ))}
      </ul>
    </div>
  );
}
```

---

### 리스트 정렬

데이터를 정렬하여 렌더링합니다.

#### sort() 사용

```jsx
function SortedUsers() {
  const users = [
    { id: 1, name: '철수', age: 25 },
    { id: 2, name: '영희', age: 20 },
    { id: 3, name: '민수', age: 30 },
  ];

  // 나이 순으로 정렬
  const sortedUsers = [...users].sort((a, b) => a.age - b.age);

  return (
    <ul>
      {sortedUsers.map((user) => (
        <li key={user.id}>{user.name} ({user.age}세)</li>
      ))}
    </ul>
  );
}
```

#### 문자열 정렬

```jsx
function UserList() {
  const users = [
    { id: 1, name: '철수' },
    { id: 2, name: '영희' },
    { id: 3, name: '민수' },
  ];

  // 이름 순으로 정렬 (한글 사전 순)
  const sortedUsers = [...users].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko')
  );

  return (
    <ul>
      {sortedUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### 다중 기준 정렬

```jsx
function ProductList() {
  const products = [
    { id: 1, name: '노트북', price: 1500000, category: '전자기기' },
    { id: 2, name: '마우스', price: 25000, category: '전자기기' },
    { id: 3, name: '책상', price: 200000, category: '가구' },
    { id: 4, name: '의자', price: 150000, category: '가구' },
  ];

  // 카테고리 → 가격 순으로 정렬
  const sortedProducts = [...products].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category, 'ko');
    }
    return a.price - b.price;
  });

  return (
    <div>
      {sortedProducts.map((product) => (
        <div key={product.id}>
          {product.category} - {product.name} ({product.price}원)
        </div>
      ))}
    </div>
  );
}
```

---

### 리스트 검색

사용자 입력으로 리스트를 필터링합니다.

```jsx
function SearchableUserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const users = [
    { id: 1, name: '김철수', email: 'cheolsu@example.com' },
    { id: 2, name: '이영희', email: 'younghee@example.com' },
    { id: 3, name: '박민수', email: 'minsu@example.com' },
  ];

  // 검색어로 필터링
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="사용자 검색..."
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>

      {filteredUsers.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
```

---

### 리스트와 State

State로 리스트를 관리하고 업데이트합니다.

#### 항목 추가

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 공부' },
    { id: 2, text: '운동하기' },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;

    // 새 항목 추가 (불변성 유지)
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo
    }]);

    setNewTodo('');
  };

  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="새 할 일 입력"
      />
      <button onClick={addTodo}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 항목 삭제

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 공부' },
    { id: 2, text: '운동하기' },
    { id: 3, text: '책 읽기' },
  ]);

  const deleteTodo = (id) => {
    // filter로 삭제 (불변성 유지)
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}
```

#### 항목 수정

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 공부', completed: false },
    { id: 2, text: '운동하기', completed: false },
  ]);

  const toggleTodo = (id) => {
    // map으로 수정 (불변성 유지)
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

### 리스트 메서드 비교

| 메서드 | 용도 | 불변성 | 사용 예시 |
|--------|------|--------|----------|
| **map()** | 변환 | ✅ 새 배열 | `[1,2,3].map(x => x * 2)` |
| **filter()** | 필터링 | ✅ 새 배열 | `[1,2,3].filter(x => x > 1)` |
| **sort()** | 정렬 | ❌ 원본 변경 | `[...arr].sort((a,b) => a-b)` |
| **reduce()** | 축소 | ✅ 새 값 | `[1,2,3].reduce((a,b) => a+b)` |
| **find()** | 검색 | ✅ 요소 반환 | `[1,2,3].find(x => x > 1)` |
| **some()** | 존재 확인 | ✅ boolean | `[1,2,3].some(x => x > 1)` |
| **every()** | 모두 확인 | ✅ boolean | `[1,2,3].every(x => x > 0)` |

---

### 빈 리스트 처리

데이터가 없을 때의 UI를 처리합니다.

```jsx
function UserList({ users }) {
  // 1. early return
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>사용자가 없습니다.</p>
        <button>첫 번째 사용자 추가</button>
      </div>
    );
  }

  // 2. 또는 조건부 렌더링
  return (
    <div>
      {users.length === 0 ? (
        <p>사용자가 없습니다.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );

  // 3. 또는 리스트 렌더링 후 메시지
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {users.length === 0 && <p>사용자가 없습니다.</p>}
    </div>
  );
}
```

---

### 리스트와 조건부 렌더링 결합

리스트와 조건부 렌더링을 함께 사용하여 동적인 UI를 만듭니다.

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 공부', completed: false, priority: 'high' },
    { id: 2, text: '운동하기', completed: true, priority: 'medium' },
    { id: 3, text: '책 읽기', completed: false, priority: 'low' },
  ]);
  const [filter, setFilter] = useState('all');

  // 필터링 로직
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 우선순위 순으로 정렬
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div>
      {/* 필터 버튼 */}
      <div>
        <button onClick={() => setFilter('all')}>전체</button>
        <button onClick={() => setFilter('active')}>진행 중</button>
        <button onClick={() => setFilter('completed')}>완료</button>
      </div>

      {/* 빈 상태 처리 */}
      {sortedTodos.length === 0 ? (
        <p>표시할 할 일이 없습니다.</p>
      ) : (
        <ul>
          {sortedTodos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.priority === 'high' ? 'red' : 'black'
              }}>
                {todo.text}
              </span>
              <span className="priority">{todo.priority}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

### 요약

#### 리스트 렌더링 핵심 개념

```
1. map()으로 렌더링
   {items.map(item => <Component key={item.id} />)}

2. 필터링
   items.filter(item => condition)

3. 정렬
   [...items].sort((a, b) => a - b)

4. 검색
   items.filter(item => item.includes(searchTerm))

5. State 업데이트 (불변성 유지)
   추가: [...items, newItem]
   삭제: items.filter(item => item.id !== id)
   수정: items.map(item => item.id === id ? {...item, ...updates} : item)
```

#### 모벨 사례

1. **Key 사용**: 고유하고 안정적인 ID 사용
2. **불변성**: 원본 배열을 직접 수정하지 않기
3. **빈 상태 처리**: 데이터가 없을 때의 UI 제공
4. **메서드 체이닝**: filter().sort().map()으로 가독성 향상
5. **성능**: 대용량 데이터는 페이지네이션/가상화 고려

#### 주의 사항

```jsx
// ❌ 나쁜 예시
{items.map((item, index) => (
  <Component key={index} />  // 인덱스를 key로 사용
))}

{items.map(item => (
  <Component />  // key 누락
))}

// ✅ 좋은 예시
{items.map(item => (
  <Component key={item.id} />  // 고유 ID 사용
))}
```
