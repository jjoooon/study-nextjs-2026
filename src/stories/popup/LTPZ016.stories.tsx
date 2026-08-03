/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz016 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz016';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ016',
  component: Ltpz016,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz016 />
    </LayoutDoc>
  );
};
