/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz122 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz122';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ122',
  component: Ltpz122,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz122 />
    </LayoutDoc>
  );
};
