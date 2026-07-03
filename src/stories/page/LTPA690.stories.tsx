/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import LTPA690 from '@/features/pub/shared/components/Ltpa690Section';
import { StorySite } from '@/shared/components/storybook/StoryWrap';

export default {
  title: 'app/shared/components/LTPA690',
  component: LTPA690,
};

export const Default = () => (
  <StorySite>
    <LTPA690 />
  </StorySite>
);
