/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA301 from '@/app/pub/ispl/pages/LTPA301';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/page/LTPA301',
  component: LTPA301,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA301 />
  </LayoutDoc>
);
