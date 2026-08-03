/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz057 from '@/features/pub/ispl/crmtt/components/popups/Ltpz057';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ057',
  component: Ltpz057,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz057 />
    </LayoutDoc>
  );
};
