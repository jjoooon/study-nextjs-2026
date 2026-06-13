/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { LayoutDoc } from '@layout/BaseLayout';
import * as React from 'react';
import Ltpz035 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz035';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpz035',
  component: Ltpz035,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz035 />
    </LayoutDoc>
  );
};
