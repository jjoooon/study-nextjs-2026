/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz064 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz064';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/LTPZ064',
  component: Ltpz064,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz064 />
    </LayoutDoc>
  );
};
