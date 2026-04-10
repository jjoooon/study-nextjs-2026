import * as React from 'react';
import { Ltpz019 } from '@/features/pub/components/popups/Ltpz019';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'popup/Ltpz019',
  component: Ltpz019,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpz019 열기</Button>
      </div>

      <Ltpz019 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
