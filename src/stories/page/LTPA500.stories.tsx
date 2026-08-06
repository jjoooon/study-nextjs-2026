/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA500 from '@/app/pub/ispl/pages/LTPA500';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA500',
  component: LTPA500,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA500 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA500" />;
