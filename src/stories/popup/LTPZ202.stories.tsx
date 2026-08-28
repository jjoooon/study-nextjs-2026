/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz202 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz202';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ202',
  component: Ltpz202,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz202 />
    </LayoutDoc>
  );
};
