/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA240 from '@/app/pub/ispl/pages/LTPA240';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA240',
  component: LTPA240,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA240 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA240" />;
