/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
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

type LTPZ060TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: LTPZ060TabType[] = [
  {
    name: '자동고지(ICIS)',
    value: 'TAB1',
    label: '자동고지(ICIS)',
  },
  {
    name: '자동고지(심평원)',
    value: 'TAB2',
    label: '자동고지(심평원)',
  },
];

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
};
type DummyDataType2 = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'S92',
    field2: '발등 골절',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '3',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: 'M51',
    field2: '추간판장애',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 3,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 4,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 5,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
];
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'S92',
    field2: '발등 골절',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: 'M51',
    field2: '추간판장애',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 3,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 4,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 5,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
];

export const Ltpa060 = () => {
  const [rowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(dummyData2);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '대표질병코드',
      field: 'field1',
      width: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 2,
      minWidth: attributeColumnWidth(200),
      cellClass: 'text-center',
    },
    {
      headerName: '원사고발생일',
      field: 'field3',
      width: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '최종사고발생일',
      field: 'field4',
      width: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(170),
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field6',
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '수술',
      field: 'field7',
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field8',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '체크',
      field: 'field9',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol placement="cc" className="h-full">
          <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '대표질병코드',
      field: 'field1',
      width: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 2,
      minWidth: attributeColumnWidth(200),
      cellClass: 'text-center',
    },
    {
      headerName: '원사고발생일',
      field: 'field3',
      width: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '최종사고발생일',
      field: 'field4',
      width: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(170),
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field6',
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '수술',
      field: 'field7',
      width: attributeColumnWidth(50),
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field8',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '체크',
      field: 'field9',
      width: attributeColumnWidth(60),
      cellClass: 'text-center',
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol placement="cc" className="h-full">
          <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              외부정보클렌징 결과 조회(사고력요약)
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA060)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr_1fr] gap-5">
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
            {active === 'TAB1' ? (
              <>
                <Gcol placement="ss" className="w-full pt-3" gap={3}>
                  <Grow className="w-full" variant="box-round">
                    <FormTable variant={'head'} lineTop={false} caption="">
                      <FormRow>
                        <FormCell title={'FP정보제공동의(유효일자)'}>
                          <Input aria-label="FP정보제공동의 유효일자" width={100} value={'2026-03-01'} readOnly />
                        </FormCell>
                        <FormCell title={'전문호출기간'}>
                          <Input aria-label="전문호출기간 시작일" width={100} value={'2026-03-01'} readOnly />-
                          <Input aria-label="전문호출기간 종료일" width={100} value={'2026-03-01'} readOnly />
                        </FormCell>
                        <FormCell title={'최종적재일'}>
                          <Input aria-label="최종적재일" width={100} value={'2026-03-01'} readOnly />
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  </Grow>
                  <Gcol placement="ss" className="w-full pt-2" gap={3}>
                    <TableFold>
                      <TableFoldHead title="필수고지"></TableFoldHead>
                      <TableFoldBody>
                        <div className="ag-theme-alpine min-h-[18.5rem]">
                          <AgGridReact<DummyDataType>
                            getRowId={(params) => String(params.data.id)}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            selectionColumnDef={{
                              width: 30,
                            }}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            rowSelection={{
                              mode: 'multiRow',
                              isRowSelectable: (node) => node.data?.field8 !== '고지',
                              checkboxes: true,
                              hideDisabledCheckboxes: false,
                              enableClickSelection: false,
                            }}
                            domLayout="normal"
                            alwaysShowVerticalScroll={true}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                    <TableFold>
                      <TableFoldHead title="고지확인대상"></TableFoldHead>
                      <TableFoldBody>
                        <div className="ag-theme-alpine min-h-[18.5rem]">
                          <AgGridReact<DummyDataType2>
                            getRowId={(params) => String(params.data.id)}
                            rowData={rowData2}
                            columnDefs={columnDefs2}
                            selectionColumnDef={{
                              width: 30,
                            }}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            rowSelection={{
                              mode: 'multiRow',
                              isRowSelectable: (node) => node.data?.field8 !== '고지',
                              checkboxes: true,
                              hideDisabledCheckboxes: false,
                              enableClickSelection: false,
                            }}
                            domLayout="normal"
                            alwaysShowVerticalScroll={true}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                  </Gcol>
                </Gcol>
              </>
            ) : (
              <Gcol placement="ss" className="w-full h-full pt-3" gap={3}>
                <Grow className="w-full" variant="box-round">
                  <FormTable variant={'head'} lineTop={false} caption="">
                    <FormRow>
                      <FormCell title={'정보제공동의(유효일자)'}>
                        <Input aria-label="FP정보제공동의 유효일자" width={100} value={'2026-03-01'} readOnly />
                      </FormCell>
                      <FormCell title={'전문호출기간'}>
                        <Input aria-label="전문호출기간 시작일" width={100} value={'2026-03-01'} readOnly />-
                        <Input aria-label="전문호출기간 종료일" width={100} value={'2026-03-01'} readOnly />
                      </FormCell>
                      <FormCell title={'최종적재일'}>
                        <Input aria-label="최종적재일" width={100} value={'2026-03-01'} readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <TableFold>
                  <TableFoldHead title="필수고지"></TableFoldHead>
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[18.5rem]">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        selectionColumnDef={{
                          width: 30,
                        }}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        rowSelection={{
                          mode: 'multiRow',
                          isRowSelectable: (node) => node.data?.field8 !== '고지',
                          checkboxes: true,
                          hideDisabledCheckboxes: false,
                          enableClickSelection: false,
                        }}
                        domLayout="normal"
                        alwaysShowVerticalScroll={true}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="고지확인대상"></TableFoldHead>
                  <TableFoldBody>
                    <div className="ag-theme-alpine min-h-[18.5rem]">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData2}
                        columnDefs={columnDefs2}
                        selectionColumnDef={{
                          width: 30,
                        }}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        rowSelection={{
                          mode: 'multiRow',
                          isRowSelectable: (node) => node.data?.field8 !== '고지',
                          checkboxes: true,
                          hideDisabledCheckboxes: false,
                          enableClickSelection: false,
                        }}
                        domLayout="normal"
                        alwaysShowVerticalScroll={true}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Gcol>
            )}
          </TabPager>

          {/* <TableFold>
            <TableFoldHead title="고지확인대상"></TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine min-h-[18.5rem]">
                <AgGridReact<DummyDataType2>
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData2}
                  columnDefs={columnDefs2}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowSelection={{
                    mode: 'multiRow',
                    isRowSelectable: (node) => node.data?.field8 !== '고지',
                    checkboxes: true,
                    hideDisabledCheckboxes: false,
                    enableClickSelection: false,
                  }}
                  domLayout="normal"
                  alwaysShowVerticalScroll={true}
                />
              </div>
            </TableFoldBody>
          </TableFold> */}
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                알릴사항 반영하기
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
