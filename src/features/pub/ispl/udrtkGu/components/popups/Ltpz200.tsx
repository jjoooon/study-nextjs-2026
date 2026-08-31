/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, PostSortRowsParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isViolation?: boolean;
  companyName: string;
  productName: string;
  startDate: string;
  endDate: string;
  payPeriod: string;
  premium: number | string;
  coverageCategory: string;
  coverageName: string;
  insuredAmount: number | string;
  status: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isViolation: true,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '질병사망(유병자)',
    coverageName: '유병자질병사망',
    insuredAmount: 500,
    status: '정상',
  },
  {
    id: 2,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '질병사망(유병자)',
    coverageName: '유병자질병사망',
    insuredAmount: 1000,
    status: '정상',
  },
  {
    id: 3,
    isViolation: true,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '뇌혈관질환',
    coverageName: '뇌혈관질환수술',
    insuredAmount: 30,
    status: '정상',
  },
  {
    id: 4,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '뇌출혈',
    coverageName: '뇌혈관질환수술',
    insuredAmount: 100,
    status: '정상',
  },
  {
    id: 5,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '재해수술',
    coverageName: '상해수술',
    insuredAmount: 500,
    status: '정상',
  },
  {
    id: 6,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '허혈성심질환',
    coverageName: '허혈성심장질환진단',
    insuredAmount: 1000,
    status: '정상',
  },
  {
    id: 7,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '질병사망(유병자)',
    coverageName: '유병자질병사망',
    insuredAmount: 30,
    status: '정상',
  },
  {
    id: 8,
    isViolation: true,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '질병사망(유병자)',
    coverageName: '유병자질병사망',
    insuredAmount: 100,
    status: '정상',
  },
  {
    id: 9,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '뇌혈관질환',
    coverageName: '뇌혈관질환수술',
    insuredAmount: 500,
    status: '정상',
  },
  {
    id: 10,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '뇌출혈',
    coverageName: '뇌혈관질환수술',
    insuredAmount: 1000,
    status: '정상',
  },
  {
    id: 11,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '재해수술',
    coverageName: '상해수술',
    insuredAmount: 30,
    status: '정상',
  },
  {
    id: 12,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '허혈성심질환',
    coverageName: '허혈성심장질환진단',
    insuredAmount: 100,
    status: '정상',
  },
  {
    id: 13,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '질병사망(유병자)',
    coverageName: '유병자질병사망',
    insuredAmount: 500,
    status: '정상',
  },
  {
    id: 14,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '질병사망(유병자)',
    coverageName: '유병자질병사망',
    insuredAmount: 1000,
    status: '정상',
  },
  {
    id: 15,
    isViolation: false,
    companyName: '흥국생명',
    productName: '(무)흥국생명(다)사랑 OK335간편건강보험(갱)',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    payPeriod: '30년(월납)',
    premium: 97502,
    coverageCategory: '뇌혈관질환',
    coverageName: '뇌혈관질환수술',
    insuredAmount: 30,
    status: '정상',
  },
];

