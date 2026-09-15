/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPZ203 from '@/features/pub/shared/components/popups/Ltpz203';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ203',
  component: LTPZ203,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <LTPZ203 />
    </LayoutDoc>
  );
};
