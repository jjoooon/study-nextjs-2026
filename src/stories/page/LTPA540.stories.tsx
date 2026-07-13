/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA540 from '@/app/pub/ispl/pages/LTPA540';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA540',
  component: LTPA540,
};

export const Default = () => (
  <StorySite>
    <LTPA540 />
  </StorySite>
);
