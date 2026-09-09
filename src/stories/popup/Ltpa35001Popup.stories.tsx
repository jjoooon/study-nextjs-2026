/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpa35001Popup from '@/features/pub/ispl/crmtt/components/popups/Ltpa35001Popup';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/Ltpa35001Popup',
  component: Ltpa35001Popup,
};

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpa35001Popup />
    </LayoutDoc>
  );
};
