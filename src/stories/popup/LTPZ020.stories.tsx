import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { LTPZ020P } from '@/features/pub/proto/popup/LTPZ020';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

const meta: Meta<typeof LTPZ020P> = {
  title: 'popup/LTPZ020',
  component: LTPZ020P,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <Primary />
            <Controls />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);

    return (
      <LayoutDoc>
        <div className='flex w-full h-screen items-center justify-center'>
          <Button variant={'contained'} onClick={() => setOpen(true)}>
            다이얼로그 열기
          </Button>
        </div>

        <LTPZ020P open={open} onOpenChange={setOpen} />
      </LayoutDoc>
    );
  },
};
