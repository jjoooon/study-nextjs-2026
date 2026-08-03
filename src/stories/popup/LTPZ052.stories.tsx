/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz052 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz052';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPZ052',
  component: Ltpz052,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz052 />
    </LayoutDoc>
  );
};
