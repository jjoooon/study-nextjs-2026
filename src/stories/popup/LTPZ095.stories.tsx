/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz095 from '@/features/pub/ispl/udRqRst/components/popups/Ltpz095';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/popup/LTPZ095',
  component: Ltpz095,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Button>asdfasdf</Button>
      <Ltpz095 />
    </LayoutDoc>
  );
};
