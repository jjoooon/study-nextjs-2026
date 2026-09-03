/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

ModuleRegistry.registerModules([AllCommunityModule]);

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
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'text',
    field02: 'ls12345678901234',
    field03: '2026-12-31',
    field04: '2026-12-31',
    field05: '2026-12-31',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text text text text text text text text text text text text text',
    field10: 'text',
    field11: '9999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'text',
    field02: 'text',
    field03: '2026-12-31',
    field04: '2026-12-31',
    field05: '2026-12-31',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text',
    field10: 'text',
    field11: '9999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'text',
    field02: 'text',
    field03: '2026-12-31',
    field04: '2026-12-31',
    field05: '2026-12-31',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text',
    field10: 'text',
    field11: '9999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'text',
    field02: 'text',
    field03: '2026-12-31',
    field04: '2026-12-31',
    field05: '2026-12-31',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text',
    field10: 'text',
    field11: '9999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'text',
    field02: 'text',
    field03: '2026-12-31',
    field04: '2026-12-31',
    field05: '2026-12-31',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text',
    field10: 'text',
    field11: '9999999999',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'text',
    field02: 'text',
    field03: '2026-12-31',
    field04: '2026-12-31',
    field05: '2026-12-31',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text',
    field10: 'text',
    field11: '9999999999',
  },
];

const Ltpz065 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '회사명',
        field: 'field01',
        flex: 10,
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center `,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
      },
      {
        headerName: '증권번호',
        field: 'field02',
        flex: 1,
        minWidth: attributeColumnWidth(110),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '보험시기',
        field: 'field03',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '보험종기',
        field: 'field04',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '담보상태 변경일자',
        field: 'field05',
        flex: 1,
        minWidth: attributeColumnWidth(100),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center `,
      },
      {
        headerName: '담보상태',
        field: 'field06',
        flex: 1,
        minWidth: attributeColumnWidth(60),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '보장내용코드',
        field: 'field07',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '담보특성코드',
        field: 'field08',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '담보명',
        field: 'field09',
        flex: 20,
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-left`,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field09' }),
      },
      {
        headerName: '담보코드',
        field: 'field10',
        flex: 1,
        minWidth: attributeColumnWidth(90),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-center`,
      },
      {
        headerName: '가입액(원)',
        field: 'field11',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        sortable: false,
        filter: false,
        suppressMovable: true,
        resizable: true,
        cellClass: `text-right`,
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              단체 실손의료비 전환대상 조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ065)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 조회 */}
          <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
            <FormTable variant={'none'} lineTop={false} cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_auto_auto_1fr] gap-1">
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} readOnly />
                  -
                  <Input width={26} value={'1'} readOnly />
                  <Input
                    width={200}
                    value={'한화 더건강한 한아름종합보험2601'}
                    variant="info"
                    readOnly
                    className="ml-2"
                  />
                </FormCell>
              </FormRow>
            </FormTable>

            <Grow className="w-[20rem]">
              <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default">
                재조회
              </Checkbox>
              <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained" className="ml-2">
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

          {/* 조회 정보 */}
          <TableFold>
            <TableFoldHead title="단체실손의료비 전환대상" />
            <TableFoldBody className="gap-2 grid grid-rows-[auto_1fr]">
              <FormTable caption="단체실손의료비 전환대상 테이블" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                {/* 2026-05-27 variant 추가 */}
                <FormRow>
                  <FormCell title={'피보험자'}>
                    <Input width={80} variant="info" value={'김한화'} readOnly />
                    <Input
                      aria-label="주민등록번호 마스킹"
                      width={120}
                      variant="info"
                      value={'(000000-0******)'}
                      readOnly
                    />
                  </FormCell>
                  <FormCell title={'조회건수'}>
                    <Input width={30} variant="info" value={'n'} readOnly />건
                  </FormCell>
                </FormRow>
              </FormTable>
              <div className="ag-theme-alpine inner-scroll" data-rows={DummyData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: false }}
                  enableCellSpan={true}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                  // 체크박스 시
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: false,
                    checkboxes: true,
                    enableClickSelection: true,
                  }}
                  selectionColumnDef={{
                    cellClass: 'editable-cell',
                    headerName: '선택',
                    width: 30,
                  }}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
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

export default Ltpz065;
