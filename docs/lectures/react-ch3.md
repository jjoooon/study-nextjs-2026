# React 교육 문서

## 📚 목차

### 3. 컴포넌트와 Props
- [3.1 Props가 필요한 이유](#31-props가-필요한-이유)
- [3.2 Props 사용 방법](#32-props-사용-방법)
- [3.3 컴포넌트, Props, 그리고 재사용성](#33-컴포넌트-props-그리고-재사용성)

---

## 3. 컴포넌트와 Props

## 3.1 Props가 필요한 이유

**Props(Properties)**는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 React의 핵심 메커니즘입니다. 왜 Props가 필요한지 알아봅시다.

---

### Props 없이 개발할 때의 문제점

#### 문제 1️⃣: 데이터 중복

```jsx
// ❌ Props 없이 - 데이터 중복 발생
function WelcomeBanner() {
  const userName = "철수";  // 하드코딩된 데이터
  return <h1>안녕하세요, {userName}님!</h1>;
}

function UserProfile() {
  const userName = "철수";  // 동일한 데이터를 또 정의
  return (
    <div>
      <h2>사용자: {userName}</h2>
      <p>환영합니다!</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <WelcomeBanner />
      <UserProfile />
      {/* userName이 "영희"로 변경되면 두 곳 모두 수정해야 함 */}
    </div>
  );
}
```

```jsx
// ✅ Props 사용 - 데이터 중복 해결
function WelcomeBanner({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}

function UserProfile({ name }) {
  return (
    <div>
      <h2>사용자: {name}</h2>
      <p>환영합니다!</p>
    </div>
  );
}

function App() {
  const userName = "철수";
  return (
    <div>
      <WelcomeBanner name={userName} />
      <UserProfile name={userName} />
      {/* userName만 변경하면 모든 곳에 자동 반영 */}
    </div>
  );
}
```

#### 문제 2️⃣: 컴포넌트 재사용 불가

```jsx
// ❌ Props 없이 - 재사용 불가능
function ProductCard() {
  return (
    <div className="card">
      <img src="laptop.jpg" alt="노트북" />
      <h3>맥북 프로 16인치</h3>
      <p>3,500,000원</p>
      <button>장바구니에 담기</button>
    </div>
  );
}

function ProductPage() {
  return (
    <div>
      <ProductCard />  {/* 항상 같은 제품만 표시 */}
      <ProductCard />  {/* 다른 제품을 표시할 수 없음 */}
      <ProductCard />
    </div>
  );
}
```

```jsx
// ✅ Props 사용 - 재사용 가능
function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <button>장바구니에 담기</button>
    </div>
  );
}

function ProductPage() {
  const products = [
    { id: 1, name: '맥북 프로', price: 3500000, image: 'laptop.jpg' },
    { id: 2, name: '아이패드 프로', price: 1200000, image: 'tablet.jpg' },
    { id: 3, name: '아이폰 15', price: 1500000, image: 'phone.jpg' },
  ];

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### 문제 3️⃣: 유지보수 어려움

```jsx
// ❌ Props 없이 - 변경 시 여러 곳 수정 필요
function Button() {
  return (
    <button className="btn btn-primary">
      제출하기
    </button>
  );
}

function CancelButton() {
  return (
    <button className="btn btn-secondary">
      취소하기
    </button>
  );
}

function DeleteButton() {
  return (
    <button className="btn btn-danger">
      삭제하기
    </button>
  );
}

// 버튼 스타일이 변경되면 3개 컴포넌트 모두 수정해야 함
```

```jsx
// ✅ Props 사용 - 중앙 집중식 관리
function Button({ variant, children, onClick }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  return (
    <div>
      <Button variant="primary" onClick={handleSubmit}>제출하기</Button>
      <Button variant="secondary" onClick={handleCancel}>취소하기</Button>
      <Button variant="danger" onClick={handleDelete}> 삭제하기</Button>
    </div>
  );
}

// 스타일 변경은 Button 컴포넌트 하나만 수정하면 됨
```

---

### Props의 핵심 역할

#### 1️⃣ 데이터 전달 (Data Flow)

```
┌─────────────┐
│   부모      │
│  Component  │
│             │
│  name="철수" │ ← 데이터 소스
└──────┬──────┘
       │ props
       ▼
┌─────────────┐
│   자식      │
│  Component  │
│             │
│  {name}     │ ← 데이터 사용
└─────────────┘
```

```jsx
function Parent() {
  const userData = {
    name: '철수',
    age: 25,
    email: 'cheolsu@example.com'
  };

  return <Child user={userData} />;
}

function Child({ user }) {
  return (
    <div>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}
```

#### 2️⃣ 컴포넌트 커스터마이징 (Customization)

Props로 컴포넌트의 동작과 모양을 제어할 수 있습니다.

```jsx
function Alert({ type, message, onClose }) {
  const styles = {
    success: { backgroundColor: 'green', color: 'white' },
    error: { backgroundColor: 'red', color: 'white' },
    warning: { backgroundColor: 'yellow', color: 'black' },
  };

  return (
    <div style={styles[type]} className="alert">
      <p>{message}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

// 사용
function App() {
  return (
    <div>
      <Alert type="success" message="저장되었습니다!" onClose={() => {}} />
      <Alert type="error" message="오류가 발생했습니다!" onClose={() => {}} />
      <Alert type="warning" message="주의하세요!" onClose={() => {}} />
    </div>
  );
}
```

#### 3️⃣ 단방향 데이터 흐름 (Unidirectional Data Flow)

React의 데이터는 **항상 위에서 아래로** 흐릅니다.

```
        ┌──────────┐
        │   App    │
        └────┬─────┘
             │
      ┌──────┴──────┐
      │             │
┌─────▼─────┐ ┌────▼─────┐
│ Component │ │ Component│
│    A      │ │    B     │
└─────┬─────┘ └────┬─────┘
      │            │
┌─────▼─────┐ ┌───▼──────┐
│ Component │ │Component │
│    A-1    │ │   B-1    │
└───────────┘ └──────────┘

❌ 자식이 부모로 데이터를 직접 전달할 수 없음
✅ 부모가 자식으로만 데이터를 전달할 수 있음
```

---

### Props가 필요한 구체적인 상황

| 상황 | 예시 | Props 사용 |
|------|------|------------|
| **동적 콘텐츠** | 사용자 이름, 제품 정보 | `name={userName}` |
| **스타일 변경** | 색상, 크기, 모양 | `color="red" size="large"` |
| **동작 제어** | 버튼 클릭, 폼 제출 | `onClick={handleClick}` |
| **조건부 렌더링** | 로그인 여부, 권한 | `isLoggedIn={true}` |
| **리스트 데이터** | 상품 목록, 게시글 | `items={products}` |

```jsx
function UserCard({ user, size, onEdit, showEmail }) {
  const cardStyle = {
    padding: size === 'large' ? '24px' : '16px',
    fontSize: size === 'large' ? '18px' : '14px',
  };

  return (
    <div style={cardStyle} className="user-card">
      <h3>{user.name}</h3>
      {showEmail && <p>{user.email}</p>}
      <button onClick={() => onEdit(user.id)}>편집</button>
    </div>
  );
}

// 사용
function App() {
  const user = { id: 1, name: '철수', email: 'cheolsu@example.com' };

  return (
    <div>
      <UserCard
        user={user}
        size="large"           {/* 큰 카드 */}
        showEmail={true}        {/* 이메일 표시 */}
        onEdit={handleEdit}     {/* 편집 핸들러 */}
      />
      <UserCard
        user={user}
        size="small"           {/* 작은 카드 */}
        showEmail={false}       {/* 이메일 숨김 */}
        onEdit={handleEdit}
      />
    </div>
  );
}
```

---

### Props vs State

Props와 State의 차이를 명확히 이해해야 합니다.

| 구분 | Props | State |
|------|-------|-------|
| **소유자** | 부모 컴포넌트 | 컴포넌트 자신 |
| **변경 가능성** | 읽기 전용 (Immutable) | 변경 가능 (Mutable) |
| **데이터 흐름** | 부모 → 자식 (단방향) | 내부 상태 관리 |
| **용도** | 데이터 전달, 커스터마이징 | 동적 상태 관리 |

```jsx
function Counter({ initialValue }) {  // ← Props: 부모가 전달
  const [count, setCount] = useState(initialValue);  // ← State: 내부 관리

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter initialValue={0} />  {/* initialValue는 Props */}
      <Counter initialValue={10} />
    </div>
  );
}
```

---

### 요약

#### Props가 필요한 이유

1. **재사용성**: 같은 컴포넌트를 다양한 데이터로 사용
2. **유지보수성**: 데이터 소스를 중앙에서 관리
3. **유연성**: Props로 컴포넌트 동작과 모양 제어
4. **단방향 흐름**: 위에서 아래로 데이터 흐름 명확
5. **캡슐화**: 컴포넌트 간 의존성 최소화

#### 핵심 개념

```
Props = 컴포넌트의 "입력 (Input)"
       컴포넌트를 "함수"로 생각하면
       Props는 "매개변수 (Parameters)"와 같음
```

**Props가 없다면:**
- ❌ 모든 컴포넌트가 하드코딩된 값만 사용
- ❌ 재사용 불가능한 일회용 컴포넌트
- ❌ 데이터 중복 및 유지보수 악화

**Props가 있다면:**
- ✅ 유연하고 재사용 가능한 컴포넌트
- ✅ 명확한 데이터 흐름
- ✅ 유지보수하기 쉬운 코드

---

## 3.2 Props 사용 방법

Props를 전달하고 받는 구체적인 방법을 알아봅시다.

---

### Props 전달하기 (부모 컴포넌트)

#### 기본 문법

```jsx
// 부모 컴포넌트에서 자식 컴포넌트로 props 전달
function Parent() {
  return (
    <Child
      name="철수"           {/* 문자열 */}
      age={25}              {/* 숫자 */}
      isActive={true}       {/* 불리언 */}
      hobbies={['독서', '운동']}  {/* 배열 */}
      address={{ city: '서울', country: '한국' }}  {/* 객체 */}
    />
  );
}
```

#### 전달 방식별 예시

**1. 문자열 (String)**
```jsx
// 따옴표로 감싸기
<Greeting message="안녕하세요!" />
```

**2. 숫자 (Number)**
```jsx
// 중괄호 사용
<Counter initialValue={0} />
<ProgressBar percent={75} />
```

**3. 불리언 (Boolean)**
```jsx
// true, false
<Button disabled={true} />
<Modal isOpen={false} />

// shorthand: props 이름만 있으면 true
<input disabled />
{/* <input disabled={true} />와 동일 */}
```

**4. 배열 (Array)**
```jsx
// 중괄호로 배열 전달
<ItemList items={['사과', '바나나', '오렌지']} />
<NumberList numbers={[1, 2, 3, 4, 5]} />
```

**5. 객체 (Object)**
```jsx
// 중괄호로 객체 전달
<UserProfile
  user={{
    name: '철수',
    age: 25,
    email: 'cheolsu@example.com'
  }}
/>

// 또는 변수로 전달
const userData = { name: '철수', age: 25 };
<UserProfile user={userData} />
```

**6. 함수 (Function)**
```jsx
// 이벤트 핸들러 전달
<Button onClick={handleClick} />
<Input onChange={handleChange} />
<Form onSubmit={handleSubmit} />
```

**7. 변수 (Variable)**
```jsx
function App() {
  const userName = '철수';
  const userAge = 25;
  const isLoggedIn = true;

  return (
    <UserProfile
      name={userName}
      age={userAge}
      isLoggedIn={isLoggedIn}
    />
  );
}
```

**8. 표현식 (Expression)**
```jsx
function App() {
  const a = 10;
  const b = 20;

  return (
    <Display sum={a + b} />          {/* 30 */}
    <Display isEven={(a + b) % 2 === 0} />  {/* true */}
    <Display message={`결과: ${a + b}`} />  {/* "결과: 30" */}
  );
}
```

---

### Props 받기 (자식 컴포넌트)

#### 방법 1: props 객체로 받기

```jsx
function Welcome(props) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}

// 사용
<Welcome name="철수" />
// 결과: <h1>안녕하세요, 철수님!</h1>
```

```jsx
function UserCard(props) {
  return (
    <div>
      <h3>{props.user.name}</h3>
      <p>{props.user.email}</p>
      <p>나이: {props.user.age}세</p>
    </div>
  );
}

// 사용
const user = { name: '철수', email: 'cheolsu@example.com', age: 25 };
<UserCard user={user} />
```

#### 방법 2: 구조 분해 할당 (권장) ⭐

```jsx
// 더 간결하고 명확함
function Welcome({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}

// 중첩 구조 분해
function UserCard({ user: { name, email, age } }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>나이: {age}세</p>
    </div>
  );
}

// 별칭 (alias) 사용
function UserCard({ user: { name: userName, email: userEmail } }) {
  return (
    <div>
      <h3>{userName}</h3>
      <p>{userEmail}</p>
    </div>
  );
}
```

#### 방법 3: 기본값 설정 (Default Props)

```jsx
// 1. 함수 매개변수 기본값 사용 (권장)
function Button({
  variant = 'primary',
  size = 'medium',
  children,
  onClick = () => {}
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// 사용
<Button>클릭</Button>
{/* variant='primary', size='medium' 적용 */}

<Button variant="secondary">취소</Button>
{/* variant='secondary', size='medium' 적용 */}
```

```jsx
// 2. defaultProps (레거시 방식, 권장하지 않음)
function Button({ variant, size, children }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
};

// ✅ 권장: 함수 매개변수 기본값 사용
```

---

### 다양한 Props 사용 예시

#### 예시 1: 텍스트 컴포넌트

```jsx
function Text({ content, size, color, weight }) {
  const style = {
    fontSize: size === 'large' ? '24px' : size === 'small' ? '14px' : '16px',
    color: color || 'black',
    fontWeight: weight || 'normal',
  };

  return <p style={style}>{content}</p>;
}

// 사용
<Text content="제목입니다" size="large" color="blue" weight="bold" />
<Text content="본문입니다" size="medium" color="gray" />
<Text content="작은 텍스트" size="small" />
```

#### 예시 2: 버튼 컴포넌트

```jsx
function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? '로딩 중...' : children}
    </button>
  );
}

// 사용
<Button onClick={handleSubmit}>제출하기</Button>
<Button variant="secondary" size="large">큰 버튼</Button>
<Button disabled onClick={handleClick} disabled>비활성화</Button>
<Button loading>처리 중</Button>
```

#### 예시 3: 카드 컴포넌트

```jsx
function Card({
  title,
  description,
  imageUrl,
  showImage = true,
  tags = [],
  onTagClick
}) {
  return (
    <div className="card">
      {showImage && imageUrl && (
        <img src={imageUrl} alt={title} className="card-image" />
      )}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {tags.length > 0 && (
          <div className="tags">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag"
                onClick={() => onTagClick && onTagClick(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 사용
<Card
  title="React 완전 정복"
  description="React의 모든 것을 배워보세요"
  imageUrl="react-book.jpg"
  showImage={true}
  tags={['React', 'JavaScript', 'Frontend']}
  onTagClick={(tag) => console.log(tag)}
/>
```

---

### Props 유효성 검사

#### TypeScript 사용 (권장)

```tsx
interface UserCardProps {
  user: {
    name: string;
    age: number;
    email?: string;  // 선택적
  };
  size?: 'small' | 'medium' | 'large';
  onEdit?: (userId: number) => void;
}

function UserCard({ user, size = 'medium', onEdit }: UserCardProps) {
  return (
    <div className={`user-card ${size}`}>
      <h3>{user.name}</h3>
      <p>{user.age}세</p>
      {user.email && <p>{user.email}</p>}
      {onEdit && (
        <button onClick={() => onEdit(user.id)}>편집</button>
      )}
    </div>
  );
}
```

#### PropTypes (JavaScript - Deprecated)

> ⚠️ **중요 경고 (2026)**: PropTypes는 **deprecated** 상태입니다. 새 프로젝트에서는 **TypeScript**를 사용하세요. PropTypes는 향후 React 버전에서 제거될 수 있습니다.

```jsx
// ❌ 권장하지 않음: TypeScript를 사용하세요
import PropTypes from 'prop-types';

function UserCard({ user, size = 'medium', onEdit }) {
  return (
    <div className={`user-card ${size}`}>
      <h3>{user.name}</h3>
      <p>{user.age}세</p>
      {onEdit && <button onClick={() => onEdit(user.id)}>편집</button>}
    </div>
  );
}

// PropTypes는 레거시 프로젝트 유지보수용으로만 사용
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onEdit: PropTypes.func,
};

UserCard.defaultProps = {
  size: 'medium',
};
```

**PropTypes 사용이 필요한 경우**:
- 레거시 프로젝트 유지보수
- TypeScript로 마이그레이션 중인 단계
- 정말 간단한 프로토타입 (TypeScript 설정이 오버헤드인 경우)

**마이그레이션 가이드**:
```bash
# 1. TypeScript 설치
npm install --save-dev typescript @types/react @types/node

# 2. tsconfig.json 생성
npx tsc --init

# 3. .js 파일을 .tsx로 변환
# 4. PropTypes를 TypeScript 인터페이스로 변환
```

---

### 요약

#### Props 전달하기

| 타입 | 예시 |
|------|------|
| **문자열** | `<Greeting name="철수" />` |
| **숫자** | `<Counter count={0} />` |
| **불리언** | `<Button disabled={true} />` |
| **배열** | `<List items={[1, 2, 3]} />` |
| **객체** | `<Profile user={{name: '철수'}} />` |
| **함수** | `<Button onClick={handleClick} />` |
| **변수** | `<Display value={myVar} />` |

#### Props 받기

```jsx
// 방법 1: props 객체
function Component(props) {
  return <div>{props.name}</div>;
}

// 방법 2: 구조 분해 (권장)
function Component({ name, age }) {
  return <div>{name}</div>;
}

// 기본값 설정
function Component({ name = '기본값' }) {
  return <div>{name}</div>;
}
```

#### 모범 사례

1. **구조 분해 할당 사용**: 코드가 간결해짐
2. **기본값 설정**: props가 없을 때 대비
3. **타입 검사**: TypeScript 또는 PropTypes 사용
4. **명확한 이름**: props 목적을 잘 설명하는 이름

---

## 3.3 컴포넌트, Props, 그리고 재사용성

Props를 활용하여 진정으로 재사용 가능한 컴포넌트를 만드는 고급 기법들을 알아봅시다.

---

### 1️⃣ Children Props

**children**은 특별한 props로, 컴포넌트의 **여는 태그와 닫는 태그 사이의 내용**을 전달합니다.

#### 기본 사용법

```jsx
// 컴포넌트 정의
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// 사용
<Card>
  <h2>제목</h2>
  <p>내용입니다.</p>
</Card>

// 렌더링 결과:
// <div class="card">
//   <h2>제목</h2>
//   <p>내용입니다.</p>
// </div>
```

#### 실전 예시

**1. 레이아웃 컴포넌트**
```jsx
function Layout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header className="header">{header}</header>
      <div className="content-wrapper">
        <aside className="sidebar">{sidebar}</aside>
        <main className="main">{children}</main>
      </div>
      <footer className="footer">{footer}</footer>
    </div>
  );
}

// 사용
function Dashboard() {
  return (
    <Layout
      header={<h1>대시보드</h1>}
      sidebar={<nav>메뉴...</nav>}
      footer={<p>© 2024</p>}
    >
      <div>
        <h2>환영합니다!</h2>
        <p>대시보드 내용...</p>
      </div>
    </Layout>
  );
}
```

**2. 컨테이너 컴포넌트**
```jsx
function Panel({ title, children }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>{title}</h3>
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}

// 사용
<Panel title="사용자 정보">
  <p>이름: 철수</p>
  <p>이메일: cheolsu@example.com</p>
  <button>편집</button>
</Panel>
```

**3. 조건부 children 렌더링**
```jsx
function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );
}

// 사용
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>열기</button>

      <Modal isOpen={isModalOpen}>
        <h2>모달 제목</h2>
        <p>모달 내용입니다.</p>
        <button onClick={() => setIsModalOpen(false)}>닫기</button>
      </Modal>
    </div>
  );
}
```

**4. 여러 children 전달**
```jsx
function SplitPane({ left, right }) {
  return (
    <div className="split-pane">
      <div className="pane-left">{left}</div>
      <div className="pane-right">{right}</div>
    </div>
  );
}

// 사용
<SplitPane
  left={<Sidebar />}
  right={<MainContent />}
/>
```

**5. Render Props (children으로 함수 전달)**
```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  // children이 함수인 경우 호출
  return children({ data, loading });
}

// 사용
<DataFetcher url="/api/user">
  {({ data, loading }) => {
    if (loading) return <p>로딩 중...</p>;
    if (!data) return <p>데이터 없음</p>;
    return <div>{data.name}</div>;
  }}
</DataFetcher>
```

---

### 2️⃣ 어떤 컴포넌트가 Props가 필요한가?

모든 컴포넌트가 Props를 필요로하는 것은 아닙니다. Props 필요성을 판단하는 기준을 알아봅시다.

#### Props가 필요한 컴포넌트

```jsx
// ✅ 데이터를 표시하는 컴포넌트
function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ 재사용 가능한 UI 컴포넌트
function Button({ variant, children, onClick }) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ✅ 동작이 다양한 컴포넌트
function Alert({ type, message }) {
  const colors = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
  };
  return <div style={{ backgroundColor: colors[type] }}>{message}</div>;
}
```

#### Props가 필요 없는 컴포넌트

```jsx
// ✅ 정적 콘텐츠 (Props 불필요)
function Copyright() {
  return <p>© 2024 My Company. All rights reserved.</p>;
}

