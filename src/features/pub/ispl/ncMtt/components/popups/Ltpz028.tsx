/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import { Grow, Typo, Grid } from '@/shared/components/atoms';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field01: string | number | null;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  isDetails?: boolean;
};

const DUMMY_DATA: DummyDataType[] = [
  { id: 1, field01: 1, field02: '최근3개월내검진여부', field03: '아니오', field04: '' },
  { id: 2, field01: 2, field02: '최근3개월내약물복용', field03: '예', field04: '' },
  { id: 3, field01: 3, field02: '최근1년이내추가검사여부', field03: '아니오', field04: '' },
  { id: 4, field01: 4, field02: '최근5년이내치료여부', field03: '아니오', field04: '' },
  { id: 5, field01: 5, field02: '최근5년이내중요질병여부', field03: '아니오', field04: '' },
  {
    id: 6,
    field01: null,
    field02: '대장·직장용종(기재오류 확인필요)',
    field03: '',
    field04:
      '치료기간: 2025-12-01~2025-12-31, 입원(1일) / 치료내용: 진단/검사/검진, 추가질문답변: ①발생부위:경추 ②척추질환(디스크, 관절염, 척추만곡 등)동반:없음 ③발생원인:교통사고 외원인 / 치료병원: 한화병원 / 재발경험: 없음 / 완치여부: 완치',
    isDetails: true,
  },
  {
    id: 7,
    field01: 6,
    field02: '직업확인여부',
    field03: '예',
    field04:
      '직업정보: 44222/b/음료서비스 종사원, 직장명: 음료서비스 종사원, 업종: 음료서비스 종사원, 직무: 음료서비스 종사원',
  },
  { id: 8, field01: 7, field02: '운전여부', field03: '함', field04: '승용차: 자가용' },
  { id: 9, field01: 8, field02: '원동기장치자전거', field03: '아니오', field04: '' },
  { id: 10, field01: 9, field02: '타사가입유무', field03: '없음', field04: '' },
  { id: 11, field01: 10, field02: '체격', field03: '', field04: '키(cm단위): 175, 몸무게(kg단위): 70' },
];

const Ltpz028 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DUMMY_DATA);

  const CombinedAnswerCell = ({ data }: ICellRendererParams<DummyDataType>) => {
    const field03 = data?.field03;
    const field04 = data?.field04;
    const isDetails = data?.isDetails === true;

    return (
      <Grid className={isDetails ? 'h-full min-h-[2.9rem]' : 'w-full h-full grid-cols-[7rem_70%] min-h-[2.9rem]'}>
        {isDetails ? (
          <div className="flex w-full h-full items-start self-stretch wrap-break-word whitespace-normal px-2 py-2 text-left leading-[1.2]">
            {field04 || '\u00A0'}
          </div>
        ) : (
          <>
            <div className="flex h-full items-center justify-center border-r border-(--color-gray-10) px-2 text-center">
              {field03 || '\u00A0'}
            </div>
            <div className="flex h-full items-start self-stretch wrap-break-word whitespace-normal px-2 py-2 text-left leading-[1.2]">
              {field04 || '\u00A0'}
            </div>
          </>
        )}
      </Grid>
    );
  };

  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: ColDef<DummyDataType>[] = useMemo(
    () => [
      {
        headerName: '순서',
        field: 'field01',
        autoHeight: true,
        width: attributeColumnWidth(40),
        cellClass: 'text-center',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
        colSpan: (params) => {
          if (params.data && (params.data.field01 === null || params.data.field01 === undefined)) {
            return 2; // field01과 field02를 병합
          }
          return 1; // 기본값
        },
        // ⭐ 2. 병합되었을 때 field02의 데이터가 보이도록 셀 렌더러 처리
        valueGetter: (params) => {
          if (params.data && (params.data.field01 === null || params.data.field01 === undefined)) {
            return params.data.field02; // field02 내용을 출력
          }
          return params.data?.field01; // field01이 null/undefined가 아니면 빈 문자열 반환
        },
      },
      {
        headerName: '질문정보',
        field: 'field02',
        autoHeight: true,
        flex: 3,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
        cellClassRules: {
          'hidden-by-colspan': (params) => {
            return !!(params.data && (params.data.field01 === null || params.data.field01 === undefined));
          },
        },
      },
      {
        headerName: '답변',
        flex: 5,
        autoHeight: true,
        wrapText: true,
        cellClass: 'p-0! flex',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
        cellRenderer: CombinedAnswerCell,
      },
    ],
    [attributeColumnWidth]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag="strong" variant="heading-lg">
              SELF고지 답변내용
            </Typo>
            <Typo tag="p" variant="body-xl">
              (LTPZ028)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid grid-rows-[auto_1fr]">
          <Grow placement="bwe" className="w-full" variant="box-round">
            <FormTable variant="head" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell title="답변자">
                  <Input value="김한화" width={100} readOnly variant="info" />
                </FormCell>
                <FormCell title="답변일시">
                  <Input value="2026-02-24" width={100} readOnly variant="info" />
                </FormCell>
                <FormCell title="설계번호">
                  <Input value="LA12312312" width={150} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
              defaultColDef={{
                sortable: false,
                resizable: true,
              }}
              domLayout="normal"
              animateRows={false}
            />
          </div>
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

export default Ltpz028;
