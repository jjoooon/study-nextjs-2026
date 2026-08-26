/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, useDynamicColumnWidths, CustomGridLoadingOverlay } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
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

type LTPZ051Tab = { name: string; value: string; label: string };
const DATA_TABS: LTPZ051Tab[] = [
  { name: '직업정보(상해급수)변경대상(d건)', value: 'basic', label: '직업정보(상해급수)변경대상(d건)' },
  { name: '이륜차부담보 변경대상(d건)', value: 'detail', label: '이륜차부담보 변경대상(d건)' },
];

// '직업정보(상해급수)변경대상' 탭의 그리드 데이터 타입 정의
export type DummyData1Type = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};
export type DummyData2Type = {
  // '이륜차부담보 변경대상' 탭의 그리드 데이터 타입 정의
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
};

export interface Ltpz051Props {
  data?: {
    grid1?: DummyData1Type[];
    grid2?: DummyData2Type[];
  };
  loading?: boolean;
}

// Ltpz051: 고객 직업정보(상해급수) 또는 이륜차부담보 변경 안내 팝업 컴포넌트
const Ltpz051 = ({ data, loading }: Ltpz051Props) => {
  // 화면 배율에 따른 동적 컬럼 너비 계산 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 탭 상태 관리 (직업정보 변경대상 / 이륜차부담보 변경대상)
  const { tabs, active, setActive } = useTabs(DATA_TABS);
  // '직업정보(상해급수)변경대상' 탭의 Ag-Grid 컬럼 정의
  const columnDefs: (ColDef<DummyData1Type> | ColGroupDef<DummyData1Type>)[] = [
    {
      headerName: '대상여부',
      minWidth: attributeColumnWidth(60),
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      // 2026-05-27 링크로 변경
    },
    {
      headerName: '증권번호',
      minWidth: attributeColumnWidth(120),
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경설계번호',
      minWidth: attributeColumnWidth(110),
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0!',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyData1Type, string | number>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field03}
        </Button>
      ),
      // 변경전 직업정보 그룹 헤더
    },
    {
      headerName: '변경전 직업정보',
      headerClass: 'ag-header-right-divider',
      children: [
        {
          headerName: '상해급수',
          minWidth: attributeColumnWidth(60),
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyData1Type>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field04 ?? '')}</Typo>
          ),
        },
        {
          headerName: '직업',
          flex: 5,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyData1Type>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field05 ?? '')}</Typo>
          ),
        },
        // 변경후 직업정보 그룹 헤더
      ],
    },
    {
      headerName: '변경후 직업정보',
      children: [
        {
          headerName: '상해급수',
          minWidth: attributeColumnWidth(60),
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyData1Type>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field06 ?? '')}</Typo>
          ),
        },
        {
          headerName: '직업',
          flex: 5,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyData1Type>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field07 ?? '')}</Typo>
          ),
        },
      ],
    },
  ];

  // '이륜차부담보 변경대상' 탭의 Ag-Grid 컬럼 정의
  const columnDefs1: ColDef<DummyData2Type>[] = [
    {
      headerName: '대상여부',
      field: 'field01',
      minWidth: attributeColumnWidth(60),
      flex: 1,
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '증권번호',
      field: 'field02',
      minWidth: attributeColumnWidth(120),
      flex: 1,
      // 2026-05-27 링크로 변경
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '변경설계번호',
      field: 'field03',
      minWidth: attributeColumnWidth(110),
      flex: 1,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyData1Type, string | number>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.data?.field03}
        </Button>
      ),
    },
    {
      headerName: '변경전 가입여부',
      flex: 10,
      field: 'field04',
      cellClass: 'text-center',
      autoHeight: true,
    },
    {
      headerName: '변경후 가입여부',
      flex: 10,
      field: 'field05',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];

  // '직업정보(상해급수)변경대상' 탭의 그리드 데이터
  const [rowData1, setRowData1] = React.useState<DummyData1Type[]>([]);
  // '이륜차부담보 변경대상' 탭의 그리드 데이터
  const [rowData2, setRowData2] = React.useState<DummyData2Type[]>([]); // 2026-05-27 agGrid 추가

  // 탭 이동 시 ag-grid 데이터를 비동기 조회하는 연출을 위한 로컬 로딩 상태
  const [isLocalLoading, setIsLocalLoading] = React.useState(false);
  // 이미 데이터를 '실제로 바인딩 완료'한 탭 목록 추적
  const loadedTabsRef = React.useRef<Set<string>>(new Set());
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // 특정 탭에 데이터를 로드하는 함수
  const loadTabData = React.useCallback(
    (tabValue: string) => {
      // 이미 로드 완료되었거나, 해당 탭의 원본 데이터가 아직 부모로부터 준비되지 않은 경우 스킵
      if (loadedTabsRef.current.has(tabValue)) {
        return;
      }

      if (tabValue === 'basic') {
        if (!data?.grid1) return; // 부모 데이터가 아직 안 온 경우 대기

        // 동기 setState 경고를 우회하기 위해 비동기 틱으로 로딩 상태를 전환합니다.
        setTimeout(() => {
          setIsLocalLoading(true);
        }, 0);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          setRowData1(data.grid1 ?? []);
          loadedTabsRef.current.add('basic');
          setIsLocalLoading(false);
          timerRef.current = null;
        }, 500);
      } else if (tabValue === 'detail') {
        if (!data?.grid2) return; // 부모 데이터가 아직 안 온 경우 대기

        // 동기 setState 경고를 우회하기 위해 비동기 틱으로 로딩 상태를 전환합니다.
        setTimeout(() => {
          setIsLocalLoading(true);
        }, 0);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          setRowData2(data.grid2 ?? []);
          loadedTabsRef.current.add('detail');
          setIsLocalLoading(false);
          timerRef.current = null;
        }, 500);
      }
    },
    [data]
  );

  // props인 data?.grid1, data?.grid2가 부모로부터 업데이트되었을 때의 처리 (예: 비동기 데이터 리졸브)
  const [prevGrid1, setPrevGrid1] = React.useState<DummyData1Type[] | undefined>(undefined);
  const [prevGrid2, setPrevGrid2] = React.useState<DummyData2Type[] | undefined>(undefined);

  // 부모로부터 진짜 새 데이터셋이 들어온 경우 캐시 및 기존 바인딩 리셋
  if (data?.grid1 !== prevGrid1 || data?.grid2 !== prevGrid2) {
    setPrevGrid1(data?.grid1);
    setPrevGrid2(data?.grid2);
    loadedTabsRef.current.clear();
    setRowData1([]);
    setRowData2([]);
  }

  // 탭 이동 시 탭 데이터를 로드하는 이벤트 핸들러
  const handleTabChange = React.useCallback(
    (tabValue: string) => {
      setActive(tabValue);
      loadTabData(tabValue);
    },
    [setActive, loadTabData]
  );

  // 부모 데이터가 준비되었고 현재 활성화된 탭이 아직 로드되지 않은 상태라면 로드 처리
  React.useEffect(() => {
    if (data) {
      loadTabData(active);
    }
  }, [data, active, loadTabData]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    // Dialog 컴포넌트: 팝업 창을 렌더링합니다.
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고객 직업정보(상해급수)변경안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ051)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round">
            {/* 상품명 및 설계번호 표시 폼 */}
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'상품명'}>
                  <Input value={'한화 3N5 더 간편건강보험(세만기형) 무배당 2601'} variant="info" readOnly />
                </FormCell>
                <FormCell title={'설계번호'}>
                  <Input value={'LA123123123123'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          {/* 팝업 본문 영역 */}
          <Grid className="w-full grid-rows-[auto_1fr]" gap={3}>
            <Gcol gap={2}>
              <Gcol variant={'box-info'}>
                <Typo variant="body-sm" icon={'info'}>
                  {/* 안내 메시지 */}
                  고객 직업정보(상해급수) 또는 이륜차부담보 가입여부가 불일치 할 경우 신계약 체결이 불가능합니다. 해당
                  신계약 청약완료 이전에 기계약의 직업변경 또는 이륜차부담보 변경 완료 필요. 또한, 신계약 청약서 발행
                  이전에 배서(청약중 이후) 진행 필요
                </Typo>
              </Gcol>
              <Gcol className="w-full" placement="ss" variant="box-warning-line">
                <Typo variant="body-sm">
                  {/* 체크박스 옵션 */}
                  <Checkbox>
                    계약변경 설계 청약서 발급 및 확인서명을 조건으로 청약 진행합니다.(단, 계약변경 미완료시{' '}
                    <Typo weight="bold" color="primary">
                      신계약 청약완료불가
                    </Typo>
                    )
                  </Checkbox>
                </Typo>
              </Gcol>
            </Gcol>
            {/* 탭 페이저 컴포넌트 */}
            <TabPager
              data={tabs}
              active={active}
              setActive={handleTabChange}
              hasTableBelow={true}
              getValue={(t) => t.value}
              renderTab={(t) => t.label ?? t.value}
              visibleCount={4}
              removable={false}
            >
              <Grid className="grid-rows-[1fr_auto] h-full" gap={2}>
                {/* '직업정보(상해급수)변경대상' 탭 내용 */}
                {active === 'basic' ? (
                  <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                    {/* 고객명 및 직업정보 폼 */}
                    <FormTable
                      caption="직업 상세"
                      cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}
                      lineTop={false}
                    >
                      <FormRow>
                        <FormCell title={'고객명'}>김한화</FormCell>
                        <FormCell
                          title={
                            <>
                              직업정보
                              <br />
                              (현재 설계기준)
                            </>
                          }
                        >
                          1급/회사원
                        </FormCell>
                      </FormRow>
                    </FormTable>
                    {/* 직업정보(상해급수) 상이 계약 그리드 */}
                    <Gcol>
                      <Grow className="w-full" gap={1} placement="se">
                        <Typo variant="body-md" color="default">
                          직업정보(상해급수) 상이 계약
                        </Typo>
                        <Typo variant="body-md" weight={'bold'} color="primary">
                          99건
                        </Typo>
                      </Grow>
                      <div className="ag-theme-alpine inner-scroll" data-row={rowData1.length}>
                        <AgGridReact<DummyData1Type>
                          loading={loading || isLocalLoading}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData1}
                          columnDefs={columnDefs}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                          }}
                          domLayout="normal"
                          loadingOverlayComponent={CustomGridLoadingOverlay}
                          loadingOverlayComponentParams={{ loadingMessage: '조회 중입니다...' }}
                        />
                      </div>
                    </Gcol>
                  </Grid>
                ) : (
                  // '이륜차부담보 변경대상' 탭 내용
                  <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={3}>
                    {/* 고객명 및 직업정보 폼 */}
                    <FormTable
                      caption="직업 상세"
                      cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}
                      lineTop={false}
                    >
                      <FormRow>
                        <FormCell title={'고객명'}>김한화2</FormCell>
                        <FormCell
                          title={
                            <>
                              이륜차부담보 정보
                              <br />
                              (현재 설계기준)
                            </>
                          }
                        >
                          1급/회사원2
                        </FormCell>
                      </FormRow>
                    </FormTable>
                    {/* 이륜차부담보 가입 상이 계약 그리드 */}
                    <Gcol>
                      <Grow className="w-full" gap={1} placement="se">
                        <Typo variant="body-md" color="default">
                          이륜차부담보 가입 상이 계약
                        </Typo>
                        <Typo variant="body-md" weight={'bold'} color="primary">
                          99건
                        </Typo>
                      </Grow>
                      {/* 2026-05-27 agGrid 수정 */}
                      <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                        <AgGridReact<DummyData2Type>
                          loading={loading || isLocalLoading}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs1}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                          }}
                          domLayout="normal"
                          loadingOverlayComponent={CustomGridLoadingOverlay}
                          loadingOverlayComponentParams={{ loadingMessage: '조회 중입니다...' }}
                        />
                      </div>
                    </Gcol>
                  </Grid>
                )}
                {/* M1. 수정 */}
                <Gcol variant={'box-detail'} placement={'ss'} className="w-full">
                  <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                    신규설계의 직업정보가 정확할 경우: 기계약 직업 변경배서 진행(변경설계가 청약중 이후이고 변경후
                    직업정보(상해급수)가 일치하여야 신계약 청약서 발행가능함)
                  </Typo>
                  <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                    기계약의 직업정보가 정확할 경우: 고객정보화면의 직업정보 변경 후 피보험자를 다시 불러온 후 신계약
                    설계 진행
                  </Typo>
                  <BulletList>
                    <BulletListItem size={'sm'} type="dash">
                      직업정보는 현재기분[2026.01.01] 기준으로 표기되고 있습니다. (구 직업코드의 경우 현재 기준으로
                      매핑한 결과로 비교함)
                    </BulletListItem>
                    <BulletListItem size={'sm'} type="dash">
                      변경대상의 경우 계약변경설계화면으로 이동하여 진행바랍니다.(계약변경설계이동 클릭시
                      변경설계화면으로 이동)
                    </BulletListItem>
                    <BulletListItem size={'sm'} type="dash">
                      상해급수가 동일하더라도 고객님의 정확한 직업정보의 관리를 위하려 재확인 바랍니다.
                    </BulletListItem>
                    {/* M2. 수정 */}
                    <BulletListItem className="mt-2" size={'sm'} type="dot">
                      관련문서: [대내-1507-1552]직업정보(상해급수) 일지 관련 신계약 프로세스 변경통보, 장기계약관리파트
                    </BulletListItem>
                  </BulletList>
                </Gcol>
              </Grid>
            </TabPager>
            {/* 팝업 푸터 영역 */}
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          {/* 하단 공통 정보 (연락처 등) */}
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz051;
