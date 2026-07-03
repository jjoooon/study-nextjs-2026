/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA010 from '@/app/pub/ispl/pages/LTPA010';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA010',
  component: LTPA010,
};

export const Default = () => (
  <StorySite>
    <LTPA010 />
  </StorySite>
);