// ✅ 고정된 레이아웃 (Props 불필요)
function PageLayout() {
  return (
    <div className="layout">
      <Header />
      <main>{/* children을 받을 수도 있음 */}</main>
      <Footer />
    </div>
  );
}

// ✅ 자체 상태만 관리 (Props 불필요)
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

#### 판단 기준

```
컴포넌트에 Props가 필요한가?
  ↓
외부에서 데이터를 받아야 하나?
  ↓ YES
👉 Props 필요

다양하게 재사용되어야 하나?
  ↓ YES
👉 Props 필요

고정된 내용만 표시하나?
  ↓ YES
👉 Props 불필요

자체 상태만 관리하나?
  ↓ YES
👉 Props 불필요 (초기값은 props로 받을 수 있음)
```

---

### 3️⃣ 여러 개의 Props 다루기

여러 props를 효율적으로 다루는 방법을 알아봅시다.

#### 방법 1: 구조 분해와 별칭 사용

```jsx
function ProductCard({
  product: {
    id,
    name: productName,
    price: productPrice,
    image,
    category
  },
  user: {
    name: userName,
    role
  },
  onAddToCart,
  onToggleFavorite
}) {
  return (
    <div className="product-card">
      <img src={image} alt={productName} />
      <h3>{productName}</h3>
      <p>{productPrice}원</p>
      <p>카테고리: {category}</p>
      {role === 'admin' && (
        <button onClick={() => onAddToCart(id)}>장바구니</button>
      )}
    </div>
  );
}
```

