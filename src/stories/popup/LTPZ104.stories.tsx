/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz104 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz104';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ104',
  component: Ltpz104,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz104 />
    </LayoutDoc>
  );
};
