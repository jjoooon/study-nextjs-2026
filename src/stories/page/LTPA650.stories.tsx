/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA650 from '@/app/pub/ispl/pages/LTPA650';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA650',
  component: LTPA650,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA650 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA650" />;
