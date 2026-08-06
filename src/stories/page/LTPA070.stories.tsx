/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA070 from '@/app/pub/ispl/pages/LTPA070';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA070',
  component: LTPA070,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA070 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA070" />;
