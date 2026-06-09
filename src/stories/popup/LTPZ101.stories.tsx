/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz101 from '@/features/pub/ispl/aplMtt/components/popups/Ltpz101';

export default {
  title: 'app/ispl/aplMtt/components/popups/Ltpz101',
  component: Ltpz101,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz101 />
    </LayoutDoc>
  );
};
