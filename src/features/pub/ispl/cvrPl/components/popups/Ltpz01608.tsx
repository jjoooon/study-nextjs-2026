/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

const Ltpz01608 = () => {
  return (
    <>
      <TableFold>
        <TableFoldHead title="자동차전손시차액보상(도난제외)" />
        <TableFoldBody className="gap-2">
          <FormTable cols={['w-[13rem]', 'w-[auto]', 'w-[12rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                colSpan={3}
                title={
                  <Grow placement="sc">
                    차챵번호
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} required />
                <Button variant={'outlined'}>차량등록여부</Button>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                colSpan={3}
                title={
                  <Grow placement="sc">
                    차명
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Input width={100} value={''} readOnly required />
                <Input width={300} value={''} readOnly required />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    연식
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} readOnly required />
              </FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    최초등록일
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} readOnly required placeholder="____-__-__" />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    차량등록경과년수
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} readOnly required />
              </FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    차량가액(만원)
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} readOnly required />
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    차명조회일
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} readOnly required placeholder="____-__-__" />
              </FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    차명코드시행일
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input width={100} value={''} readOnly required placeholder="____-__-__" />
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>
    </>
  );
};

export default Ltpz01608;
