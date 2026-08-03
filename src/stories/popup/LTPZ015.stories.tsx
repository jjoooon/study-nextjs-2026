/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz015 from '@/features/pub/shared/components/popups/Ltpz015';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPZ015',
  component: Ltpz015,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz015 />
    </LayoutDoc>
  );
};
