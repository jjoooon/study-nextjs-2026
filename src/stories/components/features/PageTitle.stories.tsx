/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { PageTitle, PageTitleProduct } from '@/shared/components/features/PageTitle';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';

const meta: Meta<typeof PageTitleProduct> = {
  title: 'Components/Features/header/페이지제목(PageTitle)',
  component: PageTitleProduct,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="PageTitle"
          history={[
            '2026.03.30 - 컴포넌트 최초 생성',
            '2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화',
          ]}
          overview={`PageTitle, PageTitleProduct 컴포넌트는 보험/상품 설계 화면의 타이틀 및 주요 정보 영역을 담당합니다.
PageTitleProduct는 상품 설계에 특화된 확장형, PageTitle은 기본형입니다.`}
          usageCode={`import { PageTitle, PageTitleProduct } from '@/shared/components/features/PageTitle';

<PageTitleProduct data={contractData} />
<PageTitle data={contractData} />`}
          apiReference={[
            {
              prop: 'data',
              type: 'DefaultPageTitle',
              description: '타이틀 및 설계 메타 데이터 객체',
            },
            {
              prop: 'simpleMode',
              type: 'boolean',
              description: '간편/상세 모드 토글 상태 (Controlled)',
            },
            {
              prop: 'onSimpleModeChange',
              type: '(value: boolean) => void',
              description: '간편/상세 모드 토글 시 호출되는 콜백 함수',
            },
            {
              prop: 'memoButtonColor',
              type: "'gray' | 'primary'",
              description: '메모 버튼 색상 스타일 선택 (gray: 회색 테두리, primary: 블루/주색 테두리)',
            },
          ]}
        />
      ),
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: '페이지 타이틀 데이터 객체',
      table: { category: 'Data' },
    },
    simpleMode: {
      control: 'boolean',
      description: '간편/상세 모드 상태',
      table: { category: 'State' },
    },
    memoButtonColor: {
      control: { type: 'inline-radio' },
      options: ['gray', 'primary'],
      description: '메모 버튼 색상 타입',
      table: { category: 'Appearance' },
    },
    onSimpleModeChange: {
      action: 'simpleModeChanged',
      description: '모드 변경 콜백 함수',
      table: { category: 'Events' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageTitleProduct>;

export const Default: Story = {
  render: (args) => (
    <div>
      <PageTitleProduct {...args} />
      <div style={{ margin: '32px 0' }} />
      <PageTitle data={args.data} />
    </div>
  ),
  args: {
    memoButtonColor: 'gray',
    data: {
      simpleMode: true,
      title: '한화 시그니처 여성 건강보험 3.0 2504',
      planNumber: ['LA20234472050000', '2'],
      contractHolder: '6012345 박하늘별님달',
      planNumberList: [
        { label: 'LA20234472050000', value: 'LA20234472050000', name: '김은빈', amount: '23,000', state: '설계중' },
        { label: 'LA23234472050001', value: 'LA23234472050001', name: '박하늘', amount: '45,500', state: '계약완료' },
        { label: 'LA20234472050002', value: 'LA20234472050002', name: '이도현', amount: '12,300', state: '심사중' },
        { label: 'LA20234472050003', value: 'LA20234472050003', name: '최수영', amount: '99,900', state: '청약완료' },
        { label: 'LA20234472050004', value: 'LA20234472050004', name: '한지민', amount: '77,700', state: '설계중' },
      ],
    },
  },
};
