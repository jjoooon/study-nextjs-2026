/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA110 from '@/app/pub/ispl/pages/LTPA110';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA110',
  component: LTPA110,
};

export const Default = () => (
  <StorySite>
    <LTPA110 />
  </StorySite>
);
