'use client';

import { Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import React from 'react';
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz014 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              동영상 메뉴얼 바로가기
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
            <BulletList position="col">
              <BulletListItem className="whitespace-nowrap" color="default" size="md" type="star">
                LIFEPRO 앱에서도 확인하실 수 있습니다.<br></br>
                클래스&gt;전산기초&gt;전산및모바일길라잡이&gt;기초매뉴얼
              </BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>
      </DialogContent>
    </Dialog>
  );
};
