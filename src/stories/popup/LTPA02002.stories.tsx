
import * as React from 'react';
import { Ltpa02002 } from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpa02002';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/Ltpa02002',
  component: Ltpa02002,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpa02002 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
