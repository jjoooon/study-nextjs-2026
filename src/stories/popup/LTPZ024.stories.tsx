/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz024 from '@/features/pub/ispl/udRqRst/components/popups/Ltpz024';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ024',
  component: Ltpz024,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz024 />
    </LayoutDoc>
  );
};
