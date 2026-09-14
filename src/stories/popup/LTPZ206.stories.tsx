/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz206 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz206';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ206',
  component: Ltpz206,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz206 />
    </LayoutDoc>
  );
};
