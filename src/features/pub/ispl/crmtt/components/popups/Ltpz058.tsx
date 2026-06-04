/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Textarea } from '@uiux/Textarea';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
// 대분류
type DummyDataTypeA = {
  id: number;
  field1: string;
};

const DummyDataA: DummyDataTypeA[] = [
  { id: 1, field1: '주택' },
  { id: 1, field1: '일반' },
  { id: 2, field1: '공장' },
];

// 중분류
type DummyDataTypeB = {
  id: number;
  field1: string;
};

const DummyDataB: DummyDataTypeB[] = [
  { id: 1, field1: '근린생활시설' },
  { id: 2, field1: '근린생활시설' },
  { id: 3, field1: '화학공업' },
  { id: 4, field1: '근린생활시설' },
  { id: 5, field1: '근린생활시설' },
  { id: 6, field1: '화학공업' },
  { id: 7, field1: '근린생활시설' },
  { id: 8, field1: '근린생활시설' },
  { id: 9, field1: '화학공업' },
  { id: 10, field1: '근린생활시설' },
  { id: 11, field1: '근린생활시설' },
  { id: 12, field1: '화학공업' },
  { id: 13, field1: '근린생활시설' },
  { id: 14, field1: '근린생활시설' },
  { id: 15, field1: '화학공업' },
];

// 전체
type DummyDataTypeAll = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
};

const DummyDataAll: DummyDataTypeAll[] = [
  { id: 1, field1: '일반', field2: '근린생활시설', field3: '010100', field4: '(1)휴게음식점' },
  { id: 2, field1: '공장', field2: '근린생활시설', field3: '010200', field4: '(2)일반음식점' },
  { id: 3, field1: '공장', field2: '화학공업', field3: '043400', field4: '의약품제조' },
  { id: 4, field1: '일반', field2: '근린생활시설', field3: '010100', field4: '(1)휴게음식점' },
  { id: 5, field1: '공장', field2: '근린생활시설', field3: '010200', field4: '(2)일반음식점' },
  { id: 6, field1: '공장', field2: '화학공업', field3: '043400', field4: '의약품제조' },
  { id: 7, field1: '일반', field2: '근린생활시설', field3: '010100', field4: '(1)휴게음식점' },
  { id: 8, field1: '공장', field2: '근린생활시설', field3: '010200', field4: '(2)일반음식점' },
  { id: 9, field1: '공장', field2: '화학공업', field3: '043400', field4: '의약품제조' },
];

const Ltpz058 = () => {
  type SearchCategoryType = '분류기준' | '업종명';

  const [searchCategory, setSearchCategory] = React.useState<SearchCategoryType>('분류기준');

  const columnDefsA: ColDef<DummyDataTypeA>[] = [
    {
      headerName: '대분류',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
    },
  ];

  const columnDefsB: ColDef<DummyDataTypeB>[] = [
    {
      headerName: '중분류',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
    },
  ];
  const columnDefsAll: (ColDef<DummyDataTypeAll> | ColGroupDef<DummyDataTypeAll>)[] = [
    {
      headerName: '대분류',
      field: 'field1',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '중분류',
      field: 'field2',
      width: 150,
      cellClass: 'text-center',
    },
    {
      headerName: '영업위종',
      flex: 1,
      cellClass: 'text-center',
      children: [
        {
          headerName: '',
          field: 'field3',
          width: 80,
          cellClass: 'text-center justify-center',
        },
        {
          headerName: '',
          field: 'field4',
          flex: 1,
          cellClass: 'text-left',
        },
      ],
    },
  ];

  const columnDefsBusinessTypeOnly: (ColDef<DummyDataTypeAll> | ColGroupDef<DummyDataTypeAll>)[] = [
    {
      headerName: '영업위종',
      flex: 1,
      cellClass: 'text-center',
      children: [
        {
          headerName: '',
          field: 'field3',
          width: 80,
          cellClass: 'text-center justify-center',
        },
        {
          headerName: '',
          field: 'field4',
          flex: 1,
          cellClass: 'text-left',
        },
      ],
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              업종코드조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ058)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'sc'}>
            <RadioGroup
              value={searchCategory}
              className="flex gap-3"
              onValueChange={(value) => {
                if (value === '분류기준' || value === '업종명') {
                  setSearchCategory(value);
                }
              }}
            >
              {[
                { value: '분류기준', label: '분류기준' },
                { value: '업종명', label: '업종명' },
              ].map((option) => (
                <RadioGroupItem key={option.value} value={option.value}>
                  {option.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <Input
              aria-label="설계번호 검색"
              value={''}
              width={180}
              onChange={() => {}}
              readOnly={searchCategory === '분류기준'}
            />
            {searchCategory !== '분류기준' && (
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            )}
          </Grow>
          {searchCategory === '분류기준' && (
            <>
              {/* 분류기준  */}
              <Grid className="w-full h-full grid-cols-[1fr_2fr_3fr] gap-3">
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataTypeA>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyDataA}
                    columnDefs={columnDefsA}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    domLayout="autoHeight"
                  />
                </div>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataTypeB>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyDataB}
                    columnDefs={columnDefsB}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    domLayout="autoHeight"
                  />
                </div>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataTypeAll>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyDataAll}
                    columnDefs={columnDefsBusinessTypeOnly}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    singleClickEdit={true}
                    rowClassRules={{}}
                    domLayout="autoHeight"
                    groupHeaderHeight={30}
                    headerHeight={0}
                  />
                </div>
              </Grid>
              {/* //분류기준  */}
            </>
          )}
          {searchCategory === '업종명' && (
            <Grid>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataTypeAll>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyDataAll}
                  columnDefs={columnDefsAll}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  singleClickEdit={true}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                  groupHeaderHeight={30}
                  headerHeight={0}
                />
              </div>
            </Grid>
          )}
          <FormTable caption="업종설명" cols={['w-[10rem]', 'w-auto']} lineTop variant="default">
            <FormRow>
              <FormCell title={'업종설명'}>
                <Grow className="w-full [&>div]:w-full!" placement="ss">
                  <Textarea placeholder="내용을 입력하세요" showMinLengthCount />
                </Grow>
              </FormCell>
            </FormRow>
          </FormTable>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              {/* 2026-05-27 버튼 추가 */}
              <Button variant={'contained'} size={'xl'}>
                적용
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

export default Ltpz058;
