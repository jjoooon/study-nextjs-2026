/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA190 from '@/app/pub/ispl/pages/LTPA190';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/page/LTPA190',
  component: LTPA190,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA190 />
  </LayoutDoc>
);
