/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { editableSelectCellRenderer } from '@aggrid';
import { CoveragePopover } from '@aggrid';
import { Gcol, Grow } from '@atoms';
import { SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import type { ICellRendererParams, IGroupCellRendererParams, IRowNode } from 'ag-grid-enterprise';
import type { ReactNode } from 'react';

import type { ProductNameCellBase, ProductTitleDetail } from '../types/gridTypes';

export const createExpiryCellRenderer =
  <T,>(align: 'left' | 'center' | 'right' = 'right') =>
  (params: ICellRendererParams<T>) =>
    editableSelectCellRenderer<T>({ ...params, align });

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
  const { data } = params;
  if (!data) return null;

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
        <CoveragePopover text={String(data.title ?? '')} items={data.titleDetail as ProductTitleDetail | undefined} />
      ) : (
        <p className="truncate-no w-full pl-1.5 flex-1">{data.title ?? ''}</p>
      )}
      {renderBadges(data.badge)}
    </Grow>
  );
}

/**
 * [공용 셀 렌더러] UW 상태 원형 아이콘
 */
export function uwIconRenderer<T>(params: ICellRendererParams<T>) {
  const value = params.value as string;
  const color =
    value === '인수가능'
      ? 'var(--color-success-60)'
      : value === '인수불가'
        ? 'var(--color-danger-50)'
        : 'var(--color-warning-40)';

  return (
    <Gcol className="h-full" placement="cc">
      <div className="w-[1rem] h-[1rem] rounded-full" style={{ backgroundColor: color }}></div>
    </Gcol>
  );
}

/**
 * [공용 셀 렌더러] 그룹/leaf 편집 row에서 버튼 노출 및 그룹 전체 tooltip-on 부여
 */
export function groupEditableButtonRenderer<
  T extends {
    isStandard?: { group?: boolean; edit?: boolean };
    filePath?: string[];
    isSelectedInsuredAmount?: boolean;
    _tooltipOn?: boolean;
  },
>(
  getExpiryRenderer: (align: 'left' | 'center' | 'right') => (params: ICellRendererParams<T>) => ReactNode,
  numberValueFormatter: (params: ICellRendererParams<T>) => ReactNode
) {
  const Renderer = (params: ICellRendererParams<T>) => {
    const isSelectedInsuredAmount = params.data?.isSelectedInsuredAmount ?? false;

    if (params.data?.isStandard?.group) {
      const value = params.value;
      let display = value;
      if (!isSelectedInsuredAmount) {
        if (typeof value === 'number') {
          display = value.toLocaleString();
        } else if (typeof value === 'string' && value !== '') {
          const num = Number(value.replace(/[^\d.-]/g, ''));
          display = isNaN(num) ? value : num.toLocaleString();
        }
      }

      const handleClick = () => {
        const groupRoot = params.data?.filePath?.[0];
        const nodesToUpdate: IRowNode<T>[] = [];
        params.api.forEachNode((node) => {
          if (node.data?.filePath?.[0] === groupRoot && node.data?.isStandard?.edit) {
            nodesToUpdate.push(node);
            node.setData({ ...node.data, _tooltipOn: true });
          }
        });
        setTimeout(() => {
          nodesToUpdate.forEach((node) => {
            if (node.data) {
              node.setData({ ...node.data, _tooltipOn: false });
            }
          });
        }, 3000);
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

    return isSelectedInsuredAmount ? getExpiryRenderer('left')(params) : numberValueFormatter(params);
  };

  Renderer.displayName = 'GroupEditableButtonRenderer';
  return Renderer;
}
