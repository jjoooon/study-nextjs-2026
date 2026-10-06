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
import { Badge } from '@uiux/Badge';
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

type GroupTabItem = {
  id: number;
  name: string;
  sum?: number;
  value: string;
};
const DATA_TABS: GroupTabItem[] = [
  {
    id: 1,
    name: '직업정보(상해급수)변경대상',
    sum: 6,
    value: 'tab1',
  },
  {
    id: 2,
    name: '이륜차부담보 변경대상',
    sum: 10,
    value: 'tab2',
  },
];

// 직업 데이터 타입
type JobDataType = {
  id: number;
  targetStatus: string;
  policyNumber: string;
  changedDesignNumber: string;
  beforeInjuryGrade: string;
  beforeJobName: string;
  afterInjuryGrade: string;
  afterJobName: string;
};

// 직업 더미 데이터
const JobDummyData: JobDataType[] = [
  {
    id: 1,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678901',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '1',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '1',
    afterJobName: '-',
  },
  {
    id: 2,
    targetStatus: '변경대상',
    policyNumber: 'LA12345678901',
    changedDesignNumber: '계약변경설계이동',
    beforeInjuryGrade: '2',
    beforeJobName: '회사 사무직 종사자',
    afterInjuryGrade: '2',
    afterJobName: '회사 사무직 종사자',
  },
];

