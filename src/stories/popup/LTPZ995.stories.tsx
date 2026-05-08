/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import FileUploader from '@/features/pub/shared/components/popups/Ltpz995';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/shared/components/popups/Ltpz995',
  component: FileUploader,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <LayoutDoc>
      <div className='flex w-full h-screen items-center justify-center max-w-[118rem] outline outline-1 outline-[red] -outline-offset-2 mx-auto'>
        <FileUploader open={open} onOpenChange={setOpen} resolve={() => {}} />
      </div>
    </LayoutDoc>
  );
};
