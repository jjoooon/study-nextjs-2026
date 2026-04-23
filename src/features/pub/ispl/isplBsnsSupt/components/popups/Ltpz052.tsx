'use client';

// React
import {
  AgGridEmptyComponent,
  GridHeaderCheckbox,
  createHeaderCheckboxParams,
  createHeaderCheckboxOnCellValueChanged,
  editableSelectCellRenderer,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';

import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
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
import type {
  ColDef,
  ColGroupDef,
  EditableCallbackParams,
  GridApi,
  ICellRendererParams,
  SuppressKeyboardEventParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback } from 'react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isCheck: boolean;
  isAuthcheck1: boolean;
  isAuthcheck2: boolean;
  isNew: boolean;
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
    isCheck: true,
    isNew: false,
    isAuthcheck1: true,
    isAuthcheck2: true,
    field01: '12312312',
    field02: '911212-1111111',
    field03: '010-1234-5678',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 2,
    isCheck: true,
    isNew: false,
    isAuthcheck1: true,
    isAuthcheck2: true,
    field01: '12312312',
    field02: '911212-1111111',
    field03: '010-1234-5678',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
];

export const Ltpz052 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [policySearchPart, setPolicySearchPart] = React.useState('');

  // 새로 추가한 행만 편집 가능
  const isEditableNewRow = React.useCallback(
    (params: EditableCallbackParams<DummyDataType>) => params.data?.isNew === true,
    []
  );
  // const existingRowFieldRenderer = React.useMemo(
  //   () => createFieldRenderer<DummyDataType>('field02', 'field03', 'row'),
  //   []
  // );

  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<DummyDataType>) =>
        editableSelectCellRenderer<DummyDataType>({ ...params, align }),
    []
  );

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const onCellValueChanged = React.useMemo(
    () => createHeaderCheckboxOnCellValueChanged<DummyDataType>(['isAuthcheck1', 'isAuthcheck2']),
    []
  );
  const suppressGridKeyboardOnInput = (params: SuppressKeyboardEventParams<DummyDataType>) =>
    params.event?.target instanceof HTMLInputElement;

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

  // agGrid 행추가
  const handleAddRow = React.useCallback(() => {
    const nextId = rowData.reduce((maxId, row) => Math.max(maxId, row.id), 0) + 1;
    const newRow: DummyDataType = {
      id: nextId,
      isCheck: false,
      isAuthcheck1: false,
      isAuthcheck2: false,
      isNew: true,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
      field06: '',
      field07: '',
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

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: 80,
      field: 'id',
      cellClass: 'text-center px-0!',
      autoHeight: true,
    },
    {
      headerName: '인증방법',
      children: [
        {
          headerName: '동의서',
          width: 100,
          editable: true,
          field: 'isAuthcheck1',
          cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
          cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
          cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
          suppressKeyboardEvent: suppressGridKeyboardOnInput,
          headerComponent: GridHeaderCheckbox,
          headerComponentParams: createHeaderCheckboxParams(gridApiRef, 'isAuthcheck1'),
        },
        {
          headerName: '모바일',
          width: 100,
          editable: true,
          field: 'isAuthcheck2',
          headerClass: 'border-r-0!',
          cellClass: (params) =>
            isEditableNewRow(params) ? 'text-center editable-cell border-r-0!' : 'text-center border-r-0!',
          cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
          cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
          suppressKeyboardEvent: suppressGridKeyboardOnInput,
          headerComponent: GridHeaderCheckbox,
          headerComponentParams: createHeaderCheckboxParams(gridApiRef, 'isAuthcheck2'),
        },
      ],
    },
    {
      headerName: '고객명',
      flex: 1,
      minWidth: 240,
      field: 'field01',
      headerClass: 'border-l border-[#d4d4d5]',
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      editable: true,
      suppressNavigable: true,
      suppressKeyboardEvent: suppressGridKeyboardOnInput,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <Grow className="w-full h-full flex items-center justify-center px-2 border-l border-[#d4d4d5]">
            <div
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onDoubleClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => event.stopPropagation()}
              className="w-full h-full flex items-center justify-center gap-1"
            >
              <div className="w-[16rem] min-w-[16rem] max-w-[16rem] shrink-0">
                <Input
                  aria-label=""
                  width={'full'}
                  value={String(params.value ?? '')}
                  onChange={(event) => {
                    const value = event.target.value;
                    params.node.setDataValue('field01', value);
                  }}
                />
              </div>
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </div>
          </Grow>
        );
      },
    },
    {
      headerName: '주민번호',
      flex: 1,
      field: 'field02',
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '전화번호',
      flex: 1,
      field: 'field03',
      cellClass: (params) => (isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center'),
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        if (params.data?.isNew) {
          return expiryCellRenderer('center')(params);
        }
        // 신규
        return params.value;
      },
    },
    {
      headerName: '출력/발송 결과',
      children: [
        {
          headerName: '동의서',
          flex: 1,
          field: 'field04',
          cellClass: (params) =>
            isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center' + 'px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
            if (params.data?.isNew) {
              return expiryCellRenderer('center')(params);
            }
            // 신규
            return params.value;
          },
        },
        {
          headerName: '모바일',
          flex: 1,
          field: 'field05',
          cellClass: (params) =>
            isEditableNewRow(params) ? 'text-center editable-cell' : 'text-center' + 'px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
            if (params.data?.isNew) {
              return expiryCellRenderer('center')(params);
            }
            // 신규
            return params.value;
          },
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              일괄 가입설계동의 관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ052)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="취급자 정보" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'취급자 사번'} className="w-full">
                  <Grow>
                    <Input
                      aria-label="취급자 사번 검색"
                      width={'10rem'}
                      value={policySearchPart}
                      onChange={(e) => setPolicySearchPart(e.target.value)}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={'10rem'} value={'김한화'} readOnly />
                  </Grow>
                </FormCell>
                <FormCell title={'취급자 연락처'} className="w-full">
                  <Grow>
                    <Input aria-label="" width={'6rem'} value={'123'} />-
                    <Input aria-label="" width={'6rem'} value={'1234'} />-
                    <Input aria-label="" width={'6rem'} value={'1234'} />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <TableFold variant="accordion" className="grid-rows-[auto_1fr] gap-2.5">
            <TableFoldHead title="고객정보">
              {/* M1. onClick 추가 */}
              <Grow>
                <Button variant={'outlined'} color={'gray'} onClick={handleAddRow}>
                  행추가
                </Button>
                <Button variant={'outlined'} color={'gray'} onClick={handleDeleteRow}>
                  행삭제
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[18.4rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  domLayout="normal"
                  onCellValueChanged={onCellValueChanged}
                  // 체크박스 시
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: true,
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  // 행추가 된 rowCell
                  getRowClass={(params) => (params.data?.isNew ? 'ag-row-new' : '')}
                  onGridReady={(params) => {
                    gridApiRef.current = params.api;
                  }}
                />
              </div>
            </TableFoldBody>
          </TableFold>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              <b>주의사항</b>
            </Typo>
            <BulletList color={'warning'} size="sm">
              <BulletListItem>
                <em>단체보험 등 다수의 고객에게 동의</em>
                <b>를</b> 받아야 하는 경우 사용하는 화면입니다.
              </BulletListItem>
              <BulletListItem>
                <b>인증방법별 주민등록번호(동의서), 휴대전화번호(모바일)</b> <em>필수</em>입니다.
              </BulletListItem>
              <BulletListItem>
                <b>모바일 동의는 당사 홈페이지 주소가 휴대폰 문자로 전송</b>되며,{' '}
                <em>고객이 링크를 연결하여 직접 인증</em>하는 방식입니다. <em>(LMS인증과 다름)</em>
              </BulletListItem>
              <BulletListItem>
                <b>모바일 동의는</b> <em>본인명의 핸드폰 일 때만 인증가능</em>합니다.
              </BulletListItem>
              <BulletListItem>
                <em>카카오톡 미설치 고객의</em> 경우 카카오톡 알림톡 대신 <em>문자로 URL이 전송</em>됩니다.
              </BulletListItem>
              <BulletListItem>
                LMS문자동의는 이 화면에서 불가하오니 <b>개별 동의</b>를 받으시기 바랍니다.{' '}
                <em>(인증번호 적용으로 불가)</em>
              </BulletListItem>
              <BulletListItem>
                <b>엑셀 업로드를</b> 통해서 <b>한꺼번에 여러 고객의 정보를 화면에 적용</b>가능합니다.{' '}
                <em>(인증방법은 한가지에만 &apos;1&apos;로 표시하셔야 업로드 시 오류가 나지 않습니다.)</em>
              </BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                엑셀가져오기
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                엑셀양식받기
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                출력/발송
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
