/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz041 from '@/features/pub/ispl/crmtt/components/popups/Ltpz041';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ041',
  component: Ltpz041,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz041 />
    </LayoutDoc>
  );
};
