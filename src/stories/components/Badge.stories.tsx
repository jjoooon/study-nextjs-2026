import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo, FormTable, FormCell, FormItem } from '@/shared/components/common';
import { TableRow } from '@/shared/components/uiux';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';
import { Badge } from '@/shared/components/uiux/Badge';

type BadgeStoryProps = React.ComponentProps<typeof Badge>;

const meta: Meta<BadgeStoryProps> = {
  title: 'Components/UIUX/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Badge는 상태, 분류, 개수, 강조 정보를 짧고 명확하게 표시하는 컴포넌트이다.
목록/카드/폼 등 다양한 UI에서 텍스트 라벨을 일관된 스타일로 표현할 수 있다.

- **variant**로 기본 스타일을 제어할 수 있다.
- **color**로 프로젝트 토큰 기반 색상(blue/red/green/orange)을 적용할 수 있다.

---

<br>
#### **기본 Badge: Usage**
\`\`\`tsx
import { Badge } from '@/shared/components/uiux/Badge';

<Badge
  variant={"default | secondary | destructive | outline | success | warning"}
  color={"blue | red | green | orange"}
  className="custom-class"
>
  Label
</Badge>
\`\`\`

<br>
#### **asChild Badge: Usage**
\`\`\`tsx
import { Badge } from '@/shared/components/uiux/Badge';

<Badge asChild>
  <a href="#">링크 배지</a>
</Badge>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning'],
      description: '배지 스타일 유형',
      table: {
        category: 'Appearance',
        type: { summary: 'default | secondary | destructive | outline | success | warning' },
      },
    },
    color: {
      control: 'select',
      options: ['blue', 'red', 'green', 'orange'],
      description: '커스텀 색상 토큰',
      table: {
        category: 'Appearance',
        type: { summary: 'blue | red | green | orange' },
      },
    },
    asChild: {
      control: 'boolean',
      description: '자식 엘리먼트를 루트로 사용 여부',
      table: { category: 'Behavior' },
    },
    children: {
      control: 'text',
      description: '배지 텍스트',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: '추가 Tailwind/CSS 클래스',
      table: { category: 'Appearance' },
    },
    style: { table: { disable: true } },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트',
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'default',
    color: undefined,
    asChild: false,
    children: 'Badge Label',
    className: '',
  },
};

export default meta;
type Story = StoryObj<BadgeStoryProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <Badge {...args}>{args.children}</Badge>
        </StoryBox>

        <StoryBox>
          <Grow placement="cc" className="gap-4">
            <Gcol placement="ss" className="gap-[0.4rem]">
              <div className="flex flex-row flex-wrap gap-2">
                <Badge variant="default">default</Badge>
                <Badge variant="secondary">secondary</Badge>
                <Badge variant="destructive">destructive</Badge>
                <Badge variant="outline">outline</Badge>
                <Badge variant="success">success</Badge>
                <Badge variant="warning">warning</Badge>
              </div>
            </Gcol>

            <Gcol placement="ss" className="gap-[0.4rem]">
              <div className="flex flex-row flex-wrap gap-2">
                <Badge color="blue">blue</Badge>
                <Badge color="red">red</Badge>
                <Badge color="green">green</Badge>
                <Badge color="orange">orange</Badge>
              </div>
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div className="flex flex-row flex-wrap gap-2">
        <Badge variant="default">default</Badge>
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="destructive">destructive</Badge>
        <Badge variant="outline">outline</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
      </div>
    );
  },
};

export const Colors: Story = {
  render: () => {
    return (
      <div className="flex flex-row flex-wrap gap-2">
        <Badge color="blue">blue</Badge>
        <Badge color="red">red</Badge>
        <Badge color="green">green</Badge>
        <Badge color="orange">orange</Badge>
      </div>
    );
  },
};

export const AsChild: Story = {
  args: {
    asChild: true,
  },
  render: () => {
    return (
      <Badge asChild>
        <a href="#" aria-label="badge link">
          링크 배지
        </a>
      </Badge>
    );
  },
};

export const Form: Story = {
  render: () => {
    return (
      <FormTable variant="boxIn" caption="가입 상태" cols={['w-[10rem] min-w-[10rem]', '']}>
        <TableRow>
          <FormCell title="진행 상태">
            <FormItem>
              <div className="flex flex-row flex-wrap gap-2">
                <Badge color="blue">접수</Badge>
                <Badge color="orange">심사중</Badge>
                <Badge color="green">승인</Badge>
                <Badge color="red">반려</Badge>
              </div>
            </FormItem>
          </FormCell>
        </TableRow>
      </FormTable>
    );
  },
};
