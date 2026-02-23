import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from '@/shared/components/icons';
import { Button } from '@/shared/components/uiux/Button';
import { Gcol, Grow, Typo } from '@/shared/components/common';
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
- 스타일로는 **contained**, **outlined**, **text**, **none** 가 있다.

<br>
#### **기본 버튼: Usage**
\`\`\`tsx
import { Button } from "@/shared/components/uiux"

<Button 
  variant={"contained | outlined | text | none"}
  color={"primary | secondary | gray | gray-light | success | link"}
  size={"xl | lg | md | sm | xs"}
>
  //버튼이름
</Button>
\`\`\`

#### **Only 아이콘 버튼: Usage**
\`\`\`tsx
import { Button } from "@/shared/components/uiux"
import { SearchIcon } from '@/shared/components/icons';

<Button 
  variant={"contained | outlined | text | none"}
  color={"primary | secondary | gray | gray-light | success | link"}
  size={"xl | lg | md | sm | xs"}
  only="icon"
>
  <SearchIcon />
</Button>
\`\`\`

#### **Link 버튼: Usage**
\`\`\`tsx
import Link from "next/link"
import { Button } from "@/shared/components/uiux"

<Button 
  asChild
  variant={"contained | outlined | text | none"}
  color={"primary | secondary | gray | gray-light | success | link"}
  size={"xl | lg | md | sm | xs"}
>
  <Link href="/login">Login</Link>
</Button>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text', 'none'],
      description: '버튼의 스타일 유형',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gray', 'gray-light', 'success', 'link'],
      description: '버튼의 색상 유형',
    },
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md', 'sm'],
      description: '버튼의 크기',
    },
    only :{
      control: 'select',
      options: ['default', 'icon'],
      description: '특정한 조건의 유형',
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
    size: 'xl',
    only: 'default',
    // asChild: false, // 기본값에서 제거
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => (
    <StoryWrap className="flex-row items-stretch">
      <StoryBox className="w-full flex-1 justify-center">
        <Button {...args}>{args.children}</Button> 
        <Button {...args}>{args.children}<SearchIcon /></Button> 
        <Button {...args} only="icon" ><SearchIcon /></Button> 
        <Button asChild {...args}>
          <Link href="/login">Link</Link>
        </Button> 
      </StoryBox>
      <Gcol className="gap-2 shrink-0">
        <StoryBox className="w-full bg-[var(--color-gray-20)]">
          <Grow className="gap-2 " placement="bwe">
            <Grow className="flex-1 gap-1 h-[3.2rem] bg-[var(--color-gray-0)] rounded-[0.4rem] text-[var(--color-gray-100)] flex items-center justify-center">
              32
            </Grow>
            <Grow className="flex-1 gap-1 h-[2.8rem] bg-[var(--color-gray-0)] rounded-[0.4rem] text-[var(--color-gray-100)] flex items-center justify-center">
              28
            </Grow>
            <Grow className="flex-1 gap-1 h-[2.5rem] bg-[var(--color-gray-0)] rounded-[0.4rem] text-[var(--color-gray-100)] flex items-center justify-center">
              25
            </Grow>
            <Grow className="flex-1 gap-1 h-[2.2rem] bg-[var(--color-gray-0)] rounded-[0.4rem] text-[var(--color-gray-100)] flex items-center justify-center">
              22
            </Grow>
          </Grow>
        </StoryBox>
        <StoryBox className="w-full gap-4 flex-wrap flex-col">
          <Grow className="gap-2">
            <div className="w-[4rem] h-[4rem] font-bold text-[1.3rem] flex items-center justify-center text-[#fff] rounded-[0.4rem] bg-[var(--color-primary-50)]">T</div>
            <div className="w-[4rem] h-[4rem] font-bold text-[1.3rem] flex items-center justify-center text-[#fff] rounded-[0.4rem] bg-[var(--color-secondary-50)]">T</div>
            <div className="w-[4rem] h-[4rem] font-bold text-[1.3rem] flex items-center justify-center text-[#fff] rounded-[0.4rem] bg-[var(--color-gray-50)]">T</div>
            <div className="w-[4rem] h-[4rem] font-bold text-[1.3rem] flex items-center justify-center text-[#fff] rounded-[0.4rem] bg-[var(--color-gray-20)]">T</div>
            <div className="w-[4rem] h-[4rem] font-bold text-[1.3rem] flex items-center justify-center text-[#fff] rounded-[0.4rem] bg-[var(--color-success-50)]">T</div>
            <div className="w-[4rem] h-[4rem] font-bold text-[1.3rem] flex items-center justify-center text-[#fff] rounded-[0.4rem] bg-[var(--color-information-50)]">T</div>
          </Grow>
          <Grow className="gap-2">
            <div className="w-[4rem] h-[4rem] text-[1.3rem] flex items-center justify-center text-[var(--color-primary-50)] rounded-[0.4rem] border bg-[var(--color-primary-5)] border-[var(--color-primary-50)]">T</div>
            <div className="w-[4rem] h-[4rem] text-[1.3rem] flex items-center justify-center text-[var(--color-secondary-50)] rounded-[0.4rem] border bg-[var(--color-gray-0)] border-[var(--color-secondary-50)]">T</div>
            <div className="w-[4rem] h-[4rem] text-[1.3rem] flex items-center justify-center text-[var(--color-gray-100)] rounded-[0.4rem] border bg-[var(--color-gray-0)] border-[var(--color-gray-60)]">T</div>
            <div className="w-[4rem] h-[4rem] text-[1.3rem] flex items-center justify-center text-[var(--color-gray-100)] rounded-[0.4rem] border bg-[var(--color-gray-0)] border-[var(--color-gray-20)]">T</div>
            <div className="w-[4rem] h-[4rem] text-[1.3rem] flex items-center justify-center text-[var(--color-success-50)] rounded-[0.4rem] border bg-[var(--color-success-5)] border-[var(--color-success-50)]">T</div>
            <div className="w-[4rem] h-[4rem] text-[1.3rem] flex items-center justify-center text-[var(--color-information-50)] rounded-[0.4rem] border bg-[var(--color-information-5)] border-[var(--color-information-50)]">T</div>
          </Grow>
        </StoryBox>
      </Gcol>
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

