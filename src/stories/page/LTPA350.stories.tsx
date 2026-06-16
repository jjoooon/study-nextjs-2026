/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA350 from '@/app/pub/ispl/pages/LTPA350';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/LTPA350',
  component: LTPA350,
};

export const Default = () => (
  <StorySite>
    <LTPA350 />
  </StorySite>
);
