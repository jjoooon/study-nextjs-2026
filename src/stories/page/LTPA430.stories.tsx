/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA430 from '@/app/pub/ispl/pages/LTPA430';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/page/LTPA430',
  component: LTPA430,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA430 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA430" />;
