/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';
import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, createTooltipValueGetter, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';
import { HeaderWithUnit } from '@grid/HeadRenderers';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

import '@/shared/lib/agGridPub';
import { Button } from '@uiux/Button';

type Ltp050TabType = { name: string; value: string; label: string };

const DATA_TABS: Ltp050TabType[] = [
  { name: '인보험', value: 'tab1', label: '인보험' },
  { name: '물보험', value: 'tab2', label: '물보험' },
];

type DummyDataTypeA01 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
};
const DummyDataA01: DummyDataTypeA01[] = [
  {
    id: 1,
    field1: 2399,
    field2: 2399,
    field3: 2399,
    field4: 2399,
    field5: 2399,
    field6: 2399,
    field7: 2399,
  },
];

type DummyDataTypeA02 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};
const DummyDataA02: DummyDataTypeA02[] = [
  {
    id: 1,
    field1: '김현화',
    field2: 30,
    field3: '회사사무직종사자',
    field4: '1급',
    field5: 1200,
  },
];

type DummyDataTypeA03 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};
const DummyDataA03: DummyDataTypeA03[] = [
  {
    id: 1,
    field1:
      '담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.',
    field2: '2026-01-01',
    field3: '2026-01-01',
    field4: 12300,
    field5: 15000,
  },
];

type DummyDataTypeA04 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
};
const DummyDataA04: DummyDataTypeA04[] = [
  {
    id: 1,
    field1: '김한화',
    field2: 30,
    field3: '1급',
    field4: 15000,
  },
];
type DummyDataTypeA05 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const DummyDataA05: DummyDataTypeA05[] = [
  {
    id: 1,
    field1: '화재기본담보명입니다.화재기본담보명입니다.화재기본담보명입니다.화재기본담보명입니다.',
    field2: 15000,
    field3: 15000,
  },
];
type DummyDataTypeA06 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};
const DummyDataA06: DummyDataTypeA06[] = [
  {
    id: 1,
    field1: '화재특약담보명입니다.화재특약담보명입니다.화재특약담보명입니다.화재특약담보명입니다.',
    field2: 30,
    field3: 24,
    field4: 15000,
    field5: 15000,
  },
];

type DummyDataTypeB01 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
};
const DummyDataB01: DummyDataTypeB01[] = [
  {
    id: 1,
    field1: 99,
    field2: 99,
    field3: 99,
    field4: 99,
    field5: 99,
    field6: 99,
    field7: 99,
  },
];

type DummyDataTypeB02 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};
const DummyDataB02: DummyDataTypeB02[] = [
  {
    id: 1,
    field1: 'B김현화',
    field2: 30,
    field3: '회사사무직종사자',
    field4: '1급',
    field5: 1000,
  },
];

type DummyDataTypeB03 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};
const DummyDataB03: DummyDataTypeB03[] = [
  {
    id: 1,
    field1:
      '담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.담보명 들어갑니다.',
    field2: '2026-01-01',
    field3: '2026-01-01',
    field4: 12300,
    field5: 15000,
  },
];

type DummyDataTypeB04 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
};
const DummyDataB04: DummyDataTypeB04[] = [
  {
    id: 1,
    field1: '김한화',
    field2: 30,
    field3: '1급',
    field4: 0,
  },
];
type DummyDataTypeB05 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const DummyDataB05: DummyDataTypeB05[] = [
  {
    id: 1,
    field1: '화재기본담보명입니다.화재기본담보명입니다.화재기본담보명입니다.화재기본담보명입니다.',
    field2: 15000,
    field3: 15000,
  },
];
type DummyDataTypeB06 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};
const DummyDataB06: DummyDataTypeB06[] = [
  {
    id: 1,
    field1: '화재특약담보명입니다.화재특약담보명입니다.화재특약담보명입니다.화재특약담보명입니다.',
    field2: 30,
    field3: 24,
    field4: 15000,
    field5: 15000,
  },
];

