/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz040 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz040';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ040',
  component: Ltpz040,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz040 />
    </LayoutDoc>
  );
};
