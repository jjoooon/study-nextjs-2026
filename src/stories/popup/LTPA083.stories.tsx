/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz083 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz083';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ083',
  component: Ltpz083,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz083 />
    </LayoutDoc>
  );
};
