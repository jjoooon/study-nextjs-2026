/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz071 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz071';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ071',
  component: Ltpz071,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz071 />
    </LayoutDoc>
  );
};
