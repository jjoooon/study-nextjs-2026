/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz01002 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz01002';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/Ltpz01002',
  component: Ltpz01002,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz01002 />
    </LayoutDoc>
  );
};
