/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createModifiedCellClassRules, createTooltipValueGetter } from '@aggrid';
import { numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ArrowDoubleIcon } from '@icons';
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
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';
import { StarStage } from '@features/StarStage';

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

type DummyDataType3 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};

type DummyDataType4 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '수익성 저조',
    field02: '00.0',
    field03: '00.0%',
    field04: '00.0%',
  },
];

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '수익성 우량',
    field02: '00.0',
    field03: '00.0%',
    field04: '00.0%',
  },
];

const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    field01: '일반상해후유장해',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '-8.5',
  },
  {
    id: 2,
    field01: '상해사망(체증형)',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '-8.5',
  },
  {
    id: 3,
    field01: '일반상해후유장해',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '-8.5',
  },
  {
    id: 4,
    field01: '상해사망(체증형)',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '-8.5',
  },
  {
    id: 5,
    field01: '일반상해후유장해',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '-8.5',
  },
  {
    id: 6,
    field01: '상해사망(체증형)',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '-8.5',
  },
];
const DummyData4: DummyDataType4[] = [
  {
    id: 1,
    field01: '암진단비',
    field02: '0.00%',
    field03: '10000',
    field04: '5000',
    field05: '126',
    field06: '10000',
    field07: '2500',
    field08: '13.0',
  },
  {
    id: 2,
    field01: '유사암진단비',
    field02: '0.00%',
    field03: '10000',
    field04: '5000',
    field05: '126',
    field06: '10000',
    field07: '2500',
    field08: '11.0',
  },
  {
    id: 3,
    field01: '뇌전증진단비',
    field02: '0.00%',
    field03: '10000',
    field04: '5000',
    field05: '126',
    field06: '10000',
    field07: '2500',
    field08: '13.0',
  },
  {
    id: 4,
    field01: '유사암진단비',
    field02: '0.00%',
    field03: '10000',
    field04: '5000',
    field05: '126',
    field06: '10000',
    field07: '2500',
    field08: '13.0',
  },
  {
    id: 5,
    field01: '뇌전증진단비',
    field02: '0.00%',
    field03: '10000',
    field04: '5000',
    field05: '126',
    field06: '10000',
    field07: '2500',
    field08: '11.0',
  },
  {
    id: 6,
    field01: '상해사망(체증형)',
    field02: '00.0',
    field03: '10000',
    field04: '5000',
    field05: '-10.5',
    field06: '5000',
    field07: '2500',
    field08: '13.0',
  },
];

