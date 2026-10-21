/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz120 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz120';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ120',
  component: Ltpz120,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz120 />
    </LayoutDoc>
  );
};
