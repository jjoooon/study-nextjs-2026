/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { Grid, Grow } from '@atoms';
import { AgGridEmptyComponent, numberValueFormatter, useDynamicColumnWidths, createTooltipValueGetter } from '@aggrid';
import { Input } from '@uiux/Input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

import '@/shared/lib/agGridPub';

// dummy data
type DummyDataType = {
  id: number;
  field01: string;
  field02: string;
  field03: string;
  field04: number;
  field05: number;
  field06: number;
  field07: number;
  field08: number;
  field09: number;
  field10: string;
  field11: string;
  field12: string;
  field13: string;
  field14: string;
  field15: string;
  field16: string;
  field17: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '상해(일반상해),상해(일반상해),상해(일반상해),상해(일반상해),상해(일반상해),',
    field02: '2026-03-01',
    field03: '2027-07-01',
    field04: 109999999,
    field05: 9999999,
    field06: 9999999,
    field07: 9999999,
    field08: 9999999,
    field09: 9999999,
    field10: '정상',
    field11: '2026-03-01',
    field12: '입원의료비',
    field13: '사고당 365일 한도',
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
    field04: 9999999,
    field05: 9999999,
    field06: 9999999,
    field07: 9999999,
    field08: 9999999,
    field09: 9999999,
    field10: '정상',
    field11: '2026-03-01',
    field12: '입원의료비',
    field13: '사고당 365일 한도',
    field14: '급여 90%',
    field15: '50% 보상(일)',
    field16: '담보총액공제(입원)',
    field17: '50%',
  },
];

export default function Ltpa250Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 2026-06-01 width, flex 수정, animateRows 추가
  // 2026-06-04 flex, minWidth 수정
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '',
      field: 'id',
      width: attributeColumnWidth(30),
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '보장내용',
      field: 'field01',
      flex: 3,
      minWidth: attributeColumnWidth(200),
      cellClass: 'text-left pr-0!',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
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
          width: attributeColumnWidth(75),
        },
        {
          headerName: '종기',
          cellClass: 'text-center',
          field: 'field03',
          autoHeight: true,
          width: attributeColumnWidth(75),
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
          flex: 1,
          minWidth: attributeColumnWidth(75),
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
          flex: 1,
          minWidth: attributeColumnWidth(70),
          cellClass: 'text-right',
          field: 'field05',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '병원',
          flex: 1,
          minWidth: attributeColumnWidth(70),
          cellClass: 'text-right',
          field: 'field06',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '요양기관',
          flex: 1,
          minWidth: attributeColumnWidth(70),
          cellClass: 'text-right',
          field: 'field07',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '약제비',
          flex: 1,
          minWidth: attributeColumnWidth(70),
          cellClass: 'text-right',
          field: 'field08',
          autoHeight: true,
          valueFormatter: numberValueFormatter<DummyDataType>,
        },
        {
          headerName: '구공체',
          flex: 1,
          minWidth: attributeColumnWidth(70),
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
      width: attributeColumnWidth(60),
      field: 'field10',
      autoHeight: true,
    },
    {
      headerName: '상태변경일자',
      cellClass: 'text-center',
      field: 'field11',
      width: attributeColumnWidth(80),
      autoHeight: true,
    },
    {
      headerName: '담보특성',
      children: [
        {
          headerName: '보상기간',
          flex: 1,
          minWidth: attributeColumnWidth(120),
          cellClass: 'text-left px-0!',
          autoHeight: true,
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
            const v1 = String(params.data?.field12 ?? '');
            const v2 = String(params.data?.field13 ?? '');
            return (
              // Tooltip 적용한 셀 렌더링
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
          minWidth: attributeColumnWidth(120),
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
          minWidth: attributeColumnWidth(120),
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
            pageName: '실손특약담보사항조회',
            pageId: 'LTPA250',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="h-full grid-rows-[auto_1fr]" gap={3}>
            {' '}
            {/* 2026-06-01 h-full 추가 */}
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'head'}
                caption="실손특약담보사항조회 테이블"
                cols={['w-1', 'w-auto', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'주민번호'}>
                    <Input className="text-[1.3rem]" value={'김한화(000000-0******)'} readOnly variant="info" />
                  </FormCell>
                  <FormCell title={'담보건수'}>
                    <Input className="text-[1.3rem]" value={'32건'} readOnly variant="info" />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <div className="ag-theme-alpine">
              {/* 2026-06-01 높이값 삭제 */}
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={DummyData}
                columnDefs={columnDefs}
                animateRows={false}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
              />
            </div>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
