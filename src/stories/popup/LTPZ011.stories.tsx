/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz011 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz011';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ011',
  component: Ltpz011,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz011 />
    </LayoutDoc>
  );
};
