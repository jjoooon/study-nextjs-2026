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

---

## 5.4 React Server Components와 리스트/조건부 렌더링

React Server Components (RSC)에서는 리스트 렌더링과 조건부 렌더링이 어떻게 다르게 작동하는지 이해해야 합니다.

---

### Server Component에서의 리스트 렌더링

**핵심**: Server Component에서는 map(), filter(), sort() 등의 JavaScript 배열 메서드를 자유롭게 사용할 수 있습니다.

```jsx
// ✅ Server Component: 리스트 렌더링 가능
async function UserList() {
  const users = await fetchUsers();  // DB에서 직접 조회

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

// ✅ 복잡한 필터링도 가능
async function FilteredList({ minAge }) {
  const users = await fetchUsers();

  const adults = users.filter(user => user.age >= minAge);

  return (
    <ul>
      {adults.map(user => (
        <li key={user.id}>
          {user.name} ({user.age}세)
        </li>
      ))}
    </ul>
  );
}
```

**중요**: Server Component에서는 state와 event handlers를 사용할 수 없습니다.

```jsx
// ❌ Server Component: useState 사용 불가
function UserList() {
  const [users, setUsers] = useState([]);  // 에러!
  // ...
}

// ❌ Server Component: 이벤트 핸들러 사용 불가
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => deleteUser(user.id)}>삭제</button>  // 에러!
        </li>
      ))}
    </ul>
  );
}
```

---

### Server Component에서의 조건부 렌더링

Server Component에서도 &&, ||, ??, 삼항 연산자 등 모든 조건부 렌더링 패턴을 사용할 수 있습니다.

```jsx
// ✅ Server Component: 조건부 렌더링 가능
async function UserProfile({ userId }) {
  const user = await fetchUser(userId);

  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {user.isPremium && <span className="badge">프리미엄</span>}
    </div>
  );
}

// ✅ 다양한 조건부 렌더링 패턴
async function Dashboard() {
  const stats = await fetchStats();

  return (
    <div>
      {/* 삼항 연산자 */}
      {stats.error ? (
        <ErrorMessage message={stats.error} />
      ) : (
        <StatsData data={stats} />
      )}

      {/* && 연산자 */}
      {stats.isLoading && <LoadingSpinner />}

      {/* ?? 연산자 */}
      <p>총 방문자: {stats.visitors ?? 0}명</p>
    </div>
  );
}
```

---

### Client Component로 변환해야 하는 경우

다음 경우에는 반드시 `'use client'` 지시어를 추가해야 합니다:

1. **useState, useReducer 사용**
2. **이벤트 핸들러 (onClick, onChange 등)**
3. **useEffect, useLayoutEffect**
4. **브라우저 전용 API (localStorage, window 등)**

```jsx
'use client';

import { useState } from 'react';

function InteractiveUserList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState('all');

  // 이벤트 핸들러
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'active') return user.isActive;
    if (filter === 'inactive') return !user.isActive;
    return true;
  });

  return (
    <div>
      <button onClick={() => setFilter('all')}>전체</button>
      <button onClick={() => setFilter('active')}>활성</button>
      <button onClick={() => setFilter('inactive')}>비활성</button>

      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleDelete(user.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Server와 Client Component 결합 패턴

**권장**: 데이터 가져오기와 정렬/필터링은 Server Component, 인터랙티브 기능은 Client Component로 분리합니다.

```jsx
// ✅ Server Component: 데이터 가져오기
async function UserListPage() {
  const users = await fetchUsers();

  // 정렬은 서버에서
  const sortedUsers = [...users].sort((a, b) => b.score - a.score);

  return <InteractiveUserList users={sortedUsers} />;
}

// ✅ Client Component: 인터랙티브 기능
'use client';

