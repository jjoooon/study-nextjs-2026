/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA300 from '@/app/pub/ispl/pages/LTPA300';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA300',
  component: LTPA300,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA300 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA300" />;
