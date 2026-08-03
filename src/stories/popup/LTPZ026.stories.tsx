/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz026 from '@/features/pub/ispl/udRqRst/components/popups/Ltpz026';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ026',
  component: Ltpz026,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz026 />
    </LayoutDoc>
  );
};
