/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { AsideFoot } from '@features/AsideFoot';

type AsideFootDataTotal = {
  insGen: number | boolean;
  paymentAmount: number;
  point: number;
};

const sampleDataTotal: AsideFootDataTotal = {
  insGen: 125000,
  paymentAmount: 250000,
  point: 12.5,
};

const meta: Meta<typeof AsideFoot> = {
  title: 'Components/Features/Aside/납입보험료(AsideFoot)',
  component: AsideFoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="AsideFoot"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화 (dataTotal, viewKey 반영)',
          ]}
          overview={`AsideFoot 컴포넌트는 화면 우측 사이드바의 푸터 영역을 담당합니다.
요약 정보(납입보험료, 청약포인트 등)와 제안서/출력 관련 액션 버튼을 포함합니다.`}
          usageCode={`import { AsideFoot } from '@/shared/components/features/AsideFoot';

const dataTotal = {
  insGen: 125000,
  paymentAmount: 250000,
  point: 12.50,
};

<AsideFoot dataTotal={dataTotal} viewKey="view1" />`}
          apiReference={[
            {
              prop: 'dataTotal',
              type: 'AsideFootDataTotal',
              description: '하단 요약 카드에 표시할 집계 데이터',
            },
            {
              prop: 'viewKey',
              type: 'string',
              description: "화면 모드 키 (일부 모드에서 상단 4세대 영역 숨김. 'view3', 'view4', 'view5'일 때 비활성화)",
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    dataTotal: {
      control: 'object',
      description: '하단 요약 카드에 표시할 집계 데이터',
      table: { category: 'Data' },
    },
    viewKey: {
      control: 'text',
      description: "화면 모드 키 ('view3', 'view4', 'view5'일 때 4세대 영역 비활성화)",
      table: { category: 'Appearance' },
    },
  },
  args: {
    dataTotal: sampleDataTotal,
    viewKey: 'view1',
  },
};

export default meta;
type Story = StoryObj<typeof AsideFoot>;

export const Default: Story = {
  render: (args) => (
    <div className="relative flex items-center justify-center" style={{ width: '20rem', height: '20rem' }}>
      <AsideFoot {...args} />
    </div>
  ),
};
