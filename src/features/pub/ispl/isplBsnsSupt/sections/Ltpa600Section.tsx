/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { AgGridEmptyComponent, useAgGridInfiniteAppend } from '@aggrid';
import { Grow, Grid, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, FileExportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';

type DummyData1Type = {
  id: number;
  isCheck: boolean;
  field1: number;
  field2: string;
  field3: string[][];
  field4: number;
};
const DummyData1: DummyData1Type[] = [
  {
    id: 1,
    isCheck: true,
    field1: 1,
    field2: '사망/후유',
    field3: [['사망', '후유장해', '장애'], ['보험료']],
    field4: 98,
  },
];

export default function Ltpa600Section() {
  const columnDefs1: ColDef<DummyData1Type>[] = [
    {
      headerName: '순서',
      field: 'field1',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '담보그룹',
      field: 'field2',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '구분',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
      cellRenderer: (params) => {
        const values = params.value as string[][];
        console.log('values', values);
        return (
          <Grid className="grid-cols-[8rem_1fr] grid-rows-[1fr_1fr] gap-0">
            {values[0].map((value, index) => (
              <React.Fragment key={index}>
                <Grow placement="cc">포함</Grow>
                <Grow placement="cc">{value[0]}</Grow>
              </React.Fragment>
            ))}
            {values[1].map((value, index) => (
              <React.Fragment key={index}>
                <Grow placement="cc">미포함</Grow>
                <Grow placement="cc">{value[0]}</Grow>
              </React.Fragment>
            ))}
          </Grid>
        );
      },
    },
    {
      headerName: '담보',
      field: 'field4',
      width: 60,
      cellClass: 'text-center',
    },
  ];

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '담보그룹관리',
            pageId: 'LTPA600',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-cols-[1fr_1fr] h-full w-full" gap={3}>
            {/* 담보분류 */}
            <Grid className="grid-rows-[auto_1fr] h-full w-full">
              <Grow className="w-full" placement="sc">
                <Typo variant={'heading-md'} tag="h2">
                  담보분류
                </Typo>
              </Grow>
              <AgGridReact<DummyData1Type>
                noRowsOverlayComponent={AgGridEmptyComponent}
                getRowId={(params) => String(params.data.id)}
                rowData={DummyData1}
                columnDefs={columnDefs1}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                singleClickEdit={true}
                rowSelection={{
                  mode: 'singleRow',
                  checkboxes: true,
                  enableClickSelection: false,
                }}
                selectionColumnDef={{
                  headerName: '선택',
                  width: 30,
                  cellClass: 'editable-cell text-center',
                }}
                domLayout="normal"
              />
            </Grid>

            {/* 시뮬레이션 */}
            <Grid className="grid-rows-[auto_1fr] h-full w-full">
              <Grow className="w-full" placement="sc">
                <Typo variant={'heading-md'} tag="h2">
                  시뮬레이션
                </Typo>
              </Grow>
              <div>ddd</div>
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'sc'} className="w-full">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  담보그룹관리
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  상품별 시뮬레이션
                </Button>
              </Grow>
              <Grow gap={1} placement={'ec'} className="w-full">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  엑셀내보내기
                </Button>
                <Button variant={'contained'} color={'primary'} size={'xl'}>
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
