/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz102 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz102';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ102',
  component: Ltpz102,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz102 />
    </LayoutDoc>
  );
};
