/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon, SearchIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
};
const dummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '구분정보',
    field2: '보험종목명보험종목명보험종목명보험종목명보험종목명보험종목명보험종목명 ',
    field3: 'LA26020945959594',
    field4: '한화한화',
    field5: '290000',
    field6: '2023-01-01',
    field7: '상태',
  },
  {
    id: 2,
    field1: '구분정보',
    field2: '보험종목명 ',
    field3: 'LA26020945959594',
    field4: '계약자',
    field5: '290000',
    field6: '2023-01-01',
    field7: '상태',
  },
  {
    id: 3,
    field1: '구분정보',
    field2: '보험종목명 ',
    field3: 'LA26020945959594',
    field4: '계약자',
    field5: '290000',
    field6: '2023-01-01',
    field7: '상태',
  },
];
type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '고액함암약물허가치료(신정원)고액함암약물허가치료(신정원)고액함암약물허가치료(신정원)',
    field2: '28990',
    field3: '20년납',
  },
  {
    id: 2,
    field1: '암진단(유병자)',
    field2: '28990',
    field3: '20년납',
  },
  {
    id: 3,
    field1: '암(4대유사암제외)진단비',
    field2: '28990',
    field3: '20년납',
  },
];

// 2026-06-01 agGrid width, flex, cellClass 수정
// 2026-06-01 agGrid minWidth, flex 수정
const Ltpz002 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field1',
      flex: 1,
      minWidth: 80,
    },
    {
      headerName: '보험종목명',
      field: 'field2',
      flex: 6,
      minWidth: attributeColumnWidth(150),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field2' }),
    },
    {
      headerName: '설계번호',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(120),
    },
    {
      headerName: '계약자',
      field: 'field4',
      width: attributeColumnWidth(70),
    },
    {
      headerName: '보험료(원)',
      field: 'field5',
      cellClass: 'text-right',
      flex: 1,
      minWidth: attributeColumnWidth(75),
      cellRenderer: numberValueFormatter,
    },
    {
      headerName: '설계일자',
      field: 'field6',
      flex: 1,
      minWidth: attributeColumnWidth(80),
    },
    {
      headerName: '상태',
      field: 'field7',
      width: attributeColumnWidth(60),
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      cellClass: 'text-left',
      flex: 4,
      minWidth: attributeColumnWidth(150),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-right',
      cellRenderer: numberValueFormatter,
    },
    {
      headerName: '보험기간',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
  ];
  const columnDefs3: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      cellClass: 'text-left',
      flex: 4,
      minWidth: attributeColumnWidth(150),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-right',
      cellRenderer: numberValueFormatter,
    },
    {
      headerName: '보험기간',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
  ];

  const [rowData] = useState<DummyDataType[]>(dummyData);
  const [rowData2] = useState<DummyDataType2[]>(dummyData2);
  const [rowData3] = useState<DummyDataType2[]>(dummyData2);
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계검색
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ002)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <TableFold variant={'default'}>
            <TableFoldHead title={'고객정보'} />
            <TableFoldBody className="grid-rows-[auto_1fr] gap-[1.2rem]">
              <Grow className="w-full" variant="box-round" placement={'bwe'}>
                <FormTable variant={'none'} cols={['w-1', 'w-[30rem]', 'w-[10rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'조회구분'}>
                      <NativeSelect required>
                        <NativeSelectOption value="">피보험자번호</NativeSelectOption>
                      </NativeSelect>
                      <Input value={'000000-0******'} readOnly />
                      <Button variant={'outlined'} only={'icon'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                    <FormCell title={'설계상태'}>
                      <NativeSelect width={'auto'}>
                        {[
                          '전체',
                          '설계중',
                          '간편설계',
                          '설계심사중',
                          '설계완료',
                          '심사의뢰',
                          '심사중',
                          '심사완료',
                          '청약중',
                          '청약완료',
                          '수납완료',
                          '구득심사중',
                          '구득심사완료',
                          '청약삭제',
                          '보험료산출',
                          '설계취소',
                          '지로',
                          '반려',
                          '취소',
                          '가설계',
                          '1차보험료산출',
                          '업셀링설계',
                          '검증',
                        ].map((option) => (
                          <NativeSelectOption key={option} value={option}>
                            {option}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'설계일자'}>
                      <DatePickerInput required mode={'range'} />
                    </FormCell>
                    <FormCell title={'고객명(영문)'}>
                      <b>hong gum</b>
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

              <Grid gap={3} className="grid-rows-[auto_1fr_auto_auto]">
                <FormTable cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'동일모집인'}>
                      1 동일모집인 이외의 설계는 지점 (OR 매니져)에게 문의하세요.
                    </FormCell>
                    <FormCell title={'상장구분'}>
                      <b>hong gum</b>
                    </FormCell>
                    <FormCell title={'설립일자'} tdClassName={'justify-between'}>
                      3
                      <Button color="gray" onClick={() => {}} size="lg" variant="contained">
                        설계조회
                      </Button>
                    </FormCell>
                  </FormRow>
                </FormTable>

                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                  <AgGridReact<DummyDataType>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      cellClass: 'text-center',
                    }}
                    domLayout="normal"
                    rowSelection={{
                      mode: 'singleRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      width: 30,
                      cellClass: 'text-center editable-cell',
                    }}
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>

                <Grow className="w-full" placement="ss" gap={3}>
                  <TableFold>
                    <TableFoldHead title={'현재 설계'} />
                    <TableFoldBody className="grid-rows-[auto_1fr] gap-[0.8rem]">
                      <FormTable cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-[14.5rem]']}>
                        <FormRow>
                          <FormCell title={'설계번호'}>
                            LA260112297637
                          </FormCell>
                          <FormCell title={'설계상태'}>
                            설계완료
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'취급기관'}>
                            강동 GA지점
                          </FormCell>
                          <FormCell title={'취급자'}>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-left block w-auto overflow-hidden h-[1.95rem]">
                                  (3494035)인카금융-제이
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{`(3494035)인카금융-제이`}</TooltipContent>
                            </Tooltip>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                        <AgGridReact<DummyDataType2>
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          defaultColDef={{
                            cellClass: 'text-center',
                          }}
                          domLayout="normal"
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  <TableFold>
                    <TableFoldHead title={'비교 설계'} />
                    <TableFoldBody className="grid-rows-[auto_1fr] gap-[0.8rem]">
                      <FormTable cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-[14.5rem]']}>
                        <FormRow>
                          <FormCell title={'설계번호'}>
                            LA260112297637
                          </FormCell>
                          <FormCell title={'설계상태'}>
                            설계완료
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'취급기관'}>
                            강동 GA지점
                          </FormCell>
                          <FormCell title={'취급자'} tdStyle={{ paddingRight: 0 }}>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-left block w-auto overflow-hidden h-[1.95rem]">
                                  d(3494035)인카금융-제이금융제이금융제이
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{`(3494035)인카금융-제이금융제이금융제이`}</TooltipContent>
                            </Tooltip>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <div className="ag-theme-alpine inner-scroll" data-row={rowData3.length}>
                        <AgGridReact<DummyDataType2>
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData3}
                          columnDefs={columnDefs3}
                          defaultColDef={{
                            cellClass: 'text-center',
                          }}
                          domLayout="normal"
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                </Grow>

                <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                  <Typo variant={'body-sm'} icon={'warning'}>
                    청약진행 이후에는 삭제조건부 등록 사항을 수정할 수 없습니다. 설계수정이 필요 하오니, 유의하시기
                    바립니다.
                  </Typo>
                </Gcol>
              </Grid>
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

export default Ltpz002;
