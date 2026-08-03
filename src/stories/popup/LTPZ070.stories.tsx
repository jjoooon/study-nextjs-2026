/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz070 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz070';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ070',
  component: Ltpz070,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz070 />
    </LayoutDoc>
  );
};
