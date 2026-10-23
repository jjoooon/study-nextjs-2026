/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import Ltpz084 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz084';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz084> = {
  title: 'app/popup/LTPZ084',
  component: Ltpz084,
  argTypes: {
    isSubmitted: {
      name: '답변내용 저장 후',
      control: 'boolean',
      description: '저장 버튼 클릭 후 상태 (true 시 미선택 항목이 danger 배지와 - 로 표시)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    isSubmitted: false,
  },
};
export default meta;
type Story = StoryObj<typeof Ltpz084>;

export const Default: Story = {
  render: (args = {}) => (
    <LayoutDoc>
      <Ltpz084 {...args} />
    </LayoutDoc>
  ),
};

export const AnswerSaved: Story = {
  name: '답변내용 저장 후',
  args: {
    isSubmitted: true,
  },
  render: (args = {}) => (
    <LayoutDoc>
      <Ltpz084 {...args} />
    </LayoutDoc>
  ),
};
