'use client';

import type { ColDef, ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import { AgGridEmptyComponent, createFieldRenderer, DatePickerCellEditor, useAgGridInfiniteAppend } from '@aggrid';
import { Grow, Gcol, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

ModuleRegistry.registerModules([AllCommunityModule]);

// dummy data
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: boolean;
  field09: string | number;
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
  field08: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '청약완료',
    field02: '프로세스 값',
    field03: '범용',
    field04: '적용사항 값',
    field05: '2025-01-30',
    field06: '2025-01-30',
    field07: '강한화',
    field08: true,
    field09: '비고 내용 비고내용',
  },
  {
    id: 2,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '강한화',
    field08: false,
    field09: '',
  },
  {
    id: 3,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '강한화',
    field08: false,
    field09: '',
  },
  {
    id: 4,
    field01: '청약완료',
    field02: '',
    field03: '범용',
    field04: '',
    field05: '',
    field06: '',
    field07: '강한화',
    field08: false,
    field09: '',
  },
];
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: false,
    field01: '',
    field02: '3423554',
    field03: '문형보험대리문형보험대리점문형보험대리점점',
    field04: '2025-01-01',
    field05: '2025-01-30',
    field06: '',
    field07: '비고내용 비고내용비고내용비고내용',
    field08: '김한화',
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
    field08: '김한화',
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
    field08: '김한화',
  },
  {
    id: 4,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '김한화',
  },
  {
    id: 5,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '김한화',
  },
];

