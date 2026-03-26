# React 교육 문서

## 📚 목차

### 6. 스타일링
- [6.1 리액트 스타일링 방법](#61-리액트-스타일링-방법)
- [6.2 CSS 스코프 문제와 해결 방법](#62-css-스코프-문제와-해결-방법)

---

## 6. 스타일링

## 6.1 리액트 스타일링 방법

React 컴포넌트에 스타일을 적용하는 다양한 방법을 알아봅시다. 각 방법마다 장단점이 있으니 상황에 맞게 선택하는 것이 중요합니다.

---

### 인라인 스타일 (Inline Styles)

React 요소에 직접 스타일 객체를 전달하는 방식입니다.

#### 기본 문법

```jsx
function Button() {
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return <button style={buttonStyle}>클릭</button>;
}
```

#### 직접 스타일 객체 전달

```jsx
function Header() {
  return (
    <h1 style={{
      color: 'darkblue',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '20px 0'
    }}>
      제목
    </h1>
  );
}
```

#### 동적 인라인 스타일

```jsx
function Alert({ type }) {
  const getAlertStyle = (type) => {
    const styles = {
      success: {
        backgroundColor: '#4CAF50',
        color: 'white'
      },
      error: {
        backgroundColor: '#f44336',
        color: 'white'
      },
      warning: {
        backgroundColor: '#ff9800',
        color: 'white'
      },
      info: {
        backgroundColor: '#2196F3',
        color: 'white'
      }
    };

    return styles[type] || styles.info;
  };

  return (
    <div style={getAlertStyle(type)}>
      {type} 메시지
    </div>
  );
}
```

#### 장점과 단점

| 장점 | 단점 |
|------|------|
| ✅ 컴포넌트에 스타일이 캡슐화 | ❌ CSS 기능 제한 (가상 클래스 불가) |
| ✅ 동적 스타일링 쉬움 | ❌ 코드 가독성 저하 |
| ✅ 별도 CSS 파일 불필요 | ❌ 미디어 쿼리 어려움 |
| ✅ 충돌 걱정 없음 | ❌ 유지보수 어려움 |

**사용 추천 상황:**
- 동적으로 계산되는 스타일
- 컴포넌트에 고유한 작은 스타일
- 프로토타이ping 또는 빠른 개발

---

### CSS 클래스로 스타일링

전통적인 CSS 파일을 import하여 사용하는 방식입니다.

#### CSS 파일 작성

```css
/* styles/Button.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: darkblue;
}

.button:active {
  transform: scale(0.98);
}

.button-large {
  padding: 15px 30px;
  font-size: 18px;
}

.button-small {
  padding: 5px 10px;
  font-size: 14px;
}
```

#### React 컴포넌트에서 사용

```jsx
import './Button.css';

function Button({ size, children }) {
  return (
    <button className={`button ${size === 'large' ? 'button-large' : size === 'small' ? 'button-small' : ''}`}>
      {children}
    </button>
  );
}
```

#### 여러 클래스 결합

```jsx
function Card({ isActive, isFeatured }) {
  const classes = [
    'card',
    isActive && 'card-active',
    isFeatured && 'card-featured'
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>카드 내용</div>;
}
```

#### clsx 또는 classnames 라이브러리 사용

```jsx
import clsx from 'clsx';

function Button({ variant, size, fullWidth }) {
  return (
    <button className={clsx(
      'button',
      `button-${variant}`,
      `button-${size}`,
      fullWidth && 'button-fullwidth'
    )}>
      버튼
    </button>
  );
}
```

#### 장점과 단점

| 장점 | 단점 |
|------|------|
| ✅ 전통적인 CSS 방식 | ❌ 전역 네임스페이스 |
| ✅ 모든 CSS 기능 사용 가능 | ❌ 스코프 충돌 위험 |
| ✅ 미디어 쿼리, 애니메이션 쉬움 | ❌ 컴포넌트와 분리 |
| ✅ 익숙하고 접근 쉬움 | ❌ 빌드 타임 최적화 어려움 |

**사용 추천 상황:**
- 전역 스타일 (리셋, 테마)
- 복잡한 애니메이션
- 미디어 쿼리가 필요한 반응형 디자인

---

### 동적 스타일링 (Dynamic Styling)

State나 Props에 따라 스타일을 동적으로 변경합니다.

#### 인라인 스타일로 동적 변경

```jsx
function ProgressBar({ progress }) {
  return (
    <div style={{
      width: '100%',
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        backgroundColor: progress > 80 ? '#4CAF50' : progress > 50 ? '#ff9800' : '#f44336',
        transition: 'width 0.3s ease'
      }}>
        {progress}%
      </div>
    </div>
  );
}
```

#### 클래스로 동적 변경

```jsx
function Toggle({ isOn }) {
  return (
    <div className={isOn ? 'toggle on' : 'toggle off'}>
      <div className="toggle-slider" />
    </div>
  );
}

/* CSS */
.toggle {
  width: 50px;
  height: 26px;
  background-color: #ccc;
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle.on {
  background-color: #4CAF50;
}

.toggle-slider {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: left 0.3s;
}

.toggle.on .toggle-slider {
  left: 27px;
}
```

#### CSS 변수로 동적 변경

```jsx
function ThemeableCard({ primaryColor }) {
  return (
    <div style={{ '--primary-color': primaryColor }}>
      <h2>카드 제목</h2>
      <p>카드 내용</p>
    </div>
  );
}

/* CSS */
h2 {
  color: var(--primary-color);
}

.button {
  background-color: var(--primary-color);
}
```

#### 스타일 객체 계산

```jsx
function ResponsiveBox({ width, height, color }) {
  const boxStyle = {
    width: width || '100%',
    height: height || 'auto',
    backgroundColor: color || 'gray',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  };

  return <div style={boxStyle}>반응형 박스</div>;
}
```

---

### 조건부 스타일링 (Conditional Styling)

조건에 따라 다른 스타일을 적용합니다.

#### 삼항 연산자로 조건부 스타일

```jsx
function Status({ status }) {
  return (
    <span style={{
      padding: '5px 10px',
      borderRadius: '5px',
      backgroundColor: status === 'active' ? '#4CAF50' :
                       status === 'pending' ? '#ff9800' :
                       status === 'error' ? '#f44336' : '#9e9e9e',
      color: 'white'
    }}>
      {status}
    </span>
  );
}
```

#### && 연산자로 조건부 클래스

```jsx
function Button({ isDisabled, isLoading }) {
  return (
    <button className={`
      base-button
      ${isDisabled && 'disabled'}
      ${isLoading && 'loading'}
    `}>
      {isLoading ? '로딩 중...' : '버튼'}
    </button>
  );
}
```

#### 객체로 스타일 매핑

```jsx
function Alert({ type }) {
  const alertStyles = {
    success: {
      backgroundColor: '#4CAF50',
      color: 'white',
      icon: '✓'
    },
    error: {
      backgroundColor: '#f44336',
      color: 'white',
      icon: '✕'
    },
    warning: {
      backgroundColor: '#ff9800',
      color: 'white',
      icon: '⚠'
    },
    info: {
      backgroundColor: '#2196F3',
      color: 'white',
      icon: 'ⓘ'
    }
  };

  const style = alertStyles[type] || alertStyles.info;

  return (
    <div style={style}>
      {style.icon} {type} 메시지
    </div>
  );
}
```

#### 여러 조건 결합

```jsx
function TextBox({ isValid, isTouched, isFocused }) {
  const getBorderStyle = () => {
    if (!isValid && isTouched) return '2px solid red';
    if (isFocused) return '2px solid blue';
    return '1px solid gray';
  };

  return (
    <input
      type="text"
      style={{
        border: getBorderStyle(),
        outline: 'none',
        padding: '8px',
        borderRadius: '4px'
      }}
    />
  );
}
```

#### 함수로 스타일 계산

```jsx
function Button({ variant, size }) {
  const getButtonStyle = () => {
    const baseStyle = {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    };

    const variantStyles = {
      primary: {
        backgroundColor: '#2196F3',
        color: 'white'
      },
      secondary: {
        backgroundColor: '#757575',
        color: 'white'
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#2196F3',
        border: '2px solid #2196F3'
      }
    };

    const sizeStyles = {
      small: {
        padding: '5px 10px',
        fontSize: '14px'
      },
      medium: {
        padding: '10px 20px',
        fontSize: '16px'
      },
      large: {
        padding: '15px 30px',
        fontSize: '18px'
      }
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...sizeStyles[size]
    };
  };

  return <button style={getButtonStyle()}>버튼</button>;
}
```

---

### 스타일 합성 (Style Composition)

여러 스타일을 결합하여 재사용 가능한 스타일 시스템을 만듭니다.

#### 기본 스타일 정의

```jsx
// styles/common.js
export const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export const cardBase = {
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  backgroundColor: 'white'
};

export const buttonBase = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};
```

#### 스타일 합성 사용

```jsx
import { flexCenter, cardBase } from './styles/common';

function Card({ children }) {
  return (
    <div style={{ ...flexCenter, ...cardBase }}>
      {children}
    </div>
  );
}
```

#### 스타일 유틸리티 함수

```jsx
function mergeStyles(...styles) {
  return Object.assign({}, ...styles);
}

function Button({ variant, size }) {
  const baseStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const variantStyle = {
    primary: { backgroundColor: '#2196F3', color: 'white' },
    secondary: { backgroundColor: '#757575', color: 'white' }
  };

  const sizeStyle = {
    small: { fontSize: '14px' },
    large: { fontSize: '18px' }
  };

  return (
    <button style={mergeStyles(
      baseStyle,
      variantStyle[variant],
      sizeStyle[size]
    )}>
      버튼
    </button>
  );
}
```

---

### 테마 스타일링 (Theming)

일관된 디자인 시스템을 위한 테마 적용 방법입니다.

#### 테마 객체 정의

```jsx
// theme.js
export const theme = {
  colors: {
    primary: '#2196F3',
    secondary: '#757575',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196F3',
    background: '#ffffff',
    text: '#333333'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  fonts: {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '24px'
  }
};
```

#### 테마 사용

```jsx
import { theme } from './theme';

function ThemedButton({ variant }) {
  return (
    <button style={{
      backgroundColor: theme.colors[variant],
      color: 'white',
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.fonts.medium
    }}>
      버튼
    </button>
  );
}
```

#### Context로 테마 공급

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

function ThemeProvider({ theme, children }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
}

// 사용
function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <ThemedComponent />
    </ThemeProvider>
  );
}
```

---

### 요약

#### 스타일링 방법 비교

| 방법 | 장점 | 단점 | 추천 상황 |
|------|------|------|----------|
| **인라인 스타일** | 동적 스타일링 쉬움 | CSS 기능 제한 | 동적 값, 프로토타이핑 |
| **CSS 클래스** | 전통적, 모든 기능 | 전역 충돌 위험 | 전역 스타일, 복잡한 애니메이션 |
| **CSS Modules** | 스코프 보장 | 빌드 설정 필요 | 컴포넌트 스코프 스타일 |
| **CSS-in-JS** | 동적 스타일링 강력 | 런타임 오버헤드 | 복잡한 동적 스타일 |
| **유틸리티 우선** | 빠른 개발 | HTML 비대해짐 | 빠른 프로토타이핑 |

#### 선택 가이드

```
스타일링 방법 선택:

