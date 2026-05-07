'use client';

import { Grow, Typo, Gcol } from '@atoms';
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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@uiux/Table';
import { useState } from 'react';
import { ArrowIcon } from '@/shared/components/icons';
import { Input } from '@/shared/components/uiux/Input';

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
      <DialogContent showCloseButton resizable={false} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              검색어 편집
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow variant="box-round" placement={'ss'} className="w-full">
            <Input placeholder="키워드 입력(최대 한글 6자)" />
            <Button color="coolgray">추가</Button>
          </Grow>
          <Gcol>
            <Grow className="flex" placement="bwc">
              <Typo variant="heading-md" tag="h3">
                등록된 키워드(10/50)
              </Typo>
              <Grow>
                <Button
                  color="gray-light"
                  onClick={moveUp}
                  only="icon"
                  size="sm"
                  variant="outlined"
                  disabled={selectedIdx === null || selectedIdx === 0}
                >
                  <ArrowIcon className="rotate-90" color={'#FF5C2E'} size={13} />
                </Button>
                <Button
                  color="gray-light"
                  onClick={moveDown}
                  only="icon"
                  size="sm"
                  variant="outlined"
                  disabled={selectedIdx === null || selectedIdx === keywords.length - 1}
                >
                  <ArrowIcon className="-rotate-90" color={'#FF5C2E'} size={13} />
                </Button>
              </Grow>
            </Grow>
            <Table className="h-full overflow-auto relative">
              <colgroup>
                <col className="w-[4rem]" />
                <col className="w-[4rem]" />
                <col />
              </colgroup>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead>선택</TableHead>
                  <TableHead>순서</TableHead>
                  <TableHead>키워드</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((keyword, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center align-middle">
                      <label className="inline-flex cursor-pointer items-center justify-center w-full h-full">
                        <input
                          type="radio"
                          name="keyword-row-selector"
                          aria-label={`${i + 1}번째 키워드 선택`}
                          checked={selectedIdx === i}
                          onChange={() => setSelectedIdx(i)}
                          className="peer sr-only"
                        />
                        <span className="relative h-[2rem] w-[2rem] rounded-full border border-[var(--color-gray-15)] bg-white transition-colors peer-checked:[&>span]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-element-primary)] peer-focus-visible:ring-offset-1">
                          <span className="absolute left-1/2 top-1/2 h-[1.2rem] w-[1.2rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary-50)] opacity-0 transition-opacity" />
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
                        width={220}
                        onFocus={() => setSelectedIdx(i)}
                        className={selectedIdx === i ? 'ring-2 ring-primary-500' : ''}
                        placeholder="최대 한글 6자"
                        clear
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Gcol>
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
