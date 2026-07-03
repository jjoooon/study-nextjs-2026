/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA560 from '@/app/pub/ispl/pages/LTPA560';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA560',
  component: LTPA560,
};

export const Default = () => (
  <StorySite>
    <LTPA560 />
  </StorySite>
);
