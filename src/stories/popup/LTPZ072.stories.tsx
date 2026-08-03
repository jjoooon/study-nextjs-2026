/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz072 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz072';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ072',
  component: Ltpz072,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz072 />
    </LayoutDoc>
  );
};
