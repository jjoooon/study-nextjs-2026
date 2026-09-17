/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon } from '@icons';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

const Ltpz01609 = () => {
  return (
    <>
      <TableFold>
        <TableFoldHead title="도난손해(실손, 일반)" />
        <TableFoldBody className="gap-2">
          <FormTable cols={['w-[16rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    무인판매시설 여부
                    <EssentialIcon />
                  </Grow>
                }
              >
                <NativeSelect aria-label="무인판매시설 여부" width={'auto'}>
                  {[
                    { value: 0, label: '선택' },
                    { value: 1, label: 'Y' },
                    { value: 2, label: 'N' },
                  ].map((option, idx) => (
                    <NativeSelectOption key={idx} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>
    </>
  );
};

export default Ltpz01609;
