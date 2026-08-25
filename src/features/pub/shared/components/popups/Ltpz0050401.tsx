/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import * as React from 'react';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from '@uiux/Dialog';

const Ltpz0050401 = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="hidden"></DialogTrigger>
      <DialogContent showCloseButton resizable={false} size="md" className="w-[56rem]! h-[35rem]!">
        <DialogHeader>
          <DialogTitle>AI 추천이유</DialogTitle>
        </DialogHeader>

        <DialogSection className="p-0 flex items-center justify-center">
          <div
            className="relative bg-center bg-no-repeat"
            style={{
              width: '51.4rem',
              height: '19rem',
              backgroundImage: `url(${withPublicUrl('/images/Ltpa005/ai_box_img.jpg')})`,
              backgroundSize: '51.4rem 18.8rem',
            }}
          >
            <Typo
              tag={'p'}
              variant={'body-lg'}
              className="absolute right-[1.5rem] top-[1.8rem]"
              style={{ width: '33rem' }}
            >
              고객님의 보장 내용을 분석해보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로
              확인됩니다.
              <br />
              <br /> 목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.
              <br />
              <br /> 현재 조건에서 보장과 보험료 균형을 고려한 추천설계입니다.
            </Typo>
          </div>
        </DialogSection>
        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'ec'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <DialogClose asChild>
                  <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                    닫기
                  </Button>
                </DialogClose>
              </Grow>
            </Grow>
          </Gcol>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz0050401;
