/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz005 from '@/features/pub/shared/components/popups/Ltpz005';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ005',
  component: Ltpz005,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz005 open={true} />
    </LayoutDoc>
  );
};
