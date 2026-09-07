/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz205 from '@/features/pub/shared/components/popups/Ltpz205';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ205',
  component: Ltpz205,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz205 />
    </LayoutDoc>
  );
};
