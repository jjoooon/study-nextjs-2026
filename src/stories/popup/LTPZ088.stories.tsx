/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz088 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz088';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ088',
  component: Ltpz088,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz088 />
    </LayoutDoc>
  );
};
