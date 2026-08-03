/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz036 from '@/features/pub/ispl/udRqRst/components/popups/Ltpz036';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ036',
  component: Ltpz036,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz036 />
    </LayoutDoc>
  );
};
