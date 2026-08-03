/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ErrorComponent from '@/app/error';

const meta: Meta<typeof ErrorComponent> = {
  title: 'app/system/Error',
  component: ErrorComponent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    reset: { action: 'reset' },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorComponent>;

export const Default: Story = {
  args: {
    error: new Error('데이터 요청 중 서버 네트워크 오류가 발생했습니다.'),
    reset: () => console.log('Reset triggered'),
  },
};

export const WithDigest: Story = {
  args: {
    error: Object.assign(new Error('서버 처리 중 예상치 못한 예외가 발생했습니다.'), {
      digest: 'ERR_HASH_98234723',
    }),
    reset: () => console.log('Reset triggered'),
  },
};
