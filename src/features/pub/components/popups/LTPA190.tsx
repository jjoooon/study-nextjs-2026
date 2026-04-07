'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, createCellValueChangedHandler, DatePickerCellEditor } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon } from '@icons';
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

import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import type { PopupBaseProps } from './types';
ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA190 = ({ open, onOpenChange }: PopupBaseProps) => {
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
    field08: string | number;
    field09: string | number;
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
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

  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field01',
      flex: 1,
      editable: false,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '신계약프로세스',
      field: 'field02',
      flex: 2,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
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
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '선택2'] },
    },
    {
      headerName: '적용시작일',
      field: 'field05',
      width: 130,
      editable: true, // 날짜 직접 입력 가능
      cellClass: 'text-center',
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '적용종료일',
      field: 'field06',
      width: 130,
      editable: true, // 날짜 직접 입력 가능
      cellClass: 'text-center',
      cellEditor: DatePickerCellEditor,
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
      editable: true,
    },
    {
      headerName: '비고',
      field: 'field09',
      flex: 1.5,
      editable: true,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>([]);

  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              장기신계약채널별기준관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA190)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'none'}
              lineTop={false}
              caption="장기신계약 조회 테이블"
              cols={['w-[9rem]', 'flex-1', 'w-[9rem]', 'flex-1', 'w-[9rem]', 'flex-1']}
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
                    width={'15rem'}
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
                    size="md"
                    width="sm"
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
            <TableFoldHead title="등록사항"></TableFoldHead>
            <TableFoldBody>
              <Grow className="w-full">
                <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
                  <AgGridReact<DummyDataType>
                    // getRowId 적용: id 필드를 고유 식별자로 사용
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    domLayout="autoHeight"
                    alwaysShowHorizontalScroll={true}
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
                    }}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
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
