/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz01601 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz01601';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPZ01601',
  component: Ltpz01601,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz01601 />
    </LayoutDoc>
  );
};
