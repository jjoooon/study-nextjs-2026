/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA200 from '@/app/pub/ispl/pages/LTPA200';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA200',
  component: LTPA200,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA200 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA200" />;
