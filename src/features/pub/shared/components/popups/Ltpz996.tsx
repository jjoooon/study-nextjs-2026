/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Typo } from '@atoms';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Dialog, DialogContent, DialogHeader, DialogSection, DialogTitle, DialogFooter } from '@uiux/Dialog';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

export type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
};

interface Ltpz996Props {
  data?: DummyDataType[];
  loading?: boolean;
}

/**
 * Ltpz996: 시스템 간의 통신 거래 이력을 리스트 형태로 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz996 = ({ data, loading }: Ltpz996Props) => {
  const rowData = data ?? []; // 표시할 데이터
  const { attributeColumnWidth } = useDynamicColumnWidths(); // 화면 배율에 따른 동적 너비 계산 훅
  // Ag-Grid 컬럼 정의
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '통신레코드',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '서비스코드',
        field: 'field2',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellClass: 'text-center',
      },
      {
        headerName: '거래코드',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        cellClass: 'text-center',
      },
      {
        headerName: '메세지코드',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
        // 메세지 코드를 클릭 가능한 파란색 밑줄 버튼 형태로 렌더링합니다.
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
          if (!params.value) return null;
          return (
            <button type="button" className="cursor-pointer text-[#006FF2] underline underline-offset-4">
              {String(params.value)}
            </button>
          );
        },
      },
      {
        headerName: '메세지상세',
        field: 'field5',
        flex: 10,
        cellClass: 'text-left',
        // 내용이 길어질 경우를 대비해 마우스 호버 시 툴팁을 표시합니다.
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field5' }),
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      {/* showCloseButton: 우측 상단 X 버튼 활성화, resizable: 창 크기 조절 가능 */}
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              거래이력리스트
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ996)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          {/* 그리드 영역: 데이터 개수에 맞춰 행 개수를 속성으로 가짐 */}
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              loading={loading}
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              // 기본 열 설정: 정렬 및 크기 조절 가능
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              domLayout="normal"
              // 텍스트가 잘렸을 때만 툴팁을 즉시(delay 0) 노출
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>
        {/* 하단 공통 정보 영역 (연락처 등) */}
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz996;
