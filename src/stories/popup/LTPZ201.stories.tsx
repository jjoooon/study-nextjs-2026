/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz201 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz201';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/Ltpz201',
  component: Ltpz201,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz201 />
    </LayoutDoc>
  );
};
