/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA030 from '@/app/pub/ispl/pages/LTPA030';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/_excluded/page/LTPA030',
  component: LTPA030,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA030 />
  </LayoutDoc>
);
