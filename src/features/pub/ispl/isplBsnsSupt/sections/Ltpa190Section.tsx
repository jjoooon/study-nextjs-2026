/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';
// M1. 팝업에서 화면으로 전환, 전체 수정

import { Grow, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import type { ColDef, EditableCallbackParams, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useCallback } from 'react';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createTooltipValueGetter,
  DatePickerCellEditor,
  editableSelectCellRenderer,
} from '@/shared/components/agGridUtils';
import { DatePickerInput } from '@/shared/components/common/DatePicker';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { ResetIcon } from '@/shared/components/icons/CommonIcons';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
import { useFormFields } from '@/shared/hooks/useFormFields';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isNew: boolean;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isNew: false,
    isCheck: false,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '김한화',
    field08: '',
    field09: '',
  },
  {
    id: 2,
    isNew: false,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
  },
  {
    id: 3,
    isNew: false,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
  },
];

export default function Ltpa190Section() {
  // 새로 추가한 행만 편집 가능
  const isEditableNewRow = React.useCallback(
    (params: EditableCallbackParams<DummyDataType>) => params.data?.isNew === true,
    []
  );

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<DummyDataType>) =>
        editableSelectCellRenderer<DummyDataType>({ ...params, align }),
    []
  );

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '체크단계',
      field: 'field01',
      flex: 1,
      editable: false,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '신계약프로세스',
      field: 'field02',
      flex: 2,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      editable: isEditableNewRow,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          '선택',
          '(개인영업-전속)청약서류출력제한',
          '(개인영업-교차)청약서류출력제한',
          '(전략영업)청약서류출력제한',
          '(개인영업-전속)휴대폰전자서명요청제한',
          '(개인영업-교차)휴대폰전자서명요청제한',
          '(전략영업-전속)휴대폰전자서명요청제한',
        ],
      },
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '판매채널',
      field: 'field03',
      flex: 1,
      editable: false,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '적용사항',
      field: 'field04',
      flex: 1,
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      editable: isEditableNewRow,
      cellEditorParams: { values: ['선택', '선택2'] },
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '적용시작일',
      field: 'field05',
      width: 130,
      editable: isEditableNewRow, // 날짜 직접 입력 가능
      cellClass: 'text-center',
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field05 && String(params.data.field05).trim() !== '' ? String(params.data.field05) : '',
    },
    {
      headerName: '적용종료일',
      field: 'field06',
      width: 130,
      editable: isEditableNewRow, // 날짜 직접 입력 가능
      cellClass: 'text-center',
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field06 && String(params.data.field06).trim() !== '' ? String(params.data.field06) : '',
    },
    {
      headerName: '입력자',
      field: 'field07',
      flex: 0.8,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '삭제여부',
      field: 'isCheck',
      flex: 0.7,
      cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
      cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
      editable: isEditableNewRow,
    },
    {
      headerName: '비고',
      field: 'field09',
      flex: 1.5,
      editable: isEditableNewRow,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  // agGrid 행추가
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const handleAddRow = React.useCallback(() => {
    const nextId = rowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: DummyDataType = {
      id: nextId,
      isCheck: false,
      isNew: true,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
      field06: '',
      field07: '',
      field08: 'false',
      field09: '',
    };

    setRowData((prev) => [...prev, newRow]);

    requestAnimationFrame(() => {
      const gridApi = gridApiRef.current;

      if (!gridApi) {
        return;
      }

      const rowIndex = gridApi.getDisplayedRowCount() - 1;
      gridApi.ensureIndexVisible(rowIndex, 'bottom');
    });
  }, [rowData]);

  // agGrid 행삭제
  const handleDeleteRow = React.useCallback(() => {
    const gridApi = gridApiRef.current;
    if (!gridApi) return;

    const selectedIds = new Set(
      gridApi
        .getSelectedNodes()
        .map((node) => node.data?.id)
        .filter((id) => id !== undefined)
    );
    if (selectedIds.size === 0) return;

    setRowData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });
  return (
    <>
      {/* M2. 팝업에서 페이지로 변경 */}
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기신계약채널별기준관리',
            pageId: 'LTPA190',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'head'}
                lineTop={false}
                caption="장기신계약 조회 테이블"
                cols={['w-[9rem]', 'w-auto', 'w-[9rem]', 'w-auto', 'w-[9rem]', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'보종군'}>
                    <NativeSelect
                      aria-label="항목 선택"
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '장기보험' },
                        { value: 'selection2', id: 'type01-2', label: '장기보험2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'적용사항'}>
                    <NativeSelect
                      aria-label="적용사항 선택"
                      width={150}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      required
                    >
                      {[
                        { value: 'selection', id: 'type02-1', label: '선택' },
                        { value: 'selection2', id: 'type02-2', label: '(개인영업-전속)청약서류출력제한' },
                        { value: 'selection3', id: 'type02-3', label: '(개인영업-교차)청약서류출력제한' },
                        { value: 'selection4', id: 'type02-4', label: '(전략영업)청약서류출력제한' },
                        { value: 'selection5', id: 'type02-5', label: '(개인영업-전속)휴대폰전자서명요청제한' },
                        { value: 'selection6', id: 'type02-6', label: '(개인영업-교차)휴대폰전자서명요청제한' },
                        { value: 'selection7', id: 'type02-7', label: '(전략영업-전속)휴대폰전자서명요청제한' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'조회일자'}>
                    <DatePickerInput
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{ from: '2026-02', to: '2026-03' }}
                      required
                    />
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
                  (<Checkbox>삭제건포함</Checkbox>)
                  <Button color="gray" variant="outlined" onClick={handleAddRow}>
                    행추가
                  </Button>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                    행삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <Grow className="w-full">
                  <div className="ag-theme-alpine min-h-[18.4rem]">
                    <AgGridReact<DummyDataType>
                      // getRowId 적용: id 필드를 고유 식별자로 사용
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      domLayout="normal"
                      singleClickEdit={true}
                      onCellValueChanged={onCellValueChanged}
                      // 체크박스 시
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: false,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '√',
                        width: 30,
                      }}
                      // 행추가 된 rowCell
                      getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                      onGridReady={(params) => {
                        gridApiRef.current = params.api;
                      }}
                    />
                  </div>
                </Grow>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
        mainFoot={
          <MainBottom className="border-none!">
            <MainBottomItem>
              <Grow gap={1}></Grow>
              <Grow gap={1}>
                <Button variant={'contained'} size={'xl'} color={'gray-light'}>
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
