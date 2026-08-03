/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz062 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz062';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ062',
  component: Ltpz062,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz062 />
    </LayoutDoc>
  );
};
