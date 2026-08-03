/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz061 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz061';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ061',
  component: Ltpz061,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz061 />
    </LayoutDoc>
  );
};
