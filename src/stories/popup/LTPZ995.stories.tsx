import * as React from 'react';
import { LTPZ995 } from '@/features/pub/components/popups/LTPZ995';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'popup/LTPZ995',
  component: LTPZ995,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <LTPZ995 open={open} onOpenChange={setOpen} />
      </div>

      
    </LayoutDoc>
  );
};
