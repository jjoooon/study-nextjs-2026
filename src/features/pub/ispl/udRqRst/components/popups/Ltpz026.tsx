/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { Grid, Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Badge } from '@uiux/Badge';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import '@/shared/lib/agGridPub';
import { useTabs } from '@/shared/hooks/useTabs';
type Ltpz026TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: Ltpz026TabType[] = [
  {
    name: '김*화 [병력 확인필요]',
    value: 'tab1',
    label: '김*화 [병력 확인필요]',
  },
  {
    name: '피보험자2 [병력 확인필요]',
    value: 'tab2',
    label: '피보험자2 [병력 확인필요]',
  },
  {
    name: '피보험자3 [조건부 대상]',
    value: 'tab3',
    label: '피보험자3 [조건부 대상]',
  },
  {
    name: '피보험자4 [조건부 대상]',
    value: 'tab4',
    label: '피보험자4 [조건부 대상]',
  },
  {
    name: '피보험자5 [조건부 대상]',
    value: 'tab5',
    label: '피보험자5 [조건부 대상]',
  },
  {
    name: '피보험자6 [조건부 대상]',
    value: 'tab6',
    label: '피보험자6 [조건부 대상]',
  },
  {
    name: '피보험자7 [조건부 대상]',
    value: 'tab7',
    label: '피보험자7 [조건부 대상]',
  },
  {
    name: '피보험자8 [조건부 대상]',
    value: 'tab8',
    label: '피보험자8 [조건부 대상]',
  },
  {
    name: '피보험자9 [조건부 대상]',
    value: 'tab9',
    label: '피보험자9 [조건부 대상]',
  },
  {
    name: '피보험자10 [조건부 대상]',
    value: 'tab10',
    label: '피보험자10 [조건부 대상]',
  },
  {
    name: '피보험자11 [조건부 대상]',
    value: 'tab11',
    label: '피보험자11 [조건부 대상]',
  },
  {
    name: '피보험자12 [조건부 대상]',
    value: 'tab12',
    label: '피보험자12 [조건부 대상]',
  },
];

type DummyDataType = {
  id: number;
  isChecked: boolean;
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

type DummyDataTypeT1 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

type DummyDataTypeT2 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

type DummyDataTypeT3 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field01: 'S92',
    field02: '발등골절',
    field03: '2020-09-05',
    field04: '2021-03-08',
    field05: '22(2021-01-08~2021-02-01)',
    field06: '',
    field07: 'Y',
    field08: '미고지',
    field09: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 3,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 4,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 5,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 6,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 7,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 8,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 9,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 10,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 11,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
  {
    id: 12,
    isChecked: false,
    field01: 'M51',
    field02: '추간판장애',
    field03: '2021-03-08',
    field04: '',
    field05: '',
    field06: '3',
    field07: 'N',
    field08: '고지',
    field09: '',
  },
];

const DummyDataT1: DummyDataTypeT1[] = [
  {
    id: 1,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '10000',
  },
  {
    id: 2,
    field01: '보장 보험료50% 납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 3,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 4,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 5,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 6,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 7,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 8,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 9,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 10,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 11,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 12,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 13,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 14,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 15,
    field01: '상해사망추가15',
    field02: '10000',
  },
];

