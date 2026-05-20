/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon, FileExportIcon, PlusIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { createTooltipValueGetter } from '@/shared/components/agGridUtils';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';

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

type DummyDataType1 = {
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
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '1000',
    field02: '한화손해보험',
    field03: '한화 3N5 더간편건강보험(세만기형) 무배당 2601',
    field04: 'TEXT',
    field05: '2026-03-01',
    field06: '2086-01-01',
    field07: '9999999',
    field08: 'TEXT TEXT',
    field09: 'TEXT TEXT',
    field10: 'TEXT TEXT',
    field11: 'TEXT TEXT',
    field12: 'TEXT',
  },
  {
    id: 2,
    field01: '999',
    field02: '한화손해보험',
    field03: '한화 3N5 더간편건강보험(세만기형) 무배당 2601',
    field04: 'TEXT',
    field05: '2026-03-01',
    field06: '2086-01-01',
    field07: '9999999',
    field08: 'TEXT TEXT',
    field09: 'TEXT TEXT',
    field10: 'TEXT TEXT',
    field11: 'TEXT TEXT',
    field12: 'TEXT',
  },
  {
    id: 3,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
  },
  {
    id: 4,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
  },
  {
    id: 5,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
  },
  {
    id: 6,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
  },
];

const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: '담보명 TEXT TEXT TEXT',
    field02: '손해보험',
    field03: '3',
    field04: '9999999999',
  },
  {
    id: 2,
    field01: '담보명 TEXT TEXT TEXT',
    field02: '손해보험',
    field03: '3',
    field04: '9999999999',
  },
  {
    id: 3,
    field01: '담보명 TEXT TEXT TEXT',
    field02: '손해보험',
    field03: '3',
    field04: '9999999999',
  },
  {
    id: 4,
    field01: '담보명 TEXT TEXT TEXT',
    field02: '손해보험',
    field03: '3',
    field04: '9999999999',
  },
  {
    id: 5,
    field01: '담보명 TEXT TEXT TEXT',
    field02: '손해보험',
    field03: '3',
    field04: '9999999999',
  },
  {
    id: 6,
    field01: '담보명 TEXT TEXT TEXT',
    field02: '손해보험',
    field03: '3',
    field04: '9999999999',
  },
];

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '1000',
    field02: '한화손해보험',
    field03: '한화 3N5 더간편건강보험(세만기형) 무배당 2601',
    field04: 'TEXT',
    field05: '2026-03-01',
    field06: '2086-01-01',
    field07: 'TEXT TEXT',
    field08: 'TEXT TEXT',
    field09: '9999999',
    field10: '9999999',
    field11: 'TEXT',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
  },
  {
    id: 3,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
  },
  {
    id: 4,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
  },
  {
    id: 5,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
  },
  {
    id: 6,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
  },
];

