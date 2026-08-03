/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz640 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz640';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ640',
  component: Ltpz640,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz640 />
    </LayoutDoc>
  );
};
