/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA490 from '@/app/pub/ispl/pages/LTPA490';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA490',
  component: LTPA490,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA490 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA490" />;