#### 방법 2: 관련 props 그룹화

```jsx
// ❌ props가 너무 많음
function UserCard({
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  country,
  avatar,
  bio,
  isOnline,
  lastSeen
}) {
  // ...
}

// ✅ 관련 데이터를 객체로 그룹화
function UserCard({
  user: { firstName, lastName, email, phone, avatar },
  location: { address, city, country },
  status: { isOnline, lastSeen }
}) {
  // ...
}
```

#### 방법 3: 플래그 props 최소화

```jsx
// ❌ 불리언 플래그가 너무 많음
function Button({
  primary,
  secondary,
  danger,
  warning,
  success,
  outline,
  rounded,
  disabled,
  loading
}) {
  // ...
}

// ✅ variant로 통합
function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false
}) {
  // variant: 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
  // size: 'small' | 'medium' | 'large'
  // ...
}
```

---

### 4️⃣ Props Spreading (전개 연산자)

객체의 모든 속성을 props로 전달할 때 **전개 연산자 `...`**를 사용합니다.

#### 기본 문법

```jsx
const userProps = {
  name: '철수',
  age: 25,
  email: 'cheolsu@example.com'
};

// 개별 전달 (번거로움)
<UserCard name={userProps.name} age={userProps.age} email={userProps.email} />

// 전개 연산자 사용 (간결)
<UserCard {...userProps} />

// 위 코드는 다음과 같이 해석됨:
// <UserCard name='철수' age={25} email='cheolsu@example.com' />
```

