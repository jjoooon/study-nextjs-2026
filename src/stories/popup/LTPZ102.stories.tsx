/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import * as React from 'react';
import Ltpz102 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz102';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpz102',
  component: Ltpz102,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className="flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto">
        <Button variant={'contained'} onClick={() => setOpen(true)}>
          다이얼로그 열기
        </Button>
      </div>

      <Ltpz102 />
    </LayoutDoc>
  );
};
