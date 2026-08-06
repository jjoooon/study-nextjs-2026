/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA110 from '@/app/pub/ispl/pages/LTPA110';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA110',
  component: LTPA110,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA110 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA110" />;
