/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa095 from '@/features/pub/ispl/udRqRst/components/popups/Ltpa095';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/popup/LTPA095',
  component: Ltpa095,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Button>asdfasdf</Button>
      <Ltpa095 />
    </LayoutDoc>
  );
};