function InteractiveUserList({ users }) {
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  const toggleUser = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  return (
    <ul>
      {users.map(user => (
        <li
          key={user.id}
          className={selectedUsers.has(user.id) ? 'selected' : ''}
          onClick={() => toggleUser(user.id)}
        >
          {user.name} - {user.score}점
        </li>
      ))}
    </ul>
  );
}
```

---

### RSC에서의 Key Props 주의사항

Server Component에서도 key props는 동일하게 중요합니다:

```jsx
// ✅ Server Component에서도 key는 필수
async function PostList() {
  const posts = await fetchPosts();

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

---

### RSC와 Suspense 결합

Server Component에서 Suspense를 사용하여 로딩 상태를 선언적으로 처리할 수 있습니다:

```jsx
import { Suspense } from 'react';

async function UserList() {
  const users = await fetchUsers();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserList />
    </Suspense>
  );
}
```

**중요**: Suspense는 Server Component에서 직접 사용할 수 있지만, `<Suspense>` 내부의 컴포넌트가 비동기 작업을 수행해야 의미가 있습니다.

---

### 요약: Server Component에서의 리스트/조건부 렌더링

| 기능 | Server Component | Client Component |
|------|------------------|------------------|
| **map(), filter(), sort()** | ✅ 가능 | ✅ 가능 |
| **조건부 렌더링 (&&, \|\|, ??)** | ✅ 가능 | ✅ 가능 |
| **useState, useReducer** | ❌ 불가능 | ✅ 가능 |
| **이벤트 핸들러** | ❌ 불가능 | ✅ 가능 |
| **useEffect** | ❌ 불가능 | ✅ 가능 |
| **데이터 가져오기 (async/await)** | ✅ 가능 | ⚠️ 가능하지만 권장하지 않음 |
| **Suspense** | ✅ 가능 | ✅ 가능 |

---

## 5.5 Suspense와 로딩 상태

React 18+의 Suspense를 사용하여 리스트와 조건부 렌더링에서의 로딩 상태를 선언적으로 처리할 수 있습니다.

---

### 기본 Suspense 사용법

Suspense는 데이터가 로딩되는 동안 fallback UI를 보여줍니다:

```jsx
import { Suspense } from 'react';

function UserList({ users }) {
  if (users === null) {
    throw fetchUsers();  // Promise를 throw하면 Suspense가 감지
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserList users={null} />
    </Suspense>
  );
}
```

---

### React 19의 use() 훅

React 19에서는 `use()` 훅을 사용하여 Promise를 더 간단하게 처리할 수 있습니다:

```jsx
import { Suspense, use } from 'react';

function UserList({ usersPromise }) {
  const users = use(usersPromise);  // Promise가 resolve될 때까지 기다림

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const usersPromise = fetchUsers();

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserList usersPromise={usersPromise} />
    </Suspense>
  );
}
```

---

### 리스트에서의 Suspense 활용

대용량 리스트를 페이지별로 로딩할 때 Suspense를 활용할 수 있습니다:

```jsx
import { Suspense, use } from 'react';

function UserPage({ page }) {
  const users = use(fetchUsers(page));

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function PaginatedUserList() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        이전
      </button>
      <span>페이지 {page}</span>
      <button onClick={() => setPage(p => p + 1)}>
        다음
      </button>

      <Suspense fallback={<div>페이지 {page} 로딩 중...</div>}>
        <UserPage page={page} />
      </Suspense>
    </div>
  );
}
```

---

### 조건부 렌더링과 Suspense

조건부로 다른 데이터를 로딩할 때도 Suspense를 활용할 수 있습니다:

```jsx
import { Suspense, use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {user.hasPosts && (
        <Suspense fallback={<div>게시글 로딩 중...</div>}>
          <UserPosts userId={userId} />
        </Suspense>
      )}
    </div>
  );
}

function UserPosts({ userId }) {
  const posts = use(fetchUserPosts(userId));

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

### 여러 Suspense 경계

독립적인 로딩 상태를 위해 여러 Suspense 경계를 사용할 수 있습니다:

```jsx
function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>

      <section>
        <h2>사용자</h2>
        <Suspense fallback={<UserListSkeleton />}>
          <UserList />
        </Suspense>
      </section>

      <section>
        <h2>최근 게시글</h2>
        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </section>

      <section>
        <h2>통계</h2>
        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>
      </section>
    </div>
  );
}
```

---

### Skeleton UI 패턴

로딩 중에 실제 콘텐츠와 유사한 Skeleton을 보여주면 사용자 경험이 개선됩니다:

```jsx
function UserListSkeleton() {
  return (
    <ul>
      {[1, 2, 3, 4, 5].map(i => (
        <li key={i} className="skeleton">
          <div className="skeleton-avatar" />
          <div className="skeleton-text" />
          <div className="skeleton-text short" />
        </li>
      ))}
    </ul>
  );
}

