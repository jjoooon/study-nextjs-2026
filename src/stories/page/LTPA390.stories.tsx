/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA390 from '@/app/pub/ispl/pages/LTPA390';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA390',
  component: LTPA390,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA390 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA390" />;
