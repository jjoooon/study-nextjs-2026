/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz996 from '../../features/pub/shared/components/popups/Ltpz996';
import type { DummyDataType } from '../../features/pub/shared/components/popups/Ltpz996';

interface StoryProps extends React.ComponentProps<typeof Ltpz996> {
  dataType: 'none' | 'under5' | 'over5';
  delayTime: number;
}

const meta: Meta<StoryProps> = {
  title: 'app/shared/components/popups/Ltpz996',
  component: Ltpz996,
  argTypes: {
    dataType: {
      control: 'select',
      options: ['none', 'under5', 'over5'],
      description: '데이터 노출 개수 설정 (none: 0개, under5: 5개 이하, over5: 5개 이상)',
    },
    delayTime: {
      control: 'select',
      options: [0, 500, 1000, 2000, 3000],
      description: '데이터 로딩 지연 시간 (단위: ms, 0 지정 시 지연 없음)',
    },
    data: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  args: {
    dataType: 'over5',
    delayTime: 1000,
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

// 공통 더미 데이터셋 정의
const dummyItems: DummyDataType[] = [
  {
    id: 1,
    field1: 'sMenuInfo',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5:
      '자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.',
  },
  {
    id: 2,
    field1: 'sComG002RA',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5: '자료가 조회되었습니다.',
  },
  {
    id: 3,
    field1: 'sComG003RA',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5: '데이터 3번째 항목',
  },
  {
    id: 4,
    field1: 'sComG004RA',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5: '데이터 4번째 항목',
  },
  {
    id: 5,
    field1: 'sComG005RA',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5: '데이터 5번째 항목',
  },
  {
    id: 6,
    field1: 'sComG006RA',
    field2: 'transComG100',
    field3: 'RB',
    field4: 'COM10107',
    field5: '데이터 6번째 항목',
  },
];

export const Default: Story = {
  render: (args) => {
    const [isLoading, setIsLoading] = React.useState(args.delayTime > 0);
    const [resolvedData, setResolvedData] = React.useState<DummyDataType[]>([]);

    React.useEffect(() => {
      const hasDelay = args.delayTime > 0;
      setIsLoading(hasDelay);

      if (!hasDelay) {
        let data: DummyDataType[] = [];
        if (args.dataType === 'under5') {
          data = dummyItems.slice(0, 2);
        } else if (args.dataType === 'over5') {
          data = dummyItems;
        }
        setResolvedData(data);
        return;
      }

      setResolvedData([]);
      const timer = setTimeout(() => {
        let data: DummyDataType[] = [];
        if (args.dataType === 'under5') {
          data = dummyItems.slice(0, 2);
        } else if (args.dataType === 'over5') {
          data = dummyItems;
        }
        setResolvedData(data);
        setIsLoading(false);
      }, args.delayTime);

      return () => clearTimeout(timer);
    }, [args.dataType, args.delayTime]);

    return (
      <LayoutDoc>
        <Ltpz996 data={resolvedData} loading={isLoading} />
      </LayoutDoc>
    );
  },
};
