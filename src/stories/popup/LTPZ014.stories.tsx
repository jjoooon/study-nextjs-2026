/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz014 from '@/features/pub/shared/components/popups/Ltpz014';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ014',
  component: Ltpz014,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz014 />
    </LayoutDoc>
  );
};
