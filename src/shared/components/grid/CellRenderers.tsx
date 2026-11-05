/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ICellRendererParams, IGroupCellRendererParams, IRowNode, GridApi } from 'ag-grid-enterprise';
import { useEffect, type ReactNode } from 'react';
import { DotColor } from '@/shared/components/common/DotColor';

import { editableSelectCellRenderer, CoveragePopover, getInsuredAmountOptions } from '@aggrid';
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
 * [공용 셀 렌더러] 그룹/leaf 편집 row에서 버튼 노출 및 그룹 전체 tooltip-on 부여
 */

/**
 * 클릭 시 동적/비동기(서버 API 호출 등)로 툴팁 문구를 가져오기 위한 콜백 매개변수
 */
export interface TooltipFetchParams<T> {
  /** 사용자가 클릭한 행 데이터 (하위/자식 담보 등) */
  clickedRow: T;
  /** 툴팁이 표시될 대상 기준 행 데이터 (isStandard.edit === true) */
  targetRow: T;
  /** AG Grid API 인스턴스 */
  api: GridApi<T>;
  /** 그리드에 주입된 context 객체 */
  context?: unknown;
}

/**
 * 툴팁 문구를 반환하는 콜백 함수 타입 (동기 문자열 또는 비동기 Promise 지원)
 */
export type TooltipFetchCallback<T> = (
  params: TooltipFetchParams<T>
) => Promise<string | undefined> | string | undefined;

/** 그룹 편집 버튼 렌더러 옵션 인터페이스 */
export interface GroupEditableButtonRendererOptions<T> {
  /** 기본 공통 툴팁 문구 */
  defaultTooltipMsg?: string;
  /** 클릭 시 서버 비동기 조회 또는 맞춤 조건으로 문구를 산출하는 콜백 함수 */
  onFetchTooltipMessage?: TooltipFetchCallback<T>;
}

/** 활성화된 툴팁 타이머를 관리하는 맵 (연속 클릭 시 이전 타이머 즉시 취소) */
const activeTooltipTimerMap = new Map<string | number, NodeJS.Timeout>();
/** 비동기 서버 통신 간 경쟁 상태(Race condition) 방지용 최신 요청 ID */
let latestTooltipRequestId = 0;

