/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA140 from '@/app/pub/ispl/pages/LTPA140';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/page/LTPA140',
  component: LTPA140,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA140 />
  </LayoutDoc>
);
