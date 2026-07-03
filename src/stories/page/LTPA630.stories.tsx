/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA630 from '@/app/pub/ispl/pages/LTPA630';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA630',
  component: LTPA630,
};

export const Default = () => (
  <StorySite>
    <LTPA630 />
  </StorySite>
);
