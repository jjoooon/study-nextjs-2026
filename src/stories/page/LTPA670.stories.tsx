/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA670 from '@/app/pub/ispl/pages/LTPA670';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA670',
  component: LTPA670,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA670 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA670" />;