#### 실전 예시

**1. 폼 컴포넌트**
```jsx
function TextField({ label, ...inputProps }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
}

// 사용
<TextField
  label="이름"
  type="text"
  placeholder="이름 입력"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// label은 TextField에서 직접 사용
// 나머지 props는 <input>에 전달
```

**2. 버튼 컴포넌트**
```jsx
function Button({ variant, size, className, children, ...buttonProps }) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

// 사용
<Button
  variant="primary"
  size="large"
  onClick={handleClick}
  disabled={isDisabled}
  type="submit"
>
  제출하기
</Button>
```

**3. 부분 props 전달**
```jsx
function App() {
  const commonProps = {
    variant: 'primary',
    size: 'medium',
  };

  return (
    <div>
      <Button {...commonProps}>저장</Button>
      <Button {...commonProps} onClick={handleSave}>저장</Button>
      <Button {...commonProps} onClick={handleCancel}>취소</Button>
    </div>
  );
}
```

**4. props 병합 순서**
```jsx
function App() {
  const defaultProps = {
    variant: 'primary',
    size: 'medium',
  };

  const specificProps = {
    size: 'large',
    disabled: true,
  };

  // 뒤에 오는 props가 우선함
  <Button {...defaultProps} {...specificProps} />
  // 결과: variant='primary', size='large', disabled=true
}
```

---

### 6️⃣ Modern Props Patterns (2026)

React 2026에서 널리 사용되는 현대적 Props 패턴들을 알아봅시다.

---

#### Compound Components Pattern

**Compound Components**는 부모-자식 관계를 공유하여 유연한 컴포넌트를 만드는 패턴입니다.

```jsx
// Compound Component 패턴
function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.Header = function Header({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function Body({ children }) {
  return <div className="card-body">{children}</div>;
};

Card.Footer = function Footer({ children }) {
  return <div className="card-footer">{children}</div>;
};

// 사용
function App() {
  return (
    <Card>
      <Card.Header>
        <h2>제목</h2>
      </Card.Header>
      <Card.Body>
        <p>내용입니다.</p>
      </Card.Body>
      <Card.Footer>
        <button>확인</button>
      </Card.Footer>
    </Card>
  );
}
```

**장점**:
- 유연한 레이아웃 구성
- props drilling 없이 데이터 공유 (Context와 결합)
- 직관적인 JSX 구조

---

#### "as" Prop Pattern (Polymorphic Components)

**as prop**은 컴포넌트가 다른 HTML 태그나 컴포넌트로 렌더링되게 합니다.

```jsx
// TypeScript로 구현한 as prop 패턴
type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PropsToAs<T extends React.ElementType, P> = AsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof AsProp<T>> &
  P;

type ButtonProps<T extends React.ElementType> = PropsToAs<T, {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}>;

function Button<T extends React.ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';

  return (
    <Component
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </Component>
  );
}

// 사용
function App() {
  return (
    <div>
      {/* 기본: button 요소 */}
      <Button variant="primary">Click</Button>

      {/* a 태그로 렌더링 */}
      <Button as="a" href="/link" variant="secondary">
        Link Button
      </Button>

      {/* Next.js Link 컴포넌트로 렌더링 */}
      <Button as={Link} href="/about" variant="primary">
        About
      </Button>
    </div>
  );
}
```

**장점**:
- 접근성 향상 (올바른 HTML 요소 사용)
- 재사용성 증가
- 타입 안전성 유지 (TypeScript)

---

#### Slot Pattern

**Slot pattern**은 여러 children을 명명된 slot으로 전달하는 패턴입니다.

```jsx
// Slot 패턴 구현
function Layout({
  header,
  sidebar,
  content,
  footer,
}: {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="layout">
      {header && <header className="layout-header">{header}</header>}
      <div className="layout-body">
        {sidebar && <aside className="layout-sidebar">{sidebar}</aside>}
        <main className="layout-content">{content}</main>
      </div>
      {footer && <footer className="layout-footer">{footer}</footer>}
    </div>
  );
}

// 사용
function Dashboard() {
  return (
    <Layout
      header={<h1>대시보드</h1>}
      sidebar={<nav>메뉴...</nav>}
      content={<div>내용...</div>}
      footer={<p>© 2026</p>}
    />
  );
}
```

