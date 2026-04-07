
import * as React from 'react';
import { Ltpz005 } from '@/features/pub/components/popups/Ltpz005';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/Ltpz005',
  component: Ltpz005,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz005 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
