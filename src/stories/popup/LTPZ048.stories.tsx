/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz048 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz048';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ048',
  component: Ltpz048,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz048 />
    </LayoutDoc>
  );
};
