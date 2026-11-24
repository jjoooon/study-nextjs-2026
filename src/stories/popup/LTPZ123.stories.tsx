/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz123 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz123';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ123',
  component: Ltpz123,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz123 />
    </LayoutDoc>
  );
};

