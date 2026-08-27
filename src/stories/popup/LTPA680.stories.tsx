/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa680 from '@/features/pub/aqr/ncMtt/components/popups/Ltpa680';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPA680',
  component: Ltpa680,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa680 />
    </LayoutDoc>
  );
};
