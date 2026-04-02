import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { LTPA904 } from '@/features/pub/proto/popup/LTPA904';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/LTPA904',
  component: LTPA904,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <LTPA904 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
