/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import type { ColDef, GridApi } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ArrowDoubleIcon, ResetIcon, SearchIcon, ZoomOutIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

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

type DummyDataType2 = {
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
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '999,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '999,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '999,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 5,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '999,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 6,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '999,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 7,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '999,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
];

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'LA123456789012',
    field02: '',
    field03: '김한화',
    field04: '2026-08-25',
    field05: '199,000',
    field06:
      '한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604 한화 건강쑥쑥 어린이보험 무배당2604',
    field07: '설계중',
  },
];

const Ltpz206 = () => {
  const [dueMonth, setDueMonth] = React.useState('2026-08');
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '설계번호',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(120),
        cellClass: 'text-center',
      },
      {
        headerName: '증권번호',
        field: 'field02',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        cellClass: 'text-center',
      },
      {
        headerName: '계약자',
        field: 'field03',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '보험시기',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '보험료',
        field: 'field05',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
      },
      {
        headerName: '상품명',
        field: 'field06',
        flex: 10,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field06' }),
      },
      {
        headerName: '상태',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '설계번호',
        field: 'field01',
        flex: 1,
        minWidth: attributeColumnWidth(120),
        cellClass: 'text-center',
      },
      {
        headerName: '증권번호',
        field: 'field02',
        flex: 1,
        minWidth: attributeColumnWidth(130),
        cellClass: 'text-center',
      },
      {
        headerName: '계약자',
        field: 'field03',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '보험시기',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '보험료',
        field: 'field05',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
      },
      {
        headerName: '상품명',
        field: 'field06',
        flex: 10,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field06' }),
      },
      {
        headerName: '상태',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(DummyData2);

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  // 두번째 agGrid 행삭제
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

    setRowData2((prev) => prev.filter((row) => !selectedIds.has(row.id)));
  }, []);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              다태아 설계연계관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ206)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_minmax(0,1fr)] gap-3">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable variant={'head'} lineTop={false}>
              <FormRow>
                <FormCell title={'보종군'}>
                  <NativeSelect aria-label="항목 선택" width={100} required>
                    {[{ value: 'selection', label: '공통' }].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'유형'}>
                  <NativeSelect aria-label="유형 선택" width={100} required>
                    {[
                      { value: 'selection', label: '선택' },
                      { value: 'selection2', label: '모집자실명제준수 예외' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <NativeSelect aria-label="유형 선택" width={100} required>
                    {[
                      { value: 'selection', label: '선택' },
                      { value: 'selection2', label: '모집자실명제준수 예외' },
                    ].map((option) => (
                      <NativeSelectOption key={option.value} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>

                <FormCell title={'임산부 정보'}>
                  <Input aria-label="" width={100} value={'김한화'} required />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input aria-label="" width={120} value={'000000-0******'} readOnly />
                </FormCell>
                <FormCell title={'출산예정년월'}>
                  <DatePickerInput
                    required
                    mode={'single'}
                    value={dueMonth}
                    monthOnly={true}
                    onChange={(_, formatted) => setDueMonth(formatted)}
                    onMonthSelect={(month) => console.log(month)}
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
          <Gcol placement="ss">
            <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
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
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
                domLayout="normal"
                onGridReady={(params) => {
                  params.api.forEachNode((node) => {
                    if (node.data?.isCheck) {
                      node.setSelected(true);
                    }
                  });
                }}
              />
            </div>
            <Gcol variant={'box-info'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} icon={'info'} weight={'bold'}>
                등록사항을 확인하여 주십시오
              </Typo>
              <BulletList>
                <BulletListItem size={'sm'} type={'dash'}>
                  설계번호(LA123123123) - 설계중
                </BulletListItem>
              </BulletList>
            </Gcol>
            <Grow className="w-full py-1">
              <Button color="primary" onClick={() => {}} only="icon" size="lg" variant="outlined">
                <ArrowDoubleIcon />
              </Button>
            </Grow>

            <TableFold className="h-full grid-rows-[auto_minmax(0,1fr)] overflow-y-hidden">
              <TableFoldHead title="선택설계">
                <Grow>
                  <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
                    행삭제
                    <ZoomOutIcon size={14} color={'var(--color-gray-60)'} />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
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
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                    domLayout="normal"
                    onGridReady={(params) => {
                      gridApiRef.current = params.api;
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
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

export default Ltpz206;
