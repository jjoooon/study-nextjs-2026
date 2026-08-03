/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz030 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz030';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ030',
  component: Ltpz030,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz030 />
    </LayoutDoc>
  );
};
