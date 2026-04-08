'use client';
// 허승하

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TabPager } from '@common/TabPager';
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

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz032 = ({ open, onOpenChange }: PopupBaseProps) => {
  type Ltpz032TabType = {
    name: string;
    value: string;
    label: string;
  };

  const DATA_TABS: Ltpz032TabType[] = [
    {
      name: '설계번호별',
      value: 'tab1',
      label: '설계번호별',
    },
    {
      name: '질병별',
      value: 'tab2',
      label: '질병별',
    },
  ];

  // tab1-1 dummy data
  type DummyDataType11 = {
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
    field11: string | number;
    field12: string | number;
    field13: string | number;
    field14: string | number;
    field15: string | number;
    field16: string | number;
    field17: string | number;
    field18: string | number;
    field19: string | number;
    field20: string | number;
    field21: string | number;
    field22: string | number;
    field23: string | number;
    field24: string | number;
    field25: string | number;
    field26: string | number;
    field27: string | number;
    field28: string | number;
    field29: string | number;
    field30: string | number;
    field31: string | number;
    field32: string | number;
    field33: string | number;
    field34: string | number;
    field35: string | number;
    field36: string | number;
  };
  const DummyData11: DummyDataType11[] = [
    {
      id: 1,
      field01: '',
      field02: '2026-01-01',
      field03: 'LA260204310842',
      field04: '한화 더건강한 한아름종합보험2601',
      field05: '납입면제형, 기본형',
      field06: '보기',
      field07: '척추염좌',
      field08: '자궁근종',
      field09: '',
      field10: '',
      field11: '',
      field12: '',
      field13: '',
      field14: '',
      field15: '',
      field16: '',
      field17: '',
      field18: '',
      field19: '',
      field20: '',
      field21: '',
      field22: '',
      field23: '',
      field24: '',
      field25: '',
      field26: '',
      field27: '',
      field28: '',
      field29: '',
      field30: '',
      field31: '',
      field32: '',
      field33: '',
      field34: '',
      field35: '',
      field36: '',
    },
  ];
  const [selectedRowId11, setSelectedRowId11] = React.useState<string>(String(DummyData11[0]?.id ?? ''));

  const selectionRenderer11 = React.useCallback(
    (params: ICellRendererParams<DummyDataType11>) => {
      if (!params.data) {
        return null;
      }

      const rowId = String(params.data.id);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <input
            aria-label={`설계번호 ${rowId} 선택`}
            checked={selectedRowId11 === rowId}
            className="h-[1.6rem] w-[1.6rem] cursor-pointer accent-[var(--color-primary-50)]"
            name="ltpz032-selection"
            onChange={() => setSelectedRowId11(rowId)}
            type="radio"
          />
        </div>
      );
    },
    [selectedRowId11, setSelectedRowId11]
  );

  const columnDefs11 = React.useMemo<ColDef<DummyDataType11>[]>(
    () => [
      {
        headerName: '선택',
        field: 'field01',
        width: 80,
        autoHeight: true,
        editable: false,
        cellRenderer: selectionRenderer11,
      },
      {
        headerName: '입력일자',
        field: 'field02',
        width: 110,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '설계번호',
        field: 'field03',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '상품명',
        field: 'field04',
        width: 200,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '고지유형',
        field: 'field05',
        width: 140,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병미리보기',
        field: 'field06',
        width: 120,
        autoHeight: true,
        editable: false,
        // cellRenderer: attributeRenderer,
        cellRenderer: (_params: ICellRendererParams<DummyDataType11>) => (
          <Grow className="w-full px-1">
            보기
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
        ),
      },
      {
        headerName: '질병명1',
        field: 'field07',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명2',
        field: 'field08',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명3',
        field: 'field09',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명4',
        field: 'field10',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명5',
        field: 'field11',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명6',
        field: 'field12',
        width: 160,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명7',
        field: 'field13',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명8',
        field: 'field14',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명9',
        field: 'field15',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명10',
        field: 'field16',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명11',
        field: 'field17',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명12',
        field: 'field18',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명13',
        field: 'field19',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명14',
        field: 'field20',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명15',
        field: 'field21',
        width: 200,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명16',
        field: 'field22',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명17',
        field: 'field23',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명18',
        field: 'field24',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명19',
        field: 'field25',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명20',
        field: 'field26',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명21',
        field: 'field27',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명22',
        field: 'field28',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명23',
        field: 'field29',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명24',
        field: 'field30',
        width: 220,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명25',
        field: 'field31',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명26',
        field: 'field32',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명27',
        field: 'field33',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명28',
        field: 'field34',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명29',
        field: 'field35',
        width: 220,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명30',
        field: 'field36',
        width: 130,
        autoHeight: true,
        editable: false,
      },
    ],
    [selectionRenderer11]
  );

  // Tab1-2
  type DummyDataType12 = {
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
    field11: string | number;
    field12: string | number;
    field13: string | number;
    field14: string | number;
    field15: string | number;
    field16: string | number;
    field17: string | number;
    field18: string | number;
    field19: string | number;
    field20: string | number;
    field21: string | number;
    field22: string | number;
    field23: string | number;
    field24: string | number;
    field25: string | number;
    field26: string | number;
    field27: string | number;
    field28: string | number;
    field29: string | number;
    field30: string | number;
    field31: string | number;
    field32: string | number;
    field33: string | number;
    field34: string | number;
    field35: string | number;
    field36: string | number;
  };

  const DummyData12: DummyDataType12[] = [
    {
      id: 1,
      field01: '',
      field02: '2026-01-01',
      field03: 'LA260204310842',
      field04: '한화 더건강한 한아름종합보험2601',
      field05: '납입면제형, 기본형',
      field06: '보기',
      field07: '척추염좌',
      field08: '자궁근종',
      field09: '',
      field10: '',
      field11: '',
      field12: '',
      field13: '',
      field14: '',
      field15: '',
      field16: '',
      field17: '',
      field18: '',
      field19: '',
      field20: '',
      field21: '',
      field22: '',
      field23: '',
      field24: '',
      field25: '',
      field26: '',
      field27: '',
      field28: '',
      field29: '',
      field30: '',
      field31: '',
      field32: '',
      field33: '',
      field34: '',
      field35: '',
      field36: '',
    },
  ];
  const [selectedRowId12, setSelectedRowId12] = React.useState<string>(String(DummyData12[0]?.id ?? ''));

  const selectionRenderer12 = React.useCallback(
    (params: ICellRendererParams<DummyDataType12>) => {
      if (!params.data) {
        return null;
      }

      const rowId = String(params.data.id);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <input
            aria-label={`설계번호 ${rowId} 선택`}
            checked={selectedRowId12 === rowId}
            className="h-[1.6rem] w-[1.6rem] cursor-pointer accent-[var(--color-primary-50)]"
            name="ltpz032-selection"
            onChange={() => setSelectedRowId12(rowId)}
            type="radio"
          />
        </div>
      );
    },
    [selectedRowId12, setSelectedRowId12]
  );

  const columnDefs12 = React.useMemo<ColDef<DummyDataType12>[]>(
    () => [
      {
        headerName: '선택',
        field: 'field01',
        width: 80,
        autoHeight: true,
        editable: false,
        cellRenderer: selectionRenderer12,
      },
      {
        headerName: '입력일자',
        field: 'field02',
        width: 110,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '설계번호',
        field: 'field03',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '상품명',
        field: 'field04',
        width: 200,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '고지유형',
        field: 'field05',
        width: 140,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병미리보기',
        field: 'field06',
        width: 120,
        autoHeight: true,
        editable: false,
        // cellRenderer: attributeRenderer,
        cellRenderer: (_params: ICellRendererParams<DummyDataType12>) => (
          <Grow className="w-full px-1">
            보기
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
        ),
      },
      {
        headerName: '질병명1',
        field: 'field07',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명2',
        field: 'field08',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명3',
        field: 'field09',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명4',
        field: 'field10',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명5',
        field: 'field11',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명6',
        field: 'field12',
        width: 160,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명7',
        field: 'field13',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명8',
        field: 'field14',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명9',
        field: 'field15',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명10',
        field: 'field16',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명11',
        field: 'field17',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명12',
        field: 'field18',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명13',
        field: 'field19',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명14',
        field: 'field20',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명15',
        field: 'field21',
        width: 200,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명16',
        field: 'field22',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명17',
        field: 'field23',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명18',
        field: 'field24',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명19',
        field: 'field25',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명20',
        field: 'field26',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명21',
        field: 'field27',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명22',
        field: 'field28',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명23',
        field: 'field29',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명24',
        field: 'field30',
        width: 220,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명25',
        field: 'field31',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명26',
        field: 'field32',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명27',
        field: 'field33',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명28',
        field: 'field34',
        width: 130,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명29',
        field: 'field35',
        width: 220,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질병명30',
        field: 'field36',
        width: 130,
        autoHeight: true,
        editable: false,
      },
    ],
    [selectionRenderer12]
  );
  // tab2 dummy data
  type DummyDataType2 = {
    id: number;
    field2_01: string | number;
    field2_02: string | number;
    field2_03: string | number;
    field2_04: string | number;
  };
  const DummyData2: DummyDataType2[] = [
    {
      id: 1,
      field2_01: '',
      field2_02: '',
      field2_03: '',
      field2_04: '',
    },
    {
      id: 2,
      field2_01: '',
      field2_02: '',
      field2_03: '',
      field2_04: '',
    },
    {
      id: 3,
      field2_01: '',
      field2_02: '',
      field2_03: '',
      field2_04: '',
    },
  ];

  // tab2 AgGrid Column
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '납입회차',
        field: 'field2_01',
        width: 300,
        editable: false,
        autoHeight: true,
        cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '납입_응당일',
        field: 'field2_02',
        flex: 1,
        editable: false,
        autoHeight: true,
        cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '담보코드',
        field: 'field2_03',
        flex: 1,
        editable: false,
        cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '담보보험료',
        field: 'field2_04',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'flex! items-center! justify-center! text-center',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
    ],
    []
  );

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  // const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병입력 가져오기
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz032)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={4}
            variant="default"
            hasTableBelow={true}
            error={false}
            errorMsg="에러 메시지 예시"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {active === 'tab1' ? (
              <>
                <Gcol placement="ss" className="w-full pt-2" gap={5}>
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="일반/건강고지" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full">
                        <AgGridReact<DummyDataType11>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={DummyData11}
                          columnDefs={columnDefs11}
                          defaultColDef={{
                            sortable: false,
                            resizable: false,
                          }}
                          animateRows={false}
                          domLayout="autoHeight"
                          className="text-center"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="간편고지" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full">
                        <AgGridReact<DummyDataType12>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={DummyData12}
                          columnDefs={columnDefs12}
                          defaultColDef={{
                            sortable: false,
                            resizable: false,
                          }}
                          animateRows={false}
                          domLayout="autoHeight"
                          className="text-center"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                </Gcol>
              </>
            ) : (
              <Gcol placement="ss" className="w-full h-full pt-2" gap={5}>
                <TableFold>
                  <TableFoldHead title="일반고지" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine w-full h-[200rem]">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData2}
                        columnDefs={columnDefs2}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                          cellClass: 'p-0',
                          cellStyle: { padding: 0 },
                        }}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="건강고지" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine w-full h-[200rem]">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData2}
                        columnDefs={columnDefs2}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                          cellClass: 'p-0',
                          cellStyle: { padding: 0 },
                        }}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="간편고지" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine w-full h-[200rem]">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData2}
                        columnDefs={columnDefs2}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                          cellClass: 'p-0',
                          cellStyle: { padding: 0 },
                        }}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Gcol>
            )}
          </TabPager>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                질병 가져오기
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
