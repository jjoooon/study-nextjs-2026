/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA390 from '@/app/pub/ispl/pages/LTPA390';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA390',
  component: LTPA390,
};

export const Default = () => (
  <StorySite>
    <LTPA390 />
  </StorySite>
);