또는 객체 형태로 slot 전달:

```jsx
// 객체 기반 slot 패턴
function Layout({
  slots,
}: {
  slots: {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
  };
}) {
  return (
    <div className="layout">
      {slots.header && <header>{slots.header}</header>}
      <div>
        {slots.sidebar && <aside>{slots.sidebar}</aside>}
        <main>{slots.content}</main>
      </div>
      {slots.footer && <footer>{slots.footer}</footer>}
    </div>
  );
}

// 사용
<Layout
  slots={{
    header: <h1>제목</h1>,
    sidebar: <nav>메뉴</nav>,
    content: <div>본문</div>,
    footer: <p>푸터</p>,
  }}
/>
```

---

#### TypeScript Utility Types for Props

**React.ComponentProps**를 사용하여 기존 컴포넌트나 HTML 요소의 props 타입을 확장하세요.

```tsx
// HTML 요소의 props 확장
type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
}

// 컴포넌트의 props 확장
type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};

function IconButton({ icon, children, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      {icon}
      {children}
    </Button>
  );
}

// React.ComponentPropsWithoutRef로 ref 제외
type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  label: string;
  error?: string;
};

function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

---

### 5️⃣ Prop Chains (Prop Drilling)

Prop Drilling은 **props를 여러 계층의 자식 컴포넌트로 전달하는 과정**입니다.

#### Prop Drilling 예시

```jsx
// ❌ Prop Drilling (비효율적)
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: '철수' });

  return (
    <div>
      <Header theme={theme} user={user} />  {/* theme, user 전달 */}
      <MainContent theme={theme} user={user} setTheme={setTheme} setUser={setUser} />
    </div>
  );
}

function Header({ theme, user }) {
  return (
    <header>
      <Logo theme={theme} />  {/* theme 전달 */}
      <UserMenu user={user} />  {/* user 전달 */}
    </header>
  );
}

function Logo({ theme }) {
  return <img src={`logo-${theme}.png`} alt="logo" />;
}

function MainContent({ theme, user, setTheme, setUser }) {
  return (
    <main>
      <Dashboard theme={theme} user={user} setTheme={setTheme} setUser={setUser} />
    </main>
  );
}

function Dashboard({ theme, user, setTheme, setUser }) {
  return (
    <div>
      <SettingsPanel theme={theme} setTheme={setTheme} />
      <UserPanel user={user} setUser={setUser} />
    </div>
  );
}

function SettingsPanel({ theme, setTheme }) {
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        테마 변경
      </button>
    </div>
  );
}
```

#### Prop Drilling 문제점

```
App
 │
 ├──► theme, user ───► Header
 │                    │
 │                    ├──► theme ───► Logo (3계층)
 │                    └──► user ───► UserMenu
 │
 └──► theme, user, setTheme, setUser ───► MainContent
                                         │
                                         └──► ... ───► SettingsPanel
                                                           (5계층)
```

**문제점:**
- 🔴 중간 컴포넌트가 사용하지 않는 props를 전달해야 함
- 🔴 props 체인이 길어질수록 코드 파악 어려움
- 🔴 중간 컴포넌트 수정 시 영향 범위 큼

#### 해결 방법

**1. 컴포넌트 합성 (Composition)**

```jsx
// ✅ 중간에 props 전달 없이 직접 전달
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      <Header>
        <Logo theme={theme} />  {/* 직접 전달 */}
      </Header>
      <MainContent>
        <SettingsPanel theme={theme} setTheme={setTheme} />  {/* 직접 전달 */}
      </MainContent>
    </div>
  );
}

function Header({ children }) {
  return (
    <header>
      {children}  {/* children으로 받아서 렌더링 */}
    </header>
  );
}
```

**2. Context API 사용**

```jsx
// ✅ Context로 전역 상태 관리
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <MainContent />
    </ThemeContext.Provider>
  );
}

function Header() {
  return (
    <header>
      <Logo />  {/* props 필요 없음 */}
    </header>
  );
}

function Logo() {
  const { theme } = useContext(ThemeContext);
  return <img src={`logo-${theme}.png`} alt="logo" />;
}

function SettingsPanel() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      테마 변경
    </button>
  );
}
```

**useReducer와 Context 결합** (복잡한 상태 관리에 권장):

```jsx
// ✅ useReducer로 복잡한 상태 로직 관리
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'light',
    fontSize: 'medium',
  });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

function Logo() {
  const { state } = useContext(ThemeContext);
  return <img src={`logo-${state.theme}.png`} alt="logo" />;
}

function SettingsPanel() {
  const { state, dispatch } = useContext(ThemeContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        테마 변경
      </button>
      <button onClick={() => dispatch({ type: 'SET_FONT_SIZE', payload: 'large' })}>
        큰 글자
      </button>
    </div>
  );
}
```

**useState vs useReducer with Context**:

| 상황 | 권장 방법 | 이유 |
|------|----------|------|
| **단순 상태** | useState + Context | 간단하고 직관적 |
| **관련 상태가 여러 개** | useReducer + Context | 상태 업데이트 로직 중앙화 |
| **복잡한 상태 전이** | useReducer + Context | 상태 변경 로직 명확화 |
| **여러 액션 타입** | useReducer + Context | 타입 안전성 및 예측 가능성 |

**3. 상태 관리 라이브러리 (Redux, Zustand 등)**

```jsx
// ✅ Zustand 예시
import useStore from './store';

function App() {
  return (
    <div>
      <Header />
      <SettingsPanel />
    </div>
  );
}

function Logo() {
  const theme = useStore(state => state.theme);
  return <img src={`logo-${theme}.png`} alt="logo" />;
}

function SettingsPanel() {
  const { theme, setTheme } = useStore();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      테마 변경
    </button>
  );
}
```

---

## 3.4 React Server Components와 Props

React 18+의 **React Server Components (RSC)**에서 Props는 클라이언트 컴포넌트와 **완전히 다르게 동작**합니다. 이는 React 2026에서 필수적으로 이해해야 하는 개념입니다.

---

### Server Component에서 Props의 핵심 차이점

#### 1️⃣ 함수를 Props로 전달 가능

**Client Component** (불가능):
```jsx
// ❌ Client Component에서는 에러 발생
'use client';

function DataTable({ onSort }) {  // 함수를 prop으로 받으면 에러!
  return <div>Table</div>;
}
```

**Server Component** (가능!):
```jsx
// ✅ Server Component에서는 함수를 prop으로 전달 가능
function DataTable({ onSort }) {
  return <div onClick={onSort}>Table</div>;
}

// Server Component에서 사용
function Page() {
  return (
    <DataTable
      onSort={() => console.log('sorted')}  {/* 함수 prop 전달 가능! */}
    />
  );
}
```

#### 2️⃣ Props는 직렬화 가능해야 함

Server Component의 props는 네트워크를 통해 전송되므로 **직렬화 가능**해야 합니다.

```jsx
// ✅ 직렬화 가능한 props
function UserProfile({
  id,           // 기본 타입
  name,         // 문자열
  age,          // 숫자
  isActive,     // 불리언
  tags,         // 배열
  settings,     // 객체 (Plain Object)
}) {
  return <div>{name}</div>;
}

