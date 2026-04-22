'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ArrowIcon, InputClearIcon } from '@icons';
import { Badge } from '@uiux/Badge';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { useState } from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

export const Ltpa02002 = ({ open, onOpenChange }: PopupBaseProps) => {
  // items 상태로 관리
  const [items, setItems] = useState([
    { idx: 1, age: 32, gender: '여', job: '1급' },
    { idx: 2, age: 34, gender: '남', job: '1급' },
    { idx: 3, age: 33, gender: '남', job: '1급' },
    { idx: 4, age: 44, gender: '남', job: '1급' },
    { idx: 5, age: 34, gender: '남', job: '1급' },
  ]);
  // 선택된 인덱스(포커스된 input)
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  // 행 삭제
  const handleRemove = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
    // 삭제 후 선택 인덱스 조정
    setSelectedIdx((prev) => {
      if (prev > idx) return prev - 1;
      if (prev === idx) return -1;
      return prev;
    });
  };

  // 위로 이동
  const moveUp = () => {
    if (selectedIdx > 0) {
      setSelectedIdx(selectedIdx - 1);
    }
  };
  // 아래로 이동
  const moveDown = () => {
    if (selectedIdx < items.length - 1) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  const [form, setFormField] = useFormFields({
    type01: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              키워드편집
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr] gap-[2rem]">
          <Grow className="w-full bg-[#F3F4F6]" variant="box-round" placement={'se'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={<b className="text-[#000]! font-bold">나이</b>}>
                  <Input
                    aria-label=""
                    className="mr-[0.4rem]"
                    width={'4.8rem'}
                    value={form.type01}
                    onChange={(e) => setFormField('type01', e.target.value)}
                  />
                  <DatePickerInput mode="single" onChange={() => {}} size="lg" value="" width="sm" />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={<b className="text-[#000]! font-bold">성별</b>}>
                  <RadioGroup className="gap-3" onValueChange={() => {}} width="full" defaultValue="남">
                    {' '}
                    {[
                      { value: '남', label: '남' },
                      { value: '여', label: '여' },
                    ].map((option) => (
                      <RadioGroupItem key={option.value} value={option.value}>
                        {option.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={<b className="text-[#000]! font-bold">직업</b>}>
                  <RadioGroup className="gap-3" onValueChange={() => {}} width="full" defaultValue="1급">
                    {' '}
                    {[
                      { value: '1급', label: '1급' },
                      { value: '2급', label: '2급' },
                      { value: '3급', label: '3급' },
                    ].map((option) => (
                      <RadioGroupItem key={option.value} value={option.value}>
                        {option.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </FormCell>
              </FormRow>
            </FormTable>
            <Button color="coolgray-light" onClick={() => {}} only="default" size="md" variant="contained">
              키워드 추가
            </Button>
          </Grow>
          <TableFold variant="accordion">
            <TableFoldHead title="등록된 키워드">
              <Grow className="flex justify-end">
                <Button
                  color="gray-light"
                  onClick={moveUp}
                  only="icon"
                  size="sm"
                  variant="outlined"
                  disabled={selectedIdx === 0}
                >
                  <ArrowIcon className="rotate-90" color={'#FF5C2E'} size={13} />
                </Button>
                <Button
                  color="gray-light"
                  onClick={moveDown}
                  only="icon"
                  size="sm"
                  variant="outlined"
                  disabled={selectedIdx === items.length - 1}
                >
                  <ArrowIcon className="-rotate-90" color={'#FF5C2E'} size={13} />
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <Grow className="w-full" placement="ss">
                <Gcol className="w-[1.8rem]" placement="ss">
                  {items.map((_, i) => (
                    <Gcol className="w-[1.8rem] h-[2.5rem]" key={i}>
                      <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] bg-[#263143]">
                        {i + 1}
                      </Badge>
                    </Gcol>
                  ))}
                </Gcol>
                <Gcol className="w-full">
                  {items.map((item, i) => (
                    <Gcol
                      className={[
                        'flex flex-row justify-between h-[2.5rem] rounded-[0.4rem] p-[0.4rem] border-[0.1rem] transition-colors duration-150 cursor-pointer',
                        selectedIdx === i ? 'border-[#FF5C2E] bg-[#FFF7F4]' : 'border-[#CCC]',
                      ].join(' ')}
                      key={item.idx}
                      onClick={() => setSelectedIdx(i)}
                    >
                      <Typo
                        variant={'body-md'}
                        className={[selectedIdx === i ? 'text-[#FF5C2E]' : 'text-[#000]'].join(' ')}
                      >
                        {`${item.age}세(${item.gender}) ${item.job}`}
                      </Typo>
                      <Button
                        color="transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(i);
                        }}
                        only="icon"
                        size="xs"
                        variant="contained"
                      >
                        <InputClearIcon color={selectedIdx === i ? '#FF5C2E' : '#777'} />
                      </Button>
                    </Gcol>
                  ))}
                </Gcol>
              </Grow>
            </TableFoldBody>
          </TableFold>
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
