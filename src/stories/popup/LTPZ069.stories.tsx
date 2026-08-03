/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz069 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz069';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ069',
  component: Ltpz069,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz069 />
    </LayoutDoc>
  );
};
