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
  {
    id: 1,
    isCheck: true,
    field01: 'LA12345678',
    field02:
      '문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.',
    field03: 1,
    field04: '김한화한화김한화한화',
    field05: '소재소재지소재지소재지소재지소재지지(12)',
    field06: '2026-06-01 12:20:56',
    field07: '김한화한화김한화한화',
    field08:
      '비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.',
    field09: 1,
  },
  {
    id: 2,
    isCheck: false,
    field01: 'LA12345679',
    field02: '문서명 내용이 들어갑니다.',
    field03: 2,
    field04: '김한화',
    field05: '소재지(12)',
    field06: '2026-06-01 12:20:56',
    field07: '김한화',
    field08: '비고 내용이 들어갑니다.비고 내용이 들어갑니다.',
    field09: 2,
  },
  // 복수의 데이터 사용을 위해 추가 더미 데이터 구성
  {
    id: 3,
    isCheck: false,
    field01: 'LA12345680',
    field02: '세 번째 문서 정보',
    field03: 3,
    field04: '박한화',
    field05: '소재지(34)',
    field06: '2026-06-02 09:15:00',
    field07: '박한화',
    field08: '기타 보충 내용이 들어갑니다.',
    field09: 3,
  },
  {
    id: 4,
    isCheck: false,
    field01: 'LA12345681',
    field02: '네 번째 문서 정보',
    field03: 4,
    field04: '이한화',
    field05: '소재지(56)',
    field06: '2026-06-02 10:30:22',
    field07: '이한화',
    field08: '',
    field09: 4,
  },
  {
    id: 5,
    isCheck: false,
    field01: 'LA12345682',
    field02: '다섯 번째 문서 정보',
    field03: 5,
    field04: '최한화',
    field05: '소재지(78)',
    field06: '2026-06-02 11:45:11',
    field07: '최한화',
    field08: '추가 사항 있음',
    field09: 5,
  },
  {
    id: 6,
    isCheck: false,
    field01: 'LA12345683',
    field02: '여섯 번째 문서 정보',
    field03: 6,
    field04: '정한화',
    field05: '소재지(90)',
    field06: '2026-06-02 14:00:55',
    field07: '정한화',
    field08: '작성 완료',
    field09: 6,
  },
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
        <Ltpz079 data={resolvedData} />
      </LayoutDoc>
    );
  },
};
