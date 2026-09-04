/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import LTPA350, { LTPA350PageProps } from '@/app/pub/ispl/pages/LTPA350';
import { SpinnerRoot } from '@/shared/components/common/SpinnerRoot';
import { LayoutDoc } from '@layout/BaseLayout';

const TempSpinner = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  if (!isVisible) return null;

  return (
    <div onClick={() => setIsVisible(false)} style={{ cursor: 'pointer' }} className="fixed top-0 left-0 w-full h-full">
      <SpinnerRoot texts={['조회중입니다.']} />
    </div>
  );
};

const meta: Meta<typeof LTPA350> = {
  title: 'app/page/LTPA350',
  component: LTPA350,
  argTypes: {
    memoButtonColor: {
      control: 'radio',
      options: ['gray', 'primary'],
      description: '상단 타이틀 영역 메모 버튼 색상 스타일 (gray: 회색, primary: 파란색/주색)',
      table: {
        type: { summary: "'gray' | 'primary'" },
        defaultValue: { summary: 'gray' },
      },
    },
    showRenewalCycle: {
      name: '갱신주기 없는 경우',
      control: 'boolean',
      description: '일반 탭에서 갱신주기 표시 여부 (false 시 갱신주기 미노출 및 납입주기 colSpan={3} 적용)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showContractConversion: {
      name: '계약전환 있는 경우',
      control: 'boolean',
      description: '일반 탭에서 계약전환 신청 표시 여부 (true 시 계약전환 셀 노출 및 태아여부 colSpan 조정)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    memoButtonColor: 'gray',
    showRenewalCycle: true,
    showContractConversion: false,
  },
};
export default meta;
type Story = StoryObj<typeof LTPA350>;

export const Default: Story = {
  render: (args = {}) => (
    <LayoutDoc>
      <TempSpinner />
      <LTPA350 {...args} />
    </LayoutDoc>
  ),
};
