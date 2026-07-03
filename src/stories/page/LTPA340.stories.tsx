/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA340 from '@/app/pub/ispl/pages/LTPA340';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA340',
  component: LTPA340,
};

export const Default = () => (
  <StorySite>
    <LTPA340 />
  </StorySite>
);
