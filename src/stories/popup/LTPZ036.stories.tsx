/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import Ltpz036 from '@/features/pub/ispl/udRqRst/components/popups/Ltpz036';

export default {
  title: 'app/ispl/udRqRst/components/popups/Ltpz036',
  component: Ltpz036,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpz036 열기</Button>
      </div>

      <Ltpz036 />
    </LayoutDoc>
  );
};
