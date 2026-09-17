/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';

const Ltpz01601 = () => {
  return (
    <TableFold>
      <TableFoldHead title="가족일상생활배상책임Ⅲ(대물 20만원(누수50만원)공제)(갱신형)" />
      <TableFoldBody className="gap-2">
        <FormTable caption="설계번호" cols={['w-[12rem]', 'w-[auto]']}>
          <FormRow>
            <FormCell
              title={
                <Grow placement="ss">
                  자택주소동일
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default"></Checkbox>
                </Grow>
              }
            >
              <Input value={'서울 영등포구 63로 328호(여의도동, 은하아파트)'} readOnly />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell
              title={
                <Grow placement="sc">
                  기본주소
                  <EssentialIcon />
                </Grow>
              }
            >
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input aria-label="" value={''} readOnly required />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell
              title={
                <span>
                  상세주소(동번호/층수/호수 입력)
                  <EssentialIcon className="inline-block ml-1" />
                </span>
              }
            >
              <Input aria-label="" value={''} readOnly required />
              <Input aria-label="" value={''} readOnly required />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'전체주소'}>
              <Input aria-label="" value={''} readOnly />
            </FormCell>
          </FormRow>
        </FormTable>
        <Gcol variant={'box-info'} placement={'ss'} className="w-full">
          <Typo variant={'body-sm'} icon={'info'}>
            약관상 피보험자가 소유, 사용, 관리 중 발생한 우연한 사고로 배상책임을 부담하는 주거용 주택을 등록해
            주세요.
          </Typo>
        </Gcol>
      </TableFoldBody>
    </TableFold>
  );
};

export default Ltpz01601;
