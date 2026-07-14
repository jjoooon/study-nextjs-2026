/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AiSpinner } from '@/shared/components/common/SpinnerRoot';

const meta: Meta<typeof AiSpinner> = {
  title: 'Components/Common/AiSpinner',
  component: AiSpinner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#202020', padding: '2rem', borderRadius: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'text' },
      description: '로더의 크기 (CSS 단위 지원, 예: min(46vmin, 360px), 200px, 15rem)',
      table: { category: 'Props' },
    },
    text: {
      control: { type: 'text' },
      description: '중앙에 표시할 텍스트',
      table: { category: 'Props' },
    },
    srText: {
      control: { type: 'text' },
      description: '스크린 리더(접근성)를 위한 텍스트',
      table: { category: 'Accessibility' },
    },
    className: {
      control: { type: 'text' },
      description: '추가할 CSS 클래스명',
      table: { category: 'Props' },
    },
  },
  args: {
    size: '200px',
    text: 'AI',
    srText: 'Loading',
  },
};

export default meta;
type Story = StoryObj<typeof AiSpinner>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    size: '240px',
    text: '분석중',
  },
};

export const SmallSize: Story = {
  args: {
    size: '120px',
    text: 'AI',
  },
};
