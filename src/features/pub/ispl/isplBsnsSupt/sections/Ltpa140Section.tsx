/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';

import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { PageID } from '@features/PageID';

import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

import { Input } from '@uiux/Input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

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
  field13: string | number;
  field14: string | number;
  field15: string | number;
  field16: string | number;
  field17: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '상해(일반상해),상해(일반상해),상해(일반상해),상해(일반상해),상해(일반상해),',
    field02: '2026-03-01',
    field03: '2027-07-01',
    field04: '9999999',
    field05: '9999999',
    field06: '9999999',
    field07: '9999999',
    field08: '9999999',
    field09: '9999999',
    field10: '정상',
    field11: '2026-03-01',
    field12: '입원의료비',
    field13: '사고당 365일 한',
    field14: '급여 90%',
    field15: '50% 보상(일)',
    field16: '담보총액공제(입원)',
    field17: '50%',
  },
  {
    id: 2,
    field01: '상해(일반상해),상해(일반상해),상해(일반상해),상해(일반상해),상해(일반상해),',
    field02: '2026-03-01',
    field03: '2027-07-01',
    field04: '9999999',
    field05: '9999999',
    field06: '9999999',
    field07: '9999999',
    field08: '9999999',
    field09: '9999999',
    field10: '정상',
    field11: '2026-03-01',
    field12: '입원의료비',
    field13: '사고당 365일 한',
    field14: '급여 90%',
    field15: '50% 보상(일)',
    field16: '담보총액공제(입원)',
    field17: '50%',
  },
];

export default function Ltpa140Section() {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '',
      field: 'id',
      width: 40,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '보장내용',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        const val = String(params.value ?? '');
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate-no px-1">{val}</div>
            </TooltipTrigger>
            <TooltipContent side="top" hideArrow>
              {val}
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      headerName: '담보보장기간',
      cellClass: 'text-center',
      children: [
        {
          headerName: '시기',
          cellClass: 'text-center',
          field: 'field02',
          autoHeight: true,
          width: 80,
        },
        {
          headerName: '종기',
          cellClass: 'text-center',
          field: 'field03',
          autoHeight: true,
          width: 80,
        },
      ],
    },
    {
      headerName: '가입금액',
      children: [
        {
          headerName: '(단위:천원)',
          cellClass: 'text-right',
          field: 'field04',
          width: 80,
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
      ],
    },
    {
      headerName: '공제금액(단위:천원)',
      children: [
        {
          headerName: '의원',
          width: 80,
          cellClass: 'text-right',
          field: 'field05',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '병원',
          width: 80,
          cellClass: 'text-right',
          field: 'field06',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '요양기관',
          width: 80,
          cellClass: 'text-right',
          field: 'field07',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '약제비',
          width: 80,
          cellClass: 'text-right',
          field: 'field08',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '구공체',
          width: 80,
          cellClass: 'text-right',
          field: 'field09',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
      ],
    },
    {
      headerName: '보험상태',
      cellClass: 'text-center',
      width: 80,
      field: 'field10',
      autoHeight: true,
    },
    {
      headerName: '상태변경일자',
      cellClass: 'text-center',
      field: 'field11',
      width: 100,
      autoHeight: true,
    },
    {
      headerName: '담보특성',
      children: [
        {
          headerName: '보상기간',
          flex: 1,
          cellClass: 'text-left px-0!',
          autoHeight: true,
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
            const v1 = String(params.data?.field12 ?? '');
            const v2 = String(params.data?.field13 ?? '');
            return (
              <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{v1}</div>
                  </TooltipTrigger>
                  <TooltipContent side="top" hideArrow>
                    {v1}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{v2}</div>
                  </TooltipTrigger>
                  <TooltipContent side="top" hideArrow>
                    {v2}
                  </TooltipContent>
                </Tooltip>
              </Grid>
            );
          },
        },
      ],
    },
    {
      headerName: '자가부담비율',
      cellClass: 'text-center',
      children: [
        {
          headerName: '병실차액',
          flex: 1,
          cellClass: 'text-left px-0!',
          autoHeight: true,
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
            const v1 = String(params.data?.field14 ?? '');
            const v2 = String(params.data?.field15 ?? '');
            return (
              <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{v1}</div>
                  </TooltipTrigger>
                  <TooltipContent side="top" hideArrow>
                    {v1}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{v2}</div>
                  </TooltipTrigger>
                  <TooltipContent side="top" hideArrow>
                    {v2}
                  </TooltipContent>
                </Tooltip>
              </Grid>
            );
          },
        },
      ],
    },
    {
      headerName: '공제금액기준',
      cellClass: 'text-center',
      children: [
        {
          headerName: '보험미적용보상',
          flex: 1,
          cellClass: 'text-left px-0!',
          autoHeight: true,
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
            const v1 = String(params.data?.field16 ?? '');
            const v2 = String(params.data?.field17 ?? '');
            return (
              <Grid className="w-full grid-rows-[1fr_1fr] divide-y divide-gray-200" gap={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{v1}</div>
                  </TooltipTrigger>
                  <TooltipContent side="top" hideArrow>
                    {v1}
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-[3rem] w-full leading-[3rem] truncate-no px-1">{v2}</div>
                  </TooltipTrigger>
                  <TooltipContent side="top" hideArrow>
                    {v2}
                  </TooltipContent>
                </Tooltip>
              </Grid>
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기신계약발급물일괄생성',
            pageId: 'LTPA250',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'head'}
                caption="장기신계약발급물일괄생성 테이블"
                cols={['w-1', 'w-auto', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'주민번호'}>
                    <Input className="text-[1.3rem]" value={'김한화(900101-1******)'} readOnly variant="info" />
                  </FormCell>
                  <FormCell title={'담보건수'}>
                    <Input className="text-[1.3rem]" value={'32건'} readOnly variant="info" />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Gcol className="w-full" gap={1}>
              <div className="ag-theme-alpine min-h-150">
                <AgGridReact<DummyDataType>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </Gcol>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
