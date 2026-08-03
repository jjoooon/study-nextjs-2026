/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Ltpz994 } from '@/features/pub/shared/components/popups/Ltpz994';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ994',
  component: Ltpz994,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz994 />
    </LayoutDoc>
  );
};
