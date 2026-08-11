/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useState } from 'react';
import { ArrowIcon } from '@/shared/components/icons';
import { Grow, Typo, Grid } from '@atoms';
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
import { Input } from '@uiux/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@uiux/Table';

const Ltpz023 = () => {
  // 초기 키워드 값
  const items = ['암', '뇌', '심장', '폐', '간', '위', '신장', '당뇨', '치매', '우울증', '치매', '우울증'];

  const [keywords, setKeywords] = useState<string[]>(items);
  // 라디오로 선택된 인덱스
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  // 입력값 변경
  const handleInputChange = (idx: number, value: string) => {
    setKeywords((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };

  // 위로 이동
  const moveUp = () => {
    if (selectedIdx !== null && selectedIdx > 0) {
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
    if (selectedIdx !== null && selectedIdx < keywords.length - 1) {
      setKeywords((prev) => {
        const next = [...prev];
        [next[selectedIdx + 1], next[selectedIdx]] = [next[selectedIdx], next[selectedIdx + 1]];
        return next;
      });
      setSelectedIdx(selectedIdx + 1);
    }
  };

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} className="w-[37.6rem]">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              검색어 편집
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_minmax(0,1fr)]">
          <Grow variant="box-round" placement={'ss'} className="w-full">
            <Input placeholder="키워드 입력(최대 한글 6자)" />
            <Button size={'lg'} color="coolgray">
              추가
            </Button>
          </Grow>
          <Grid className="grid-rows-[auto_minmax(0,1fr)]">
            <Grow className="flex" placement="bwc">
              <Typo variant="heading-md" tag="h3">
                등록된 키워드(10/50)
              </Typo>
              <Grow>
                <Button
                  color="gray-light"
                  onClick={moveUp}
                  only="icon"
                  size="md"
                  variant="outlined"
                  disabled={selectedIdx === null || selectedIdx === 0}
                >
                  <ArrowIcon className="rotate-90" color={'#FF5C2E'} size={14} />
                </Button>
                <Button
                  color="gray-light"
                  onClick={moveDown}
                  only="icon"
                  size="md"
                  variant="outlined"
                  disabled={selectedIdx === null || selectedIdx === keywords.length - 1}
                >
                  <ArrowIcon className="-rotate-90" color={'#FF5C2E'} size={14} />
                </Button>
              </Grow>
            </Grow>
            <Table className="h-full overflow-auto relative">
              <colgroup>
                <col className="w-[4rem]" />
                <col className="w-[4rem]" />
                <col />
              </colgroup>
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  <TableHead>선택</TableHead>
                  <TableHead>순서</TableHead>
                  <TableHead>키워드</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((keyword, i) => (
                  <TableRow
                    key={i}
                    className={`cursor-pointer ${selectedIdx === i ? '[&>td]:bg-[var(--color-primary-10)]' : ''}`}
                    onClick={() => setSelectedIdx(i)}
                  >
                    <TableCell className="text-center align-middle">
                      <label
                        className="inline-flex cursor-pointer items-center justify-center w-full h-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="radio"
                          name="keyword-row-selector"
                          aria-label={`${i + 1}번째 키워드 선택`}
                          checked={selectedIdx === i}
                          onChange={() => setSelectedIdx(i)}
                          className="peer sr-only"
                        />
                        <span
                          className={`relative h-[2rem] w-[2rem] rounded-full border transition-colors flex items-center justify-center ${selectedIdx === i ? 'border-[#FF5C2E] bg-white' : 'border-[#cccccc] bg-white'}`}
                        >
                          {selectedIdx === i && <span className="h-[1rem] w-[1rem] rounded-full bg-[#FF5C2E]" />}
                        </span>
                      </label>
                    </TableCell>
                    <TableCell className="text-center">
                      <b>{i + 1}</b>
                    </TableCell>
                    <TableCell>
                      <Input
                        key={i}
                        errorMsg="입력은 필수입니다."
                        errorPs="bl"
                        onChange={(e) => handleInputChange(i, e.target.value)}
                        size="lg"
                        value={keyword}
                        variant="default"
                        onFocus={() => setSelectedIdx(i)}
                        placeholder="최대 한글 6자"
                        clear
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
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

export default Ltpz023;
