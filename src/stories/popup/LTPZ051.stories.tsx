/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz051 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz051';
import type { DummyData1Type, DummyData2Type } from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz051';
import { useStorybookGridData } from '../hooks/useStorybookGridData';

interface StoryProps extends React.ComponentProps<typeof Ltpz051> {
  dataType: 'none' | 'under' | 'over';
  delayTime: number;
}

// 기존 Ltpz051 컴포넌트에서 추출한 직업정보 변경대상 더미 데이터
const dummyItems1: DummyData1Type[] = [
  {
    id: 1,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
  {
    id: 2,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
  {
    id: 3,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
  // 복수 데이터 시나리오를 위한 추가 더미
  {
    id: 4,
    field01: '변경대상',
    field02: 'LA12345678901235',
    field03: '계약변경설계이동',
    field04: '2급',
    field05: '제조업 생산직',
    field06: '2급',
    field07: '제조업 생산직',
  },
  {
    id: 5,
    field01: '변경대상',
    field02: 'LA12345678901236',
    field03: '계약변경설계이동',
    field04: '1급',
    field05: '교사',
    field06: '1급',
    field07: '교사',
  },
  {
    id: 6,
    field01: '변경대상',
    field02: 'LA12345678901237',
    field03: '계약변경설계이동',
    field04: '3급',
    field05: '영업용 운전원',
    field06: '3급',
    field07: '영업용 운전원',
  },
];

// 기존 Ltpz051 컴포넌트에서 추출한 이륜차부담보 변경대상 더미 데이터
const dummyItems2: DummyData2Type[] = [
  {
    id: 1,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 2,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 3,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 4,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 5,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 6,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 7,
    field01: '변경대상',
    field02: 'LA12345678901234',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
];

const meta: Meta<StoryProps> = {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpz051',
  component: Ltpz051,
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
          dummyItems: dummyItems1,
          underSliceCount: 2,
        },
        {
          key: 'grid2',
          dummyItems: dummyItems2,
          underSliceCount: 2,
        },
      ],
    });

    return (
      <LayoutDoc>
        <Ltpz051 data={resolvedData} loading={isLoading} />
      </LayoutDoc>
    );
  },
};
