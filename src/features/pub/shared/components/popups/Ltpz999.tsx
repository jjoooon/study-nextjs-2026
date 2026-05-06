'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogSection, DialogFooterArea, DialogClose } from '@uiux/Dialog';
import type { ColDef } from 'ag-grid-community';
import { ErrorIcon } from '@/shared/components/icons/CommonIcons';
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

const Ltpz999 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} resizable={true} size="md" className="grid-rows-[1fr_auto]">
        <DialogSection className="grid-rows-[1fr] pt-5 gap={5}">
          <Grow placement="ec" className="text-[var(--color-gray-70)]">
            코드 LTRE006(trandZomH110)
          </Grow>
            <Gcol gap={2}>
              <Grow className="w-[4.4rem] h-[4.4rem] bg-[var(--color-gray-5)] rounded-3xl">
                <ErrorIcon />
              </Grow>
              <Typo variant={'body-lg'} className="font-bold">오류</Typo>
            </Gcol>
            <BulletList position="col" className="items-center">
              <BulletListItem
                before="1."
                className="w-fit self-center whitespace-nowrap [&>div:last-child]:w-auto [&>div:last-child]:flex-none"
                color="default"
                size="md"
                type="dot"
              >
                시스템 오류가 발생했습니다. 
              </BulletListItem>
              <BulletListItem
                before="①"
                className="w-fit self-center whitespace-nowrap [&>div:last-child]:w-auto [&>div:last-child]:flex-none"
                color="default"
                size="md"
                type="dot"
              >
                시스템 문구가 더 길어질수 있습니다.
              </BulletListItem>
              <BulletListItem
                before="㉠"
                className="w-fit self-center whitespace-nowrap [&>div:last-child]:w-auto [&>div:last-child]:flex-none"
                color="default"
                onClick={() => {}}
                size="md"
                type="dot"
              >
                시스템 메시지는 기본 90자까지 이내를 권장합니다.
              </BulletListItem>
              <BulletListItem
                before="㉠"
                className="w-fit self-center whitespace-nowrap [&>div:last-child]:w-auto [&>div:last-child]:flex-none"
                color="default"
                onClick={() => {}}
                size="md"
                type="dot"
              >
                최대한 90자 이내로 정의 부탁드립니다.
              </BulletListItem>
              <BulletListItem
                before="㉠"
                className="w-fit self-center whitespace-nowrap [&>div:last-child]:w-auto [&>div:last-child]:flex-none"
                color="default"
                onClick={() => {}}
                size="md"
                type="dot"
              >
                시스템 오류가 발행했습니다.
              </BulletListItem>
            </BulletList>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                메시지 개선요청
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                알림상세설명
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                연계버튼
              </Button>
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

export default Ltpz999;