export default function Ltpa050Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const { tabs: tabsA, active: activeA, setActive: setActiveA, handleRemove: handleRemoveA } = useTabs(DATA_TABS);
  const { tabs: tabsB, active: activeB, setActive: setActiveB, handleRemove: handleRemoveB } = useTabs(DATA_TABS);

  const columnDefsA01: ColDef<DummyDataTypeA01>[] = [
    {
      headerName: '보장P',
      field: 'field1',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적입P',
      field: 'field2',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '일시납P',
      field: 'field3',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="합계P" unit="(할인전)" col={true} />,
      field: 'field4',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="합계P" unit="(할인후)" col={true} />,
      field: 'field5',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="만기환급금" unit="(예상)" col={true} />,
      field: 'field6',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="환급률" unit="(예상)" col={true} />,
      field: 'field7',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsA02: ColDef<DummyDataTypeA02>[] = [
    {
      headerName: '피보험자',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA02>({ field: 'field1' }),
    },
    {
      headerName: '연령',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(50),
      cellClass: `text-center `,
    },
    {
      headerName: '직업명',
      field: 'field3',
      flex: 20,
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA02>({ field: 'field3' }),
    },
    {
      headerName: '급수',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center `,
    },
    {
      headerName: '보장P',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsA03: ColDef<DummyDataTypeA03>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA03>({ field: 'field1' }),
    },
    {
      headerName: '보험기간',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: `text-center `,
    },
    {
      headerName: '납입기간',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: `text-center `,
    },
    {
      headerName: '가압금액',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보P',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsA04: ColDef<DummyDataTypeA04>[] = [
    {
      headerName: '소유자',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA04>({ field: 'field1' }),
    },
    {
      headerName: '적용업종',
      field: 'field2',
      flex: 10,
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA04>({ field: 'field2' }),
    },
    {
      headerName: '급수',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center`,
    },
    {
      headerName: '보장P',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsA05: ColDef<DummyDataTypeA05>[] = [
    {
      headerName: '화재기본담보',
      field: 'field1',
      flex: 20,
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA05>({ field: 'field1' }),
    },
    {
      headerName: '가입금액',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보P',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsA06: ColDef<DummyDataTypeA06>[] = [
    {
      headerName: '화재특약담보',
      field: 'field1',
      flex: 10,
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeA06>({ field: 'field1' }),
    },
    {
      headerName: '보험기간',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center `,
    },
    {
      headerName: '납입기간',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center`,
    },
    {
      headerName: '가압금액',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보P',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];

  const columnDefsB01: ColDef<DummyDataTypeB01>[] = [
    {
      headerName: '보장P',
      field: 'field1',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '적입P',
      field: 'field2',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '일시납P',
      field: 'field3',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="합계P" unit="(할인전)" col={true} />,
      field: 'field4',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="합계P" unit="(할인후)" col={true} />,
      field: 'field5',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="만기환급금" unit="(예상)" col={true} />,
      field: 'field6',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
    {
      headerComponent: () => <HeaderWithUnit label="환급률" unit="(예상)" col={true} />,
      field: 'field7',
      flex: 1,
      cellClass: `text-center `,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsB02: ColDef<DummyDataTypeB02>[] = [
    {
      headerName: '피보험자',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB02>({ field: 'field1' }),
    },
    {
      headerName: '연령',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(50),
      cellClass: `text-center `,
    },
    {
      headerName: '직업명',
      field: 'field3',
      flex: 20,
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB02>({ field: 'field3' }),
    },
    {
      headerName: '급수',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center `,
    },
    {
      headerName: '보장P',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsB03: ColDef<DummyDataTypeB03>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 10,
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB03>({ field: 'field1' }),
    },
    {
      headerName: '보험기간',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: `text-center `,
    },
    {
      headerName: '납입기간',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: `text-center `,
    },
    {
      headerName: '가압금액',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보P',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsB04: ColDef<DummyDataTypeB04>[] = [
    {
      headerName: '소유자',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB04>({ field: 'field1' }),
    },
    {
      headerName: '적용업종',
      field: 'field2',
      flex: 10,
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB04>({ field: 'field2' }),
    },
    {
      headerName: '급수',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center`,
    },
    {
      headerName: '보장P',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsB05: ColDef<DummyDataTypeB05>[] = [
    {
      headerName: '화재기본담보',
      field: 'field1',
      flex: 20,
      cellClass: `text-center`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB05>({ field: 'field1' }),
    },
    {
      headerName: '가입금액',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보P',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  const columnDefsB06: ColDef<DummyDataTypeB06>[] = [
    {
      headerName: '화재특약담보',
      field: 'field1',
      flex: 10,
      cellClass: `text-center `,
      tooltipValueGetter: createTooltipValueGetter<DummyDataTypeB06>({ field: 'field1' }),
    },
    {
      headerName: '보험기간',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center `,
    },
    {
      headerName: '납입기간',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-center`,
    },
    {
      headerName: '가압금액',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '담보P',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: `text-right`,
      valueFormatter: numberValueFormatter,
    },
  ];
  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '설계비교',
            pageId: 'LTPA050',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-cols-[auto_auto] items-start" placement="ss" gap={3}>
            <Gcol placement="ss" gap={3}>
              <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
                <FormTable className="flex" variant={'none'} lineTop={false} cols={['w-1', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_auto_auto_1fr] gap-1">
                      <Button color="link" onClick={() => {}} only="default" size="md" variant="text">
                        <b>LA260204310632-1</b>
                      </Button>
                      <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <TableFold>
                <TableFoldHead title="계약정보">
                  <Grow>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      출생후보험료
                    </Button>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      예상환급금조회
                    </Button>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      영업수수료
                    </Button>
                  </Grow>
                </TableFoldHead>
                <TableFoldBody className="gap-2">
                  <FormTable caption="계약정보" cols={['w-[9rem]', 'w-[40%]', 'w-[9rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell className="" title={'계약자'} colSpan={3}>
                        김한화
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell className="" title={'상품명'} colSpan={3}>
                        한화실손의료보험(갱신형) 무배당2601
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell className="" title={'가입플랜'} colSpan={3}>
                        자유설계
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell className="" title={'보험기간'}>
                        05년 만기
                      </FormCell>
                      <FormCell className="" title={'납입기간'}>
                        월납/전기납
                      </FormCell>
                    </FormRow>
                  </FormTable>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataTypeA01>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyDataA01}
                      columnDefs={columnDefsA01}
                      defaultColDef={{ sortable: true, resizable: true }}
                      domLayout="autoHeight"
                      headerHeight={40}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <Gcol className="w-full" placement="ss" variant="box-info">
                    <Typo icon="info" variant="body-sm">
                      만기환급금은 예상금액으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수
                      있습니다.
                    </Typo>
                  </Gcol>
                </TableFoldBody>
              </TableFold>

              <TableFold>
                <TableFoldHead title="피보험자정보"></TableFoldHead>
                <TableFoldBody>
                  <TabPager
                    data={tabsA}
                    active={activeA}
                    hasTableBelow={true}
                    setActive={setActiveA}
                    onRemove={handleRemoveA}
                    error={false}
                    errorMsg="에러 메시지 예시"
                    getValue={(tab) => String(tab.value)}
                    renderTab={(tab) => <span>{tab.label}</span>}
                  >
                    {activeA === 'tab1' && (
                      <Gcol gap={2}>
                        <div className="ag-theme-alpine ag-border-t">
                          <AgGridReact<DummyDataTypeA02>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataA02}
                            columnDefs={columnDefsA02}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeA03>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataA03}
                            columnDefs={columnDefsA03}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Gcol>
                    )}
                    {activeA === 'tab2' && (
                      <Gcol gap={2}>
                        <div className="ag-theme-alpine ag-border-t">
                          <AgGridReact<DummyDataTypeA04>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataA04}
                            columnDefs={columnDefsA04}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                        <FormTable cols={['w-[8rem]', 'w-auto']}>
                          <FormRow>
                            <FormCell title={'소재지'}></FormCell>
                          </FormRow>
                        </FormTable>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeA05>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataA05}
                            columnDefs={columnDefsA05}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeA06>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataA06}
                            columnDefs={columnDefsA06}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Gcol>
                    )}
                  </TabPager>
                </TableFoldBody>
              </TableFold>
            </Gcol>
            <Gcol placement="ss" gap={3}>
              <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
                <FormTable className="flex" variant={'none'} lineTop={false} cols={['w-1', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_auto_auto_1fr] gap-1">
                      <Button color="link" onClick={() => {}} only="default" size="md" variant="text">
                        <b>LA260204310632-1</b>
                      </Button>
                      <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <TableFold>
                <TableFoldHead title="계약정보">
                  <Grow>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      출생후보험료
                    </Button>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      예상환급금조회
                    </Button>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      영업수수료
                    </Button>
                  </Grow>
                </TableFoldHead>
                <TableFoldBody className="gap-2">
                  <FormTable caption="계약정보" cols={['w-[9rem]', 'w-[40%]', 'w-[9rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell className="" title={'계약자'} colSpan={3}>
                        김한화
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell className="" title={'상품명'} colSpan={3}>
                        한화실손의료보험(갱신형) 무배당2601
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell className="" title={'가입플랜'} colSpan={3}>
                        자유설계
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell className="" title={'보험기간'}>
                        05년 만기
                      </FormCell>
                      <FormCell className="" title={'납입기간'}>
                        월납/전기납
                      </FormCell>
                    </FormRow>
                  </FormTable>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataTypeB01>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyDataB01}
                      columnDefs={columnDefsB01}
                      defaultColDef={{ sortable: true, resizable: true }}
                      domLayout="autoHeight"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      headerHeight={40}
                    />
                  </div>
                  <Gcol className="w-full" placement="ss" variant="box-info">
                    <Typo icon="info" variant="body-sm">
                      만기환급금은 예상금액으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수
                      있습니다.
                    </Typo>
                  </Gcol>
                </TableFoldBody>
              </TableFold>

              <TableFold>
                <TableFoldHead title="피보험자정보"></TableFoldHead>
                <TableFoldBody>
                  <TabPager
                    data={tabsB}
                    active={activeB}
                    hasTableBelow={true}
                    setActive={setActiveB}
                    onRemove={handleRemoveB}
                    error={false}
                    errorMsg="에러 메시지 예시"
                    getValue={(tab) => String(tab.value)}
                    renderTab={(tab) => <span>{tab.label}</span>}
                  >
                    {activeB === 'tab1' && (
                      <Gcol gap={2}>
                        <div className="ag-theme-alpine ag-border-t">
                          <AgGridReact<DummyDataTypeB02>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataB02}
                            columnDefs={columnDefsB02}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeB03>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataB03}
                            columnDefs={columnDefsB03}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Gcol>
                    )}
                    {activeB === 'tab2' && (
                      <Gcol gap={2}>
                        <div className="ag-theme-alpine ag-border-t">
                          <AgGridReact<DummyDataTypeB04>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataB04}
                            columnDefs={columnDefsB04}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                        <FormTable cols={['w-[8rem]', 'w-auto']}>
                          <FormRow>
                            <FormCell title={'소재지'}></FormCell>
                          </FormRow>
                        </FormTable>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeB05>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataB05}
                            columnDefs={columnDefsB05}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataTypeB06>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={DummyDataB06}
                            columnDefs={columnDefsB06}
                            defaultColDef={{ sortable: true, resizable: true }}
                            domLayout="autoHeight"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Gcol>
                    )}
                  </TabPager>
                </TableFoldBody>
              </TableFold>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  설계 비교서 출력
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
