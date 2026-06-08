/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-enterprise';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
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
    field02: 'text',
    field03: 'YYYY-MM-DD',
    field04: 'YYYY-MM-DD',
    field05: 'YYYY-MM-DD',
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
    field03: 'YYYY-MM-DD',
    field04: 'YYYY-MM-DD',
    field05: 'YYYY-MM-DD',
    field06: 'text',
    field07: 'text',
    field08: 'text',
    field09: 'text',
    field10: 'text',
    field11: '9999999999',
  },
];

const Ltpz065 = () => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '회사명',
      field: 'field01',
      width: 150,
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
      width: 120,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '보험시기',
      field: 'field03',
      width: 120,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '보험종기',
      field: 'field04',
      width: 120,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '담보상태 변경일자',
      field: 'field05',
      width: 120,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center `,
    },
    {
      headerName: '담보상태',
      field: 'field06',
      width: 70,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '보장내용코드',
      field: 'field07',
      width: 100,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '담보특성코드',
      field: 'field08',
      width: 100,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '담보명',
      field: 'field09',
      width: 200,
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
      width: 100,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '가입액(원)',
      field: 'field11',
      width: 100,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              단체 손실의료비 전환대상 조회
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
                  <Input aria-label="" width={130} value={'LA26020945959594'} readOnly />
                  -
                  <Input width={30} value={'1'} readOnly />
                  <b>한화 더건강한 한아름종합보험2601</b>
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow className="w-[12rem]">
              <Checkbox
                color="primary"
                errorMsg="선택은 필수입니다."
                errorPs="bl"
                onCheckedChange={() => {}}
                size="lg"
                variant="default"
              >
                재조회
              </Checkbox>
            </Grow>
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

          {/* 조회 정보 */}
          <Grid placement="ss" className="w-full grid-rows-[auto_1fr]" gap={2}>
            <TableFold>
              <TableFoldHead title="단체실손의료비 전환대상" />
              <TableFoldBody className="gap-5">
                <Grow className="w-full">
                  <FormTable
                    caption="단체실손의료비 전환대상 테이블"
                    cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'flex-1']}
                  >
                    {/* 2026-05-27 variant 추가 */}
                    <FormRow>
                      <FormCell title={'피보험자'}>
                        <Input width={80} variant="info" value={'김한화'} readOnly />
                        <Input
                          aria-label="주민등록번호 마스킹"
                          width={120}
                          variant="info"
                          value={'900101-1******'}
                          readOnly
                        />
                      </FormCell>
                      <FormCell title={'조회건수'}>
                        <Input width={30} variant="info" value={'n'} readOnly />건
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <Grid className="w-full grid-rows-[1fr_auto] gap-5 h-full">
                  <div className="ag-theme-alpine min-h-[18.4rem]">
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
                        headerName: '선택',
                      }}
                    />
                  </div>
                </Grid>
              </TableFoldBody>
            </TableFold>
          </Grid>
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
