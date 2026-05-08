/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import '@/shared/lib/agGridPub';

import { Gcol, Typo } from '@atoms';

import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

const Ltpz093 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} className="w-[24rem]">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계동의 QR스캔
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement="ss">
            {/* 샘플이미지 */}
            <img src="/images/Ltpa093/qr-code-sample.png" alt="QR코드 샘플" style={{ width: '100%' }} />
          </Gcol>
        </DialogSection>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz093;
