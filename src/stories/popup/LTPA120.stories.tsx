/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { Ltpa120 } from '@/features/pub/shared/components/popups/Ltpa120';
import { Button } from '@uiux/Button';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/shared/components/popups/Ltpa120',
  component: Ltpa120,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className="flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto">
        <Button variant={'contained'} onClick={() => setOpen(true)}>
          Ltpa120 열기
        </Button>
      </div>

      <Ltpa120 open={open} setOpen={setOpen} isButton={false} />
    </LayoutDoc>
  );
};
