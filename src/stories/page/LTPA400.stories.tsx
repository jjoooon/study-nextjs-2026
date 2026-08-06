/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA400 from '@/app/pub/ispl/pages/LTPA400';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA400',
  component: LTPA400,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA400 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA400" />;
