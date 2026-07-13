/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA680 from '@/app/pub/aqr/pages/LTPA680';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/aqr/ncMtt/LTPA680',
  component: LTPA680,
};

export const Default = () => (
  <StorySite>
    <LTPA680 />
  </StorySite>
);