// ❌ 직렬화 불가능한 props (에러 발생)
function UserProfile({
  onClick,      // 함수 (Server Component 간 전송 시)
  date,         // Date 객체
  userRef,      // Ref 객체
  map,          // Map/Set
  classInstance, // 클래스 인스턴스
}) {
  return <div>{name}</div>;
}
```

**직렬화 가능 여부**:
- ✅ Primitives: string, number, boolean, null, undefined
- ✅ Arrays/Objects: plain objects and arrays
- ✅ Date, Map, Set (Server Component → Server Component)
- ❌ Functions (Server → Client 전송 시)
- ❌ Classes, Symbols, undefined in arrays

#### 3️⃣ useState가 없는 Props와 State 관계

Server Component는 **useState를 사용할 수 없으므로**, Props와 State의 구분이 다릅니다.

```jsx
// ✅ Server Component - props만 사용
function UserCard({ user }) {
  // ❌ useState 사용 불가
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2>{user.name}</h2>
      {/* 대신 Client Component로 상태 관리 위임 */}
      <UserActions userId={user.id} />
    </div>
  );
}

// ✅ Client Component - state 사용 가능
'use client';

function UserActions({ userId }) {
  const [isOpen, setIsOpen] = useState(false);  // useState 사용 가능

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? '닫기' : '열기'}
    </button>
  );
}
```

#### 4️⃣ Client Component는 Server Component를 Props로 받을 수 없음

```jsx
function ServerChild() {
  return <div>Server Child</div>;
}

function ClientWrapper({ children }) {  // 'use client'
  return <div className="wrapper">{children}</div>;
}

// ❌ 에러: Server Component를 prop으로 전달
<ClientWrapper child={<ServerChild />} />

// ✅ 정상: children으로 전달
<ClientWrapper>
  <ServerChild />
</ClientWrapper>
```

---

### Props 전송 경계 이해하기

```
Server Component (App)
    │
    ├─► Server Component (Header) ✅ 모든 props 전송 가능
    │       │
    │       └─► Client Component (UserMenu) ✅ 직렬화 가능 props만
    │
    └─► Client Component (DataTable) ✅ 직렬화 가능 props만
```

**규칙**:
1. Server → Server: 모든 props 전송 가능 (함수 포함)
2. Server → Client: 직렬화 가능 props만
3. Client → Client: 모든 props 전송 가능
4. Client → Server: 불가능 (Client Component는 Server Component의 부모가 될 수 없음)

---

### 실전 예시: 데이터 테이블

**문제**: Server Component에서 정렬 기능 구현

```jsx
// ✅ 올바른 접근: Server + Client 분리
function DataTable({
  data,
  sortColumn,    // 현재 정렬 컬럼 (string)
  sortDirection, // 정렬 방향 (asc | desc)
  onSort         // 정렬 핸들러 (함수!)
}) {
  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      // 정렬 로직
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <table>
      {sortedData.map(row => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.email}</td>
        </tr>
      ))}
    </table>
  );
}

// ✅ Server Component에서 함수 prop 전달
function UserTable() {
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // 데이터 패칭 (Server Component에서 직접!)
  const data = await fetchUsers();

  return (
    <DataTable
      data={data}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={(column) => {
        setSortColumn(column);
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
      }}
    />
  );
}
```

---

### 모범 사례

#### ✅ Server Component Props 패턴

```jsx
// 1. 데이터를 prop으로 받기
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 2. 비동기 데이터를 prop으로 전달
async function Page() {
  const users = await db.users.findMany();

  return <UserList users={users} />;
}
```

#### ❌ 피해야 할 패턴

```jsx
// 1. Server Component에서 상태 관리하려 함
function UserList() {
  // ❌ Server Component에서 useState 사용 불가
  const [users, setUsers] = useState([]);

  return <div>{/* ... */}</div>;
}

// 2. 직렬화 불가능한 props 전달
function ClientComponent({ date, map, callback }) {
  // ❌ Date, Map, 함수는 Server → Client 전송 불가
  return <div>{/* ... */}</div>;
}
```

---

### 요약

| 구분 | Server Component Props | Client Component Props |
|------|----------------------|----------------------|
| **함수 전달** | Server → Server: ✅ 가능 | Server → Client: ❌ 불가 |
| **직렬화** | 필요 | 필요 |
| **useState** | 사용 불가 | 사용 가능 |
| **데이터 패칭** | 컴포넌트 내부 가능 | useEffect 필요 |

**핵심 원칙**:
> 💡 Server Component는 데이터를 prop으로 받고, Client Component는 상태를 관리한다. 이 경계를 명확히 이해하는 것이 React 2026의 핵심입니다.

---

## 3.5 Props와 성능

Props 사용 방식이 컴포넌트 성능에 미치는 영향을 이해해야 합니다.

---

### Reference Equality and Re-renders

**문제**: 객체나 배열을 props로 전달할 때마다 새로운 참조가 생성되어 불필요한 리렌더링 발생.

```jsx
// ❌ 매 렌더링마다 새 객체/배열 생성
function Parent() {
  return (
    <Child
      style={{ color: 'red', fontSize: '16px' }}        // 새 객체
      items={[1, 2, 3]}                                 // 새 배열
      config={{ option1: true, option2: false }}         // 새 객체
    />
  );
}

function Child({ style, items, config }) {
  console.log('Child rendered!');
  return <div style={style}>{items.join(', ')}</div>;
}
```

```jsx
// ✅ useMemo로 참조 안정화
function Parent() {
  const style = useMemo(() => ({ color: 'red', fontSize: '16px' }), []);
  const items = useMemo(() => [1, 2, 3], []);
  const config = useMemo(() => ({ option1: true, option2: false }), []);

  return <Child style={style} items={items} config={config} />;
}

// 또는 컴포넌트 외부로 추출
const DEFAULT_STYLE = { color: 'red', fontSize: '16px' };
const DEFAULT_ITEMS = [1, 2, 3];
const DEFAULT_CONFIG = { option1: true, option2: false };

function Parent() {
  return <Child style={DEFAULT_STYLE} items={DEFAULT_ITEMS} config={DEFAULT_CONFIG} />;
}
```

---

### When to Use memo() with Props

**memo()는 props가 변경되지 않았을 때 리렌더링을 방지**합니다.

```jsx
// ✅ memo로 리렌더링 방지
const Child = memo(function Child({ name, age }) {
  console.log('Child rendered');
  return <div>{name}: {age}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="철수" age={25} />  {/* count가 변경되어도 리렌더링 안됨 */}
    </div>
  );
}
```

**주의**: props가 자주 변경되는 컴포넌트에 memo()를 사용하면 **성능이 저하**됩니다.

```jsx
// ❌ 비효율적: props가 자주 변경되는데 memo 사용
const ExpensiveChild = memo(function ExpensiveChild({ data }) {
  return <div>{data.map(item => item.name).join(', ')}</div>;
});

function Parent() {
  const [data, setData] = useState([]);

  // data가 자주 변경되면 memo의 비용만 추가되고 이득은 없음
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => [...prev, { id: Date.now(), name: 'New' }]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <ExpensiveChild data={data} />;
}
```

---

### useCallback/useMemo for Props Stability

부모의 state가 변경될 때 자식에게 전달하는 콜백과 계산된 값을 안정화해야 합니다.

```jsx
// ❌ 매 렌더링마다 새 함수/값 생성
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <Child
      onClick={() => console.log('clicked')}           // 새 함수
      value={count * 2 + Math.sqrt(count)}              // 새 계산
    />
  );
}

