/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellValueChangedEvent, ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import * as React from 'react';

import { useFormFields } from '@/shared/hooks/useFormFields';
import {
  AgGridEmptyComponent,
  createTooltipValueGetter,
  DatePickerCellEditor,
  editableSelectCellRenderer,
  numberValueFormatter,
} from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon, SearchIcon, ZoomInIcon, ZoomOutIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

import Ltpz01604 from './Ltpz01604';
import '@/shared/lib/agGridPub';

// --- 골프용품손해(실손) 데이터 및 타입 ---
type GolfItemDataType = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

const golfItemDummyData: GolfItemDataType[] = [
  {
    id: 1,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형3대진단형3대진단형3대진단형',
    field03: '2026-04',
    field04: 3000,
  },
  {
    id: 2,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형',
    field03: '2026-03',
    field04: 3000,
  },
  {
    id: 3,
    isCheck: false,
    isNew: false,
    field01: '선택',
    field02: '3대진단형',
    field03: '2026-03',
    field04: 3000,
  },
];

// --- 시설소유(관리)자배상책임 데이터 및 타입 ---
type FacilityLiabilityDataType = {
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

const facilityLiabilityDummyData: FacilityLiabilityDataType[] = [
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

const Ltpz016 = () => {
  // 1. 골프용품손해 state & handlers
  const [golfRowData, setGolfRowData] = useState<GolfItemDataType[]>(golfItemDummyData);
  const golfGridApiRef = useRef<GridApi<GolfItemDataType> | null>(null);

  const handleDeleteRow = useCallback(() => {
    const gridApi = golfGridApiRef.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setGolfRowData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  const handleAddRow = useCallback(() => {
    const nextId = golfRowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: GolfItemDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
    };

    setGolfRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = golfGridApiRef.current;
      if (!gridApi) return;

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [golfRowData]);

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<GolfItemDataType>) =>
        editableSelectCellRenderer<GolfItemDataType>({ ...params, align }),
    []
  );

  const handleGolfCellValueChanged = useCallback((params: CellValueChangedEvent<GolfItemDataType>) => {
    const { data, colDef, newValue } = params;
    if (!colDef.field) return;
    setGolfRowData((prev) =>
      prev.map((row) => (row.id === data.id ? { ...row, [colDef.field as string]: newValue } : row))
    );
  }, []);

  const golfColumnDefs: ColDef<GolfItemDataType>[] = [
    {
      headerName: '순번',
      field: 'id',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '품명',
      field: 'field01',
      width: 180,
      cellClass: 'text-center editable-cell',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      cellEditorParams: { values: ['선택', '선택1', '선택2'] },
      cellRenderer: expiryCellRenderer('center'),
    },
    {
      headerName: '브랜드명',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left editable-cell',
      editable: true,
      tooltipValueGetter: createTooltipValueGetter<GolfItemDataType>({ field: 'field02' }),
    },
    {
      headerName: '구입년월',
      field: 'field03',
      width: 120,
      cellClass: 'text-center editable-cell',
      cellEditor: DatePickerCellEditor,
      cellEditorParams: {
        monthOnly: true,
      },
      editable: true,
    },
    {
      headerName: '구입가격(만원)',
      field: 'field04',
      width: 130,
      cellClass: 'text-right editable-cell',
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
      editable: true,
    },
  ];

  // 2. 시설소유(관리)자배상책임 ag-grid renderer & defs
  const selectCellRenderer = useCallback(<TData,>(params: ICellRendererParams<TData>) => {
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

  const facilityColumnDefs: ColDef<FacilityLiabilityDataType>[] = [
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
      cellRenderer: (params: ICellRendererParams<FacilityLiabilityDataType>) => {
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

  // 3. 음식물배상책임 form state
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
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} readOnly />
                  -
                  <Input aria-label="" width={26} value={'1'} readOnly />
                  <Input aria-label="" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <TableFold>
            <TableFoldHead title="가족일상생활배상책임Ⅲ(대물 20만원(누수50만원)공제)(갱신형)" />
            <TableFoldBody className="gap-2">
              <FormTable caption="설계번호" cols={['w-[12rem]', 'w-[auto]']}>
                <FormRow>
                  <FormCell
                    title={
                      <Grow placement="ss">
                        자택주소동일
                        <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default"></Checkbox>
                      </Grow>
                    }
                  >
                    <Input value={'서울 영등포구 63로 328호(여의도동, 은하아파트)'} readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell
                    title={
                      <Grow placement="sc">
                        기본주소
                        <EssentialIcon />
                      </Grow>
                    }
                  >
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" value={''} readOnly required />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell
                    title={
                      <span>
                        상세주소(동번호/층수/호수 입력)
                        <EssentialIcon className="inline-block ml-1" />
                      </span>
                    }
                  >
                    <Input aria-label="" value={''} readOnly required />
                    <Input aria-label="" value={''} readOnly required />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'전체주소'}>
                    <Input aria-label="" value={''} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                <Typo variant={'body-sm'} icon={'info'}>
                  약관상 피보험자가 소유, 사용, 관리 중 발생한 우연한 사고로 배상책임을 부담하는 주거용 주택을 등록해
                  주세요.
                </Typo>
              </Gcol>
            </TableFoldBody>
          </TableFold>

          <TableFold className="grid-rows-[auto_1fr]">
            <TableFoldHead title="골프용품손해(실손)">
              <Grow>
                <Button color="gray" variant="outlined" onClick={handleAddRow}>
                  행추가
                  <ZoomInIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
                <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                  행삭제
                  <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine inner-scroll" data-rows={golfRowData.length}>
                <AgGridReact<GolfItemDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={golfRowData}
                  columnDefs={golfColumnDefs}
                  onCellValueChanged={handleGolfCellValueChanged}
                  enableCellSpan={true}
                  singleClickEdit={true}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: false,
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: 30,
                    cellClass: 'editable-cell',
                  }}
                  getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                  onGridReady={(params) => {
                    golfGridApiRef.current = params.api;
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>

          <TableFold>
            <TableFoldHead title="시설소유(관리)자배상책임" />
            <TableFoldBody className="gap-2">
              <div className="ag-theme-alpine inner-scroll" data-rows={facilityLiabilityDummyData.length}>
                <AgGridReact<FacilityLiabilityDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={facilityLiabilityDummyData}
                  columnDefs={facilityColumnDefs}
                  defaultColDef={{ sortable: false }}
                  enableCellSpan={true}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  singleClickEdit={true}
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
                      value={form.type03}
                      required
                      onChange={(e) => setFormField('type03', e.target.value)}
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
                      value={form.type04}
                      required
                      onChange={(e) => setFormField('type04', e.target.value)}
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
          {/* 임대인 배상책임 */}
          <Ltpz01604 />
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

export default Ltpz016;
