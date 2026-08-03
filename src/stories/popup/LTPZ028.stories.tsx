/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz028 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz028';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ028',
  component: Ltpz028,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz028 />
    </LayoutDoc>
  );
};
