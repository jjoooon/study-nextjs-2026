/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA200 from '@/app/pub/ispl/pages/LTPA200';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA200',
  component: LTPA200,
};

export const Default = () => (
  <StorySite>
    <LTPA200 />
  </StorySite>
);