export default function Ltpa030Section() {
  function Field02CellEditor(props: ICellEditorParams<DummyDataType>) {
    const [value, setValue] = React.useState<string>(String(props.value ?? ''));

    type CellEditorRef = { getValue: () => string; isCancelAfterEnd: () => boolean };
    type PropsWithRef = ICellEditorParams<DummyDataType> & { forwardedRef?: React.Ref<CellEditorRef> };
    const propsWithRef = props as unknown as PropsWithRef;

    React.useEffect(() => {
      setValue(String(props.value ?? ''));
    }, [props.value]);
    React.useImperativeHandle(
      propsWithRef.forwardedRef,
      () => ({ getValue: () => value, isCancelAfterEnd: () => false }),
      [value]
    );

    return (
      <Grid className="w-full h-full grid-cols-[1fr_1fr] justify-start divide-x divide-gray-200 gap-0">
        <Grow className="px-1 w-full h-full">
          <Input
            aria-label=""
            width={'full'}
            value={value}
            size="sm"
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            aria-label="검색"
            variant={'outlined'}
            only="icon"
            size={'md'}
            color={'gray-light'}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => {
              /* 검색 로직 */
            }}
          >
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
        <div className="w-full truncate min-w-0 px-1">{String(props.data?.field03 ?? '')}</div>
      </Grid>
    );
  }

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '체크단계',
      field: 'field01',
      width: 90,
      cellClass: 'text-center',
    },
    {
      headerName: '신계약프로세스',
      field: 'field02',
      width: 100,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '프로세스 값'] },
    },
    {
      headerName: '판매채널',
      field: 'field03',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '적용사항',
      field: 'field04',
      width: 100,
      editable: true,
      cellClass: 'editable-cell text-center',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '적용사항 값'] },
    },
    {
      headerName: '적용시작일',
      field: 'field05',
      width: 130,
      editable: true,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field05 && String(params.data.field05).trim() !== '' ? String(params.data.field05) : '',
    },
    {
      headerName: '적용종료일',
      field: 'field06',
      width: 130,
      editable: true,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) =>
        params.data?.field06 && String(params.data.field06).trim() !== '' ? String(params.data.field06) : '',
    },
    {
      headerName: '입력자',
      field: 'field07',
      width: 90,
      cellClass: 'text-center',
    },
    {
      headerName: '삭제여부',
      field: 'field08',
      width: 70,
      editable: true,
      cellClass: 'editable-cell',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
    },
    {
      headerName: '비고',
      field: 'field09',
      flex: 1,
      editable: true,
      cellClass: 'editable-cell',
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '구분',
      field: 'field01',
      width: 90,
      editable: true,
      cellClass: 'editable-cell',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '취급직원', '사용인', '설계'] },
    },
    {
      headerName: '대상',
      field: 'field02',
      width: 260,
      autoHeight: true,
      editable: true,
      cellClass: 'editable-cell p-0! text-center field02-cell',
      cellRenderer: createFieldRenderer<DummyDataType2>(
        'field02',
        (data?: DummyDataType2) => <div className="w-full truncate min-w-0 px-1">{data?.field03}</div>,
        'row'
      ),
      cellEditor: Field02CellEditor,
    },
    {
      headerName: '적용시작일자',
      field: 'field04',
      width: 130,
      editable: true,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.field04 && String(params.data.field04).trim() !== '' ? String(params.data.field04) : '',
    },
    {
      headerName: '적용종료일자',
      field: 'field05',
      width: 130,
      editable: true,
      cellClass: 'editable-cell text-center',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) =>
        params.data?.field05 && String(params.data.field05).trim() !== '' ? String(params.data.field05) : '',
    },
    {
      headerName: '상태',
      field: 'field06',
      width: 90,
      editable: true,
      cellClass: 'editable-cell',
      autoHeight: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '정상', '고객환불', '조치완료', '취소'] },
    },
    {
      headerName: '비고',
      field: 'field07',
      flex: 1,
      editable: true,
      cellClass: 'editable-cell',
    },
    {
      headerName: '등록자',
      field: 'field08',
      width: 80,
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(DummyData2);

  const pageSize = 4;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: DummyData2,
    pageSize,
  });

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '신계약기준관리', pageId: 'LTPA030' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'head'}
                lineTop={false}
                caption="장기신계약 조회 테이블"
                cols={['w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1']}
              >
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
                  <FormCell title={'적용사항'}>
                    <NativeSelect aria-label="적용사항 선택" width={120} required>
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
                  <FormCell title={'적용대상'}>
                    <NativeSelect aria-label="적용대상 선택" width={120} required>
                      {[
                        { value: 'selection', label: '선택' },
                        { value: 'selection2', label: '모집자실명제준수 예외' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input aria-label="" width={100} value={'1234567'} readOnly />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={100} value={'김한화'} readOnly />
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
            <ResizablePanelGroup orientation="vertical" className="w-full h-full">
              <ResizablePanel defaultSize={30}>
                <TableFold className="h-full">
                  <TableFoldHead title="기본사항">
                    <Grow>
                      (<Checkbox>삭제건포함</Checkbox>)
                      <Button color="gray" variant="outlined">
                        행추가
                      </Button>
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[18.4rem]">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableCellSpan={true}
                        singleClickEdit={true}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={70}>
                <TableFold className="h-full">
                  <TableFoldHead title="추가 등록사항(수납후스캔)">
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
                    <Gcol>
                      <div className="ag-theme-alpine min-h-[18.4rem]">
                        <AgGridReact<DummyDataType2>
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          domLayout="normal"
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
                            headerName: '√',
                            width: 30,
                          }}
                          onGridReady={(params) => {
                            params.api.forEachNode((node) => {
                              if (node.data?.isCheck) {
                                node.setSelected(true);
                              }
                            });
                          }}
                          onCellValueChanged={(params) => {
                            const field = params.colDef.field;
                            if (!field) return;
                            setRowData2((prev) =>
                              prev.map((row) =>
                                row.id === params.data.id ? { ...row, [field]: params.newValue } : row
                              )
                            );
                          }}
                        />
                      </div>
                      <TableMore
                        loadedCount={loadedCount}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        onLoadAll={handleLoadAll}
                        onLoadNext={handleLoadNext}
                      />
                    </Gcol>
                  </TableFoldBody>
                </TableFold>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
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
