/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA250 from '@/app/pub/ispl/pages/LTPA250';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA250',
  component: LTPA250,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA250 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA250" />;
