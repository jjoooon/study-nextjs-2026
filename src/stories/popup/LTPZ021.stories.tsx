/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import React from 'react';
import Ltpz021 from '@/features/pub/ispl/gdPlSlc/components/popups/Ltpz021';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/popup/LTPZ021',
  component: Ltpz021,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz021 />
    </LayoutDoc>
  );
};
