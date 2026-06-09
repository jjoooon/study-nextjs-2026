/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import * as React from 'react';
import Ltpz081 from '@/features/pub/ispl/aplMtt/Ltpz081';

export default {
  title: 'app/ispl/aplMtt/Ltpz081',
  component: Ltpz081,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className="flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto">
        <Button variant={'contained'} onClick={() => setOpen(true)}>
          Ltpz081 열기
        </Button>
      </div>

      <Ltpz081 />
    </LayoutDoc>
  );
};
