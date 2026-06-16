/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz060 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz060';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz060',
  component: Ltpz060,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz060 />
    </LayoutDoc>
  );
};
