import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Ltpz094 } from '@/features/pub/shared/components/popups/ncMtt/Ltpz094';

const meta: Meta<typeof Ltpz094> = {
  title: 'app/shared/components/popups/ncMtt/Ltpz094',
  component: Ltpz094,
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
        <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
          <Button variant={'contained'} onClick={() => setOpen(true)}>
            다이얼로그 열기
          </Button>
        </div>

        <Ltpz094 open={open} onOpenChange={setOpen} />
      </LayoutDoc>
    );
  },
};

