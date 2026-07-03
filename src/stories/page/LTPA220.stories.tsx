/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA220 from '@/app/pub/ispl/pages/LTPA220';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/udrtkGu/LTPA220',
  component: LTPA220,
};

export const Default = () => (
  <StorySite>
    <LTPA220 />
  </StorySite>
);
