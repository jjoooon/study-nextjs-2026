/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA600 from '@/app/pub/ispl/pages/LTPA600';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA600',
  component: LTPA600,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA600 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA600" />;
