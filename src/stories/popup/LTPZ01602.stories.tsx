/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz01602 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz01602';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPZ01602',
  component: Ltpz01602,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz01602 />
    </LayoutDoc>
  );
};
