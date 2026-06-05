/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { FileExportIcon, ResetIcon, SearchIcon } from '@icons';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

type DummyDataType = {
  id: number;
  accName: string;
  accRisk: string;
  accDesignAmt: string;
  accTotalAmt: string;
  upperAccName: string;
  upperAccRisk: string;
  upperDesignAmt: string;
  upperTotalAmt: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    accName: '상해사망후유',
    accRisk: '일반상해사망일반상해사망일반상해사망일반상해사망',
    accDesignAmt: '1000000',
    accTotalAmt: '1000000',
    upperAccName: '상해사망후유',
    upperAccRisk: '일반상해사망일반상해사망일반상해사망일반상해사망일반상해사망',
    upperDesignAmt: '1000000',
    upperTotalAmt: '1000000',
  },
  {
    id: 2,
    accName: '상해사망후유',
    accRisk: '일반상해사망후유장애',
    accDesignAmt: '1000000',
    accTotalAmt: '1000000',
    upperAccName: '상해사망후유',
    upperAccRisk: '일반상해사망후유장애',
    upperDesignAmt: '1000000',
    upperTotalAmt: '1000000',
  },
  {
    id: 3,
    accName: '상해사망후유',
    accRisk: '교통상해사망',
    accDesignAmt: '1000000',
    accTotalAmt: '1000000',
    upperAccName: '상해사망후유',
    upperAccRisk: '교통상해사망',
    upperDesignAmt: '1000000',
    upperTotalAmt: '1000000',
  },
  {
    id: 4,
    accName: '특정상해',
    accRisk: '통합상해진단비(경증)(연1회한)',
    accDesignAmt: '1000000',
    accTotalAmt: '1000000',
    upperAccName: '특정상해',
    upperAccRisk: '통합상해진단비(경증)(연1회한)',
    upperDesignAmt: '1000000',
    upperTotalAmt: '1000000',
  },
  {
    id: 5,
    accName: '특정상해',
    accRisk: '통합상해진단비(중증)(연1회한)',
    accDesignAmt: '1000000',
    accTotalAmt: '1000000',
    upperAccName: '특정상해',
    upperAccRisk: '통합상해진단비(중증)(연1회한)',
    upperDesignAmt: '1000000',
    upperTotalAmt: '1000000',
  },
  {
    id: 6,
    accName: '특정상해',
    accRisk: '골절진단+통합상해진단(중등증)(합)',
    accDesignAmt: '1000000',
    accTotalAmt: '1000000',
    upperAccName: '특정상해',
    upperAccRisk: '골절진단+통합상해진단(중등증)(합)',
    upperDesignAmt: '1000000',
    upperTotalAmt: '1000000',
  },
];

const Ltpz097 = () => {
  // 2026-05-28 cellClass 수정
  // 2026-06-04 flex, minWidth 수정
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상위누적명',
      field: 'accName',
      flex: 1,
      minWidth: 120,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-start! whitespace-pre-line text-left `,
    },
    {
      headerName: '누적위험명',
      field: 'accRisk',
      flex: 2,
      minWidth: 200,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-left`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'accRisk' }),
    },
    {
      headerName: '설계별 누적금액',
      field: 'accDesignAmt',
      width: 90,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '전체누적금액',
      field: 'accTotalAmt',
      width: 90,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '상위누적명',
      field: 'upperAccName',
      flex: 1,
      minWidth: 120,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-start! whitespace-pre-line text-left `,
    },
    {
      headerName: '누적위험명',
      field: 'upperAccRisk',
      flex: 2,
      minWidth: 200,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-left`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'upperAccRisk' }),
    },
    {
      headerName: '설계별 누적금액',
      field: 'upperDesignAmt',
      width: 90,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '전체누적금액',
      field: 'upperTotalAmt',
      width: 90,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
  ];

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              피보험자별누적조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ097)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 조회 */}
          <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
            <FormTable variant={'head'} lineTop={false}>
              <FormRow className="grid grid-cols-[1fr_auto]">
                <FormCell
                  title={'조회구분'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] w-full"
                  className="whitespace-nowrap"
                >
                  <NativeSelect aria-label="항목 선택" width={100} value={form.type01} required>
                    {[
                      { value: 'selection', id: 'type01-1', label: '설계번호' },
                      { value: 'selection2', id: 'type01-2', label: '증권번호' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input width={120} value={'LA260204310632'} />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input value={'한화 더 건강한 1040종합한화 더 건강한 1040종합한화 더 건강한 1040종합'} readOnly />
                </FormCell>
                <FormCell title={'피보험자정보'}>
                  <Grow>
                    <NativeSelect
                      aria-label="항목 선택"
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type03-1', label: '김한화(890823-1******)' },
                        { value: 'selection2', id: 'type03-2', label: '박한화(890823-1******)' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </Grow>
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

          {/* 조회 정보 */}
          {/* 2026-05-27 */}
          <Grid placement="ss" className="w-full grid-rows-[auto_1fr]" gap={5}>
            <TableFold>
              <TableFoldHead title="피보험자의 위험정보(고객정보)"></TableFoldHead>
              <TableFoldBody>
                <Grow className="w-full">
                  <FormTable
                    caption="피보험자의 위험정보 테이블"
                    cols={['w-[5rem]', 'flex-1', 'w-[8rem]', 'flex-1', 'w-[5rem]', 'flex-1', 'w-[5rem]', 'flex-1']}
                  >
                    <FormRow>
                      <FormCell title={'직업'}>전기공학 개발자 및 연구원</FormCell>
                      <FormCell title={'급수/등급'}>2/B</FormCell>
                      <FormCell title={'회사'}>전기공학 개발자 및 연구원</FormCell>
                      <FormCell title={'직무'}>전기공학 개발자 및 연구원</FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
              </TableFoldBody>
            </TableFold>

            <TableFold>
              <TableFoldHead title="피보험자의 위험별 누적(상단배치 후 하위누적 합산 시 적색은 단순합산, 주황색은 최대값합산)">
                <Grow>
                  <Button color="success" variant="outlined">
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
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
                    />
                  </div>
                  <Gcol className="w-full">
                    <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                      <Typo variant={'body-sm'} icon={'warning'}>
                        <b>주의사항 노출 영역</b>
                      </Typo>
                    </Gcol>
                    <Gcol placement={'ss'} className="w-full">
                      <Typo variant={'body-sm'} icon={'detail'}>
                        자세한 합산 누적인수기준은 [스마트가이드 - 인수지침 - 장기보험 - 인보험 - 3. 담보별
                        인수기준]에서 확인해주시면 됩니다.
                      </Typo>
                    </Gcol>
                  </Gcol>
                </Grid>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                지침확인결과
              </Button>
            </Grow>
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

export default Ltpz097;
