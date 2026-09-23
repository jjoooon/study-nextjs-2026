/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Ltpz011 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz011';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz011> = {
  title: 'app/popup/LTPZ011',
  component: Ltpz011,
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

type Story = StoryObj<typeof Ltpz011>;

export const Default: Story = {
  args: {
    isEmpty: false,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz011 {...args} />
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
      <Ltpz011 {...args} />
    </LayoutDoc>
  ),
};
