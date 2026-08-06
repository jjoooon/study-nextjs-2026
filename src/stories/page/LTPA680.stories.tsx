/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA680 from '@/app/pub/aqr/pages/LTPA680';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA680',
  component: LTPA680,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA680 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA680" />;
