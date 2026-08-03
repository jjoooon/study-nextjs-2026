/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz087 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz087';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ087',
  component: Ltpz087,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz087 />
    </LayoutDoc>
  );
};
