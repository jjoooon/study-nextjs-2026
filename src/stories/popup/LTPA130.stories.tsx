/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpa130 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpa130';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpa130',
  component: Ltpa130,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa130 />
    </LayoutDoc>
  );
};
