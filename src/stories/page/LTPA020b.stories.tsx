/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA020b from '@/app/pub/ispl/pages/LTPA020b';
import { LayoutDoc } from '@layout/BaseLayout';
export default {
  title: 'app/ispl/gdPlSlc/LTPA020b',
  component: LTPA020b,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA020b />
  </LayoutDoc>
);
