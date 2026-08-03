/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz018 from '@/features/pub/shared/components/popups/Ltpz018';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ018',
  component: Ltpz018,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz018 />
    </LayoutDoc>
  );
};
