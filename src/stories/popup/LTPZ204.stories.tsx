/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz204 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz204';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ204',
  component: Ltpz204,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz204 />
    </LayoutDoc>
  );
};
