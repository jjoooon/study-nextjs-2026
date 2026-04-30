'use client';

import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';
import type { ColDef, ColGroupDef, ICellRendererParams, IHeaderParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import { Grow, Typo } from '@/shared/components/atoms';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { Button } from '@/shared/components/uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
} from '@/shared/components/uiux/Dialog';
import { Input } from '@/shared/components/uiux/Input';


import '@/shared/lib/agGridPub';

const CombinedQuestionHeader = (_props: IHeaderParams<DummyDataType>) => {
  const headerAreaStyle: React.CSSProperties = {
    width: 'calc(100% + (var(--ag-cell-horizontal-padding) * 2))',
  };

  return (
    <div className="h-full w-full overflow-hidden" style={headerAreaStyle}>
      <div className="grid h-full w-full grid-cols-[60px_minmax(0,1fr)]">
        <div className="flex items-center justify-center border-r border-(--ag-border-color) text-center">순서</div>
        <div className="flex items-center justify-center text-center">질문명</div>
      </div>
    </div>
  );
};

const CombinedQuestionCell = ({ data }: ICellRendererParams<DummyDataType>) => {
  const field01 = data?.field01;
  const field02 = data?.field02 ?? '';
  const isDetails = data?.isDetails === true;

  return (
    <div className="h-full w-full">
      <div className={isDetails ? 'flex h-full w-full' : 'grid h-full w-full grid-cols-[60px_minmax(0,1fr)]'}>
        {isDetails ? (
          <div className="flex h-full w-full items-center justify-center text-center">{field02}</div>
        ) : (
          <>
            <div className="flex items-center justify-center border-r border-(--ag-border-color) text-center">
              {field01}
            </div>
            <div className="flex items-center justify-center text-center">{field02}</div>
          </>
        )}
      </div>
    </div>
  );
};

const CombinedAnswerCell = ({ data }: ICellRendererParams<DummyDataType>) => {
  const field03 = data?.field03;
  const field04 = data?.field04;
  const isDetails = data?.isDetails === true;

  return (
    <div className={isDetails ? 'flex w-full' : 'grid w-full grid-cols-[30%_70%]'}>
      {isDetails ? (
        <div className="flex min-h-[2.5rem] w-full items-start self-stretch wrap-break-word whitespace-normal px-2 py-1 text-left">
          {field04 || '\u00A0'}
        </div>
      ) : (
        <>
          <div className="flex min-h-[2.5rem] items-center justify-center border-r border-(--ag-border-color) px-2 text-center">
            {field03 || '\u00A0'}
          </div>
          <div className="flex min-h-[2.5rem] items-start self-stretch wrap-break-word whitespace-normal px-2 py-1 text-left">
            {field04 || '\u00A0'}
          </div>
        </>
      )}
    </div>
  );
};

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

const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
  {
    headerName: '질문정보',
    field: 'field02',
    flex: 1,
    minWidth: 240,
    cellClass: 'p-0! flex',
    tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    headerComponent: CombinedQuestionHeader,
    cellRenderer: CombinedQuestionCell,
  },
  {
    headerName: '답변',
    flex: 1,
    autoHeight: true,
    wrapText: true,
    cellClass: 'p-0! flex',
    tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field04' }),
    cellRenderer: CombinedAnswerCell,
  },
];

export const Ltpz028 = () => {
  const [rowData] = React.useState<DummyDataType[]>(DUMMY_DATA);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable size="lg">
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
          <Grow placement="bwe" className="w-full" variant="box-round" gap={5}>
            <FormTable
              variant="head"
              caption="답변자 정보 테이블"
              cols={['w-[5rem]', 'w-auto', 'w-[5rem]', 'w-auto', 'w-[5rem]', 'w-auto']}
            >
              <FormRow>
                <FormCell title="답변자">
                  <Input placeholder="김한화" width={100} readOnly />
                </FormCell>
                <FormCell title="답변일시">
                  <Input placeholder="2026-02-24" width={100} readOnly />
                </FormCell>
                <FormCell title="설계번호">
                  <Input placeholder="LA12312312" width={150} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine min-h-[21rem]">
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
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant="outlined" size="xl" color="gray-light" id="btnRB" onClick={() => onOpenChange?.(false)}>
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
