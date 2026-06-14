/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa095 from '@/features/pub/ispl/udRqRst/components/popups/Ltpa095';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/udRqRst/components/popups/Ltpa095',
  component: Ltpa095,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa095 />
    </LayoutDoc>
  );
};
