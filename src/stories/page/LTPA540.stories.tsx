/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA540 from '@/app/pub/ispl/pages/LTPA540';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA540',
  component: LTPA540,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA540 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA540" />;
