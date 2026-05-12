/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import * as React from 'react';
import Ltpz086 from '@/features/pub/shared/components/popups/Ltpz086';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/shared/components/popups/Ltpz086',
  component: Ltpz086,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz086 />
    </LayoutDoc>
  );
};
