/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz044 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz044';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/Ltpz044',
  component: Ltpz044,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz044 />
    </LayoutDoc>
  );
};
