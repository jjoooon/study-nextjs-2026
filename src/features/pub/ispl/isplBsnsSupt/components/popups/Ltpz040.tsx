'use client';
// 권오택
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
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
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '정상',
    field02: 'LA231231231',
    field03: '한화 세이프단체보',
    field04: '일상해의료비(가입자)일상해의료비(가입자)',
    field05: '999,999,999',
    field06: '999,999,999',
    field07: 'CLA00172',
    field08: '2026-01-01',
    field09: '2026-01-01',
    field10: '정상',
    field11: '김한화',
    field12: '천안지점',
  },
  {
    id: 2,
    isCheck: false,
    field01: '정상',
    field02: 'LA231231231',
    field03: '한화 세이프단체보',
    field04: '일상해의료비(가입자)',
    field05: '999,999,999',
    field06: '999,999,999',
    field07: 'CLA00172',
    field08: '2026-01-01',
    field09: '2026-01-01',
    field10: '정상',
    field11: '김한화',
    field12: '천안지점',
  },
  {
    id: 3,
    isCheck: false,
    field01: '정상',
    field02: 'LA231231232342',
    field03: '한화 시스템',
    field04: '일상해의료비(가입자)',
    field05: '999,999,999',
    field06: '999,999,999',
    field07: 'CLA00172',
    field08: '2026-01-01',
    field09: '2026-01-01',
    field10: '정상',
    field11: '김한화1',
    field12: '천안지점1',
  },
];

export const Ltpz040 = ({ open, onOpenChange }: PopupBaseProps) => {
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '상태',
      field: 'field01',
      width: 45,
      cellClass: 'text-center',
    },
    {
      headerName: '증권번호',
      field: 'field02',
      spanRows: true,
      width: 110,
      cellClass: 'flex! items-center! justify-center! text-center',
    },
    {
      headerName: '상품명',
      field: 'field03',
      spanRows: true,
      width: 110,
      cellClass: 'flex! items-center! justify-center! text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field03' }),
    },
    {
      headerName: '담보명',
      field: 'field04',
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'field05',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '보험료',
      field: 'field06',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '담보코드',
      field: 'field07',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '보험시기',
      field: 'field08',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '보험종기',
      field: 'field09',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '상태',
      field: 'field10',
      width: 45,
      cellClass: 'text-center',
    },
    {
      headerName: '계약자',
      field: 'field11',
      spanRows: true,
      width: 70,
      cellClass: 'flex! items-center! justify-center! text-center',
    },
    {
      headerName: '취급기관',
      field: 'field12',
      spanRows: true,
      width: 80,
      cellClass: 'flex! items-center! justify-center! text-center ',
      headerStyle: {
        borderRight: 'none',
      },
      cellStyle: {
        borderRight: 'none',
      },
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              실손의료비 전환 계약 조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ040)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'15rem'} value={'LA26020945959594'} readOnly />
                  -
                  <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    설계번호의 상품명 text
                  </Typo>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <TableFold>
            <TableFoldHead title="계약전환용 실손의료비(갱신형)" />
            <TableFoldBody className="grid-rows-[auto_1fr] gap-2">
              <FormTable caption={'피보험자'} cols={['w-[14rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'피보험자'}>김한화(901231-1234567)</FormCell>
                </FormRow>
              </FormTable>
              <Gcol className="w-full" gap={4}>
                <div className="ag-theme-alpine min-h-[12.5rem]">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: true,
                      resizable: true,
                    }}
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: true,
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    rowClassRules={{}}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                    enableCellSpan={true}
                    domLayout="normal"
                    tooltipShowMode="whenTruncated"
                    tooltipShowDelay={0}
                  />
                </div>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    전환전 계약과 동일한 조건(담보, 가입금액 등)으로 전환용 계약 설계에 반영됩니다.
                  </Typo>
                  <Typo icon="detail" variant="body-sm">
                    전환전 계약에 「특정 신체부위 질병 보장제한부 인수 특별약관」, 「특별조건부 특별약관」 등이 부가되어
                    있을 경우, 전환용 계약에 전환전 계약의 조건과 동일하게 부가하여 효력을 갖출 수 있습니다.
                  </Typo>
                  <Typo icon="detail" variant="body-sm">
                    <b>
                      전환전 계약의 해약일 또는 변경기준일자와 전환후 신계약 보험시기가 동일하여야 청약완료 가능합니다.
                    </b>
                  </Typo>
                  <Typo icon="detail" variant="body-sm">
                    <b>전환용 신계약 설계유효기간은 전환전 계약 의료비 담보의 보험종기까지입니다.</b>
                  </Typo>
                </Gcol>
              </Gcol>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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
