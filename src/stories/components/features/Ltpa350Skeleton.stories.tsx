/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Ltpa350Skeleton } from '@/features/pub/ispl/cvrPl/components/Ltpa350Skeleton';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';

const meta: Meta<typeof Ltpa350Skeleton> = {
  title: 'Components/Features/Ltpa350Skeleton',
  component: Ltpa350Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="Ltpa350Skeleton"
          history={['2026.09.21 - 가입설계(LTPA350) 스켈레톤 로딩 컴포넌트 생성 및 스토리북 등록']}
          overview={`Ltpa350Skeleton 컴포넌트는 가입설계(LTPA350) 화면의 데이터 로딩 및 초기 렌더링 시 표시되는 스켈레톤 UI 컴포넌트입니다.
FormTable과 Gcol, 그리고 Skeleton UI 요소를 활용하여 실제 화면 구조와 동일하게 제공됩니다.`}
          usageCode={`import { Ltpa350Skeleton } from '@/features/pub/ispl/cvrPl/components/Ltpa350Skeleton';

// 로딩 상태에 따라 스켈레톤 노출
{isLoading ? <Ltpa350Skeleton /> : <Ltpa350MainContent />}`}
          apiReference={[]}
        />
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Ltpa350Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="relative w-full h-[85vh] min-h-[600px] p-4 bg-white">
      <Ltpa350Skeleton />
    </div>
  ),
};

export const NoMotion: Story = {
  name: 'No Motion (모션 없음)',
  render: () => (
    <div className="relative w-full h-[85vh] min-h-[600px] p-4 bg-white">
      <Ltpa350Skeleton animate={false} />
    </div>
  ),
};
