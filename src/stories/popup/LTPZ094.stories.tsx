/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz094 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz094';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ094',
  component: Ltpz094,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz094 />
    </LayoutDoc>
  );
};
