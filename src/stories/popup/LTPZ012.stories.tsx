/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz012 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz012';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ012',
  component: Ltpz012,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz012 />
    </LayoutDoc>
  );
};
