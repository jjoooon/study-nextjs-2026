/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA440 from '@/app/pub/ispl/pages/LTPA440';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA440',
  component: LTPA440,
};

export const Default = () => (
  <StorySite>
    <LTPA440 />
  </StorySite>
);
