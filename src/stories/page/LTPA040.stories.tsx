/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA040 from '@/app/pub/ispl/pages/LTPA040';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA040',
  component: LTPA040,
};

export const Default = () => (
  <StorySite>
    <LTPA040 />
  </StorySite>
);