const Ltpz070 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const [rowData3] = React.useState<DummyDataType3[]>(DummyData3);
  const [rowData4] = React.useState<DummyDataType4[]>(DummyData4);
  const field06ModifiedCellClassRules3 = React.useMemo(
    () => createModifiedCellClassRules({ rows: rowData3, idKey: 'id', valueKey: 'field06' }),
    [rowData3]
  );
  const field06ModifiedCellClassRules4 = React.useMemo(
    () => createModifiedCellClassRules({ rows: rowData4, idKey: 'id', valueKey: 'field06' }),
    [rowData4]
  );

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '현재 (보장 보험료: 50,000원)',
      children: [
        {
          headerName: '수익성',
          field: 'field01',
          width: 180,
          cellClass: 'text-center',
          autoHeight: true,
          sortable: false,
          cellRenderer: (params: ICellRendererParams<DummyDataType, string | number>) => (
            <StarStage profitabilityText={String(params.value ?? '')} />
          ),
        },
        {
          headerName: '가치배수',
          field: 'field02',
          flex: 1,
          cellClass: 'text-right',
          autoHeight: true,
        },
        {
          headerName: '예상손해율',
          field: 'field03',
          flex: 1,
          cellClass: 'text-right',
          autoHeight: true,
        },
        {
          headerName: '수정률',
          field: 'field04',
          flex: 1,
          cellClass: 'text-right',
          autoHeight: true,
        },
      ],
    },
  ];
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    {
      headerName: '변경후 (보장 보험료: 500,000원)',
      headerClass: 'ag-header-color',
      // headerClass: 'text-[var(--color-primary-50)]',
      children: [
        {
          headerName: '수익성',
          field: 'field01',
          width: 180,
          headerClass: 'ag-header-color',
          cellClass: 'text-center',
          autoHeight: true,
          cellRenderer: (params: ICellRendererParams<DummyDataType2, string | number>) => (
            <StarStage profitabilityText={String(params.value ?? '')} />
          ),
        },
        {
          headerName: '가치배수',
          field: 'field02',
          flex: 1,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
          autoHeight: true,
        },
        {
          headerName: '예상손해율',
          field: 'field03',
          flex: 1,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
          autoHeight: true,
        },
        {
          headerName: '수정률',
          field: 'field04',
          flex: 1,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
          autoHeight: true,
        },
      ],
    },
  ];
  const columnDefs3: (ColDef<DummyDataType3> | ColGroupDef<DummyDataType3>)[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
      sortable: false,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType3>({ field: 'field01' }),
    },
    {
      headerName: '수정률',
      field: 'field02',
      width: 80,
      cellClass: 'text-right',
    },
    {
      headerName: '현재',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      headerClass: 'ag-header-right-divider',
      children: [
        {
          headerName: '가입금액(만원)',
          field: 'field03',
          width: 120,
          cellClass: 'text-right',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '보험료(원)',
          field: 'field04',
          width: 120,
          cellClass: 'text-right',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '가치배수',
          field: 'field05',
          width: 120,
          cellClass: 'text-right',
        },
      ],
    },
    {
      headerName: '변경후',
      headerClass: 'ag-header-color',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      children: [
        {
          headerName: '가입금액(만원)',
          field: 'field06',
          width: 120,
          headerClass: 'ag-header-color',
          cellClass: 'text-right editable-cell',
          cellClassRules: field06ModifiedCellClassRules3,
          editable: true,
          cellEditor: 'agInputCellEditor',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '보험료(원)',
          field: 'field07',
          width: 120,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '가치배수',
          field: 'field08',
          width: 120,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
        },
      ],
    },
  ];
  const columnDefs4: (ColDef<DummyDataType4> | ColGroupDef<DummyDataType4>)[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
      sortable: false,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType4>({ field: 'field01' }),
    },
    {
      headerName: '수정률',
      field: 'field02',
      width: 80,
      cellClass: 'text-right',
    },
    {
      headerName: '현재',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      headerClass: 'ag-header-right-divider',
      children: [
        {
          headerName: '가입금액(만원)',
          field: 'field03',
          width: 120,
          cellClass: 'text-right',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '보험료(원)',
          field: 'field04',
          width: 120,
          cellClass: 'text-right',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '가치배수',
          field: 'field05',
          width: 120,
          cellClass: 'text-right',
        },
      ],
    },
    {
      headerName: '변경후',
      headerClass: 'ag-header-color',
      children: [
        {
          headerName: '가입금액(만원)',
          field: 'field06',
          width: 120,
          headerClass: 'ag-header-color',
          cellClass: 'text-right editable-cell',
          cellClassRules: field06ModifiedCellClassRules4,
          editable: true,
          cellEditor: 'agInputCellEditor',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '보험료(원)',
          field: 'field07',
          width: 120,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
          valueParser: (params) => Number(params.newValue) || 0,
          valueFormatter: numberValueFormatter, // 천단위 콤마 표시
        },
        {
          headerName: '가치배수',
          field: 'field08',
          width: 120,
          headerClass: 'ag-header-color',
          cellClass: 'text-right',
        },
      ],
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              계약 수익성(CMS)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ070)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol gap={3}>
            <TableFold>
              <TableFoldHead title="계약 수익성 상세" />
              <TableFoldBody>
                <Grow className="w-full" gap={3}>
                  <div className="w-full border border-(--color-gray-30) box-border rounded-md p-3">
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        domLayout="autoHeight"
                        enableCellSpan={false}
                        singleClickEdit={false}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                        }}
                      />
                    </div>
                  </div>
                  <Grow className="w-[2.4rem] h-[2.4rem]">
                    <ArrowDoubleIcon className="w-[2.4rem] h-[2.4rem] rotate-270" />
                  </Grow>
                  <div
                    className="w-full border-[0.2rem] border-(--color-primary-50) box-border rounded-md p-3 bg-(--color-primary-5)"
                    style={{ boxShadow: '0 0.4rem 0.8rem 0 rgba(255, 92, 46, 0.2)' }}
                  >
                    <div className="ag-theme-alpine ag-header-color-grid">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData2}
                        columnDefs={columnDefs2}
                        domLayout="autoHeight"
                        enableCellSpan={false}
                        singleClickEdit={false}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                        }}
                      />
                    </div>
                  </div>
                </Grow>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="가입금액 감액 권장 담보" />
              <TableFoldBody>
                <div className="relative">
                  <div
                    className="absolute top-0 bottom-0 right-0 z-10 border rounded-md pointer-events-none"
                    style={{
                      width: '36.7rem',
                      height: 'auto',
                      borderColor: 'var(--color-primary-50)',
                      borderWidth: '0.2rem',
                      boxShadow: '0 0.4rem 0.8rem 0 rgba(255, 92, 46, 0.2)',
                    }}
                  />
                  <div className="ag-theme-alpine min-h-[15.4rem]">
                    <AgGridReact<DummyDataType3>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData3}
                      columnDefs={columnDefs3}
                      domLayout="normal"
                      enableCellSpan={false}
                      singleClickEdit={true}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      defaultColDef={{
                        sortable: false,
                        resizable: false,
                      }}
                    />
                  </div>
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="가입금액 증액 권장 담보" />
              <TableFoldBody>
                <div className="relative">
                  <div
                    className="absolute top-0 bottom-0 right-0 z-10 border rounded-md pointer-events-none"
                    style={{
                      width: '36.7rem',
                      height: 'auto',
                      borderColor: 'var(--color-primary-50)',
                      borderWidth: '0.2rem',
                      boxShadow: '0 0.4rem 0.8rem 0 rgba(255, 92, 46, 0.2)',
                    }}
                  />
                  <div className="ag-theme-alpine min-h-[15.4rem]">
                    <AgGridReact<DummyDataType4>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData4}
                      columnDefs={columnDefs4}
                      domLayout="normal"
                      enableCellSpan={true}
                      singleClickEdit={true}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      defaultColDef={{
                        sortable: false,
                        resizable: false,
                      }}
                    />
                  </div>
                </div>
              </TableFoldBody>
            </TableFold>
            <Gcol variant={'box-info'} placement={'ss'}>
              <BulletList>
                <BulletListItem color="info" size="sm">
                  안내문구는 추후 확정 예정입니다.
                </BulletListItem>
                <BulletListItem size="sm">
                  가입금액 감액, 증액 담보 리스트 : 가입담보 중 수익성 개선을 위해 가입금액 감액, 증액이 권장되는 담보
                  리스트 입니다.
                </BulletListItem>
                <BulletListItem size="sm">
                  가치배수는 회사 내부에서 관리하는 정보이므로 고객에게 안내되지 않도록 유의바랍니다.
                </BulletListItem>
              </BulletList>
            </Gcol>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'primary'}>
                시뮬레이션
              </Button>
              <Button variant={'contained'} size={'xl'}>
                반영
              </Button>
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

export default Ltpz070;
