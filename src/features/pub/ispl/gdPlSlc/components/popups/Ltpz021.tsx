/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { BodyScrollEvent, ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths, numberValueFormatter } from '@aggrid'; // 2026-05-29 tooltip 추가

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
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '보통약관(상해80%이상후유장애)(간편)',
    field2: '3000',
    field3: '3000',
  },
  {
    id: 2,
    field1: '보험료납입면제대상보장(5대유해)(간편)',
    field2: '10',
    field3: '10',
  },
  {
    id: 3,
    field1: '상해사망(간편)',
    field2: '15000',
    field3: '9600',
  },
  {
    id: 4,
    field1: '골절(치아파절포함)진단비(간편)',
    field2: '10',
    field3: '1185',
  },
  {
    id: 5,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관)',
    field2: '13500',
    field3: '72255',
  },
  {
    id: 6,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1)',
    field2: '5000',
    field3: '1160000000',
  },
  {
    id: 7,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 8,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 9,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 10,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 11,
    field1: '4444질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
];
const DummyData1: DummyDataType[] = [
  {
    id: 1,
    field1: '보험료납입면제대상보장(5대유해)(간편)',
    field2: '20',
    field3: '20',
  },
  {
    id: 2,
    field1: '보통약관(상해80%이상후유장애)(간편)',
    field2: '3000',
    field3: '3000',
  },
  {
    id: 3,
    field1: '상해사망(간편)',
    field2: '15000',
    field3: '9600',
  },
  {
    id: 4,
    field1: '골절(치아파절포함)진단비(간편)',
    field2: '10',
    field3: '1850',
  },
  {
    id: 5,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관)',
    field2: '13500',
    field3: '72255',
  },
  {
    id: 6,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1)',
    field2: '5000',
    field3: '11600',
  },
  {
    id: 7,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 8,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 9,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 10,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 11,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
];
const DummyData2: DummyDataType[] = [
  {
    id: 1,
    field1: '보험료납입면제대상보장(5대유해)(간편)',
    field2: '30',
    field3: '30',
  },
  {
    id: 2,
    field1: '보통약관(상해80%이상후유장애)(간편)',
    field2: '3000',
    field3: '3000',
  },
  {
    id: 3,
    field1: '상해사망(간편)',
    field2: '15000',
    field3: '9600',
  },
  {
    id: 4,
    field1: '골절(치아파절포함)진단비(간편)',
    field2: '10',
    field3: '3850',
  },
  {
    id: 5,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관)',
    field2: '13500',
    field3: '72255',
  },
  {
    id: 6,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1)',
    field2: '5000',
    field3: '11600',
  },
  {
    id: 7,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 8,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 9,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 10,
    field1: '444질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 11,
    field1: '222질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
];

const Ltpz021 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();

  const [rowData1] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType[]>(DummyData1);
  const [rowData3] = React.useState<DummyDataType[]>(DummyData2);

  // DummyDataType
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
  ];

  // AG Grid 내부 스크롤(Body viewport) 동기화
  const gridContainerRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isSyncingBodyScroll = React.useRef(false);

  const setGridBodyScrollTop = React.useCallback((container: HTMLDivElement, top: number) => {
    const viewport = container.querySelector('.ag-body-viewport');

    if (!(viewport instanceof HTMLDivElement)) {
      return;
    }

    if (Math.abs(viewport.scrollTop - top) > 1) {
      viewport.scrollTop = top;
    }
  }, []);

  const handleGridBodyScroll = React.useCallback(
    (sourceIndex: number, event: BodyScrollEvent<DummyDataType>) => {
      if (isSyncingBodyScroll.current || event.direction !== 'vertical') {
        return;
      }

      isSyncingBodyScroll.current = true;

      gridContainerRefs.current.forEach((container, index) => {
        if (!container || index === sourceIndex) {
          return;
        }

        setGridBodyScrollTop(container, event.top);
      });

      requestAnimationFrame(() => {
        isSyncingBodyScroll.current = false;
      });
    },
    [setGridBodyScrollTop]
  );

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              추천설계비교
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ021)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false}>
              <FormRow>
                <FormCell title={'피보험자'}>
                  <Input value={'홍길순 32세(여)'} variant="info" readOnly />
                </FormCell>
                <FormCell title={'직업'}>
                  <Input value={'(1급)회사 사무직 종사자'} variant="info" readOnly />
                </FormCell>
                <FormCell title={'보장분석'}>
                  <Input value={'2026-01-01 진행'} variant="info" readOnly />
                </FormCell>
                <FormCell title={'보험금지급 이력정보'}>
                  <Input value={'2026-01-01'} variant="info" readOnly />
                </FormCell>

                <FormCell title={'피보험자'}>
                  <Input value={'32세(1994-02-12) / 여 / 1급'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grow gap={3} placement="ss" className="w-full h-full">
            {[...Array(3)].map((_, i) => (
              <Grid
                className="grid-rows-[auto_1fr] w-full overflow-hidden border border-[#CBE3FF] rounded-[0.6rem] gap-5 h-full"
                key={i}
              >
                <Grow placement="bws" className="w-full bg-[#EFF8FF] p-[1rem] rounded-t-[0.6rem]">
                  <Gcol placement="ss">
                    <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
                      한화 3N5 더간편건강보험(세만기형) 2601
                    </Typo>
                    <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
                      기본형·납입면제운영형·3N5간편고간편고지형III
                    </Typo>
                  </Gcol>
                  <Grow>
                    <Checkbox color="info" onCheckedChange={() => {}} size="lg" variant="default"></Checkbox>
                  </Grow>
                </Grow>
                <Gcol className="w-full h-full px-[1rem] pb-[2rem]" placement="ss" gap={0}>
                  {/* scrollable content */}
                  <div
                    className="ag-theme-alpine w-full min-h-[20.8rem] "
                    ref={(el) => {
                      gridContainerRefs.current[i] = el;
                    }}
                  >
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={i === 0 ? rowData1 : i === 1 ? rowData2 : rowData3}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        suppressMovable: true,
                        sortable: false,
                        resizable: true,
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onBodyScroll={(event) => {
                        handleGridBodyScroll(i, event);
                      }}
                      animateRows={false}
                    />
                  </div>
                  <Grow
                    className="flex h-[3rem] w-full border-t border-t-[var(--color-primary-50)] bg-[var(--color-primary-10)] border-t-[0.1rem] border-b border-b-[var(--color-gray-15)] px-[0.6rem] text-[1.3rem]"
                    placement="bwc"
                  >
                    <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                      예상보험료
                    </Typo>
                    <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                      {(() => {
                        // 각 그리드의 데이터 합계 계산
                        const data = i === 0 ? rowData1 : i === 1 ? rowData2 : rowData3;
                        const sum = data.reduce(
                          (acc, cur) =>
                            acc +
                            (typeof cur.field3 === 'number'
                              ? cur.field3
                              : Number(cur.field3.toString().replace(/[^\d.-]/g, ''))),
                          0
                        );
                        return sum.toLocaleString();
                      })()}
                    </Typo>
                  </Grow>
                </Gcol>
              </Grid>
            ))}
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                설계생성(0)
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

export default Ltpz021;
