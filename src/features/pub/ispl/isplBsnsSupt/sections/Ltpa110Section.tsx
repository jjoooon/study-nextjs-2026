'use client';

import type { ColDef, EditableCallbackParams, GridApi, ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import { AgGridEmptyComponent, createFieldRenderer, DatePickerCellEditor, useAgGridInfiniteAppend } from '@aggrid';
import { Gcol, Grid, Grow } from '@atoms';
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
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
];

export default function Ltpa110Section() {
  
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '체크단계',
      field: 'field01',
      width: 90,
      cellClass: 'text-center',
    },
    
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);


  // 첫번째 agGrid 행삭제
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


  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '다태아 설계연계관리', pageId: 'LTPA110' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'head'}
                lineTop={false}
                caption="다태아 설계연계관리 조회 테이블"
                cols={['w-[8rem]', 'flex-1', 'w-[8rem]', 'flex-1']}
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
                </FormRow>
                <FormRow>
                  <FormCell title={'적용대상'}>
                    <NativeSelect aria-label="적용대상 선택" width={180} required>
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
                      <Button color="gray" variant="outlined" onClick={handleDeleteRow}>
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
                        }}
                        onGridReady={(params) => {
                          gridApiRef.current = params.api;
                        }}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </ResizablePanel>
              <ResizableHandle />
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
