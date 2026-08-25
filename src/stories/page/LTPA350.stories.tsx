/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import LTPA350, { LTPA350PageProps } from '@/app/pub/ispl/pages/LTPA350';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof LTPA350> = {
  title: 'app/page/LTPA350',
  component: LTPA350,
  argTypes: {
    memoButtonColor: {
      control: 'radio',
      options: ['gray', 'primary'],
      description: '상단 타이틀 영역 메모 버튼 색상 스타일 (gray: 회색, primary: 파란색/주색)',
      table: {
        type: { summary: "'gray' | 'primary'" },
        defaultValue: { summary: 'gray' },
      },
    },
  },
  args: {
    memoButtonColor: 'gray',
  },
};

export default meta;
type Story = StoryObj<typeof LTPA350>;

export const Default: Story = {
  render: (args = {}) => (
    <LayoutDoc>
      <LTPA350 {...args} />
    </LayoutDoc>
  ),
};
