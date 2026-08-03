/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz075 from '@/features/pub/ispl/crmtt/components/popups/Ltpz075';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ075',
  component: Ltpz075,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz075 />
    </LayoutDoc>
  );
};
