/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA250 from '@/app/pub/ispl/pages/LTPA250';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA250',
  component: LTPA250,
};

export const Default = () => (
  <StorySite>
    <LTPA250 />
  </StorySite>
);
