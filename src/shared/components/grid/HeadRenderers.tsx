/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { IHeaderParams, SortDirection } from 'ag-grid-enterprise';
import React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Divider, Grow, Gcol } from '@atoms';
import { InputHash } from '@common/InputHash';
import { ResetIcon, SearchIcon, SortArrowIcon, SortArrowDefaultIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

interface HeaderWithUnitProps {
  label: string;
  unit: string;
  className?: string;
  unitClassName?: string;
  gap?: number;
  col?: boolean;
  view?: boolean;
  column?: IHeaderParams['column'];
  enableSorting?: IHeaderParams['enableSorting'];
  progressSort?: IHeaderParams['progressSort'];
}

export const HeaderWithUnit = React.memo(function HeaderWithUnit({
  label,
  unit,
  col = false,
  className,
  unitClassName = 'text-[1.1rem]',
  gap = 0,
  column,
  enableSorting,
  view = false,
  progressSort,
}: HeaderWithUnitProps) {
  const isSortable = !!(column && enableSorting && progressSort);
  const [sort, setSort] = React.useState<SortDirection | undefined>(column?.getSort());

  React.useEffect(() => {
    if (!column) return;

    const handleSortChanged = () => {
      setSort(column.getSort());
    };

    column.addEventListener('sortChanged', handleSortChanged);
    return () => {
      column.removeEventListener('sortChanged', handleSortChanged);
    };
  }, [column]);

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSortable) return;
    if (!progressSort) return;
    progressSort(event.shiftKey);
  };

  const content = col ? (
    <Gcol className={cn('w-full leading-[1.4rem]', className)} placement={'cc'} gap={gap}>
      {label}
      <span className={cn(unitClassName)}>{unit}</span>
    </Gcol>
  ) : (
    <Grow className={cn('w-full', className)} placement={'cc'} gap={gap}>
      {label}
      <span className={cn(unitClassName)}>{unit}</span>
    </Grow>
  );

  if (!isSortable) {
    return content;
  }

  return (
    <button
      type="button"
      className="h-full w-full flex justify-center items-center cursor-pointer select-none"
      onClick={handleSort}
      aria-label={`${label} 정렬`}
      aria-disabled={!enableSorting}
    >
      <Grow placement={'cc'} gap={0.4}>
        {content}
        <span className="text-[1rem] leading-none text-[var(--color-gray-60)]">
          {sort === 'asc' ? (
            <SortArrowIcon size={12} color="var(--color-gray-100)" className="rotate-180 shrink-0" />
          ) : sort === 'desc' ? (
            <SortArrowIcon size={12} color="var(--color-gray-100)" className="shrink-0" />
          ) : (
            view && <SortArrowDefaultIcon size={12} color="var(--color-gray-100)" className="shrink-0" />
          )}
        </span>
      </Grow>
    </button>
  );
});

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
            {/* <Divider /> */}
            {/* <Checkbox variant={'text'} checked={checkedMap.reset} onCheckedChange={onCheckedChange('reset')}>
              담보초기화
            </Checkbox> */}
          </>
        ) : (
          <>
            <Checkbox variant={'text'}>선택 24건</Checkbox>
            <Divider />
            <Checkbox variant={'text'}>미선택</Checkbox>
            {/* <Divider /> */}
            {/* <Checkbox variant={'text'}>담보초기화</Checkbox> */}
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
