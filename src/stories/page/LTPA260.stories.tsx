/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA260 from '@/app/pub/ispl/pages/LTPA260';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA260',
  component: LTPA260,
};

export const Default = () => (
  <StorySite>
    <LTPA260 />
  </StorySite>
);
