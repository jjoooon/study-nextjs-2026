/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA050 from '@/app/pub/ispl/pages/LTPA050';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA050',
  component: LTPA050,
};

export const Default = () => (
  <StorySite>
    <LTPA050 />
  </StorySite>
);
