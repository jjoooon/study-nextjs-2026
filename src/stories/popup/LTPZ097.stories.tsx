/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz097 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz097';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ097',
  component: Ltpz097,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz097 />
    </LayoutDoc>
  );
};
