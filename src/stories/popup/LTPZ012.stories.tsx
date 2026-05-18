/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import Ltpz012 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz012';

export default {
  title: 'app/ispl/udrtkGu/components/popups/Ltpz012',
  component: Ltpz012,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpz012 열기</Button>
      </div>

      <Ltpz012 />
    </LayoutDoc>
  );
};