/**
 * Ltpz022: 보험 설계의 지침 확인 결과(인수 지침 위배 사항)를 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz200 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // AgGrid Column Grouping
  const columnDefs = React.useMemo<(ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[]>(
    () => [
      {
        headerName: '계약정보',
        headerGroupComponent: () => (
          <Grow placement="cc" className="w-full">
            <span className="font-bold text-[1.3rem]!">계약정보</span>
          </Grow>
        ),
        children: [
          {
            headerName: '회사명',
            field: 'companyName',
            width: attributeColumnWidth(90),
            colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 2 : 1),
            cellClass: 'text-left',
          },
          {
            headerName: '상품명',
            field: 'productName',
            minWidth: attributeColumnWidth(160),
            flex: 2,
            colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 0 : 1),
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'productName' }),
          },
          {
            headerName: '보험시기',
            field: 'startDate',
            width: attributeColumnWidth(90),
            cellClass: 'text-center',
          },
          {
            headerName: '보험종기',
            field: 'endDate',
            width: attributeColumnWidth(90),
            cellClass: 'text-center',
          },
          {
            headerName: '납입기간',
            field: 'payPeriod',
            width: attributeColumnWidth(90),
            cellClass: 'text-center',
          },
          {
            headerName: '보험료(원)',
            field: 'premium',
            width: attributeColumnWidth(80),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter,
          },
        ],
      },
      {
        headerName: '담보정보',
        headerGroupComponent: () => (
          <Grow placement="cc" className="w-full">
            <span className="font-bold text-[1.3rem]!">담보정보</span>
          </Grow>
        ),
        children: [
          {
            headerName: '담보명',
            field: 'coverageCategory',
            minWidth: attributeColumnWidth(120),
            flex: 1,
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'coverageCategory' }),
          },
          {
            headerName: '보장명',
            field: 'coverageName',
            minWidth: attributeColumnWidth(120),
            flex: 1,
            cellClass: 'text-left',
            tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'coverageName' }),
          },
          {
            headerName: '가입금액(만원)',
            field: 'insuredAmount',
            width: attributeColumnWidth(90),
            colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 2 : 1),
            cellClass: 'text-right',
            valueFormatter: numberValueFormatter,
          },
          {
            headerName: '상태',
            field: 'status',
            width: attributeColumnWidth(60),
            colSpan: (params) => (params.node?.rowPinned === 'bottom' ? 0 : 1),
            cellClass: 'text-center',
          },
        ],
      },
    ],
    [attributeColumnWidth]
  );

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  const [rowData] = React.useState<DummyDataType[]>(() =>
    [...DummyData].sort((a, b) => (b.isViolation ? 1 : 0) - (a.isViolation ? 1 : 0))
  );

  const postSortRows = React.useCallback((params: PostSortRowsParams<DummyDataType>) => {
    params.nodes.sort((nodeA, nodeB) => {
      if (nodeA.rowPinned || nodeB.rowPinned) return 0;
      const aVal = nodeA.data?.isViolation ? 1 : 0;
      const bVal = nodeB.data?.isViolation ? 1 : 0;
      return bVal - aVal;
    });
  }, []);

  const pinnedBottomRowData = React.useMemo<DummyDataType[]>(() => {
    const totalInsuredAmount = rowData.reduce((sum, row) => sum + (Number(row.insuredAmount) || 0), 0);

    return [
      {
        id: 0,
        companyName: '가입금액 합계',
        productName: '',
        startDate: '',
        endDate: '',
        payPeriod: '',
        premium: '',
        coverageCategory: '',
        coverageName: '',
        insuredAmount: totalInsuredAmount.toLocaleString() + ' 만원',
        status: '',
      },
    ];
  }, [rowData]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        {/* 헤더: 제목 및 화면ID */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              정액담보 상세조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ200)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr] overflow-x-hidden">
          {/* 상단: 설계 기본 정보 표시 영역 */}
          <Grid className="grid-rows-[auto_minmax(0,1fr)] h-full gap-3">
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable caption="보험정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']} variant="head">
                <FormRow>
                  <FormCell title={'검색 담보명'}>
                    <Input
                      aria-label=""
                      width={150}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    />
                  </FormCell>
                  <FormCell title={'보장명'}>
                    <Input
                      aria-label=""
                      width={150}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
                <Button color={'gray'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                  재계산
                </Button>
              </Grow>
            </Grow>

            <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                pinnedBottomRowData={pinnedBottomRowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  suppressMovable: true,
                }}
                postSortRows={postSortRows}
                rowClassRules={{
                  'bg-[#FFF0F0]!': (params) => !!params.data?.isViolation,
                }}
                enableCellSpan={true}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
              />
            </div>
          </Grid>
        </DialogSection>

        {/* 푸터: 추가 확인 버튼 및 닫기 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                정액담보상세출력(회사별)
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                정액담보상세출력(보장별)
              </Button>
              <Button variant={'contained'} size={'xl'}>
                엑셀 내보내기
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

export default Ltpz200;
