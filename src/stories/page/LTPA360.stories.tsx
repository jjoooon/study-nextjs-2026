/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA360 from '@/app/pub/ispl/pages/LTPA360';
import { LayoutDoc } from '@layout/BaseLayout';


export default {
  title: 'app/_excluded/page/LTPA360',
  component: LTPA360,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA360 />
  </LayoutDoc>
);
