/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA560 from '@/app/pub/ispl/pages/LTPA560';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA560',
  component: LTPA560,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA560 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA560" />;