function UserPage() {
  return (
    <div>
      <h1>사용자 목록</h1>
      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  );
}
```

---

### Error Boundary와 결합

Suspense는 Error Boundary와 함께 사용하여 로딩과 에러 상태를 모두 처리할 수 있습니다:

```jsx
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function UserList() {
  const users = use(fetchUsers());

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function UserListError({ error, reset }) {
  return (
    <div>
      <p>에러 발생: {error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}

function UserPage() {
  return (
    <ErrorBoundary FallbackComponent={UserListError}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

### 요약: Suspense 활용

| 패턴 | 설명 | 사용 시나리오 |
|------|------|--------------|
| **단일 Suspense** | 전체 페이지 로딩 | 단순 페이지 로딩 |
| **다중 Suspense** | 독립적인 로딩 상태 | 여러 섹션 독립 로딩 |
| **Skeleton UI** | 콘텐츠 모방 로딩 | 사용자 경험 개선 |
| **Error Boundary** | 에러 처리 | 로딩 실패 대응 |
| **use() 훅** | Promise 대기 | React 19+ 비동기 데이터 |

---

## 5.6 리스트 성능 최적화

대용량 리스트를 렌더링할 때 성능을 최적화하는 방법을 알아봅니다.

---

### Key Props 최적화

**핵심**: Key는 항상 고유하고 안정적인 값을 사용해야 합니다.

```jsx
// ❌ 나쁜 예시: 인덱스를 key로 사용
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// ❌ 나쁜 예시: 중복 가능성이 있는 값
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.email}>  {/* email이 중복될 수 있음 */}
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ 좋은 예시: 고유한 ID 사용
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ ID가 없는 경우: 고유한 키 생성
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={`${user.name}-${index}`}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

**주의**: 정적 리스트(순서가 바뀌지 않는 리스트)에서는 인덱스를 key로 사용해도 괜찮습니다:

```jsx
// ✅ 정적 리스트에서는 인덱스 사용 가능
function WeekDays() {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <ul>
      {days.map((day, index) => (
        <li key={index}>{day}</li>
      ))}
    </ul>
  );
}
```

---

### React.memo로 리스트 아이템 최적화

같은 props로 다시 렌더링되는 것을 방지하기 위해 `React.memo`를 사용합니다:

```jsx
import { memo } from 'react';

// ✅ memo로 최적화
const UserItem = memo(function UserItem({ user, onDelete }) {
  console.log('UserItem 렌더링:', user.id);
  return (
    <li>
      {user.name}
      <button onClick={() => onDelete(user.id)}>삭제</button>
    </li>
  );
});

function UserList() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
  ]);

  // onDelete 함수가 매번 새로 생성되면 memo가 효과가 없음
  const handleDelete = useCallback((id) => {
    setUsers(users.filter(user => user.id !== id));
  }, [users]);

  return (
    <ul>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

**주의**: 함수 props는 `useCallback`으로 감싸야 `memo`가 효과가 있습니다.

---

### useMemo로 필터링/정렬 최적화

비싼 필터링이나 정렬 연산을 `useMemo`로 캐싱합니다:

```jsx
import { useMemo, useState } from 'react';

function UserList({ users }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // ✅ 필터링과 정렬을 useMemo로 최적화
  const filteredAndSortedUsers = useMemo(() => {
    let result = users;

    // 필터링
    if (filter === 'active') {
      result = result.filter(user => user.isActive);
    } else if (filter === 'inactive') {
      result = result.filter(user => !user.isActive);
    }

    // 정렬
    result = [...result].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'age') {
        return a.age - b.age;
      }
      return 0;
    });

    return result;
  }, [users, filter, sortBy]);

  return (
    <div>
      <button onClick={() => setFilter('all')}>전체</button>
      <button onClick={() => setFilter('active')}>활성</button>
      <button onClick={() => setSortBy('name')}>이름 정렬</button>
      <button onClick={() => setSortBy('age')}>나이 정렬</button>

      <ul>
        {filteredAndSortedUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.age}세
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### useCallback으로 핸들러 최적화

리스트 아이템에 전달하는 핸들러 함수를 `useCallback`으로 최적화합니다:

```jsx
import { useCallback, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
  ]);

  // ✅ useCallback으로 함수 최적화
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    );
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
});
```

---

### map() 내부의 inline 함수 피하기

map() 내부에서 inline 함수를 만들면 매번 새로운 함수가 생성되어 성능 문제가 발생할 수 있습니다:

```jsx
// ❌ 나쁜 예시: map() 내부의 inline 함수
function TodoList() {
  const [todos, setTodos] = useState([...]);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => setTodos(prev =>  // 매번 새 함수 생성
            prev.map(t =>
              t.id === todo.id
                ? { ...t, completed: !t.completed }
                : t
            )
          )}
          onDelete={() => setTodos(prev =>  // 매번 새 함수 생성
            prev.filter(t => t.id !== todo.id)
          )}
        />
      ))}
    </ul>
  );
}

