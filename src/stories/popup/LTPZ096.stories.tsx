/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz096 from '@/features/pub/ispl/udRqRst/components/popups/Ltpz096';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ096',
  component: Ltpz096,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz096 />
    </LayoutDoc>
  );
};
