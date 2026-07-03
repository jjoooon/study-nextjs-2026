/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA140 from '@/app/pub/ispl/pages/LTPA140';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA140',
  component: LTPA140,
};

export const Default = () => (
  <StorySite>
    <LTPA140 />
  </StorySite>
);
