/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA440 from '@/app/pub/ispl/pages/LTPA440';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA440',
  component: LTPA440,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA440 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA440" />;
