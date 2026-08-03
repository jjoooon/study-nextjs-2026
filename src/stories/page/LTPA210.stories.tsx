/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA210 from '@/app/pub/ispl/pages/LTPA210';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/page/LTPA210',
  component: LTPA210,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA210 />
  </LayoutDoc>
);
