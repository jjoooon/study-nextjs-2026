/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA190 from '@/app/pub/ispl/pages/LTPA190';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA190',
  component: LTPA190,
};

export const Default = () => (
  <StorySite>
    <LTPA190 />
  </StorySite>
);
