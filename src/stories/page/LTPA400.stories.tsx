/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA400 from '@/app/pub/ispl/pages/LTPA400';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA400',
  component: LTPA400,
};

export const Default = () => (
  <StorySite>
    <LTPA400 />
  </StorySite>
);
