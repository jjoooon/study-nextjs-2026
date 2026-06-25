/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * @file Ltpz021.tsx
 * @description 한화손해보험 장기보험 추천설계비교 다이얼로그 팝업 컴포넌트입니다.
 *
 * 주요 기능 및 아키텍처:
 * 1. 3개의 추천 설계안을 나란히(Side-by-Side) 그리드로 배치하여 담보 및 가입금액 비교 뷰 제공
 * 2. 3개의 개별 Ag-Grid 인스턴스 간 세로 스크롤 동기화(.ag-body-viewport의 scrollTop) 기법 적용
 * 3. 락(Lock) 제어를 적용하여 동기화 이벤트 발생 시 서로를 무한 호출하는 스크롤 루프 현상 방지
 * 4. 각 설계안에 포함된 담보 보험료(field3)의 실시간 총합 집계(Array.reduce) 및 화면 출력
 */

import type { BodyScrollEvent, ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths, numberValueFormatter } from '@aggrid'; // 2026-05-29 tooltip 추가
import { Gcol, Grow, Typo, Grid } from '@atoms';

import { DialogBottomInfo } from '@common/DialogBottomInfo';
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

import '@/shared/lib/agGridPub';

/**
 * 추천설계 비교 그리드 데이터 행(Row) 타입 정의
 */
type DummyDataType = {
  id: number;
  field1: string | number; // 담보명
  field2: string | number; // 가입금액
  field3: string | number; // 보험료
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

  // --- 그리드 공통 컬럼 정의 ---
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      // 글자 크기나 컬럼 너비를 초과하여 말줄임(...) 처리되었을 때, 마우스 오버 시 풀네임 툴팁 표시
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
    },
    {
      headerName: '가입금액(만원)',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(90), // 가로폭 동적 계산 적용
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter, // 금액 값에 천단위 콤마 포맷팅 적용
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80), // 가로폭 동적 계산 적용
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter, // 보험료 값에 천단위 콤마 포맷팅 적용
    },
  ];

  // =====================
  // AG Grid 간 세로 스크롤 동기화 로직
  // =====================

  // 3개 그리드의 컨테이너 DOM Element 노드들을 참조하는 Ref 배열
  const gridContainerRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  // 스크롤 이벤트가 전파되며 서로를 무한 호출하는 스크롤 루프 현상을 방지하기 위한 Lock 플래그
  const isSyncingBodyScroll = React.useRef(false);

  /**
   * 대상 그리드 컨테이너 내부의 실제 스크롤 뷰포트(.ag-body-viewport) 엘리먼트를 찾아서
   * 기준 스크롤 높이값(scrollTop)을 주입해 동기화해주는 함수입니다.
   */
  const setGridBodyScrollTop = React.useCallback((container: HTMLDivElement, top: number) => {
    const viewport = container.querySelector('.ag-body-viewport');

    // ag-Grid 렌더러가 올바르게 Div 형태로 마운트되어 있는지 타입 체킹
    if (!(viewport instanceof HTMLDivElement)) {
      return;
    }

    // 소수점 스크롤 편차나 무의미한 1px 미만의 스크롤 갱신 요구는 리렌더링 방지를 위해 스킵
    if (Math.abs(viewport.scrollTop - top) > 1) {
      viewport.scrollTop = top;
    }
  }, []);

  /**
   * 임의의 그리드에서 세로 스크롤 이벤트(onBodyScroll)가 발생했을 때 호출되는 연동 핸들러
   * - `sourceIndex`: 이벤트를 최초로 유발한 그리드의 인덱스 (0, 1, 2)
   * - `event`: Ag-Grid 바디 스크롤 이벤트 객체
   */
  const handleGridBodyScroll = React.useCallback(
    (sourceIndex: number, event: BodyScrollEvent<DummyDataType>) => {
      // 1. 이미 다른 그리드가 스크롤을 동기화 중(Lock)이거나 가로 스크롤인 경우에는 무시
      if (isSyncingBodyScroll.current || event.direction !== 'vertical') {
        return;
      }

      // 2. 동기화 작업을 시작하므로 Lock 플래그를 true로 선언
      isSyncingBodyScroll.current = true;

      // 3. 최초 발생한 그리드(sourceIndex)를 제외한 나머지 그리드의 scrollTop을 강제 보정
      gridContainerRefs.current.forEach((container, index) => {
        if (!container || index === sourceIndex) {
          return;
        }

        setGridBodyScrollTop(container, event.top);
      });

      // 4. 다음 브라우저 렌더링 프레임(requestAnimationFrame) 시점에 Lock 플래그를 안전하게 해제
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
                  {/* 
                    스크롤 동기화를 위한 ag-Grid 컨테이너
                    - 루프 인덱스(i: 0, 1, 2)에 따라 각 그리드의 DOM Element 참조를 `gridContainerRefs` 배열에 저장합니다.
                  */}
                  <div
                    className="ag-theme-alpine w-full min-h-[20.8rem] "
                    ref={(el) => {
                      gridContainerRefs.current[i] = el;
                    }}
                  >
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      // 루프 인덱스(i)에 맞춰 각각 독립적인 비교용 로우 데이터 바인딩
                      rowData={i === 0 ? rowData1 : i === 1 ? rowData2 : rowData3}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        suppressMovable: true, // 사용자의 임의 컬럼 드래그 이동 비활성화
                        sortable: false, // 추천설계비교 화면에서는 정렬 비활성화 (3개 그리드 순서가 어긋날 수 있음)
                        resizable: true, // 컬럼 크기 조절 허용
                      }}
                      tooltipShowMode="whenTruncated" // 컬럼 너비 초과 시에만 툴팁 노출
                      tooltipShowDelay={0}
                      // [중요] 사용자가 본 그리드를 스크롤할 때, 다른 2개 그리드의 세로 스크롤도 실시간 동기화
                      onBodyScroll={(event) => {
                        handleGridBodyScroll(i, event);
                      }}
                      animateRows={false}
                    />
                  </div>

                  {/* 예상보험료 요약 영역 */}
                  <Grow
                    className="flex h-[3rem] w-full border-t border-t-[var(--color-primary-50)] bg-[var(--color-primary-10)] border-t-[0.1rem] border-b border-b-[var(--color-gray-15)] px-[0.6rem] text-[1.3rem]"
                    placement="bwc"
                  >
                    <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                      예상보험료
                    </Typo>
                    <Typo tag={'span'} variant={'body-md'} weight={'bold'} className="text-[var(--color-primary-50)]">
                      {(() => {
                        // 1. 해당 그리드에 바인딩된 로우 데이터를 조회
                        const data = i === 0 ? rowData1 : i === 1 ? rowData2 : rowData3;
                        // 2. 각 담보 보험료(field3)의 값을 문자 정제 후 누적하여 총합 계산
                        const sum = data.reduce(
                          (acc, cur) =>
                            acc +
                            (typeof cur.field3 === 'number'
                              ? cur.field3
                              : Number(cur.field3.toString().replace(/[^\d.-]/g, ''))),
                          0
                        );
                        // 3. 천단위 콤마 포맷팅 후 반환
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