// ✅ useCallback/useMemo로 안정화
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);  // 의존성이 없으므로 한 번만 생성

  const value = useMemo(() => {
    return count * 2 + Math.sqrt(count);
  }, [count]);  // count가 변경될 때만 재계산

  return <Child onClick={handleClick} value={value} />;
}
```

---

### Prop Stability and Child Re-renders

props가 안정적이지 않으면 자식 컴포넌트가 불필요하게 리렌더링됩니다.

```jsx
// ❌ 불안정한 props
function Parent() {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ChildList
        items={items}
        filter={filter}        {/* 안정적 */}
        onFilterChange={(value) => setFilter(value)}  {/* 불안정: 매번 새 함수 */}
      />
    </div>
  );
}

// ✅ 안정한 props
function Parent() {
  const [filter, setFilter] = useState('');

  const handleFilterChange = useCallback((value) => {
    setFilter(value);
  }, []);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ChildList
        items={items}
        filter={filter}
        onFilterChange={handleFilterChange}  {/* 안정적 */}
      />
    </div>
  );
}
```

---

### Bundle Size Impact of Large Props Objects

**Server Components**: 큰 props 객체는 **직렬화 오버헤드**를 발생시킵니다.

```jsx
// ❌ 불필요한 데이터 전달
function UserPage() {
  const user = await fetchUser();  // 100개 필드

  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  // 5개 필드만 사용하는데 100개 전부 받음
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {/* 3개 필드만 사용 */}
    </div>
  );
}
```

```jsx
// ✅ 필요한 데이터만 전달
function UserPage() {
  const user = await fetchUser();

  return (
    <UserProfile
      name={user.name}
      email={user.email}
      avatar={user.avatar}
    />
  );
}

