/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import LTPA350, { LTPA350PageProps } from '@/app/pub/pages/LTPA350';
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
    isDepositEmpty: {
      name: '입금사항 데이터 없음 여부 (수납)',
      control: 'boolean',
      description: '6단계(수납) 탭에서 입금사항 그리드 데이터가 없는 빈 목록 상태로 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    showRenewalCycle: true,
    showContractConversion: false,
    isDepositEmpty: false,
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

export const DepositNoData: Story = {
  name: '입금사항 데이터 없음 (수납)',
  args: {
    showRenewalCycle: true,
    showContractConversion: false,
    isDepositEmpty: true,
  },
  render: (args = {}) => (
    <LayoutDoc>
      <TempSpinner />
      <LTPA350 {...args} />
    </LayoutDoc>
  ),
};