export default function Ltpa240Section() {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '계약정보',
      children: [
        {
          headerName: '회사명',
          field: 'field02',
          width: 130,
          cellClass: 'text-center',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
        },
        {
          headerName: '상품명',
          field: 'field03',
          width: 260,
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
        },
        {
          headerName: '보험종목명',
          field: 'field04',
          width: 100,
          cellClass: 'text-center',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
        },
      ],
    },
    {
      headerName: '담보정보',
      children: [
        {
          headerName: '보험시기',
          field: 'field05',
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '보험종기',
          field: 'field06',
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '가입금액',
          field: 'field07',
          width: 100,
          cellClass: 'text-right',
          valueFormatter: numberValueFormatter,
        },
        {
          headerName: '보장내용',
          field: 'field08',
          width: 120,
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field08' }),
        },
        {
          headerName: '담보특성',
          field: 'field09',
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '상태',
          field: 'field10',
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '자기부담비율',
          field: 'field11',
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '보상기간',
          field: 'field12',
          flex: 1,
          cellClass: 'text-center',
        },
      ],
    },
  ];

  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '담보명',
      field: 'field01',
      width: 500,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType1>({ field: 'field01' }),
    },
    {
      headerName: '업권구분',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '가입건수',
      field: 'field03',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '가입금액 합계(원)',
      field: 'field04',
      flex: 1,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  // AgGrid Column
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '계약정보',
      children: [
        {
          headerName: '회사명',
          field: 'field02',
          width: 120,
          cellClass: 'text-center',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field02' }),
        },
        {
          headerName: '상품명',
          field: 'field03',
          width: 220,
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field03' }),
        },
        {
          headerName: '보험종목명',
          field: 'field04',
          width: 120,
          cellClass: 'text-center',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field04' }),
        },
        {
          headerName: '보험시기',
          field: 'field05',
          flex: 1,
          cellClass: 'text-center',
        },
        {
          headerName: '보험종기',
          field: 'field06',
          flex: 1,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '담보정보',
      children: [
        {
          headerName: '담보명',
          field: 'field07',
          width: 120,
          cellClass: 'text-center',
        },
        {
          headerName: '보장내용',
          field: 'field08',
          width: 150,
          cellClass: 'text-left',
          tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field08' }),
        },
        {
          headerName: '가입금액',
          field: 'field09',
          width: 90,
          cellClass: 'text-right',
          valueFormatter: numberValueFormatter,
        },
        {
          headerName: '보상한도',
          field: 'field10',
          width: 90,
          cellClass: 'text-right',
          valueFormatter: numberValueFormatter,
        },
        {
          headerName: '상태',
          field: 'field11',
          flex: 1,
          cellClass: 'text-center',
        },
      ],
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '보험신용정보 통합조회',
            pageId: 'LTPA240',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_auto_auto_1fr_auto]" gap={3}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable
                variant={'head'}
                caption="정액보상담보 총등록건수 조회 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'취급자'}>
                    <Input width={110} value={'1234567'} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input width={170} value={'신부산GA지점'} readOnly />
                  </FormCell>
                  <FormCell title={'주민번호'}>
                    <Input width={120} value={''} required />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={120} value={''} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Checkbox>
                  <span className="whitespace-nowrap mr-4">재조회</span>
                </Checkbox>
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
              <TableFoldHead title="실손보상담보 총등록건수">
                <Grow>
                  <Button variant={'outlined'} color={'success'}>
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody className="grid-rows-[auto_1fr] gap-2">
                <FormTable
                  caption="보험신용정보 테이블"
                  cols={['w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[auto]']}
                >
                  <FormRow>
                    <FormCell className="" title={'조회상태'}>
                      정상조회
                    </FormCell>
                    <FormCell className="" title={'건수'}>
                      12건
                    </FormCell>
                    <FormCell className="" title={'기준일시'}>
                      2026-03-11 14:50:12
                    </FormCell>
                  </FormRow>
                </FormTable>
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    selectionColumnDef={{
                      cellClass: 'text-center',
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold variant={'accordion'}>
              <TableFoldHead title="정액보상담보 총등록건수">
                <Grow>
                  <Button variant={'outlined'} color={'secondary'}>
                    상세조회
                  </Button>
                  <Button variant={'outlined'} color={'success'}>
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody className="grid-rows-[auto_1fr] gap-3">
                <FormTable
                  caption="보험신용정보 테이블"
                  cols={[
                    'w-[12rem]',
                    'w-[15rem]',
                    'w-[auto]',
                    'w-[15rem]',
                    'w-[auto]',
                    'w-[15rem]',
                    'w-[auto]',
                    'w-[auto]',
                  ]}
                >
                  <FormRow>
                    <FormCell className="" title={'조회상태'}>
                      정상조회
                    </FormCell>
                    <FormCell className="" title={'건수'}>
                      12건
                    </FormCell>
                    <FormCell className="" title={'기준일시'}>
                      2026-03-11 14:50:12
                    </FormCell>
                    <FormCell className="" title={'업권구분'}>
                      <RadioGroup className="gap-3" onValueChange={() => {}} width="full" defaultValue={'전체'}>
                        {[
                          { value: '전체', label: '전체' },
                          { value: '전체(합산)', label: '전체(합산)' },
                          { value: '손해보험', label: '손해보험' },
                          { value: '생명보험', label: '생명보험' },
                          { value: '공제', label: '공제' },
                        ].map((item) => (
                          <RadioGroupItem key={item.value} value={item.value}>
                            {item.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                </FormTable>
                <div className="ag-theme-alpine min-h-[15.4rem]">
                  <AgGridReact<DummyDataType1>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData1}
                    columnDefs={columnDefs1}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    selectionColumnDef={{
                      cellClass: 'text-center',
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold variant={'accordion'}>
              <TableFoldHead title="재물보상담보 총등록건수">
                <Grow>
                  <Button variant={'outlined'} color={'success'}>
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody className="grid-rows-[auto_1fr] gap-2">
                <FormTable
                  caption="보험신용정보 테이블"
                  cols={['w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[auto]']}
                >
                  <FormRow>
                    <FormCell className="" title={'조회상태'}>
                      정상조회
                    </FormCell>
                    <FormCell className="" title={'건수'}>
                      12건
                    </FormCell>
                    <FormCell className="" title={'기준일시'}>
                      2026-03-11 14:50:12
                    </FormCell>
                  </FormRow>
                </FormTable>
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType2>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    selectionColumnDef={{
                      cellClass: 'text-center',
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <Gcol className="w-full">
              <Gcol className="s-full" variant={'box-info'} placement="ss">
                <Typo variant={'body-sm'} icon={'info'}>
                  회사별 가입현황 정보는 "내보험다보여(https://ins.credit4u.or.kr/showAll/main.do)"서비스를 통해
                  신용정보주체가 직접 조회 가능(본인인증 필요)
                </Typo>
                <Typo variant={'body-sm'} icon={'info'}>
                  당사계약 및 타사 해약시 <b>①실시간 반영 되지 않으며(익일반영)/②설계 중인 정보는 포함되지 않음</b>에
                  유의 필요
                </Typo>
              </Gcol>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'outlined'} color={'gray'} size={'xl'}>
                      정액담보점검
                      <PlusIcon color={'var(--color-secondary-50)'} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="end" className="max-w-[28.2rem]" closeButton={true}>
                    <Grid className="w-full grid-cols-[1fr] gap-1">
                      <Button variant={'outlined'} color={'gray'} size={'lg'}>
                        점검목록조회
                      </Button>
                      <Button variant={'outlined'} color={'gray'} size={'lg'}>
                        점검내역
                      </Button>
                    </Grid>
                  </PopoverContent>
                </Popover>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  가입설계동의
                </Button>
              </Grow>
              <Grow gap={1}>
                <Button form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                  정액담보상세출력(회사별)
                </Button>
                <Button form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                  정액담보상세출력(보장별)
                </Button>
                <Button form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  출력
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
