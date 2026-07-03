/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA030 from '@/app/pub/ispl/pages/LTPA030';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA030',
  component: LTPA030,
};

export const Default = () => (
  <StorySite>
    <LTPA030 />
  </StorySite>
);
