
import * as React from 'react';
import { Ltpz030 } from '@/features/pub/ispl/ncMtt/components/popups/Ltpz030';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/ispl/ncMtt/components/popups/Ltpz030',
  component: Ltpz030,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className="flex w-full h-screen items-center justify-center max-w-472 outline-[red] -outline-offset-2 mx-auto">
        <Button variant={'contained'} onClick={() => setOpen(true)}>다이얼로그 열기</Button>
      </div>

      <Ltpz030 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
