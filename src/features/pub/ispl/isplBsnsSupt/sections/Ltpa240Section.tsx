/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  DatePickerCellEditor,
} from '@aggrid';
import { Grid, Grow, Gcol, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon, FileExportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { Checkbox } from '@uiux/Checkbox';
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

const DummyData: DummyDataType[] = [
  {
    id: 1,
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
    field12: '',
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

export default function Ltpa240Section() {

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      field: 'field01',
      width: 90,
    },
    {
      headerName: '계약정보',
      children : [
        { 
          headerName: '회사명', 
          field: 'field02', 
          width: 160, tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }) 
        },
        { 
          headerName: '상품명', 
          field: 'field03', 
        },
      ],
    },
    {
      headerName: '적용시작일자',
      field: 'field04',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '적용종료일자',
      field: 'field05',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '상태',
      field: 'field06',
      width: 80,
      cellClass: 'text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '정상', ''] },
    },
    {
      headerName: '적용사유',
      field: 'field07',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!',
      cellEditor: 'agInputCellEditor',
    },
    {
      headerName: '등록자',
      field: 'field08',
      width: 120,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

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
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable
                variant={'head'}
                caption="보험신용정보 통합조회 테이블"
                cols={['w-1', 'w-1', 'w-1', 'w-auto']}
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
              <TableFoldBody className="grid-rows-[auto_1fr] gap-3">
                <FormTable caption="보험신용정보 테이블" cols={['w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[auto]']}>
                  <FormRow>
                    <FormCell className="" title={'조회상태'}>
                      김한화
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
                    enableCellSpan={true}
                    singleClickEdit={true}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    rowSelection={{
                      mode: 'multiRow',
                    }}
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
                <FormTable caption="보험신용정보 테이블" cols={['w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[35rem]', 'w-[12rem]', 'w-[auto]']}>
                  <FormRow>
                    <FormCell className="" title={'조회상태'}>
                      김한화
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
                    enableCellSpan={true}
                    singleClickEdit={true}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    rowSelection={{
                      mode: 'multiRow',
                    }}
                    selectionColumnDef={{
                      cellClass: 'text-center',
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  저장
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
