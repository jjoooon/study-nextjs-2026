/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { Grid, Grow } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
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
  field10: string | number;
  field11: string | number;
  field12: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '',
    field02: '한화손해보험',
    field03: '보험종목',
    field04: 'LA20148716422000',
    field05: '한화 더건강한 한아름종합보험2601',
    field06: '33',
    field07: '김한화',
    field08: '1급수',
    field09: '2026-TEXT',
    field10: '2026-03-01',
    field11: '2099-03-01',
    field12: 'TEXT',
  },
  {
    id: 2,
    field01: '',
    field02: '한화손해보험',
    field03: '보험종목',
    field04: 'LA20148716422000',
    field05: '한화 더건강한 한아름종합보험2601',
    field06: '33',
    field07: '김한화',
    field08: '1급수',
    field09: '2026-TEXT',
    field10: '2026-03-01',
    field11: '2099-03-01',
    field12: 'TEXT',
  },
  {
    id: 3,
    field01: '',
    field02: '한화손해보험',
    field03: '보험종목',
    field04: 'LA20148716422000',
    field05: '한화 더건강한 한아름종합보험2601',
    field06: '33',
    field07: '김한화',
    field08: '1급수',
    field09: '2026-TEXT',
    field10: '2026-03-01',
    field11: '2099-03-01',
    field12: 'TEXT',
  },
];

export default function Ltpa260Section() {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: '',
        field: 'field01',
        width: 50,
        cellClass: 'text-center',
      },
      {
        headerName: '회사명',
        cellClass: 'text-center',
        children: [
          {
            headerName: '보험종목',
            field: 'field03',
            width: 170,
            cellClass: 'text-center px-0!',
            autoHeight: true,
            cellRenderer: createFieldRenderer<DummyDataType>('field02', 'field03'),
          },
        ],
      },
      {
        headerName: '',
        field: 'field05',
        width: 360,
        cellClass: 'text-center px-0!',
        autoHeight: true,
        headerComponent: () => {
          return (
            <Grid className="h-[5.6rem] w-full grid-cols-[18rem_18rem] grid-rows-[2.8rem_2.8rem] gap-0">
              <Grow placement="cc" className="w-full border-b px-2 border-(--color-gray-10)">
                증권번호
              </Grow>
              <Grow placement="cc" className="w-full px-2 border-l border-b border-(--color-gray-10)">
                담보건수
              </Grow>
              <Grow placement="cc" className="col-span-2 w-full px-2 justify-center">
                상품명
              </Grow>
            </Grid>
          );
        },
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
          return (
            <Grid className="h-[5.6rem] grid-cols-[18rem_18rem] grid-rows-[2.8rem_2.8rem] gap-0">
              <Grow placement="cc" className="w-full border-b px-2 border-(--color-gray-10)">
                {String(params.data?.field04 ?? '')}
              </Grow>
              <Grow placement="cc" className="w-full px-2 border-l border-b border-(--color-gray-10)">
                {String(params.data?.field06 ?? '')}
              </Grow>
              <Grow placement="cc" className="col-span-2 w-full px-2 justify-start">
                {String(params.data?.field05 ?? '')}
              </Grow>
            </Grid>
          );
        },
      },
      {
        headerName: '피보험자명',
        cellClass: 'text-center',
        autoHeight: true,
        children: [
          {
            headerName: '상해급수',
            field: 'field08',
            flex: 1,
            cellClass: 'text-center px-0!',
            autoHeight: true,
            cellRenderer: createFieldRenderer<DummyDataType>('field07', 'field08'),
          },
        ],
      },
      {
        headerName: '보장기간',
        field: 'field09',
        width: 360,
        cellClass: 'text-center px-0!',
        autoHeight: true,
        headerComponent: () => {
          return (
            <Grid className="h-[5.6rem] grid-cols-[18rem_18rem] grid-rows-[2.8rem_2.8rem] gap-0">
              <Grow placement="cc" className="col-span-2 w-full px-2 justify-center">
                보장기간
              </Grow>
              <Grow placement="cc" className="w-full h-full border-t px-2 border-(--color-gray-10)">
                시기
              </Grow>
              <Grow placement="cc" className="w-full h-full px-2 border-l border-t border-(--color-gray-10)">
                종기
              </Grow>
            </Grid>
          );
        },
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
          return (
            <Grid className="h-[5.6rem] grid-cols-[18rem_18rem] grid-rows-[2.8rem_2.8rem] gap-0">
              <Grow placement="cc" className="col-span-2 w-full px-2 justify-center">
                {String(params.data?.field09 ?? '')}
              </Grow>
              <Grow placement="cc" className="w-full h-full border-t px-2 border-(--color-gray-10)">
                {String(params.data?.field10 ?? '')}
              </Grow>
              <Grow placement="cc" className="w-full px-2 border-l border-t border-(--color-gray-10)">
                {String(params.data?.field11 ?? '')}
              </Grow>
            </Grid>
          );
        },
      },
      {
        headerName: '계약상태',
        field: 'field12',
        flex: 1,
        cellClass: 'text-center flex! items-center justify-center',
        cellRenderer: (params: ICellRendererParams<DummyDataType>) => String(params.data?.field12 ?? ''),
      },
    ],
    []
  );

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '보험신용정보 통합조회',
            pageId: 'LTPA260',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="h-full grid-rows-[auto_1fr]" gap={3}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'} caption="실손특약세부계약조회 테이블" cols={['w-1', 'w-1', 'w-1', 'w-1']}>
                <FormRow>
                  <FormCell title={'주민번호'}>
                    <Input width={110} value={'1234567'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input width={170} value={''} readOnly />
                  </FormCell>
                  <FormCell title={'기준일자'}>
                    <DatePickerInput mode={'single'} value={''} required />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button
                  color={'gray'}
                  only={'icon'}
                  size={'lg'}
                  variant={'outlined'}
                  onClick={() => {}}
                  aria-label="새로고침"
                >
                  <ResetIcon />
                </Button>
              </Grow>
            </Grow>
            <TableFold variant={'accordion'}>
              <TableFoldHead title="실손보상담보 총등록건수" />
              <TableFoldBody className="h-full">
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: false,
                      resizable: true,
                    }}
                    domLayout="normal"
                    selectionColumnDef={{
                      cellClass: 'text-center',
                    }}
                    animateRows={false}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
