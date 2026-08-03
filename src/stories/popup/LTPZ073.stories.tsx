/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz073 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpa073';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/popup/LTPZ073',
  component: Ltpz073,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz073 />
    </LayoutDoc>
  );
};
