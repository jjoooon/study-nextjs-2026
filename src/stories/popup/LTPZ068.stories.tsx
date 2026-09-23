/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Ltpz068 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz068';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz068> = {
  title: 'app/popup/LTPZ068',
  component: Ltpz068,
  argTypes: {
    isEmpty: {
      name: '데이터 없음 여부 (isEmpty)',
      control: 'boolean',
      description: 'true 설정 시 데이터가 없는 빈 목록 상태로 표시합니다.',
    },
  },
  args: {
    isEmpty: false,
  },
};

export default meta;

type Story = StoryObj<typeof Ltpz068>;

export const Default: Story = {
  args: {
    isEmpty: false,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz068 {...args} />
    </LayoutDoc>
  ),
};

export const NoData: Story = {
  name: '데이터 없음',
  args: {
    isEmpty: true,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz068 {...args} />
    </LayoutDoc>
  ),
};
