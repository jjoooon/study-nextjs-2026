/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA300 from '@/app/pub/ispl/pages/LTPA300';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/udrtkGu/LTPA300',
  component: LTPA300,
};

export const Default = () => (
  <StorySite>
    <LTPA300 />
  </StorySite>
);
