/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA210 from '@/app/pub/ispl/pages/LTPA210';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA210',
  component: LTPA210,
};

export const Default = () => (
  <StorySite>
    <LTPA210 />
  </StorySite>
);
