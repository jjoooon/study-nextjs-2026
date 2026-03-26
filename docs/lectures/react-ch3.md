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

#### PropTypes (JavaScript)

```jsx
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

### 요약

#### Children Props

| 패턴 | 용도 |
|------|------|
| **기본 children** | 컴포넌트 내용 전달 |
| **여러 slots** | header, sidebar, main 등 분리 |
| **Render Props** | children으로 함수 전달 |
| **조건부 렌더링** | isOpen, isVisible 등으로 제어 |

#### Props 필요성 판단

```
✅ Props 필요:
- 외부 데이터를 받아야 할 때
- 다양하게 재사용되어야 할 때
- 동작을 커스터마이즈해야 할 때

❌ Props 불필요:
- 정적 콘텐츠
- 고정된 레이아웃
- 자체 상태만 관리
```

#### Props 관리 모범 사례

1. **구조 분해 사용**: `function Component({ prop1, prop2 })`
2. **관련 props 그룹화**: `{{ user, location }}`
3. **전개 연산자 활용**: `{...props}`
4. **플래그 props 최소화**: `variant`로 통합
5. **Prop Drilling 피하기**: Context 또는 상태 관리 사용

#### 핵심 takeaways

> 💡 **Props는 컴포넌트의 인터페이스**
>
> - 잘 설계된 props = 재사용 가능한 컴포넌트
> - 과도한 props = 리팩토링 필요 신호
> - Props drilling 3계층 이상 = Context/Store 고려
>
> **"Props는 데이터가 아니라 인터페이스다"**
