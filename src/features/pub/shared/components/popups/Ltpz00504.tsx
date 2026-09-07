/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Divider, Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { RecommendCard } from '@common/RecommendCard';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import Ltpz0050401 from './Ltpz0050401';
export type Ltpz005TabValue = 'common' | 'accum' | 'job' | 'expected-uw';

interface Ltpz00504Props {
  onClose?: () => void;
  recommendData?: ExpectedUwRecommendItem[];
}

type ExpectedUwRecommendItem = {
  id: number;
  isChecked?: boolean;
  type: string;
  title: React.ReactNode;
  plan: string[];
  price?: string;
  list?: string[];
};

type ExpectedUwAmountRow = {
  id: number;
  coverageName: string;
  amount: string;
};

type ExpectedUwSingleRow = {
  id: number;
  coverageName: string;
};

type ExpectedUw03Row = {
  id: number;
  coverageName: string;
  date: string;
};

//제한담보
const expectedUwLimitedCoverageData: ExpectedUwAmountRow[] = [
  {
    id: 1,
    coverageName: '보험료압입명제대상보장(8대사유)보험료압입명제대상보장(8대사유)',
    amount: '10,000',
  },
  {
    id: 2,
    coverageName: '보험료압입명제대상보장(8대사유)',
    amount: '-',
  },
];

// 보험료 할증
const expectedUwPremiumSurchargeData: ExpectedUwSingleRow[] = [
  {
    id: 1,
    coverageName: '보험료압입명제대상보장(8대사유)1보험료압입명제대상보장(8대사유)',
  },
  {
    id: 2,
    coverageName: '보험료압입명제대상보장(8대사유)1',
  },
  {
    id: 3,
    coverageName: '보험료압입명제대상보장(8대사유)1',
  },
];

//부 담보(부위/질병)
const expectedUwExclusionCoverageData: ExpectedUw03Row[] = [
  {
    id: 1,
    coverageName: '보험료압입명제대상보장(8대사유)보험료압입명제대상보장(8대사유)',
    date: '5년 0개월',
  },
  {
    id: 2,
    coverageName: '보험료압입명제대상보장(8대사유)',
    date: '5년 0개월',
  },
];
const title1 = "<b>현재 설계상품</b>내에서 <b>'인수'</b>예상 고지유형";
const title2 = "<b>간편고지유형</b>내에서 <b>'인수'</b>예상 고지유형";
const title3 = "<b>일반고지유형</b>내에서 <b>'인수/할증/부담보/감액'</b>예상 고지유형";
const expectedUwRecommendData: ExpectedUwRecommendItem[] = [
  {
    id: 1,
    isChecked: false,
    type: '인수',
    title: title1,
    plan: ['일반고지형'],
    price: '34,000원',
  },
  {
    id: 2,
    isChecked: false,
    type: '인수',
    title: title2,
    plan: ['9형(3,10,5간편고지형(고혈압및당뇨추가고지))'],
    price: '60,000원',
  },
  {
    id: 3,
    isChecked: false,
    type: '조건부인수',
    title: title3,
    plan: ['일반고지형'],
    price: '30,000원',
  },
];

