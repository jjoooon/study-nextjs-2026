import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Ltpz027 } from '@/features/pub/shared/components/popups/ncMtt/Ltpz027';

export default {
  title: 'shared/components/popups/ncMtt/Ltpz027',
  component: Ltpz027,
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

      <Ltpz027 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
