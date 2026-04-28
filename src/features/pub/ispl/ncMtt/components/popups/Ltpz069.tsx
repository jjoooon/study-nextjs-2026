'use client';

import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { ResetIcon } from '@icons';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

import '@/shared/lib/agGridPub';
import { Input } from '@/shared/components/uiux/Input';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';

type LTPZ069TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: LTPZ069TabType[] = [
  {
    name: '알릴사항',
    value: 'tab1',
    label: '알릴사항',
  },
  {
    name: '변경대비표',
    value: 'tab2',
    label: '변경대비표',
  },
];

// dummy data1
type DummyDataType1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};

const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field01: '1',
    field02: '김한화',
    field03: '900101',
    field04: '남',
    field05: '본인',
  },
  {
    id: 2,
    field01: '2',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
  },
  {
    id: 3,
    field01: '3',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
  },
];

// dummy data2
type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '1',
    field02: 'LA260303352622',
    field03: '계약',
    field04: '0000',
    field05: '김한화',
    field06: '정상',
    field07: '2026-01-01',
  },
  {
    id: 2,
    field01: '2',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
  {
    id: 3,
    field01: '3',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
  },
];

// tab1_1 dummy data
type DummyDataType1T1 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};

const DummyData1T1: DummyDataType1T1[] = [
  {
    id: 1,
    field01: '1',
    field02: '최근3개월검진여부',
    field03: '예',
    field04: '',
  },
  {
    id: 2,
    field01: '2',
    field02: '최근3개월내약물복용 최근3개월검진여부 최근3개월검진여부 최근3개월검진여부 최근3개월검진여부',
    field03: '아니오',
    field04: '',
  },
  {
    id: 3,
    field01: '3',
    field02: '병명',
    field03: '',
    field04: '척추염좌 척추염좌 척추염좌 척추염좌 척추염좌 척추염좌 척추염좌 척추염좌 척추염좌 척추염좌 척추염좌',
  },
  {
    id: 4,
    field01: '4',
    field02: '치료기간',
    field03: '',
    field04: '25년 12월',
  },
];

// tab2_1 dummy data
type DummyDataType1T2 = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};

const DummyData1T2: DummyDataType1T2[] = [
  {
    id: 1,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
  },
];

export const Ltpz069 = ({ open, onOpenChange }: PopupBaseProps) => {
  const columnDefs1 = React.useMemo<ColDef<DummyDataType1>[]>(
    () => [
      {
        headerName: '',
        field: 'field01',
        width: 40,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '성명',
        field: 'field02',
        width: 70,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '생년월일',
        field: 'field03',
        width: 100,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '성별',
        field: 'field04',
        width: 80,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '관계',
        field: 'field05',
        flex: 1,
        autoHeight: true,
        editable: false,
      },
    ],
    []
  );
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '',
        field: 'field01',
        width: 40,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '설계번호',
        field: 'field02',
        width: 110,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '구분',
        field: 'field03',
        width: 60,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '변경순번',
        field: 'field04',
        width: 90,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '피보험자',
        field: 'field05',
        flex: 1,
        autoHeight: true,
        editable: false,
        className: 'truncate text-center',
      },
      {
        headerName: '상태',
        field: 'field06',
        width: 60,
        autoHeight: true,
        editable: false,
        className: 'truncate text-center',
      },
      {
        headerName: '등록일자',
        field: 'field07',
        flex: 1,
        autoHeight: true,
        editable: false,
        className: 'truncate text-center',
      },
    ],
    []
  );
  const columnDefs1T1 = React.useMemo<ColDef<DummyDataType1T1>[]>(
    () => [
      {
        headerName: '',
        field: 'field01',
        width: 50,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '질문항목',
        field: 'field02',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: "text-left",
        tooltipValueGetter: createTooltipValueGetter<DummyDataType1T1>({ field: 'field02' }),
      },
      {
        headerName: '질문답변',
        field: 'field03',
        width: 100,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '담변세부사항',
        field: 'field04',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: "text-left",
        tooltipValueGetter: createTooltipValueGetter<DummyDataType1T1>({ field: 'field04' }),
      },
    ],
    []
  );
  const columnDefs1T2 = React.useMemo<ColDef<DummyDataType1T2>[]>(
    () => [
      {
        headerName: '',
        field: 'field01',
        width: 50,
        autoHeight: true,
        editable: false,
      },
      {
        headerName: '구분',
        field: 'field02',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: "text-left",
        tooltipValueGetter: createTooltipValueGetter<DummyDataType1T1>({ field: 'field02' }),
      },
      {
        headerName: '변경전',
        field: 'field03',
        width: 100,
        autoHeight: true,
        editable: false,
        children: [
          {
            headerName: '지상(층)',
            field: 'aboveGroundFloors',
            width: 60,
            cellClass: 'text-center',
          },
        ]
      },
      {
        headerName: '변경후',
        field: 'field04',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: "text-left",
        tooltipValueGetter: createTooltipValueGetter<DummyDataType1T1>({ field: 'field04' }),
      },
    ],
    []
  );

  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  // const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  // const { tabs: subTabs, active: subActive, setActive: setSubActive } = useTabs(DATA_SUB_TABS);
  const [policySearchPart, setPolicySearchPart] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              알릴사항 변경조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz069)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwe" className="w-full" variant="box-round" gap={5}>
            <FormTable
              variant="head"
              caption="피보험자 목록 정보 테이블"
              cols={['w-[5rem]', 'w-auto', 'w-[5rem]', 'w-auto']}
            >
              <FormRow>
                <FormCell title="설계번호">
                  <Input placeholder="LA260303352622" width={130} readOnly />
                </FormCell>
                <FormCell title="증권번호">
                  <Input placeholder="LA260303352622" width={130} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
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
          <Grow placement={'bws'} className="w-full" gap={5}>
            <TableFold>
              <TableFoldHead title="피보험자 선택" variant="default">
                <Input placeholder="" width={130} size={'md'} />
                <Button color="gray" size={'md'} variant="outlined">찾기</Button>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine min-h-[18.4rem]">
                  <AgGridReact<DummyDataType1>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData1}
                    columnDefs={columnDefs1}
                    defaultColDef={{
                      suppressMovable: true,
                    }}
                    domLayout="normal"
                    className="text-center"
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="변경이력 선택" variant="default" />
              <TableFoldBody>
                <div className="ag-theme-alpine w-full min-h-[18.4rem]">
                  <AgGridReact<DummyDataType2>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={DummyData2}
                    columnDefs={columnDefs2}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    animateRows={false}
                    domLayout="normal"
                    className="text-center"
                  />
                </div>
              </TableFoldBody>
            </TableFold>
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
                  <div className="ag-theme-alpine w-full">
                    <AgGridReact<DummyDataType1T1>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData1T1}
                      columnDefs={columnDefs1T1}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      animateRows={false}
                      domLayout="autoHeight"
                      className="text-center"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                </Gcol>
              </>
            ) : (
              <Gcol placement="ss" className="w-full pt-2" gap={5}>
                  <Grow placement={'bws'} className="w-full" gap={5}>
                    <div className="ag-theme-alpine w-full">
                      <AgGridReact<DummyDataType1T2>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData1T2}
                        columnDefs={columnDefs1T2}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        animateRows={false}
                        domLayout="autoHeight"
                        className="text-center"
                        enableCellSpan={true}
                      />
                    </div>
                  </Grow>
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
