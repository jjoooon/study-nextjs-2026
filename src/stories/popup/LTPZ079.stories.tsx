/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import Ltpz079 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz079';
import type { DummyDataType } from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz079';
import { LayoutDoc } from '@layout/BaseLayout';
import { useStorybookGridData } from '../hooks/useStorybookGridData';

interface StoryProps extends React.ComponentProps<typeof Ltpz079> {
  dataType: 'none' | 'under' | 'over';
  delayTime: number;
}

// 기존 Ltpz079 컴포넌트에서 추출한 더미 데이터셋 정의
const dummyItems: DummyDataType[] = [
  
];

const meta: Meta<StoryProps> = {
  title: 'app/popup/LTPZ079',
  component: Ltpz079,
  argTypes: {
    dataType: {
      control: 'select',
      options: ['none', 'under', 'over'],
      description: '데이터 노출 개수 설정 (none: 0개, under: 5개 이하, over: 5개 이상)',
    },
    delayTime: {
      control: 'select',
      options: [0, 3000],
      description: '데이터 로딩 지연 시간 (단위: ms, 0 지정 시 지연 없음)',
    },
    data: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  args: {
    dataType: 'over',
    delayTime: 3000,
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: (args) => {
    const { isLoading, resolvedData } = useStorybookGridData({
      dataType: args.dataType,
      delayTime: args.delayTime,
      grids: [
        {
          key: 'grid1',
          dummyItems: dummyItems,
          underSliceCount: 2,
        },
      ],
    });

    return (
      <LayoutDoc>
        <Ltpz079   />
      </LayoutDoc>
    );
  },
};
