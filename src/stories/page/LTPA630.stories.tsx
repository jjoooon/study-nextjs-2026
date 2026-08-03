/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA630 from '@/app/pub/ispl/pages/LTPA630';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/page/LTPA630',
  component: LTPA630,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA630 />
  </LayoutDoc>
);
