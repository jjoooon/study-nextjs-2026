/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import LTPA060 from '@/app/pub/ispl/pages/LTPA060';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/ispl/ncMtt/LTPA060',
  component: LTPA060,
};

export const Default = () => (
  <StorySite>
    <LTPA060 />
  </StorySite>
);
