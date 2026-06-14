/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Ltpz999 from '@/features/pub/shared/components/popups/Ltpz999';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz999> = {
  title: 'app/shared/components/popups/Ltpz999',
  component: Ltpz999,
  argTypes: {
    errorType: {
      control: { type: 'select' },
      options: ['오류', '알림', '질의'],
    },
  },
  args: {
    errorType: '오류',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <LayoutDoc>
      <Ltpz999 {...args} />
    </LayoutDoc>
  ),
};
