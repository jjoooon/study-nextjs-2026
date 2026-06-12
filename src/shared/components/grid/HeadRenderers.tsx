/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { IHeaderParams, SortDirection } from 'ag-grid-enterprise';
import React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Divider, Grow, Gcol } from '@atoms';
import { HashIcon, SearchIcon, SortArrowIcon, SortArrowDefaultIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';

// 단위 포함 헤더 공통 props
// - ag-grid의 column/enableSorting/progressSort를 받으면 정렬 가능한 헤더로 동작
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
  // ag-grid 정렬 제어 함수가 모두 주입된 경우에만 정렬 활성화
  const isSortable = !!(column && enableSorting && progressSort);
  // 현재 정렬 상태(asc/desc/undefined)
  const [sort, setSort] = React.useState<SortDirection | undefined>(column?.getSort());

  // grid 내부 정렬 변경 이벤트와 로컬 상태 동기화
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

  // 헤더 클릭 시 ag-grid 기본 정렬 순환 함수를 호출
  // shiftKey가 있으면 다중 정렬 동작(ag-grid 규칙)
  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSortable) return;
    if (!progressSort) return;
    progressSort(event.shiftKey);
  };

  // col=true면 세로 배치, 아니면 가로 배치로 라벨+단위를 렌더링
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
    // 정렬 기능이 없으면 일반 텍스트 헤더만 표시
    return content;
  }

  return (
    <button
      type="button"
      className="h-full w-full flex justify-center items-center cursor-pointer"
      onClick={handleSort}
      aria-label={`${label} 정렬`}
      aria-disabled={!enableSorting}
    >
      <Grow placement={'cc'} gap={0.4}>
        {content}
        <span className="text-[1rem] leading-none text-[var(--color-gray-60)]">
          {/* 정렬 상태별 아이콘 표시: asc / desc / 기본(view=true일 때만) */}
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

// 상품명 헤더(체크 필터 + 담보명 검색 + 말풍선 옵션)
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
        {/* 외부 상태 제어 props가 있으면 controlled 체크박스로 렌더링 */}
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
          // 제어 props가 없으면 기본(비제어) 체크박스 UI만 표시
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
        {/* 담보명 입력/선택용 해시형 입력 */}
        <Input
          size={'md'}
          placeholder="담보명 입력"
          clear={true}
          key="coverage-name-input"
          readOnly={false} // 명시적으로 readOnly를 false로 설정
          disabled={false} // 명시적으로 disabled를 false로 설정
          value={coverageName}
          onChange={(e) => {
            onCoverageNameChange(e.target.value);
          }}
        />
        {/* 검색/초기화 액션 버튼(UI) */}
        <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
        <Button aria-label="해쉬 필터" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
          <HashIcon color={'var(--color-primary-50)'} />
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

/**
 * Ag-Grid용 상품명 헤더 어댑터 컴포넌트
 * 컬럼 정의에 직접 바인딩하여 렌더링하도록 디자인됨 (React.memo 및 useCallback 최적화)
 */
export function AgGridProductNameHeader(props: any) {
  const { context } = props;
  const coverageName = context?.coverageName ?? '';
  const onCoverageNameChange = context?.setCoverageName;
  const showProductNameTooltip = context?.showProductNameTooltip ?? false;
  const onShowProductNameTooltipChange = context?.onShowProductNameTooltipChange;
  const checkedMap = context?.checkedMap;
  const onCheckedChange = context?.onCheckedChange;

  return (
    <ProductNameHeader
      coverageName={coverageName}
      onCoverageNameChange={onCoverageNameChange}
      showProductNameTooltip={showProductNameTooltip}
      onShowProductNameTooltipChange={onShowProductNameTooltipChange}
      checkedMap={checkedMap}
      onCheckedChange={onCheckedChange}
    />
  );
}