// 이륜차부담보 더미 데이터
const BicycleDummyData: DummyData2Type[] = [
  {
    id: 1,
    field01: '변경대상',
    field02: 'LA12345678901',
    field03: '계약변경설계이동',
    field04: '미가입',
    field05: '가입',
  },
  {
    id: 2,
    field01: '변경대상',
    field02: 'LA12345678902',
    field03: '계약변경설계이동',
    field04: '가입',
    field05: '미가입',
  },
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

  const jobColumnDefs: (ColDef<JobDataType> | ColGroupDef<JobDataType>)[] = [
    {
      headerName: '대상여부',
      field: 'targetStatus',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      width: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
    {
      headerName: '증권번호',
      field: 'policyNumber',
      flex: 1,
      minWidth: attributeColumnWidth(100),
      cellClass: 'text-center',
    },
    {
      headerName: '변경설계번호',
      field: 'changedDesignNumber',
      flex: 1,
      minWidth: attributeColumnWidth(120),
      cellClass: 'text-center',
      cellRenderer: (params: { value: string | number }) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          {params.value}
        </Button>
      ),
    },
    {
      headerName: '변경전 직업정보',
      headerGroupComponent: () => (
        <Grow placement="cc" className="w-full">
          <span className="font-bold text-[1.3rem]!">변경전 직업정보</span>
        </Grow>
      ),
      headerClass: 'border-r-1 border-[#E5E5E5]',
      children: [
        {
          headerName: '상해급수',
          field: 'beforeInjuryGrade',
          flex: 1,
          minWidth: attributeColumnWidth(60),
          cellClass: 'text-center',
        },
        {
          headerName: '직업',
          field: 'beforeJobName',
          flex: 10,
          cellClass: 'text-center',
        },
      ],
    },
    {
      headerName: '변경후 직업정보',
      headerGroupComponent: () => (
        <Grow placement="cc" className="w-full">
          <span className="font-bold text-[1.3rem]!">변경후 직업정보</span>
        </Grow>
      ),
      headerClass: 'border-r-0!',
      children: [
        {
          headerName: '상해급수',
          field: 'afterInjuryGrade',
          flex: 1,
          minWidth: attributeColumnWidth(60),
          cellClass: 'text-center',
        },
        {
          headerName: '직업',
          field: 'afterJobName',
          flex: 10,
          headerClass: 'border-r-0!',
          cellStyle: { borderRight: 'none' },
          cellClass: 'text-center border-r-0!',
        },
      ],
    },
  ];

  // '이륜차부담보 변경대상' 탭의 Ag-Grid 컬럼 정의
  const columnDefs1: ColDef<DummyData2Type>[] = [
    {
      headerName: '대상여부',
      field: 'field01',
      minWidth: attributeColumnWidth(70),
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
      cellRenderer: (params: ICellRendererParams<DummyData2Type, string | number>) => (
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
  const [rowData1, setRowData1] = React.useState<JobDataType[]>(JobDummyData);
  // '이륜차부담보 변경대상' 탭의 그리드 데이터
  const [rowData2, setRowData2] = React.useState<DummyData2Type[]>(BicycleDummyData); // 2026-05-27 agGrid 추가

  // 탭 이동 시 ag-grid 데이터를 비동기 조회하는 연출을 위한 로컬 로딩 상태
  const [isLocalLoading, setIsLocalLoading] = React.useState(false);
  // 이미 데이터를 '실제로 바인딩 완료'한 탭 목록 추적
  const loadedTabsRef = React.useRef<Set<string>>(new Set());
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // 데이터 구조 Normalize 함수 (DummyData1Type 과 JobDataType 모두 호환)
  const parseJobGridData = React.useCallback((dataList?: (JobDataType | DummyData1Type)[]): JobDataType[] => {
    if (!dataList || dataList.length === 0) return JobDummyData;
    return dataList.map((item, idx) => {
      if ('targetStatus' in item && item.targetStatus !== undefined) {
        return item as JobDataType;
      }
      const d = item as DummyData1Type;
      return {
        id: d.id ?? idx + 1,
        targetStatus: String(d.field01 ?? '변경대상'),
        policyNumber: String(d.field02 ?? ''),
        changedDesignNumber: String(d.field03 ?? '계약변경설계이동'),
        beforeInjuryGrade: String(d.field04 ?? ''),
        beforeJobName: String(d.field05 ?? ''),
        afterInjuryGrade: String(d.field06 ?? ''),
        afterJobName: String(d.field07 ?? ''),
      };
    });
  }, []);

  // 특정 탭에 데이터를 로드하는 함수
  const loadTabData = React.useCallback(
    (tabValue: string) => {
      // 이미 로드 완료되었거나 이미 처리 중인 경우 스킵
      if (loadedTabsRef.current.has(tabValue)) {
        return;
      }

      // 동기 setState 경고를 우회하기 위해 비동기 틱으로 로딩 상태를 전환합니다.
      setTimeout(() => {
        setIsLocalLoading(true);
      }, 0);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        if (tabValue === 'tab1' || tabValue === 'basic') {
          const finalData1 = parseJobGridData(data?.grid1);
          setRowData1(finalData1);
        } else if (tabValue === 'tab2' || tabValue === 'detail') {
          const finalData2 = data?.grid2 && data.grid2.length > 0 ? data.grid2 : BicycleDummyData;
          setRowData2(finalData2);
        }
        loadedTabsRef.current.add(tabValue);
        setIsLocalLoading(false);
        timerRef.current = null;
      }, 500);
    },
    [data, parseJobGridData]
  );

  // props인 data?.grid1, data?.grid2가 부모로부터 업데이트되었을 때의 처리 (예: 비동기 데이터 리졸브)
  const [prevGrid1, setPrevGrid1] = React.useState<DummyData1Type[] | undefined>(undefined);
  const [prevGrid2, setPrevGrid2] = React.useState<DummyData2Type[] | undefined>(undefined);

  // 부모로부터 진짜 새 데이터셋이 들어온 경우 캐시 및 기존 바인딩 리셋
  if (data?.grid1 !== prevGrid1 || data?.grid2 !== prevGrid2) {
    setPrevGrid1(data?.grid1);
    setPrevGrid2(data?.grid2);
    loadedTabsRef.current.clear();
    setRowData1(parseJobGridData(data?.grid1));
    setRowData2(data?.grid2 && data.grid2.length > 0 ? data.grid2 : BicycleDummyData);
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
    loadTabData(active);
  }, [active, loadTabData]);

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
      <DialogContent showCloseButton resizable={true} size="lg" className="max-h-[90vh] flex flex-col">
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
        <DialogSection className="grid-rows-[auto_1fr] min-h-0 overflow-hidden flex-1">
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
          <Grid className="w-full h-full grid-rows-[auto_1fr] min-h-0 overflow-hidden" gap={3}>
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
              getValue={(t) => String(t.value)}
              renderTab={(tab) => (
                <Grow className="items-center" gap={1}>
                  <span>{tab.name}</span>
                  {tab.sum !== undefined && (
                    <Badge
                      variant={'rounded'}
                      color={'primary'}
                      className="font-bold min-w-[1.8rem]"
                    >{`${tab.sum}`}</Badge>
                  )}
                </Grow>
              )}
              visibleCount={4}
              removable={false}
              contentClass="relative h-full max-h-[360px] overflow-y-auto pr-1"
            >
              <Grid className="w-full gap-4 py-2">
                {/* '직업정보(상해급수)변경대상' 탭 내용 */}
                {active === 'tab1' || active === 'basic' ? (
                  <Gcol gap={6} className="w-full" placement="ss">
                    <Gcol gap={2} placement="ss" className="w-full">
                      <Gcol gap={1} placement="ss">
                        <Typo>
                          <b>김한화</b>이륜차부담보 정보(현재 설계기준): <b>1급, 회사 사무직 종사자</b>
                        </Typo>
                        <Typo>
                          직업정보(상해급수): <b>상이 계약 2건</b>
                        </Typo>
                      </Gcol>
                      <div className="ag-theme-alpine w-full">
                        <AgGridReact<JobDataType>
                          loading={loading || isLocalLoading}
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData1}
                          columnDefs={jobColumnDefs}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            suppressMovable: true,
                          }}
                          headerHeight={30}
                          rowHeight={30}
                          domLayout="autoHeight"
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
                          animateRows={false}
                        />
                      </div>
                    </Gcol>

                    <Gcol gap={2} placement="ss" className="w-full">
                      <Gcol gap={1} placement="ss">
                        <Typo>
                          <b>김한화</b> 고객님 직업정보(현재 설계 기준): <b>1급, 회사 사무직 종사자</b>
                        </Typo>
                        <Typo>
                          직업정보(상해급수): <b>상이 계약 2건</b>
                        </Typo>
                      </Gcol>
                      <div className="ag-theme-alpine w-full">
                        <AgGridReact<JobDataType>
                          loading={loading || isLocalLoading}
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={rowData1}
                          columnDefs={jobColumnDefs}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            suppressMovable: true,
                          }}
                          headerHeight={30}
                          rowHeight={30}
                          domLayout="autoHeight"
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
                          animateRows={false}
                        />
                      </div>
                    </Gcol>
                  </Gcol>
                ) : (
                  // '이륜차부담보 변경대상' 탭 내용
                  <Gcol gap={6} className="w-full" placement="ss">
                    <Gcol gap={2} placement="ss" className="w-full">
                      <Gcol gap={1} placement="ss">
                        <Typo>
                          <b>김한화</b> 고객님 이륜차부담보 정보(현재 설계기준): <b>가입여부</b>
                        </Typo>
                        <Typo>
                          이륜차부담보 가입: <b>상이 계약 2건</b>
                        </Typo>
                      </Gcol>
                      <div className="ag-theme-alpine w-full">
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
                          headerHeight={30}
                          rowHeight={30}
                          domLayout="autoHeight"
                          loadingOverlayComponent={CustomGridLoadingOverlay}
                          loadingOverlayComponentParams={{ loadingMessage: '조회 중입니다...' }}
                        />
                      </div>
                    </Gcol>

                    <Gcol gap={2} placement="ss" className="w-full">
                      <Gcol gap={1} placement="ss">
                        <Typo>
                          <b>김한화</b> 고객님 이륜차부담보 정보(현재 설계기준): <b>가입여부</b>
                        </Typo>
                        <Typo>
                          이륜차부담보 가입: <b>상이 계약 2건</b>
                        </Typo>
                      </Gcol>
                      <div className="ag-theme-alpine w-full">
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
                          headerHeight={30}
                          rowHeight={30}
                          domLayout="autoHeight"
                          loadingOverlayComponent={CustomGridLoadingOverlay}
                          loadingOverlayComponentParams={{ loadingMessage: '조회 중입니다...' }}
                        />
                      </div>
                    </Gcol>
                  </Gcol>
                )}
                {/* M1. 수정 */}
                <Gcol variant={'box-detail'} placement={'ss'} className="w-full">
                  <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                    &apos;이륜자동차운전중상해부담보특별약관&apos;이란?
                  </Typo>
                  <BulletList>
                    <BulletListItem size={'sm'} type="dash">
                      보험계약을 체결할 때 계약자의 청약과 회사의 승낙으로 보험계약에 부가하여 이루어지는 약관으로
                      피보험자가 이륜자동차를 소유, 사용, 관리하는 경우에 한합니다.
                    </BulletListItem>
                    <BulletListItem size={'sm'} type="dash">
                      회사는 피보험자가 보험기간 중 이륜자동차를 운전(탑승 포함)하는 중에 발생한 급격하고도 우연한
                      외래의 상해사고를 직접적인 원인으로 보험계약에서 정한 보험금 지급사유가 발생한 경우에는 보험금을
                      지급하지 않습니다.
                    </BulletListItem>
                    <BulletListItem className="mt-2" size={'sm'} type="dot">
                      이륜차 운전자는 이륜자동차운전중상해부담보특약을 반드시 가입해야 합니다.
                    </BulletListItem>
                    <BulletListItem size={'sm'} type="dot">
                      가입하신 계약 간 &apos;이륜차 운전여부 및 이륜차부담보 가입여부&apos;가 상이할 경우, 보험금 지급이
                      제한될 수 있습니다.
                    </BulletListItem>
                    <BulletListItem size={'sm'} type="dot">
                      변경대상의 경우 계약변경설계화면으로 이동하여 진행바랍니다. (계약변경설계이동 클릭시
                      변경설계화면으로 이동)
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
