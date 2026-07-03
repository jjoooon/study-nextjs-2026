/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA570 from '@/app/pub/ispl/pages/LTPA570';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA570',
  component: LTPA570,
};

export const Default = () => (
  <StorySite>
    <LTPA570 />
  </StorySite>
);
