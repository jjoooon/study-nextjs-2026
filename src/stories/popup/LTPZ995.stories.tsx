/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz995 from '@/features/pub/shared/components/popups/Ltpz995';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/shared/components/popups/Ltpz995',
  component: Ltpz995,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz995 resolve={() => {}} />
    </LayoutDoc>
  );
};
