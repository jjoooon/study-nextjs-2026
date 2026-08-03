/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz056 from '@/features/pub/shared/components/popups/Ltpz056';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ056',
  component: Ltpz056,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz056 />
    </LayoutDoc>
  );
};
