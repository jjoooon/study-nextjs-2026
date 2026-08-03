/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz066 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz066';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ066',
  component: Ltpz066,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz066 />
    </LayoutDoc>
  );
};
