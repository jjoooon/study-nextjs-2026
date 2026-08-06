/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA690 from '@/features/pub/shared/components/Ltpa690Section';
import { LayoutDoc } from '@layout/BaseLayout';
import { DevPageIframe } from '../DevPageIframe';

export default {
  title: 'app/_excluded/page/LTPA690',
  component: LTPA690,
};

export const Default = () => (
  <LayoutDoc>
    <LTPA690 />
  </LayoutDoc>
);

export const Dev = () => <DevPageIframe pageId="LTPA690" />;
