/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1',
    field02: '설계담보 추가 또는 증액',
    field03: '보장보험료50% 납입지원',
    field04: '20년만기 64,349',
    field05: '20년만기 94,781',
  },
  {
    id: 2,
    field01: '2',
    field02: '과거질병관련 알릴사항 항목 변경',
    field03: '최근 10년이내 진찰검사 여부',
    field04: '아니오',
    field05: '',
  },
  {
    id: 3,
    field01: '3',
    field02: '과거질병관련 알릴사항 항목 변경',
    field03: '최근 10년이내 진찰검사진단치료 여부 최근 10년이내 진찰검사진단치료 여부',
    field04: '아니오',
    field05: '',
  },
  {
    id: 4,
    field01: '4',
    field02: '설계인수지침위배내용 변경',
    field03: '확인대상',
    field04: '',
    field05: '(ICPS특인)최근 2년내 보험금 지급 이력에 대한 내용',
  },
  {
    id: 5,
    field01: '5',
    field02: '설계인수지침위배내용 변경',
    field03: '확인대상',
    field04: '',
    field05: '(ICPS특인)최근 2년내 보험금 지급 이력에 대한 내용',
  },
  {
    id: 6,
    field01: '6',
    field02: '설계인수지침위배내용 변경',
    field03: '확인대상',
    field04: '',
    field05: '(ICPS특인)최근 2년내 보험금 지급 이력에 대한 내용',
  },
];

const Ltpz036 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '변경사유',
      field: 'field02',
      flex: 1,
      minWidth: attributeColumnWidth(200),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      autoHeight: true,
      spanRows: true,
    },
    {
      headerName: '변경항목',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(200),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
    },
    {
      headerName: '변경전',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(200),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
    {
      headerName: '변경후',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(200),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field05' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              재심사 대상 설계변경 상세내용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz036)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true,
              }}
              domLayout={'normal'}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              enableCellSpan={true}
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
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz036;
