/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz010 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz010';

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
