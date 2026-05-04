import { Controls, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import Ltpz062 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz062';

export default {
  title: 'app/ispl/ncMtt/components/popups/Ltpz062',
  component: Ltpz062,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <Button variant={'contained'} onClick={() => setOpen(true)}>Ltpz062 열기</Button>
      </div>

      <Ltpz062 />
    </LayoutDoc>
  );
};
