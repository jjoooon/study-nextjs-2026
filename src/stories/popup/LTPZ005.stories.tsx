/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import Ltpz005 from '@/features/pub/shared/components/popups/Ltpz005';
import { LayoutDoc } from '@layout/BaseLayout';

const meta: Meta<typeof Ltpz005> = {
  title: 'app/popup/LTPZ005',
  component: Ltpz005,
  argTypes: {
    hasRecommendData: {
      name: '대안설계 데이터 유무 (recommendData)',
      control: 'boolean',
      description: 'true: 추천 데이터 3건 표시 / false: 대안설계 데이터 없음 (예상UW결과 미충족)',
    },
    initialActiveTab: {
      name: '초기 탭',
      control: 'select',
      options: ['common', 'accum', 'job', 'expected-uw'],
      description: '초기 활성화 탭 선택',
    },
    open: {
      name: '팝업 오픈 상태',
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Ltpz005>;

export const Default: Story = {
  args: {
    open: true,
    initialActiveTab: 'expected-uw',
    hasRecommendData: true,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz005 {...args} />
    </LayoutDoc>
  ),
};

export const ExpectedUwHasData: Story = {
  args: {
    open: true,
    initialActiveTab: 'expected-uw',
    hasRecommendData: true,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz005 {...args} />
    </LayoutDoc>
  ),
};

export const ExpectedUwNoData: Story = {
  args: {
    open: true,
    initialActiveTab: 'expected-uw',
    hasRecommendData: false,
  },
  render: (args) => (
    <LayoutDoc>
      <Ltpz005 {...args} />
    </LayoutDoc>
  ),
};
