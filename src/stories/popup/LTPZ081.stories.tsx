/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz081 from '@/features/pub/ispl/aplMtt/Ltpz081';

export default {
  title: 'app/ispl/aplMtt/Ltpz081',
  component: Ltpz081,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz081 />
    </LayoutDoc>
  );
};
