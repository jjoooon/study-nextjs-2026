/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA430 from '@/app/pub/ispl/pages/LTPA430';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/isplBsnsSupt/LTPA430',
  component: LTPA430,
};

export const Default = () => (
  <StorySite>
    <LTPA430 />
  </StorySite>
);
