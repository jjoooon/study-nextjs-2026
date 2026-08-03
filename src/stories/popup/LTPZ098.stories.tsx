/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz098 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz098';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ098',
  component: Ltpz098,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz098 />
    </LayoutDoc>
  );
};