1. 동적 스타일이 많은가?
   → YES: CSS-in-JS 또는 인라인 스타일

2. 컴포넌트 스코프가 필요한가?
   → YES: CSS Modules 또는 CSS-in-JS

3. 빠른 개발이 필요한가?
   → YES: 유틸리티 우선 (Tailwind CSS)

4. 전역 스타일이 많은가?
   → YES: 일반 CSS 또는 CSS Modules

5. 팀 규모가 큰가?
   → YES: CSS-in-JS (컴포넌트당 스타일 캡슐화)
```

#### 모벨 사례

1. **작은 컴포넌트**: 인라인 스타일 또는 CSS Modules
2. **대형 프로젝트**: CSS-in-JS 또는 Tailwind CSS
3. **디자인 시스템**: 테마 객체 + 유틸리티
4. **전역 스타일**: 별도 CSS 파일
5. **동적 스타일**: 인라인 스타일 또는 CSS 변수

---

## 6.2 CSS 스코프 문제와 해결 방법

전통적인 CSS는 전역 네임스페이스를 사용하기 때문에, 큰 프로젝트에서는 스타일 충돌 문제가 발생합니다. React에서 이 문제를 해결하는 다양한 방법을 알아봅시다.

---

### CSS 스코프 문제 이해하기

#### 전역 CSS의 문제

```css
/* Button.css */
.button {
  background-color: blue;
  color: white;
}

