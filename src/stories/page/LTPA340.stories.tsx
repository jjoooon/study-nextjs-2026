/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA340 from '@/app/pub/ispl/pages/LTPA340';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/page/LTPA340',
  component: LTPA340,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA340 />
  </LayoutDoc>
);
