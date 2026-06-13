/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz01601 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz01601';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz01601',
  component: Ltpz01601,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz01601 />
    </LayoutDoc>
  );
};
