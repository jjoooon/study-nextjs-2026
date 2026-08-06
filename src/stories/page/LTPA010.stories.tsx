/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA010 from '@/app/pub/ispl/pages/LTPA010';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA010',
  component: LTPA010,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA010 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA010" />;
