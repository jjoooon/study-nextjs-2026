/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import LTPA350, { LTPA350PageProps } from '@/app/pub/ispl/pages/LTPA350';
import { LayoutDoc } from '@layout/BaseLayout';

const IMAGE_PRESETS = ['/images/AI_01_b2.svg', '/images/AI_02_b2.svg', '/images/AI_03_b2.svg'];

const meta: Meta<typeof LTPA350> = {
  title: 'app/page/LTPA350',
  component: LTPA350,
  argTypes: {
    buttonImageSrc: {
      control: 'select',
      options: IMAGE_PRESETS,
      description: '우측 하단 AsideFoot 내 AI 챗봇(Ltpa120) 버튼 이미지 경로',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/images/AI_01_b2.svg' },
      },
    },
    borderWidth: {
      control: 'radio',
      options: [1, 2],
      description: '우측 하단 AsideFoot 내 AI 챗봇(Ltpa120) 콘텐츠 영역 테두리 두께 (1px 또는 2px)',
      table: {
        type: { summary: '1 | 2' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    buttonImageSrc: '/images/AI_01_b2.svg',
    borderWidth: 1,
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
