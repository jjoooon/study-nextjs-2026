/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import * as React from 'react';
import Ltpz088 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz088';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz088',
  component: Ltpz088,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz088 />
    </LayoutDoc>
  );
};
