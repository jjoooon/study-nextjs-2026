/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz207 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz207';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ207',
  component: Ltpz207,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz207 />
    </LayoutDoc>
  );
};
