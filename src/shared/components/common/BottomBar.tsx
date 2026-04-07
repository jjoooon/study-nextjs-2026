'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogListIcon, DialogResetIcon } from '@icons';
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
