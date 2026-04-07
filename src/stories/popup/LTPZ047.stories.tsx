
import * as React from 'react';
import { LTPZ047 } from '@/features/pub/popup/LTPZ047';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/LTPZ047',
  component: LTPZ047,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <LTPZ047 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
