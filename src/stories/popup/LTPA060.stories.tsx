/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa060 from '@/features/pub/ispl/ncMtt/components/popups/Ltpa060';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPA060',
  component: Ltpa060,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa060 />
    </LayoutDoc>
  );
};
