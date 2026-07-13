/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA490 from '@/app/pub/ispl/pages/LTPA490';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA490',
  component: LTPA490,
};

export const Default = () => (
  <StorySite>
    <LTPA490 />
  </StorySite>
);
