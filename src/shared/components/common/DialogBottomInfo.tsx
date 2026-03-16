'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogListIcon, DialogResetIcon } from '@icons';

export const DialogBottomInfo = () => {
  // dot 타입에 사이즈별 블릿 크기 적용
  return (
    <Grow variant={'box'} className="w-full py-1 px-2.5 border-t border-[var(--color-gray-20)]" placement={'bwc'}>
      <Typo variant={'body-xs'} color={'gray'}>자료가 조회되었습니다.</Typo>
      <Grow> 
        <Button variant={'none'} only={'icon'} aria-label="목록">
          <DialogListIcon color={'var(--color-secondary-50)'} />
        </Button>
        <Button variant={'none'} only={'icon'} aria-label="초기화">
          <DialogResetIcon color={'var(--color-secondary-50)'} />
        </Button>
      </Grow>
    </Grow>
  );
};