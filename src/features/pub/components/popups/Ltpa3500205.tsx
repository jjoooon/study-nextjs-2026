'use client';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Badge } from '@/shared/components/uiux/Badge';
import { Input } from '@/shared/components/uiux/Input';
import { useState } from 'react';
import { ArrowIcon } from '@/shared/components/icons';
import { id } from 'date-fns/locale';



export const Ltpa3500205 = ({ open, onOpenChange }: PopupBaseProps) => {
  // 초기 키워드 값
  const items = [ 
    {
      idx: 1,
      keyword: '암',
    },
    {
      idx: 2,
      keyword: '뇌',
    },
    {
      idx: 3,
      keyword: '심장',
    },
    {
      idx: 4,
      keyword: '폐',
    },
    {
      idx: 5,
      keyword: '간',
    },
    {
      idx: 6,
      keyword: '위',
    },
    {
      idx: 7,
      keyword: '신장',
    },
    {
      idx: 8,
      keyword: '당뇨',
    },
    {
      idx: 9,
      keyword: '치매',
    },
    {
      idx: 10,
      keyword: '우울증',
    }
  ];

  const [keywords, setKeywords] = useState<string[]>(items.map(item => item.keyword));
  // 선택된 인덱스(포커스된 input)
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  // 입력값 변경
  const handleInputChange = (idx: number, value: string) => {
    setKeywords((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };

  // 위로 이동
  const moveUp = () => {
    if (selectedIdx > 0) {
      setKeywords((prev) => {
        const next = [...prev];
        [next[selectedIdx - 1], next[selectedIdx]] = [next[selectedIdx], next[selectedIdx - 1]];
        return next;
      });
      setSelectedIdx(selectedIdx - 1);
    }
  };
  // 아래로 이동
  const moveDown = () => {
    if (selectedIdx < keywords.length - 1) {
      setKeywords((prev) => {
        const next = [...prev];
        [next[selectedIdx + 1], next[selectedIdx]] = [next[selectedIdx], next[selectedIdx + 1]];
        return next;
      });
      setSelectedIdx(selectedIdx + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              키워드편집
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <div className="flex gap-2 mb-2">
            <Button color="primary" onClick={moveUp} only="default" size="lg" variant="contained" disabled={selectedIdx === 0}>
              <ArrowIcon className='rotate-90'/>
              위로
            </Button>
            <Button color="primary" onClick={moveDown} only="default" size="lg" variant="outlined" disabled={selectedIdx === keywords.length - 1}>
              <ArrowIcon className='-rotate-90'/>
              아래로
            </Button>
          </div>
          <Grow className='w-full h-full' placement='ss'>
            <Gcol className='w-[4rem] h-[31.6rem] justify-between py-[0.4rem]' placement='ss'>
              {keywords.map((_, i) => (
                <Badge key={i} color="secondary" size="md" variant="contained">{i + 1}</Badge>
              ))}
            </Gcol>
            <Gcol className='w-full'>
              {keywords.map((kw, i) => (
                <Input
                  key={i}
                  errorMsg="입력은 필수입니다."
                  errorPs="bl"
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  size="lg"
                  value={kw}
                  variant="default"
                  width="full"
                  onFocus={() => setSelectedIdx(i)}
                  className={selectedIdx === i ? 'ring-2 ring-primary-500' : ''}
                  placeholder='최대 한글 6자'
                  clear
                />
              ))}
            </Gcol>
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
