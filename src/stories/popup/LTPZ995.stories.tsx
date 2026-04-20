import * as React from 'react';
import { Ltpz995 } from '@/features/pub/components/popups/Ltpz995';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/components/popups/Ltpz995',
  component: Ltpz995,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Ltpz995 open={open} onOpenChange={setOpen} />
      </div>

      
    </LayoutDoc>
  );
};
