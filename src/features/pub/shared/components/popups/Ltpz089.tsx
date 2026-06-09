/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { ColDef } from 'ag-grid-enterprise';
import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};
// 공통
const dummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
];

const Ltpz089 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '가입',
      field: 'field01',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '건물순번',
      field: 'field02',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '기둥',
      field: 'field03',
      flex: 2,
      cellClass: 'text-center',
    },
    {
      headerName: '지붕',
      field: 'field04',
      flex: 2,
      cellClass: 'text-center',
    },
    {
      headerName: '외벽',
      field: 'field05',
      flex: 2,
      cellClass: 'text-center',
    },
    {
      headerName: '지하수용여부',
      field: 'field06',
      flex: 2,
      cellClass: 'text-center',
    },
  ];

  const [rowData] = useState<DummyDataType[]>(dummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              건물형태수용장소
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ089)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid grid-rows-[auto_auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="소재지정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'소재지'}>
                  <Input value={'소재지 정보'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold variant="accordion">
            <TableFoldHead title="목적물세부사항과 수용장소">
              <Typo variant={'body-sm'}>수용장소 건물 형태</Typo>
            </TableFoldHead>
            <TableFoldBody className="gap-2">
              <FormTable caption="목적물세부사항" className="" cols={['w-[12rem]', 'w-auto']} lineTop variant="default">
                <FormRow>
                  <FormCell className="" title={'목적물세부사항'} variant="default">
                    <Input onChange={() => {}} size="lg" value={''} variant="default" width="full" required />
                  </FormCell>
                </FormRow>
              </FormTable>
              <FormTable caption="세부수용장소" className="" cols={['w-[12rem]', 'w-auto']} lineTop variant="default">
                <FormRow>
                  <FormCell className="" title={'세부수용장소'} variant="default">
                    <Input onChange={() => {}} size="lg" value={''} variant="default" width="full" required />
                  </FormCell>
                </FormRow>
              </FormTable>
              <FormTable
                caption="수용장소구분"
                className=""
                cols={['w-[12rem]', 'w-auto', 'w-[12rem]', 'w-auto']}
                lineTop
                variant="default"
              >
                <FormRow>
                  <FormCell className="" title={'수용장소구분'} variant="default">
                    <NativeSelect aria-label="수용장소구분 선택" width={'full'} required value={''} onChange={() => {}}>
                      {[
                        { value: 'selection', label: '건물내' },
                        { value: 'selection2', label: '건물내2' },
                      ].map((option, idx) => (
                        <NativeSelectOption key={idx} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell className="" title={'야적물건구분'} variant="default">
                    <NativeSelect aria-label="야적물건구분 선택" width={'full'} value={''} onChange={() => {}}>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '선택2' },
                      ].map((option, idx) => (
                        <NativeSelectOption key={idx} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
          <TableFold variant="accordion">
            <TableFoldHead title="목적물(건물) 형태"></TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>
        {/* 2026-05-21 수정 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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

export default Ltpz089;
