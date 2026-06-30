/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import Ltpz030 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz030';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/ncMtt/components/popups/Ltpz030',
  component: Ltpz030,
};

export const Default = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <LayoutDoc>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--color-primary-50, #ff5c2e)',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          팝업 열기 (LTPZ030)
        </button>
      )}
      <Ltpz030 open={open} onOpenChange={setOpen} disabledIds={['health10', 'health8']} />
    </LayoutDoc>
  );
};