const DummyDataT2: DummyDataTypeT2[] = [
  {
    id: 1,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '10000',
  },
  {
    id: 2,
    field01: '보장 보험료50% 납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
  {
    id: 3,
    field01: '상해사망(체증형)',
    field02: '10000',
  },
  {
    id: 4,
    field01: '상해사망추가',
    field02: '10000',
  },
  {
    id: 5,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '10000',
  },
];

const DummyDataT3: DummyDataTypeT3[] = [
  {
    id: 1,
    field01: '보험료납입면제대상보장(8대사유Ⅱ)',
    field02: '5년 0개월',
  },
  {
    id: 2,
    field01: '보장 보험료50% 납입지원Ⅱ(4대유사암)',
    field02: '5년 0개월',
  },
  {
    id: 3,
    field01: '상해사망(체증형)',
    field02: '5년 0개월',
  },
  {
    id: 4,
    field01: '상해사망추가',
    field02: '5년 0개월',
  },
  {
    id: 5,
    field01: '보장보험료50%납입지원Ⅱ(4대유사암)',
    field02: '5년 0개월',
  },
  {
    id: 6,
    field01: '상해사망(체증형)6',
    field02: '5년 0개월',
  },
  {
    id: 7,
    field01: '상해사망추가7',
    field02: '5년 0개월',
  },
];

const Ltpz026 = () => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '대표질병코드',
      field: 'field01',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field02',
      flex: 2,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '원사고발생일',
      field: 'field03',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '최종사고발생일',
      field: 'field04',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field05',
      width: 180,
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field06',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '수술',
      field: 'field07',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field08',
      width: 90,
      cellClass: 'text-center',
    },
    {
      headerName: '체크',
      field: 'field09',
      flex: 1,
      cellClass: 'text-center',
      cellStyle: (params) => {
        return params.value ? { color: '#006FF2' } : undefined;
      },
    },
  ];

  // AgGrid Column
  const columnDefsT1: ColDef<DummyDataTypeT1>[] = [
    {
      headerName: '제한 담보명',
      field: 'field01',
      flex: 3,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeT1>({ field: 'field01' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field02',
      flex: 1,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefsT2: ColDef<DummyDataTypeT2>[] = [
    {
      headerName: '제한 담보명',
      field: 'field01',
      flex: 3,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeT2>({ field: 'field01' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field02',
      flex: 1,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefsT3: ColDef<DummyDataTypeT3>[] = [
    {
      headerName: '부담보부위명',
      field: 'field01',
      flex: 3,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeT3>({ field: 'field01' }),
    },
    {
      headerName: '기간',
      field: 'field02',
      flex: 1,
      cellClass: 'text-center',
    },
  ];

  const [rowDataT1] = React.useState<DummyDataTypeT1[]>(DummyDataT1);
  const [rowDataT2] = React.useState<DummyDataTypeT2[]>(DummyDataT2);
  const [rowDataT3] = React.useState<DummyDataTypeT3[]>(DummyDataT3);

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              심사콕콕
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz026)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={4}
            variant="default"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={(tab, setActiveTab, setVisibleStart, data, visibleCount) => (
              <Button
                variant="text"
                key={String(tab.value)}
                onClick={() => {
                  setActiveTab(String(tab.value));
                  const currentIndex = data.findIndex((currentTab) => String(currentTab.value) === String(tab.value));
                  if (currentIndex !== -1) {
                    const page = Math.floor(currentIndex / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              >
                {tab.name}
              </Button>
            )}
          >
            {active === 'tab1' ? (
              <Grid placement="ss" className="w-full h-full pt-3 grid-rows-[1fr_auto]" gap={3}>
                <Grid className="grid-rows-[auto_1fr] ">
                  <Grow placement="sc">
                    <Typo tag={'strong'} variant={'heading-md'}>
                      고지콕콕 안내대상
                    </Typo>
                    <Divider />
                    <Badge color="green" variant="contained">
                      {' '}
                      Y
                    </Badge>
                    <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
                      안내 비대상 상품입니다.
                    </Typo>
                  </Grow>
                  <div className="ag-theme-alpine min-h-[15.7rem]">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        cellClass: 'text-center',
                      }}
                      // selection 설정
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: true,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        width: 40,
                        cellClass: 'text-center',
                      }}
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isChecked) {
                            node.setSelected(true);
                          }
                        });
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                </Grid>
                <Grid className="w-full grid-rows-[1fr_auto]" gap={2}>
                  <Grid className="w-full grid-rows-[auto_1fr]">
                    <Grow placement="sc">
                      <Typo tag={'strong'} variant={'heading-md'}>
                        조건콕콕
                      </Typo>
                    </Grow>
                    <Grid gap={3} className="w-full grid-cols-[1fr_1fr_1fr] min-h-[20.7rem]">
                      <Grid className="grid-rows-[auto_1fr]">
                        <Grow placement="sc">
                          <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                            제한 담보
                          </Typo>
                          <Badge color="primary" variant="contained">
                            {rowDataT1.length}개
                          </Badge>
                        </Grow>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeT1>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={rowDataT1}
                            columnDefs={columnDefsT1}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            domLayout={'normal'}
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Grid>
                      <Grid className="grid-rows-[auto_1fr]">
                        <Grow placement="sc">
                          <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                            보험료 할증
                          </Typo>
                          <Badge color="primary" variant="contained">
                            {rowDataT2.length}개
                          </Badge>
                        </Grow>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeT2>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={rowDataT2}
                            columnDefs={columnDefsT2}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            domLayout={'normal'}
                          />
                        </div>
                      </Grid>
                      <Grid className="grid-rows-[auto_1fr]">
                        <Grow placement="sc">
                          <Typo tag={'strong'} variant={'body-sm'} icon={'dot'} weight={'bold'} color={'default'}>
                            부담보(부위/질병)
                          </Typo>
                          <Badge color="primary" variant="contained">
                            {rowDataT3.length}개
                          </Badge>
                        </Grow>
                        <div className="w-full ag-theme-alpine">
                          <AgGridReact<DummyDataTypeT3>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={rowDataT3}
                            columnDefs={columnDefsT3}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            domLayout={'normal'}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Gcol className="w-full" placement="ss" variant="box-info">
                    <Typo variant={'body-sm'} icon={'info'}>
                      <b>설계반영 시 유의사항</b>
                    </Typo>
                    <BulletList>
                      <BulletListItem size={'sm'} type={'dot'}>
                        <b>설계반영 클릭시 자동 처리됩니다. 이외의 사항은 심사요청이후 재확인바랍니다.</b>
                      </BulletListItem>
                      <BulletListItem size={'sm'} type={'dot'}>
                        고지필요대상 : 알릴 사항 자동입력
                      </BulletListItem>
                      <BulletListItem size={'sm'} type={'dot'}>
                        제한담보 : 일괄조정 & 연관담보 동시 조정
                      </BulletListItem>
                    </BulletList>
                  </Gcol>
                </Grid>
              </Grid>
            ) : (
              <Grid placement="ss" className="w-full h-full" gap={3}>
                <TableFold>
                  <TableFoldHead title="" />
                  <TableFoldBody></TableFoldBody>
                </TableFold>
              </Grid>
            )}
          </TabPager>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                심사요청
              </Button>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                설계반영
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

export default Ltpz026;
