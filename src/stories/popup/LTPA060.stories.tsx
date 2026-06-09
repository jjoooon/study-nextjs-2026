/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import { Ltpa060 } from '@/features/pub/shared/components/popups/ncMtt/Ltpa060';

export default {
  title: 'app/shared/components/popups/ncMtt/Ltpa060',
  component: Ltpa060,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa060 />
    </LayoutDoc>
  );
};
