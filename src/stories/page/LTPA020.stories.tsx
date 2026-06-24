/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA020 from '@/app/pub/ispl/pages/LTPA020';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/gdPlSlc/LTPA020',
  component: LTPA020,
};

export const Default = () => (
  <StorySite>
    <LTPA020 />
  </StorySite>
);