// ✅ 좋은 예시: useCallback로 핸들러 생성
function TodoList() {
  const [todos, setTodos] = useState([...]);

  const handleToggle = useCallback((id) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

---

### 불필요한 재렌더링 방지

`React.memo`와 함수형 업데이트를 결합하여 불필요한 재렌더링을 방지합니다:

```jsx
import { memo, useCallback, useState } from 'react';

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem 렌더링:', todo.id);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
  ]);

  // 함수형 업데이트로 의존성 제거
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);  // 빈 의존성 배열

  const handleDelete = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    );
  }, []);  // 빈 의존성 배열

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

---

### 요약: 리스트 성능 최적화

| 기법 | 사용 목적 | 주의 사항 |
|------|----------|----------|
| **Key Props** | 리conciliation 최적화 | 고유하고 안정적인 ID 사용 |
| **React.memo** | 불필요한 재렌더링 방지 | 함수 props는 useCallback과 함께 |
| **useMemo** | 비싼 연산 캐싱 | 필터링, 정렬 등에 사용 |
| **useCallback** | 함수 참조 안정화 | map() 내부 inline 함수 피하기 |
| **함수형 업데이트** | 의존성 제거 | 최신 state 기반 업데이트 |

---

## 5.7 대용량 리스트와 가상화

1000개 이상의 아이템을 렌더링할 때는 가상화(Virtualization) 기술을 사용해야 합니다.

---

### 왜 가상화가 필요한가요?

대용량 리스트를 모두 렌더링하면 다음 문제가 발생합니다:

1. **DOM 노드 과다**: 수천 개의 DOM 노드 생성
2. **메모리 사용**: 각 아이템의 메모리 소비
3. **렌더링 성능**: 스크롤 시 느려짐
4. **사용자 경험**: 페이지가 느리게 느껴짐

```jsx
// ❌ 문제: 10,000개 아이템 전부 렌더링
function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---

### react-window로 가상화 구현

`react-window`는 화면에 보이는 아이템만 렌더링합니다:

```bash
npm install react-window
```

**기본 사용법**:

```jsx
import { FixedSizeList } from 'react-window';

function Row({ index, style }) {
  return (
    <div style={style}>
      Item {index}
    </div>
  );
}

function VirtualList() {
  const items = Array.from({ length: 10000 }, (_, i) => i);

  return (
    <FixedSizeList
      height={600}           // 뷰포트 높이
      itemCount={items.length}  // 전체 아이템 수
      itemSize={50}          // 각 아이템 높이
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**동적인 높이**:

```jsx
import { VariableSizeList } from 'react-window';

function getItemSize(index) {
  // 인덱스에 따라 다른 높이 반환
  if (index % 3 === 0) return 100;
  return 50;
}

function VariableList() {
  const items = Array.from({ length: 1000 }, (_, i) => i);

  return (
    <VariableSizeList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
}
```

---

### react-virtualized 사용

`react-virtualized`는 더 많은 기능을 제공합니다:

```bash
npm install react-virtualized
```

```jsx
import { List } from 'react-virtualized';

function VirtualList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      {items[index].name}
    </div>
  );

  return (
    <List
      width="100%"
      height={600}
      rowCount={items.length}
      rowHeight={50}
      rowRenderer={rowRenderer}
    />
  );
}
```

---

### Infinite Scroll 구현

가상화와 무한 스크롤을 결합하여 대용량 데이터를 처리합니다:

```jsx
import { useState, useCallback, useRef } from 'react';
import { FixedSizeList } from 'react-window';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    const newItems = await fetchMoreItems(items.length);
    setItems(prev => [...prev, ...newItems]);
    setIsLoading(false);
  }, [items.length, isLoading]);

  const handleScroll = useCallback(({ scrollOffset, scrollDirection }) => {
    if (scrollDirection === 'forward' && !isLoading) {
      const list = listRef.current;
      if (list) {
        const { scrollHeight, clientHeight } = list._outerRef;
        if (scrollOffset + clientHeight >= scrollHeight - 200) {
          loadMore();
        }
      }
    }
  }, [isLoading, loadMore]);

  const Row = useCallback(({ index, style }) => (
    <div style={style}>
      {items[index] ? items[index].name : 'Loading...'}
    </div>
  ), [items]);

  return (
    <FixedSizeList
      ref={listRef}
      height={600}
      itemCount={items.length + 1}
      itemSize={50}
      width="100%"
      onScroll={handleScroll}
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

### 가상화와 상태 관리

가상화된 리스트에서 상태를 관리할 때는 주의가 필요합니다:

```jsx
import { useState, useCallback, useRef } from 'react';
import { FixedSizeList } from 'react-window';

function VirtualTodoList() {
  const [todos, setTodos] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: `Task ${i}`,
      completed: false,
    }))
  );

  // 토글 핸들러 최적화
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  // 삭제 핸들러 최적화
  const handleDelete = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Row 컴포넌트 메모이제이션
  const Row = useCallback(({ index, style }) => {
    const todo = todos[index];

    if (!todo) return null;

    return (
      <div style={style}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
        />
        <span
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}
        >
          {todo.text}
        </span>
        <button onClick={() => handleDelete(todo.id)}>삭제</button>
      </div>
    );
  }, [todos, handleToggle, handleDelete]);

  return (
    <FixedSizeList
      height={600}
      itemCount={todos.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

### 가상화와 검색/필터링

가상화된 리스트에서 검색과 필터링을 결합할 수 있습니다:

```jsx
import { useState, useMemo, useCallback } from 'react';
import { FixedSizeList } from 'react-window';

function SearchableVirtualList() {
  const [items] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C',
    }))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 필터링 최적화
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' ||
        item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, categoryFilter]);

  const Row = useCallback(({ index, style }) => {
    const item = filteredItems[index];

    return (
      <div style={style}>
        <strong>{item.name}</strong>
        <span> ({item.category})</span>
      </div>
    );
  }, [filteredItems]);

  return (
    <div>
      <input
        type="text"
        placeholder="검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="all">전체</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <FixedSizeList
        height={600}
        itemCount={filteredItems.length}
        itemSize={50}
        width="100%"
      >
        {Row}
      </FixedSizeList>

      <p>총 {filteredItems.length}개 항목</p>
    </div>
  );
}
```

---

### 요약: 가상화

| 기술 | 라이브러리 | 사용 시나리오 |
|------|----------|--------------|
| **react-window** | react-window | 가볍고 빠른 가상화 |
| **react-virtualized** | react-virtualized | 다양한 컴포넌트 (Grid, List 등) |
| **Infinite Scroll** | react-window + 커스텀 | 무한 스크롤 |
| **검색/필터링** | useMemo + 가상화 | 필터링된 대용량 리스트 |

**권장**: 새로운 프로젝트에서는 `react-window`를 사용합니다.

---

## 5.8 리스트와 조건부 렌더링 Anti-patterns

흔히 발생하는 문제点和 해결 방안을 정리합니다.

---

### Anti-pattern 1: Key로 인덱스 사용

**문제**: 배열 순서가 바뀌면 리conciliation이 제대로 작동하지 않습니다.

```jsx
// ❌ 나쁜 예시
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ 좋은 예시
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

