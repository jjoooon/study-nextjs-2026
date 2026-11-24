/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, GridApi, RowClassParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createAddRowHandler,
  createDeleteSelectedRowsHandler,
  createSequentialRowReorderHandler,
  createTooltipValueGetter,
  getNextNumericRowId,
  useDynamicColumnWidths,
} from '@aggrid';
import { Grow, Typo } from '@atoms';
import { ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';

type DummyData1Type = {
  id: number;
  group: string;
  field1: string;
  field2: string;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    group: 'a1',
    field1: '보장수준',
    field2: '1. 동종유사상품에 비해 최저보증이율이 상대적으로 높음',
  },
  {
    id: 2,
    group: 'a1',
    field1: '보장수준',
    field2: '2. 주요 질병에 대한 진단비 및 수술비 보장 한도가 높음',
  },
  {
    id: 3,
    group: 'a1',
    field1: '보장수준',
    field2: '3. 후유장해 발생 시 지급률 기준 보장이 폭넓음',
  },
  {
    id: 4,
    group: 'a2',
    field1: '가입목적',
    field2: '1. 노후 생활자금 마련 및 은퇴 후 의료비 집중 대비',
  },
  {
    id: 5,
    group: 'a2',
    field1: '가입목적',
    field2: '2. 가족 생계 유지 및 유가족 경제적 안전망 확보',
  },
  {
    id: 6,
    group: 'a2',
    field1: '가입목적',
    field2: '3. 자녀 성장기 집중 교육비 및 치료비 지원 목적',
  },
  {
    id: 7,
    group: 'a3',
    field1: '보험료',
    field2: '1. 동일 보장 수준 대비 월 납입 보험료 경쟁력 우수',
  },
  {
    id: 8,
    group: 'a3',
    field1: '보험료',
    field2: '2. 무해지환급형 구조로 표준형 대비 약 20% 저렴한 보험료',
  },
  {
    id: 9,
    group: 'a3',
    field1: '보험료',
    field2: '3. 자동이체 할인 및 다자녀 가구 우대 할인 혜택 제공',
  },
  {
    id: 10,
    group: 'a4',
    field1: '납입주기/기간',
    field2: '1. 고객의 경제활동 주기에 맞춘 유연한 납입기간 선택 가능',
  },
  {
    id: 11,
    group: 'a4',
    field1: '납입주기/기간',
    field2: '2. 납입면제 특약 탑재로 중대질병 진단 시 보험료 납입 면제',
  },
  {
    id: 12,
    group: 'a5',
    field1: '환급률/이자율',
    field2: '1. 중장기 계약 유지 시 안정적인 공시이율 및 환급률 제공',
  },
  {
    id: 13,
    group: 'a5',
    field1: '환급률/이자율',
    field2: '2. 목적자금 마련을 위한 중도인출 및 추가납입 기능 탑재',
  },
  {
    id: 14,
    group: 'a6',
    field1: '특약구성',
    field2: '1. 고객 맞춤형 선택특약 다양화로 불필요한 보장 제외 가능',
  },
];

const Ltpz123 = () => {
  const gridApiRef = React.useRef<GridApi<DummyData1Type> | null>(null);

  // 그룹별(a1, a2, a3...) 순서 인덱스 맵 생성 (a1: 0, a2: 1, a3: 2)
  const groupIndexMap = React.useMemo(() => {
    const map = new Map<string, number>();
    let count = 0;
    DummyData1.forEach((item) => {
      if (!map.has(item.group)) {
        map.set(item.group, count++);
      }
    });
    return map;
  }, []);

  // 그룹별 교차 배경색 (호버/선택/드래그 상태 온전히 유지)
  const rowClassRules = React.useMemo(
    () => ({
      'row-group-even': (params: RowClassParams<DummyData1Type>) => {
        const idx = groupIndexMap.get(params.data?.group ?? '') ?? 0;
        return idx % 2 === 0;
      },
      'row-group-odd': (params: RowClassParams<DummyData1Type>) => {
        const idx = groupIndexMap.get(params.data?.group ?? '') ?? 0;
        return idx % 2 === 1;
      },
    }),
    [groupIndexMap]
  );

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs1 = React.useMemo<ColDef<DummyData1Type>[]>(
    () => [
      {
        headerName: '추천사유구분',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(140),
        editable: true,
        sortable: false,
        cellClass: 'text-center',
        tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field1' }),
      },
      {
        headerName: '추천사유내용',
        field: 'field2',
        flex: 8,
        editable: true,
        tooltipValueGetter: createTooltipValueGetter<DummyData1Type>({ field: 'field2' }),
      },
    ],
    [attributeColumnWidth]
  );
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              500인 상품비교 추천사유 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ123)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="flex flex-col items-start">
          <div className="ag-theme-alpine inner-scroll" data-row={DummyData1.length}>
            <AgGridReact<DummyData1Type>
              onGridReady={(event) => {
                gridApiRef.current = event.api;
              }}
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={DummyData1}
              columnDefs={columnDefs1}
              rowClassRules={rowClassRules}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              rowSelection={{
                mode: 'singleRow',
                checkboxes: true,
                enableClickSelection: false,
              }}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell text-center',
              }}
              domLayout="normal"
              animateRows={false}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              tooltipHideDelay={3000}
            />
          </div>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button size={'xl'}>저장</Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz123;
