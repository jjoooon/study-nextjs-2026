'use client';

import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import '@/shared/lib/agGridPub';

function getComparisonHeaderCellStyle(column: ColDef): React.CSSProperties {
  if (typeof column.width === 'number') {
    const width = `${column.width}px`;

    return {
      flex: '0 0 auto',
      minWidth: width,
      width,
    };
  }

  if (typeof column.flex === 'number') {
    return {
      flex: `${column.flex} ${column.flex} 0%`,
      minWidth: 0,
    };
  }

  return {
    flex: '1 1 0%',
    minWidth: 0,
  };
}

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
  const [rowData1] = React.useState<DummyDataType[]>(DummyData);
  const [rowData2] = React.useState<DummyDataType[]>(DummyData1);
  const [rowData3] = React.useState<DummyDataType[]>(DummyData2);

  // DummyDataType
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 1,
      colSpan: (params) => {
        // 합계 행이면 이름+서브레이블 합치기
        if (params.data?.id === 0) return 2;
        return 1;
      },
    },
    {
      headerName: '가입금액(원)',
      field: 'field2',
      width: 70,
      valueFormatter: numberValueFormatter,
      colSpan: (params) => {
        // 합계 행이면 숨김
        if (params.data?.id === 0) return 0;
        return 1;
      },
      cellClass: (params) => {
        if (params.data?.id === 0) return 'hidden';
        return 'text-right';
      },
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      width: 70,
      valueFormatter: numberValueFormatter,
      cellClass: (params) => {
        if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
        return 'text-right';
      },
      editable: false,
    },
  ];

  // 013페이지 방식: 외부 스크롤 div 동기화
  const scrollRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isSyncing = React.useRef(false);
  const handleSyncScroll = (idx: number, e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncing.current) return;
    isSyncing.current = true;
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    scrollRefs.current.forEach((ref, i) => {
      if (i !== idx && ref && Math.abs(ref.scrollTop - scrollTop) > 1) {
        ref.scrollTop = scrollTop;
      }
    });
    setTimeout(() => {
      isSyncing.current = false;
    }, 0);
  };

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              추천설계비교
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
          <Grow gap={3} placement="ss">
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
                    <Checkbox color="primary" onCheckedChange={() => {}} size="lg" variant="default"></Checkbox>
                  </Grow>
                </Grow>
                <Grow
                  className="w-full h-full px-[1rem] pb-[2rem] [&_.ag-floating-bottom]:!sticky [&_.ag-floating-bottom]:bottom-0"
                  placement="ss"
                >
                  {/* scrollable content */}
                  <div
                    className="ag-theme-alpine no-header w-full min-h-[34rem] overflow-y-auto relative [&_.ag-header]:!hidden [&_.ag-header-viewport]:!hidden [&_.ag-header-row]:!h-0 [&_.ag-header]:!min-h-0"
                    ref={(el) => {
                      scrollRefs.current[i + 1] = el;
                    }}
                    onScroll={(e) => handleSyncScroll(i + 1, e)}
                  >
                    <div className="sticky top-0 z-10 flex h-[3rem] w-full border-b border-[#D9E2EC] bg-[var(--color-gray-5)] border-t-[0.2rem] border-t-[#000]">
                      {columnDefs.map((column, index) => {
                        const key = column.field ?? column.headerName ?? `column-${index}`;

                        return (
                          <div
                            key={key}
                            className={`flex h-full items-center border-r border-[#D9E2EC] px-0 justify-center last:border-r-0`}
                            style={getComparisonHeaderCellStyle(column)}
                          >
                            <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[#344054]">
                              {column.headerName}
                            </Typo>
                          </div>
                        );
                      })}
                    </div>
                    <AgGridReact<DummyDataType>
                      // 합계 행 설정
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={i === 0 ? rowData1 : i === 1 ? rowData2 : rowData3}
                      columnDefs={columnDefs}
                      headerHeight={0}
                      groupHeaderHeight={0}
                      defaultColDef={{
                        suppressMovable: true,
                        sortable: false,
                        resizable: false,
                      }}
                    />

                    <Grow
                      className="sticky bottom-[-0.1rem] z-10 flex h-[3rem] w-full border-t border-t-[var(--color-primary-50)] bg-[var(--color-primary-10)] border-t-[0.1rem] border-b border-b-[var(--color-gray-15)] px-[0.6rem] text-[1.3rem]"
                      placement="bwc"
                    >
                      <Typo
                        tag={'span'}
                        variant={'body-md'}
                        weight={'bold'}
                        className="text-[var(--color-primary-100)]"
                      >
                        예상보험표
                      </Typo>
                      <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                        7000
                      </Typo>
                    </Grow>
                  </div>
                </Grow>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz021;
