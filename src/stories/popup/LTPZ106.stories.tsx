/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Ltpz106 } from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz106';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPZ106',
  component: Ltpz106,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz106 />
    </LayoutDoc>
  );
};
