/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz030 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz030';

export default {
  title: 'app/ispl/ncMtt/components/popups/Ltpz030',
  component: Ltpz030,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz030 />
    </LayoutDoc>
  );
};
