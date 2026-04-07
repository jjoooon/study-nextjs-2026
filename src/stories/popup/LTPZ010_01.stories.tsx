import * as React from 'react';
import { LTPZ010_01 } from '@/features/pub/components/popups/LTPZ010_01';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/LTPZ010_01',
  component: LTPZ010_01,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <LTPZ010_01 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
