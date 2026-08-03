/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { PageProcess } from '@/shared/components/features/PageProcess';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';

const demoItems = [
  { step: 1, label: '계약사항' },
  { step: 2, label: '담보설계' },
  { step: 3, label: '알릴사항' },
  { step: 4, label: '심사요청' },
  { step: 5, label: '추가사항' },
  { step: 6, label: '수납' },
];

const meta: Meta<typeof PageProcess> = {
  title: 'Components/Features/PageProcess',
  component: PageProcess,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="PageProcess"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화',
          ]}
          overview={`PageProcess 컴포넌트는 페이지의 주요 업무 단계를 시각적으로 보여주는 수직 프로세스 바입니다.
현재 활성화된 단계와 완료된 단계를 시각적으로 구분하여 사용자가 진행 상태를 쉽게 파악할 수 있도록 돕습니다.`}
          usageCode={`import { PageProcess } from '@/shared/components/features/PageProcess';

const items = [
  { step: 1, label: '계약사항' },
  { step: 2, label: '담보설계' },
  { step: 3, label: '알릴사항' },
];

<PageProcess
  items={items}
  completeSteps={[1]}
  activeStep={2}
/>`}
          apiReference={[
            {
              prop: 'items',
              type: 'PageProcessItem[]',
              description: '전체 단계 목록 데이터',
            },
            {
              prop: 'completeSteps',
              type: 'number[]',
              description: '완료 처리할 단계 번호 배열',
            },
            {
              prop: 'activeStep',
              type: 'number',
              description: '현재 활성 단계 번호 (우선 적용)',
            },
            {
              prop: 'defaultActiveStep',
              type: 'number',
              description: '기본 활성 단계 번호 (최초 렌더링 시 사용)',
            },
            {
              prop: 'onStepChange',
              type: '(step: number) => void',
              description: '단계 클릭 시 호출되는 콜백 함수',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: '전체 단계 목록',
      table: { category: 'Data' },
    },
    completeSteps: {
      control: 'object',
      description: '완료 처리할 단계 번호 배열',
      table: { category: 'Data' },
    },
    activeStep: {
      control: { type: 'number', min: 1, max: 6 },
      description: '현재 활성 단계 번호',
      table: { category: 'State' },
    },
    defaultActiveStep: {
      control: { type: 'number', min: 1, max: 6 },
      description: '기본 활성 단계 번호',
      table: { category: 'State' },
    },
    onStepChange: {
      action: 'stepChanged',
      description: '단계 변경 시 콜백 함수',
      table: { category: 'Events' },
    },
  },
  args: {
    items: demoItems,
    completeSteps: [1],
    activeStep: 2,
  },
};

export default meta;
type Story = StoryObj<typeof PageProcess>;

export const Default: Story = {
  render: (args) => <PageProcess {...args} />,
};

export const WithDefaultActiveOnly: Story = {
  args: {
    items: demoItems,
    completeSteps: [1, 2],
    activeStep: undefined,
    defaultActiveStep: 3,
  },
};
