/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ICellRendererParams, IGroupCellRendererParams } from 'ag-grid-enterprise';
import { type ReactNode } from 'react';
import { DotColor } from '@/shared/components/common/DotColor';

import {
  editableSelectCellRenderer,
  CoveragePopover,
  getInsuredAmountOptions,
  setActiveCellTooltipContext,
} from '@aggrid';
import { Gcol, Grow } from '@atoms';
import { SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

type ProductNameCellBase = {
  id: string | number;
  isDuplicate?: boolean;
  num?: number | null;
  displayNo?: number | string;
  badge?: string[];
  title?: string | number | boolean;
};

type ProductTitleDetail = {
  title: string;
  description: string;
  info: string[];
};

export const createExpiryCellRenderer =
  <T,>(align: 'left' | 'center' | 'right' = 'right', paddingClass?: string) =>
  (params: ICellRendererParams<T>) =>
    editableSelectCellRenderer<T>({ ...params, align, paddingClass });

/**
 * [공용 셀 렌더러] 값이 있을 때 돋보기(검색) 버튼 표시
 */
export function searchButtonRenderer<T>(params: ICellRendererParams<T>) {
  if (!params.value) return null;

  return (
    <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
      <Button
        only={'icon'}
        variant={'none'}
        size={'sm'}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
        disabled={false}
      >
        <SearchIcon color={'var(--color-primary-50)'} />
      </Button>
    </div>
  );
}

/**
 * [공용 셀 렌더러] 번호 + 담보명 + 배지
 */
export function productNameCellRenderer<
  T extends ProductNameCellBase,
  D extends ProductTitleDetail = ProductTitleDetail,
>(params: IGroupCellRendererParams<T & { titleDetail?: D }> & ICellRendererParams<T & { titleDetail?: D }>) {
  const { data, context, api } = params;
  if (!data) return null;

  const coverageName = context?.coverageName;
  const title = String(data.title ?? '');

  // 검색어가 있을 경우 하이라이트 처리
  const highlightedTitle: React.ReactNode =
    coverageName && coverageName.trim()
      ? title.split(new RegExp(`(${coverageName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')).map((part, i) =>
          part.toLowerCase() === coverageName.toLowerCase() ? (
            <b className="text-[var(--color-primary-50)]" key={i}>
              {part}
            </b>
          ) : (
            part
          )
        )
      : title;

  const displayOrder: string | number = data.isDuplicate ? '' : (data.num ?? '');

  const renderBadges = (badges?: string[]) => {
    if (!Array.isArray(badges) || badges.length === 0) return null;

    const badgeConfig = [
      { key: '미래', color: 'green' },
      { key: '갱신', color: 'blue' },
      { key: '배타', color: 'primary' },
      { key: '독립', color: 'purple' },
    ] as const;

    return (
      <Grow className="shrink-0">
        {badgeConfig
          .filter((conf) => badges.includes(conf.key))
          .map((conf) => (
            <Badge key={conf.key} variant="dark" color={conf.color} className="w-[3rem]">
              {conf.key}
            </Badge>
          ))}
      </Grow>
    );
  };

  return (
    <Grow className={`h-full ${data.badge ? 'pr-1.5' : 'pr-0'}`} placement="bwc">
      {displayOrder ? (
        <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center">
          <span>{displayOrder}</span>
        </Grow>
      ) : (
        <Grow className="border-r border-(--color-gray-10) h-full items-center w-[3rem] justify-center"></Grow>
      )}

      {!data.isDuplicate ? (
        <CoveragePopover
          text={highlightedTitle as unknown as string}
          items={data.titleDetail as ProductTitleDetail | undefined}
          api={api}
        />
      ) : (
        <p className="truncate-no w-full pl-1.5 flex-1">{highlightedTitle}</p>
      )}
      {renderBadges(data.badge)}
    </Grow>
  );
}

/**
 * [공용 셀 렌더러] UW 상태 원형 아이콘
 */
export function uwIconRenderer<T>(params: ICellRendererParams<T>) {
  const value = params.value;

  if (Array.isArray(value)) {
    return (
      <Gcol className="h-full" placement="cc">
        <div className="flex gap-[0.2rem] justify-center items-center">
          {value.map((val, idx) => (
            <DotColor key={idx} status={String(val)} />
          ))}
        </div>
      </Gcol>
    );
  }

  if (typeof value === 'string' && value !== '') {
    return (
      <Gcol className="h-full" placement="cc">
        <DotColor status={value} />
      </Gcol>
    );
  }

  return null;
}

/**
 * [공용 셀 렌더러] 그룹/하위(leaf) 담보 편집 행에서 조건부 셀 UI 렌더링
 *
 * 행 데이터의 상태(`isStandard`, `isSelectedInsuredAmount`)에 따라 다음과 같이 분기 렌더링합니다:
 * 1. **그룹/연동 행 (`isStandard.group === true`)**:
 *    - 셀 값을 클릭 가능한 버튼 형태로 렌더링합니다.
 *    - 클릭 시 현재 셀 컨텍스트를 기록하고 전달받은 `onClick` 콜백을 실행합니다.
 *    - 컴포넌트 측에서 필요한 비즈니스 로직 수행 후 `showCellTooltip('메세지')`를 호출하면 3초간 툴팁이 노출됩니다.
 * 2. **가입금액 선택 활성 행 (`isSelectedInsuredAmount === true`)**:
 *    - 선택 가능한 옵션(`getInsuredAmountOptions`)이 2개 이상이면 셀렉트형 렌더러(`getExpiryRenderer`)를 렌더링합니다.
 *    - 옵션이 1개 이하이면 화살표 없이 일반 숫자 포맷터(`numberValueFormatter`)로 렌더링합니다.
 * 3. **일반 행**:
 *    - 전달받은 `numberValueFormatter`를 통해 기본 포맷팅된 값을 렌더링합니다.
 *
 * @template T - 그리드 행 데이터 타입
 * @param getExpiryRenderer - 가입금액 등 셀렉트 편집이 가능한 셀을 렌더링하는 고차 렌더러 함수
 * @param numberValueFormatter - 일반 숫자/텍스트 셀을 포맷팅하여 렌더링하는 기본 렌더러 함수
 * @param align - 셀렉트 렌더러 내부 텍스트 정렬 방향 (기본값: `'right'`)
 * @param defaultOptions - 행 데이터에 개별 옵션이 없을 때 사용할 기본 가입금액 옵션 목록
 * @param onClick - 그룹 셀 버튼 클릭 시 실행할 콜백 함수
 * @returns AG Grid `cellRenderer`에 전달할 수 있는 React 함수형 렌더러 컴포넌트
 */
export function groupEditableButtonRenderer<
  T extends {
    id?: number | string;
    isStandard?: { group?: boolean; edit?: boolean };
    _tooltipMsg?: string;
    filePath?: string[];
    isSelectedInsuredAmount?: boolean;
    _tooltipOn?: boolean;
    insuredAmountOptions?: (number | string)[];
    options?: (number | string)[];
  },
>(
  getExpiryRenderer: (align: 'left' | 'center' | 'right') => (params: ICellRendererParams<T>) => ReactNode,
  numberValueFormatter: (params: ICellRendererParams<T>) => ReactNode,
  align: 'left' | 'center' | 'right' = 'right',
  defaultOptions?: (number | string)[],
  onClick?: (params: ICellRendererParams<T>) => void
) {
  const Renderer = (params: ICellRendererParams<T>) => {
    const isSelectedInsuredAmount = params.data?.isSelectedInsuredAmount ?? false;

    // [분기 1] 그룹 연동 비편집 행(isStandard.group === true && !isStandard.edit): 클릭 가능한 버튼 렌더링
    if (params.data?.isStandard?.group && !params.data?.isStandard?.edit) {
      const value = params.value;
      let display = value;
      // 가입금액 선택 모드가 아닐 경우 숫자에 천 단위 콤마 포맷팅 적용
      if (!isSelectedInsuredAmount) {
        if (typeof value === 'number') {
          display = value.toLocaleString();
        } else if (typeof value === 'string' && value !== '') {
          const num = Number(value.replace(/[^\d.-]/g, ''));
          display = isNaN(num) ? value : num.toLocaleString();
        }
      }

      const handleClick = () => {
        setActiveCellTooltipContext({
          api: params.api,
          data: params.data,
          node: params.node,
          colId: params.column?.getColId?.() ?? params.colDef?.field,
          cellEl: params.eGridCell,
        });
        onClick?.(params);
      };

      return (
        <button
          type="button"
          onClick={handleClick}
          style={{ width: '100%', background: 'none', border: 'none', padding: 0, textAlign: 'right' }}
        >
          {display}
        </button>
      );
    }

    // [분기 2] 가입금액 선택 활성 행(isSelectedInsuredAmount === true):
    // 선택 옵션이 1개 이하이면 화살표 대신 일반 숫자 포맷터로 렌더링하고, 2개 이상이면 셀렉트 렌더러로 렌더링
    if (isSelectedInsuredAmount) {
      const options = getInsuredAmountOptions(params.data, defaultOptions);
      if (options.length <= 1) {
        return numberValueFormatter(params);
      }
      return getExpiryRenderer(align)(params);
    }

    // [분기 3] 일반 행: 기본 숫자 포맷터로 렌더링
    return numberValueFormatter(params);
  };

  Renderer.displayName = 'GroupEditableButtonRenderer';
  return Renderer;
}