**해결**: 항상 고유하고 안정적인 ID를 key로 사용합니다.

---

### Anti-pattern 2: Map 내에서 Inline 함수 생성

**문제**: 매번 새 함수가 생성되어 성능 저하가 발생합니다.

```jsx
// ❌ 나쁜 예시
function TodoList() {
  const [todos, setTodos] = useState([...]);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => setTodos(prev =>
            prev.filter(t => t.id !== todo.id)
          )}
        />
      ))}
    </ul>
  );
}

// ✅ 좋은 예시
function TodoList() {
  const [todos, setTodos] = useState([...]);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

**해결**: `useCallback`으로 핸들러를 메모이제이션합니다.

---

### Anti-pattern 3: 중첩된 삼항 연산자

**문제**: 가독성이 떨어지고 유지보수가 어렵습니다.

```jsx
// ❌ 나쁜 예시
function UserCard({ user }) {
  return (
    <div>
      {user ? (
        user.isPremium ? (
          user.isActive ? (
            <PremiumActiveCard user={user} />
          ) : (
            <PremiumInactiveCard user={user} />
          )
        ) : (
          <NormalCard user={user} />
        )
      ) : (
        <GuestCard />
      )}
    </div>
  );
}

// ✅ 좋은 예시: 컴포넌트로 분리
function UserCard({ user }) {
  if (!user) return <GuestCard />;
  if (user.isPremium) {
    return user.isActive
      ? <PremiumActiveCard user={user} />
      : <PremiumInactiveCard user={user} />;
  }
  return <NormalCard user={user} />;
}
```

**해결**: 복잡한 조건부 로직을 컴포넌트로 분리하거나 early return을 사용합니다.

---

### Anti-pattern 4: 불필요한 재렌더링

**문제**: 부모가 렌더링될 때 모든 자식도 다시 렌더링됩니다.

```jsx
// ❌ 나쁜 예시
function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem 렌더링');
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

