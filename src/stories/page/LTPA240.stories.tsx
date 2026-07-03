/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA240 from '@/app/pub/ispl/pages/LTPA240';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA240',
  component: LTPA240,
};

export const Default = () => (
  <StorySite>
    <LTPA240 />
  </StorySite>
);
