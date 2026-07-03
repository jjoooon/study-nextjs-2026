/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA301 from '@/app/pub/ispl/pages/LTPA301';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/udrtkGu/LTPA301',
  component: LTPA301,
};

export const Default = () => (
  <StorySite>
    <LTPA301 />
  </StorySite>
);
