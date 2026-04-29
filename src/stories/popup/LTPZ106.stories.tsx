
import * as React from 'react';
import { Ltpz106 } from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz106';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
   title: 'app/ispl/gdPlSlc/components/popups/Ltpz106',
  component: Ltpz106,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz106 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
