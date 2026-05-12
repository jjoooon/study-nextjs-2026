/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Divider, Grow } from '@atoms';
import { InputHash } from '@common/InputHash';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import React from 'react';

interface ProductNameHeaderProps {
  coverageName: string;
  onCoverageNameChange: (value: string) => void;
  showProductNameTooltip: boolean;
  onShowProductNameTooltipChange: (checked: boolean | 'indeterminate') => void;
  checkedMap?: {
    selected: boolean;
    unselected: boolean;
    reset: boolean;
  };
  onCheckedChange?: (key: string) => (checked: boolean | 'indeterminate') => void;
}

export const ProductNameHeader = React.memo(function ProductNameHeader({
  coverageName,
  onCoverageNameChange,
  showProductNameTooltip,
  onShowProductNameTooltipChange,
  checkedMap,
  onCheckedChange,
}: ProductNameHeaderProps) {
  return (
    <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={4}>
      <Grow gap={1.5} placement={'sc'}>
        {checkedMap && onCheckedChange ? (
          <>
            <Checkbox variant={'text'} checked={checkedMap.selected} onCheckedChange={onCheckedChange('selected')}>
              선택 24건
            </Checkbox>
            <Divider />
            <Checkbox variant={'text'} checked={checkedMap.unselected} onCheckedChange={onCheckedChange('unselected')}>
              미선택
            </Checkbox>
            <Divider />
            <Checkbox variant={'text'} checked={checkedMap.reset} onCheckedChange={onCheckedChange('reset')}>
              담보초기화
            </Checkbox>
          </>
        ) : (
          <>
            <Checkbox variant={'text'}>선택 24건</Checkbox>
            <Divider />
            <Checkbox variant={'text'}>미선택</Checkbox>
            <Divider />
            <Checkbox variant={'text'}>담보초기화</Checkbox>
          </>
        )}
      </Grow>
      <Grow>
        <InputHash
          options={[
            { value: '암암암암2', label: '암암암암2' },
            { value: '뇌뇌뇌뇌뇌', label: '뇌뇌뇌뇌뇌' },
            { value: '심심심심심', label: '심심심심심' },
            { value: '표적', label: '표적' },
            { value: '뇌', label: '뇌' },
            { value: '심장', label: '심장' },
            { value: '수술', label: '수술' },
            { value: '골절', label: '골절' },
            { value: '화상', label: '화상' },
            { value: '치매', label: '치매' },
            { value: '종신종신종신', label: '종신종신종신' },
          ]}
          size={'md'}
          placeholder="담보명 입력"
          clear={true}
          value={coverageName}
          onChange={(value) => onCoverageNameChange(value)}
        />
        <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
        <Button aria-label="담보명 검색 초기화" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
          <ResetIcon color={'var(--color-primary-50)'} />
        </Button>
      </Grow>
      <Grow placement={'sc'}>
        <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={onShowProductNameTooltipChange}>
          담보명 말풍선
        </Checkbox>
      </Grow>
    </Grow>
  );
});
