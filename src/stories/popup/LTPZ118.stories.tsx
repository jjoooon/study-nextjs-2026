/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz118 from '@/features/pub/shared/components/popups/Ltpz118';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ118',
  component: Ltpz118,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz118 />
    </LayoutDoc>
  );
};
