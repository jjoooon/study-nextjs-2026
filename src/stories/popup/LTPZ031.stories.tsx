/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz031 from '@/features/pub/ispl/ncMtt/components/popups/Ltpz031';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ031',
  component: Ltpz031,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz031 />
    </LayoutDoc>
  );
};
