/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon } from '@icons';
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

import '@/shared/lib/agGridPub';

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
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '',
    field02: 'TEXT',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
  },
];

const Ltpz01602 = () => {
  // 2026-05-27 select 부분만 cellRenderer: selectCellRenderer, 추가
  const selectCellRenderer = React.useCallback(<TData,>(params: ICellRendererParams<TData>) => {
    const value = params.value == null ? '' : String(params.value);
    const hasValue = value.trim().length > 0;

    if (hasValue) {
      return (
        <div className="flex h-full w-full items-center justify-center px-1">
          <span className="block min-w-0 flex-1 truncate text-center leading-[2.5rem]">{value}</span>
        </div>
      );
    }

    return (
      <div className="flex h-full w-full items-center justify-between gap-1 px-1">
        <span className="block min-w-0 flex-1" />
        <span className="ag-icon ag-icon-small-down shrink-0" aria-hidden="true" />
      </div>
    );
  }, []);

  // 2026-05-27 업종구분, 보상한도, 자가부담금, 트램플린 : editable, cellEditor, cellRenderer 추가
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '업종구분',
      field: 'field01',
      width: 100,
      cellClass: 'text-center',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택1', '선택2'] },
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '규모',
      flex: 1,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <Grid className='"h-full w-full grid-cols-[1fr_1fr_1fr_1fr] items-stretch'>
            <span className="flex h-full items-center justify-center">{params.data?.field02}</span>
            <span className="flex h-full items-center justify-center border-l border-gray-200 pl-2">
              {params.data?.field03}
            </span>
            <span className="flex h-full items-center justify-center border-l border-gray-200 pl-2">
              {params.data?.field04}
            </span>
            <span className="flex h-full items-center justify-center border-l border-gray-200 pl-2">
              {params.data?.field05}
            </span>
          </Grid>
        );
      },
    },
    {
      headerName: '보상한도',
      field: 'field06',
      width: 100,
      cellClass: 'text-center',
      editable: true,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      cellEditor: 'agSelectCellEditor',
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '자기부담금',
      field: 'field07',
      width: 100,
      cellClass: 'text-center',
      editable: true,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      cellEditor: 'agSelectCellEditor',
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '보험료',
      field: 'field08',
      width: 100,
      cellClass: 'text-center',
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '',
      field: 'field09',
      width: 100,
      cellClass: 'text-center',
      editable: true,
      headerComponent: () => (
        <div className="w-full text-center whitespace-normal px-1">
          트램플린
          <br />
          (에어바운스)
        </div>
      ),
      cellEditor: 'agSelectCellEditor',
      cellRenderer: selectCellRenderer,
    },
    {
      headerName: '요양병원여부',
      field: 'field10',
      width: 100,
      cellClass: 'text-center',
    },
  ];

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계담보상세정보등록
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ016)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={150} value={'LA123456789012'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                  <b>한화 더 건강한 한여름좋합 보험 2601</b>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold>
            <TableFoldHead title="시설소유(관리)자배상책임" />
            <TableFoldBody className="gap-2">
              <div className="ag-theme-alpine inner-scroll" data-rows={DummyData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: false }}
                  enableCellSpan={true}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  singleClickEdit={true} // 2026-05-27 추가
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: false,
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  headerHeight={50}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 30,
                    cellClass: 'editable-cell',
                  }}
                />
              </div>
              <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                <Typo variant={'body-sm'} icon={'info'}>
                  해당업종의 면적은 ㎡단위(1평=3.3㎡)로 입력하시기 바랍니다.
                </Typo>
              </Gcol>
            </TableFoldBody>
          </TableFold>
          <TableFold>
            <TableFoldHead title="음식물배상책임" />
            <TableFoldBody className="gap-2">
              <FormTable
                caption="설계번호"
                cols={['w-[8rem]', 'w-[6rem]', 'w-[6rem]', 'w-[auto]', 'w-[18rem]', 'w-[auto]']}
              >
                <FormRow>
                  <FormCell title={'업종구분'} titleColSpan={3}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={160}
                      value={form.type01}
                      required
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '선택' },
                        { value: 'selection2', id: 'type01-2', label: '선택1' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'업종구분2'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={160}
                      value={form.type02}
                      required
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type02-1', label: '업종1' },
                        { value: 'selection2', id: 'type02-2', label: '업종2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'보상한도'} tdNone />
                  <FormCell title={'대인'} tdNone />
                  <FormCell title={'1인당'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={160}
                      value={form.type01}
                      required
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type03-1', label: '선택' },
                        { value: 'selection2', id: 'type03-2', label: '선택1' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'1사고당'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      width={160}
                      value={form.type02}
                      required
                      onChange={(e) => setFormField('type02', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type04-1', label: '업종1' },
                        { value: 'selection2', id: 'type04-2', label: '업종2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                {/* 2026-05-27 수정 */}
                <FormRow>
                  <FormCell
                    title={
                      <Grow placement="sc">
                        자기부담금 <EssentialIcon />
                      </Grow>
                    }
                    titleColSpan={3}
                    colSpan={3}
                  >
                    <Input
                      aria-label=""
                      width={160}
                      value={form.type05}
                      onChange={(e) => setFormField('type05', e.target.value)}
                      commaAmount
                      readOnly
                      required
                    />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'연간매출액'} titleColSpan={3} colSpan={3}>
                    <Input
                      aria-label=""
                      width={160}
                      value={form.type06}
                      onChange={(e) => setFormField('type06', e.target.value)}
                      commaAmount
                      required
                    />
                    만원
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

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

export default Ltpz01602;
