/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz011 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz011';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpz011',
  component: Ltpz011,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz011 />
    </LayoutDoc>
  );
};
