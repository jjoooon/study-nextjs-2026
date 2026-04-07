import * as React from 'react';
import { LTPZ01001 } from '@/features/pub/components/popups/LTPZ01001';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/LTPZ01001',
  component: LTPZ01001,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <LTPZ01001 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
