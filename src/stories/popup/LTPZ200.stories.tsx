/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz200 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz200';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ200',
  component: Ltpz200,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz200 />
    </LayoutDoc>
  );
};
