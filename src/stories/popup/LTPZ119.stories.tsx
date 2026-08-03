/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz119 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz119';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ119',
  component: Ltpz119,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz119 />
    </LayoutDoc>
  );
};