const Ltpz00504 = ({ onClose, recommendData: propRecommendData }: Ltpz00504Props) => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [aiReasonOpen, setAiReasonOpen] = React.useState(false);

  // 제한담보
  const expectedUwAmountColumnDefs: (ColDef<ExpectedUwAmountRow> | ColGroupDef<ExpectedUwAmountRow>)[] = [
    {
      headerName: '제한 담보명',
      field: 'coverageName',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<ExpectedUwAmountRow>({ field: 'coverageName' }),
    },
    {
      headerName: '가입금액(원)',
      field: 'amount',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-right',
      cellRenderer: (params: { value: string | number }) => {
        const value = String(params.value ?? '');

        if (value === '-') {
          return <div className="w-full text-center">-</div>;
        }

        return value;
      },
      resizable: false,
    },
  ];

  // 보험표 할증
  const expectedUwSingleColumnDefs: (ColDef<ExpectedUwSingleRow> | ColGroupDef<ExpectedUwSingleRow>)[] = [
    {
      headerName: '담보명',
      field: 'coverageName',
      flex: 1,
      tooltipValueGetter: createTooltipValueGetter<ExpectedUwSingleRow>({ field: 'coverageName' }),
      cellStyle: { borderRight: 'none' },
    },
  ];

  // 부담보
  const expectedUw03ColumnDefs: (ColDef<ExpectedUw03Row> | ColGroupDef<ExpectedUw03Row>)[] = [
    {
      headerName: '부담보부위명',
      field: 'coverageName',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<ExpectedUw03Row>({ field: 'coverageName' }),
    },
    {
      headerName: '기간',
      field: 'date',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
      cellRenderer: (params: { value: string | number }) => {
        const value = String(params.value ?? '');

        if (value === '-') {
          return <div className="w-full text-center">-</div>;
        }

        return value;
      },
      resizable: false,
    },
  ];

  const [expectedUwLimitedCoverageRowData] = React.useState<ExpectedUwAmountRow[]>(expectedUwLimitedCoverageData);
  const [expectedUwPremiumSurchargeRowData] = React.useState<ExpectedUwSingleRow[]>(expectedUwPremiumSurchargeData);
  const [expectedUwExclusionCoverageRowData] = React.useState<ExpectedUw03Row[]>(expectedUwExclusionCoverageData);

  // AI 추천 설계안 체크 여부 상태 관리
  const [recommendData, setRecommendData] = React.useState<ExpectedUwRecommendItem[]>(
    propRecommendData ?? expectedUwRecommendData
  );

  React.useEffect(() => {
    setRecommendData(propRecommendData ?? expectedUwRecommendData);
  }, [propRecommendData]);

  // 체크된 수 계산
  const checkedCount = React.useMemo(() => {
    return recommendData.filter((item) => item.isChecked).length;
  }, [recommendData]);

  return (
    <Grid className="w-full grid-rows-[1fr_auto] gap-[2rem]">
      <div
        className="relative [&>div]:absolute [&>div]:p-3 [&>div]:top-0 [&>div]:left-0 w-[calc[+
    100%+1rem]] h-full rounded-tr-[1rem] overflow-hidden rounded-br-[1rem] rounded-bl-[1rem] border-[0.1rem]! border-solid border-[#ccc]"
      >
        <div className="overflow-x-hidden overflow-y-auto w-full h-full">
          <Gcol className="w-full" gap={3}>
            <Grow
              variant={'box-round'}
              className="w-full bg-[#374151] px-[2rem] py-[1.6rem] flex items-center gap-[2.4rem]"
            >
              <div className="w-[18rem] flex flex-col gap-1">
                <Typo tag={'p'} variant={'body-lg'} className="text-white">
                  알릴사항
                </Typo>
                <Typo tag={'strong'} variant={'heading-lg'} className="text-[#FF5C2E] text-right">
                  미입력
                </Typo>
              </div>

              <Divider className="h-[4rem] bg-[gray] opacity-20" />

              <div className="w-[18rem] flex flex-col gap-1">
                <Typo tag={'p'} variant={'body-lg'} className="text-white">
                  고지
                </Typo>
                <Typo tag={'strong'} variant={'heading-lg'} className="text-[#FF5C2E] text-right">
                  고지필요
                </Typo>
              </div>

              <Divider className="h-[4rem] bg-[gray] opacity-20" />

              <Gcol className="flex-1" gap={1}>
                <Typo tag={'p'} variant={'body-lg'} className="w-full text-white justify-start">
                  담보별 상세
                </Typo>
                <div className="w-full flex items-center justify-end">
                  <Grow className="flex gap-1 items-center">
                    <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                      거절 · 감액 · 연기
                    </Typo>
                    <Typo tag={'strong'} variant={'heading-lg'} className="text-[#FF5C2E]">
                      15개
                    </Typo>
                  </Grow>

                  <Divider className="mx-[1.2rem] h-[1.6rem] bg-[gray] opacity-20" />

                  <div className="flex gap-[1.2rem]">
                    <div className="flex gap-1 items-end">
                      <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                        서류
                      </Typo>
                      <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                        11개
                      </Typo>
                    </div>
                    <div className="flex gap-1 items-end">
                      <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                        진단/적부
                      </Typo>
                      <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                        7개
                      </Typo>
                    </div>
                    <div className="flex gap-1 items-end">
                      <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                        할증
                      </Typo>
                      <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                        10개
                      </Typo>
                    </div>
                    <div className="flex gap-1 items-end">
                      <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                        부담보
                      </Typo>
                      <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                        12개
                      </Typo>
                    </div>
                    <div className="flex gap-1 items-end">
                      <Typo tag={'span'} variant={'body-xs'} className="text-[#D8DBE0]">
                        인수
                      </Typo>
                      <Typo tag={'strong'} variant={'body-sm'} className="text-white">
                        5개
                      </Typo>
                    </div>
                  </div>
                </div>
              </Gcol>
            </Grow>
            <Gcol className="w-full" placement="ss" gap={2}>
              <Grow className="w-full" gap={5} placement="ss">
                <TableFold>
                  <TableFoldHead
                    title="제한담보"
                    className="w-full gap-1 flex [&>[role='button']]:shrink-0! *:data-[group='row']:w-full!"
                  >
                    <Grow placement="bwc" className="w-full">
                      <Badge color="primary">15개</Badge>
                      <Button size={'md'}>설계반영</Button>
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody>
                    {/* 제한담보 */}
                    <div className="ag-theme-alpine inner-scroll" data-row={4}>
                      <AgGridReact<ExpectedUwAmountRow>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={expectedUwLimitedCoverageRowData}
                        columnDefs={expectedUwAmountColumnDefs}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          suppressMovable: true,
                          cellClass: 'flex! items-center!',
                        }}
                        headerHeight={28}
                        rowHeight={30}
                        domLayout={'normal'}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                        animateRows={false}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="보험료 할증" className="justify-start">
                    <Badge color="primary">15개</Badge>
                  </TableFoldHead>
                  <TableFoldBody>
                    {/* 보험료 할증 */}
                    <div className="ag-theme-alpine inner-scroll" data-row={4}>
                      <AgGridReact<ExpectedUwSingleRow>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={expectedUwPremiumSurchargeRowData}
                        columnDefs={expectedUwSingleColumnDefs}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          suppressMovable: true,
                          cellClass: 'flex! items-center!',
                        }}
                        headerHeight={28}
                        rowHeight={30}
                        domLayout={'normal'}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                        animateRows={false}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold>
                  <TableFoldHead title="부 담보(부위/질병)" className="justify-start">
                    <Badge color="primary">15개</Badge>
                  </TableFoldHead>
                  <TableFoldBody>
                    {/* 부 담보(부위/질병) */}
                    <div className="ag-theme-alpine inner-scroll" data-row={4}>
                      <AgGridReact<ExpectedUw03Row>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={expectedUwExclusionCoverageRowData}
                        columnDefs={expectedUw03ColumnDefs}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          suppressMovable: true,
                          cellClass: 'flex! items-center!',
                        }}
                        headerHeight={28}
                        rowHeight={30}
                        domLayout={'normal'}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                        animateRows={false}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Grow>
              <Grow className="w-full">
                <Gcol>
                  <Gcol className="w-full">
                    <Gcol variant={'box-info'} placement={'ss'} className="w-full">
                      <Typo variant={'body-sm'} icon={'info'}>
                        <b>설계반영 시 유의사항</b>
                      </Typo>
                      <BulletList>
                        <BulletListItem size={'sm'} type="dotBig">
                          <b>설계반영 클릭시 자동 처리됩니다. 이외의 사항은 심상요청이후 재확인바랍니다.</b>
                        </BulletListItem>
                        <BulletListItem size={'sm'} type="dotBig">
                          고지필요대상 : 알릴 사항 자동입력
                        </BulletListItem>
                        <BulletListItem size={'sm'} type="dotBig">
                          제한담보 : 일괄조정 & 연관담보 동시 조정
                        </BulletListItem>
                      </BulletList>
                    </Gcol>
                  </Gcol>
                </Gcol>
              </Grow>
            </Gcol>
            <Gcol>
              <TableFold>
                <TableFoldHead title="대안설계">
                  {recommendData && recommendData.length > 0 && (
                    <Typo variant={'body-sm'} icon={'info'}>
                      본 대안설계는 예상UW결과기반의 참고정보로, 실제 심사결과 및 인수조건과 다를 수 있습니다.
                    </Typo>
                  )}
                </TableFoldHead>
                <TableFoldBody className="w-full">
                  {recommendData && recommendData.length > 0 ? (
                    <Gcol className="w-full gap-1">
                      <Grid className="w-full grid-cols-3" gap={3}>
                        {recommendData.map((item) => (
                          <RecommendCard
                            key={item.id}
                            onAiReasonClick={() => setAiReasonOpen(true)}
                            type={item.type}
                            title={item.title}
                            list={item.list}
                            plan={item.plan}
                            price={item.price}
                          />
                        ))}
                      </Grid>
                      <Grow gap={1} className="w-full justify-end">
                        <Grow placement="es" className="w-[33rem]">
                          <Typo variant={'body-sm'} icon={'warning'} className="text-[#E43939]">
                            할증 반영 전 예상보험료로 최종 심사결과에 따라 변경될 수 있습니다.
                          </Typo>
                        </Grow>
                      </Grow>
                    </Gcol>
                  ) : (
                    <Grow className="w-full bg-[#F4F4F4] rounded-[0.8rem] items-end justify-center min-h-[14rem]">
                      <Grow>
                        <img
                          src={withPublicUrl('/images/Ltpa005/ltpz00504.png')}
                          alt=""
                          className="w-[10rem] h-[12rem] object-contain shrink-0"
                        />
                        <Gcol placement="ss" gap={1}>
                          <Typo tag="strong" variant="body-md" className="text-[#000] font-bold">
                            [운영 비대상]
                          </Typo>
                          <Typo tag="p" variant="body-md" className="text-[#414141]">
                            대안설계 운영 대상이 아닙니다.
                          </Typo>
                        </Gcol>
                        <Gcol placement="ss" gap={1}>
                          <Typo tag="strong" variant="body-md" className="text-[#000] font-bold">
                            [필수정보 누락]
                          </Typo>
                          <Typo tag="p" variant="body-md" className="text-[#414141]">
                            대안설계 전달이 어렵습니다.
                          </Typo>
                        </Gcol>
                        <Gcol placement="ss" gap={1}>
                          <Typo tag="strong" variant="body-md" className="text-[#000] font-bold">
                            [예상UW결과 미충족]
                          </Typo>
                          <Typo tag="p" variant="body-md" className="text-[#414141]">
                            대안설계 안내 대상이 아닙니다.
                          </Typo>
                        </Gcol>
                      </Grow>
                    </Grow>
                  )}
                </TableFoldBody>
              </TableFold>
            </Gcol>
          </Gcol>
          <Ltpz0050401 open={aiReasonOpen} onOpenChange={setAiReasonOpen} />
        </div>
      </div>
      <Grow className="w-full" placement="ec">
        <Button variant={'contained'} size={'xl'} disabled={checkedCount === 0}>
          설계생성({checkedCount})
        </Button>
        <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={onClose}>
          닫기
        </Button>
      </Grow>
    </Grid>
  );
};

export default Ltpz00504;
