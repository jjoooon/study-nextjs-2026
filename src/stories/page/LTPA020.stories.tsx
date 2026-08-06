/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA020 from '@/app/pub/ispl/pages/LTPA020';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';
export default {
  title: 'app/page/LTPA020',
  component: LTPA020,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA020 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA020" />;
