'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooter,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import React from 'react';

const Ltpz014 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              동영상 매뉴얼 바로가기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ014)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Gcol className="w-full" gap={5} placement="ss">
            <Typo tag={'p'} variant={'body-lg'}>
              버튼을 클릭하시면 스마트가이드의 동영상 매뉴얼 파일로 연결됩니다.
            </Typo>
            <Gcol className="w-full text-center" gap={1}>
              <Button
                color="primary"
                style={{ width: '26.7rem' }}
                onClick={() => {}}
                only="default"
                size="xl"
                variant="outlined"
              >
                가입설계 매뉴얼(인보험, 재물보험, 단체보험)
              </Button>
              <Button
                color="primary"
                style={{ width: '26.7rem' }}
                onClick={() => {}}
                only="default"
                size="xl"
                variant="outlined"
              >
                휴대폰 전자서명 및 바이오인증 매뉴얼
              </Button>
            </Gcol>
            {/* M1. variant="body-sm" 수정 */}
            <Typo color="default" icon="info" tag="div" variant="body-sm" weight="normal">
              LIFEPRO 앱에서도 확인하실 수 있습니다.
              <br />
              클래스&gt;전산기초&gt;전산및모바일길라잡이&gt;기초매뉴얼
            </Typo>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz014;
