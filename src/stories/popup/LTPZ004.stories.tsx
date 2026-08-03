/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz004 from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz004';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ004',
  component: Ltpz004,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz004 />
    </LayoutDoc>
  );
};
