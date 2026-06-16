/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Ltpa3500401 } from '@/features/pub/ispl/udRqRst/components/popups/Ltpa3500401';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/udRqRst/components/popups/Ltpa3500401',
  component: Ltpa3500401,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa3500401 />
    </LayoutDoc>
  );
};
