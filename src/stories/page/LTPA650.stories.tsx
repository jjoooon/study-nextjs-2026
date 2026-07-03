/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA650 from '@/app/pub/ispl/pages/LTPA650';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA650',
  component: LTPA650,
};

export const Default = () => (
  <StorySite>
    <LTPA650 />
  </StorySite>
);
