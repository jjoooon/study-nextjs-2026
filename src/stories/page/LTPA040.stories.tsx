/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA040 from '@/app/pub/ispl/pages/LTPA040';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA040',
  component: LTPA040,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA040 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA040" />;
