/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz065 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz065';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ065',
  component: Ltpz065,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz065 />
    </LayoutDoc>
  );
};
