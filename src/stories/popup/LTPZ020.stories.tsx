/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz020 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz020';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ020',
  component: Ltpz020,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz020 open={true} />
    </LayoutDoc>
  );
};
