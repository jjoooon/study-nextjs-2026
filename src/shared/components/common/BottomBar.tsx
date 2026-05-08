/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Grow, Typo } from '@atoms';
import { DialogListIcon, DialogResetIcon, SrPermIcon, SrDecIcon, NewWin } from '@icons';
import { TextBabbleIcon } from '@icons';
import { Button } from '@uiux/Button';

export const BottomBar = () => {
  const stateText = '자료가 조회되었습니다.';

  return (
    <Grow variant={'box'} className="w-full py-0 px-2.5 border-t border-[var(--color-gray-20)]" placement={'bwc'}>
      <Grow gap={1} placement={'sc'}>
        <TextBabbleIcon />
        <Typo variant={'body-xs'} color={'gray'} className="leading-[1.1]">
          {stateText}
        </Typo>
      </Grow>
      <Grow>
        <Button variant={'none'}>
          <SrPermIcon color={'var(--color-secondary-50)'} size={12} />
          화면권한보기
        </Button>
        <Button variant={'none'}>
          <DialogListIcon color={'var(--color-secondary-50)'} size={12} />
          화면담당자
        </Button>
        <Button variant={'none'}>
          <SrDecIcon color={'var(--color-secondary-50)'} size={12} />
          화면설명
        </Button>
        <Button variant={'none'}>
          <NewWin color={'var(--color-secondary-50)'} size={12} />
          새창띄우기
        </Button>

        <Button variant={'none'} only={'icon'} aria-label="목록">
          <DialogListIcon color={'var(--color-secondary-50)'} size={12} />
        </Button>
        <Button variant={'none'} only={'icon'} aria-label="초기화">
          <DialogResetIcon color={'var(--color-secondary-50)'} />
        </Button>
      </Grow>
    </Grow>
  );
};
