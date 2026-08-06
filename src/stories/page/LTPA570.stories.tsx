/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA570 from '@/app/pub/ispl/pages/LTPA570';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA570',
  component: LTPA570,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA570 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA570" />;
