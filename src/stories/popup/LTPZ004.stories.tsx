/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz004 from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz004';

export default {
  title: 'app/ispl/gdPlSlc/components/popups/Ltpz004',
  component: Ltpz004,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz004 />
    </LayoutDoc>
  );
};
