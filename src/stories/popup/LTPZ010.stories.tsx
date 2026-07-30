/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import Ltpz010 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz010';
import type { DummyDataType } from '@/features/pub/ispl/cvrPl/components/popups/Ltpz010';
import { LayoutDoc } from '@layout/BaseLayout';
import { useStorybookGridData } from '../hooks/useStorybookGridData';

interface StoryProps extends React.ComponentProps<typeof Ltpz010> {
  dataType: 'none' | 'under' | 'over';
  delayTime: number;
  isSimplified?: boolean;
  isFetusisured?: boolean;
}

// 기존 Ltpz010 컴포넌트에서 추출 및 복수 데이터 테스트를 위해 가공한 더미 데이터셋
const dummyItems: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    isDuplicate: false,
    productName:
      '기본형 실손의료비(상해급여)(갱신형)기본형 실손의료비(상해급여)(갱신형)기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '5천만원(통원20만원)',
    premium: 1377,
    premium2: 99919,
    expiryPeriod: '04개월만기',
    paymentPeriod: '01년만기',
    paymentPeriod2: '전기납',
    canEditExpiry: true,
  },
  {
    id: 2,
    isCheck: false,
    isDuplicate: false,
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '2천만원(통원20만원)',
    premium: 9999999,
    premium2: 19999,
    expiryPeriod: '04개월만기',
    paymentPeriod: '01년만기',
    paymentPeriod2: '전기납',
    canEditExpiry: true,
  },
  {
    id: 3,
    isCheck: false,
    isDuplicate: false,
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '3천만원(통원20만원)',
    premium: 159999,
    premium2: 99299,
    expiryPeriod: '04개월만기',
    paymentPeriod: '01년만기',
    paymentPeriod2: '전기납',
    canEditExpiry: true,
  },
  {
    id: 4,
    isCheck: false,
    isDuplicate: false,
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '4천만원(통원20만원)',
    premium: 2323230,
    premium2: 229999,
    expiryPeriod: '04개월만기',
    paymentPeriod: '01년만기',
    paymentPeriod2: '전기납',
    canEditExpiry: true,
  },
  // 복수의 데이터 검증을 위한 추가 더미
  {
    id: 5,
    isCheck: false,
    isDuplicate: false,
    productName: '선택형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '5천만원(통원20만원)',
    premium: 14500,
    premium2: 93999,
    expiryPeriod: '05년만기',
    paymentPeriod: '01년만기',
    paymentPeriod2: '전기납',
    canEditExpiry: true,
  },
  {
    id: 6,
    isCheck: false,
    isDuplicate: false,
    productName: '종합실손의료비(상해비급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '3천만원(통원20만원)',
    premium: 23000,
    premium2: 9999,
    expiryPeriod: '03년만기',
    paymentPeriod: '01년만기',
    paymentPeriod2: '전기납',
    canEditExpiry: true,
  },
];

const meta: Meta<StoryProps> = {
  title: 'app/ispl/cvrPl/components/popups/Ltpz010',
  component: Ltpz010,
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
    isSimplified: {
      name: '간편설계인 경우',
      control: 'boolean',
      description: '간편설계 여부 (true 설정 시 알릴사항 영역 숨김)',
    },
    isFetusisured: {
      name: '태아가 피보험자인 경우',
      control: 'boolean',
      description: '태아 피보험자 여부 (true: 출생전/출생후 테이블, false: 일반 보험료/만기/납기 테이블)',
    },
    data: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  args: {
    dataType: 'over',
    delayTime: 3000,
    isSimplified: false,
    isFetusisured: true,
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
        <Ltpz010
          data={resolvedData}
          loading={isLoading}
          isSimplified={args.isSimplified}
          isFetusisured={args.isFetusisured}
        />
      </LayoutDoc>
    );
  },
};
