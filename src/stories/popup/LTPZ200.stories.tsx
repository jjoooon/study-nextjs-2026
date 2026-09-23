/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Ltpz200 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz200';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz200> = {
  title: 'app/popup/LTPZ200',
  component: Ltpz200,
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

type Story = StoryObj<typeof Ltpz200>;

export const Default: Story = {
  args: {
    isEmpty: false,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz200 {...args} />
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
      <Ltpz200 {...args} />
    </LayoutDoc>
  ),
};
