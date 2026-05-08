/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon, SearchIcon } from '@icons';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

// dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '',
    field02: '대상대상대상대상대상대상대상대상대상대상대상대상대상대상대상대상',
    field03: '2026-03-01',
    field04: '9999-12-31',
    field05: '',
    field06: '',
    field07: '김한화',
  },
  {
    id: 2,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '2026-03-01',
    field04: '9999-12-31',
    field05: '',
    field06: '',
    field07: '김한화',
  },
  {
    id: 3,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '2026-03-01',
    field04: '9999-12-31',
    field05: '',
    field06: '',
    field07: '김한화',
  },
];

export const Ltpa210 = () => {
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field01',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '대상',
      field: 'field02',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '적용시작일자',
      field: 'field03',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '적용종료일자',
      field: 'field04',
      flex: 1,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '상태',
      field: 'field05',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '적용사유',
      field: 'field06',
      flex: 2,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '등록자',
      field: 'field07',
      flex: 0.7,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              장기신계약가입설계관리정보
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA210)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable
              variant={'head'}
              caption="장기보험 모집자 설계 조회 테이블"
              cols={['w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1']}
            >
              <FormRow>
                <FormCell title={'등록항목'}>
                  <NativeSelect
                    aria-label="항목 선택"
                    width={108}
                    value={form.type01}
                    onChange={(e) => setFormField('type01', e.target.value)}
                    required
                  >
                    {[
                      { value: 'selection', id: 'type01-1', label: '-' },
                      { value: 'selection2', id: 'type01-2', label: '항목2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'조직구분'}>
                  <NativeSelect
                    aria-label="조직구분 선택"
                    width={108}
                    value={form.type02}
                    onChange={(e) => setFormField('type02', e.target.value)}
                    required
                  >
                    {[
                      { value: 'selection', id: 'type02-1', label: '선택' },
                      { value: 'selection', id: 'type02-2', label: '취급기관' },
                      { value: 'selection2', id: 'type02-3', label: '취급직원' },
                      { value: 'selection3', id: 'type02-4', label: '사용인' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input width={'11rem'} value={'1234567'} readOnly />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input aria-label="" width={120} value={'김한화'} readOnly />
                  <Grow className="ml-4">
                    <NativeSelect
                      aria-label="선택"
                      width={90}
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', id: 'type03-1', label: '선택' },
                        { value: 'selection2', id: 'type03-2', label: '항목2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <DatePickerInput mode="single" onChange={() => {}} value="" required />
                  </Grow>
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

          <TableFold>
            <TableFoldHead title="등록사항">
              <Grow>
                <Button color="gray" variant="outlined">
                  행추가
                </Button>
                <Button color="gray" variant="outlined">
                  행삭제
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <Grow className="w-full" gap={5}>
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
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: false,
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '√',
                      cellClass: 'text-center',
                      width: 30,
                    }}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
              </Grow>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
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
