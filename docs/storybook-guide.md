# 스토리북 컴포넌트 문서화 가이드 (Storybook Component Doc Guide)

이 가이드는 프로젝트 내 공통 및 피처 컴포넌트를 개발하고 스토리북에 등록할 때, 일관된 양식의 설명서를 빠르게 구성하고 Prop 값을 깔끔하게 자동 문서화하기 위해 준수해야 할 규칙을 정의합니다.

---

## 1. 문서화 기본 원칙

우리 프로젝트는 **"JSDoc 주석을 통한 자동화"**와 **"StoryDocTemplate 공통 레이아웃"**을 조합하여 문서를 작성합니다.

1. **JSDoc 자동 문서화**: 컴포넌트 Props의 설명(`description`)을 스토리북 파일에 하드코딩하지 않습니다. 대신, 컴포넌트 파일(`*.tsx`)의 TypeScript interface 필드 및 컴포넌트 선언 위에 JSDoc 주석을 작성합니다. 스토리북이 이를 자동으로 파싱하여 Controls 영역과 문서의 설명 영역에 노출합니다.
2. **통일된 레이아웃 (`StoryDocTemplate`)**: 스토리북 파일의 `docs.page` 파라미터에 공통 문서 템플릿 컴포넌트를 주입하여 모든 컴포넌트 문서가 동일한 위계와 디자인(History, Overview, Playground, Usage, Features 등)을 갖도록 합니다.

---

## 2. 컴포넌트 파일 JSDoc 작성 규칙 (Prop 정리)

컴포넌트 파일 내에 작성하는 interface와 컴포넌트 본체 위에 아래 형식의 JSDoc을 충실히 기입합니다.

```tsx
/**
 * 1. 컴포넌트 선언 바로 위: 이 컴포넌트가 어떤 역할을 하는지 상세 기술합니다.
 * 이 설명은 스토리북 최상단 개요 영역에 자동 연동될 수 있습니다.
 */
export const MyComponent = ({ variant = 'default', disabled = false, children }: MyComponentProps) => {
  // ...
};

/**
 * 2. Props interface 정의부
 */
export interface MyComponentProps {
  /** 
   * 버튼 안에 렌더링될 자식 노드입니다.
   */
  children?: React.ReactNode;
  
  /**
   * 버튼의 스타일 종류
   * - `default`: 기본 검정색 버튼
   * - `primary`: 주요 강조용 브랜드 컬러 버튼
   * - `danger`: 경고/삭제용 빨간색 버튼
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'danger';

  /**
   * 활성화 여부
   * @default false
   */
  disabled?: boolean;
}
```

### JSDoc 태그 팁
- `@default`: Props의 기본값을 표시합니다. 스토리북 Controls의 'Default' 열에 자동으로 렌더링됩니다.
- 한 줄 설명 보다는, 다른 운영 개발자가 prop의 용도를 오해하지 않도록 구체적인 설명과 각 옵션별 의미를 리스트 형태로 적어주는 것이 좋습니다.

---

## 3. `StoryDocTemplate`을 이용한 스토리 파일 구성

모든 컴포넌트 스토리는 일관된 UI 구성을 위해 `StoryDocTemplate`을 적용합니다. 이 컴포넌트는 `Badge.stories.tsx`에서 수작업으로 마크업한 구조를 공통 템플릿으로 추상화한 것입니다.

### 템플릿 컴포넌트 속성 (Props)
- `title` (string, 선택): 컴포넌트 이름 (예: `'Badge'`). 기본 타이틀 영역 및 안내 문구에 활용됩니다.
- `history` (string[], 필수): 변경 이력 연도를 나열합니다. `['2026.03.30']` 형태로 날짜만 기재합니다.
- `overview` (string, 필수): 컴포넌트가 담당하는 기능과 주의사항 등을 요약 기술합니다.
- `usageItems` (string[], 선택): 사용 방법의 리스트 안내 항목입니다. `['기본 상태 표시', 'variant + color 조합']` 형태로 작성합니다.
- `usageCode` (string, 선택): 마크다운으로 렌더링될 예제 코드 블록입니다. 빽틱(\`\`\`) 없이 코드 내용만 기재합니다.
- `apiReference` (ApiReferenceItem[], 선택): 주요 Prop들을 테이블 형식으로 나타냅니다. `[{ prop: 'variant', type: "'contained' | 'soft'", description: '배지 스타일' }]` 형태로 작성합니다.
- `children` (ReactNode, 선택): 추가적인 개별 변형 예시나 예외 상황에 대한 수동 UI 프리뷰(예: `Unstyled`를 사용한 배치)를 나타낼 때 사용합니다.

---

## 4. 표준 스토리북 템플릿 (보일러플레이트)

새로운 컴포넌트 스토리북 파일을 추가할 때 아래 코드를 복사해서 뼈대로 사용하십시오.

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { MyComponent } from '@common/MyComponent'; // 대상 컴포넌트 경로에 맞게 수정
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate'; // StoryDocTemplate 공통 템플릿 임포트
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/Common/MyComponent', // 스토리북 내 메뉴 카테고리 위치
  component: MyComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="MyComponent"
          overview={`MyComponent는 특정 역할을 처리하기 위해 설계된 공통 컴포넌트입니다.
여러 행에 걸쳐 중요한 주의 사항이나 디자인 제약을 적을 수 있습니다.`}
          history={['2026.06.13']}
          usageItems={['기본 사용법', '다양한 스타일링 옵션 적용']}
          usageCode={`
import { MyComponent } from '@common/MyComponent';

<MyComponent variant="primary" disabled={false}>
  버튼 텍스트
</MyComponent>
          `}
          apiReference={[
            { prop: 'variant', type: "'default' | 'primary' | 'danger'", description: '버튼의 스타일 종류' },
            { prop: 'disabled', type: 'boolean', description: '활성화 여부' },
          ]}
        />
      ),
    },
  },
  argTypes: {
    // Controls 탭에서 카테고리를 분리하고 싶다면 아래와 같이 묶어줍니다.
    variant: {
      control: 'inline-radio',
      options: ['default', 'primary', 'danger'],
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Status' },
    },
  },
  args: {
    variant: 'default',
    disabled: false,
    children: '버튼 텍스트',
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  render: (args) => {
    return <MyComponent {...args} />;
  },
};
```
