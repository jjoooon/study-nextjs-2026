/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import '@/shared/lib/agGridPub';

import '@/shared/lib/agGridPub';
import type { ColDef, IHeaderParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils/AgGridUtils';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { Button } from '@/shared/components/uiux/Button';

type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
};
const DummyData: DummyDataType[] = [
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

export default function Ltpa050Section() {
  type MultiLineHeaderParams = {
    line1: string;
    line2: string;
  };

  const MultiLineHeader = (props: IHeaderParams<DummyDataType> & MultiLineHeaderParams) => {
    const { line1, line2 } = props;

    return (
      <div className="flex h-full w-full items-center justify-center text-center leading-[1.2]">
        {line1}
        <br />
        {line2}
      </div>
    );
  };

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '보장P',
      field: 'field1',
      flex: 1,
      cellClass: `text-center `,
    },
    {
      headerName: '적입P',
      field: 'field2',
      flex: 1,
      cellClass: `text-center `,
    },
    {
      headerName: '일시납P',
      field: 'field3',
      flex: 1,
      cellClass: `text-center `,
    },
    {
      headerComponent: MultiLineHeader,
      headerComponentParams: {
        line1: '합계P',
        line2: '(할인전)',
      },
      field: 'field4',
      flex: 1,
      cellClass: `text-center `,
    },
    {
      headerComponent: MultiLineHeader,
      headerComponentParams: {
        line1: '합계P',
        line2: '(할인후)',
      },
      field: 'field5',
      flex: 1,
      cellClass: `text-center `,
    },
    {
      headerComponent: MultiLineHeader,
      headerComponentParams: {
        line1: '만기환급금',
        line2: '(예상)',
      },
      field: 'field6',
      flex: 1,
      cellClass: `text-center `,
    },
    {
      headerComponent: MultiLineHeader,
      headerComponentParams: {
        line1: '환급률',
        line2: '(예상)',
      },
      field: 'field7',
      flex: 1,
      cellClass: `text-center `,
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
          <Grid className="grid-cols-[1fr_1fr]" placement="ss" gap={3}>
            <Gcol placement="ss">
              <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
                <FormTable className="flex" variant={'none'} lineTop={false} cols={['w-1', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'설계번호'} tdClassName="grid grid-cols-[auto_auto_auto_1fr] gap-1">
                      <Button color="link" onClick={() => {}} only="default" size="md" variant="text">
                        LA260204310632-1
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
                <TableFoldBody>
                  <FormTable caption="계약정보" cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}>
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
                </TableFoldBody>
              </TableFold>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: true, resizable: true }}
                  domLayout="autoHeight"
                  headerHeight={40}
                />
              </div>
              <Gcol className="w-full" placement="ss" variant="box-info">
                <Typo icon="info" variant="body-sm">
                  만기환급금은 예상금액으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수
                  있습니다.
                </Typo>
              </Gcol>
              <TableFold>
                <TableFoldHead title="피보험자정보"></TableFoldHead>
                <TableFoldBody></TableFoldBody>
              </TableFold>
            </Gcol>
            <Gcol placement="ss">상단영역2</Gcol>
          </Grid>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
