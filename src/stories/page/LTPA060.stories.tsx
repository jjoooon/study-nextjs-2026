/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import LTPA060 from '@/app/pub/ispl/pages/LTPA060';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/ncMtt/LTPA060',
  component: LTPA060,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA060 />
  </LayoutDoc>
);
