/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA350 from '@/app/pub/ispl/pages/LTPA350';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA350',
  component: LTPA350,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA350 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA350" />;
