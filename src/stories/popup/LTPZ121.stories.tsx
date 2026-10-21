/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz121 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz121';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ121',
  component: Ltpz121,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz121 />
    </LayoutDoc>
  );
};
