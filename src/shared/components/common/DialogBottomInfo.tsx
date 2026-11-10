/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow, Typo, Grid } from '@atoms';
import { DialogListIcon, DialogResetIcon, DialogPocIcon } from '@icons';
import { TextBabbleIcon } from '@icons';
import { Button } from '@uiux/Button';

/**
 * BottomBar 팝업 컴포넌트.
 *
 * - 팝업 하단에 고정되는 바 형태의 UI를 제공한다.
 * - 상태 메시지와 여러 액션 버튼을 포함한다.
 */
export const DialogBottomInfo = () => {
  const stateText =
    '자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.자료가 조회되었습니다.';

  return (
    <Grid
      variant={'box'}
      className="grid-cols-[minmax(0,1fr)_auto] items-center w-full py-0 px-2.5 border-t border-[var(--color-gray-20)]"
      placement={'bwc'}
    >
      <Grow gap={1} placement={'sc'}>
        <TextBabbleIcon />
        <Typo
          tag="p"
          variant={'body-xs'}
          color={'gray'}
          className="leading-[1.1] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {stateText}
        </Typo>
      </Grow>
      <Grow placement="ec">
        <Button variant={'none'} className="text-[1.1rem]">
          <DialogPocIcon color={'var(--color-secondary-50)'} />
          화면담당자
        </Button>

        <Button variant={'none'} only={'icon'} aria-label="목록">
          <DialogListIcon color={'var(--color-secondary-50)'} />
        </Button>
        <Button variant={'none'} only={'icon'} aria-label="초기화">
          <DialogResetIcon color={'var(--color-secondary-50)'} />
        </Button>
      </Grow>
    </Grid>
  );
};
