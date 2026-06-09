/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import * as React from 'react';

type TextSelectChangeItem = {
  checked: boolean;
  label: string;
  value: string;
};

export function TextSelectChange({ items }: { items: TextSelectChangeItem[][] }) {
  const initialValues = items.map((group) => group.find((item) => item.checked)?.value ?? group[0]?.value ?? '');
  const [disabled, setDisabled] = React.useState(true);
  const [values, setValues] = React.useState<string[]>(initialValues);
  const [pendingValues, setPendingValues] = React.useState<string[]>(initialValues);

  const handleChange = (groupIndex: number, value: string) => {
    setPendingValues((prev) => prev.map((v, i) => (i === groupIndex ? value : v)));
  };

  const handleConfirm = () => {
    if (!disabled) {
      setValues(pendingValues);
    } else {
      setPendingValues(values);
    }
    setDisabled((prev) => !prev);
  };

  return (
    <Grow className="gap-1.5 [&_[data-slot='native-select-wrapper']:has(select:disabled)]:opacity-100!">
      {items.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {groupIndex !== 0 && '·'}
          <NativeSelect
            variant={disabled ? 'text' : 'default'}
            aria-label=""
            disabled={disabled}
            value={disabled ? values[groupIndex] : pendingValues[groupIndex]}
            onChange={(e) => handleChange(groupIndex, e.target.value)}
          >
            {group.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </React.Fragment>
      ))}
      <Button variant={'outlined'} color={'gray'} size={'md'} onClick={handleConfirm}>
        {disabled ? '변경' : '확인'}
      </Button>
    </Grow>
  );
}
