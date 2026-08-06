/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA220 from '@/app/pub/ispl/pages/LTPA220';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA220',
  component: LTPA220,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA220 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA220" />;
