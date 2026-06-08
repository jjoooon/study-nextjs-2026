/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

import '@/shared/lib/agGridPub';

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
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    field01: 'LA12345678',
    field02:
      '문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.문서명 내용이 들어갑니다.',
    field03: 1,
    field04: '김한화한화김한화한화',
    field05: '소재소재지소재지소재지소재지소재지지(12)',
    field06: '2026-06-01 12:20:56',
    field07: '김한화한화김한화한화',
    field08:
      '비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.비고 내용이 들어갑니다.',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'LA12345679',
    field02: '문서명 내용이 들어갑니다.',
    field03: 2,
    field04: '김한화',
    field05: '소재지(12)',
    field06: '2026-06-01 12:20:56',
    field07: '김한화',
    field08: '비고 내용이 들어갑니다.비고 내용이 들어갑니다.',
  },
];

const Ltpz079 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '증권번호',
      field: 'field01',
      minWidth: attributeColumnWidth(90),
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '문서명',
      field: 'field02',
      flex: 10,
      cellClass: 'text-left', // 2026-05-29 text-left로 변경
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '순번',
      field: 'field03',
      minWidth: attributeColumnWidth(30),
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '피보험자',
      field: 'field04',
      minWidth: attributeColumnWidth(70),
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    },
    {
      headerName: '소재지(발생순번)',
      field: 'field05',
      minWidth: attributeColumnWidth(100),
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field05' }),
    },
    {
      headerName: '스캔일시',
      field: 'field06',
      minWidth: attributeColumnWidth(120),
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '스캔처리자',
      field: 'field07',
      minWidth: attributeColumnWidth(70),
      flex: 1,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field07' }),
    },
    {
      headerName: '비고',
      field: 'field08',
      minWidth: attributeColumnWidth(120),
      flex: 2,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field08' }),
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계이미지조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ079)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'가입설계번호'}>
                  <Input aria-label="" width={131} value={'LA12345678901234'} required />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Checkbox color="primary" onCheckedChange={() => {}}>
                    새창으로
                  </Checkbox>
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
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
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
              selectionColumnDef={{
                width: 30,
              }}
              onGridReady={(params) => {
                params.api.forEachNode((node) => {
                  if (node.data?.isCheck) {
                    node.setSelected(true);
                  }
                });
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow gap={1}>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                이미지조회
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                이미지가져가기
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

export default Ltpz079;
