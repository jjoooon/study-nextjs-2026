/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz110 from '@/features/pub/shared/components/popups/Ltpz110';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/shared/components/popups/Ltpz110',
  component: Ltpz110,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz110 />
    </LayoutDoc>
  );
};

export const Simplified = () => {
  return (
    <LayoutDoc>
      <Ltpz110 isID={true} />
    </LayoutDoc>
  );
};