// ✅ 좋은 예시
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log('TodoItem 렌더링:', todo.id);
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
});
```

**해결**: `React.memo`로 컴포넌트를 메모이제이션합니다.

---

### Anti-pattern 5: useEffect로 Derived State 계산

**문제**: 불필요한 재렌더링과 복잡한 dependency 추적이 필요합니다.

```jsx
// ❌ 나쁜 예시
function UserList({ users }) {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter(user => user.isActive));
  }, [users]);

  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ✅ 좋은 예시
function UserList({ users }) {
  // useMemo로 derived state 계산
  const activeUsers = useMemo(() => {
    return users.filter(user => user.isActive);
  }, [users]);

  return (
    <ul>
      {activeUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**해결**: `useMemo`로 derived state를 계산합니다.

---

### Anti-pattern 6: && 연산자와 숫자 0

**문제**: 0이 falsy라서 렌더링되지 않습니다.

```jsx
// ❌ 나쁜 예시
function NotificationBadge({ count }) {
  return (
    <div>
      {count && <span className="badge">{count}</span>}
    </div>
  );
}

// count가 0이면 아무것도 렌더링되지 않음!

// ✅ 좋은 예시 1: 명시적 조건
function NotificationBadge({ count }) {
  return (
    <div>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

// ✅ 좋은 예시 2: 삼항 연산자
function NotificationBadge({ count }) {
  return (
    <div>
      {count ? <span className="badge">{count}</span> : null}
    </div>
  );
}

// ✅ 좋은 예시 3: 조건부로 숨기기
function NotificationBadge({ count }) {
  return (
    <div>
      <span className="badge" style={{ display: count ? 'block' : 'none' }}>
        {count}
      </span>
    </div>
  );
}
```

**해결**: 명시적 조건을 사용하거나 삼항 연산자를 사용합니다.

---

### Anti-pattern 7: 조건부 스타일 인라인 객체 생성

**문제**: 매번 새 객체가 생성되어 성능 저하가 발생합니다.

```jsx
// ❌ 나쁜 예시
function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? 'gray' : 'black',
        opacity: todo.completed ? 0.7 : 1,
      }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
}

// ✅ 좋은 예시: useMemo로 스타일 최적화
function TodoItem({ todo, onToggle }) {
  const textStyle = useMemo(() => ({
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? 'gray' : 'black',
    opacity: todo.completed ? 0.7 : 1,
  }), [todo.completed]);

  return (
    <li style={textStyle} onClick={() => onToggle(todo.id)}>
      {todo.text}
    </li>
  );
}

// ✅ 더 좋은 예시: CSS 클래스
function TodoItem({ todo, onToggle }) {
  return (
    <li
      className={todo.completed ? 'completed' : 'active'}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
}
```

**해결**: 스타일을 메모이제이션하거나 CSS 클래스를 사용합니다.

---

### Anti-pattern 8: 대용량 리스트 미가상화

**문제**: 1000개 이상의 아이템을 렌더링하면 성능이 저하됩니다.

```jsx
// ❌ 나쁜 예시
function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ 좋은 예시: react-window로 가상화
import { FixedSizeList } from 'react-window';

function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));

  const Row = ({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

**해결**: `react-window`나 `react-virtualized`로 가상화를 구현합니다.

---

### Anti-pattern 9: useState로 복잡한 State 관리

**문제**: 여러 useState로 state를 분산하면 관리가 어렵습니다.

```jsx
// ❌ 나쁜 예시
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());

  // state 업데이트 로직이 복잡해짐
  // ...
}

// ✅ 좋은 예시: useReducer로 복잡한 state 관리
function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_SELECTION':
      const newSelected = new Set(state.selectedIds);
      if (newSelected.has(action.payload)) {
        newSelected.delete(action.payload);
      } else {
        newSelected.add(action.payload);
      }
      return { ...state, selectedIds: newSelected };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    sortBy: 'date',
    searchQuery: '',
    selectedIds: new Set(),
  });

  // 명확한 action dispatch
  dispatch({ type: 'SET_FILTER', payload: 'active' });
  dispatch({ type: 'TOGGLE_SELECTION', payload: todoId });
}
```

**해결**: `useReducer`로 복잡한 state를 관리합니다.

---

### Anti-pattern 10: Server Component에서 useState 사용

**문제**: Server Component에서는 useState를 사용할 수 없습니다.

```jsx
// ❌ 나쁜 예시: Server Component에서 state 사용
async function UserList() {
  const [users, setUsers] = useState([]);  // 에러!
  const [filter, setFilter] = useState('all');  // 에러!

  const filteredUsers = users.filter(user => {
    if (filter === 'active') return user.isActive;
    return true;
  });

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ✅ 좋은 예시: Server Component와 Client Component 분리
async function UserListPage() {
  const users = await fetchUsers();

  return <UserListClient initialUsers={users} />;
}

'use client';

function UserListClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState('all');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (filter === 'active') return user.isActive;
      return true;
    });
  }, [users, filter]);

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**해결**: Server Component는 데이터 가져오기만 담당하고, 인터랙티브 기능은 Client Component로 분리합니다.