export function groupEditableButtonRenderer<
  T extends {
    id?: number | string;
    title?: unknown;
    isStandard?: { group?: boolean; edit?: boolean; msg?: string };
    dataMsg?: string;
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
  optionsOrMsg?: string | GroupEditableButtonRendererOptions<T>
) {
  const Renderer = (params: ICellRendererParams<T>) => {
    const defaultTooltipMsg = typeof optionsOrMsg === 'string' ? optionsOrMsg : optionsOrMsg?.defaultTooltipMsg;
    const fetchCallback =
      (typeof optionsOrMsg === 'object' ? optionsOrMsg?.onFetchTooltipMessage : undefined) ??
      (params.context as { onFetchTooltipMessage?: TooltipFetchCallback<T> } | undefined)?.onFetchTooltipMessage;

    const isEdit = !!params.data?.isStandard?.edit;
    const msg =
      params.data?._tooltipMsg ??
      params.data?.isStandard?.msg ??
      (params.data as Record<string, unknown> | undefined)?.['data-msg'] ??
      (params.data as Record<string, unknown> | undefined)?.dataMsg ??
      defaultTooltipMsg;

    // 셀 DOM에 인라인 style(--tooltip-msg) 및 data-msg 속성 동시 적용
    useEffect(() => {
      const cellEl = params.eGridCell;
      if (!cellEl) return;

      if (isEdit && msg) {
        // 1) style에서 직접 content 제어: CSS 변수 설정
        cellEl.style.setProperty('--tooltip-msg', `"${String(msg)}"`);
        // 2) data-msg 속성 설정 (호환성 보장)
        cellEl.setAttribute('data-msg', String(msg));
      } else {
        cellEl.style.removeProperty('--tooltip-msg');
        cellEl.removeAttribute('data-msg');
      }
    }, [params.eGridCell, isEdit, msg]);

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

      const handleClick = async () => {
        const groupRoot = params.data?.filePath?.[0];
        const clickedRow = params.data;
        if (!clickedRow) return;

        // 1. 기존 실행 중인 이전 타이머들을 모두 정리 (연속 클릭 시 툴팁이 바로 꺼지는 현상 방지)
        activeTooltipTimerMap.forEach((timer) => clearTimeout(timer));
        activeTooltipTimerMap.clear();
        const currentRequestId = ++latestTooltipRequestId;

        const targetNodes: IRowNode<T>[] = [];

        // 외부 context에서 툴팁 데이터 맵, 동기 리졸버 함수 또는 비동기 콜백 함수 조회
        const context = params.context as
          | {
              tooltipData?: Record<string | number, string | Record<string | number, string>>;
              getTooltipMessage?: (clickedRow: T, targetRow: T) => string | undefined;
              onFetchTooltipMessage?: TooltipFetchCallback<T>;
            }
          | undefined;

        params.api.forEachNode((node) => {
          // 다른 그룹에 열려 있던 기존 툴팁이 있으면 닫음
          if (node.data?._tooltipOn && node.data?.filePath?.[0] !== groupRoot) {
            node.setData({
              ...node.data,
              _tooltipOn: false,
              _tooltipMsg: undefined,
            });
          }
          if (node.data?.filePath?.[0] === groupRoot && node.data?.isStandard?.edit) {
            targetNodes.push(node);
          }
        });

        if (targetNodes.length === 0) return;
        const targetNode = targetNodes[0];
        if (!targetNode.data) return;

        let dynamicMsg: string | undefined;

        // 1순위: onFetchTooltipMessage 콜백 (Renderer 옵션 또는 gridOptions.context)
        const activeFetchCallback = fetchCallback ?? context?.onFetchTooltipMessage;
        if (activeFetchCallback) {
          try {
            const result = activeFetchCallback({
              clickedRow,
              targetRow: targetNode.data,
              api: params.api,
              context: params.context,
            });
            dynamicMsg = result instanceof Promise ? await result : result;
          } catch (error) {
            console.error('[groupEditableButtonRenderer] onFetchTooltipMessage error:', error);
          }
        }

        // 연속 클릭에 의해 이미 새로운 요청이 들어온 경우 이전 비동기 작업 무시
        if (currentRequestId !== latestTooltipRequestId) {
          return;
        }

        // 2순위: 동기 리졸버 함수 (context.getTooltipMessage)
        if (!dynamicMsg && context?.getTooltipMessage) {
          dynamicMsg = context.getTooltipMessage(clickedRow, targetNode.data);
        }

        // 3순위: 외부 툴팁 데이터 맵 (context.tooltipData)
        if (!dynamicMsg && context?.tooltipData) {
          const targetId = targetNode.data.id;
          const mapItem =
            (targetId !== undefined ? context.tooltipData[targetId] : undefined) ??
            (groupRoot ? context.tooltipData[groupRoot] : undefined);

          if (typeof mapItem === 'string') {
            dynamicMsg = mapItem;
          } else if (mapItem && typeof mapItem === 'object') {
            dynamicMsg =
              (clickedRow.id !== undefined ? mapItem[clickedRow.id] : undefined) ??
              (typeof clickedRow.title === 'string' ? mapItem[clickedRow.title] : undefined) ??
              mapItem['default'];
          }
        }

        // 4순위: 기본 행 설정 또는 렌더러 기본 메시지
        if (!dynamicMsg) {
          dynamicMsg = targetNode.data.isStandard?.msg ?? defaultTooltipMsg;
        }

        targetNodes.forEach((node) => {
          if (node.data) {
            node.setData({
              ...node.data,
              _tooltipOn: true,
              _tooltipMsg: dynamicMsg,
            });
          }
        });

        // 2. 새로운 3초 타이머 등록 (이후 클릭이 없으면 3초 후 정상 종료)
        const timerKey = groupRoot ?? params.data?.id ?? 'default';
        const timerId = setTimeout(() => {
          targetNodes.forEach((node) => {
            if (node.data) {
              node.setData({
                ...node.data,
                _tooltipOn: false,
                _tooltipMsg: undefined,
              });
            }
          });
          activeTooltipTimerMap.delete(timerKey);
        }, 3000);
        activeTooltipTimerMap.set(timerKey, timerId);
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

    // isSelectedInsuredAmount인 경우에도 셀렉트 옵션이 1개 이하이면 화살표 대신 일반 숫자 포맷터로 렌더링
    if (isSelectedInsuredAmount) {
      const options = getInsuredAmountOptions(params.data, defaultOptions);
      if (options.length <= 1) {
        return numberValueFormatter(params);
      }
      return getExpiryRenderer(align)(params);
    }

    return numberValueFormatter(params);
  };

  Renderer.displayName = 'GroupEditableButtonRenderer';
  return Renderer;
}
