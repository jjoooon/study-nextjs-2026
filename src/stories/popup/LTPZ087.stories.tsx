/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import * as React from 'react';
import Ltpz087 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz087';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz087',
  component: Ltpz087,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz087 />
    </LayoutDoc>
  );
};
