/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { ArrowIcon } from '@icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogSection,
  DialogFooterArea,
  DialogClose,
  DialogTitle,
} from '@uiux/Dialog';
import { ErrorIcon } from '@/shared/components/icons/CommonIcons';

const Ltpz999 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false} resizable={true} size={'sm'} className="grid-rows-[1fr_auto]">
        <VisuallyHidden.Root>
          <DialogTitle>시스템 오류 안내</DialogTitle>
        </VisuallyHidden.Root>
        <DialogSection className="pt-5 gap-5">
          <Grow placement="ec" className="text-[var(--color-gray-70)]">
            코드 LTRE006(trandZomH110)
          </Grow>
          <Gcol gap={2}>
            <Grow className="w-[4.4rem] h-[4.4rem] bg-[var(--color-gray-5)] rounded-3xl">
              <ErrorIcon />
            </Grow>
            <Typo variant={'body-lg'} className="font-bold">
              오류
            </Typo>
          </Gcol>
          <Gcol placement="cc">
            <BulletItem type="dot">시스템 오류가 발생했습니다.</BulletItem>
            <BulletItem type="dot">시스템 문구가 더 길어질수 있습니다.</BulletItem>
            <BulletItem type="dot">시스템 메시지는 기본 90자까지 이내를 권장합니다.</BulletItem>
            <BulletItem type="dot">최대한 90자 이내로 정의 부탁드립니다.</BulletItem>
            <BulletItem type="dot">시스템 오류가 발행했습니다.</BulletItem>
            <Gcol
              className="rounded-[0.6rem] bg-[var(--color-gray-5)] p-2 gap-2 border border-[var(--color-gray-15)] max-w-[36rem]"
              placement="ss"
            >
              <Button variant={'none'} className="!justify-between w-full font-bold">
                처리방안 <ArrowIcon className="rotate-[-90deg]" size={16} />
              </Button>
              <div className="">
                오류가 났을 경우 해소는 이렇게 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                <br />
                [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
              </div>
            </Gcol>
          </Gcol>
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