/* Header.css */
.button {
  background-color: red;
  color: yellow;
}
```

두 CSS 파일을 모두 import하면 나중에 import된 파일의 스타일이 적용됩니다. 이는 예상치 못한 버그를 초래할 수 있습니다.

#### 스타일 충돌 예시

```jsx
// components/Button.js
import './Button.css';

function Button() {
  return <button className="button">클릭</button>;
}

// components/Header.js
import './Header.css';

function Header() {
  return <button className="button">헤더 버튼</button>;
}

// App.js
import { Button } from './components/Button';
import { Header } from './components/Header';

function App() {
  return (
    <div>
      <Header />  {/* Header.css가 import됨 */}
      <Button />  {/* Button.css가 import됨, Header.css 스타일 덮어씀 */}
    </div>
  );
}
```

**문제점:**
- 같은 `.button` 클래스가 서로 충돌
- 어느 컴포넌트가 영향을 받는지 추적 어려움
- 리팩토링 시 예상치 못한 사이드 이펙트

---

### BEM (Block Element Modifier)

명명 규칙으로 스코프 문제를 해결하는 전통적인 방법입니다.

#### BEM 기본 규칙

```
.block {}                   /* Block */
.block__element {}          /* Element */
.block--modifier {}         /* Modifier */
.block__element--modifier {}  /* Element + Modifier */
```

#### BEM 예시

```css
/* Card 컴포넌트 */
.card {}
.card__header {}
.card__body {}
.card__footer {}
.card--featured {}
.card--disabled {}
.card__header--highlighted {}

