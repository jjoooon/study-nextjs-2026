import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/uiux/Button';
import { Grow,FormTable,FormRow,FormCell  } from '@/shared/components/common';
import Link from "next/link"
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

const meta: Meta<typeof Button> = {
  title: 'Components/UIUX/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
버튼은 어떤 기능이나 동작을 실행하거나 기능을 사용하기 위한 상태로 변경하는 요소이다.   
사용자가 서비스를 이용하는 과정에서 어떤 행동이 중요한지에 따라 관련된 버튼이 다양한 스타일로 표현된다.

- **기본 버튼** 방식과 **아이콘 버튼** 두가지로 크게 나누어진다. 
- 스타일로는 **contained**, **outlined**, **text**, **none**, **state**가 있다.

        `,
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text', 'none', 'state'],
      description: '버튼의 스타일 유형',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gray', 'gray-light', 'success', 'link', 'transparent'],
      description: '버튼의 색상 유형',
    },
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm', 'xs', 'icon-xs', 'icon-sm', 'icon-md', 'icon-lg', 'icon-xl'],
      description: '버튼의 크기',
    },
    // asChild는 Controls에서 숨김 처리
    asChild: { table: { disable: true }, description: '자식 요소로 렌더링 여부' },
    disabled: { control: 'boolean', description: '버튼 비활성화 여부' },
    children: {
      control: { type: 'text' },
      description: 'Button label',
    },
  },
  args: {
    children: '테스트',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    // asChild: false, // 기본값에서 제거
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <StoryWrap>
      <StoryBox>
        <Button {...args}>{args.children}</Button> 
        <Button {...args}><SearchIcon />{args.children}</Button> 
        <Button {...args}><SearchIcon /></Button> 

        <Button asChild {...args}>
          <Link href="/login">Link - {args.children}</Link>
        </Button>
      </StoryBox>
    </StoryWrap>
  ),
};

// asChild 전용 스토리
// export const AsChild: Story = {
//   args: {
//     asChild: true,
//     children: <Link href="/login">Login</Link>,
//   },
//   render: (args) => (
//     <Button asChild {...args}>
//       <Link href="/login">Link - {args.children}</Link>
//     </Button>
//   ),
// };

