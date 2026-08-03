/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz076 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz076';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/Ltpz076',
  component: Ltpz076,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz076 />
    </LayoutDoc>
  );
};
