/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { Badge } from '@/shared/components/uiux/Badge';
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
import { Input } from '@/shared/components/uiux/Input';
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils/AgGridUtils';

import '@/shared/lib/agGridPub';

type DummyDataType1 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

type DummyDataType3 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '10000',
  },
  {
    id: 2,
    field01: '보장 보험료50% 납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 3,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 4,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 5,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 6,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 7,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 8,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 9,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 10,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 11,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 12,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 13,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 14,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 15,
    field01: '상해사망추가15',
    field02: '10000',
  },
];

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '10000',
  },
  {
    id: 2,
    field01: '보장 보험료50% 납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 3,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 4,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 5,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
];

const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '10000',
  },
  {
    id: 2,
    field01: '보장 보험료50% 납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 3,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 4,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 5,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 6,
    field01: '상해사망(체증형)6',
    field02: '10000',
  },
  {
    id: 7,
    field01: '상해사망추가7',
    field02: '10000',
  },
];

const Ltpz100 = () => {
  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const [rowData3] = React.useState<DummyDataType3[]>(DummyData3);

  // AgGrid Column
  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '제한 담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType1>({ field: 'field01' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field02',
      width: 90,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '제한 담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field01' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field02',
      width: 90,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      headerName: '제한 담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType3>({ field: 'field01' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field02',
      width: 90,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              심사결과 상세보기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz100)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-3">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="심사결과" variant="head">
              <FormRow>
                <FormCell title={'심사결과'}> 
                  <Input value={'특별조건부인수'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid gap={3} className="w-full grid-cols-[1fr_1fr_1fr] min-h-[20.9rem]">
            <Grid className="grid-rows-[auto_1fr]">
              <Grow placement="sc">
                <Typo tag={'strong'} variant={'heading-md'}>
                  제한 담보
                </Typo>
                <Badge color="primary" variant="contained">
                  {rowData1.length}개
                </Badge>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType1>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData1}
                  columnDefs={columnDefs1}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout={'normal'}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </Grid>
            <Grid className="grid-rows-[auto_1fr]">
              <Grow placement="sc">
                <Typo tag={'strong'} variant={'heading-md'}>
                  보험료 할증
                </Typo>
                <Badge color="primary" variant="contained">
                  {rowData2.length}개
                </Badge>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout={'normal'}
                />
              </div>
            </Grid>
            <Grid className="grid-rows-[auto_1fr]">
              <Grow placement="sc">
                <Typo tag={'strong'} variant={'heading-md'}>
                  부담보(부위/질병)
                </Typo>
                <Badge color="primary" variant="contained">
                  {rowData3.length}개
                </Badge>
              </Grow>
              <div className="w-full ag-theme-alpine">
                <AgGridReact<DummyDataType3>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData3}
                  columnDefs={columnDefs3}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout={'normal'}
                />
              </div>
            </Grid>
          </Grid>
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

export default Ltpz100;
