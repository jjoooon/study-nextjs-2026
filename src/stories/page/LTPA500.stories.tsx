/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA500 from '@/app/pub/ispl/pages/LTPA500';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA500',
  component: LTPA500,
};

export const Default = () => (
  <StorySite>
    <LTPA500 />
  </StorySite>
);
