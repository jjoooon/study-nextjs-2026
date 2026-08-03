/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz049 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz049';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ049',
  component: Ltpz049,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz049 />
    </LayoutDoc>
  );
};
