/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz019 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz019';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ019',
  component: Ltpz019,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz019 />
    </LayoutDoc>
  );
};
