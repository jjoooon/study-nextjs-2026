
import * as React from 'react';
import { Ltpz053 } from '@/features/pub/shared/components/popups/Ltpz053';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'shared/components/popups/Ltpz053',
  component: Ltpz053,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz053 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
