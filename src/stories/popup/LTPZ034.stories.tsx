/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import Ltpz034 from '@/features/pub/shared/components/popups/Ltpz034';
import { LayoutDoc } from '@layout/BaseLayout';

interface StoryProps extends React.ComponentProps<typeof Ltpz034> {
  hasTableData: boolean;
}

const meta: Meta<StoryProps> = {
  title: 'app/shared/components/popups/Ltpz034',
  component: Ltpz034,
  argTypes: {
    isRegistered: {
      name: '등록, 미등록 여부',
      options: [true, false],
      control: {
        type: 'inline-radio',
        labels: {
          true: '등록',
          false: '미등록',
        },
      },
      description: '등록 여부 (isRegistered)',
    },
    hasTableData: {
      name: '테이블 데이터 유무',
      options: [true, false],
      control: {
        type: 'inline-radio',
        labels: {
          true: '데이터 있음',
          false: '데이터 없음',
        },
      },
      description: 'Ltpa030table 데이터 유무 (hasTableData)',
      if: { arg: 'isRegistered', eq: false },
    },
  },
  args: {
    isRegistered: false,
    hasTableData: false,
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    const basicRows = args.isRegistered || args.hasTableData ? undefined : [];
    const healthRows = args.isRegistered || args.hasTableData ? undefined : [];
    const dummyRows = args.isRegistered || args.hasTableData ? undefined : [];

    return (
      <LayoutDoc>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-primary-50, #ff5c2e)',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            팝업 열기 (LTPZ034)
          </button>
        )}
        <Ltpz034
          open={open}
          onOpenChange={setOpen}
          isRegistered={args.isRegistered}
          basicRows={basicRows}
          healthRows={healthRows}
          dummyRows={dummyRows}
        />
      </LayoutDoc>
    );
  },
};
