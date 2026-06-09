/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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
import { Input } from '@uiux/Input';
import { Textarea } from '@uiux/Textarea';
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyDataType1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
};

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: 'S92',
    field02: '발등골절',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '22(2021-01-08~2021-02-01)',
    field06: '',
    field07: 'Y',
    field08: '미고지',
    field09: '고지필요',
  },
  {
    id: 2,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 3,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 4,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 5,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 6,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
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
  {
    id: 6,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '10000',
  },
];

const Ltpz096 = () => {
  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 보완요청 체크박스 그룹 상태
  const [requestCheck] = React.useState<string[]>(['고지', '제한담보', '고지유형변경', '서류', '검토불가', '기타']);
  // AgGrid Column
  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '대표질병코드',
      field: 'field01',
      flex: 1,
      minWidth: attributeColumnWidth(100),
    },
    {
      headerName: '질병명',
      field: 'field02',
      flex: 3,
      minWidth: attributeColumnWidth(200),
    },
    {
      headerName: '원사고발생일',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(110),
    },
    {
      headerName: '최종사고발생일',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(110),
    },
    {
      headerName: '입원',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(180),
    },
    {
      headerName: '통원',
      field: 'field06',
      width: 50,
    },
    {
      headerName: '수술',
      field: 'field07',
      width: 50,
    },
    {
      headerName: '고지여부',
      field: 'field08',
      width: 70,
    },
    {
      headerName: '체크',
      field: 'field09',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellStyle: (params) => {
        return params.value ? { color: '#006FF2' } : undefined;
      },
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '제한 담보명',
      field: 'field01',
      flex: 5,
      minWidth: attributeColumnWidth(400),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field01' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field02',
      flex: 1,
      minWidth: attributeColumnWidth(100),
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
              (Ltpz096)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_auto_1fr_1fr_auto_auto] gap-3">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="심사결과 상세 테이블" variant="head">
              <FormRow>
                <FormCell title={'심사결과'}>
                  <Grow gap={3} placement="sc">
                    <Input value={'보완요청'} variant="info" readOnly />
                    <CheckboxGroup
                      className="gap-3"
                      minSelected={0}
                      value={requestCheck}
                      disabled={true}
                      width={'auto'}
                    >
                      <CheckboxGroupItem value="고지">고지</CheckboxGroupItem>
                      <CheckboxGroupItem value="제한담보">제한담보</CheckboxGroupItem>
                      <CheckboxGroupItem value="고지유형변경">고지유형변경</CheckboxGroupItem>
                      <CheckboxGroupItem value="서류">서류</CheckboxGroupItem>
                      <CheckboxGroupItem value="검토불가">검토불가</CheckboxGroupItem>
                      <CheckboxGroupItem value="기타">기타</CheckboxGroupItem>
                    </CheckboxGroup>
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Textarea
            value="[시스템심사 : 보완요청] - 대장직장용종 : [수술無_불가] 고지해당 안되는 유형으로 변경바랍니다.(질병 및 상해 전담보)"
            readOnly
          />
          <Grid className="grid-rows-[1fr_auto]" gap={2}>
            <TableFold variant="default">
              <TableFoldHead title="질병고지" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                  <AgGridReact<DummyDataType1>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData1}
                    columnDefs={columnDefs1}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                      cellClass: 'text-center',
                    }}
                    domLayout={'normal'}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                설계반영 클릭시 아래 사항에 대해서는 자동 반영됩니다.
              </Typo>
              <Typo icon="warning" variant="body-sm">
                일부 자동입력 가능한 영역만 적용되므로 꼭 입력사항을 재확인바랍니다.
              </Typo>
            </Gcol>
          </Grid>
          <Grid placement="ss" className="grid-rows-[auto_1fr]">
            <Grow placement="sc">
              <Typo tag={'strong'} variant={'heading-md'}>
                제한 담보
              </Typo>
              <Badge color="primary" variant="contained">
                {rowData2.length}개
              </Badge>
            </Grow>
            <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
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
          <TableFold>
            <TableFoldHead title="고지유형변경" />
            <TableFoldBody>
              <Textarea value="" readOnly />
            </TableFoldBody>
          </TableFold>
          <TableFold>
            <TableFoldHead title="서류" />
            <TableFoldBody>
              <Textarea value="" readOnly />
            </TableFoldBody>
          </TableFold>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                설계반영
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

export default Ltpz096;
