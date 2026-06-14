/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz010 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz010';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz010',
  component: Ltpz010,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz010 />
    </LayoutDoc>
  );
};
