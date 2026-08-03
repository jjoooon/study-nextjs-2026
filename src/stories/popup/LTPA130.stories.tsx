/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa130 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpa130';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPA130',
  component: Ltpa130,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa130 />
    </LayoutDoc>
  );
};
