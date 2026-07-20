/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import React from 'react';
import Ltpz021 from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz021';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/ispl/gdPlSlc/components/popups/Ltpz021',
  component: Ltpz021,
};

export const Default = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <LayoutDoc>
      <Button className="w-auto" variant="outlined" color="gray" onClick={() => setOpen(true)}>
        열기
      </Button>
      <Ltpz021 open={open} onOpenChange={(value) => setOpen(value)} />
    </LayoutDoc>
  );
};
