/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA020 from '@/app/pub/ispl/pages/LTPA020';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/gdPlSlc/LTPA020',
  component: LTPA020,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA020 />
  </LayoutDoc>
);
