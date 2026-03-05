import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@uiux/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/UIUX/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Badge는 상태, 카테고리, 또는 중요한 정보를 시각적으로 표시하는 작은 라벨 컴포넌트입니다.

- **variant**: 스타일 유형을 결정합니다 (contained, soft, outlined, ghost)
- **color**: 배지의 색상을 설정합니다 (blue, red, green)
- **size**: 배지의 크기를 조절합니다 (sm, md, lg)

<br>
#### **Usage**
\`\`\`tsx
import { Badge } from "@uiux/Badge"

<Badge 
  variant={"contained | soft | outlined | ghost"}
  color={"blue | red | green"}
  size={"sm | md | lg"}
>
  좋아
</Badge>

// Link Badge
<Badge asChild>
  <a href="#link">연결</a>
</Badge>
\`\`\`

#### **Contained (기본)**
배경색이 채워진 스타일로, 가장 눈에 잘 띄는 스타일입니다. 

#### **Soft**
배경색이 부드럽게 처리된 스타일로, 시각적 무게가 가벼운 스타일입니다,

#### **Outlined**
테두리만 있는 스타일로, 더 가벼운 시각적 무게를 가집니다.

#### **Ghost**
배경과 테두리 없이 텍스트 색상만 있는 스타일입니다.
        `,
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'soft', 'outlined', 'ghost'],
      description: '배지의 스타일 유형',
    },
    color: {
      control: 'select',
      options: ['blue', 'red', 'green'],
      description: '배지의 색상',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '배지의 크기',
    },
    asChild: { 
      table: { disable: true }, 
      description: '자식 요소로 렌더링 여부' 
    },
    children: {
      control: { type: 'text' },
      description: 'Badge label',
    },
  },
  args: {
    children: 'D-31',
    variant: 'contained',
    color: 'red',
    size: 'md',
    asChild: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => (
    <Badge variant={args.variant} color={args.color} size={args.size}>{args.children}</Badge>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Badge {...args}>{args.children}</Badge>
  ),
};
 