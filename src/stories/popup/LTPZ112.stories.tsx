/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import Ltpz112, { DummyData, DummyData2 } from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz112';
import { LayoutDoc } from '@layout/BaseLayout';

interface StoryProps extends React.ComponentProps<typeof Ltpz112> {
  diseaseDataEmpty: boolean;
  hospitalSurgeryDataEmpty: boolean;
}

const meta: Meta<StoryProps> = {
  title: 'app/ispl/gdPlSlc/components/popups/Ltpz112',
  component: Ltpz112,
  argTypes: {
    diseaseDataEmpty: {
      control: 'boolean',
      description: '질병검색 데이터가 없는 케이스 (true 시 빈 목록)',
    },
    hospitalSurgeryDataEmpty: {
      control: 'boolean',
      description: '입원/수술 정보 데이터가 없는 케이스 (true 시 빈 목록)',
    },
  },
  args: {
    diseaseDataEmpty: false,
    hospitalSurgeryDataEmpty: true,
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: (args) => {
    const initialRowData = args.diseaseDataEmpty ? [] : DummyData;
    const initialRowData2 = args.hospitalSurgeryDataEmpty ? [] : DummyData2;

    return (
      <LayoutDoc>
        <Ltpz112 initialRowData={initialRowData} initialRowData2={initialRowData2} />
      </LayoutDoc>
    );
  },
};
