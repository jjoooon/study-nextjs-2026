/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import Ltpz013 from '@/features/pub/ispl/cvrPl/components/popups/Ltpz013';

export default {
  title: 'app/ispl/cvrPl/components/popups/Ltpz013',
  component: Ltpz013,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz013 />
    </LayoutDoc>
  );
};
