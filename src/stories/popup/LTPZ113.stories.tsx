/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz113 from '@/features/pub/shared/components/popups/Ltpz113';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ113',
  component: Ltpz113,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz113 />
    </LayoutDoc>
  );
};
