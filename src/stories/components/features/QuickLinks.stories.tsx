/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { QuickLinks } from '@/shared/components/features/QuickLinks';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';

const meta: Meta<typeof QuickLinks> = {
  title: 'Components/Features/Aside/바로가기(QuickLinks)',
  component: QuickLinks,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="QuickLinks"
          history={['2026.03.30 - 컴포넌트 최초 생성', '2026.06.14 - 스토리북 명세 1:1 동기화 (StoryDocTemplate 적용)']}
          overview={`QuickLinks 컴포넌트는 우측 사이드바(Aside) 영역에서 자주 사용하는 기능으로 빠르게 이동할 수 있는 바로가기 버튼 그룹을 제공합니다.`}
          usageCode={`import { QuickLinks } from '@/shared/components/features/QuickLinks';

<QuickLinks />`}
          apiReference={[]}
        />
      ),
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof QuickLinks>;

export const Default: Story = {
  render: () => <QuickLinks />,
};
