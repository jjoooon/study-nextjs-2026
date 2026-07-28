/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA200 from '@/app/pub/ispl/pages/LTPA200';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA200',
  component: LTPA200,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA200 />
  </LayoutDoc>
);
