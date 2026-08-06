/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA340 from '@/app/pub/ispl/pages/LTPA340';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA340',
  component: LTPA340,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA340 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA340" />;
