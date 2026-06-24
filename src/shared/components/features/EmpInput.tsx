/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

interface EmpInputProps extends Omit<React.ComponentProps<typeof Input>, 'value'> {
  /** 사번 */
  empNo?: string;
  /** 이름 */
  empName?: string;
}

export function EmpInput({ empNo, empName, ...props }: EmpInputProps) {
  const displayValue = empName && empNo ? `${empNo} ${empName}` : empName || empNo || '';

  return (
    <Grow className="gap-1 shrink-0" placement={'ec'}>
      <Input aria-label="계약자명 입력" type="text" value={displayValue} {...props} />
      <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
        <SearchIcon color="var(--color-primary-50)" />
      </Button>
    </Grow>
  );
}
