/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz067 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz067';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ067',
  component: Ltpz067,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz067 />
    </LayoutDoc>
  );
};
