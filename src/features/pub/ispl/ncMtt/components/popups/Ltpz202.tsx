/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellClickedEvent, ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useMemo } from 'react';

import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';

export type DummyDataType = {
  id: number;
  field01: string;
  field02: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '척추염좌',
    field02: '치료 시작일자',
  },
  {
    id: 2,
    field01: '척추염좌',
    field02: '치료 종료일자',
  },
  {
    id: 3,
    field01: '척추염좌',
    field02: '의료기관명',
  },
  {
    id: 4,
    field01: '척추염좌',
    field02: '완치여부',
  },
  {
    id: 5,
    field01: '척추염좌',
    field02: '재발여부',
  },
  {
    id: 6,
    field01: '척추염좌',
    field02: '추가질문(순번1.질문요약)',
  },
  {
    id: 7,
    field01: '척추염좌',
    field02: '추가질문(순번2.질문요약)',
  },

  {
    id: 21,
    field01: '자궁근종',
    field02: '치료 시작일자',
  },
  {
    id: 22,
    field01: '자궁근종',
    field02: '치료 종료일자',
  },
  {
    id: 23,
    field01: '자궁근종',
    field02: '의료기관명',
  },
  {
    id: 24,
    field01: '자궁근종',
    field02: '완치여부',
  },
  {
    id: 25,
    field01: '자궁근종',
    field02: '재발여부',
  },
  {
    id: 26,
    field01: '자궁근종',
    field02: '추가질문(순번1.질문요약)',
  },
  {
    id: 27,
    field01: '자궁근종',
    field02: '추가질문(순번2.질문요약)',
  },
];

export type Ltpz202Props = {
  /** 미입력 항목 셀 클릭 시 호출되는 콜백 함수 */
  onUnenteredItemClick?: (item: DummyDataType) => void;
  /** 팝업 화면 정렬 위치 ('center' | 'left' | 'right', 기본값: 'left') */
  align?: 'center' | 'left' | 'right';
  /** 팝업 추가 오프셋 위치 설정 (선택 사항) */
  defaultPosition?: { x: number; y: number };
};

const Ltpz202 = ({ onUnenteredItemClick, align = 'left', defaultPosition }: Ltpz202Props) => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: '질병명',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        cellClass: 'text-center',
        autoHeight: true,
        spanRows: true,
      },
      {
        headerName: '미입력 항목',
        field: 'field02',
        flex: 10,
        autoHeight: true,
        sortable: true,
        unSortIcon: true,
        cellClass: 'cursor-pointer hover:underline',
      },
    ],
    [attributeColumnWidth]
  );

  const handleCellClicked = (event: CellClickedEvent<DummyDataType>) => {
    if (event.colDef.field === 'field02' && event.data) {
      onUnenteredItemClick?.(event.data);
      console.log(event.data);
    }
  };

  return (
    <Dialog open>
      <DialogContent
        showCloseButton
        resizable={true}
        className="w-[33rem]"
        align={align}
        defaultPosition={defaultPosition}
      >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병입력사항 체크결과
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ202)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Typo variant="body-md">
            입력하신 질병정보 항목 체크 결과입니다. <br />
            미입력항목을 선택하시면 해당 위치로 이동합니다.
          </Typo>
          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              noRowsOverlayComponent={AgGridEmptyComponent}
              getRowId={(params) => String(params.data.id)}
              rowData={DummyData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              singleClickEdit={true}
              domLayout="autoHeight"
              animateRows={false}
              enableCellSpan={true}
              onCellClicked={handleCellClicked}
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz202;