/* Button 컴포넌트 */
.button {}
.button__icon {}
.button__text {}
.button--primary {}
.button--large {}
.button--disabled {}
```

#### React에서 BEM 사용

```jsx
function Card({ featured, disabled }) {
  const classes = [
    'card',
    featured && 'card--featured',
    disabled && 'card--disabled'
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="card__header card__header--highlighted">
        제목
      </div>
      <div className="card__body">
        내용
      </div>
      <div className="card__footer">
        푸터
      </div>
    </div>
  );
}
```

#### BEM 장단점

| 장점 | 단점 |
|------|------|
| ✅ 네이밍 규칙으로 충돌 방지 | ❌ 클래스 이름이 길어짐 |
| ✅ 명확한 구조 | ❌ 작성하기 번거로움 |
| ✅ 예측 가능한 클래스 | ❌ 리팩토링 시 클래스 이름 변경 |
| ✅ 별도 도구 불필요 | ❌ 일관성 유지가 어려움 |

---

### CSS Modules

CSS 파일에 자동으로 고유한 클래스 이름을 생성하여 스코프를 격리합니다.

#### CSS Modules 사용법

```css
/* Button.module.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: darkblue;
}

.buttonPrimary {
  background-color: #2196F3;
}

.buttonLarge {
  padding: 15px 30px;
  font-size: 18px;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button({ variant, size, children }) {
  const classes = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    size === 'large' && styles.buttonLarge
  ].filter(Boolean).join(' ');

  return (
    <button className={classes}>
      {children}
    </button>
  );
}
```

#### 컴파일 결과

```jsx
// CSS Modules가 생성하는 고유한 클래스
import styles from './Button.module.css';

// 실제 HTML
<button class="Button_button__abc123 Button_buttonPrimary__def456">
  버튼
</button>
```

#### 여러 클래스 결합

```jsx
import styles from './Card.module.css';

function Card({ featured, disabled }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.header} ${featured ? styles.headerFeatured : ''}`}>
        제목
      </div>
      <div className={styles.body}>
        내용
      </div>
    </div>
  );
}
```

#### 장단점

| 장점 | 단점 |
|------|------|
| ✅ 자동 스코프 격리 | ❌ 빌드 설정 필요 |
| ✅ 일반 CSS 문법 | ❌ 동적 스타일 제한 |
| ✅ 컴포넌트당 스타일 파일 | ❌ 글로벌 스타일 어려움 |
| ✅ IDE 자동완성 지원 | ❌ 클래스 이름이 길어짐 |

---

### Tailwind CSS

유틸리티 우선 CSS 프레임워크로 빠른 스타일링을 지원합니다.

#### Tailwind CSS 설치

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 설정 파일

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### CSS에 Tailwind 추가

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 기본 사용법

```jsx
function Button() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      버튼
    </button>
  );
}
```

#### 동적 클래스

```jsx
function Button({ variant, size, disabled }) {
  return (
    <button className={`
      ${variant === 'primary' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-700'}
      ${size === 'large' ? 'py-3 px-6 text-lg' : 'py-2 px-4'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      text-white font-bold rounded transition
    `}>
      버튼
    </button>
  );
}
```

#### clsx와 함께 사용

```jsx
import clsx from 'clsx';

function Alert({ type, onClose }) {
  const alertStyles = {
    success: 'bg-green-100 text-green-800 border-green-400',
    error: 'bg-red-100 text-red-800 border-red-400',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
    info: 'bg-blue-100 text-blue-800 border-blue-400'
  };

  return (
    <div className={clsx(
      'border-l-4 p-4 rounded',
      alertStyles[type]
    )}>
      <div className="flex">
        <div className="flex-1">
          {type} 메시지
        </div>
        <button onClick={onClose} className="ml-4">
          ✕
        </button>
      </div>
    </div>
  );
}
```

#### 반응형 디자인

```jsx
function Card() {
  return (
    <div className="
      bg-white
      p-4 sm:p-6 md:p-8 lg:p-12
      text-sm sm:text-base md:text-lg lg:text-xl
      w-full sm:w-2/3 md:w-1/2 lg:w-1/3
    ">
      반응형 카드
    </div>
  );
}
```

#### 커스텀 설정

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2196F3',
        secondary: '#757575',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

#### 장단점

| 장점 | 단점 |
|------|------|
| ✅ 빠른 개발 속도 | ❌ HTML이 비대해짐 |
| ✅ 일관된 디자인 시스템 | ❌ 학습 곡선 |
| ✅ 커스터마이징 쉬움 | ❌ PurgeCSS 설정 필요 |
| ✅ 반응형 디자인 쉬움 | ❌ 복잡한 컴포넌트 스타일 제한 |
| ✅ 스코프 문제 없음 | ❌ 클래스 이름 암기 필요 |

---

### CSS-in-JS (Styled Components)

JavaScript 안에서 CSS를 작성하는 방식입니다.

#### Styled Components 설치

```bash
npm install styled-components
```

#### 기본 사용법

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function App() {
  return <Button>클릭</Button>;
}
```

#### props 기반 스타일링

```jsx
const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? '#2196F3' : '#757575'};
  color: white;
  padding: ${props => props.size === 'large' ? '15px 30px' : '10px 20px'};
  font-size: ${props => props.size === 'large' ? '18px' : '16px'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background-color: ${props => props.variant === 'primary' ? '#1976D2' : '#616161'};
  }
`;

// 사용
<Button variant="primary" size="large" disabled={false}>
  버튼
</Button>
```

#### 컴포넌트 확장

```jsx
const BaseButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #2196F3;
  color: white;

  &:hover {
    background-color: #1976D2;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: #757575;
  color: white;

  &:hover {
    background-color: #616161;
  }
`;
```

#### 전역 스타일

```jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: #f5f5f5;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <YourComponents />
    </>
  );
}
```

#### 테마 지원

```jsx
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#2196F3',
    secondary: '#757575',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, sans-serif',
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemedButton />
    </ThemeProvider>
  );
}

const ThemedButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-family: ${props => props.theme.fonts.body};
`;
```

#### 장단점

| 장점 | 단점 |
|------|------|
| ✅ 진정한 스코프 격리 | ❌ 런타임 오버헤드 |
| ✅ 동적 스타일링 강력 | ❌ 빌드 시간 증가 |
| ✅ props 기반 스타일링 | ❌ 서버 사이드 렌더링 복잡 |
| ✅ 자동 벤더 프리픽스 | ❌ 러닝 커브 |
| ✅ 테마 지원 | ❌ 번들 크기 증가 |

---

### 방법별 비교 및 추천

#### 프로젝트 규모별 추천

```
소규모 프로젝트 (1-3개인):
→ Tailwind CSS 또는 일반 CSS + BEM

중규모 프로젝트 (3-10개인):
→ CSS Modules 또는 Tailwind CSS

대규모 프로젝트 (10+ 개인):
→ CSS-in-JS (Styled Components) 또는 Tailwind CSS
```

#### 요구사항별 추천

| 요구사항 | 추천 방법 | 이유 |
|----------|----------|------|
| **빠른 프로토타이핑** | Tailwind CSS | 빠른 개발 속도 |
| **강력한 동적 스타일링** | CSS-in-JS | props 기반 스타일링 |
| **최소 런타임 오버헤드** | CSS Modules | 컴파일 타임 처리 |
| **디자인 시스템** | Tailwind CSS 또는 CSS-in-JS | 일관된 유틸리티 |
| **기존 CSS 마이그레이션** | CSS Modules | 기존 CSS 활용 |
| **서버 사이드 렌더링** | CSS Modules 또는 Tailwind CSS | 최소 런타임 오버헤드 |

#### 성능 비교

| 방법 | 번들 크기 | 런타임 성능 | 빌드 시간 |
|------|----------|------------|----------|
| **일반 CSS** | 작음 | 빠름 | 빠름 |
| **CSS Modules** | 작음 | 빠름 | 보통 |
| **Tailwind CSS** | 작음 (Purge 후) | 빠름 | 느림 |
| **Styled Components** | 큼 | 느림 | 느림 |

---

### 요약

#### 스코프 문제 해결 방법 비교

| 방법 | 스코프 처리 | 동적 스타일 | 학습 곡선 | 추천 상황 |
|------|------------|------------|----------|----------|
| **BEM** | 네이밍 규칙 | 어려움 | 낮음 | 레거시 프로젝트 |
| **CSS Modules** | 자동 격리 | 제한적 | 낮음 | 일반적인 프로젝트 |
| **Tailwind CSS** | 유틸리티 클래스 | 쉬움 | 중간 | 빠른 개발, 디자인 시스템 |
| **Styled Components** | 완전 격리 | 매우 쉬움 | 높음 | 복잡한 동적 스타일 |

#### 선택 가이드

```
스타일링 전략 선택:

1. 팀 크기와 경험
   - 소규모/초보자: Tailwind CSS
   - 대규모/경험자: CSS-in-JS 또는 Tailwind CSS

2. 프로젝트 요구사항
   - 빠른 개발: Tailwind CSS
   - 동적 스타일: CSS-in-JS
   - 성능 중시: CSS Modules

3. 유지보수 고려
   - 일관성: Tailwind CSS
   - 캡슐화: CSS-in-JS
   - 전통적: CSS Modules
```

#### 모벨 사례

1. **작은 프로젝트**: Tailwind CSS (빠른 개발)
2. **중간 프로젝트**: CSS Modules (균형 잡힌 접근)
3. **대형 프로젝트**: CSS-in-JS (강력한 기능)
4. **디자인 시스템**: Tailwind CSS (일관된 유틸리티)
5. **레거시 마이그레이션**: CSS Modules (기존 CSS 활용)

#### 주의 사항

```jsx
// ❌ 나쁜 예시: 전역 CSS로 인한 충돌
import './button.css';
import './header.css';  // .button 클래스 덮어씀

// ✅ 좋은 예시: CSS Modules로 스코프 격리
import styles from './Button.module.css';
<button className={styles.button}>클릭</button>

// ✅ 좋은 예시: Tailwind CSS로 빠른 스타일링
<button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
  클릭
</button>

// ✅ 좋은 예시: Styled Components로 동적 스타일링
const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? 'blue' : 'gray'};
`;
```
