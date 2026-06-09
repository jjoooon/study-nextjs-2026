/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import { Ltpz01001 } from '@/features/pub/ispl/cvrPl/components/popups/Ltpz01001';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz01001',
  component: Ltpz01001,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz01001 />
    </LayoutDoc>
  );
};
