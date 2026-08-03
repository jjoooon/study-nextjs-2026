/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz058 from '@/features/pub/ispl/crmtt/components/popups/Ltpz058';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ058',
  component: Ltpz058,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz058 />
    </LayoutDoc>
  );
};