---

## 5.9 요약

### 리스트 렌더링 핵심 개념

```javascript
1. map()으로 렌더링
   {items.map(item => <Component key={item.id} />)}

2. Key 사용: 고유하고 안정적인 ID
   <li key={item.id}>{item.name}</li>

3. 필터링: filter()
   items.filter(item => item.isActive)

4. 정렬: sort() (불변성 유지)
   [...items].sort((a, b) => a.score - b.score)

5. State 업데이트 (불변성 유지)
   추가: [...items, newItem]
   삭제: items.filter(item => item.id !== id)
   수정: items.map(item => item.id === id ? {...item, ...updates} : item)
```

### 조건부 렌더링 선택 가이드

```
1. early return이 필요한가?
   → YES: if 문 사용

2. 두 가지 옵션 중 하나를 선택?
   → YES: 삼항 연산자 (?:)

3. true일 때만 렌더링?
   → YES: && 연산자

4. 기본값이 필요한가?
   → YES: ?? 또는 || 연산자
```

### 성능 최적화 체크리스트

| 항목 | 최적화 기법 | 적용 시점 |
|------|------------|----------|
| **Key Props** | 고유 ID 사용 | 항상 |
| **React.memo** | 불필요한 재렌더링 방지 | 100+ 아이템 |
| **useMemo** | 필터링/정렬 캐싱 | 복잡한 연산 |
| **useCallback** | 핸들러 메모이제이션 | map() 내부 함수 |
| **가상화** | react-window | 1000+ 아이템 |
| **함수형 업데이트** | 의존성 최적화 | 이전 state 기반 |