function UserProfile({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

**Client Components**: 큰 props 객체는 **번들 크기**를 증가시킵니다.

---

### Performance Checklist

Props 성능 최적화 체크리스트:

```
✅ 객체/배열 props는 useMemo로 안정화
✅ 콜백 props는 useCallback로 안정화
✅ props가 자주 변경되면 memo() 사용하지 않음
✅ props가 드물게 변경되면 memo() 사용 고려
✅ Server Components에서 필요한 데이터만 전달
✅ props로 전달되는 데이터 크기 모니터링
✅ 불필요한 props 제거 (prop explosion 방지)
```

---

### Measuring Performance

React DevTools Profiler로 props 변경으로 인한 리렌더링을 측정하세요.

```jsx
function App() {
  return (
    <Profiler id="Parent" onRender={(id, phase, actualDuration) => {
      console.log(`${id} (${phase}) took ${actualDuration}ms`);
    }}>
      <Parent />
    </Profiler>
  );
}
```

---

## 3.6 Props Anti-patterns

React에서 흔히 발생하는 Props 관련 안티패턴과 해결 방법입니다.

---

### Anti-pattern 1: Props 직접 수정 ❌

**문제**: Props는 읽기 전용(immutable)입니다. 절대 수정하면 안 됩니다.

```jsx
// ❌ props 직접 수정
function UserCard({ user }) {
  user.name = 'Modified Name';  // NEVER!
  user.isAdmin = true;          // NEVER!

  return <div>{user.name}</div>;
}
```

```jsx
// ✅ 상태 복사 후 수정
function UserCard({ user }) {
  const [localUser, setLocalUser] = useState(user);

  const handlePromote = () => {
    setLocalUser(prev => ({
      ...prev,
      isAdmin: true
    }));
  };

  return (
    <div>
      <h2>{localUser.name}</h2>
      <button onClick={handlePromote}>Promote</button>
    </div>
  );
}
```

---

### Anti-pattern 2: 인라인 객체/배열 생성 ❌

**문제**: 매 렌더링마다 새로운 참조가 생성되어 자식 컴포넌트가 불필요하게 리렌더링됩니다.

```jsx
// ❌ 매 렌더링마다 새 객체/배열
function Component() {
  return (
    <>
      <Child style={{ color: 'red' }} />
      <List items={[1, 2, 3]} />
      <Config options={{ enabled: true }} />
    </>
  );
}
```

```jsx
// ✅ useMemo 또는 컴포넌트 외부 추출
function Component() {
  const style = useMemo(() => ({ color: 'red' }), []);
  const items = useMemo(() => [1, 2, 3], []);
  const options = useMemo(() => ({ enabled: true }), []);

  return (
    <>
      <Child style={style} />
      <List items={items} />
      <Config options={options} />
    </>
  );
}
```

---

### Anti-pattern 3: 전체 State 전달 ❌

**문제**: 필요한 값만 전달해야 하는데 전체 state 객체를 전달합니다.

```jsx
// ❌ 전체 form state 전달
function Form() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    // ... 20개 더
  });

  return (
    <>
      <NameField form={form} setForm={setForm} />
      <EmailField form={form} setForm={setForm} />
      <PhoneField form={form} setForm={setForm} />
      {/* 전체 form을 받지만 각 필드는 하나만 사용 */}
    </>
  );
}

function NameField({ form, setForm }) {
  return (
    <input
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
  );
}
```

```jsx
// ✅ 필요한 값만 전달
function Form() {
  const [form, setForm] = useState({ /* ... */ });

  return (
    <>
      <NameField
        value={form.name}
        onChange={(name) => setForm(prev => ({ ...prev, name }))}
      />
      <EmailField
        value={form.email}
        onChange={(email) => setForm(prev => ({ ...prev, email }))}
      />
      <PhoneField
        value={form.phone}
        onChange={(phone) => setForm(prev => ({ ...prev, phone }))}
      />
    </>
  );
}

function NameField({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
```

---

### Anti-pattern 4: Props Explosion ❌

**문제**: 너무 많은 props는 컴포넌트 설계가 잘못되었다는 신호입니다.

```jsx
// ❌ Props explosion (15개 이상의 props)
function UserCard({
  id,
  name,
  email,
  phone,
  address,
  city,
  country,
  avatar,
  coverImage,
  bio,
  website,
  twitter,
  github,
  linkedin,
  onEdit,
  onDelete,
}) {
  return <div>{/* ... */}</div>;
}
```

**해결 방법 1**: 관련 props를 객체로 그룹화

```jsx
// ✅ 관련 props 그룹화
function UserCard({
  user,  // { id, name, email, avatar }
  location,  // { address, city, country }
  social,  // { website, twitter, github, linkedin }
  onEdit,
  onDelete,
}) {
  return <div>{/* ... */}</div>;
}
```

**해결 방법 2**: 컴포넌트 분리

```jsx
// ✅ 컴포넌트 분리
function UserCard({ user, location, social, onEdit, onDelete }) {
  return (
    <div>
      <UserBasicInfo user={user} />
      <UserLocation location={location} />
      <UserSocialLinks social={social} />
      <UserActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

function UserBasicInfo({ user }) {
  return <div>{user.name}</div>;
}

function UserLocation({ location }) {
  return <div>{location.city}</div>;
}
```

**해결 방법 3**: Compound Components 패턴

```jsx
// ✅ Compound Components
function UserCard({ children }) {
  return <div className="user-card">{children}</div>;
}

UserCard.Header = function Header({ user }) {
  return <div className="header">{user.name}</div>;
};

UserCard.Body = function Body({ user }) {
  return <div className="body">{user.bio}</div>;
};

UserCard.Actions = function Actions({ onEdit, onDelete }) {
  return (
    <div className="actions">
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

// 사용
<UserCard>
  <UserCard.Header user={user} />
  <UserCard.Body user={user} />
  <UserCard.Actions onEdit={handleEdit} onDelete={handleDelete} />
</UserCard>
```

---

### Anti-pattern 5: 플래그 Props 남용 ❌

**문제**: 여러 불리언 props보단 variant prop을 사용해야 합니다.

```jsx
// ❌ 플래그 props 남용
function Button({
  primary,
  secondary,
  danger,
  warning,
  success,
  outline,
  rounded,
  disabled,
}) {
  // 조합 로직이 복잡해짐
  const className = [
    primary && 'btn-primary',
    secondary && 'btn-secondary',
    danger && 'btn-danger',
    warning && 'btn-warning',
    success && 'btn-success',
    outline && 'btn-outline',
    rounded && 'btn-rounded',
    disabled && 'btn-disabled',
  ].filter(Boolean).join(' ');

  return <button className={className}>Click</button>;
}
```

```jsx
// ✅ variant prop 사용
function Button({
  variant = 'primary',  // 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
  size = 'medium',     // 'small' | 'medium' | 'large'
  disabled = false,
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
    >
      Click
    </button>
  );
}
```

---

### Anti-pattern 6: Array Index as Key ❌

**문제**: 배열 인덱스를 key로 사용하면 순서 변경 시 문제가 발생합니다.

```jsx
// ❌ 인덱스를 key로 사용
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <TodoItem key={index} item={item} />  {/* 문제 발생! */}
      ))}
    </ul>
  );
}
```

```jsx
// ✅ 고유한 ID를 key로 사용
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <TodoItem key={item.id} item={item} />  {/* 안전 */}
      ))}
    </ul>
  );
}
```

---

---

## 3.7 요약

### React 2026 Props 핵심 개념

#### 1️⃣ Props의 기본 원칙

```
Props = 컴포넌트의 "입력 (Input)"
       읽기 전용 (Immutable)
       단방향 데이터 흐름 (부모 → 자식)
```

**핵심 원칙**:
- Props를 직접 수정 ❌
- 참조 안정화 중요 (useMemo, useCallback)
- 너무 많은 props = 컴포넌트 분리 신호
- Prop drilling 3계층 이상 = Context/Store 고려

---

#### 2️⃣ React Server Components에서 Props

| 구분 | Server Component | Client Component |
|------|------------------|------------------|
| **함수 prop** | Server → Server: ✅ | Server → Client: ❌ |
| **useState** | 사용 불가 | 사용 가능 |
| **직렬화** | 필수 | 필수 |
| **데이터 패칭** | 컴포넌트 내부 | useEffect 필요 |

**핵심 차이**:
> Server Component는 함수를 props로 받을 수 있지만, Client Component는 직렬화 가능한 데이터만 받을 수 있습니다.

---

#### 3️⃣ Props와 성능 최적화

**Reference Equality**:
```jsx
// ❌ 매 렌더링마다 새 참조
<Child style={{ color: 'red' }} items={[1, 2, 3]} />

// ✅ 참조 안정화
const style = useMemo(() => ({ color: 'red' }), []);
const items = useMemo(() => [1, 2, 3], []);
<Child style={style} items={items} />
```

**메모이제이션 전략**:
- **memo()**: props가 드물게 변경될 때만 사용
- **useCallback**: 콜백 props 안정화
- **useMemo**: 계산된 props 안정화

**성능 체크리스트**:
```
✅ 객체/배열 props 안정화
✅ 콜백 props 안정화
✅ Server Components에서 최소한의 데이터만 전달
✅ props로 전달되는 데이터 크기 모니터링
❌ props가 자주 변경되면 memo() 사용하지 않기
```

---

#### 4️⃣ Modern Props Patterns (2026)

| 패턴 | 용도 | 예시 |
|------|------|------|
| **Compound Components** | 유연한 레이아웃 구성 | `<Card><Card.Header>...</Card.Header></Card>` |
| **as prop** | Polymorphic 컴포넌트 | `<Button as="a" href="...">` |
| **Slot pattern** | 명명된 children 전달 | `<Layout slots={{header, sidebar, content}} />` |
| **render props** | 데이터 전달 + 렌더링 제어 | `<DataFetcher>{(data) => <View data={data} />}</DataFetcher>` |

---

#### 5️⃣ Props Anti-patterns

| Anti-pattern | 문제 | 해결 |
|--------------|------|------|
| **Props 직접 수정** | Immutable 위반 | useState로 복사 후 수정 |
| **인라인 객체/배열** | 불필요한 리렌더링 | useMemo로 안정화 |
| **전체 state 전달** | 과도한 prop 전달 | 필요한 값만 전달 |
| **Props explosion** | 15개 이상의 props | 객체 그룹화 또는 컴포넌트 분리 |
| **플래그 props 남용** | 복잡한 조합 로직 | variant prop 사용 |
| **Array index as key** | 순서 변경 시 버그 | 고유한 ID 사용 |

---

#### 6️⃣ Props 전달 방법 선택 가이드

```
Props 전달 방법 선택:

1. 단순 데이터 전달
   └─> 일반 props 사용
   예: <UserCard name={name} age={age} />

2. 유연한 레이아웃 필요
   └─> children 또는 compound components
   예: <Card><Card.Header>Title</Card.Header></Card>

3. 여러 관련 데이터
   └─> 객체로 그룹화
   예: <UserProfile user={{name, age, email}} />

4. 전역 상태 공유 (prop drilling 3계층+)
   ├─> 복잡한 로직: useReducer + Context
   ├─> 단순 상태: useState + Context
   └─> 대규모 앱: Zustand/Jotai

5. 다른 요소로 렌더링
   └─> as prop pattern
   예: <Button as="a" href="/link" />
```

---

#### 7️⃣ TypeScript vs PropTypes (2026)

```typescript
// ✅ TypeScript (권장)
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ variant, size, children, onClick }: ButtonProps) {
  return <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
    {children}
  </button>;
}
```

**PropTypes는 deprecated** - 새 프로젝트는 TypeScript를 사용하세요.

---

### 최종 요약

> 💡 **Props는 컴포넌트의 인터페이스**
>
> **React 2026의 핵심 변화**:
> - Server Components에서 props는 함수를 받을 수 있음
> - Client Components에서 props는 직렬화 가능해야 함
> - TypeScript가 PropTypes를 완전히 대체
> - Performance 최적화가 더 중요해짐 (RSC 직렬화 비용)
>
> **성공적인 Props 설계**:
> 1. 참조 안정성 (useMemo, useCallback)
> 2. 최소한의 데이터 전달
> 3. 명확한 타입 정의 (TypeScript)
> 4. 적절한 패턴 선택 (compound, as prop, slot)
> 5. Anti-patterns 회피
>
> **"Props는 데이터가 아니라 인터페이스다" - React 2026**
