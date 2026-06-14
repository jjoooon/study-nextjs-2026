/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa401 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpa401';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpa401',
  component: Ltpa401,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa401 />
    </LayoutDoc>
  );
};
