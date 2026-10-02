/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Typo, Grow } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { TabPager } from '@common/TabPager';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

// 직업
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

// 직업
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

type GroupTabItem = {
  id: number;
  name: string;
  sum?: number;
  value: string;
};
const groupTabs: GroupTabItem[] = [
  {
    id: 1,
    name: '직업정보(상해급수)변경대상',
    sum: 6,
    value: 'tab1',
  },
];

interface Ltpz00503Props {
  onClose?: () => void;
}

const Ltpz00503 = ({ onClose }: Ltpz00503Props) => {
  const { tabs, active, setActive } = useTabs<{
    name?: string;
    sum?: number;
    value: string;
  }>(groupTabs);
  const { attributeColumnWidth } = useDynamicColumnWidths();
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

  return (
    // M2. 디자인 변경으로 수정
    <Grid className="w-full grid-rows-[1fr_auto] gap-[2rem]">
      <div
        className="relative [&>div]:absolute [&>div]:p-3 [&>div]:top-0 [&>div]:left-0 w-[calc[+
    100%+1rem]] h-full rounded-tr-[1rem] overflow-hidden rounded-br-[1rem] rounded-bl-[1rem] border-[0.1rem]! border-solid border-[#ccc]"
      >
        <div className="overflow-x-hidden overflow-y-auto w-full h-full">
          <Grid className="w-full grid-rows-[auto_1fr_auto] h-full" gap={3}>
            <Gcol gap={1}>
              <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                <Typo variant={'body-sm'} icon={'info'}>
                  고객 직업정보(상해급수)가 불일치 할 경우 <b>신계약 체결이 불가능</b>합니다. 해당 신계약 청약완료
                  이전에 기계약의 작업변경을 완료하시기 바랍니다.
                </Typo>

                <Typo variant={'body-sm'} icon={'info'}>
                  <b>신계약 청약서 발행 이전에 기계약의 직업변경 배서(청약중 이후)를 진행</b>바랍니다.
                </Typo>
              </Gcol>
            </Gcol>

            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              visibleCount={5}
              getValue={(tab) => String(tab.value)}
              renderButtons={false}
              renderTab={(tab) => (
                <Grow className="items-center" gap={1}>
                  <span>{tab.name}</span>
                  <Badge
                    variant={'rounded'}
                    color={'primary'}
                    className="font-bold min-w-[1.8rem]"
                  >{`${tab.sum}`}</Badge>
                </Grow>
              )}
              renderDropdownItem={false}
              contentClass="relative overflow-y-auto"
            >
              <Gcol gap={6} className="absolute w-full h-full py-3" placement="ss">
                <Gcol gap={2} placement="ss">
                  <Gcol gap={1} placement="ss">
                    <Typo>
                      <b>김한화</b> 고객님 직업정보(현재 설계 기준): <b>2급/제품 및 광고영업원</b>
                    </Typo>
                    <Typo>
                      직업정보(상해급수): <b>상이 계약 2건</b>
                    </Typo>
                  </Gcol>
                  <div className="ag-theme-alpine">
                    <AgGridReact<JobDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={JobDummyData}
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

                <Gcol gap={2} placement="ss">
                  <Gcol gap={1} placement="ss">
                    <Typo>
                      <b>김한화</b> 고객님 직업정보(현재 설계 기준): <b>2급/제품 및 광고영업원</b>
                    </Typo>
                    <Typo>
                      직업정보(상해급수): <b>상이 계약 2건</b>
                    </Typo>
                  </Gcol>
                  <div className="ag-theme-alpine">
                    <AgGridReact<JobDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={JobDummyData}
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
            </TabPager>

            <Gcol variant={'box-detail'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                신규설계의 직업정보가 정확할 경우: 기계약 직업 변경배서 진행(변경설계가 청약중 이후이고 변경후
                직업정보(상해급수)가 일치하여야 신계약 청약서 발행가능함)
              </Typo>
              <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                기계약의 직업정보가 정확할 경우: 고객정보화면의 직업정보 변경 후 피보험자를 다시 불러온 후 신계약 설계
                진행
              </Typo>
              <BulletList>
                <BulletListItem size={'sm'} type="dash">
                  직업정보는 현재기분[2026.01.01] 기준으로 표기되고 있습니다. (구 직업코드의 경우 현재 기준으로 매핑한
                  결과로 비교함)
                </BulletListItem>
                <BulletListItem size={'sm'} type="dash">
                  변경대상의 경우 계약변경설계화면으로 이동하여 진행바랍니다.(계약변경설계이동 클릭시 변경설계화면으로
                  이동)
                </BulletListItem>
                <BulletListItem size={'sm'} type="dash">
                  상해급수가 동일하더라도 고객님의 정확한 직업정보의 관리를 위하려 재확인 바랍니다.
                </BulletListItem>
                <BulletListItem className="mt-2" size={'sm'} type="dot">
                  관련문서: [대내-1507-1552]직업정보(상해급수) 일치 관련 신계약 프로세스 변경통보, 장기계약관리파트
                </BulletListItem>
              </BulletList>
            </Gcol>
          </Grid>
        </div>
      </div>
      <Grow className="w-full" placement="ec">
        <Button variant={'contained'} size={'xl'}>
          재조회
        </Button>
        <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={onClose}>
          닫기
        </Button>
      </Grow>
    </Grid>
  );
};

export default Ltpz00503;
