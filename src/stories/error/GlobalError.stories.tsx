/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import GlobalError from '@/app/global-error';

const meta: Meta<typeof GlobalError> = {
  title: 'app/system/GlobalError',
  component: GlobalError,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    reset: { action: 'reset' },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalError>;

export const Default: Story = {
  args: {
    error: new Error('루트 레이아웃 렌더링 중 시스템 치명적 에러가 발생했습니다.'),
    reset: () => console.log('Reset triggered'),
  },
};
