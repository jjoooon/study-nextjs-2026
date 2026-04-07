'use client';
// 허승하

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { Badge } from '@/shared/components/uiux/Badge';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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

export const LTPZ030 = ({ open, onOpenChange }: PopupBaseProps) => {
  type LTPZ030TabType = {
    name: string;
    value: string;
    label: string;
  };

  const DATA_TABS: LTPZ030TabType[] = [
    {
      name: '간편고지유형 사전체크',
      value: 'tab1',
      label: '간편고지유형 사전체크',
    },
    {
      name: '일반/건강고지유형 사전체크',
      value: 'tab2',
      label: '일반/건강고지유형 사전체크',
    },
  ];

  // tab1_1 dummy data
  type DummyDataType1T1 = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
  };
  const DummyData1T1: DummyDataType1T1[] = [
    {
      id: 1,
      field01: '더경증',
      field02: '3105',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737,1',
    },
    {
      id: 2,
      field01: '더경증',
      field02: '385',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737,1',
    },
    {
      id: 3,
      field01: '더경증',
      field02: '365',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737',
    },
    {
      id: 4,
      field01: '3N5',
      field02: '355',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737',
    },
    {
      id: 5,
      field01: '3N5',
      field02: '345',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737',
    },
    {
      id: 6,
      field01: '3N5(2일)',
      field02: '355(2일)',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737',
    },
    {
      id: 7,
      field01: '3N5(2일)',
      field02: '345(2일)',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737',
    },
    {
      id: 8,
      field01: '3N5(2일)',
      field02: '335(2일)',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737,1152,1737',
    },
    {
      id: 9,
      field01: '3N5(2일)',
      field02: '325(2일)',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737',
    },
    {
      id: 10,
      field01: '3N5(2일)',
      field02: '315(2일)',
      field03: '',
      field04: '',
      field05: '경증외, 중대질환 1148,1737',
    },
  ];
  const columnDefs1T1 = React.useMemo<ColDef<DummyDataType1T1>[]>(
    () => [
      {
        headerName: '분류',
        field: 'field01',
        width: 100,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '고지유형',
        field: 'field02',
        width: 120,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '가능여부',
        field: 'field03',
        width: 150,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '제한담보',
        field: 'field04',
        width: 160,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '비고',
        field: 'field05',
        flex: 1,
        autoHeight: true,
        editable: false,
        className: 'truncate',
      },
    ],
    []
  );

  // tab1_2 dummy data
  type DummyDataType1T2 = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
  };
  const DummyData1T2: DummyDataType1T2[] = [
    {
      id: 1,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
    },
    {
      id: 2,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
    },
  ];
  const columnDefs1T2 = React.useMemo<ColDef<DummyDataType1T2>[]>(
    () => [
      {
        headerName: '분류',
        field: 'field01',
        width: 100,
        autoHeight: true,
        editable: false,
        // cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '고지유형',
        field: 'field02',
        width: 120,
        autoHeight: true,
        editable: false,
        cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '가능여부',
        field: 'field03',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'flex! items-center! justify-center! text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '제한담보',
        field: 'field04',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'flex! items-center! justify-center! text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '비고',
        field: 'field05',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'flex! items-center! justify-center! text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
    ],
    []
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
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고지유형 추천(LTPZ030)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ030)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
            <FormTable
              variant={'none'}
              caption="납입예정 리스트 테이블"
              cols={[
                'w-[5rem]',
                'flex-1',
                'w-[5rem]',
                'flex-1',
                'w-[13rem]',
                'flex-1',
                'w-[5rem]',
                'flex-1',
                'w-[5rem]',
                'flex-1',
                'w-[10.3rem]',
                'flex-1',
              ]}
            >
              <FormRow>
                <FormCell title={'피보험자'}>
                  <Typo tag={'strong'} className="body-md font-bold">
                    김*화
                  </Typo>
                </FormCell>
                <FormCell title={'기준일자'}>
                  <Typo tag={'strong'} className="body-md font-bold">
                    YYYY-MM-DD
                  </Typo>
                </FormCell>
                <FormCell title={'지급정보 조회기간'}>
                  <Typo tag={'strong'} className="body-md font-bold">
                    YY년
                  </Typo>
                </FormCell>
                <FormCell title={'고혈압'}>
                  <Badge color="blue" size="md" variant="contained">
                    가능
                  </Badge>
                </FormCell>
                <FormCell title={'당뇨'}>
                  <Badge color="blue" size="md" variant="contained">
                    가능
                  </Badge>
                </FormCell>
                <FormCell title={'고혈압&당뇨'}>
                  <Badge color="blue" size="md" variant="contained">
                    가능
                  </Badge>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

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
                    <TableFoldHead title="" />
                    <TableFoldBody>
                      <Grow className="w-full" gap={5}>
                        <div className="ag-theme-alpine w-full">
                          <AgGridReact<DummyDataType1T1>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyData1T1}
                            columnDefs={columnDefs1T1}
                            defaultColDef={{
                              sortable: false,
                              resizable: false,
                            }}
                            animateRows={false}
                            domLayout="autoHeight"
                            className="text-center"
                            enableCellSpan={true}
                          />
                        </div>
                        <div className="ag-theme-alpine w-full">
                          <AgGridReact<DummyDataType1T2>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyData1T2}
                            columnDefs={columnDefs1T2}
                            defaultColDef={{
                              sortable: false,
                              resizable: false,
                            }}
                            animateRows={false}
                            domLayout="autoHeight"
                          />
                        </div>
                      </Grow>
                    </TableFoldBody>
                  </TableFold>
                </Gcol>
              </>
            ) : (
              <Gcol placement="ss" className="w-full h-full pt-2" gap={5}>
                <TableFold>
                  <TableFoldHead title="담보" />
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
