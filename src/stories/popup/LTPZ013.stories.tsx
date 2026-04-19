import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Ltpz013 } from '@/features/pub/ispl/cvrPl/components/popups/Ltpz013';

export default {
  title: 'ispl/cvrPl/components/popups/Ltpz013',
  component: Ltpz013,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpz012 열기</Button>
      </div>

      <Ltpz013 open={open} onOpenChange={setOpen} />
    </LayoutDoc>
  );
};
