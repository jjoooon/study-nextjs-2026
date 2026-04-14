
import * as React from 'react';
import { Ltpa02003 } from '@/features/pub/components/popups/Ltpa02003';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/Ltpa02003',
  component: Ltpa02003,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpa02003 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
