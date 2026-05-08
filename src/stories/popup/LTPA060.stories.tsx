/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Ltpa060 } from '@/features/pub/shared/components/popups/ncMtt/Ltpa060';

export default {
  title: 'app/shared/components/popups/ncMtt/Ltpa060',
  component: Ltpa060,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpa060 열기</Button>
      </div>

      <Ltpa060 />
    </LayoutDoc>
  );
};
