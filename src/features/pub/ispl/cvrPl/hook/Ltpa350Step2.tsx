'use client';

import { useRef, useState } from 'react';

import { Grow, Gcol, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Button } from '@uiux/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

export const CoveragePopover = ({
  text,
  data,
}: {
  text: string;
  data?: { title: string; description: string; info: string[] };
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="truncate-no w-full pl-1.5 flex-1 text-left"
          aria-haspopup="dialog"
        >
          {text}
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="max-w-[42.5rem]" closeButton={true}>
        <Gcol>
          <Grow className="w-full" placement="bws">
            <Typo variant={'heading-sm'}>{data?.title}</Typo>
            <Button size={'sm'} className="-translate-y-[0.2rem]">
              AI 질문하기
            </Button>
          </Grow>
          <Gcol className="w-full" placement="ss">
            <Typo variant={'body-sm'} color={'gray'}>
              {data?.description}
            </Typo>
            <BulletList type={'star'} size={'xs'}>
              {data?.info.map((item, index) => (
                <BulletListItem key={index}>{item}</BulletListItem>
              ))}
            </BulletList>
          </Gcol>
        </Gcol>
      </PopoverContent>
    </Popover>
  );
};
