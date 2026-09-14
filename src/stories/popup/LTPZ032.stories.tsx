/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz032 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz032';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ032',
  component: Ltpz032,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz032 />
    </LayoutDoc>
  );
};
