/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz086 from '@/features/pub/shared/components/popups/Ltpz086';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ086',
  component: Ltpz086,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz086 />
    </LayoutDoc>
  );
};
