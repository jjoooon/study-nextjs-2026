/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA330 from '@/app/pub/ispl/pages/LTPA330';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA330',
  component: LTPA330,
};

export const Default = () => (
  <StorySite>
    <LTPA330 />
  </StorySite>
);
