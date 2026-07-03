/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA600 from '@/app/pub/ispl/pages/LTPA600';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA600',
  component: LTPA600,
};

export const Default = () => (
  <StorySite>
    <LTPA600 />
  </StorySite>
);