### Server vs Client Component

| 기능 | Server Component | Client Component |
|------|------------------|------------------|
| **데이터 가져오기** | ✅ 권장 | ⚠️ 가능하지만 서버 권장 |
| **map(), filter()** | ✅ 가능 | ✅ 가능 |
| **조건부 렌더링** | ✅ 가능 | ✅ 가능 |
| **useState** | ❌ 불가능 | ✅ 가능 |
| **이벤트 핸들러** | ❌ 불가능 | ✅ 가능 |
| **브라우저 API** | ❌ 불가능 | ✅ 가능 |

### React 18+ 기능

| 기능 | 사용 목적 | 예시 |
|------|----------|------|
| **Suspense** | 로딩 상태 | `<Suspense fallback={...}>` |
| **use()** | Promise 대기 (React 19) | `const data = use(promise)` |
| **Error Boundary** | 에러 처리 | `<ErrorBoundary>` |
| **useTransition** | 긴급 업데이트 분리 | `startTransition(() => ...)` |

### Anti-patterns 방지

```
❌ 인덱스를 key로 사용 (정적 리스트 제외)
✅ 고유한 ID를 key로 사용

❌ map() 내부의 inline 함수
✅ useCallback으로 핸들러 메모이제이션

❌ useEffect로 derived state 계산
✅ useMemo로 derived state 계산

❌ 1000+ 아이템 전부 렌더링
✅ react-window로 가상화

❌ 중첩된 삼항 연산자
✅ 컴포넌트 분리 또는 early return

❌ && 연산자와 숫자 0
✅ 명시적 조건 (count > 0)
```

### 권장 학습 순서

1. **기본**: map(), key, 필터링, 정렬
2. **조건부 렌더링**: &&, ||, ??, 삼항 연산자, if 문
3. **성능**: React.memo, useMemo, useCallback
4. **가상화**: react-window (대용량 리스트)
5. **Server Components**: 데이터 가져오기 vs 인터랙티브 기능 분리
6. **고급 기능**: Suspense, useTransition, Error Boundary

### 추가 학습 자료

- **react-window**: https://github.com/bvaughn/react-window
- **react-virtualized**: https://github.com/bvaughn/react-virtualized
- **React Server Components**: https://react.dev/reference/react/use
- **Suspense**: https://react.dev/reference/react/Suspense
