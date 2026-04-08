import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Ltpz023 } from '@/features/pub/components/popups/Ltpz023';

export default {
  title: 'popup/Ltpz023',
  component: Ltpz023,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpz028 열기</Button>
      </div>

      <Ltpz023 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
